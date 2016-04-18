"use strict";
var MyRequests = window.MyRequests || {};
MyRequests = function () {
    var b = function () {
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
        p = function (f, e) {
            var h;
            var b = "RequestStatus eq 'Rejected'";
            var g = appweburl + "/_vti_bin/ListData.svc/TravelRequests/?$filter=" + b + "&$inlinecount=allpages&$select=Id,Created,RequesterName,TripStartDate,TripEndDate,RequestStatus,RequestApprover,TripPurpose,RequestRejectReason&$expand=RequestApprover&$orderby=" +
                e.jtSorting.replace(" DESC", " desc").replace(" ASC"," asc") + "&$skip=" + e.jtStartIndex + "&$top=" + e.jtPageSize;
            return $.Deferred(function (k) {
                $.ajax({
                    url: g,
                    type: "GET",
                    headers: {
                        accept: "application/json;odata=verbose"
                    },
                    dataType: "json",
                    data: f,
                    cache: false,
                    success: function (l) {
                        h = {
                            Result: "OK",
                            Records: l.d.results,
                            TotalRecordCount: l.d.__count
                        };
                        k.resolve(h);
                    },
                    error: function () {
                        k.reject();
                    }
                });
            });
        },
        o = function (f, e) {
            var h;
            var b = "(RequestStatus eq 'Draft' or RequestStatus eq 'Pending Approval')";
            var g = appweburl + "/_vti_bin/ListData.svc/TravelRequests/?$filter=" + b + "&$inlinecount=allpages&$select=Id,Created,RequesterName,TripStartDate,TripEndDate,RequestStatus,RequestApprover,TripPurpose,RequestRejectReason&$expand=RequestApprover&$orderby=" +
                e.jtSorting.replace(" DESC", " desc").replace(" ASC", " asc") + "&$skip=" + e.jtStartIndex + "&$top=" + e.jtPageSize;
            return $.Deferred(function (k) {
                $.ajax({
                    url: g,
                    type: "GET",
                    headers: {
                        accept: "application/json;odata=verbose"
                    },
                    dataType: "json",
                    data: f,
                    cache: false,
                    success: function (l) {
                        h = {
                            Result: "OK",
                            Records: l.d.results,
                            TotalRecordCount: l.d.__count
                        };
                        k.resolve(h);
                    },
                    error: function () {
                        k.reject();
                    }
                });
            });
        },
        c = function (f, e) {
            var h;
            var b = "RequestStatus eq 'Approved'";
            var g = appweburl + "/_vti_bin/ListData.svc/TravelRequests/?$filter=" + b + "&$inlinecount=allpages&$select=Id,Created,RequesterName,TripStartDate,TripEndDate,RequestStatus,RequestApprover,TripPurpose,RequestRejectReason&$expand=RequestApprover&$orderby=" +
                e.jtSorting.replace(" DESC", " desc").replace(" ASC", " asc") + "&$skip=" + e.jtStartIndex + "&$top=" + e.jtPageSize;
            return $.Deferred(function (k) {
                $.ajax({
                    url: g,
                    type: "GET",
                    headers: {
                        accept: "application/json;odata=verbose"
                    },
                    dataType: "json",
                    data: f,
                    cache: false,
                    success: function (l) {
                        h = {
                            Result: "OK",
                            Records: l.d.results,
                            TotalRecordCount: l.d.__count
                        };
                        k.resolve(h);
                    },
                    error: function () {
                        k.reject();
                    }
                });
            });
        },
        a = function (e) {
            var d = b();
            var f;
            return $.Deferred(function (g) {
                $.ajax({
                    url: appweburl +
                        "/_api/Web/lists/getbytitle('TravelRequests')/getItemByStringId('" + e + "')",
                    async: true,
                    type: "DELETE",
                    headers: {
                        accept: "application/json;odata=verbose",
                        "X-RequestDigest": d,
                        "IF-MATCH": "*"
                    },
                    success: function (h) {
                        f = {
                            Result: "OK"
                        };
                        g.resolve(f);
                    },
                    error: function (j, h, i) {
                        g.reject();
                    }
                });
            });
        };
    return {
        readApproved: c,
        readRejected: p,
        readPending: o,
        deleteItem: a
    };
}();
$(document).ready(function () {
    $(function () {
        $("#Approved").jtable({
            title: "Approved Requests",
            paging: true,
            pageSize: 10,
            sorting: true,
            multiSorting: true,
            defaultSorting: "Id desc",
            messages: {
                addNewRecord: "Add new request"
            },
            toolbar: {
                items: [{
                    icon: "../Content/themes/metro/add.png",
                    text: "Create new request",
                    click: function () {
                        location.href = "RequestFormCreate.aspx";
                    }
                }]
            },
            actions: {
                listAction: MyRequests.readApproved
            },
            fields: {
                Id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: true,
                    title: "ID",
                    width: "5%"
                },
                Created: {
                    title: "Created",
                    width: "10%",
                    display: function (d) {
                        var e = moment(d.record.Created).utc();
                        if (e.isValid()) {
                            return e.format(commonDateFormat2);
                        }
                    }
                },
                RequesterName: {
                    title: "Requestor",
                    width: "15%"
                },
                TripStartDate: {
                    title: "Trip Start",
                    width: "10%",
                    display: function (d) {
                        var e = moment(d.record
                            .TripStartDate);
                        if (e.isValid()) {
                            return e.format(commonDateFormat2);
                        }
                    }
                },
                TripEndDate: {
                    title: "Trip End",
                    width: "10%",
                    display: function (d) {
                        var e = moment(d.record
                            .TripEndDate);
                        if (e.isValid()) {
                            return e.format(commonDateFormat2);
                        }
                    }
                },
                RequestStatus: {
                    title: "Status",
                    width: "15%"
                },
                RequestApprover: {
                    title: "Request Approver",
                    width: "15%",
                    sorting: false,
                    display: function (d) {
                        if (typeof d.record.RequestApprover != "undefined" && d.record.RequestApprover != null) {
                            return d.record.RequestApprover.Name;
                        }
                    }
                },
                TripPurpose: {
                    title: "Trip Purpose",
                    width: "50%",
                    sorting: false,
                },
                CustomViewAction: {
                    title: "",
                    listClass: "jtable-command-column",
                    sorting: false,
                    width: "1%",
                    display: function (d) {
                        return "<button title='View' onclick='location.href=\"RequestFormView.aspx?requestID=" + d.record.Id + "\"' class='jtable-command-button jtable-view-command-button'><span>View</span></button>";
                    }
                }
            }
        });
        $("#Approved").jtable("load");
    });
    //Pending
    $(function () {
        $("#Pending").jtable({
            title: "All Pending Requests",
            paging: true,
            pageSize: 10,
            sorting: true,
            multiSorting: true,
            defaultSorting: "Id desc",
            actions: {
                listAction: MyRequests.readPending
            },
            fields: {
                Id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: true,
                    title: "ID",
                    width: "5%"
                },
                Created: {
                    title: "Created",
                    width: "10%",
                    display: function (d) {
                        var e = moment(d.record.Created).utc();
                        if (e.isValid()) {
                            return e.format(commonDateFormat2);
                        }
                    }
                },
                TripStartDate: {
                    title: "Trip Start",
                    width: "10%",
                    display: function (d) {
                        var e = moment(d.record.TripStartDate);
                        if (e.isValid()) {
                            return e.format(commonDateFormat2);
                        }
                    }
                },
                TripEndDate: {
                    title: "Trip End",
                    width: "10%",
                    display: function (d) {
                        var e = moment(d.record.TripEndDate);
                        if (e.isValid()) {
                            return e.format(commonDateFormat2);
                        }
                    }
                },
                RequestStatus: {
                    title: "Status",
                    width: "15%"
                },
                RequestApprover: {
                    title: "Request Approver",
                    width: "15%",
                    sorting: false,
                    display: function (d) {
                        if (typeof d.record.RequestApprover != "undefined" && d.record.RequestApprover != null) {
                            return d.record.RequestApprover.Name;
                        }
                    }
                },
                TripPurpose: {
                    title: "Trip Purpose",
                    width: "35%",
                    sorting: false,
                },
                CustomViewAction: {
                    title: "",
                    listClass: "jtable-command-column",
                    sorting: false,
                    width: "1%",
                    display: function (d) {
                        return "<button title='View' onclick='location.href=\"RequestFormView.aspx?requestID=" + d.record.Id + "\"' class='jtable-command-button jtable-view-command-button'><span>View</span></button>";
                    }
                },
                CustomEditAction: {
                    title: "",
                    listClass: "jtable-command-column",
                    sorting: false,
                    width: "1%",
                    display: function (d) {
                        return "<button title='Edit' onclick='location.href=\"RequestFormEdit.aspx?requestID=" + d.record.Id + "\"' class='jtable-command-button jtable-edit-command-button'><span>Edit</span></button>";
                    }
                }
            }
        });
        $("#Pending").jtable("load");
    });
    //Rejected
    $(function () {
        $("#Rejected").jtable({
            title: "All Rejected Requests",
            paging: true,
            pageSize: 10,
            sorting: true,
            multiSorting: true,
            defaultSorting: "Id desc",
            actions: {
                listAction: MyRequests.readRejected
            },
            fields: {
                Id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: true,
                    title: "ID",
                    width: "5%"
                },
                Created: {
                    title: "Created",
                    width: "10%",
                    display: function (d) {
                        var e = moment(d.record.Created).utc();
                        if (e.isValid()) {
                            return e.format(commonDateFormat2);
                        }
                    }
                },
                TripStartDate: {
                    title: "Trip Start",
                    width: "10%",
                    display: function (d) {
                        var e = moment(d.record.TripStartDate);
                        if (e.isValid()) {
                            return e.format(commonDateFormat2);
                        }
                    }
                },
                TripEndDate: {
                    title: "Trip End",
                    width: "10%",
                    display: function (d) {
                        var e = moment(d.record.TripEndDate);
                        if (e.isValid()) {
                            return e.format(commonDateFormat2);
                        }
                    }
                },
                RequestStatus: {
                    title: "Status",
                    width: "15%"
                },
                RequestApprover: {
                    title: "Request Approver",
                    width: "15%",
                    sorting: false,
                    display: function (d) {
                        if (typeof d.record.RequestApprover != "undefined" && d.record.RequestApprover != null) {
                            return d.record.RequestApprover.Name;
                        }
                    }
                },
                RequestRejectReason: {
                    title: "Reject Reason",
                    width: "18%"
                },
                TripPurpose: {
                    title: "Trip Purpose",
                    width: "35%",
                    sorting: false
                },
                CustomViewAction: {
                    title: "",
                    listClass: "jtable-command-column",
                    sorting: false,
                    width: "1%",
                    display: function (d) {
                        return "<button title='View' onclick='location.href=\"RequestFormView.aspx?requestID=" + d.record.Id + "\"' class='jtable-command-button jtable-view-command-button'><span>View</span></button>";
                    }
                },
                CustomEditAction: {
                    title: "",
                    listClass: "jtable-command-column",
                    sorting: false,
                    width: "1%",
                    display: function (d) {
                        return "<button title='Edit' onclick='location.href=\"RequestFormEdit.aspx?requestID=" + d.record.Id + "\"' class='jtable-command-button jtable-edit-command-button'><span>Edit</span></button>";
                    }
                }
            }
        });
        $("#Rejected").jtable("load");
    });
});