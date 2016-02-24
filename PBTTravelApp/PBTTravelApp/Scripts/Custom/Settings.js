﻿"use strict";
var Settings = window.Settings || {};
Settings = function () {
    var a = function () {
        var d = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (e) {
                d = e.d.GetContextWebInformation.FormDigestValue;
            },
            error: function (e, f, g) {
                alert(g);
            }
        });
        return d;
        },
        b = function (d) {
            var e;
            return $.Deferred(function (f) {
                $.ajax({
                    url: appweburl +
                        "/_api/Web/lists/getbytitle('" + d +
                        "')/items?$select=Title,ID,SettingValue&$filter=Hidden eq false",
                    type: "GET",
                    headers: {
                        accept: "application/json;odata=verbose"
                    },
                    dataType: "json",
                    cache: false,
                    success: function (g) {
                        e = {
                            Result: "OK",
                            Records: g.d.results
                        };
                        f.resolve(e);
                    },
                    error: function () {
                        f.reject();
                    }
                });
            });
        },
        c = function (f, e, h) {
            var d = a();
            var g;
            return $.Deferred(function (i) {
                $.ajax({
                    url: appweburl +
                        "/_api/Web/lists/getbytitle('" + f +
                        "')/getItemByStringId('" + e + "')",
                    type: "POST",
                    async: true,
                    contentType: "application/json;odata=verbose",
                    data: JSON.stringify({
                        __metadata: {
                            type: "SP.Data." + f +
                                "ListItem"
                        },
                        SettingValue: h
                    }),
                    headers: {
                        accept: "application/json;odata=verbose",
                        "X-RequestDigest": d,
                        "X-Http-Method": "PATCH",
                        "IF-MATCH": "*"
                    },
                    success: function (j) {
                        g = {
                            Result: "OK"
                        };
                        i.resolve(g);
                    },
                    error: function (l, j, k) {
                        i.reject();
                    }
                });
            });
        };
    return {
        readAll: b,
        updateItem: c
    };
}();
$(document).ready(function () {
    if (CurrentUser.IsAdmin == false) {
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
            if (f[0] == e) {
                return f[1];
            }
        }
    };
    var b = function (e, d) {
        $("#" + e).jtable({
            title: d,
            paging: false,
            defaultSorting: "Title asc",
            messages: {
                addNewRecord: "Add new"
            },
            actions: {
                listAction: function (g, f) {
                    return Settings.readAll(e);
                },
                updateAction: function (f) {
                    return Settings.updateItem(e, a(f,
                        "ID"), c(a(f,
                        "SettingValue")));
                    $("#" + e).jtable("reload");
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
                    edit: false,
                    title: "Name",
                    width: "250"
                },
                SettingValue: {
                    title: "Value",
                    width: "250"
                },
            },
            formCreated: function (g, f) {
                f.form.find(
                    'input[name="SettingValue"]').addClass(
                    "validate[required]");
                f.form.validationEngine();
            },
            formSubmitting: function (g, f) {
                $("#Edit-SettingValue").val($(
                        "#Edit-SettingValue").val()
                    .StripTags());
                return f.form.validationEngine(
                    "validate");
            },
            formClosed: function (g, f) {
                f.form.validationEngine("hide");
                f.form.validationEngine("detach");
            }
        });
        $("#" + e).jtable("load");
    };
    b("Settings", "Settings items");
    $(".ui-dialog-buttonpane").find('button:contains("Save")').addClass(
        "btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Delete")').addClass(
        "btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Cancel")').addClass(
        "btn");
});