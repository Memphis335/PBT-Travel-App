<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="../Master Page/travel.master" Language="C#" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="divHeader" runat="server">
    <link href="../Content/Fabric-UI/fabric.css" rel="stylesheet" />
    <link href="../Content/Fabric-UI/fabric.components.css" rel="stylesheet" />
    <link href="../Content/Custom/jQuery-UI-Custom.css" rel="stylesheet" />

    <!-- Handsontable-->

    <script src="../Scripts/handsontable/handsontable.full.js"></script>
    <link media="screen" href="../Content/handsontable/handsontable.full.css" rel="stylesheet" />
    <link href="../Content/jquery.handsontable.bootstrap.css" rel="stylesheet" />

    <!-- JS -->
    <script type="text/javascript" src="//ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="_layouts/15/SP.Core.js"></script>
    <script type="text/javascript" src="_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="_layouts/15/sp.js"></script>
    <script type="text/javascript" src="_layouts/15/sp.workflowservices.js"></script>

    <script src="../Scripts/Custom/RequestFormView.js"></script>

</asp:Content>

<asp:Content ContentPlaceHolderID="mainContent" runat="server">
    <div id="containerRight" class="containerRight">
        <div id="topHeader" class="topHeader">
            <h1>Request Details</h1>
        </div>
        <div id="mainContainer" style="clear: both;">
            <div class="maincontent">
                <form id="requestFormCreate" class="stdform stdform2" method="post" action="RequestFormCreate.aspx">
                    <div class="tabbedwidget tab-primary" id="formTabs">
                        <ul id="tabs">
                            <li><a href="#aPersonalInfo">Personal Info</a></li>
                            <li><a href="#aRequestInfo">Request Info</a></li>
                            <li><a href="#aApprovals">Approvals</a></li>
                            <li><a href="#aTravelInfo">Travel Info</a></li>
                            <li><a href="#aAttachments">Attachments</a></li>
                            <li><a href="#aBookingProgress">Booking Progress</a></li>
                        </ul>
                        <div id="aPersonalInfo">
                            <p class="control-group">
                                <label for="lblRequesterName">Requester Name</label>
                                <span class="field"><span id="lblRequesterName" class="sLabel"></span></span>
                            </p>
                            <p class="control-group">
                                <label for="lblEmail">Email</label>
                                <span class="field"><span id="lblEmail" class="sLabel"></span></span>
                            </p>
                            <p>
                                <label>ID / Passport</label>
                                <span class="field"><span id="lblEmployeeID" class="sLabel"></span></span>
                            </p>
                            <p>
                                <label>Phone Number</label>
                                <span class="field"><span id="lblPhoneNumber" class="sLabel"></span></span>
                            </p>
                            <p>
                                <label>Frequent-flyer Program</label>
                                <span class="field"><span id="lblFrequentflyer" class="sLabel"></span></span>
                            </p>
                            <p>
                                <label>Frequent-flyer Program Number</label>
                                <span class="field"><span id="lblFrequentflyerNumber" class="sLabel"></span></span>
                            </p>
                            <p>
                                <label>Project</label>
                                <span class="field"><span id="lblProject" class="sLabel"></span></span>
                            </p>
                            <p>
                                <label>Personal Requests</label>
                                <span class="field"><span id="lblNotice" class="sLabel"></span></span>
                            </p>
                        </div>
                        <div id="aRequestInfo">
                            <p>
                                <label>Request ID</label>
                                <span class="field"><span id="lblRequestID" class="sLabel"></span></span>
                            </p>
                            <p>
                                <label>Request Status</label>
                                <span class="field"><span id="lblRequestStatus" class="sLabel"></span></span>
                            </p>
                            <p id="pRejectReason">
                                <label>Reject Reason</label>
                                <span class="field"><span id="lblRejectReason" class="sLabel"></span></span>
                            </p>
                            <p>
                                <label>Created Date</label>
                                <span class="field"><span id="lblCreatedDate" class="sLabel"></span></span>
                            </p>
                            <p>
                                <label>Last Modified Date</label>
                                <span class="field"><span id="lblModifiedDate" class="sLabel"></span></span>
                            </p>
                        </div>
                        <div id="aTravelInfo">
                            <p class="control-group">
                                <label for="lblDeptCity">Departure City</label>
                                <span class="field"><span id="lblDeptCity" class="sLabel"></span></span>
                            </p>
                            <p class="control-group">
                                <label for="lblTripStartDate">Trip Start Date</label>
                                <span class="field"><span id="lblTripStartDate" class="sLabel"></span></span>
                            </p>
                            <p class="control-group">
                                <label for="lblTripEndDate">Trip End Date</label>
                                <span class="field"><span id="lblTripEndDate" class="sLabel"></span></span>
                            </p>
                            <p class="control-group">
                                <label for="lblTripPurpose">Trip Purpose</label>
                                <span class="field"><span id="lblTripPurpose" class="sLabel"></span></span>
                            </p>
                            <p>
                                <label>Notices</label>
                                <span class="field"><span id="lblNotices" class="sLabel"></span></span>
                            </p>
                            <p class="control-group">
                                <span style="display: block; clear: both;">
                                    <input id="txtDestinations" name="txtDestinations" type="text" style="display: none;" />
                                </span>
                                <label>Destinations</label>
                                <div id="divDestinations" style="clear: both; overflow: auto; padding-top: 15px;"></div>
                            </p>
                        </div>
                        <div id="aApprovals">
                            <p>
                                <label>Request Approver</label>
                                <span class="field"><span id="lblRequestApprover" class="sLabel"></span></span>
                            </p>
                            <p>
                                <label>Request Approve Date</label>
                                <span class="field"><span id="lblRequestApproveDate" class="sLabel"></span></span>
                            </p>
                        </div>
                        <div id="aAttachments">
                            <div style="display: none; margin: 10px;" id="noAttachments">
                                No attachments uploaded
                            </div>
                        </div>
                        <div id="aBookingProgress">
                            <p class="control-group">
                                <label for="lblTicket">Ticket Issued?</label>
                                <span class="field"><span id="lblTicket" class="sLabel" style="width: 20px;"></span><span id="lblNote1" class="sLabel"></span></span>
                            </p>
                            <p class="control-group">
                                <label for="lblAccom">Accomodation Confirmed?</label>
                                <span class="field"><span id="lblAccom" class="sLabel" style="width: 20px;"></span><span id="lblNote2" class="sLabel"></span></span>
                            </p>
                            <p class="control-group">
                                <label for="lblRental">Car Rental Booked?</label>
                                <span class="field"><span id="lblRental" class="sLabel" style="width: 20px;"></span><span id="lblNote3" class="sLabel"></span></span>
                            </p>
                            <p class="control-group">
                                <label for="lblTransfer">Airport Transfers Arranged?</label>
                                <span class="field"><span id="lblTransfer" class="sLabel" style="width: 20px;"></span><span id="lblNote4" class="sLabel"></span></span>
                            </p>
                            <p class="control-group">
                                <label for="lblPassport">Passport/Visa Valid?</label>
                                <span class="field"><span id="lblPassport" class="sLabel" style="width: 20px;"></span><span id="lblNote5" class="sLabel"></span></span>
                            </p>
                        </div>
                    </div>
                    <div style="margin: 10px;">
                        <button id="btnEditRequest" type="button" class="ms-Button"><span class="ms-Button-label"><i class="ms-Icon ms-Icon--editBox"></i>Edit request</span></button>
                        <button id="btnPrint" type="button" class="ms-Button"><span class="ms-Button-label"><i class="ms-Icon ms-Icon--print"></i>Print</span></button>
                        <button id="btnSendRequestToApprove" type="button" class="ms-Button ms-Button--primary" style="display: none;"><span class="ms-Button-label"><i class="ms-Icon ms-Icon--mailSend"></i>Send to approve</span></button>
                        <button id="btnApproveRequest" type="button" class="ms-Button ms-Button--primary" style="display: none;"><span class="ms-Button-label"><i class="ms-Icon ms-Icon--check"></i>Approve</span></button>
                        <button id="btnRejectRequest" type="button" class="ms-Button" style="display: none;"><span class="ms-Button-label"><i class="ms-Icon ms-Icon--x"></i>Reject</span></button>
                        <div id="divValidationSummary" style="margin: 5px; display: none;">
                            <label id="lblValidationSummary" class="error">Please fix the validation errors</label>
                        </div>
                    </div>
                    <!--tabbedwidget-->
                </form>
            </div>
        </div>
    </div>
    <div id="dialog-send-approval" title="Are you sure?" style="display: none;">
        <p>
            This request will be submitted for approval and no editing is allowed afterwards. Are you sure all details are correct?                                                                                         
        </p>
    </div>
    <div id="dialog-confirm-approve" title="Are you sure?" style="display: none;">
        <p>
            This request will be approved. Are you sure?                                                                                   
        </p>
    </div>
    <div id="dialog-confirm-reject" title="Are you sure?" style="display: none;">
        <form id="rejectForm" action="#">
            <p>
                This request will be rejected.<br />
                Please enter reject reason.<br />
                <input id="txtRejectReason" type="text" name="txtRejectReason" class="input-xlarge" />
            </p>
        </form>
    </div>

    <div id="dialog-print">
    </div>

</asp:Content>
