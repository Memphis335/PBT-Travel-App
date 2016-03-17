<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <title></title>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=10" />
    <link rel="stylesheet" href="../Content/Custom/PrintForm.css" type="text/css" />

    <script type="text/javascript" src="../Scripts/jquery-2.2.0.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.cookie.js"></script>
    <script type="text/javascript" src="../Scripts/numeral.js"></script>
    <script type="text/javascript" src="../Scripts/moment.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.loadTemplate-1.4.4.min.js"></script>
    <script type="text/javascript" src="../Scripts/Custom/Common.js"></script>
    <script type="text/javascript" src="../Scripts/Custom/PrintForm.js"></script>

</head>

<body class="printBody ">

    <span style="font-size: 16pt;" id="lblCompanyName"></span>
    <br />
    <br />

    <span style="font-size: 20pt;" id="lblTitle">T</span>

    <div id="printForm">
        <div class="informationBox">
            <h2>Travel Information</h2>
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td class="header small">Requester Name: </td>
                    <td class="large"><span id="lblRequesterName"></span></td>
                    <td class="header small">Request ID:  </td>
                    <td class="large"><span id="lblRequestID"></span></td>

                </tr>
                <tr>
                    <td class="header">Requester Email: </td>
                    <td><span id="lblEmail"></span></td>
                    <td class="header">Created Date: </td>
                    <td><span id="lblCreatedDate"></span></td>

                </tr>
                <tr>
                    <td class="header">ID / Passport: </td>
                    <td><span id="lblEmployeeID"></span></td>
                    <td class="header">Approver: </td>
                    <td><span id="lblRequestApprover"></span></td>

                </tr>
                <tr>
                    <td class="header">Phone Number: </td>
                    <td><span id="lblPhoneNumber"></span></td>
                    <td class="header">Departure Date: </td>
                    <td><span id="lblTripStartDate"></span></td>
                </tr>
                <tr>
                    <td class="header">Frequent-flyer Program:  </td>
                    <td><span id="lblFFP"></span></td>
                    <td class="header">Return Date:  </td>
                    <td><span id="lblTripEndDate"></span></td>
                </tr>
                <tr>
                    <td class="header">Frequent-flyer Program Number:  </td>
                    <td><span id="lblFFPN"></span></td>
                    <td class="header">Trip Purpose: </td>
                    <td><span id="lblTripPurpose"></span></td>
                </tr>
                <tr>
                    <td class="header">Project: </td>
                    <td><span id="lblProject"></span></td>
                    <td class="header">Deliverable:  </td>
                    <td><span id="lblNotices"></span></td>
                </tr>
                <tr>
                    <td class="header">Personal Requests: </td>
                    <td><span id="lblPerRequests"></span></td>
                    <td class="header">  </td>
                    <td><span></span></td>
                </tr>
            </table>
        </div>
        <div class="informationBox">
            <h2>Travel Destinations</h2>

            <table cellpadding="0" cellspacing="0" id="tTravelDestinations">
                <tr>
                    <th class="header" style="width: 11%">Country </th>
                    <th class="header" style="width: 12%">City</th>
                    <th class="header" style="width: 20%">Accommodation Required</th>
                    <th class="header" style="width: 15%">Rental Car Required</th>
                    <th class="header" style="width: 15%">Airport Transfers</th>
                    <th class="header" style="width: 11%">Start Date</th>
                    <th class="header" style="width: 11%">End Date</th>
                </tr>
            </table>
        </div>
        <div style="float: right; margin-right: 100px; margin-top: 30px; text-align: center;">
            ___________________________
            <br />
            Requester's Signature
        </div>
    </div>
    <script type="text/javascript">
        window.print();
    </script>
</body>
</html>
