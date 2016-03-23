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
            url: appweburl + "/_api/Web/lists/getbytitle('" + j + "')/items?$select=Title,ID",
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
                    Project: j.Project,
                    PersonalR: j.PersonalR,
                    TripStartDate: moment(j.TripStartDate).utc().format(sharepointDateFormat),
                    TripEndDate: moment(j.TripEndDate).utc().format(sharepointDateFormat),
                    TripPurpose: j.TripPurpose,
                    Notices: j.Notices,
                    RequestApproverId: j.RequestApprover,
                    DestinationsJSON: j.DestinationsJSON,
                    TicketIssued: j.TicketIssued,
                    AccomodationConfirmed: j.AccomodationConfirmed,
                    CarRentalBooked: j.CarRentalBooked,
                    TransfersArranged: j.TransfersArranged,
                    PassportVisaValid: j.PassportVisaValid,
                    FrequentFlyer: j.FrequentFlyer,
                    FrequentflyerNumber: j.FrequentflyerNumber,
                    RequestStatus: RequestStatusEnum.Draft.Value
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": i
                },
                success: function (k) {
                    g(k.d.Id);
                    location.href = "RequestFormView.aspx?requestID=" + k.d.Id;
                },
                error: function (m, k, l) {
                    alert(l);
                }
            });
        };
    return {
        getAllUsers: c,
        getDictionary: d,
        createRequestForm: b
    };
}();

function dateCalc() {
    var end = $("#txtEndDate").val();
    var start = $("#txtStartDate").val();
    var days = moment(start).diff(end, "days");
    console.log("Start and End");
    console.log(start, end);
    console.log(days);
    if (days <= 4) {
        //$("#divDestinations").handsontable({
        //    columns: [
        //        {
        //            data: "Transfers",
        //            editor: false
        //        }
        //    ]

        //});
        console.log("Less than 4");
    }
};

$(document).ready(function () {
    if (!CurrentUser.IsAdmin) {
        $("#aBookingProgress :input").prop("disabled", true);
        $("#aBookingProgress").attr("Title", "For office use only");
    }
    var accomodationConfirmed = false;
    var ticketIssued = false;
    var carRentalBooked = false;
    var transfersArranged = false;
    var passportVisaValid = false;

    if ($("#chkTicket").is(":checked")) {
        ticketIssued = true;
    }
    if ($("#chkAccom").is(":checked")) {
        accomodationConfirmed = true;
    }
    if ($("#chkRental").is(":checked")) {
        carRentalBooked = true;
    }
    if ($("#chkTransfer").is(":checked")) {
        transfersArranged = true;
    }
    if ($("#chkPassport").is(":checked")) {
        passportVisaValid = true;
    }

    $("#requestFormCreate").submit(function (q) {
        if ($("#requestFormCreate").valid()) {
            q.preventDefault();
            var r = {};
            r.RequesterName = $("#txtRequesterName").val().StripTags();
            r.Email = $("#txtEmail").val();
            r.EmployeeID = $("#txtEmployeeID").val().StripTags();
            r.PhoneNumber = $("#txtPhoneNumber").val().StripTags();
            r.Project = $("#ddlProject").val();
            r.PersonalR = $("#taPersonal").val().StripTags();
            r.TripStartDate = $("#txtStartDate").val().StripTags();
            console.log($("#txtStartDate").val().StripTags());
            r.TripEndDate = $("#txtEndDate").val().StripTags();
            r.TripPurpose = $("#txtPurpose").val().StripTags();
            r.Notices = $("#taNotices").val().StripTags();
            r.RequestApprover = $("#ddlRequestApprover").val();
            r.DestinationsJSON = JSON.stringify($("#divDestinations").data("handsontable").getData());
            r.TicketIssued = ticketIssued;
            r.AccomodationConfirmed = accomodationConfirmed;
            r.CarRentalBooked = carRentalBooked;
            r.TransfersArranged = transfersArranged;
            r.PassportVisaValid = passportVisaValid;
            r.FrequentFlyer = $("#txtFFP").val();
            r.FrequentflyerNumber = $("#txtFFPN").val();
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
        });
    });

    var n = RequestFormCreate.getDictionary("DictProjects");
    var h = $("#ddlProject");
    $.each(n, function () {
        h.append($("<option>", {
            value: this.Title,
            text: this.Title
        }));
    });

    $("#txtStartDate").datepicker();
    $("#txtEndDate").datepicker();
    $(".chzn-select").chosen({
        no_results_text: "Oops, nothing found!"
    });
    $.datepicker.setDefaults({
        dateFormat: commonDateFormat,
        showButtonPanel: false,
        changeMonth: true,
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
            ddlRequestApprover: "required",
            txtDestinations: "required"
            },
        messages: {
            txtRequesterName: "Please enter your name",
            txtEmail: "Please enter a valid email address",
            ddlProject: "Please select a valid project",
            txtTripStartDate: "Please enter departure date",
            txtTripEndDate: "Please enter return date",
            txtTripPurpose: "Please enter trip purpose",
            ddlRequestApprover: "Please enter request approver",
            txtDestinations: "Please fill travel destinations"
        },
        invalidHandler: function (q, s) {
            var r = s.numberOfInvalids();
            if (r && (s.errorList[0].element.name === "txtRequesterName" || s.errorList[0].element.name === "txtEmail" || s.errorList[0].element.name === "ddlProject")) {
                var index = $('#formTabs a[href="#aPersonalInfo"]').parent().index();
                $("#formTabs").tabs("option", "active", index);
            } else {
                if (r && (s.errorList[0].element.name === "ddlRequestApprover")) {
                    var index = $('#formTabs a[href="#aApprovals"]').parent().index();
                    $("#formTabs").tabs("option", "active", index);
                } else {
                    if (r && (s.errorList[0].element.name === "txtTripStartDate" || s.errorList[0].element.name === "txtTripEndDate" || s.errorList[0].element.name === "txtTripPurpose" || s.errorList[0].element.name === "txtDestinations")) {
                        var index = $('#formTabs a[href="#aTravelInfo"]').parent().index();
                        $("#formTabs").tabs("option", "active", index);
                        $("#formTabs").click();
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
        AccR: null,
        RentalR: null,
        Transfers: null,
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
            colWidths: [150, 130, 200, 160, 160, 100, 100],
            colHeaders: ["Country", "City", "Accommodation Required",
            "Rental Car Required","Airport Transfers","Start Date","End Date"
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
});