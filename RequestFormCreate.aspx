
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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



    <script src="../Scripts/Libraries/jquery-1.10.2.js"></script>
    <script src="../Scripts/Libraries/jquery-ui-1.9.2.min.js"></script>

    <script type="text/javascript" src="../Scripts/Libraries/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/bootstrap-timepicker.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/jquery.validate.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/jquery.tagsinput.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/jquery.autogrow-textarea.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/chosen.jquery.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/jquery.cookie.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/modernizr.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/elements.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/prettify/prettify.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/moment.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/notify.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/jquery.loadTemplate-1.4.4.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/jquery.MultiFile.min.js"></script>

    <!--Custom script-->
    <script type="text/javascript" src="../Scripts/Custom/Common.js"></script>
    <script type="text/javascript" src="../Scripts/Custom/RequestFormCreate.js"></script>

    <script src="../Scripts/Libraries/jquery.handsontable.full.js"></script>
    <link rel="stylesheet" media="screen" href="../Content/jquery.handsontable.full.css" />
    <link rel="stylesheet" href="../Content/jquery.handsontable.bootstrap.css" type="text/css" />
    <link rel="stylesheet" href="../Content/Custom/style.css" type="text/css" />

    <title>Create new request</title>
</head>

<body>
    <!--Header-->
     <div class="divHeader" >
        <div class="divPreviousSite"><img src="../Images/leftarrow.png" /> <a id="previousSiteUrl" href="#" class="previousSiteUrl" >Back to the previous site</a>  </div>
        <div class="divUserInfo"> <span class="spanUserInfo" id="userWelcomeMsg" >  </span></div>
    </div>
    <div class="divHeader divHeaderGray" > </div>

    <div class="containerWrapper" >      
              
    <!--Menu-->
    <div id="containerLeft" style="float:left;width:200px;margin-top:10px; ">   </div>

    <!--Main Content-->
    <div id="containerRight" class="containerRight">

        <div id="topHeader" class="topHeader">
            <h1>Create New Request </h1>
        </div>

        <div id="mainContainer" style="clear:both;">

            <div class="maincontent">

                <form id="requestFormCreate" class="stdform stdform2"  method="post" >

                    <div style="margin:10px;">

                        <button id="btnSubmit" type="submit" class="btn btn-primary">Save changes</button>
                        <button id="btnCancel" type="button" class="btn">Cancel</button>

                        <div id="divValidationSummary" style="margin:5px;display:none;">
                            <label id="lblValidationSummary" class="error">Please fix the validation errors</label>
                        </div>

                    </div>


                    <div class="tabbedwidget tab-primary" id="formTabs">
                        <ul id="tabs">
                            <li><a href="#aPersonalInfo">Personal Info</a></li>
                            <li><a href="#aApprovals">Approvals</a></li>
                            <li><a href="#aTravelInfo">Travel Info</a></li>
                            <li><a href="#aTravelExpenses">Travel Expenses</a></li>
                            <li><a href="#aAttachments">Attachments</a></li>
                        </ul>
                        <div id="aPersonalInfo">

                            <p class="control-group">
                                <label for="Requester Name">Requester Name </label>
                                <span class="field"><input type="text" name="txtRequesterName" id="txtRequesterName" class="input-xlarge" /></span>
                            </p>

                            <p class="control-group">
                                <label for="txtEmail">Email</label>
                                <span class="field"><input type="text" name="txtEmail" id="txtEmail" class="input-xlarge" /></span>
                            </p>


                            <p>
                                <label>Employee ID</label>
                                <span class="field"><input type="text" name="txtEmployeeID" id="txtEmployeeID" class="input-xlarge" /></span>
                            </p>

                            <p>
                                <label>Phone number</label>
                                <span class="field"><input type="text" name="txtPhoneNumber" id="txtPhoneNumber" class="input-xlarge" /></span>
                            </p>

                            <p>
                                <label>Department</label>
                                <span class="field">
                                    <select name="ddlDepartment" id="ddlDepartment" class="uniformselect">
                                        <option value="">Choose One</option>

                                    </select>
                                </span>
                            </p>

                            <p>
                                <label>Project</label>
                                <span class="field">
                                    <select name="ddlProject" id="ddlProject" class="uniformselect">
                                        <option value="">Choose One</option>

                                    </select>
                                </span>
                            </p>
                            <p>
                                <label>Cost Center</label>
                                <span class="field">
                                    <select name="ddlCostCenter" id="ddlCostCenter" class="uniformselect">
                                        <option value="">Choose One</option>

                                    </select>
                                </span>
                            </p>


                        </div>

                        
                        <div id="aApprovals" style="height:200px;">
                           <p>
                                <label>Request Approver</label>
                                <span class="field">
                                    <select name="ddlRequestApprover" id="ddlRequestApprover" data-placeholder="Choose a Employee..." style="margin-right:10px; width: 270px;" class="chzn-select" tabindex="2">
                                        <option value=""></option>
                                    </select>
                                </span>
                            </p>

                        </div>


                        <div id="aTravelInfo">

                            <p class="control-group">
                                <label for="txtStartDate">Start Date</label>
                                <span class="field"><input id="txtTripStartDate" type="text" name="txtTripStartDate" class="input-xlarge" /></span>
                            </p>


                            <p class="control-group">
                                <label for="txtEndDate">End Date</label>
                                <span class="field"><input id="txtTripEndDate" type="text" name="txtTripEndDate" class="input-xlarge" /></span>
                            </p>

                            <p class="control-group">
                                <label for="txtPurpose">Purpose</label>
                                <span class="field"><input id="txtTripPurpose" type="text" name="txtTripPurpose" class="input-xlarge" /></span>
                            </p>
                            <p>
                                <label>Notices</label>
                                <span class="field"><textarea cols="80" rows="3" id="taNotices" class="standardTextArea"></textarea></span>
                            </p>

                             <p class="control-group">
                                 <span style="display:block;clear:both;">
                                    <input id="txtDestinations" name="txtDestinations" type="text"  style="display:none;" />
                                </span>

                                <label>Travel Destinations</label>
                                <div id="divDestinations" style="clear:both;overflow:auto;padding-top:15px;"></div>
                            </p>

                        </div>


                        <div id="aTravelExpenses">

                            <p class="control-group">
                                <span style="display:block;clear:both;">
                                    <input id="txtTravelExpenses" name="txtTravelExpenses" type="text"  style="display:none;" />
                                </span>

                                <label style="width:100%;" id="lblTotal"></label>

                                <div id="divTravelExpenses" style="clear:both;overflow:auto;padding-top:15px;"></div>

                                <label style="font-size:11px; font-weight:normal; border:0px; cursor:auto;" >Notice: use dot (.) as decimal separator</label>

                            </p>

                        </div>
                         <div id="aAttachments">

                            <input type="file"  id="fileUpload" />

                        </div>


                    </div><!--tabbedwidget-->
                </form>




            </div>

        </div>
    </div>
    
    </div>

<input type="hidden" id="hdnRequestTotalCost" />

</body>

</html>
