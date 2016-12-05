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
                            Title: k.d.Title,
                            Client: k.d.Client
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
    d = function (r , e) {
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
                listAction: function (g, f) {
                    return SpecialDictionary.readAll(g, f);
                },
                updateAction: function (f) {
                    return SpecialDictionary.updateItem("Dict" + e, a(f, "Id"), c(a(f, "Title")), c(a(f, "Client")));
                },
                createAction: function (f) {
                    return SpecialDictionary.createItem("Dict" + e, c(a(f, "Title")), c(a(f, "Client")));
                },
                deleteAction: function (f) {
                    return SpecialDictionary.deleteItem("Dict" + e, f.Id);
                }
            },
            fields: {
                Id: {
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
});