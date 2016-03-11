<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="../Master Page/travel.master" Language="C#" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="divHeader" runat="server">
    <link href="../Content/fullcalendar.css" rel="stylesheet" />
    <link href="../Content/jquery.alerts.css" rel="stylesheet" />
    <link href="../Content/jquery.tagsinput.css" rel="stylesheet" />
    <link href="../Content/jquery.chosen.css" rel="stylesheet" />

    <script src="../Scripts/Custom/MySettlements.js"></script>
    <script src="../Scripts/jquery.validate.min.js"></script>
    <script src="../Scripts/jquery.tagsinput.min.js"></script>
    <script src="../Scripts/jquery.autogrow-textarea.js"></script>
</asp:Content>

<asp:content contentplaceholderid="mainContent" runat="server">
    <div id="containerRight" class="containerRight">
         <div id="topHeader" class="topHeader">
            <h1>My Settlements</h1>
        </div>

        <div id="mainContainer" style="clear: both;">
            <div style="width: 900px; width:900px; margin-top: 25px">
                <div class="jtableContainer" id="PendingRequests"></div>
            </div>

        </div>
    </div>
</asp:content>
