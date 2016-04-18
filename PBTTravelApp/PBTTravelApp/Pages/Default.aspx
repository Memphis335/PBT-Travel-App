<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="../Master Page/travel.master" Language="C#" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="divHeader" runat="server">
    <link href="../Content/Fabric-UI/fabric.css" rel="stylesheet" />

    <script src="../Scripts/Custom/AppInit.js"></script>
    <script src="../Scripts/Custom/Default.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="mainContent" runat="server">
    <div id="topHeader" class="topHeader">
        <h1>PBT Travel </h1>
    </div>
    <!--Main Content-->
    <div id="mainContainer" style="clear: both;">
        <div id="getStarted" style="margin-top: 20px;">
            <h2>Get started with Travel Request System</h2>
            <div class="tilesContainer">
                <div id="dashboard" onclick="window.location.href='Dashboard.aspx'" class="tileMedium tileDashboard" hidden="hidden">
                    <div class="tileText">Dashboard</div>
                    <div class="tileIconContainer"><i class="ms-Icon ms-Icon--dashboard"></i></div>
                </div>
                <div onclick="window.location.href='RequestFormCreate.aspx'" class="tileMedium tileAdd">
                    <div class="tileText">Create new</div>
                    <div class="tileIconContainer"><i class="ms-Icon ms-Icon--plus"></i></div>
                </div>
                <div onclick="window.location.href='ToApproveByMe.aspx'" class="tileMedium tileApprove">
                    <div class="tileText">Approve</div>
                    <div class="tileIconContainer"><i class="ms-Icon ms-Icon--tasks"></i></div>
                </div>
            </div>
        </div>
        <div style="width: 800px; margin-top: 25px">
            <div class="jtableContainer" id="PendingRequests"></div>
        </div>
    </div>

</asp:Content>

