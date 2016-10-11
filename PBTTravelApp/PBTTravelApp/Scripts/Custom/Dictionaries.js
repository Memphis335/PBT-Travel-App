"use strict";
var Dictionaries = window.Dictionaries || {};
Dictionaries = function () {
    var c = function () {
        var f = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (g) {
                f = g.d.GetContextWebInformation.FormDigestValue;
            },
            error: function (g, h, i) {
                alert(i);
            }
        });
        return f;
    },
        a = function (g, i) {
            var f = c();
            var h;
            return $.Deferred(function (j) {
                $.ajax({
                    url: appweburl +
                        "/_api/Web/lists/getbytitle('" + g + "')/items",
                    contentType: "application/json; odata=verbose",
                    type: "POST",
                    data: JSON.stringify({
                        __metadata: {
                            type: "SP.Data." + g + "ListItem"
                        },
                        Title: i.StripTags()
                    }),
                    headers: {
                        accept: "application/json;odata=verbose",
                        "x-requestforceauthentication": true,
                        "X-RequestDigest": f
                    },
                    success: function (k) {
                        h = {
                            Result: "OK",
                            Record: {
                                ID: k.d.ID,
                                Title: i
                            }
                        };
                        j.resolve(h);
                    },
                    error: function (m, k, l) {
                        j.reject();
                    }
                });
            });
        },
        d = function (f) {
            var g;
            return $.Deferred(function (h) {
                $.ajax({
                    url: appweburl +
                        "/_api/Web/lists/getbytitle('" + f + "')/items?$select=Title,ID",
                    type: "GET",
                    headers: {
                        accept: "application/json;odata=verbose"
                    },
                    dataType: "json",
                    cache: false,
                    success: function (i) {
                        g = {
                            Result: "OK",
                            Records: i.d.results
                        };
                        h.resolve(g);
                    },
                    error: function () {
                        h.reject();
                    }
                });
            });
        },
        e = function (h, g, j) {
            var f = c();
            var i;
            return $.Deferred(function (k) {
                $.ajax({
                    url: appweburl +
                        "/_api/Web/lists/getbytitle('" + h + "')/getItemByStringId('" + g + "')",
                    type: "POST",
                    async: true,
                    contentType: "application/json;odata=verbose",
                    data: JSON.stringify({
                        __metadata: {
                            type: "SP.Data." + h + "ListItem"
                        },
                        Title: j
                    }),
                    headers: {
                        accept: "application/json;odata=verbose",
                        "X-RequestDigest": f,
                        "X-Http-Method": "PATCH",
                        "IF-MATCH": "*"
                    },
                    success: function (l) {
                        i = {
                            Result: "OK"
                        };
                        k.resolve(i);
                    },
                    error: function (n, l, m) {
                        k.reject();
                    }
                });
            });
        },
        b = function (h, g) {
            var f = c();
            var i;
            return $.Deferred(function (j) {
                $.ajax({
                    url: appweburl +
                        "/_api/Web/lists/getbytitle('" + h + "')/getItemByStringId('" + g + "')",
                    type: "DELETE",
                    headers: {
                        accept: "application/json;odata=verbose",
                        "X-RequestDigest": f,
                        "IF-MATCH": "*"
                    },
                    success: function (k) {
                        i = {
                            Result: "OK"
                        };
                        j.resolve(i);
                    },
                    error: function (m, k, l) {
                        j.reject();
                    }
                });
            });
        };
    return {
        readAll: d,
        createItem: a,
        updateItem: e,
        deleteItem: b
    };
}();
var SpecialDictionary = window.SpecialDictionary || {};
SpecialDictionary = function () {
    var c = function () {
        var f = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (g) {
                f = g.d.GetContextWebInformation.FormDigestValue;
            },
            error: function (g, h, i) {
                alert(i);
            }
        });
        return f;
    },
    a = function (g, i, m) {
        var f = c();
        var h;
        return $.Deferred(function (j) {
            $.ajax({
                url: appweburl +
                    "/_api/Web/lists/getbytitle('" + g + "')/items",
                contentType: "application/json; odata=verbose",
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data." + g + "ListItem"
                    },
                    Title: i,
                    Client: m
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": f
                },
                success: function (k) {
                    h = {
                        Result: "OK",
                        Record: {
                            ID: k.d.ID,
                            Title: i
                        }
                    };
                    j.resolve(h);
                },
                error: function (m, k, l) {
                    j.reject();
                }
            });
        });
    },
    d = function (f, e) {
        var g;
        var z = appweburl +
            "/_vti_bin/ListData.svc/DictPONumbers/?$inlinecount=allpages&$select=Id,Title,Client&$orderby=" +
            e.jtSorting.replace(" DESC", " desc").replace(" ASC", " asc") +
            "&$skip=" +
            e.jtStartIndex +
            "&$top=" +
            e.jtPageSize;
        return $.Deferred(function (h) {
            $.ajax({
                url: z,
                data: f,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                success: function (i) {
                    g = {
                        Result: "OK",
                        Records: i.d.results,
                        TotalRecordCount: i.d.__count
                    };
                    h.resolve(g);
                },
                error: function () {
                    h.reject();
                }
            });
        });
    },
    e = function (h, g, j, x) {
        var f = c();
        var i;
        return $.Deferred(function (k) {
            $.ajax({
                url: appweburl +
                    "/_api/Web/lists/getbytitle('" + h + "')/getItemByStringId('" + g + "')",
                type: "POST",
                async: true,
                contentType: "application/json;odata=verbose",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data." + h + "ListItem"
                    },
                    Title: j,
                    Client: x
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "X-RequestDigest": f,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (l) {
                    i = {
                        Result: "OK"
                    };
                    k.resolve(i);
                },
                error: function (n, l, m) {
                    k.reject();
                }
            });
        });
    },
    b = function (h, g) {
        var f = c();
        var i;
        return $.Deferred(function (j) {
            $.ajax({
                url: appweburl +
                    "/_api/Web/lists/getbytitle('" + h + "')/getItemByStringId('" + g + "')",
                type: "DELETE",
                headers: {
                    accept: "application/json;odata=verbose",
                    "X-RequestDigest": f,
                    "IF-MATCH": "*"
                },
                success: function (k) {
                    i = {
                        Result: "OK"
                    };
                    j.resolve(i);
                },
                error: function (m, k, l) {
                    j.reject();
                }
            });
        });
    };
    return {
        readAll: d,
        createItem: a,
        updateItem: e,
        deleteItem: b
    };
}();
$(document).ready(function () {
    if (CurrentUser.IsAdmin === false) {
        location.href = "AccessDenied.aspx";
        return;
    }
    var c = function (d) {
        return decodeURIComponent((d + "").replace(/\+/g, "%20"));
    };
    var a = function (g, e) {
        var h = g.split("&");
        for (var d = 0; d < h.length; d++) {
            var f = h[d].split("=");
            if (f[0] === e) {
                return f[1];
            }
        }
    };
    var b = function (e, d) {
        $("#Dict" + e).jtable({
            title: d,
            paging: false,
            defaultSorting: "Title asc",
            messages: {
                addNewRecord: "Add new"
            },
            actions: {
                listAction: function (g, f) {
                    return Dictionaries.readAll("Dict" + e);
                },
                updateAction: function (f) {
                    return Dictionaries.updateItem("Dict" + e, a(f, "ID"), c(a(f, "Title")));
                },
                createAction: function (f) {
                    return Dictionaries.createItem("Dict" + e, c(a(f, "Title")));
                },
                deleteAction: function (f) {
                    return Dictionaries.deleteItem("Dict" + e, f.ID);
                }
            },
            fields: {
                ID: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Title: {
                    title: "Name",
                    width: "400"
                }
            },
            formCreated: function (g, f) {
                f.form.find('input[name="Title"]').addClass("validate[required]");
                f.form.validationEngine();
            },
            formSubmitting: function (g, f) {
                $("#Edit-Title").val($("#Edit-Title").val().StripTags());
                return f.form.validationEngine("validate");
            },
            formClosed: function (g, f) {
                f.form.validationEngine("hide");
                f.form.validationEngine("detach");
            }
        });
        $("#Dict" + e).jtable("load");
    };
    var d = function (e, d) {
        $("#Dict" + e).jtable({
            title: d,
            paging: true,
            pageList: "minimal",
            pageSize: "20",
            defaultSorting: "Client asc",
            sorting: true,
            messages: {
                addNewRecord: "Add new"
            },
            actions: {
                listAction: SpecialDictionary.readAll,

                updateAction: function (f) {
                    return SpecialDictionary.updateItem("Dict" + e, a(f, "ID"), c(a(f, "Title")), c(a(f, "Client")));
                },
                createAction: function (f) {
                    return SpecialDictionary.createItem("Dict" + e, c(a(f, "Title")), c(a(f, "Client")));
                },
                deleteAction: function (f) {
                    return SpecialDictionary.deleteItem("Dict" + e, f.ID);
                }
            },
            fields: {
                ID: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Client: {
                    title: "Client",
                    width: "40%"
                },
                Title: {
                    title: "Name",
                    width: "400"
                }

            },
            formCreated: function (g, f) {
                f.form.find('input[name="Title"]').addClass("validate[required]");
                f.form.find('input[name="Client"]').addClass("validate[required]");
                f.form.validationEngine();
            },
            formSubmitting: function (g, f) {
                $("#Edit-Title").val($("#Edit-Title").val().StripTags());
                return f.form.validationEngine("validate");
            },
            formClosed: function (g, f) {
                f.form.validationEngine("hide");
                f.form.validationEngine("detach");
            }
        });
        $("#Dict" + e).jtable("load");
    };
    b("Projects", "Divisions");
    b("Programs", "Travel Programs");
    b("Clients", "Clients");
    d("PONumbers", "Project / PO Numbers");
    $(".ui-dialog-buttonpane").find('button:contains("Save")').addClass("btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Delete")').addClass("btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Cancel")').addClass("btn");
    $("#tempBtn")
        .on("click",
            function () {
                //SpecialDictionary.createItem("DictPONumbers","{f2}","{f1}");
                SpecialDictionary.createItem("DictPONumbers", "BIB 5.5 & MIMIR R4 Afghanistan (PO1402583)", "MTN Afghanistan");
                SpecialDictionary.createItem("DictPONumbers", "Informatica (PO1501394)", "MTN Afghanistan");
                SpecialDictionary.createItem("DictPONumbers", "MIMIR 2nd line Support Afghanistan (PO1401932)", "MTN Afghanistan");
                SpecialDictionary.createItem("DictPONumbers", "MTN LCMSi Afghanistan(PO1201342)", "MTN Afghanistan");
                SpecialDictionary.createItem("DictPONumbers", "Advanced Analytics (PO10876)", "MTN Benin");
                SpecialDictionary.createItem("DictPONumbers", "Benin CLF (Awaiting PO)", "MTN Benin");
                SpecialDictionary.createItem("DictPONumbers", "Benin Mobile Money Upgrade (PO5239)", "MTN Benin");
                SpecialDictionary.createItem("DictPONumbers", "BIB 1st Line Support (Awaiting PO)", "MTN Benin");
                SpecialDictionary.createItem("DictPONumbers", "CLFi Project (PO11009)", "MTN Benin");
                SpecialDictionary.createItem("DictPONumbers", "CLM & C360 (Awaiting PO)", "MTN Benin");
                SpecialDictionary.createItem("DictPONumbers", "ECW Reports (Awaiting PO)", "MTN Benin");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.4 Benin Phase 1 (PO3030)", "MTN Benin");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.5 & MIMIR R4 Benin(PO4116)", "MTN Benin");
                SpecialDictionary.createItem("DictPONumbers", "MTN Mimir Benin", "MTN Benin");
                SpecialDictionary.createItem("DictPONumbers", "Project Next (Awaiting PO)", "MTN Benin");
                SpecialDictionary.createItem("DictPONumbers", "360 D - BRD; URS (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "BIB Daily Assurance", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "BIB ODS Split (Awaiting PO)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "BIB Standard Report (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "BIG Data (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "CLM (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Device Penetration (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "DPI STD Module (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "ECW Upgrade (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Factory Opco Support", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "FACTS Replacement (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Fast Data (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Front-End Innnovation - Story Boarding (Pre-Sales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Group KPI Dashboard (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Implementation Manager MENA", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Implementation Manager SEA", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Implementation Manager WECA 1", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Implementation Manager WECA 2", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Implementation Support", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Informatica Switchoff (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Infrastructure", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Iran Data Quality Development (PO58627)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "LCMSi BIB Integration (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "LCMSi Refactoring", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Logging Impact (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "MIMIR Q3 (PO13561)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Mobile Lending enhancement � CBA (pre-sales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Money Lending", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "OCS Upgrade (PO 004714)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "ODS Framework Agreement (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "ODS Load Dashboard (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "PPO", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Project Next R2 (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Project Next! CDW (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Release 553", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Release 554", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Remedy V8 Integration", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Research and Development", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "SEA DMD Projects", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "SmartApp � BRD; URS (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Solution", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Special Leave - Onsite Groups", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Strike Force Initiative", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Support", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Tracking of Patch Release vs 5.5.3.1", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Training", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Travel", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Unallocated", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Unified CDR/CS6 (Awaiting PO)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Unified CDR/CS6 (Presales)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "Vision 2020", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "WBS Development (Awaiting PO)", "MTN BiB Solution");
                SpecialDictionary.createItem("DictPONumbers", "BIB & MIMIR Changes (PO37488)", "MTN Cameroon");
                SpecialDictionary.createItem("DictPONumbers", "BIB 5.5 & MIMIR R 4 Upgrade(PO121)", "MTN Cameroon");
                SpecialDictionary.createItem("DictPONumbers", "EWP Implementation (PO214)", "MTN Cameroon");
                SpecialDictionary.createItem("DictPONumbers", "MIMIR Support Cameroon (PO38099)", "MTN Cameroon");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Cameroon V2.1", "MTN Cameroon");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Support Cameroon", "MTN Cameroon");
                SpecialDictionary.createItem("DictPONumbers", "MTN Cameroon CLF (PO 36466)", "MTN Cameroon");
                SpecialDictionary.createItem("DictPONumbers", "1st Line Support Congo B (PO13-4369)", "MTN Congo-Brazzaville");
                SpecialDictionary.createItem("DictPONumbers", "2nd Line Support Congo B (PO13-4369)", "MTN Congo-Brazzaville");
                SpecialDictionary.createItem("DictPONumbers", "CLF Congo-Brazzaville (PO14-5730)", "MTN Congo-Brazzaville");
                SpecialDictionary.createItem("DictPONumbers", "Congo LCMSi (PO6425)", "MTN Congo-Brazzaville");
                SpecialDictionary.createItem("DictPONumbers", "Customer 360 & CLM (Awaiting PO)", "MTN Congo-Brazzaville");
                SpecialDictionary.createItem("DictPONumbers", "DMD - EVD & Facts Engine Room (PO6685)", "MTN Congo-Brazzaville");
                SpecialDictionary.createItem("DictPONumbers", "LCMSi (PO 6425)", "MTN Congo-Brazzaville");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.4 Congo Brazzaville Phase 1(PO4369)", "MTN Congo-Brazzaville");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.5 & MIMIR R4 Congo Brazzaville(PO5500)", "MTN Congo-Brazzaville");
                SpecialDictionary.createItem("DictPONumbers", "Q3 Release Implementation (PO7144)", "MTN Congo-Brazzaville");
                SpecialDictionary.createItem("DictPONumbers", "1st Line Support Cyprus (PO14513)", "MTN Cyprus");
                SpecialDictionary.createItem("DictPONumbers", "2nd Line Support Cyprus (PO14513)", "MTN Cyprus");
                SpecialDictionary.createItem("DictPONumbers", "BIB/MIMIR AMC Support Cyprus (PO14513)", "MTN Cyprus");
                SpecialDictionary.createItem("DictPONumbers", "DMD - EVC Reporting (PO23474)", "MTN Cyprus");
                SpecialDictionary.createItem("DictPONumbers", "MTN Cyprus BIB 5.5 & Mimir Upgrade (P14512)", "MTN Cyprus");
                SpecialDictionary.createItem("DictPONumbers", "MTN LCMSi Cyprus(PO13538)", "MTN Cyprus");
                SpecialDictionary.createItem("DictPONumbers", "Solution Space Management", "MTN Cyprus");
                SpecialDictionary.createItem("DictPONumbers", "1st Line Support Ghana (PO14142)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "AA AMC (PO14142)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "Additional ECW Reports (PO13542)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "Advanced Analytics (Pre-sales)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "BIB 1st Line Support Ghana (PO12573)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "BIB 2nd line Support Ghana (PO18046)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "BIB AMC (PO14142)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "BIB Upgrade for HP (PO12267)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "CLF AMC (PO14142)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "DMD - EWP Bank Settlement Report (PO14830)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "DMD - EWP Control File (PO14830)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "DMD - IT Helpdesk Reports (PO14830)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "DMD - LTE Data Exercise (PO14286)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Marketing DataMart  (PO14830)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "DMD - MSC Additional Attributes (PO14830)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "ECW ICP 15.04. (PO 14830)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "EWP for additional UAT (PO 13000)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "Fast Data", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "Ghana Budget (Pre-sales)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "Ghana Migration", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "Ghana Report Developer/BI Consultant (PO12102)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "Ghana Upgrade(PO13923)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "Informatica Decommissioning (PO 13000)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "LCMSi AMC (PO14142)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "Mobile Lending Solution (PO13197)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "Mobile Money (ECW) Ghana (PO10339)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "MTN Advanced Analytics Ghana New Models (PO 16889)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.5 & MIMIR R4 Ghana (PO 17778)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Support Ghana", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "MTN CLF Ghana (PO 17620)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "MTN Ghana 1st Line Support (PO 17219)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "MTN Ghana Mimir R4 Upgrade (PO 17819)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "MTN LCMSi Ghana(PO13808)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "MTN MIMIR Support Ghana(PO16502)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "MTNGH HP First Line Support (Awaiting PO)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "OPCO Specific Reports Ghana (PO10339)", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "Report Development [PO - 014938] Ghana", "MTN Ghana");
                SpecialDictionary.createItem("DictPONumbers", "3rd Line Support", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "AA SAS", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "Advanced Analystics", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "BIB 2nd line Support Swaziland (PO10651)", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "BIB Governance", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN Advanced Analytics Advanced analytics", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN Advanced Analytics Solution", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN BiB Solution BIB 5.4", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN BiB Solution BIB 5.5 & MIMIR R4", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN BiB Solution BIB Integration with EDW/MoMo 2", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Solution Factory", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN BiB Solution FlyText", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN BiB Solution Project Next", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN BiB Solution SDP (EWP)", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN BiB Standby 2nd-Line Support", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN BiB Standby 3rd-Line Support", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Standby DBA", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN BiB Standby Framework", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Standby Front End", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN BiB Support General", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN CLF Solution", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN Dubai", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN Group Advanced Analytics", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN LCMSi v1.5(New) Solution", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN LCMSi v2.0 Solution", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "MTN Mimir MTN Group", "MTN Group");
                SpecialDictionary.createItem("DictPONumbers", "BIB 55 & MIMIR R4 Upgrade - Guinea Bissau (PO 5390)", "MTN Guinea Bissau");
                SpecialDictionary.createItem("DictPONumbers", "EWP Implementation (Awaiting PO)", "MTN Guinea Bissau");
                SpecialDictionary.createItem("DictPONumbers", "AA Guinea Conakry (PO00413)", "MTN Guinea-Conakry");
                SpecialDictionary.createItem("DictPONumbers", "CLF - 2nd Line Support (POCO00013)", "MTN Guinea-Conakry");
                SpecialDictionary.createItem("DictPONumbers", "Customer 360 / CLM (PO6CO00127)", "MTN Guinea-Conakry");
                SpecialDictionary.createItem("DictPONumbers", "EWP Guinea Conakry (PO5CO00879)", "MTN Guinea-Conakry");
                SpecialDictionary.createItem("DictPONumbers", "LCMSi Guinea Conakry (PO00493)", "MTN Guinea-Conakry");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.5 & MIMIR R4 Guinea Conakry 5.5(PO14552/12)", "MTN Guinea-Conakry");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.5 & MIMIR R4 Guinea Conakry MIMIR R4(PO17541/14)", "MTN Guinea-Conakry");
                SpecialDictionary.createItem("DictPONumbers", "MTN Guinea Conakry CLF (PO AG17159/14/GU)", "MTN Guinea-Conakry");
                SpecialDictionary.createItem("DictPONumbers", "Q3 Release - Guinea C (PO6CO00165)", "MTN Guinea-Conakry");
                SpecialDictionary.createItem("DictPONumbers", "AA Wave 1 & 2 Iran (PO58627)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "BIB 5.5 Upgrade (BIB 5.5 Upgrade)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2015 - EDW Changes", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2099 - SMS Revenue per Cell T2", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2177 - Revenue Per Cell (PO57716)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2192 - Auto Recharge Online Process (PO 55096)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2206 - PCRF", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2223 - National Roaming", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2241 - BTS Address for TW (PO 49422)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2261 - SMS Contest Ticketing (PO 50014)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2262 - Vitrin Content Retry (PO49778)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2263 - MNP (PO59348)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2280 - MSISDN Availability (PO50207)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2288 - Device Bundling", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2292 - IN Feature Call Type (PO53251)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2292 - In Features (PO 55082)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2292 - In Features Call Type (PO53751)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2309 - Extending VAS for non-Iran cell-TW (PO 55099)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2315 - M2M Platform (PO51850)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2317 - WiFi Hotspot Phase 2 (PO58344)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2318 - Updating National ID (PO52516)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2325 - National ID Validation (PO50206)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2335 - Gift Bolton Enhancement (PO53042)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2337 - Kid SIM (PO52151)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2337 - Kid Sim (PO57839)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2339 - Shared Account Phase 2 (Awaiting PO)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2342 - ECP Enhancement (PO59349)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2345 - HSDP Group Migration (PO53041)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2357 - Convergence Plus (PO53040)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2361 - Auto Renewal of Boltons (PO 54305)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2361 - Auto Renewal of BOLTONs (PO52653)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2364 - CLF Enhancement (PO53948)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2383 - CLM (PO56699)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2385 - Advanced Credit Offer (PO55817", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2389 - Applying Cost for After Sales Services (PO 55076)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2390 - Products by Merchant Websites (PO 54667)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2397 - Contact Management (PO54255)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2400 - OTA DMC (PO57766)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2403 - ISIM Promotion (PO 54563)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2433 - CR Linking Segmentation Model to Frontlline", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2443 - Tiered Bundle", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2461 - Event Management (Awaiting PO)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - 2465 - IPTV (Awaiting PO)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "CER - Total Revenue per Site (Awaiting PO)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "Data Quality Checker (PO58627)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Auction Portal (PO 54662)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Gift Bolton Enhancement (PO53042)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "EDW Decommissioning (PO53750)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "Fast Data on H Base (PO58627)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "Iran", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "Iran(PO45636)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "Managed Services (PO 49828)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "Managed Services 2016 (PO58406)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "Management Dashboard (PO48628)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "MART 4P Decomission (PO58627)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "MTN CLF Iran(PO45487)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "MTN Iran Projects", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "MTN Irancell BIB Implementation (Iran 5.4)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "MTN Irancell CER - 1605 � Discount Definition", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "MTN Mimir Iran Support", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "ODS - Seperation of Staging (PO58627)", "MTN Iran");
                SpecialDictionary.createItem("DictPONumbers", "AA AMC Support Ivory Coast (PO1503354)", "MTN Ivory Coast");
                SpecialDictionary.createItem("DictPONumbers", "BIB Ivory Coast", "MTN Ivory Coast");
                SpecialDictionary.createItem("DictPONumbers", "BIB.5.4 & MIMIR R4 Ivory Coast (PO10988)", "MTN Ivory Coast");
                SpecialDictionary.createItem("DictPONumbers", "CLF Ivory Coast(PO 9711/10144)", "MTN Ivory Coast");
                SpecialDictionary.createItem("DictPONumbers", "Data Analysis - Ivory Coast", "MTN Ivory Coast");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Additional EWP UAT (Awaiting PO)", "MTN Ivory Coast");
                SpecialDictionary.createItem("DictPONumbers", "Ivory Coast", "MTN Ivory Coast");
                SpecialDictionary.createItem("DictPONumbers", "MIMIR 2nd Line Support Ivory Coast (PO13530)", "MTN Ivory Coast");
                SpecialDictionary.createItem("DictPONumbers", "MIMIR Ivory Coast", "MTN Ivory Coast");
                SpecialDictionary.createItem("DictPONumbers", "Mobile Lending Project (PO15547)", "MTN Ivory Coast");
                SpecialDictionary.createItem("DictPONumbers", "1st line support (awaiting PO)", "MTN Liberia");
                SpecialDictionary.createItem("DictPONumbers", "2nd line support (awaiting P0)", "MTN Liberia");
                SpecialDictionary.createItem("DictPONumbers", "BIB Database Recovery (POLS1008728)", "MTN Liberia");
                SpecialDictionary.createItem("DictPONumbers", "BIB Mobile Money V2 (POLS1008422)", "MTN Liberia");
                SpecialDictionary.createItem("DictPONumbers", "BIB Multi currency & OpCo spec reports (POLS1008956)", "MTN Liberia");
                SpecialDictionary.createItem("DictPONumbers", "ECW (POLS1008474)", "MTN Liberia");
                SpecialDictionary.createItem("DictPONumbers", "Liberia BIB 5.5.2.2 (SPOC)", "MTN Liberia");
                SpecialDictionary.createItem("DictPONumbers", "Liberia VAS SDP (SPOC)", "MTN Liberia");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.4 Liberia (PO1005412)", "MTN Liberia");
                SpecialDictionary.createItem("DictPONumbers", "MTN CLF Liberia (PO 1007084)", "MTN Liberia");
                SpecialDictionary.createItem("DictPONumbers", "AA Nigeria (PO192569)", "MTN Nigeria");
                SpecialDictionary.createItem("DictPONumbers", "BIB 5.5 & MIMIR R4 Nigeria (192582/192682)", "MTN Nigeria");
                SpecialDictionary.createItem("DictPONumbers", "CER - BIB Change Enhancement (Awaiting PO)", "MTN Nigeria");
                SpecialDictionary.createItem("DictPONumbers", "CLF Nigeria (PO199754)", "MTN Nigeria");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Airtime on Demand (PO215007)", "MTN Nigeria");
                SpecialDictionary.createItem("DictPONumbers", "MIMIR Nigeria", "MTN Nigeria");
                SpecialDictionary.createItem("DictPONumbers", "MIMIR Support Nigeria", "MTN Nigeria");
                SpecialDictionary.createItem("DictPONumbers", "MTN Nigeria BIB 5.5 & Mimir v4", "MTN Nigeria");
                SpecialDictionary.createItem("DictPONumbers", "MTN Nigeria Box Foundation (PO 192682)", "MTN Nigeria");
                SpecialDictionary.createItem("DictPONumbers", "Nigeria(PO199754)", "MTN Nigeria");
                SpecialDictionary.createItem("DictPONumbers", "AA Rwanda (PO4669)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "BIB 2nd Line Support 2016 (Awaiting PO)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "BIB 2nd line Support Rwanda (PO 4924)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "CLF 2nd Line Support 2016 (Awaiting PO)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "CLF Rwanda (PO4456)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "DMD � Call history upgrading for Tracking (Awaiting PO)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - CRs for Dola & Unrated Records (Awaiting PO)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - ECW Real Time Commission (Awaiting PO)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - KPI List from BIB (Awaiting PO)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Loading of Missing Fields Services (PO5378)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Market Share (Awaiting PO)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Mbenki Services (Awaiting PO)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - ME2U Consolidated (Awaiting PO)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Missing Fields (Awaiting  PO)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - MM Interoperability (Awaiting PO)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Nano Segmentation - Full Solution (Awaiting PO)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Nano Segmentation - Interim Solution (PO4923)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Standardization of Segmentation (PO4762)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Voice Packs (Awaiting PO)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "Informatica Decommissioning Rwanda (Awaiting PO)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "Mobile Lending Dump Architecture (PO5440)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "Mobile Money Lending (PO 5119)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Demand Management Rwanda", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Rwanda V2.1", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Support Rwanda", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Wave 1.2 Rwanda", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "MTN MIMIR Rwanda", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "MTN Rwanda Advanced Analytics", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "MTN Rwanda BIB 5.5 & Mimir v4", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "MTN Rwanda Mobile Money (PO 4375)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "Rwanda BI Report Developer (PO4885)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "Rwanda(4374)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "SEA Managed Services 2015 Rwanda (PO117372)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "SEA Managed Services 2016 Rwanda (PO120662)", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "Solution Space Management", "MTN Rwanda");
                SpecialDictionary.createItem("DictPONumbers", "Advanced Analytics (PO317617)", "MTN South Africa (Group)");
                SpecialDictionary.createItem("DictPONumbers", "BIB 5.5 & MIMIR R4 (PO317617)", "MTN South Africa (Group)");
                SpecialDictionary.createItem("DictPONumbers", "MIMIR Support (PO270088)", "MTN South Africa (Group)");
                SpecialDictionary.createItem("DictPONumbers", "MTN Mimir South Africa", "MTN South Africa (Group)");
                SpecialDictionary.createItem("DictPONumbers", "Project Next (Presales)", "MTN South Africa (Group)");
                SpecialDictionary.createItem("DictPONumbers", "Project Next S&D Changes (PO330446)", "MTN South Africa (Group)");
                SpecialDictionary.createItem("DictPONumbers", "Advanced Analytics (PO5001)", "MTN South Sudan");
                SpecialDictionary.createItem("DictPONumbers", "BIB 2nd line Support South Sudan (PO6354)", "MTN South Sudan");
                SpecialDictionary.createItem("DictPONumbers", "BIB Subscriber Numbers (PO5277)", "MTN South Sudan");
                SpecialDictionary.createItem("DictPONumbers", "ECW Implementation(PO5657)", "MTN South Sudan");
                SpecialDictionary.createItem("DictPONumbers", "Hardware Migration (PO2156 - item 4)", "MTN South Sudan");
                SpecialDictionary.createItem("DictPONumbers", "Managed Services (Awaiting PO)", "MTN South Sudan");
                SpecialDictionary.createItem("DictPONumbers", "MIMIR 2nd line Support (PO4997)", "MTN South Sudan");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.4 South Sudan", "MTN South Sudan");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.5 & MIMIR R4 South Sudan (PO2156)", "MTN South Sudan");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Support - 2nd line South Sudan(PO5278)", "MTN South Sudan");
                SpecialDictionary.createItem("DictPONumbers", "MTN BiB Support South Sudan", "MTN South Sudan");
                SpecialDictionary.createItem("DictPONumbers", "On-site  Support Services South Sudan", "MTN South Sudan");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Support - 2nd line Sudan(POS10439)", "MTN Sudan");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Support North Sudan v1.1", "MTN Sudan");
                SpecialDictionary.createItem("DictPONumbers", "AA 2nd Line Support Swaziland (PO13039)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "BIB 2nd line Support Swaziland (PO10651)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "BIB 5.5; CLF & AA 2nd Line Support (PO12641)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "DMD - CLF Portal System Integration (PO13097)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Dealer Name Capturing (Awaiting PO)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Family & Friends Proposition Requirement (Awaiting PO)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Flat Rate (Awaiting PO)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Free Beyond 1 Promotion (Awaiting PO)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "DMD - International Calling Bundles (Awaiting PO)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "DMD - KPI FLYTXT (PO13017)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Swaziland Reports (Awaiting PO)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "DMD - USSD Charging Enhancements (PO10856)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "EWP ICP 15-04 (PO13166)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "Informatica Decommissioning (PO12947)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "LCMSi Swaziland (PO 012227)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "MTN Advanced Analytics Swaziland(PO10552)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.4 Swaziland", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Demand Management Swaziland", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Support Swaziland", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "MTN CLF Swaziland (PO11097)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "MTN SEA Managed Services Swaziland", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "MTN SS Hub Support (Swaziland)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "MTN Swaziland BIB 5.5 & Mimir v4", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "MTN Swaziland Mobile Money (PO 11092)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "SEA Managed Services 2015 Swaziland (PO117372)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "SEA Managed Services 2016 Swaziland (PO120662)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "Solution Space Management", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "Swaziland", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "Swaziland (PO11444)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "Swaziland VAS-SDP (PO12211)", "MTN Swaziland");
                SpecialDictionary.createItem("DictPONumbers", "BIB 5.5 & MIMIR R4 Implementation (PO26-2015)", "MTN Syria");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Syria V2.1", "MTN Syria");
                SpecialDictionary.createItem("DictPONumbers", "AA Uganda (PO117103)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "BIB 1st line Support Uganda", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "BIB 2nd line Support Uganda (PO120491)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "BIB 5.4 Uganda", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "BIB 5.5 - 2nd Line Support Uganda (PO119471)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "BIB 5.5.3.0 Upgrade (NO PO required)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "BIB Demand Management Uganda (PO112686)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "CDR Changes / Shared Account (PO118181)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "CER - Base Station (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "CER - ExtData3 Processing (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "CER - Online Vendor Statement (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "CER - Point of Sale (PO117706)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "CR for Standard Reports (PO121080)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - ADC Handset (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Additional NEON Data Views (PO120712)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Airtime Credit Me (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Blackberry Enhancement (PO118739)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Bulk Activation & Mass Reversal of Bundles (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Commissioning Forms SRS (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Corporate Prepaid Service (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - CRBT Micro Billing Report (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Credit Me Recons & Recoveries (PO119888)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Data Configuration & Aggregation (PO 119706)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - DB Management Solution (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Dealer Voucher Reporting (PO119853)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Depletion Rate Changes (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Dim Base Station Charges (PO 119887)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - ECW Convergent (PO119702)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Flag to Capture Fully Verified Status (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Global Roaming VCP (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Happy Day Offer (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - IMS Reporting (PO119854)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - LCMS Tenure & Internet Campaign (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Me2U Internet (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Mobile Advertising (PO120999)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Mobile Money Dump (PO121168)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Mobile Money Refill (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - MTN 141 (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - MTN International Calling Bundles - Country (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - MTN International Calling Bundles - Modified (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - MTN Social Bundles (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - MTNU & Nairtime", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - New SIM Swap process for HRC (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Partner Reconciliation (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Refill and Adjustments (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Roaming VAS Enhancement (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Smart Internet Bundle (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - SMS Billing Services (PO 118107)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - SMS Bundle (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Start up Airtime for new Subscribers (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Subscriber Registration (PO120747)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Voice Bundles Delivery (PO118737)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Volume Threshold (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "EWP ICP 15-04 (PO120936)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "IMS Change Reqiest (PO121581)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "Informatica Decommissioning Uganda (PO120855)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "LCMSi - 2nd Line Support (PO120491)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "LCMSi - Additional Attributes BOT (PO 115984)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "Micro Billing Report Delivery (PO118319)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.4 Uganda", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.5 & MIMIR R4 Uganda(PO111597)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Demand Management Uganda", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Support - 2nd line Uganda(PO114959)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Support Uganda", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "MTN CLF Uganda (PO 113119)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "MTN CLF Uganda Migration", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "MTN LCMSi Uganda", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "MTN Mimir Uganda", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "MTN SEA Managed Services Uganda", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "MTN SS Hub Support", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "MTN Uganda Advanced Analytics", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "MTN Uganda BIB 5.5 & Mimir v4", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "MTN Uganda CLF (for Zambia) PO 112991", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "MTN Uganda Mobile Money (PO 114135)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "OCC", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "On-Site Support Services Uganda", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "Q3 Release Implementation (PO121352)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "Report Developer Uganda 2016 (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "SEA CDR Dashboard (Awaiting PO)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "SEA Managed Services 2015 Uganda(PO117372)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "SEA Managed Services 2016 Uganda (PO120662)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "Solution Space Management", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "Uganda - CER - Voice Bundles", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "Uganda (PO113418)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "Uganda Mobile Lending (PO118433)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "Uganda Report Developer (PO118226)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "Uganda Shared Account", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "Uganda Upgrade(n/a)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "Uganda VAS-SDP (PO118289)", "MTN Uganda");
                SpecialDictionary.createItem("DictPONumbers", "BIB 2nd Line Support 2016 (PO26528)", "MTN Yemen");
                SpecialDictionary.createItem("DictPONumbers", "MIMIR 2nd Line Support 2016 (Awaiting PO)", "MTN Yemen");
                SpecialDictionary.createItem("DictPONumbers", "MTN Advanced Analytics Yemen (PO20831)", "MTN Yemen");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.4 Yemen (PO20830)", "MTN Yemen");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.5 & MIMIR R4 Yemen MIMIR R4(PO23370)", "MTN Yemen");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.5 & MIMIR R4 Yemen(PO23368)", "MTN Yemen");
                SpecialDictionary.createItem("DictPONumbers", "MTN Yemen :: Annual Maintenance Contract (PO 23483)", "MTN Yemen");
                SpecialDictionary.createItem("DictPONumbers", "Solution Space Management", "MTN Yemen");
                SpecialDictionary.createItem("DictPONumbers", "Yemen(PO20831)", "MTN Yemen");
                SpecialDictionary.createItem("DictPONumbers", "AA Support (PO27181)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "BIB 2nd line Support Zambia (PO27181)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "CER - LIfe After Life (PO25953)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - AFB Savings & Loans (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Automation Schedule of USSD & SMS Tag (PO26836)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - BIB ERS File Loader (PO27068)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Birthday Delights Enhancements (PO26135)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Bonus Incoming Call (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Bulk SMS (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Caller Identification (PO25388)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Cloud IVR (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Data Sharing Enhancement Me2U (PO25633)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Data Sharing Me2U (PO25389)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Datamart (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Dream Number - Yako Ni Yako (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - EBU Segmentation Revenue Reporting (PO25675)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - ECW Add On Features (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - ECW Real Time Commission (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - ECW Reports (PO 26413)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Friends & Family Report (PO25677)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - FXL Workflow (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Hello Doctor (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Inmobia STK Content (PO25848)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Instant Win (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Kick Back Promotion (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Lyric SMS CUG (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Missing Call Types - Concierge Usage Summary (PO26678)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - One Call Service (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Prestige Club (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Provisioning Failure Report (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Rate n Date (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Roaming Performance (PO26063)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Roaming Performance Reports (PO 26238)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Scratch Cards (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Shared Account (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - SIM Swap Process Changes (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Smart Bundling (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - SME in a box SRS (PO25957)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Spaka SMS (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - Spanish Lessons (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - USSD Charging (Awaiting PO)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - XtraTime (PO26435)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "DMD - ZescoWeb Reporting (PO P25679)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "EWP ICP 15-04 (PO27099)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "Informatica Decommissioning (PO26788)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "LCMSi New Attributes Zambia (PO23808)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "LCMSi Zambia Support (PO27181)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "Mobile Lending (PO25680)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "Mobile Lending Dump Architecture (PO26992)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "MTN Advanced Analytics Zambia(PO20587)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.4 Zambia", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB 5.5 & MIMIR R4 Zambia (PO20458)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "MTN BIB Demand Management Zambia", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "MTN BiB Support Zambia", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "MTN CLF Zambia Migration", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "MTN SEA Managed Services Zambia", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "MTN Zambia - Dev of Mobile Money v2 - ECW (PO22971)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "Report Developer Zambia 2016 (PO27050)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "Report Development Zambia", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "SEA Managed Services 2015 Zambia(PO117372)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "SEA Managed Services 2016 Zambia (PO120662)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "Solution Space Management", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "Zambia CS6 Implementation", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "Zambia Hybrid Airtime Sharing (PO25676)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "Zambia Report Developers (PO25654)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "Zambia VAS-SDP (PO 25762)", "MTN Zambia");
                SpecialDictionary.createItem("DictPONumbers", "Data Integrator Standby", "PBT Data Integrator");
                SpecialDictionary.createItem("DictPONumbers", "PBT Data Integrator", "PBT Data Integrator");
            });
});