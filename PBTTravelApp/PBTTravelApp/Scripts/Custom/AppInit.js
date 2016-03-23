"use strict";
var AppInit = window.AppInit || {};
var formDigestValue = "";
AppInit = function () {
    var e = function () {
        if (formDigestValue == "") {
            $.ajax({
                url: appweburl + "/_api/contextinfo",
                method: "POST",
                async: false,
                headers: {
                    Accept: "application/json; odata=verbose"
                },
                cache: false,
                success: function (f) {
                    formDigestValue = f.d.GetContextWebInformation
                        .FormDigestValue;
                },
                error: function (f, g, h) {
                    alert(h);
                }
            });
        }
        return formDigestValue;
    },
        c = function (g) {
            var f = e();
            $.ajax({
                url: appweburl +
                    "/_api/Web/lists/getbytitle('CustomUserRoles')/items",
                contentType: "application/json;odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.CustomUserRolesListItem"
                    },
                    Title: "Admin",
                    UserId: g
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": f
                }
            });
        },
        d = function (i, f, j, h) {
            var g = e();
            $.ajax({
                url: appweburl +
                    "/_api/Web/lists/getbytitle('Settings')/items",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.SettingsListItem"
                    },
                    Title: i,
                    EnumValue: f,
                    SettingValue: j,
                    Hidden: h
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": g
                }
            });
        },
        b = function (g, h) {
            var f = e();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('" + g +
                    "')/items",
                contentType: "application/json; odata=verbose",
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data." + g + "ListItem"
                    },
                    Title: h
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": f
                }
            });
        },
        a = function () {
            var f = e();
            var g;
            $.ajax({
                url: appweburl +
                    "/_api/web/siteusers?$filter=Title eq 'Everyone' or substringof('spo-grid-all-users',LoginName)&$select=Id",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                cache: false,
                success: function (h) {
                    if (h.d.results[0] != null) {
                        g = h.d.results[0].Id;
                    }
                }
            });
            $.ajax({
                url: appweburl +
                    "/_api/web/breakroleinheritance(copyRoleAssignments = true, clearSubscopes = true)",
                contentType: "application/json; odata=verbose",
                type: "POST",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": f
                }
            });
            $.ajax({
                url: appweburl +
                    "/_api/web/roleassignments/addroleassignment(principalid=" + g + ",roleDefId=1073741827)",
                contentType: "application/json; odata=verbose",
                type: "POST",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": f
                }
            });
        };
    return {
        createSettingsEntry: d,
        createDictionaryEntry: b,
        createRoleItemEntry: c,
        assignRoles: a
    };
}();
$(document).ready(function () {
    if (SystemSettings.AppInitExecuted == "false") {
        AppInit.assignRoles();
        AppInit.createRoleItemEntry(CurrentUser.Id);

        AppInit.createDictionaryEntry("DictProjects","MTN BIB");

        AppInit.createSettingsEntry("AppInitExecuted","AppInitExecuted", "true", "true");
        AppInit.createSettingsEntry("Default currency name","DefaultCurrencyName", "ZAR", "false");
        AppInit.createSettingsEntry("Organization Name","OrganizationName", "PBT Group", "false");
    }
});