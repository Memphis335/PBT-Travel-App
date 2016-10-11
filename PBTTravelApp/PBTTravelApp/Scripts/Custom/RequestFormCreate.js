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
                "/_api/Web/lists/getbytitle('TravelRequests')/items(" + l + ")/AttachmentFiles/add(FileName='" + j + "')",
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
    var d = function (j, f) {
        var i;
        $.ajax({
            url: appweburl + "/_api/Web/lists/getbytitle('" + j + "')/items?$select=" + f,
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
    };
    var x = function (j, f, y) {
        var i;
        $.ajax({
            url: appweburl + "/_api/Web/lists/getbytitle('" + j + "')/items?$select=" + f + "&$filter=Client eq '" + y + "'",
            type: "GET",
            async: false,
            headers: {
                accept: "application/json;odata=verbose"
            },
            dataType: "json",
            cache: false,
            success: function (k) {
                i = k.d.results;
                var hp = $("#ddlPurpose");
                $.each(i, function () {
                    hp.append($("<option>", {
                        value: this.Title,
                        text: this.Title
                    }));
                });
                $("#ddlPurpose").trigger("chosen:updated");
            },
            error: function (thrownError) {
                alert(thrownError);
            },
            beforeSend: function () {
                $("#ddlPurpose").empty();
            }
        });
        return i;
    },
        c = function () {
            var i;
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
                    depTime: j.depTime,
                    retTime: j.retTime,
                    TripEndDate: moment(j.TripEndDate).utc().format(sharepointDateFormat),
                    TripPurpose: j.TripPurpose,
                    Notices: j.Notices,
                    Comments1: j.Comments,
                    RequestApproverId: j.RequestApprover,
                    ndRequestApproverId: j.ndRequestApprover,
                    DestinationsJSON: j.DestinationsJSON,
                    TicketIssued: j.TicketIssued,
                    AccomodationConfirmed: j.AccomodationConfirmed,
                    CarRentalBooked: j.CarRentalBooked,
                    TransfersArranged: j.TransfersArranged,
                    PassportVisaValid: j.PassportVisaValid,
                    FrequentFlyer: j.FrequentFlyer,
                    FrequentflyerNumber: j.FrequentflyerNumber,
                    Frequent_x002d_Flyer2: j.Frequent_x002d_Flyer2,
                    FrequentMemNumber2: j.FrequentMemNumber2,
                    Memberships: j.Memberships,
                    City: j.City,
                    Client: j.Client,
                    linkedToRequest: j.linkedToRequest,
                    WorkflowTrigger: j.WorkflowTrigger,
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
        getFilteredDictionary: x,
        createRequestForm: b
    };
}();


$(document).ready(function () {
    if (CurrentUser.IsAdmin) {
        $("#liBookingProgress").show();
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
            r.TripEndDate = $("#txtEndDate").val().StripTags();
            r.depTime = $("#depTime :selected").val();
            r.retTime = $("#retTime :selected").val();
            r.TripPurpose = $("#ddlPurpose").val().StripTags();
            r.Notices = $("#taNotices").val().StripTags();
            r.Comments = $("#comments").val();
            r.RequestApprover = $("#ddlRequestApprover").val();
            r.ndRequestApprover = $("#ddl2ndRequestApprover").val();
            r.DestinationsJSON = JSON.stringify($("#divDestinations").data("handsontable").getData());
            r.TicketIssued = $("#chkTicket").is(":checked");
            r.AccomodationConfirmed = $("#chkAccom").is(":checked");
            r.CarRentalBooked = $("#chkRental").is(":checked");
            r.TransfersArranged = $("#chkTransfer").is(":checked");
            r.PassportVisaValid = $("#chkPassport").is(":checked");
            r.FrequentFlyer = $("#ddlFFP").val();
            r.FrequentflyerNumber = $("#txtFFPN").val();
            r.Frequent_x002d_Flyer2 = $("#ddlFFP2").val();
            r.FrequentMemNumber2 = $("#txtFFPN2").val();
            r.Memberships = $("#txtFFPNMul").val();
            r.City = $("#txtDeptCity").val();
            r.Client = $("#ddlClient").val();

            if ($("#ddl2ndRequestApprover").val() == "0") {
                r.WorkflowTrigger = "OneStage";
            } else {
                r.WorkflowTrigger = "TwoStageApproval";
            }
            
            r.linkedToRequest = $("#txtRelRequest").val();
            RequestFormCreate.createRequestForm(r);
        }
    });
    $("#btnCancel").click(function () {
        location.href = "MyRequests.aspx?status=Draft";
    });
    $("#txtRequesterName").val(CurrentUser.Name);
    $("#txtEmail").val(CurrentUser.Email);

    $("#cb2ndApprover")
        .on("click",
            function () {
                var isChecked = $("#cb2ndApprover").is(":checked");
                if (isChecked) {
                    $("#requireApproval").show();
                } else {
                    $("#requireApproval").hide();
                }
            });
    $("#txtStartDate").focusout(function () {
        $("#divDestinations").handsontable("setDataAtCell", 0, 5, $("#txtStartDate").val());
    });
    $("#txtEndDate").focusout(function () {
        $("#divDestinations").handsontable("setDataAtCell", 0, 6, $("#txtEndDate").val());
    });
    $("#txtEndDate").on("change", function () {
        $("#divDestinations").handsontable("setDataAtCell", 0, 6, $("#txtEndDate").val());
    });

    var c = RequestFormCreate.getDictionary("Approvers", "ID,User/Title,User/Id&$expand=User/Title,User/Id");
    var i = $("#ddlRequestApprover");
    $.each(c, function () {
        i.append($("<option>", {
            value: this.User.Id,
            text: this.User.Title
        }));
    });
    var cc = RequestFormCreate.getDictionary("2ndApprovers", "ID,User/Title,User/Id&$expand=User/Title,User/Id");
    var ii = $("#ddl2ndRequestApprover");
    $.each(cc, function () {
        ii.append($("<option>", {
            value: this.User.Id,
            text: this.User.Title
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

    $("#addMore").on("click", function () {
        $("#ExtraNum").toggle();
        $("#ExtraProg").toggle();
    });
    $("#addMore2").on("click", function () {
        $("#ExtraNumMul").toggle();
    });

    var nn = RequestFormCreate.getDictionary("DictProjects", "Title, ID");
    var hh = $("#ddlProject");
    $.each(nn, function () {
        hh.append($("<option>", {
            value: this.Title,
            text: this.Title
        }));
    });
    var n = RequestFormCreate.getDictionary("DictPrograms", "Title, ID");
    var h = $("#ddlFFP");
    $.each(n, function () {
        h.append($("<option>", {
            value: this.Title,
            text: this.Title
        }));
    });
    var hhh = $("#ddlFFP2");
    $.each(n, function () {
        hhh.append($("<option>", {
            value: this.Title,
            text: this.Title
        }));
    });


    var dc = RequestFormCreate.getDictionary("DictClients", "Title, ID");
    var dcp = $("#ddlClient");
    $.each(dc, function () {
        dcp.append($("<option>", {
            value: this.Title,
            text: this.Title
        }));
    });
    $("#ddlClient").change(function () {
        var filterBy = dcp.val();
        RequestFormCreate.getFilteredDictionary("DictPONumbers", "Title, ID, Client", filterBy);
    });

    $("#txtStartDate").datepicker();
    $("#txtEndDate").datepicker();
    $.datepicker.setDefaults({
        dateFormat: commonDateFormat,
        showButtonPanel: false,
        changeMonth: false,
        changeYear: false
    });
    $(".chosen-select")
        .chosen({
            no_results_text: "Oops, nothing found!",
            width: "370px"
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
                required: true,
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
            ddlProject: "Please select a project",
            txtTripStartDate: "Please enter departure date",
            txtTripEndDate: "Please enter return date",
            txtTripPurpose: "Please enter Project/ PO Number",
            ddlRequestApprover: "Please select approver",
            txtDestinations: "Please fill travel destinations",
            txtEmployeeID: "Please enter your ID number or Passport number"
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
        colHeaders: ["Country", "City / Airport", "Accommodation Required",
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
            dateFormat: commonDateFormat,
            validator: function (value, callback) {
                var date = $("#txtEndDate").val();
                if (value > date) {
                    alert("Trip end date cannot be after your return date.");
                    this.instance.setDataAtCell(this.row, this.col, date);
                    $(td).css("color", "red");
                }
                callback(true);
            },
            allowInvalid: false
        }]
    });
});