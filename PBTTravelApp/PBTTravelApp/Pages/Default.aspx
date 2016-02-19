<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="../Master Page/travel.master" Language="C#" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="divHeader" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="mainContent" runat="server">

    <!--Main Content-->
    <div id="mainContainer" style="clear: both;">
        <div id="getStarted" style="margin-top: 20px;">
            <h2>Get started with Travel Request System</h2>
            <div class="tilesContainer">
                <div onclick="window.location.href='RequestFormCreate.aspx'" class="tileMedium tileAdd">
                    <div class="tileText">Create new</div>
                </div>
                <div onclick="window.location.href='ToApproveByMe.aspx'" class="tileMedium tileApprove">
                    <div class="tileText">Approve</div>
                </div>
                <%--<div onclick="window.location.href='UserGuide.aspx'" class="tileMedium tileLearn">
                    <div class="tileText">Learn more</div>
                </div>--%>
            </div>
        </div>
        <div style="width: 800px; margin-top: 25px">
            <div class="jtableContainer" id="PendingRequests"></div>
        </div>
    </div>

</asp:Content>

