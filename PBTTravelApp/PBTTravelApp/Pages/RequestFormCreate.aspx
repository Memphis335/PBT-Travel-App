﻿<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="../Master Page/travel.master" Language="C#" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="divHeader" runat="server">
    <link href="../Content/Fabric-UI/fabric.css" rel="stylesheet" />
    <link href="../Content/Fabric-UI/fabric.components.css" rel="stylesheet" />
    <link href="../Content/Custom/jQuery-UI-Custom.css" rel="stylesheet" />
    <link href="../Content/Custom/PeoplePicker.css" rel="stylesheet" />

    <!-- Handsontable-->
    <script src="../Scripts/handsontable/handsontable.full.js"></script>
    <link media="screen" href="../Content/handsontable/handsontable.full.css" rel="stylesheet" />
    <link href="../Content/jquery.handsontable.bootstrap.css" rel="stylesheet" />

    <!-- JS -->
    <script src="../Scripts/Custom/RequestFormCreate.js"></script>
    <script type="text/javascript" src="//ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js"></script>
    <script src="../Scripts/Custom/App.js"></script>
    <script src="../Scripts/Custom/sppeoplepicker.js"></script>
    <script src="../Scripts/Custom/peoplepicker.js"></script>

</asp:Content>

<asp:Content ContentPlaceHolderID="mainContent" runat="server">
    <div id="containerRight" class="containerRight">
        <div id="topHeader" class="topHeader">
            <h1>Create New Request </h1>
        </div>
        <div id="mainContainer" style="clear: both;">
            <div class="maincontent">
                <form id="requestFormCreate" class="stdform stdform2" method="post">
                    <div style="margin: 10px;">
                        <div id="divValidationSummary" style="margin: 5px; display: none;">
                            <label id="lblValidationSummary" class="error">Please fix the validation errors</label>
                        </div>
                    </div>
                    <div class="tabbedwidget tab-primary" id="formTabs">
                        <ul id="tabs">
                            <li><a href="#aPersonalInfo">Personal Info</a></li>
                            <li><a href="#aApprovals">Approver</a></li>
                            <li><a href="#aTravelInfo">Travel Info</a></li>
                            <li><a href="#aAttachments">Attachments</a></li>
                            <li><a href="#aBookingProgress">Booking Progress</a></li>
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
                                    <input type="text" name="txtFFP" id="txtFFP" class="input-xlarge" />
                                </span>
                            </p>
                            <p>
                                <label>Frequent-flyer Program Number</label>
                                <span class="field">
                                    <input type="text" name="txtFFPN" id="txtFFPN" class="input-xlarge" />
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
                        <div id="aApprovals" style="height: 200px;">
                            <p>
                                <label>Request Approver</label>
                                <div class="field">
                                    <%--<select name="ddlRequestApprover" id="ddlRequestApprover" data-placeholder="Choose a Employee..." style="margin-right: 10px; width: 370px;" class="" tabindex="2">
                                        <option value=""></option>
                                    </select>--%>
                                    <div id="peoplePickerDiv" style="margin-right: 10px; width: 370px;"></div>
                                </div>
                            </p>
                        </div>
                        <div id="aTravelInfo">
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
                            </p>
                            <div id="divDestinations" style="clear: both; overflow: auto; padding-top: 15px;" onclick="dateCalc();"></div>
                        </div>
                        <div id="aAttachments" title="eg. ID's or Passports">
                            <input type="file" id="fileUpload" />
                        </div>
                        <div id="aBookingProgress">
                            <p class="control-group">
                                <label for="chkTicket">Ticket Issued?</label>
                                <span class="field">
                                    <input id="chkTicket" name="chkTicket" type="checkbox" /></span>
                            </p>
                            <p class="control-group">
                                <label for="chkAccom">Accomodation Confirmed?</label>
                                <span class="field">
                                    <input id="chkAccom" name="chkAccom" type="checkbox" /></span>
                            </p>
                            <p class="control-group">
                                <label for="chkRental">Car Rental Booked?</label>
                                <span class="field">
                                    <input id="chkRental" name="chkRental" type="checkbox" /></span>
                            </p>
                            <p class="control-group">
                                <label for="chkTransfer">Airport Transfers Arranged?</label>
                                <span class="field">
                                    <input id="chkTransfer" name="chkTransfer" type="checkbox" /></span>
                            </p>
                            <p class="control-group">
                                <label for="chkPassport">Passport/Visa Valid?</label>
                                <span class="field">
                                    <input id="chkPassport" name="chkPassport" type="checkbox" /></span>
                            </p>
                        </div>
                    </div>
                    <!--tabbedwidget-->
                    <div style="margin: 10px;">
                        <button id="btnSubmit" class="ms-Button ms-Button--primary" type="submit"><span class="ms-Button-label"><i class="ms-Icon ms-Icon--save"></i>Save changes</span></button>
                        <button id="btnCancel" class="ms-Button" type="button"><span class="ms-Button-label"><i class="ms-Icon ms-Icon--x"></i>Cancel</span></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</asp:Content>
