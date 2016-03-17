"use strict";
var RequestFormView = window.RequestFormView || {};
RequestFormView = function () {
    var e = function () {
        var j = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (k) {
                j = k.d.GetContextWebInformation.FormDigestValue;
            },
            error: function (k, l, m) {
                alert(m);
            }
        });
        return j;
        },
        d = function (k) {
            var j;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/" + k +
                    "/?$select=Name&$inlinecount=allpages",
                type: "GET",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                success: function (l) {
                    j = l.d.results;
                },
                error: function () {
                    alert(thrownError);
                }
            });
            return j;
        },
        f = function (j) {
            var k;
            var l =
                "$select=ID,Author/Id,Title,Email,EmployeeID,PhoneNumber,Project,RequestStatus,RequestApprover/Title,RequestApprover/Id," +
            "RequestApproveDate,TripStartDate,TripEndDate,Created,Modified,RequestApproveDate,RequestRejectReason,TripPurpose,Notices,DestinationsJSON," +
            "TicketIssued,AccomodationConfirmed,CarRentalBooked,TransfersArranged,PassportVisaValid,FrequentFlyer,FrequentflyerNumber";
            $.ajax({
                url: appweburl +
                    "/_api/Web/lists/getbytitle('TravelRequests')/items?" +
                    l +
                    "&$expand=Author/Id, RequestApprover/Title,RequestApprover/Id&$filter=ID eq " +
                    j,
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (m) {
                    k = m.d.results[0];
                },
                error: function (o, m, n) {
                    alert(n);
                }
            });
            return k;
        },
        i = function (m, j) {
            var l;
            $.ajax({
                url: appweburl +
                    "/_api/web/lists/getbytitle('TravelRequests')/Items?$select=Modified&$filter=Id eq " +
                    m,
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (o) {
                    l = o.d.results[0].Modified;
                },
                error: function (q, o, p) {
                    alert(p);
                }
            });
            if (typeof l == "undefined" || l == "") {
                return;
            }
            var n;
            if (j == "RequestApproveDate") {
                n = JSON.stringify({
                    __metadata: {
                        type: "SP.Data.TravelRequestsListItem"
                    },
                    RequestApproveDate: l
                });
            }
            else {
                if (j == "SettlementCreateDate") {
                    n = JSON.stringify({
                        __metadata: {
                            type: "SP.Data.TravelRequestsListItem"
                        },
                        SettlementCreateDate: l
                    });
                }
            }
            var k = e();
            $.ajax({
                url: appweburl +
                    "/_api/Web/lists/getbytitle('TravelRequests')/getItemByStringId('" +
                    m + "')",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: n,
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": k,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (o) { },
                error: function (q, o, p) {
                    alert(p);
                }
            });
        },
        h = function (k) {
            var j = e();
            $.ajax({
                url: appweburl +
                    "/_api/Web/lists/getbytitle('TravelRequests')/getItemByStringId('" + k + "')",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.TravelRequestsListItem"
                    },
                    RequestStatus: RequestStatusEnum.PendingApproval.Value,
                    RequestApproveLinkURL: appweburl + "/Pages/RequestFormView.aspx?requestID=" + k + "&SPHostUrl=" +
                        encodeURIComponent(hostweburl) + "&SPAppWebUrl=" + encodeURIComponent(appweburl),
                    IsRequestApproveEmailSent: "false"
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": j,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (l) {
                    $("#btnSendRequestToApprove").hide();
                    $("#lblRequestStatus").text("Pending approval");
                    addMessage("Request successfully sent for approval","success");
                },
                error: function (n, l, m) {
                    alert(m);
                }
            });
        },
        b = function (k) {
            var l = RequestFormView.getRequestForm(k);
            var j = e();
            $.ajax({
                url: appweburl +
                    "/_api/Web/lists/getbytitle('TravelRequests')/getItemByStringId('" +
                    k + "')",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.TravelRequestsListItem"
                    },
                    IsSettlement: "true",
                    SettlementStatus: RequestStatusEnum.Draft.Value,
                    SettlementDestinationsJSON: l.DestinationsJSON,
                    SettlementTravelExpensesJSON: l.TravelExpensesJSON,
                    SettlementTotalCost: l.RequestTotalCost
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": j,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (m) {
                    i(k, "SettlementCreateDate");
                    location.href ="SettlementFormView.aspx?requestID=" + k;
                },
                error: function (o, m, n) {
                    alert(n);
                }
            });
        },
        a = function (k) {
            var j = e();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('TravelRequests')/getItemByStringId('" + k + "')",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.TravelRequestsListItem"
                    },
                    RequestStatus: RequestStatusEnum.Approved.Value
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": j,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (l) {
                    i(k, "RequestApproveDate");
                    $("#btnApproveRequest").hide();
                    $("#btnRejectRequest").hide();
                    $("#lblRequestStatus").text("Approved");
                    addMessage("Request successfully approved","success");
                },
                error: function (n, l, m) {
                    alert(m);
                }
            });
        },
        g = function (l, k) {
            var j = e();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('TravelRequests')/getItemByStringId('" + l + "')",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.TravelRequestsListItem"
                    },
                    RequestStatus: RequestStatusEnum.Rejected.Value,
                    RequestRejectReason: k
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": j,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (m) {
                    $("#btnApproveRequest").hide();
                    $("#btnRejectRequest").hide();
                    $("#lblRequestStatus").text("Rejected");
                    addMessage("Request successfully rejected",
                        "success");
                },
                error: function (o, m, n) {
                    alert(n);
                }
            });
        },
        c = function (k) {
            var j;
            $.ajax({
                url: appweburl +
                    "/_api/Web/lists/getByTitle('TravelRequests')/items?$select=AttachmentFiles&$expand=AttachmentFiles&$filter=Id eq " +
                    k,
                contentType: "application/json; odata=verbose",
                async: false,
                cache: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                success: function (l) {
                    j = l.d.results[0].AttachmentFiles.results;
                },
                error: function (n, l, m) {
                    alert(m);
                }
            });
            return j;
        };
    return {
        getRequestForm: f,
        getDictionary: d,
        sendToApprove: h,
        approveRequest: a,
        rejectRequest: g,
        createSettlement: b,
        getAllAttachments: c
    };
}();
String.prototype.nl2br = function () {
    return this.replace(/\n/g, "<br />").replace("<script", "< script");
};
$(document).ready(function () {
    var m = getQueryStringParameter("requestID");
    if (typeof m == "undefined" || $.isNumeric(m) == false) {
        location.href = "NotFound.aspx";
        return;
    }
    $("#btnEditRequest").click(function () {
        location.href = "RequestFormEdit.aspx?requestID=" + m;
    });
    $("#btnPrint").click(function () {
        openPopupWindow(
            "PrintForm.aspx?type=request&requestID=" + m,
            "Travel Request Form", 1024, 768, true);
    });
    $("#btnSendRequestToApprove").click(function () {
        RequestFormView.sendToApprove(m);
    });
    var h = $("#dialog-confirm-approve").dialog({
        autoOpen: false,
        resizable: false,
        height: 140,
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close");
            },
            Approve: function () {
                RequestFormView.approveRequest(m);
                $(this).dialog("close");
            },
        }
    });
    var i = $("#dialog-confirm-reject").dialog({
        autoOpen: false,
        resizable: false,
        height: 180,
        width: 320,
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close");
            },
            Reject: function () {
                RequestFormView.rejectRequest(m, $(
                    "#txtRejectReason").val());
                $(this).dialog("close");
            },
        }
    });
    var l = RequestFormView.getRequestForm(m);
    if (l == null) {
        location.href = "NotFound.aspx";
        return;
    }
    if (HasAccessToRequest(l.Author.Id, l.RequestApprover.Id,
        CurrentUser.Id, CurrentUser.IsAdmin, l.RequestStatus, false
    ) == false) {
        location.href = "AccessDenied.aspx";
        return;
    }
    if (l.RequestStatus == "Draft" || l.RequestStatus == "Rejected") {
        $("#btnSendRequestToApprove").show();
    }
    else {
        if (l.RequestStatus == "PendingApproval") {
            if (l.RequestApprover.Id == CurrentUser.Id) {
                $("#btnApproveRequest").show();
                $("#btnRejectRequest").show();
            }
            $("#btnApproveRequest").click(function () {
                h.dialog("open");
            });
            $("#btnRejectRequest").click(function () {
                i.dialog("open");
            });
        }
        else {
            if (l.RequestStatus == "Approved") {
                if (CurrentUser.IsAdmin == false) {
                    $("#btnEditRequest").hide();
                }
                $("#btnApproveRequest").hide();
                $("#btnRejectRequest").hide();
            }
        }
    }
    var e = RequestFormView.getAllAttachments(m);
    if (e.length == 0) {
        $("#noAttachments").show();
    }
    else {
        var d = $("#aAttachments");
        $.each(e, function () {
            d.append('<div><a target="_blank" href="' + this.ServerRelativeUrl +
                '" class="attachment" >' + this.FileName +
                "</a> </div>");
        });
    }
    $("#lblRequesterName").text(l.Title);
    $("#lblEmail").text(l.Email);
    $("#lblEmployeeID").text(l.EmployeeID == null ? "" : l.EmployeeID);
    $("#lblPhoneNumber").text(l.PhoneNumber == null ? "" : l.PhoneNumber);
    $("#lblProject").text(l.Project == null ? "" : l.Project);
    
    if (l.RequestRejectReason != null) {
        $("#lblRejectReason").text(l.RequestRejectReason);
    }
    else {
        $("#pRejectReason").hide();
    } if (l.IsSettlement) {
        $("#aSettlementLink").prop("href",
            "SettlementFormView.aspx?requestID=" + m);
    }
    else {
        $("#pSettlementLink").hide();
    }
    var q = moment(l.TripStartDate);
    if (q.isValid()) {
        $("#lblTripStartDate").text(q.format(commonDateFormat2));
    }
    var p = moment(l.TripEndDate);
    if (p.isValid()) {
        $("#lblTripEndDate").text(p.format(commonDateFormat2));
    }
    $("#lblTripPurpose").text(l.TripPurpose);
    if (l.Notices != null) {
        $("#lblNotices").html(l.Notices.nl2br());
    }
    if (l.RequestApprover != null) {
        $("#lblRequestApprover").text(l.RequestApprover.Title);
    }

    $("#lblRequestID").text(l.ID);
    $("#lblRequestStatus").text(l.RequestStatus);
    $("#lblCreatedDate").text(moment(l.Created).utc().format(commonDateFormatWithHour));
    $("#lblModifiedDate").text(moment(l.Modified).utc().format(commonDateFormatWithHour));
    $("#lblRequestApproveDate").text(l.RequestApproveDate == null ? "" :
        moment(l.RequestApproveDate).utc().format(commonDateFormatWithHour));
    $("#divDestinations").handsontable({
        data: $.parseJSON(l.DestinationsJSON),
        minSpareRows: 0,
        minSpareCols: 0,
        multiSelect: false,
        contextMenu: false,
        autoColumnSize: false,
        readOnly: true,
        colWidths: [150, 130, 200, 160, 160, 100, 100],
        colHeaders: ["Country", "City", "Accommodation Required",
        "Rental Car Required", "Airport Transfers", "Start Date", "End Date"
        ],
        columns: [{
            data: "Country"
        }, {
            data: "City"
        }, {
            data: "AccR",
            type: "checkbox",
            checkedTemplate: "yes",
            uncheckedTemplate: "no"
        }, {
            data: "RentalR",
            type: "checkbox",
            checkedTemplate: "yes",
            uncheckedTemplate: "no"
        }, {
            data: "Transfers",
            type: "checkbox",
            checkedTemplate: "yes",
            uncheckedTemplate: "no"
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
    $("#lblTicket").text(l.TicketIssued);
    $("#lblAccom").text(l.AccomodationConfirmed);
    $("#lblRental").text(l.CarRentalBooked);
    $("#lblTransfer").text(l.TransfersArranged);
    $("#lblPassport").text(l.PassportVisaValid);
    $("#lblFrequentflyer").text(l.FrequentFlyer);
    $("#lblNotice").text(l.Notices);
    $("#lblFrequentflyerNumber").text(l.FrequentflyerNumber);

    var a = function (r, s) {
        var t = 0;
        var u = $("#divTravelExpenses").data("handsontable");
        var v = u.getData();
        $.each(v, function () {
            if ($.isNumeric(this.CurrencyAmount) && $.isNumeric(
                this.ExchangeRate)) {
                t += this.CurrencyAmount * this.ExchangeRate;
            }
        });

    };
    
    var f = $("#divDestinations").data("handsontable");
    var g = f.getData();
    if (g.length > 1 && f.isEmptyRow(g.length - 1)) {
        f.alter("remove_row", parseInt(g.length - 1));
    }
    $(".ui-dialog-buttonpane").find('button:contains("Approve")').addClass(
        "btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Reject")').addClass(
        "btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Cancel")').addClass(
        "btn");
});