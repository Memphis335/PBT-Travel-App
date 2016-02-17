
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=10" />

    <link rel="stylesheet" href="../Content/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="../Content/bootstrap-responsive.min.css" type="text/css" />
    <link rel="stylesheet" href="../Content/uniform.tp.css" type="text/css" />
    <link rel="stylesheet" href="../Content/jquery.alerts.css" type="text/css" />
    <link rel="stylesheet" href="../Content/jquery.tagsinput.css" type="text/css" />
    <link rel="stylesheet" href="../Content/jquery.chosen.css" type="text/css" />
    <link rel="stylesheet" href="../Content/fullcalendar.css" type="text/css" />
    <link rel="stylesheet" href="../Content/lato.css" type="text/css" />
    <link rel="stylesheet" href="../Content/style.default.css" type="text/css" />
    <link rel="stylesheet" href="../Content/bootstrap-timepicker.min.css" type="text/css" />
    <link rel="stylesheet" href="../Content/themes/base/jquery-ui.css" rel="stylesheet" />
    
    <link rel="stylesheet" href="../Scripts/Libraries/jtable/themes/metro/blue/jquery-ui.css" type="text/css" />
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

    <!--Custom script-->
    <script type="text/javascript" src="../Scripts/Custom/Common.js"></script>
    <script type="text/javascript" src="../Scripts/Custom/MySettlements.js"></script>



    <title>My Settlements</title>
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
            <h1>My Settlements</h1>
        </div>

        <div id="mainContainer" style="clear: both;">


            <div style="width: 900px; width:900px; margin-top: 25px">
                <div class="jtableContainer" id="PendingRequests"></div>
            </div>

        </div>

    </div>

   </div>

</body>

</html>
