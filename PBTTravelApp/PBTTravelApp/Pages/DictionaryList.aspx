﻿<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="../Master Page/travel.master" Language="C#" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="divHeader" runat="server">
    <link href="../Content/jquery.chosen.css" rel="stylesheet" />
    <link href="../Content/jquery.tagsinput.css" rel="stylesheet" />
    <link href="../Content/fullcalendar.css" rel="stylesheet" />

    <script type="text/javascript" src="../Scripts/jquery.validate.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.tagsinput.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.autogrow-textarea.js"></script>
    <script type="text/javascript" src="../Scripts/chosen.jquery.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.cookie.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validationEngine.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validationEngine-en.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validate.min.js"></script>
    <script type="text/javascript" src="../Scripts/Custom/Dictionaries.js"></script>
    <script type="text/javascript" src="../Scripts/Custom/UserRoles.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="mainContent" runat="server">
    <div id="containerRight" class="containerRight">
        <div id="topHeader" class="topHeader">
            <h1>Dictionaries</h1>
        </div>
        <div id="mainContainer" style="clear: both;">
            <div style="width: 500px; margin-top: 15px">
                <div class="jtableContainer" id="DictProjects"></div>
            </div>
            <div style="width: 500px; margin-top: 15px">
                <div class="jtableContainer" id="DictPrograms"></div>
            </div>
            <div style="width: 500px; margin-top: 15px">
                <div class="jtableContainer" id="DictClients" title="Clients listed here have to correspond to Clients listed in Project/ PO Numbers"></div>
            </div>
            <div style="width: 500px; margin-top: 15px">
                <div class="jtableContainer" id="DictPONumbers"></div>
            </div>
            <div style="width: 500px; margin-top: 15px">
                <div class="jtableContainer" id="DictApprovers"></div>
            </div>
            <div style="width: 500px; margin-top: 15px">
                <div class="jtableContainer" id="Dict2ndApprovers"></div>
            </div>
            <div style="display: none">
                <button type="submit" id="tempBtn">Populate PO Numbers</button>
            </div>
            <div style="padding-bottom: 20px;"></div>
        </div>
    </div>
</asp:Content>
