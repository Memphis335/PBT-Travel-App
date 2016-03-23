"use strict";
var RequestFormEdit = window.RequestFormEdit || {};
RequestFormEdit = function () {
    var f = function () {
        var k = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (l) {
                k = l.d.GetContextWebInformation.FormDigestValue;
            },
            error: function (l, m, n) {
                alert(n);
            }
        });
        return k;
    },
        e = function (l) {
            var k;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('" + l + "')/items?$select=Title,ID",
                type: "GET",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                success: function (m) {
                    k = m.d.results;
                },
                error: function () {
                    alert(thrownError);
                }
            });
            return k;
        },
        d = function () {
            var k;
            $.ajax({
                url: appweburl +
                    "/_api/web/siteusers?$filter=Email ne '' and substringof('SPOCrawler',Email) eq false and PrincipalType eq 1 and substringof('SPOCrawler',LoginName) eq false and substringof('system',LoginName) eq false and substringof('SharePoint',Title) eq false and substringof('_SPO',Title) eq false and substringof('spocrwl',LoginName) eq false",
                contentType: "application/json; odata=verbose",
                async: false,
                cache: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                success: function (l) {
                    k = l.d.results;
                },
                error: function (n, l, m) {
                    alert(m);
                }
            });
            return k;
        },
        g = function (k) {
            var l;
            var m =
                "$select=ID,Author/Id,Title,Email,EmployeeID,PhoneNumber,Project,RequestStatus,RequestApprover/Title,RequestApprover/Id," +
                "RequestApproveDate,PersonalR,TripStartDate,TripEndDate,Created,Modified,RequestApproveDate,RequestRejectReason,TripPurpose,Notices,DestinationsJSON," +
                "TicketIssued,AccomodationConfirmed,CarRentalBooked,TransfersArranged,PassportVisaValid,FrequentFlyer,FrequentflyerNumber";
            $.ajax({
                url: appweburl +
                    "/_api/Web/lists/getbytitle('TravelRequests')/items?" + m +
                    "&$expand=Author/Id,RequestApprover/Title,RequestApprover/Id&$filter=ID eq " + k,
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (n) {
                    l = n.d.results[0];
                },
                error: function (p, n, o) {
                    alert(o);
                }
            });
            return l;
        },
        i = function (l) {
            var k = f();
            $.ajax({
                url: appweburl +
                    "/_api/Web/lists/getbytitle('TravelRequests')/getItemByStringId('" + l.ID + "')",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.TravelRequestsListItem"
                    },
                    Title: l.RequesterName,
                    Email: l.Email,
                    EmployeeID: l.EmployeeID,
                    PhoneNumber: l.PhoneNumber,
                    Project: l.Project,
                    PersonalR: l.PersonalR,
                    TripStartDate: moment(l.TripStartDate).utc().format(sharepointDateFormat),
                    TripEndDate: moment(l.TripEndDate).utc().format(sharepointDateFormat),
                    TripPurpose: l.TripPurpose,
                    Notices: l.Notices,
                    RequestApproverId: l.RequestApprover,
                    DestinationsJSON: l.DestinationsJSON,
                    TicketIssued: l.TicketIssued,
                    AccomodationConfirmed: l.AccomodationConfirmed,
                    CarRentalBooked: l.CarRentalBooked,
                    TransfersArranged: l.TransfersArranged,
                    PassportVisaValid: l.PassportVisaValid,
                    FrequentFlyer: l.FrequentFlyer,
                    FrequentflyerNumber: l.FrequentflyerNumber,
                    RequestStatus: RequestStatusEnum.Draft.Value
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": k,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (m) {
                    h(l.ID);
                    location.href = "RequestFormView.aspx?requestID=" + l.ID;
                },
                error: function (o, m, n) {
                    alert(n);
                }
            });
        },
        c = function (l) {
            var k;
            $.ajax({
                url: appweburl +
                    "/_api/Web/lists/getByTitle('TravelRequests')/items?$select=AttachmentFiles&$expand=AttachmentFiles&$filter=Id eq " +
                    l,
                contentType: "application/json; odata=verbose",
                async: false,
                cache: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                success: function (m) {
                    k = m.d.results[0].AttachmentFiles.results;
                },
                error: function (o, m, n) {
                    alert(n);
                }
            });
            return k;
        },
        b = function (k, l, n) {
            var m = f();
            $.ajax({
                url: appweburl +
                    "/_api/lists/getByTitle('TravelRequests')/getItemById(" + n + ")/AttachmentFiles/getByFileName('" + l + "')",
                method: "DELETE",
                async: false,
                cache: false,
                headers: {
                    "X-RequestDigest": m
                },
                success: function (o) {
                    $("#" + k).remove();
                },
                error: function (q, o, p) {
                    alert(p);
                }
            });
        },
        a = function (o) {
            var m = ";base64,";
            var n = o.indexOf(m) + m.length;
            var l = o.substring(n);
            var q = window.atob(l);
            var r = q.length;
            var k = new Uint8Array(new ArrayBuffer(r));
            for (var p = 0; p < r; p++) {
                k[p] = q.charCodeAt(p);
            }
            return k;
        },
        h = function (k) {
            if ($("input[type=file]").length > 1 && !window.FileReader) {
                alert(
                    "You cannot upload file because HTML5 FileSystem APIs are not fully supported in this browser."
                );
            }
            $("input[type=file]").each(function () {
                var m = $(this).prop("files");
                var l = m[0];
                if (l) {
                    var n = new FileReader();
                    n.onload = function (o) {
                        l(k, l.name, o.target.result);
                    };
                    n.readAsDataURL(l);
                }
            });
        },
        l = function (n, l, k) {
            var m = f();
            $.ajax({
                url: appweburl +
                    "/_api/Web/lists/getbytitle('TravelRequests')/items(" + n + ")/AttachmentFiles/add(FileName='" + l + "')",
                type: "POST",
                async: false,
                processData: false,
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": m
                },
                data: a(k),
                error: function (q, o, p) { }
            });
        };
    return {
        getAllUsers: d,
        getDictionary: e,
        getRequestForm: g,
        updateRequestForm: i,
        getAllAttachments: c,
        deleteAttachment: b
    };
}();
$(document).ready(function () {
    var t = getQueryStringParameter("requestID");
    if (typeof t == "undefined" || $.isNumeric(t) == false) {
        location.href = "NotFound.aspx";
        return;
    }
    $("#btnCancel").click(function () {
        location.href = "RequestFormView.aspx?requestID=" + t;
    });
    if (!CurrentUser.IsAdmin) {
        $("#aBookingProgress :input").prop("disabled", true);
        $("#aBookingProgress").hide();
        $("#liBookingProgress").hide();
    }

    if ($("#chkTicket").is(":checked")) {
        var ticketIssued = true;
    } else ticketIssued = false;
    if ($("#chkAccom").is(":checked")) {
        var accomodationConfirmed = true;
    } else accomodationConfirmed = false;
    if ($("#chkRental").is(":checked")) {
        var carRentalBooked = true;
    }
    if ($("#chkTransfer").is(":checked")) {
        var transfersArranged = true;
    }
    if ($("#chkPassport").is(":checked")) {
        var passportVisaValid = true;
    }
    
    $("#requestFormEdit").submit(function (w) {
        if ($("#requestFormEdit").valid()) {
            w.preventDefault();
            var x = {};
            x.RequesterName = $("#txtRequesterName").val().StripTags();
            x.Email = $("#txtEmail").val();
            x.EmployeeID = $("#txtEmployeeID").val().StripTags();
            x.PhoneNumber = $("#txtPhoneNumber").val().StripTags();
            x.Project = $("#ddlProject").val();
            x.PersonalR = $("#taPersonal").val().StripTags();
            x.TripStartDate = $("#txtStartDate").val().StripTags();
            x.TripEndDate = $("#txtEndDate").val().StripTags();
            x.TripPurpose = $("#txtPurpose").val().StripTags();
            x.Notices = $("#taNotices").val().StripTags();
            x.RequestApprover = $("#ddlRequestApprover").val();
            x.DestinationsJSON = JSON.stringify($("#divDestinations").data("handsontable").getData());
            x.TicketIssued = true;
            x.AccomodationConfirmed = accomodationConfirmed;
            x.CarRentalBooked = carRentalBooked;
            x.TransfersArranged = transfersArranged;
            x.PassportVisaValid = passportVisaValid;
            x.FrequentFlyer = $("#txtFFP").val();
            x.FrequentflyerNumber = $("#txtFFPN").val();
            RequestFormCreate.createRequestForm(x);
        }
    });
    var s = RequestFormEdit.getRequestForm(t);
    if (s == null) {
        location.href = "NotFound.aspx";
        return;
    }
    if (HasAccessToRequest(s.Author.Id, s.RequestApprover != null ? s.RequestApprover
        .Id : null, CurrentUser.Id, CurrentUser.IsAdmin, s.RequestStatus,
        true) == false) {
        location.href = "AccessDenied.aspx";
        return;
    }
    $(function () {
        $("#fileUpload").MultiFile({
            max: 5,
            max_size: 3072,
            STRING: {
                remove: "Delete"
            }
        });
    });
    var i = RequestFormEdit.getAllAttachments(t);
    var f = $("#fileUpload_wrap_list");
    var h = 0;
    var g;
    $.each(i, function () {
        h++;
        g = "MultiFilelabel" + h;
        f.append('<div class="MultiFile-label"  id="' + g +
            '"  ><a class="MultiFile-remove" onclick="RequestFormEdit.deleteAttachment(\'' +
            g + "','" + this.FileName + "'," + t +
            ');"  href="#fileUpload_wrap">Delete </a><span class="MultiFile-title">' +
            this.FileName + "</span></div>");
    });
    $("#txtRequesterName").val(s.Title);
    $("#txtEmail").val(s.Email);
    $("#txtEmployeeID").val(s.EmployeeID);
    $("#txtPhoneNumber").val(s.PhoneNumber);
    $("#taPersonal").val(s.PersonalR);
    $("#txtFFP").val(s.FrequentFlyer);
    $("#txtFFPN").val(s.FrequentflyerNumber);
    if (s.TicketIssued) {
        $("#chkTicket").is(":checked");
    } else $("#chkTicket").is(":unchecked");
    $("#chkAccom").val(s.accomodationConfirmed);
    $("#chkRental").val(s.CarRentalBooked);
    $("#chkTransfer").val(s.TransfersArranged);
    $("#chkPassport").val(s.PassportVisaValid);

    var v = moment(s.TripStartDate);
    if (v.isValid()) {
        $("#txtStartDate").val(v.format(commonDateFormat2));
    }
    var u = moment(s.TripEndDate);
    if (u.isValid()) {
        $("#txtEndDate").val(u.format(commonDateFormat2));
    }
    $("#txtPurpose").val(s.TripPurpose);
    if (s.Notices != null) {
        $("#taNotices").val(s.Notices);
    }

    $("#txtRequestApprover").val(s.RequestApprover.Name);
    if (s.RequestRejectReason != null) {
        $("#lblRejectReason").text(s.RequestRejectReason);
    } else {
        $("#pRejectReason").hide();
    } if (s.RequestApproveDate != null) {
        $("#lblRequestApproveDate").val(s.RequestApproveDate);
    } else {
        $("#pRequestApproveDate").hide();
    }
    var c = RequestFormEdit.getAllUsers();
    var m = $("#ddlRequestApprover");
    $.each(c, function () {
        m.append($("<option>", {
            value: this.Id,
            text: this.Title + " (" + this.Email + ")"
        }));
    });
    m.val(s.RequestApprover.Id);

    var r = RequestFormEdit.getDictionary("DictProjects");
    var l = $("#ddlProject");
    $.each(r, function () {
        l.append($("<option>", {
            value: this.Title,
            text: this.Title
        }));
    });
    l.val(s.Project);
    var d = new Array();

    $("#lblRequestID").text(s.ID);
    $("#lblRequestStatus").text(s.RequestStatus);
    $("#lblCreatedDate").text(moment(s.Created).format(commonDateFormatWithHour));
    $("#lblModifiedDate").text(moment(s.Modified).format(commonDateFormatWithHour));
    $("#txtStartDate").datepicker();
    $("#txtEndDate").datepicker();
    $(".chzn-select").chosen({
        no_results_text: "Oops, nothing found!"
    });
    $.datepicker.setDefaults({
        dateFormat: commonDateFormat,
        showButtonPanel: false,
        changeMonth: true,
        changeYear: false,
    });
    jQuery("#requestFormEdit").validate({
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
            txtDestinations: "required",
            txtTravelExpenses: "required"
        },
        messages: {
            txtRequesterName: "Please enter your first name",
            txtEmail: "Please enter a valid email address",
            ddlProject: "Please select a valid project",
            txtTripStartDate: "Please enter trip start date",
            txtTripEndDate: "Please enter trip end date",
            txtTripPurpose: "Please enter trip purpose",
            ddlRequestApprover: "Please enter request approver",
            txtDestinations: "Please fill travel destinations"
        },
        invalidHandler: function (w, y) {
            var x = y.numberOfInvalids();
            if (x && (y.errorList[0].element.name ==
                "txtRequesterName" || y.errorList[0].element.name == "txtEmail" || y.errorList[0].element.name == "ddlProject")) {
                $("#formTabs").tabs("select","#aPersonalInfo");
            } else {
                if (x && (y.errorList[0].element.name == "ddlRequestApprover")) {
                    $("#formTabs").tabs("select","#aApprovals");
                } else {
                    if (x && (y.errorList[0].element.name =="txtTripStartDate" || y.errorList[0].element.name =="txtTripEndDate" || y.errorList[0].element.name =="txtTripPurpose" || y.errorList[0].element.name == "txtDestinations")) {
                        $("#formTabs").tabs("select",
                            "#aTravelInfo");
                        $("#formTabs").click();
                    } 
                }
            }
        },
        highlight: function (w) {
            jQuery(w).closest(".control-group").addClass(
                "error");
        },
        success: function (w) {
            jQuery(w).closest(".control-group").removeClass(
                "error");
        }
    });
    var a = function (w, y) {
        var x = $("#divDestinations").data("handsontable");
        $("#txtDestinations").val(x.isEmptyRow(0) ? "" : "false");
    };
    $("#divDestinations").handsontable({
        data: $.parseJSON(s.DestinationsJSON),
        minSpareRows: 1,
        multiSelect: false,
        contextMenu: false,
        afterChange: a,
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
});