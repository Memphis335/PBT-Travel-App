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
    <script src="../Scripts/Custom/RequestFormEdit.js"></script>

</asp:Content>

<asp:Content ContentPlaceHolderID="mainContent" runat="server">
    <div id="containerRight" class="containerRight">
        <div id="topHeader" class="topHeader">
            <h1>Edit Request </h1>
        </div>
        <div id="mainContainer" style="clear: both;">
            <div class="maincontent">
                <form id="requestFormEdit" class="stdform stdform2" method="post">
                    <div class="tabbedwidget tab-primary" id="formTabs">
                        <ul id="tabs">
                            <li><a href="#aPersonalInfo">Personal Info</a></li>
                            <li><a href="#aRequestInfo">Request Info</a></li>
                            <li><a href="#aApprovals">Approver</a></li>
                            <li><a href="#aTravelInfo">Travel Info</a></li>
                            <li><a href="#aAttachments">Attachments</a></li>
                            <li id="liBookingProgress" style="display: none;"><a href="#aBookingProgress">Booking Progress</a></li>
                        </ul>
                        <div id="aPersonalInfo">
                            <p class="control-group">
                                <label for="txtRequesterName">Requester Name </label>
                                <span class="field">
                                    <input type="text" name="txtRequesterName" id="txtRequesterName" class="input-xlarge" /></span>
                            </p>
                            <p class="control-group">
                                <label for="txtEmail">Email</label>
                                <span class="field">
                                    <input type="text" name="txtEmail" id="txtEmail" class="input-xlarge" /></span>
                            </p>
                            <p>
                                <label>ID / Passport Number</label>
                                <span class="field">
                                    <input type="text" name="txtEmployeeID" id="txtEmployeeID" class="input-xlarge" title="As per South African ID." /></span>
                            </p>
                            <p>
                                <label>Phone number</label>
                                <span class="field">
                                    <input type="text" name="txtPhoneNumber" id="txtPhoneNumber" class="input-xlarge" /></span>
                            </p>
                            <p>
                                <label>Frequent-flyer Program</label>
                                <span class="field">
                                    <select name="ddlFFP" id="ddlFFP" class="ms-Dropdown">
                                        <option value="">Choose One</option>
                                    </select>
                                </span>
                            </p>
                            <p>
                                <label>Frequent-flyer Program Number</label>
                                <span class="field">
                                    <input type="text" name="txtFFPN" id="txtFFPN" class="input-xlarge" />
                                    <input type="checkbox" id="addMore" name="addMore"/>Add More?
                                </span>
                            </p>
                            <p id="ExtraProg" style="display: none;">
                                <label>Extra Program</label>
                                <span class="field">
                                    <select name="ddlFFP2" id="ddlFFP2" class="ms-Dropdown">
                                        <option value="">Choose One</option>
                                    </select>
                                </span>
                            </p>
                            <p id="ExtraNum" style="display: none;">
                                <label>Extra Membership Number</label>
                                <span class="field">
                                    <input type="text" name="txtFFPN2" id="txtFFPN2" class="input-xlarge" />
                                    <input type="checkbox" id="addMore2" name="addMore2"/>More?
                                </span>
                            </p>
                            <p id="ExtraNumMul" style="display: none;">
                                <label>Extra Memberships</label>
                                <span class="field">
                                    <textarea cols="80" rows="3" name="txtFFPNMul" id="txtFFPNMul" class="standardTextArea" placeholder="Emirates - 352232;BA - 3266559"></textarea>
                                </span>
                            </p>
                            <p>
                                <label>Project</label>
                                <span class="field">
                                    <select name="ddlProject" id="ddlProject" class="ms-Dropdown">
                                        <option value="">Choose One</option>
                                    </select>
                                </span>
                            </p>
                            <p>
                                <label>Personal Requests</label>
                                <span class="field">
                                    <textarea cols="80" rows="3" id="taPersonal" class="standardTextArea" placeholder="eg. Meals"></textarea></span>
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
                                <label>Last modified Date</label>
                                <span class="field"><span id="lblModifiedDate" class="sLabel"></span></span>
                            </p>
                        </div>
                        <div id="aApprovals" style="height: 200px;">
                            <p>
                                <label>Request Approver</label>
                                <span class="field">
                                    <select name="ddlRequestApprover" id="ddlRequestApprover" data-placeholder="Choose a Employee..." style="margin-right: 10px; width: 370px;" tabindex="2">
                                        <option value=""></option>
                                    </select>
                                </span>
                            </p>
                            <p>
                                <label>Request Approve Date</label>
                                <span class="field"><span id="lblRequestApproveDate" class="sLabel"></span></span>
                            </p>
                        </div>
                        <div id="aTravelInfo">
                            <p class="control-group">
                                <label for="txtDeptCity">Departure City</label>
                                <span class="field">
                                    <input id="txtDeptCity" type="text" name="txtDeptCity" class="input-xlarge" /></span>
                            </p>
                            <p class="control-group">
                                <label for="txtStartDate">Departure Date</label>
                                <span class="field">
                                    <input id="txtStartDate" type="text" name="txtTripStartDate" class="input-xlarge" /></span>
                            </p>
                            <p class="control-group">
                                <label for="txtEndDate">Return Date</label>
                                <span class="field">
                                    <input id="txtEndDate" type="text" name="txtTripEndDate" class="input-xlarge" /></span>
                                <input type="hidden" id="dateCalc" />
                            </p>
                            <p class="control-group">
                                <label for="txtPurpose">Purpose of Trip</label>
                                <span class="field">
                                    <input id="txtPurpose" type="text" name="txtTripPurpose" class="input-xlarge" /></span>
                            </p>
                            <p>
                                <label>Deliverable</label>
                                <span class="field">
                                    <textarea cols="80" rows="3" id="taNotices" class="standardTextArea"></textarea></span>
                            </p>
                            <p class="control-group">
                                <span style="display: block; clear: both;">
                                    <input id="txtDestinations" name="txtDestinations" type="text" style="display: none;" />
                                </span>
                                <label>Travel Destinations</label>
                                <div id="divDestinations" style="clear: both; overflow: auto; padding-top: 15px;"></div>
                            </p>
                        </div>
                        <div id="aAttachments">
                            <input type="file" id="fileUpload" />
                            <div class="MultiFile-list" id="fileUpload_wrap_list">
                            </div>
                        </div>
                        <div id="aBookingProgress" style="display: none;">
                            <p class="control-group">
                                <label for="chkTicket">Ticket Issued?</label>
                                <span class="fieldCustom">
                                    <input id="chkTicket" name="chkTicket" type="checkbox" />
                                    <label for="refTicket" style="width: 60px;">Ref : </label>
                                    <input type="text" id="refTicket" name="refTicket" />
                                    <label for="txtTicket" style="width: 60px;">Notes : </label>
                                    <input id="txtTicket" name="txtTicket" type="text" />
                                    <input type="file" id="fileTicket" style="margin-left: 5px;"/>
                                    <span id="fileTicketRetrieved" class="file"></span>
                                </span>
                            </p>
                            <p class="control-group">
                                <label for="chkAccom">Accomodation Confirmed?</label>
                                <span class="fieldCustom">
                                    <input id="chkAccom" name="chkAccom" type="checkbox" />
                                    <label for="refAccom" style="width: 60px;">Ref : </label>
                                    <input id="refAccom" type="text" name="refAccom" />
                                    <label for="txtAccom" style="width: 60px;">Notes : </label>
                                    <input id="txtAccom" name="txtAccom" type="text" />
                                    <input type="file" id="fileAccom" style="margin-left: 5px;" />
                                    <span id="fileAccomRetrieved" class="file"></span>
                                </span>
                            </p>
                            <p class="control-group">
                                <label for="chkRental">Car Rental Booked?</label>
                                <span class="fieldCustom">
                                    <input id="chkRental" name="chkRental" type="checkbox" />
                                    <label for="refRental" style="width: 60px;">Ref : </label>
                                    <input type="text" id="refRental" name="refRental" />
                                    <label for="txtRental" style="width: 60px;">Notes : </label>
                                    <input id="txtRental" name="txtRental" type="text" />
                                    <input type="file" id="fileRental" style="margin-left: 5px;" />
                                    <span id="fileRentalRetrieved" class="file"></span>
                                </span>
                            </p>
                            <p class="control-group">
                                <label for="chkTransfer">Airport Transfers Arranged?</label>
                                <span class="fieldCustom">
                                    <input id="chkTransfer" name="chkTransfer" type="checkbox" />
                                    <label for="refTransfer" style="width: 60px;">Ref : </label>
                                    <input type="text" id="refTransfer" name="refTransfer" />
                                    <label for="txtTransfer" style="width: 60px;">Notes : </label>
                                    <input id="txtTransfer" name="txtTransfer" type="text" />
                                    <input type="file" id="fileTransfer" style="margin-left: 5px;" />
                                    <span id="fileTransferRetrieved" class="file"></span>
                                </span>
                            </p>
                            <p class="control-group">
                                <label for="chkPassport">Passport/Visa Valid?</label>
                                <span class="fieldCustom">
                                    <input id="chkPassport" name="chkPassport" type="checkbox" />

                                    <label for="txtPassport" style="width: 60px; margin-left: 290px;">Notes : </label>
                                    <input id="txtPassport" name="txtPassport" type="text" />
                                    <input type="file" id="filePassport" style="margin-left: 5px;" />
                                    <span id="filePassRetrieved" class="file"></span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div style="margin: 10px;">

                        <button id="btnSubmit" type="submit" class="ms-Button ms-Button--primary"><span class="ms-Button-label"><i class="ms-Icon ms-Icon--save"></i>Save changes</span></button>
                        <button id="btnCancel" type="button" class="ms-Button"><span class="ms-Button-label"><i class="ms-Icon ms-Icon--x"></i>Cancel</span></button>

                        <div id="divValidationSummary" style="margin: 5px; display: none;">
                            <label id="lblValidationSummary" class="error">Please fix the validation errors</label>
                        </div>
                    </div>
                    <!--tabbedwidget-->
                </form>
            </div>
        </div>
    </div>
</asp:Content>
