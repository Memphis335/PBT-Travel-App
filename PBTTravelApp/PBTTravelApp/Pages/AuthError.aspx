<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="../Master Page/travel.master" Language="C#" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="divHeader" runat="server">
    <link href="../Content/animate.min.css" rel="stylesheet" />
    <link href="../Content/animate.delay.css" rel="stylesheet" />
    <link href="../Content/jquery.tagsinput.css" rel="stylesheet" />
    <link href="../Content/themes/base/spinner.css" rel="stylesheet" />
    <link href="../Content/jquery.chosen.css" rel="stylesheet" />
    <link href="../Content/fullcalendar.css" rel="stylesheet" />

    <script src="../Scripts/jquery.autogrow-textarea.js"></script>
    <script src="../Scripts/jquery.validate.min.js"></script>
    <script src="../Scripts/jquery.tagsinput.min.js"></script>
    <script src="../Scripts/underscore-min.js"></script>
    <script src="../Scripts/numeral.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="mainContent" runat="server">
    <div id="containerRight" class="containerRight">
        <div id="topHeader" class="topHeader">
            <h1> Authorization error </h1>
            <br /><br />
          <h2> What are the possible causes of this error? </h2>
         <ul>
             <li> You don't have access to this system (please contact with Administrator).</li>
             <li> You are using the wrong application url. Please don't enter this system from the address stored in browser "Favourites" (might change after app update),  use main application link in Sharepoint. </li>
             <li> Your Microsoft Sharepoint Online session has expired - please login again to Sharepoint.</li>
             <li> Your browser has cookies disabled.</li>
         </ul>
        </div>
        </div>    </asp:Content>