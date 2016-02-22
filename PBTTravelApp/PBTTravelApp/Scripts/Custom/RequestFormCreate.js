"use strict";
var RequestFormCreate = window.RequestFormCreate || {};
RequestFormCreate = function () {
    var h;
    var g = function (i) {
        if ($("input[type=file]").length > 1 && !window.FileReader) {
            alert(
                "You cannot upload file because HTML5 FileSystem APIs are not fully supported in this browser."
            );
        }
        $("input[type=file]").each(function () {
            var k = $(this).prop("files");
            var j = k[0];
            if (j) {
                var l = new FileReader();
                l.onload = function (m) {
                    h(i, j.name, m.target.result);
                };
                l.readAsDataURL(j);
            }
        });
    };
    var e;
    var a;
    h = function (l, j, i) {
        var k = e();
        $.ajax({
            url: appweburl +
                "/_api/Web/lists/getbytitle('TravelRequests')/items(" +
                l + ")/AttachmentFiles/add(FileName='" + j +
                "')",
            type: "POST",
            async: false,
            processData: false,
            headers: {
                accept: "application/json;odata=verbose",
                "x-requestforceauthentication": true,
                "X-RequestDigest": k
            },
            data: a(i),
            error: function () { }
        });
    };
    e = function () {
        var i = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (j) {
                i = j.d.GetContextWebInformation.FormDigestValue;
            },
            error: function (j, k, l) {
                alert(l);
            }
        });
        return i;
    };
    a = function (n) {
        var l = ";base64,";
        var m = n.indexOf(l) + l.length;
        var k = n.substring(m);
        var p = window.atob(k);
        var q = p.length;
        var j = new Uint8Array(new ArrayBuffer(q));
        for (var o = 0; o < q; o++) {
            j[o] = p.charCodeAt(o);
        }
        return j;
    };
    var d = function (j) {
        var i;
        $.ajax({
            url: appweburl + "/_api/Web/lists/getbytitle('" + j +
                "')/items?$select=Title,ID",
            type: "GET",
            async: false,
            headers: {
                accept: "application/json;odata=verbose"
            },
            dataType: "json",
            cache: false,
            success: function (k) {
                i = k.d.results;
            },
            error: function (thrownError) {
                alert(thrownError);
            }
        });
        return i;
    },
        c = function () {
            var i;
            $.ajax({
                url: appweburl +
                    "/_api/web/siteusers?$filter=Email ne '' and substringof('SPOCrawler',Email) eq false and PrincipalType eq 1 and substringof('SPOCrawler',LoginName) eq false and substringof('system',LoginName) eq false and substringof('SharePoint',Title) eq false and substringof('_SPO',Title) eq false and substringof('spocrwl',LoginName) eq false",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                cache: false,
                success: function (j) {
                    i = j.d.results;
                },
                error: function (l, j, k) {
                    alert(k);
                }
            });
            return i;
        },
        b = function (j) {
            var i = e();
            $.ajax({
                url: appweburl +
                    "/_api/Web/lists/getbytitle('TravelRequests')/items",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.TravelRequestsListItem"
                    },
                    Title: j.RequesterName,
                    Email: j.Email,
                    EmployeeID: j.EmployeeID,
                    PhoneNumber: j.PhoneNumber,
                    Department: j.Department,
                    Project: j.Project,
                    CostCenter: j.CostCenter,
                    TripStartDate: moment(j.TripStartDate).utc()
                        .format(sharepointDateFormat),
                    TripEndDate: moment(j.TripEndDate).utc()
                        .format(sharepointDateFormat),
                    TripPurpose: j.TripPurpose,
                    Notices: j.Notices,
                    RequestApproverId: j.RequestApprover,
                    DestinationsJSON: j.DestinationsJSON,
                    TravelExpensesJSON: j.TravelExpensesJSON,
                    RequestStatus: RequestStatusEnum.Draft.Value,
                    RequestTotalCost: j.RequestTotalCost,
                    IsSettlement: "false"
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": i
                },
                success: function (k) {
                    g(k.d.Id);
                    location.href =
                        "RequestFormView.aspx?requestID=" + k.d
                        .Id;
                },
                error: function (m, k, l) {
                    alert(l);
                }
            });
        }

    return {
        getAllUsers: c,
        getDictionary: d,
        createRequestForm: b
    };
}();
$(document).ready(function () {
    $("#tabs").tabs({
        event: "mouseover"
    });
    $("#requestFormCreate").submit(function (q) {
        if ($("#requestFormCreate").valid()) {
            q.preventDefault();
            var r = {};
            r.RequesterName = $("#txtRequesterName").val().StripTags();
            r.Email = $("#txtEmail").val();
            r.EmployeeID = $("#txtEmployeeID").val().StripTags();
            r.PhoneNumber = $("#txtPhoneNumber").val().StripTags();
            r.Department = $("#ddlDepartment").val();
            r.Project = $("#ddlProject").val();
            r.CostCenter = $("#ddlCostCenter").val();
            r.TripStartDate = $("#txtTripStartDate").val().StripTags();
            r.TripEndDate = $("#txtTripEndDate").val().StripTags();
            r.TripPurpose = $("#txtTripPurpose").val().StripTags();
            r.Notices = $("#taNotices").val().StripTags();
            r.RequestApprover = $("#ddlRequestApprover").val();
            r.DestinationsJSON = JSON.stringify($(
                    "#divDestinations").data("handsontable")
                .getData());
            r.TravelExpensesJSON = JSON.stringify($(
                "#divTravelExpenses").data(
                "handsontable").getData());
            r.RequestTotalCost = $("#hdnRequestTotalCost").val();
            RequestFormCreate.createRequestForm(r);
        }
    });
    $("#btnCancel").click(function () {
        location.href = "MyRequests.aspx?status=Draft";
    });
    $("#txtRequesterName").val(CurrentUser.Name);
    $("#txtEmail").val(CurrentUser.Email);
    var c = RequestFormCreate.getAllUsers();
    var i = $("#ddlRequestApprover");
    $.each(c, function () {
        i.append($("<option>", {
            value: this.Id,
            text: this.Title + " (" + this.Email +
                ")"
        }));
    });
    $(function () {
        $("#fileUpload").MultiFile({
            max: 5,
            max_size: 3072,
            STRING: {
                remove: "Delete"
            }
        })
    });
    var k = RequestFormCreate.getDictionary("DictDepartments");
    var g = $("#ddlDepartment");
    $.each(k, function () {
        g.append($("<option>", {
            value: this.Title,
            text: this.Title
        }));
    });
    var n = RequestFormCreate.getDictionary("DictProjects");
    var h = $("#ddlProject");
    $.each(n, function () {
        h.append($("<option>", {
            value: this.Title,
            text: this.Title
        }));
    });
    var j = RequestFormCreate.getDictionary("DictCostCenters");
    var f = $("#ddlCostCenter");
    $.each(j, function () {
        f.append($("<option>", {
            value: this.Title,
            text: this.Title
        }));
    });
    var d = new Array();
    var l = RequestFormCreate.getDictionary("DictExpenseCategories");
    $.each(l, function () {
        d.push(this.Title)
    });
    var e = new Array();
    var m = RequestFormCreate.getDictionary("DictPaymentSources");
    $.each(m, function () {
        e.push(this.Title)
    });
    $("#txtTripStartDate").datepicker();
    $("#txtTripEndDate").datepicker();
    $(".chzn-select").chosen({
        no_results_text: "Oops, nothing found!"
    });
    $.datepicker.setDefaults({
        dateFormat: commonDateFormat,
        showButtonPanel: false,
        changeMonth: false,
        changeYear: false
    });
    jQuery("#requestFormCreate").validate({
        ignore: ".ignore",
        rules: {
            txtRequesterName: {
                required: true,
                maxlength: 250
            },
            txtEmail: {
                required: true,
                email: true,
                maxlength: 250
            },
            txtTripPurpose: {
                required: true,
                maxlength: 250
            },
            txtEmployeeID: {
                maxlength: 250
            },
            txtPhoneNumber: {
                maxlength: 250
            },
            taNotices: {
                maxlength: 1000
            },
            txtTripStartDate: {
                required: true,
                maxlength: 250
            },
            txtTripEndDate: {
                required: true,
                maxlength: 250
            },
            ddlProject: "required",
            ddlDepartment: "required",
            ddlCostCenter: "required",
            ddlRequestApprover: "required",
            txtDestinations: "required",
            txtTravelExpenses: "required"
        },
        messages: {
            txtRequesterName: "Please enter your name",
            txtEmail: "Please enter a valid email address",
            ddlProject: "Please select a valid project",
            ddlDepartment: "Please select a valid department",
            ddlCostCenter: "Please select a valid cost center",
            txtTripStartDate: "Please enter trip start date",
            txtTripEndDate: "Please enter trip end date",
            txtTripPurpose: "Please enter trip purpose",
            ddlRequestApprover: "Please enter request approver",
            txtDestinations: "Please fill travel destinations",
            txtTravelExpenses: "Please fill travel expenses"
        },
        invalidHandler: function (q, s) {
            var r = s.numberOfInvalids();
            if (r && (s.errorList[0].element.name === "txtRequesterName" || s.errorList[0].element.name === "txtEmail" || s.errorList[0].element.name === "ddlProject" || s.errorList[0].element.name === "ddlDepartment" || s.errorList[0].element.name === "ddlCostCenter")) {
                $("#formTabs").tabs("select",
                    "#aPersonalInfo");
            } else {
                if (r && (s.errorList[0].element.name === "ddlRequestApprover")) {
                    $("#formTabs").tabs("select",
                        "#aApprovals");
                } else {
                    if (r && (s.errorList[0].element.name === "txtTripStartDate" || s.errorList[0].element.name === "txtTripEndDate" || s.errorList[0].element.name === "txtTripPurpose" || s.errorList[0].element.name === "txtDestinations")) {
                        $("#formTabs").tabs("select",
                            "#aTravelInfo");
                        $("#formTabs").click();
                    } else {
                        if (r && (s.errorList[0].element.name === "txtTravelExpenses")) {
                            $("#formTabs").tabs("select",
                                "#aTravelExpenses");
                            $("#formTabs").click();
                        }
                    }
                }
            }
        },
        highlight: function (q) {
            jQuery(q).closest(".control-group").addClass(
                "error");
        },
        success: function (q) {
            jQuery(q).closest(".control-group").removeClass(
                "error");
        }
    });
    var p = [{
        Country: "",
        City: "",
        Hotel: "",
        Transport: "",
        StartDate: "",
        EndDate: ""
    }];
    var a = function () {
        var r = $("#divDestinations").data("handsontable");
        $("#txtDestinations").val(r.isEmptyRow(0) ? "" : "false");
    };
    $("#divDestinations").handsontable({
        data: p,
        minSpareRows: 1,
        multiSelect: false,
        contextMenu: false,
        afterChange: a,
        colWidths: [110, 110, 200, 160, 160, 100, 100],
        colHeaders: ["Country", "City", "Accommodation Details",
            "Mode of Transportation",
            "Transportation Details", "Start Date",
            "End Date"
        ],
        columns: [{
            data: "Country"
        }, {
            data: "City"
        }, {
            data: "Hotel"
        }, {
            data: "TransportMode"
        }, {
            data: "Transport"
        }, {
            data: "StartDate",
            type: "date",
            dateFormat: commonDateFormat
        }, {
            data: "EndDate",
            type: "date",
            dateFormat: commonDateFormat
        }]
    });
    var b = function () {
        var s = 0;
        var t = $("#divTravelExpenses").data("handsontable");
        var u = t.getData();
        $("#txtTravelExpenses").val(t.isEmptyRow(0) ? "" : "false");
        $.each(u, function () {
            if ($.isNumeric(this.CurrencyAmount) && $.isNumeric(
                this.ExchangeRate)) {
                s += this.CurrencyAmount * this.ExchangeRate;
            }
        });
        $("#lblTotal").text("Total expenses amount: " + numeral(s).format(
            "0,0.00") + " " + SystemSettings.DefaultCurrencyName);
        $("#hdnRequestTotalCost").val(numeral(s).format("0,0.00"));
    };
    var o = [{
        ExpenseDate: "",
        Description: "",
        Category: "",
        PaymentSource: "",
        Currency: "",
        ExchangeRate: "",
        CurrencyAmount: ""
    }];
    $("#divTravelExpenses").handsontable({
        data: o,
        startRows: 7,
        startCols: 4,
        minSpareRows: 1,
        multiSelect: false,
        contextMenu: false,
        afterChange: b,
        colWidths: [100, 150, 110, 150, 60, 100, 120],
        colHeaders: ["Expense Date", "Description", "Category",
            "Payment Source", "Currency", "Exchange Rate",
            "Currency Amount"
        ],
        columns: [{
            data: "ExpenseDate",
            type: "date",
            dateFormat: commonDateFormat
        }, {
            data: "Description"
        }, {
            data: "Category",
            editor: "select",
            selectOptions: d
        }, {
            data: "PaymentSource",
            editor: "select",
            selectOptions: e
        }, {
            data: "Currency",
            editor: "select",
            selectOptions: ["AED", "AFA", "ALL", "AMD",
                "ANG", "AOR", "ARS", "AUD", "AWG",
                "AZN", "BBD", "BDT", "BGN", "BHD",
                "BIF", "BMD", "BND", "BOB", "BRL",
                "BSD", "BTN", "BWP", "BYR", "BZD",
                "CAD", "CDF", "CHF", "CLP", "CNY",
                "COP", "CRC", "CUP", "CVE", "CZK",
                "DJF", "DKK", "DOP", "DZD", "EEK",
                "EGP", "ERN", "ETB", "EUR", "FJD",
                "FKP", "GBP", "GEL", "GHS", "GIP",
                "GMD", "GNF", "GTQ", "GYD", "HKD",
                "HNL", "HRK", "HTG", "HUF", "IDR",
                "ILS", "INR", "IQD", "IRR", "ISK",
                "JMD", "JOD", "JPY", "KES", "KGS",
                "KHR", "KMF", "KPW", "KRW", "KWD",
                "KYD", "KZT", "LAK", "LBP", "LKR",
                "LRD", "LSL", "LTL", "LVL", "LYD",
                "MAD", "MDL", "MGA", "MKD", "MMK",
                "MNT", "MOP", "MRO", "MUR", "MVR",
                "MWK", "MXN", "MYR", "MZN", "NAD",
                "NGN", "NIO", "NOK", "NZD", "OMR",
                "PAB", "PEN", "PGK", "PHP", "PKR",
                "PLN", "PYG", "QAR", "RON", "RSD",
                "RUB", "RWF", "SAR", "SBD", "SCR",
                "SDG", "SEK", "SGD", "SHP", "SLL",
                "SOS", "SRD", "STD", "SVC", "SYP",
                "SZL", "THB", "TJS", "TMT", "TND",
                "TOP", "TRY", "TTD", "TWD", "TZS",
                "UAH", "UGX", "USD", "UYU", "UZS",
                "VEF", "VND", "VUV", "WST", "XAF",
                "XAG", "XAU", "XCD", "XDR", "XFO",
                "XFU", "XOF", "XPD", "XPF", "XPT",
                "YER", "ZAR", "ZMK", "ZWL"
            ]
        }, {
            data: "ExchangeRate",
            type: "numeric",
            format: "0.000",
            allowInvalid: false,
            language: "en"
        }, {
            data: "CurrencyAmount",
            type: "numeric",
            format: "0,0.00",
            language: "en",
            allowInvalid: false
        }]
    });
});