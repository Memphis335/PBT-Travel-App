﻿<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="../Master Page/travel.master" Language="C#" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="divHeader" runat="server">
    <script src="../Scripts/Custom/ToApproveByMe.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="mainContent" runat="server">
    <div id="containerRight" class="containerRight">
        <div id="topHeader" class="topHeader">
            <h1>To Approve By Me </h1>
        </div>
        <div id="mainContainer" style="clear: both;">
            <div style="width: 900px;margin-top: 25px">
                <div class="jtableContainer" id="PendingRequests"></div>
            </div>
            <div style="width: 900px;margin-top: 25px">
                <div class="jtableContainer" id="ApprovedRequests"></div>
            </div>
        </div>
    </div>
</asp:Content>
