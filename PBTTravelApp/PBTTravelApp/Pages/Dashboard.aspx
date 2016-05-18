<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="../Master Page/travel.master" Language="C#" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="divHeader" runat="server">
    <link href="../Content/fullcalendar.css" rel="stylesheet" />
    <link href="../Content/jquery.chosen.css" rel="stylesheet" />
    <link href="../Content/jquery.tagsinput.css" rel="stylesheet" />

    <script src="../Scripts/jquery.tagsinput.min.js"></script>
    <script src="../Scripts/chosen.jquery.min.js"></script>
    <script src="../Scripts/Custom/Dashboard.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="mainContent" runat="server">
    <div id="containerRight" class="containerRight">
        <div id="topHeader" class="topHeader">
            <h1>Dashboard </h1>
        </div>

        <div id="mainContainer" style="clear: both;">

            <div style="width: 1000px; margin-top: 15px">
                <div class="jtableContainer" id="Approved"></div>
            </div>
            <div style="width: 1000px; margin-top: 15px">
                <div class="jtableContainer" id="Rejected"></div>
            </div>
            <div style="width: 1000px; margin-top: 15px">
                <div class="jtableContainer" id="Pending"></div>
            </div>

        </div>
    </div>
</asp:Content>
