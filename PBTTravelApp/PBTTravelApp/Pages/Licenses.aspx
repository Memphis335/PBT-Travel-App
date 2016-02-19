
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
    <script type="text/javascript" src="../Scripts/Libraries/notify.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/jquery.loadTemplate-1.4.4.min.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/sha3.js"></script>
    

    <!--Custom script-->
    <script type="text/javascript" src="../Scripts/Libraries/jquery.validationEngine.js"></script>
    <script type="text/javascript" src="../Scripts/Libraries/jquery.validationEngine-en.js"></script>
    <link rel="stylesheet" href="../Content/validationEngine.jquery.css" type="text/css" />
    

    <script type="text/javascript" src="../Scripts/Custom/Common.js"></script>   
    <script type="text/javascript" src="../Scripts/Custom/Licenses.js"></script>

    <link rel="stylesheet" href="../Content/Custom/style.css" type="text/css" />

    <title>Licenses</title>
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
            <h1>License </h1>
        </div>

        <div id="mainContainer" style="clear:both;">

             <form id="licenseForm" class="stdform stdform2" method="post" style="display:none;">

                   <div style="margin: 10px;font-size:14px;">

                       <span> Click <a href="http://ivero.net/solutions/TravelRequestSystem/index.html" target="_blank" >here</a> to buy a site license in our Store. </span> <br /><br />
                        
                       <span><b>Enter your Activation Key:</b></span> <br />

                        <p class="control-group" style="border:0px;">
                                <input type="text" name="txtActivationKey" id="txtActivationKey" class="input-xlarge" placeholder="XXXX-XXXX-XXXX-XXXX-XXXX"  style="width:200px;"  /> 
                         </p>
                         
                        <div style="width:100%;height:20px;margin-top:10px;">
                        <button id="btnSubmit" type="submit" class="btn btn-primary">Activate</button>
                        </div>
                    </div>

               </form>


            <div id="validForm" style="display:none;">

                <label style="color:green;font-size:14px;" id="lblMessage"></label> 
                <br />
                <label style="font-weight:bold;font-size:14px;" >Activation Key:</label> <label  style="font-size:14px;" id="lblActivationKey"></label>

            </div>

        </div>

    </div>

   </div>

</body>

</html>
