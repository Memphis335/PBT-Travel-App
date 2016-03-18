window.$sp = window.$sp || {};
window.$sp.wf = (function ($, undefined) {
    "use strict";
    var ctx,
        web,
        wfManager,
        JS_SUFFIX = ".js",
        SP_WORKFLOW_SERVICES = "SP.WorkflowServices",
        SP_WORKFLOW_SERVICES_SCRIPT_NAME = SP_WORKFLOW_SERVICES + JS_SUFFIX,
        risGuid = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i,
        oDataHeader = "application/json;odata=verbose",
        initializeVariables = function () {
            ctx = SP.ClientContext.get_current();
            web = ctx.get_web();
            wfManager = SP.WorkflowServices.WorkflowServicesManager.newObject(ctx, web);
        },
        registerWFscripts = function () {
            SP.SOD.registerSod(
                SP_WORKFLOW_SERVICES_SCRIPT_NAME,
                SP.Utilities.Utility.getLayoutsPageUrl(SP_WORKFLOW_SERVICES + JS_SUFFIX)
            );
            SP.SOD.executeFunc(
                SP_WORKFLOW_SERVICES_SCRIPT_NAME,
                SP_WORKFLOW_SERVICES + ".WorkflowServicesManager",
                initializeVariables
            );
        },
        init = function () {
            SP.SOD.executeFunc(
                "sp" + JS_SUFFIX,
                "SP.ClientContext",
                registerWFscripts
            );
        },
        set_errorHandler = function (func) {
            errorHandler = func;
        },
        errorHandler = function (sender, args) {
            var message = this,
                spError = args && args.get_message,
                restAPIError = sender && sender.responseText

            ;

            if (this.id) {
                message += " on item with ID: " + this.id;
            }

            SP.UI.Notify.addNotification(message, false);
            console.log(message);

            if (spError) {
                console.log("Error:", args.get_message(), "\nStackTrace:", args.get_stackTrace());
            }

            if (restAPIError) {
                console.log(restAPIError);
            }
        },
        set_successHandler = function (func) {
            successHandler = func;
        },
        successHandler = function (sender, args) {
            var wfName = this.name || this.subscription && this.subscription.get_name(),
                message = "Workflow " + wfName + " has started.";

            if (this.id) {
                message = message.replace(".", "");
                message += " on this item. ID: " + this.id;
            }

            SP.UI.Notify.addNotification(message, false);
        },
        fireWfByName = function (sender, args) {
            var subscription = this.subscription,
                id = this.id,
                initiationParams = this.initiationParams || {},
                workflows = subscription.getEnumerator(),
                workflow,
                foundWrkFlow = false;

            while (workflows.moveNext()) {
                workflow = workflows.get_current();

                if (workflow.get_name() === this.name) {
                    startWorkflow({
                        subscriptionId: workflow.get_id(),
                        id: id,
                        initiationParams: initiationParams
                    });

                    foundWrkFlow = true;
                    break;
                }
            }

            if (!foundWrkFlow) {
                errorHandler.call("Could not find workflow named: " + this.name);
            }
        },
        fireWfBySubscription = function (sender, args) {
            var subscription = this.subscription,
                id = this.id,
                initiationParams = this.initiationParams || {},
                wfInstance = wfManager.getWorkflowInstanceService();

            //https://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.client.workflowservices.workflowinstanceservice_methods.aspx

            if (id) {
                wfInstance.startWorkflowOnListItem(subscription, id, initiationParams);
            } else {
                wfInstance.startWorkflow(subscription, initiationParams);
            }

            ctx.executeQueryAsync(
                successHandler.bind(this),
                errorHandler.bind("Could not fire workflow. SubscriptionId: " + this.subscriptionId)
            );
        },
        startWorkflow = function (opt) {
            var subscriptionService = wfManager.getWorkflowSubscriptionService(),
                success,
                error;

            // different methods to fire workflows with 2013.
            // https://msdn.microsoft.com/en-us/library/microsoft.sharepoint.workflowservices.workflowsubscriptionservice_members.aspx
            if (opt.subscriptionId) {
                opt.subscription = subscriptionService.getSubscription(opt.subscriptionId);
                ctx.load(opt.subscription);
                success = fireWfBySubscription.bind(opt);
                error = errorHandler.bind("Failed to load subscription: " + opt.subscriptionId);
            } else {
                opt.subscription = subscriptionService.enumerateSubscriptions();
                ctx.load(opt.subscription);
                success = fireWfByName.bind(opt);
                error = errorHandler.bind("Failed to load workflow subscriptions.");
            }

            ctx.executeQueryAsync(
                success,
                error
            );
        },
        removeDemCurlies = function (v) {
            return v.replace(/{|}/g, "");
        },
        getListItemDeets = function (listUrl) {
            return $.ajax({
                type: "GET",
                url: listUrl,
                dataType: "json",
                headers: {
                    "Accept": oDataHeader,
                    "Content-Type": oDataHeader
                }
            });
        },
        fire2010Workflow = function (data) {
            var success,
                listGuid = data.d.__metadata.uri.match(risGuid)[0],
                itemId = data.d.GUID;

            this.result = this.subscriptionService.startWorkflow(this.name, null, listGuid, itemId, this.initiationParams);
            success = successHandler.bind(this);

            ctx.executeQueryAsync(
                success,
                this.error
            );
        },
        start2010Workflow = function (opt) {
            var subscriptionService = wfManager.getWorkflowInteropService(),
                wfName = opt.name,
                id = opt.id,
                itemGuid,
                initiationParams = opt.initiationParams,
                queryPrefix = "/_api/web/lists",
                querySuffix = "/items(" + id + ")?$select=GUID",
                // May need to do this later when ctx is dynamic.
                // listUrl = web.get_url(),
                listUrl = _spPageContextInfo.webAbsoluteUrl + queryPrefix,
                listGuid,
                errorMessage = "Failed to fire 2010 {0} Workflow.",
                success,
                error;

            // Fire 2010 workflows!
            // https://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.client.workflowservices.interopservice.startworkflow.aspx

            // Not sure if opt.result is going to be helpful, but leaving it here for the meantime.
            // If it is useful, then I'll bind it to the both handlers.
            // If not, I'll drop it altogether.
            if (id) {
                listGuid = opt.list.match(risGuid);
                if (listGuid) {
                    listGuid = removeDemCurlies(listGuid[0]);
                    listUrl += "(guid'" + listGuid + "')";
                } else {
                    listUrl += "/GetByTitle('" + opt.list + "')";
                }

                listUrl += querySuffix;

                // converts numbers to strings.
                id = id + "";
                itemGuid = id.match(risGuid);

                if (listGuid && itemGuid) {
                    // List GUID and item GUID were provided, no need for API call.
                    opt.result = subscriptionService.startWorkflow(wfName, null, listGuid, itemGuid[0], initiationParams);
                    success = successHandler.bind(opt);
                    error = errorHandler.bind(errorMessage.replace("{0}", "Site"));
                } else {
                    // Need to resolve List GUID and get the item GUID.
                    opt.subscriptionService = subscriptionService;
                    opt.error = errorHandler.bind(errorMessage.replace("{0}", "List"));

                    return getListItemDeets.bind(opt)(listUrl)
                        .then(fire2010Workflow.bind(opt), opt.error);
                }
            } else {
                // Site WF
                opt.result = subscriptionService.startWorkflow(wfName, null, null, null, initiationParams);
                success = successHandler.bind(opt);
                error = errorHandler.bind(errorMessage.replace("{0}", "Site"));
            }

            ctx.executeQueryAsync(
                success,
                error
            );
        };


    init();

    return {
        set_errorHandler: set_errorHandler,
        set_successHandler: set_successHandler,
        startWorkflow: startWorkflow,
        start2010Workflow: start2010Workflow
    };
}(window.jQuery));



