﻿"use strict";var MySettlements=window.MySettlements||{};MySettlements=function(){var a=function(){var c="";$.ajax({url:appweburl+"/_api/contextinfo",method:"POST",async:false,headers:{Accept:"application/json; odata=verbose"},cache:false,success:function(d){c=d.d.GetContextWebInformation.FormDigestValue},error:function(d,e,f){alert(f)}});return c},b=function(e,d){var g;var i=[RequestStatusEnum.Draft.Value,RequestStatusEnum.PendingApproval.Value,RequestStatusEnum.Rejected.Value,RequestStatusEnum.Approved.Value];var h=getQueryStringParameter("status");if(typeof h=="undefined"||i.indexOf(h)==-1){return}var c="CreatedById eq "+CurrentUser.Id+" and IsSettlement eq true and SettlementStatus eq '"+h+"'";var f=appweburl+"/_vti_bin/ListData.svc/TravelRequests/?$filter="+c+"&$inlinecount=allpages&$select=Id,Created,TripStartDate,TripEndDate,SettlementStatus,SettlementApprover,TripPurpose&$expand=SettlementApprover&$orderby="+d.jtSorting.replace(" DESC"," desc").replace(" ASC"," asc")+"&$skip="+d.jtStartIndex+"&$top="+d.jtPageSize;return $.Deferred(function(j){$.ajax({url:f,type:"GET",headers:{accept:"application/json;odata=verbose"},dataType:"json",data:e,cache:false,success:function(k){g={Result:"OK",Records:k.d.results,TotalRecordCount:k.d.__count};j.resolve(g)},error:function(){j.reject()}})})};return{readMyRequests:b}}();$(document).ready(function(){var c=[RequestStatusEnum.Draft.Value,RequestStatusEnum.PendingApproval.Value,RequestStatusEnum.Rejected.Value,RequestStatusEnum.Approved.Value];var b=getQueryStringParameter("status");if(typeof b=="undefined"||c.indexOf(b)==-1){alert("Bad request ID!");return}var a="Settlements in "+(b==RequestStatusEnum.PendingApproval.Value?"Pending approval":b)+" status";if(b==RequestStatusEnum.Approved.Value){$(function(){$("#PendingRequests").jtable({title:a,paging:true,pageSize:10,sorting:true,multiSorting:true,defaultSorting:"Id desc",messages:{addNewRecord:"Add new request"},actions:{listAction:MySettlements.readMyRequests},fields:{Id:{key:true,create:false,edit:false,list:true,title:"ID",width:"5%",},Created:{title:"Created",width:"10%",display:function(d){var e=moment(d.record.Created);if(e.isValid()){return e.format(commonDateFormat2)}}},TripStartDate:{title:"Trip Start",width:"10%",display:function(d){var e=moment(d.record.TripStartDate);if(e.isValid()){return e.format(commonDateFormat2)}}},TripEndDate:{title:"Trip End",width:"10%",display:function(d){var e=moment(d.record.TripEndDate);if(e.isValid()){return e.format(commonDateFormat2)}}},SettlementStatus:{title:"Status",width:"15%"},SettlementApprover:{title:"Settlement Approver",width:"15%",sorting:false,display:function(d){if(typeof d.record.SettlementApprover!="undefined"&&d.record.SettlementApprover!=null){return d.record.SettlementApprover.Name}}},TripPurpose:{title:"Trip Purpose",width:"35%",sorting:false,},CustomViewAction:{title:"",listClass:"jtable-command-column",sorting:false,width:"1%",display:function(d){return"<button title='View' onclick='location.href=\"SettlementFormView.aspx?requestID="+d.record.Id+"\"' class='jtable-command-button jtable-view-command-button'><span>View</span></button>"}}}});$("#PendingRequests").jtable("load")})}else{$(function(){$("#PendingRequests").jtable({title:a,paging:true,pageSize:10,sorting:true,multiSorting:true,defaultSorting:"Id desc",messages:{addNewRecord:"Add new request"},actions:{listAction:MySettlements.readMyRequests},fields:{Id:{key:true,create:false,edit:false,list:true,title:"ID",width:"5%",},Created:{title:"Created",width:"10%",display:function(d){var e=moment(d.record.Created);if(e.isValid()){return e.format(commonDateFormat2)}}},TripStartDate:{title:"Trip Start",width:"10%",display:function(d){var e=moment(d.record.TripStartDate);if(e.isValid()){return e.format(commonDateFormat2)}}},TripEndDate:{title:"Trip End",width:"10%",display:function(d){var e=moment(d.record.TripEndDate);if(e.isValid()){return e.format(commonDateFormat2)}}},SettlementStatus:{title:"Status",width:"15%"},SettlementApprover:{title:"Settlement Approver",width:"15%",sorting:false,display:function(d){if(typeof d.record.RequestApprover!="undefined"&&d.record.RequestApprover!=null){return d.record.RequestApprover.Name}}},TripPurpose:{title:"Trip Purpose",width:"35%",sorting:false,},CustomViewAction:{title:"",listClass:"jtable-command-column",sorting:false,width:"1%",display:function(d){return"<button title='View' onclick='location.href=\"SettlementFormView.aspx?requestID="+d.record.Id+"\"' class='jtable-command-button jtable-view-command-button'><span>View</span></button>"}},CustomEditAction:{title:"",listClass:"jtable-command-column",sorting:false,width:"1%",display:function(d){return"<button title='Edit' onclick='location.href=\"SettlementFormEdit.aspx?requestID="+d.record.Id+"\"' class='jtable-command-button jtable-edit-command-button'><span>Edit</span></button>"}}}});$("#PendingRequests").jtable("load")})}});