"use strict";
var UserRoles = window.UserRoles || {};
UserRoles = function () {
    var d = function () {
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
        e = function () {
            var f;
            return $.Deferred(function (g) {
                $.ajax({
                    url: appweburl +
                        "/_api/Web/lists/getbytitle('CustomUserRoles')/items?$select=ID,User/Title,User/Id&$expand=User/Title,User/Id",
                    type: "GET",
                    headers: {
                        accept: "application/json;odata=verbose"
                    },
                    dataType: "json",
                    cache: false,
                    success: function (h) {
                        f = {
                            Result: "OK",
                            Records: h.d.results
                        };
                        g.resolve(f);
                    },
                    error: function () {
                        g.reject();
                    }
                });
            });
        },
        c = function () {
            var f;
            $.ajax({
                url: appweburl +
                    "/_api/web/siteusers?$filter=PrincipalType eq 1 and substringof('SPOCrawler',LoginName) eq false and substringof('system',LoginName) eq false and substringof('SharePoint',Title) eq false and substringof('_SPO',Title) eq false and substringof('_spoc',LoginName) eq false",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                cache: false,
                success: function (g) {
                    f = g.d.results;
                },
                error: function (i, g, h) {
                    alert(h);
                }
            });
            return f;
        },
        a = function (i, j, h) {
            var f = d();
            var g;
            return $.Deferred(function (k) {
                var l = false;
                $.ajax({
                    url: appweburl +
                        "/_api/Web/lists/getbytitle('CustomUserRoles')/items?$select=ID, User/Id&$expand=User/Id&$filter=User/Id eq " +
                        i,
                    type: "GET",
                    async: false,
                    headers: {
                        accept: "application/json;odata=verbose"
                    },
                    dataType: "json",
                    success: function (m) {
                        if (m.d.results.length > 0) {
                            l = true;
                        }
                    }
                });
                if (l) {
                    g = {
                        Result: "ERROR",
                        Message: "User is already on the list"
                    };
                    k.resolve(g);
                    return;
                }
                $.ajax({
                    url: appweburl +
                        "/_api/Web/lists/getbytitle('CustomUserRoles')/items",
                    contentType: "application/json; odata=verbose",
                    async: false,
                    type: "POST",
                    data: JSON.stringify({
                        __metadata: {
                            type: "SP.Data.CustomUserRolesListItem"
                        },
                        Title: h,
                        UserId: i
                    }),
                    headers: {
                        accept: "application/json;odata=verbose",
                        "x-requestforceauthentication": true,
                        "X-RequestDigest": f
                    },
                    success: function (m) {
                        g = {
                            Result: "OK",
                            Record: {
                                Id: m.d.Id,
                                Title: j
                            }
                        };
                        k.resolve(g);
                    },
                    error: function (o, m, n) {
                        k.reject();
                    }
                });
            });
        },
        b = function (g) {
            var f = d();
            var h;
            return $.Deferred(function (i) {
                $.ajax({
                    url: appweburl +
                        "/_api/Web/lists/getbytitle('CustomUserRoles')/getItemByStringId('" +
                        g + "')",
                    type: "DELETE",
                    headers: {
                        accept: "application/json;odata=verbose",
                        "X-RequestDigest": f,
                        "IF-MATCH": "*"
                    },
                    success: function (j) {
                        h = {
                            Result: "OK"
                        };
                        i.resolve(h);
                    },
                    error: function (l, j, k) {
                        i.reject();
                    }
                });
            });
        };
    return {
        getAllUsers: c,
        readAll: e,
        createItem: a,
        deleteItem: b
    };
}();
$(document).ready(function () {
    if (CurrentUser.IsAdmin != false) {
        location.href = "AccessDenied.aspx";
        return;
    }
    $("#Administrators").jtable({
        title: "System administrators",
        paging: false,
        defaultSorting: "Title asc",
        messages: {
            addNewRecord: "Add new"
        },
        actions: {
            listAction: function (b, a) {
                return UserRoles.readAll();
            },
            createAction: function (a) {
                return UserRoles.createItem($("#Edit-User")
                    .val(), $(
                        "#Edit-User option:selected").text(),
                    "Admin");
                $("#Administrators").jtable("reload");
            },
            deleteAction: function (a) {
                return UserRoles.deleteItem(a.ID);
                $("#Administrators").jtable("reload");
            }
        },
        fields: {
            ID: {
                key: true,
                create: false,
                edit: false,
                list: false
            },
            User: {
                title: "User",
                width: "100%",
                options: function (b) {
                    b.clearCache();
                    var a = UserRoles.getAllUsers();
                    var c = new Array();
                    c.push({
                        Value: "",
                        DisplayText: "Select user..."
                    });
                    $.each(a, function () {
                        c.push({
                            Value: this.Id,
                            DisplayText: this
                                .Title
                        });
                    });
                    return c;
                },
                display: function (a) {
                    if (typeof a.record.User != "undefined" &&
                        a.record.User != null) {
                        return a.record.User.Title;
                    } else {
                        if (a.record.Title != null) {
                            return a.record.Title;
                        }
                    }
                },
                sorting: false
            }
        },
        formCreated: function (b, a) {
            a.form.find('select[name="User"]').addClass(
                "validate[required]");
            a.form.validationEngine();
        },
        formSubmitting: function (b, a) {
            return a.form.validationEngine("validate");
        },
        formClosed: function (b, a) {
            a.form.validationEngine("hide");
            a.form.validationEngine("detach");
        }
    });
    $("#Administrators").jtable("load");
    $(".ui-dialog-buttonpane").find('button:contains("Save")').addClass(
        "btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Delete")').addClass(
        "btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Cancel")').addClass(
        "btn");
    $(".ui-dialog-buttonpane").find('button:contains("Close")').addClass(
        "btn");
});