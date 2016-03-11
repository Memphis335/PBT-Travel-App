<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="../Master Page/travel.master" Language="C#" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="divHeader" runat="server">
    <link href="../Content/Custom/jQuery-UI-Custom.css" rel="stylesheet" />
</asp:Content>

<asp:Content ContentPlaceHolderID="mainContent" runat="server">
    <div id="containerRight" class="containerRight">
        <div id="topHeader" class="topHeader">
            <h1>Reports </h1>
        </div>
        <div id="mainContainer" style="clear: both;">
            <p style="margin: 10px; font-size: 16px;"><a href="ReportsRequests.aspx">All requests report »</a> </> </p>
            <p style="margin: 10px; font-size: 16px;"><a href="ReportsSettlements.aspx">All settlements report »</a>  </p>
            <p style="margin: 10px; font-size: 16px;"><a href="ReportsRequestsCosts.aspx">Requests total costs report »</a> </p>
            <p style="margin: 10px; font-size: 16px;"><a href="ReportsSettlementsCosts.aspx">Settlements total costs report »</a> </p>
        </div>
    </div>
</asp:Content>
