<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="../Master Page/travel.master" Language="C#" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="divHeader" runat="server">
    <link href="../Content/Fabric-UI/fabric.css" rel="stylesheet" />
    <link href="../Content/Fabric-UI/fabric.components.css" rel="stylesheet" />
    <link href="../Content/Custom/jQuery-UI-Custom.css" rel="stylesheet" />

    <script src="../Scripts/Custom/ReportsRequestsCosts.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="mainContent" runat="server">
    <div id="containerRight" class="containerRight">
        <div id="topHeader" class="topHeader">
            <h1>Requests Total Costs Report</h1>
        </div>

        <div id="mainContainer" style="clear: both;">
            <form id="filters" class="stdform stdform2" method="post" style="width: 510px;">
                <p>
                    <label>Created between</label>
                    <span class="field" style="margin-left: 160px; text-align: left;">
                        <input id="txtStartDate" type="text" class="input-small" style="font-size: 12px;" />
                        <input id="txtEndDate" type="text" class="input-small" style="font-size: 12px;" />
                    </span>
                </p>
                <p>
                    <label>Status</label>
                    <span class="field" style="margin-left: 160px; text-align: left;">
                        <select id="chblStatus" multiple="multiple" size="3" style="margin: 1px; width: 205px; font-size: 12px;">
                            <option value="Draft">Draft</option>
                            <option value="PendingApproval">Pending approval</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Approved">Approved</option>
                        </select>
                    </span>
                </p>
                <span style="margin-top: 15px; display: block;">
                    <button id="btnRefresh" type="button" class="ms-Button ms-Button--primary"><span class="ms-Button-icon"><i class="ms-Icon ms-Icon--refresh" aria-hidden="true"></i></span><span class="ms-Button-label">Refresh</span></button>
                </span>
            </form>
            <div style="width: 400px; margin-top: 25px">
                <div class="jtableContainer" id="Total"></div>
            </div>
            <div style="width: 400px; margin-top: 25px">
                <div class="jtableContainer" id="TotalByDepartment"></div>
            </div>
            <div style="width: 400px; margin-top: 25px">
                <div class="jtableContainer" id="TotalByProject"></div>
            </div>
            <div style="width: 400px; margin-top: 25px">
                <div class="jtableContainer" id="TotalByCostCenter"></div>
            </div>
        </div>
    </div>
</asp:Content>
