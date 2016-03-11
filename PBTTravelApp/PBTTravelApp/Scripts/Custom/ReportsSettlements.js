"use strict";
var ReportsSettlements = window.ReportsSettlements || {};
ReportsSettlements = function () {
    var d = function (g, e) {
        var h = "";
        if (g != null) {
            for (var f = 0; f < g.length; f++) {
                h += e + " eq '" + g[f] + "' ";
                if (f < g.length - 1) {
                    h += " or ";
                }
            }
        }
        return h;
        },
        a = function (f) {
            var e;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/" + f +
                    "/?$select=Name&$inlinecount=allpages",
                type: "GET",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                success: function (g) {
                    e = g.d.results;
                },
                error: function (i, g, h) {
                    alert(h);
                }
            });
            return e;
        },
        b = function () {
            var n = $("#txtStartDate").val().StripTags();
            var h = $("#txtEndDate").val().StripTags();
            if (moment(n).isValid() == false || moment(h).isValid() == false) {
                addMessage("Incorrect date format in date filter", "error");
                return $.Deferred(function (p) { });
            }
            var f = " and (Created ge datetime'" + n +
                "T00%3a00%3a00') and (Created le datetime'" + h +
                "T00%3a00%3a00') ";
            var m = "";
            if ($.trim($("#txtRequesterName").val()).length > 0) {
                m = " and substringof('" + $("#txtRequesterName").val().StripTags() +
                    "',RequesterName) ";
            }
            var o = " ";
            if ($("#chblStatus").val() != null) {
                o = " and (" + d($("#chblStatus").val(), "SettlementStatus") +
                    ") ";
            }
            var g = " ";
            if ($("#chblDepartment").val() != null) {
                g = " and (" + d($("#chblDepartment").val(), "Department") +
                    ") ";
            }
            var j = " ";
            if ($("#chblProject").val() != null) {
                j = " and (" + d($("#chblProject").val(), "Project") + ") ";
            }
            var e = " ";
            if ($("#chblCostCenter").val() != null) {
                e = " and (" + d($("#chblCostCenter").val(), "CostCenter") +
                    ") ";
            }
            var i = "IsSettlement eq true  " + f + m + o + g + j + e;
            var k = appweburl +
                "/_vti_bin/ListData.svc/TravelRequests/?$filter=" + i +
                "&$inlinecount=allpages&$select=Id,RequesterName,Created,TripStartDate,TripEndDate,SettlementStatus,TripPurpose, Department, Project, CostCenter, SettlementTotalCost, SettlementTravelExpensesJSON";
            var l;
            $.ajax({
                url: k,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (p) {
                    l = p.d.results;
                },
                error: function (r, p, q) {
                    alert(q);
                }
            });
            return l;
        },
        c = function (k, j) {
            var o;
            var p = $("#txtStartDate").val().StripTags();
            var h = $("#txtEndDate").val().StripTags();
            if (moment(p).isValid() == false || moment(h).isValid() ==
                false) {
                addMessage("Incorrect date format in date filter", "error");
                return $.Deferred(function (r) { });
            }
            var f = " and (Created ge datetime'" + p +
                "T00%3a00%3a00') and (Created le datetime'" + h +
                "T00%3a00%3a00') ";
            var n = "";
            if ($.trim($("#txtRequesterName").val()).length > 0) {
                n = " and substringof('" + $("#txtRequesterName").val().StripTags() +
                    "',RequesterName) ";
            }
            var q = " ";
            if ($("#chblStatus").val() != null) {
                q = " and (" + d($("#chblStatus").val(), "SettlementStatus") +
                    ") ";
            }
            var g = " ";
            if ($("#chblDepartment").val() != null) {
                g = " and (" + d($("#chblDepartment").val(), "Department") +
                    ") ";
            }
            var l = " ";
            if ($("#chblProject").val() != null) {
                l = " and (" + d($("#chblProject").val(), "Project") + ") ";
            }
            var e = " ";
            if ($("#chblCostCenter").val() != null) {
                e = " and (" + d($("#chblCostCenter").val(), "CostCenter") +
                    ") ";
            }
            var i = "IsSettlement eq true  " + f + n + q + g + l + e;
            var m = appweburl +
                "/_vti_bin/ListData.svc/TravelRequests/?$filter=" + i +
                "&$inlinecount=allpages&$select=Id,RequesterName,Created,TripStartDate,TripEndDate,SettlementStatus,TripPurpose, Department, Project, CostCenter, SettlementTotalCost&$orderby=" +
                j.jtSorting.replace(" DESC", " desc").replace(" ASC",
                    " asc") + "&$skip=" + j.jtStartIndex + "&$top=" + j.jtPageSize;
            return $.Deferred(function (r) {
                $.ajax({
                    url: m,
                    type: "GET",
                    headers: {
                        accept: "application/json;odata=verbose"
                    },
                    dataType: "json",
                    cache: false,
                    success: function (s) {
                        o = {
                            Result: "OK",
                            Records: s.d.results,
                            TotalRecordCount: s.d.__count
                        };
                        r.resolve(o);
                    },
                    error: function () {
                        r.reject();
                    }
                });
            });
        };
    return {
        getExportData: b,
        getRequests: c,
        getDictionary: a
    };
}();
$(document).ready(function () {
    if (CurrentUser.IsAdmin == false) {
        location.href = "AccessDenied.aspx";
        return;
    }
    $("#btnRefresh").click(function (l) {
        l.preventDefault();
        $("#TableRequests").jtable("reload");
    });
    $("#txtStartDate").datepicker();
    $("#txtEndDate").datepicker();
    $.datepicker.setDefaults({
        dateFormat: commonDateFormat,
        showButtonPanel: false,
        changeMonth: false,
        changeYear: false,
    });
    var a = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var i = a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() +
        1;
    var b = a.getDate() < 10 ? "0" + a.getDate() : a.getDate();
    var k = a.getFullYear();
    $("#txtStartDate").val(k + "-01-01");
    $("#txtEndDate").val(k + "-" + i + "-" + b);
    var g = ReportsSettlements.getDictionary("DictDepartments");
    var d = $("#chblDepartment");
    $.each(g, function () {
        d.append($("<option>", {
            value: this.Name,
            text: this.Name
        }));
    });
    var h = ReportsSettlements.getDictionary("DictProjects");
    var e = $("#chblProject");
    $.each(h, function () {
        e.append($("<option>", {
            value: this.Name,
            text: this.Name
        }));
    });
    var f = ReportsSettlements.getDictionary("DictCostCenters");
    var c = $("#chblCostCenter");
    $.each(f, function () {
        c.append($("<option>", {
            value: this.Name,
            text: this.Name
        }));
    });
    var j = function () {
        var m = navigator.appName === "Microsoft Internet Explorer";
        var l = !!navigator.userAgent.match(/Trident\/7\./);
        return !(m || l);
    };
    $("#btnExport").click(function (o) {
        var l = '","';
        var r = '"\r\n';
        var m =
            '"Id","Created","Start Date","End Date","Settlement Status","Requester Name","Trip Purpose","Department","Project","Cost Center","Total Cost' +
            r;
        var p = ReportsSettlements.getExportData();
        $.each(p, function () {
            m += '"' + this.Id + l + moment(this.Created)
                .format(commonDateFormat2) + l + moment(
                    this.TripStartDate).format(
                    commonDateFormat2) + l + moment(
                    this.TripEndDate).format(
                    commonDateFormat2) + l + this.SettlementStatus +
                l + this.RequesterName + l + this.TripPurpose +
                l + this.Department + l + this.Project +
                l + this.CostCenter + l + this.SettlementTotalCost +
                r;
        });
        if (!j()) {
            n = decodeURIComponent(m);
            var q = document.getElementById("csvDownloadFrame");
            q = q.contentWindow || q.contentDocument;
            q.document.open("text/csv", "replace");
            q.document.write(n);
            q.document.close();
            q.focus();
            q.document.execCommand("SaveAs", true,
                "export-summary.csv");
        }
        else {
            var n = "data:application/csv;charset=utf-8," +
                encodeURIComponent(m);
            $(this).attr({
                download: "export.csv",
                href: n,
                target: "_blank"
            });
        }
    });
    $("#btnExportExpenses").click(function (p) {
        var l = '","';
        var r = '"\r\n';
        var m =
            '"Id","Requester Name","Project","Department","Cost Center","Expense Date","Description","Category","Payment Source","Currency","Exchange Rate","Currency Amount","Reimbursement Amount' +
            r;
        var o = ReportsSettlements.getExportData();
        $.each(o, function () {
            var w = this.Id;
            var x = this.RequesterName;
            var v = this.Project;
            var t = this.Department;
            var s = this.CostCenter;
            var u = $.parseJSON(this.SettlementTravelExpensesJSON);
            $.each(u, function () {
                if (this.ExpenseDate != null ||
                    this.CurrencyAmount != null
                ) {
                    m += '"' + w + l + x + l +
                        v + l + t + l + s + l +
                        (this.ExpenseDate !=
                            null ? this.ExpenseDate :"") + l + (this.Description !=null ? this.Description :
                            "") + l + (this.Category !=
                            null ? this.Category :
                            "") + l + (this.PaymentSource !=
                            null ? this.PaymentSource :
                            "") + l + (this.Currency !=
                            null ? this.Currency :
                            "") + l + (this.ExchangeRate !=
                            null ? this.ExchangeRate :
                            "") + l + (this.CurrencyAmount !=
                            null ? this.CurrencyAmount :
                            "") + l + (this.ReimbursementAmount !=
                            null ? this.ReimbursementAmount :
                            "") + r;
                }
            });
        });
        if (!j()) {
            n = decodeURIComponent(m);
            var q = document.getElementById("csvDownloadFrame");
            q = q.contentWindow || q.contentDocument;
            q.document.open("text/csv", "replace");
            q.document.write(n);
            q.document.close();
            q.focus();
            q.document.execCommand("SaveAs", true,
                "export-expenses.csv");
        }
        else {
            var n = "data:application/csv;charset=utf-8," +
                encodeURIComponent(m);
            $(this).attr({
                download: "export.csv",
                href: n,
                target: "_blank"
            });
        }
    });
    $(function () {
        $("#TableRequests").jtable({
            title: "Settlements list",
            paging: true,
            pageSize: 10,
            sorting: true,
            multiSorting: true,
            defaultSorting: "Id desc",
            actions: {
                listAction: ReportsSettlements.getRequests
            },
            fields: {
                Id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: true,
                    title: "ID",
                    width: "3%",
                },
                Created: {
                    title: "Created",
                    width: "7%",
                    display: function (l) {
                        var m = moment(l.record.Created);
                        if (m.isValid()) {
                            return m.format(
                                commonDateFormat2
                            );
                        }
                    }
                },
                TripStartDate: {
                    title: "Trip Start",
                    width: "7%",
                    display: function (l) {
                        var m = moment(l.record.TripStartDate);
                        if (m.isValid()) {
                            return m.format(
                                commonDateFormat2
                            );
                        }
                    }
                },
                TripEndDate: {
                    title: "Trip End",
                    width: "7%",
                    display: function (l) {
                        var m = moment(l.record.TripEndDate);
                        if (m.isValid()) {
                            return m.format(
                                commonDateFormat2
                            );
                        }
                    }
                },
                SettlementStatus: {
                    title: "Status",
                    width: "10%"
                },
                RequesterName: {
                    title: "Requester Name",
                    width: "15%"
                },
                Department: {
                    title: "Department",
                    width: "10%",
                    sorting: true,
                },
                Project: {
                    title: "Project",
                    width: "10%",
                    sorting: true,
                },
                CostCenter: {
                    title: "CostCenter",
                    width: "10%",
                    sorting: true,
                },
                SettlementTotalCost: {
                    title: "Total Cost (" +
                        SystemSettings.DefaultCurrencyName +
                        ")",
                    width: "10%",
                    sorting: false
                },
                CustomViewAction: {
                    title: "",
                    listClass: "jtable-command-column",
                    sorting: false,
                    width: "1%",
                    display: function (l) {
                        return;
                        "<button title='View' onclick='location.href=\"SettlementFormView.aspx?requestID=" +
                        l.record.Id +
                        "\"' class='jtable-command-button jtable-view-command-button'><span>View</span></button>";
                    }
                },
                CustomEditAction: {
                    title: "",
                    listClass: "jtable-command-column",
                    sorting: false,
                    width: "1%",
                    display: function (l) {
                        return;
                        "<button title='Edit' onclick='location.href=\"SettlementFormEdit.aspx?requestID=" +
                        l.record.Id +
                        "\"' class='jtable-command-button jtable-edit-command-button'><span>Edit</span></button>";
                    }
                }
            }
        });
        $("#TableRequests").jtable("load");
    });
});