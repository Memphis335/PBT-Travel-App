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
    e = function (l, f) {
        var k;
        $.ajax({
            url: appweburl + "/_api/Web/lists/getbytitle('" + l + "')/items?$select=" + f,
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
    x = function (j, f, y) {
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
            "$select=ID,Author/Id,Title,Email,EmployeeID,PhoneNumber,Project,RequestStatus,Client,RequestApprover/Title,RequestApprover/Id," +
                "RequestApproveDate,PersonalR,TripStartDate,TripEndDate,Created,Modified,RequestApproveDate,RequestRejectReason,TripPurpose,Notices,DestinationsJSON," +
                "TicketIssued,AccomodationConfirmed,CarRentalBooked,TransfersArranged,PassportVisaValid,FrequentFlyer,FrequentflyerNumber,City,Note1,Note2,Note3,Note4,Note5," +
                "Frequent_x002d_Flyer2,FrequentMemNumber2,Memberships,refTicket,refAccom,refRental,refTransfer,WorkflowTrigger,Comments1,retTime,depTime,linkedToRequest,ndRequestApprover/Title,ndRequestApprover/Id,ndRequestApproveDate";
        $.ajax({
            url: appweburl + "/_api/Web/lists/getbytitle('TravelRequests')/items?" + m +
                "&$expand=Author/Id,RequestApprover/Title,RequestApprover/Id, ndRequestApprover/Title,ndRequestApprover/Id&$filter=ID eq " + k,
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
                depTime: l.depTime,
                retTime: l.retTime,
                TripPurpose: l.TripPurpose,
                Notices: l.Notices,
                Comments1: l.Comments,
                RequestApproverId: l.RequestApprover,
                ndRequestApproverId: l.ndRequestApprover,
                DestinationsJSON: l.DestinationsJSON,
                TicketIssued: l.TicketIssued,
                AccomodationConfirmed: l.AccomodationConfirmed,
                CarRentalBooked: l.CarRentalBooked,
                TransfersArranged: l.TransfersArranged,
                PassportVisaValid: l.PassportVisaValid,
                FrequentFlyer: l.FrequentFlyer,
                FrequentflyerNumber: l.FrequentflyerNumber,
                RequestStatus: l.RequestStatus,
                Note1: l.Note1,
                Note2: l.Note2,
                Note3: l.Note3,
                Note4: l.Note4,
                Note5: l.Note5,
                refTicket: l.refTicket,
                refAccom: l.refAccom,
                refRental: l.refRental,
                refTransfer: l.refTransfer,
                City: l.City,
                Client: l.Client,
                linkedToRequest: l.linkedToRequest,
                Frequent_x002d_Flyer2: l.Frequent_x002d_Flyer2,
                FrequentMemNumber2: l.FrequentMemNumber2,
                Memberships: l.Memberships,
                WorkflowTrigger: "Edited"
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
                fileUpload(l.ID);
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
                "/_api/Web/lists/getByTitle('TravelRequests')/items?$select=AttachmentFiles&$expand=AttachmentFiles&$filter=Id eq " + l,
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
    j = function (n, l, k) {
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
    },
    h = function (k) {
        if ($("input[type=file]").length > 1 && !window.FileReader) {
            alert("You cannot upload file because HTML5 FileSystem APIs are not fully supported in this browser.");
        }
        $("#fileUpload").each(function () {
            var m = $(this).prop("files");
            var l = m[0];
            if (l) {
                var n = new FileReader();
                n.onload = function (o) {
                    j(k, l.name, o.target.result);
                };
                n.readAsDataURL(l);
            }
        });
    },
    fileUpload = function (k) {
        if ($("input[type=file]").length > 1 && !window.FileReader) {
            alert("You cannot upload files because HTML5 FileSystem APIs are not fully supported in this browser.");
        }
        $("#fileTicket").each(function () {
            var m = $(this).prop("files");
            var l = m[0];
            var name = "Flight_Ticket.pdf";
            if (l) {
                var n = new FileReader();
                n.onload = function (o) {
                    j(k, name, o.target.result);
                };
                n.readAsDataURL(l);
            }
        });
        $("#fileAccom").each(function () {
            var m = $(this).prop("files");
            var l = m[0];
            var name = "Acc_Confirmation.pdf";
            if (l) {
                var n = new FileReader();
                n.onload = function (o) {
                    j(k, name, o.target.result);
                };
                n.readAsDataURL(l);
            }
        });
        $("#fileRental").each(function () {
            var m = $(this).prop("files");
            var l = m[0];
            var name = "Rental_Confirmation.pdf";
            if (l) {
                var n = new FileReader();
                n.onload = function (o) {
                    j(k, name, o.target.result);
                };
                n.readAsDataURL(l);
            }
        });
        $("#fileTransfer").each(function () {
            var m = $(this).prop("files");
            var l = m[0];
            var name = "Transfer_Confirmation.pdf";
            if (l) {
                var n = new FileReader();
                n.onload = function (o) {
                    j(k, name, o.target.result);
                };
                n.readAsDataURL(l);
            }
        });
        $("#filePassport").each(function () {
            var m = $(this).prop("files");
            var l = m[0];
            var name = "Visa_Confirmation.pdf";
            if (l) {
                var n = new FileReader();
                n.onload = function (o) {
                    j(k, name, o.target.result);
                };
                n.readAsDataURL(l);
            }
        });
    };
    return {
        getAllUsers: d,
        getDictionary: e,
        getRequestForm: g,
        updateRequestForm: i,
        getAllAttachments: c,
        deleteAttachment: b,
        getFilteredDictionary: x
    };
}();
$(document).ready(function () {
    var t = getQueryStringParameter("requestID");
    if (typeof t == "undefined" || $.isNumeric(t) === false) {
        location.href = "NotFound.aspx";
        return;
    }
    $("#btnCancel").click(function () {
        location.href = "RequestFormView.aspx?requestID=" + t;
    });
    if (CurrentUser.IsAdmin) {
        $("#liBookingProgress").show();
    }

    $("#requestFormEdit").submit(function (w) {
        if ($("#requestFormEdit").valid()) {
            w.preventDefault();
            var x = {};
            x.ID = t;
            x.RequesterName = $("#txtRequesterName").val().StripTags();
            x.Email = $("#txtEmail").val();
            x.EmployeeID = $("#txtEmployeeID").val().StripTags();
            x.PhoneNumber = $("#txtPhoneNumber").val().StripTags();
            x.Project = $("#ddlProject").val();
            x.PersonalR = $("#taPersonal").val().StripTags();
            x.TripStartDate = $("#txtStartDate").val().StripTags();
            x.TripEndDate = $("#txtEndDate").val().StripTags();
            x.depTime = $("#depTime :selected").val();
            x.retTime = $("#retTime :selected").val();
            x.TripPurpose = $("#ddlPurpose").val().StripTags();
            x.Notices = $("#taNotices").val().StripTags();
            x.Comments = $("#comments").val().StripTags();
            x.RequestApprover = $("#ddlRequestApprover").val();
            x.ndRequestApprover = $("#ddl2ndRequestApprover").val();
            x.DestinationsJSON = JSON.stringify($("#divDestinations").data("handsontable").getData());
            x.TicketIssued = $("#chkTicket").is(":checked");
            x.AccomodationConfirmed = $("#chkAccom").is(":checked");
            x.CarRentalBooked = $("#chkRental").is(":checked");
            x.TransfersArranged = $("#chkTransfer").is(":checked");
            x.PassportVisaValid = $("#chkPassport").is(":checked");
            x.FrequentFlyer = $("#ddlFFP").val();
            x.FrequentflyerNumber = $("#txtFFPN").val();
            x.Note1 = $("#txtTicket").val();
            x.refTicket = $("#refTicket").val();
            x.Note2 = $("#txtAccom").val();
            x.refAccom = $("#refAccom").val();
            x.Note3 = $("#txtRental").val();
            x.refRental = $("#refRental").val();
            x.Note4 = $("#txtTransfer").val();
            x.refTransfer = $("#refTransfer").val();
            x.Note5 = $("#txtPassport").val();
            x.City = $("#txtDeptCity").val();
            x.Client = $("#ddlClient").val();
            x.linkedToRequest = $("#txtRelRequest").val();
            x.Frequent_x002d_Flyer2 = $("#ddlFFP2").val();
            x.FrequentMemNumber2 = $("#txtFFPN2").val();
            x.Memberships = $("#txtFFPNMul").val();
            if (CurrentUser.IsAdmin) {
                x.RequestStatus = currentStatus;
            } else x.RequestStatus = RequestStatusEnum.Draft.Value;
            RequestFormEdit.updateRequestForm(x);
        }
    });
    var s = RequestFormEdit.getRequestForm(t);
    if (s == null) {
        location.href = "NotFound.aspx";
        return;
    }
    if (HasAccessToRequest(s.Author.Id, s.RequestApprover != null ? s.RequestApprover.Id : null, CurrentUser.Id, CurrentUser.IsAdmin, s.RequestStatus, true) === false) {
        location.href = "AccessDenied.aspx";
        return;
    }
    var currentStatus = s.RequestStatus;
    $(function () {
        $("#fileUpload").MultiFile({
            max: 8,
            max_size: 3072,
            STRING: {
                remove: "Delete"
            }
        });
    });
    var i = RequestFormEdit.getAllAttachments(t);
    var f = $("#fileUpload_wrap_list");
    var fileTicket = $("#fileTicketRetrieved");
    var fileAccom = $("#fileAccomRetrieved");
    var fileRental = $("#fileRentalRetrieved");
    var fileTransfer = $("#fileTransferRetrieved");
    var filePass = $("#filePassRetrieved");
    var h = 0;
    var g;
    $.each(i, function () {
        if (this.FileName == "Flight_Ticket.pdf") {
            fileTicket.append('<div class="MultiFile-label"  id="' + g + '"  ><span class="MultiFile-title">' + this.FileName + '<a class="MultiFile-remove" onclick="RequestFormEdit.deleteAttachment(\'' +
                g + "','" + this.FileName + "'," + t + ');"  href="#fileUpload_wrap">  <i class="ms-Icon ms-Icon--trash" title="Delete"></i></a></span></div>');
        } else if (this.FileName == "Acc_Confirmation.pdf") {
            fileAccom.append('<div class="MultiFile-label"  id="' + g + '"  ><span class="MultiFile-title">' + this.FileName + ' <a class="MultiFile-remove" onclick="RequestFormEdit.deleteAttachment(\'' +
               g + "','" + this.FileName + "'," + t + ');"  href="#fileUpload_wrap"><i class="ms-Icon ms-Icon--trash" title="Delete"></i></a></span></div>');
        } else if (this.FileName == "Rental_Confirmation.pdf") {
            fileRental.append('<div class="MultiFile-label"  id="' + g + '"  ><span class="MultiFile-title">' + this.FileName + ' <a class="MultiFile-remove" onclick="RequestFormEdit.deleteAttachment(\'' + g + "','" + this.FileName + "'," + t +
                ');"  href="#fileUpload_wrap"><i class="ms-Icon ms-Icon--trash" title="Delete"></i></a></span></div>');
        } else if (this.FileName == "Transfer_Confirmation.pdf") {
            fileTransfer.append('<div class="MultiFile-label"  id="' + g + '"  ><span class="MultiFile-title">' + this.FileName + ' <a class="MultiFile-remove" onclick="RequestFormEdit.deleteAttachment(\'' +
                g + "','" + this.FileName + "'," + t + ');"  href="#fileUpload_wrap"><i class="ms-Icon ms-Icon--trash" title="Delete"></i></a></span></div>');
        } else if (this.FileName == "Visa_Confirmation.pdf") {
            filePass.append('<div class="MultiFile-label"  id="' + g + '"  ><span class="MultiFile-title">' + this.FileName + ' <a class="MultiFile-remove" onclick="RequestFormEdit.deleteAttachment(\'' +
                g + "','" + this.FileName + "'," + t + ');"  href="#fileUpload_wrap"><i class="ms-Icon ms-Icon--trash" title="Delete"></i></a></span></div>');
        } else {
            h++;
            g = "MultiFilelabel" + h;
            f.append('<div class="MultiFile-label"  id="' + g + '"  ><span class="MultiFile-title">' + this.FileName + ' <a class="MultiFile-remove" onclick="RequestFormEdit.deleteAttachment(\'' +
                g + "','" + this.FileName + "'," + t + ');"  href="#fileUpload_wrap"><i class="ms-Icon ms-Icon--trash" title="Delete"></i></a></span></div>');
        }
    });
    $("#txtRequesterName").val(s.Title);
    $("#txtEmail").val(s.Email);
    $("#txtEmployeeID").val(s.EmployeeID);
    $("#txtPhoneNumber").val(s.PhoneNumber);
    $("#taPersonal").val(s.PersonalR);
    $("#txtTicket").val(s.Note1);
    $("#refTicket").val(s.refTicket);
    $("#txtAccom").val(s.Note2);
    $("#refAccom").val(s.refAccom);
    $("#txtRental").val(s.Note3);
    $("#refRental").val(s.refRental);
    $("#txtTransfer").val(s.Note4);
    $("#refTransfer").val(s.refTransfer);
    $("#txtPassport").val(s.Note5);
    $("#txtDeptCity").val(s.City);
    if (s.linkedToRequest != null) {
        $("#linked").show();
        $("#txtRelRequest").val(s.linkedToRequest);
    }
    $("#txtFFPN").val(s.FrequentflyerNumber);
    if (s.TicketIssued) {
        $("#chkTicket").prop("checked", true);
    } else $("#chkTicket").prop("checked", false);
    if (s.AccomodationConfirmed) {
        $("#chkAccom").prop("checked", true);
    } else $("#chkAccom").prop("checked", false);
    if (s.CarRentalBooked) {
        $("#chkRental").prop("checked", true);
    } else $("#chkRental").prop("checked", false);
    if (s.TransfersArranged) {
        $("#chkTransfer").prop("checked", true);
    } else $("#chkTransfer").prop("checked", false);
    if (s.PassportVisaValid) {
        $("#chkPassport").prop("checked", true);
    } else $("#chkPassport").prop("checked", false);

    var v = moment(s.TripStartDate);
    if (v.isValid()) {
        $("#txtStartDate").val(v.format(commonDateFormat2));
    }
    $("#depTime").val(s.depTime);
    $("#retTime").val(s.retTime);
    var u = moment(s.TripEndDate);
    if (u.isValid()) {
        $("#txtEndDate").val(u.format(commonDateFormat2));
    }

    var dc = RequestFormEdit.getDictionary("DictClients", "Title, ID");
    var dcp = $("#ddlClient");
    $.each(dc, function () {
        dcp.append($("<option>", {
            value: this.Title,
            text: this.Title
        }));
    });
    dcp.val(s.Client);
    $("#ddlPurpose").append($("<option>" ,{
        value: s.TripPurpose,
        text: s.TripPurpose
    }));

    $("#ddlClient").change(function () {
        var filterBy = dcp.val();
        RequestFormEdit.getFilteredDictionary("DictPONumbers", "Title, ID, Client", filterBy);
    });
    $("#ddlPurpose").val(s.TripPurpose);

    if (s.Notices != null) {
        $("#taNotices").val(s.Notices);
    }
    if (s.Comments1 != null) {
        $("#comments").val(s.Comments1);
    }
    if (s.Frequent_x002d_Flyer2 != null) {
        $("#ExtraProg").show();
        $("#ddlFFP2").val(s.Frequent_x002d_Flyer2);
    }
    if (s.FrequentMemNumber2 != null) {
        $("#ExtraNum").show();
        $("#txtFFPN2").val(s.FrequentMemNumber2);
    }
    if (s.Memberships != null) {
        $("#ExtraNumMul").show();
        $("#txtFFPNMul").val(s.Memberships);
    }
    $("#addMore")
        .on("click",
            function () {
                $("#ExtraNum").toggle();
                $("#ExtraProg").toggle();
            });
    $("#addMore2")
        .on("click",
            function () {
                $("#ExtraNumMul").toggle();
            });

    if (s.RequestRejectReason != null) {
        $("#lblRejectReason").text(s.RequestRejectReason);
    } else {
        $("#pRejectReason").hide();
    }
    if (s.RequestApproveDate != null) {
        $("#lblRequestApproveDate").val(s.RequestApproveDate);
    } else {
        $("#pRequestApproveDate").hide();
    }
    var c = RequestFormEdit.getDictionary("Approvers", "ID,User/Title,User/Id&$expand=User/Title,User/Id");
    var m = $("#ddlRequestApprover");
    $.each(c,
        function () {
            m.append($("<option>",
            {
                value: this.User.Id,
                text: this.User.Title
            }));
        });
    m.val(s.RequestApprover.Id);

    if (s.ndRequestApprover != null) {
        $("#2ndApprover").show();
        var cc = RequestFormEdit.getDictionary("2ndApprovers", "ID,User/Title,User/Id&$expand=User/Title,User/Id");
        var mm = $("#ddl2ndRequestApprover");
        $.each(cc,
            function () {
                mm.append($("<option>",
                {
                    value: this.User.Id,
                    text: this.User.Title
                }));
            });
        mm.val(s.ndRequestApprover.Id);

        if (s.ndRequestApproveDate != null) {
            $("#ndRequestDate").show();
            $("#lbl2ndRequestApproveDate").val(s.ndRequestApproveDate);
        } else {
            $("#pndRequestDate").hide();
        }
    }
    var r = RequestFormEdit.getDictionary("DictProjects", "Title,ID");
    var l = $("#ddlProject");
    $.each(r,
        function () {
            l.append($("<option>",
            {
                value: this.Title,
                text: this.Title
            }));
        });
    l.val(s.Project);

    var q = RequestFormEdit.getDictionary("DictPrograms", "Title,ID");
    var p = $("#ddlFFP");
    $.each(q,
        function () {
            p.append($("<option>",
            {
                value: this.Title,
                text: this.Title
            }));
        });
    p.val(s.FrequentFlyer);
    var hhh = $("#ddlFFP2");
    $.each(q,
        function () {
            hhh.append($("<option>",
            {
                value: this.Title,
                text: this.Title
            }));
        });
    hhh.val(s.Frequent_x002d_Flyer2);

    $("#lblRequestID").text(s.ID);
    $("#lblRequestStatus").text(s.RequestStatus);
    $("#lblCreatedDate").text(moment(s.Created).format(commonDateFormatWithHour));
    $("#lblModifiedDate").text(moment(s.Modified).format(commonDateFormatWithHour));
    $("#txtStartDate").datepicker();
    $("#txtEndDate").datepicker();
    $.datepicker.setDefaults({
        dateFormat: commonDateFormat,
        showButtonPanel: false,
        changeMonth: false,
        changeYear: false
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
    $(".chosen-select").chosen({
        no_results_text: "Oops, nothing found!",
        width: "370px"
    });

    jQuery("#requestFormEdit")
        .validate({
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
                if (x &&
                (y.errorList[0].element.name === "txtRequesterName" ||
                    y.errorList[0].element.name === "txtEmail" ||
                    y.errorList[0].element.name === "ddlProject")) {
                    $("#formTabs").tabs("select", "#aPersonalInfo");
                } else {
                    if (x && (y.errorList[0].element.name === "ddlRequestApprover")) {
                        $("#formTabs").tabs("select", "#aApprovals");
                    } else {
                        if (x &&
                        (y.errorList[0].element.name === "txtTripStartDate" ||
                            y.errorList[0].element.name === "txtTripEndDate" ||
                            y.errorList[0].element.name === "txtTripPurpose" ||
                            y.errorList[0].element.name === "txtDestinations")) {
                            $("#formTabs").tabs("select", "#aTravelInfo");
                            $("#formTabs").click();
                        }
                    }
                }
            },
            highlight: function (w) {
                jQuery(w).closest(".control-group").addClass("error");
            },
            success: function (w) {
                jQuery(w).closest(".control-group").removeClass("error");
            }
        });
    var a = function () {
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
        colHeaders: [
            "Country", "City / Airport", "Accommodation Required",
            "Rental Car Required", "Airport Transfers", "Start Date", "End Date"
        ],
        columns: [
            {
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
            }
        ]
    });
});