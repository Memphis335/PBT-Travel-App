"use strict";
var PrintForm = window.PrintForm || {};
PrintForm = function () {
    var a = function (b) {
        var c;
        var d =
            "$select=ID,Author/Id,Title,Email,EmployeeID,PhoneNumber,Project,RequestStatus,RequestApprover/Title,RequestApprover/Id," +
            "RequestApproveDate,TripStartDate,TripEndDate,Created,Modified,RequestApproveDate,RequestRejectReason,TripPurpose,Notices,DestinationsJSON," +
            "FrequentFlyer,FrequentflyerNumber";
        $.ajax({
            url: appweburl +
                "/_api/Web/lists/getbytitle('TravelRequests')/items?" +
                d +
                "&$expand=Author/Id,RequestApprover/Title,RequestApprover/Id&$filter=ID eq " +
                b,
            type: "GET",
            async: false,
            cache: false,
            headers: {
                accept: "application/json;odata=verbose"
            },
            dataType: "json",
            success: function (e) {
                c = e.d.results[0];
            },
            error: function (g, e, f) {
                alert(f);
            }
        });
        return c;
    };
    return {
        getRequestForm: a
    };
}();
String.prototype.nl2br = function () {
    return this.replace(/\n/g, "<br />").replace("<script", "< script");
};
$(document).ready(function () {
    var b = getQueryStringParameter("requestID");
    if (typeof b == "undefined" || $.isNumeric(b) == false) {
        alert("Bad request ID!");
        return;
    }
    var h = getQueryStringParameter("type");
    if (typeof b == "undefined") {
        alert("Bad request ID!");
        return;
    }
    var a = PrintForm.getRequestForm(b);
    if (a.Author.Id != CurrentUser.Id && CurrentUser.IsAdmin == false) {
        location.href = "AccessDenied.aspx";
        return;
    }
    $("#lblCompanyName").text(SystemSettings.OrganizationName);
    $("#lblRequesterName").text(a.Title);
    $("#lblEmail").text(a.Email);
    $("#lblEmployeeID").text(a.EmployeeID == null ? "" : a.EmployeeID);
    $("#lblPhoneNumber").text(a.PhoneNumber == null ? "" : a.PhoneNumber);
    $("#lblFFP").text(a.FrequentFlyer == null ? "" : a.FrequentFlyer);
    $("#lblFFPN").text(a.FrequentflyerNumber == null ? "" : a.FrequentflyerNumber);
    $("#lblProject").text(a.Project == null ? "" : a.Project);

    $("#lblRequestID").text(a.Id);
    $("#lblCreatedDate").text(moment(a.Created).utc().format(
        commonDateFormatWithHour));
    var f = moment(a.TripStartDate);
    if (f.isValid()) {
        $("#lblTripStartDate").text(f.format(commonDateFormat2));
    }
    var e = moment(a.TripEndDate);
    if (e.isValid()) {
        $("#lblTripEndDate").text(e.format(commonDateFormat2));
    }
    $("#lblTripPurpose").text(a.TripPurpose);
    var c = $.parseJSON(a.DestinationsJSON);
    if (h == "request") {
        document.title = "Travel Request Form";
        $("#lblTitle").text("Travel Request Form");
        c = $.parseJSON(a.DestinationsJSON);
        if (a.Notices != null) {
            $("#lblNotices").html(a.Notices.nl2br());
        }
        if (a.RequestApprover != null) {
            $("#lblRequestApprover").text(a.RequestApprover.Title);
        }
    }
    $.each(c, function () {
        if (this.Country == null && this.City == null) {
            return;
        }
        var i = "<tr><td >" + (String(this.Country)).StripTags() +
            "</td><td >" + (String(this.City)).StripTags() +
            "</td><td >" + (String(this.AccR)).StripTags() +
            "</td><td >" + (String(this.RentalR)).StripTags() +
            "</td><td >" + (String(this.Transfers)).StripTags() +
            "</td><td >" + (String(this.StartDate)).StripTags() +
            "</td><td >" + (String(this.EndDate)).StripTags() +
            "</td></tr>";
        $("#tTravelDestinations").append(i);
    });
});