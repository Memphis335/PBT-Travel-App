
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=10" />

    <link rel="stylesheet" href="../Content/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="../Content/bootstrap-responsive.min.css" type="text/css" />
    <link rel="stylesheet" href="../Content/jquery.ui.css" type="text/css" />
    <link rel="stylesheet" href="../Content/animate.min.css" type="text/css" />
    <link rel="stylesheet" href="../Content/animate.delay.css" type="text/css" />
    <link rel="stylesheet" href="../Content/uniform.tp.css" type="text/css" />
    <link rel="stylesheet" href="../Content/jquery.alerts.css" type="text/css" />
    <link rel="stylesheet" href="../Content/jquery.tagsinput.css" type="text/css" />
    <link rel="stylesheet" href="../Content/ui.spinner.css" type="text/css" />
    <link rel="stylesheet" href="../Content/jquery.chosen.css" type="text/css" />
    <link rel="stylesheet" href="../Content/fullcalendar.css" type="text/css" />
    <link rel="stylesheet" href="../Content/lato.css" type="text/css" />
    <link rel="stylesheet" href="../Content/style.default.css" type="text/css" />
    <link rel="stylesheet" href="../Content/bootstrap-timepicker.min.css" type="text/css" />
    <link rel="stylesheet" href="../Scripts/Libraries/jtable/themes/metro/blue/jtable.css" type="text/css" />

    <link rel="stylesheet" href="../Content/Custom/style.css" type="text/css" />

    <script src="../Scripts/Libraries/jquery-1.10.2.js"></script>
    <script src="../Scripts/Libraries/jquery-ui-1.9.2.min.js"></script>
    <script src="../Scripts/Libraries/jtable/jquery.jtable.min.js"></script>

    <script type="text/javascript" src="../Scripts/Libraries/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/bootstrap-timepicker.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/jquery.validate.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/jquery.tagsinput.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/jquery.autogrow-textarea.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/chosen.jquery.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/jquery.cookie.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/modernizr.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/moment.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/jquery.loadTemplate-1.4.4.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/numeral.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/notify.min.js"></script>

    <!--Custom script-->
    <script type="text/javascript" src="../Scripts/Custom/Common.js"></script>
    <script type="text/javascript" src="../Scripts/Custom/ReportsRequests.js"></script>



    <title>Reports</title>
</head>

<body>

    <!--Header-->
    <div class="divHeader" >
        <div class="divPreviousSite"><img src="../Images/leftarrow.png" /> <a id="previousSiteUrl" href="#" class="previousSiteUrl" >Back to the previous site</a>  </div>
        <div class="divUserInfo"> <span class="spanUserInfo" id="userWelcomeMsg" >  </span></div>
    </div>
    <div class="divHeader divHeaderGray" > </div>
              
    <div class="containerWrapper wrapper1500" >      

     <!--Menu-->
    <div id="containerLeft" style="float:left;width:200px;margin-top:10px; ">   </div>

    <!--Main Content-->
    <div id="containerRight" class="containerRight">


        <div id="topHeader" class="topHeader">
            <h1>Requests Report </h1>
        </div>

        <div id="mainContainer" style="clear: both;">

               <form id="filters" class="stdform stdform2"  method="post" style="width:450px;">

                
                <p>
                    <label >Trip Start between</label>
                    <span class="field" style="margin-left:160px;text-align:left;">
                        <input id="txtStartDate" type="text" class="input-small" style="font-size:12px;"   /> 
                        <input id="txtEndDate" type="text" class="input-small"  style="font-size:12px;" />
                    </span>
                </p>
                <p>
                    <label for="Requester Name">Requester </label>
                    <span class="field" style="margin-left:160px;text-align:left;">
                        <input type="text" id="txtRequesterName" class="input-large" style="width:195px;" />

                    </span>
                </p>
                <p>
                    <label >Status</label>
                    <span class="field" style="margin-left:160px;text-align:left;">
                        <select id="chblStatus" multiple="multiple" size="3" style="margin:1px;padding:0px;width:205px;font-size:12px;">
                                <option value="Draft">Draft</option>
                                <option value="PendingApproval">Pending approval</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Approved">Approved</option>
                            </select>

                    </span>
                </p>
                <p>
                    <label >Department</label>
                    <span class="field" style="margin-left:160px;text-align:left;">
                        <select id="chblDepartment" multiple="multiple" size="3" style="margin:1px;padding:0px;width:205px;font-size:12px;">
                            </select>
                    </span>
                </p>
                <p>
                    <label >Project</label>
                    <span class="field" style="margin-left:160px;text-align:left;">
                        <select id="chblProject" multiple="multiple" size="3" style="margin:1px;padding:0px;width:205px;font-size:12px;">
                            </select>
                    </span>
                </p>
            
                <p>
                    <label >Cost Center</label>
                    <span class="field" style="margin-left:160px;text-align:left;">
                        <select id="chblCostCenter" multiple="multiple" size="3" style="margin:1px;padding:0px;width:205px;font-size:12px;">
                            </select>
                    </span>
                </p>

                 <p>
                    <label >Without settlement</label>
                    <span class="field" style="margin-left:160px;text-align:left;">
                        <input id="chbWithoutSettlement" type="checkbox"  />
                    </span>
                </p>

               
                <span style="margin-top:15px;display:block;">
                    <button id="btnRefresh" type="button" class="btn btn-primary">Refresh data</button>   
                    <a id="btnExport" href="#" class="btn">Export to CSV(Summary)</a>     
                    <a id="btnExportExpenses" href="#" class="btn">Export to CSV(Expenses)</a>     
                </span>

            </form>


            <div style="width: 1200px; width:1200px; margin-top: 25px">
                <div class="jtableContainer" id="TableRequests"></div>
            </div>


        </div>

    </div>
    
   </div>
<iframe id="csvDownloadFrame" style="display:none" ></iframe>
</body>

</html>
