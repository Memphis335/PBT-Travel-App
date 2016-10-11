<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="../Master Page/travel.master" Language="C#" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="divHeader" runat="server">
    <link href="../Content/Fabric-UI/fabric.css" rel="stylesheet" />
</asp:Content>

<asp:Content ContentPlaceHolderID="mainContent" runat="server">
    <div id="containerRight" class="containerRight">
        <div id="topHeader" class="topHeader">
            <h1>Access Denied </h1>
            <br />
            <br />
            <h2>Unfortunately you do not have access to this resource! </h2>
            <br />
            <br />
            <p>Go back to home page <a href="Default.aspx"><i class="ms-Icon ms-Icon--home"></i>PBT Travel</a></p>
            <br />
            <br />
            <img src="../Images/403.png" width="383" height="183" alt="Error 403" class="img-responsive" />
        </div>
    </div>
</asp:Content>
