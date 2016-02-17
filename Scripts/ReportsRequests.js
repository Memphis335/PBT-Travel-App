﻿"use strict";var ReportsRequests=window.ReportsRequests||{};ReportsRequests=function(){var d=function(){var g="";$.ajax({url:appweburl+"/_api/contextinfo",method:"POST",async:false,headers:{Accept:"application/json; odata=verbose"},cache:false,success:function(h){g=h.d.GetContextWebInformation.FormDigestValue},error:function(h,i,j){alert(j)}});return g},f=function(j,g){var k="";if(j!=null){for(var h=0;h<j.length;h++){k+=g+" eq '"+j[h]+"' ";if(h<j.length-1){k+=" or "}}}return k},b=function(h){var g;$.ajax({url:appweburl+"/_vti_bin/ListData.svc/"+h+"/?$select=Name&$inlinecount=allpages",type:"GET",async:false,headers:{accept:"application/json;odata=verbose"},dataType:"json",cache:false,success:function(i){g=i.d.results},error:function(k,i,j){alert(j)}});return g},a=function(h){var g=d();var i;return $.Deferred(function(j){$.ajax({url:appweburl+"/_api/Web/lists/getbytitle('TravelRequests')/getItemByStringId('"+h+"')",async:true,type:"DELETE",headers:{accept:"application/json;odata=verbose","X-RequestDigest":g,"IF-MATCH":"*"},success:function(k){i={Result:"OK"};j.resolve(i)},error:function(m,k,l){j.reject()}})})},c=function(){var p=$("#txtStartDate").val().StripTags();var j=$("#txtEndDate").val().StripTags();if(moment(p).isValid()==false||moment(j).isValid()==false){addMessage("Incorrect date format in date filter","error");return $.Deferred(function(s){})}var h=" (Created ge datetime'"+p+"T00%3a00%3a00') and (Created le datetime'"+j+"T00%3a00%3a00') ";var o="";if($.trim($("#txtRequesterName").val()).length>0){o=" and substringof('"+$("#txtRequesterName").val().StripTags()+"',RequesterName) "}var q=" ";if($("#chblStatus").val()!=null){q=" and ("+f($("#chblStatus").val(),"RequestStatus")+") "}var i=" ";if($("#chblDepartment").val()!=null){i=" and ("+f($("#chblDepartment").val(),"Department")+") "}var l=" ";if($("#chblProject").val()!=null){l=" and ("+f($("#chblProject").val(),"Project")+") "}var g=" ";if($("#chblCostCenter").val()!=null){g=" and ("+f($("#chblCostCenter").val(),"CostCenter")+") "}var r="";if($("#chbWithoutSettlement").prop("checked")){r=" and IsSettlement eq false "}var k=h+o+q+i+l+g+r;var m=appweburl+"/_vti_bin/ListData.svc/TravelRequests/?$filter="+k+"&$inlinecount=allpages&$select=Id,RequesterName,Created,TripStartDate,TripEndDate,RequestStatus,TripPurpose, Department, Project, CostCenter, RequestTotalCost,TravelExpensesJSON";var n;$.ajax({url:m,type:"GET",headers:{accept:"application/json;odata=verbose"},dataType:"json",cache:false,async:false,success:function(s){n=s.d.results},error:function(u,s,t){alert(t)}});return n},e=function(m,l){var q;var r=$("#txtStartDate").val().StripTags();var j=$("#txtEndDate").val().StripTags();if(moment(r).isValid()==false||moment(j).isValid()==false){addMessage("Incorrect date format in date filter","error");return $.Deferred(function(u){})}var h=" (Created ge datetime'"+r+"T00%3a00%3a00') and (Created le datetime'"+j+"T00%3a00%3a00') ";var p="";if($.trim($("#txtRequesterName").val()).length>0){p=" and substringof('"+$("#txtRequesterName").val().StripTags()+"',RequesterName) "}var s=" ";if($("#chblStatus").val()!=null){s=" and ("+f($("#chblStatus").val(),"RequestStatus")+") "}var i=" ";if($("#chblDepartment").val()!=null){i=" and ("+f($("#chblDepartment").val(),"Department")+") "}var n=" ";if($("#chblProject").val()!=null){n=" and ("+f($("#chblProject").val(),"Project")+") "}var g=" ";if($("#chblCostCenter").val()!=null){g=" and ("+f($("#chblCostCenter").val(),"CostCenter")+") "}var t="";if($("#chbWithoutSettlement").prop("checked")){t=" and IsSettlement eq false "}var k=h+p+s+i+n+g+t;var o=appweburl+"/_vti_bin/ListData.svc/TravelRequests/?$filter="+k+"&$inlinecount=allpages&$select=Id,RequesterName,Created,TripStartDate,TripEndDate,RequestStatus,TripPurpose, Department, Project, CostCenter, RequestTotalCost&$orderby="+l.jtSorting.replace(" DESC"," desc").replace(" ASC"," asc")+"&$skip="+l.jtStartIndex+"&$top="+l.jtPageSize;return $.Deferred(function(u){$.ajax({url:o,type:"GET",headers:{accept:"application/json;odata=verbose"},dataType:"json",data:m,cache:false,success:function(v){q={Result:"OK",Records:v.d.results,TotalRecordCount:v.d.__count};u.resolve(q)},error:function(){u.reject()}})})};return{getExportData:c,getRequests:e,getDictionary:b,deleteItem:a}}();$(document).ready(function(){if(CurrentUser.IsAdmin==false){location.href="AccessDenied.aspx";return}$("#btnRefresh").click(function(l){l.preventDefault();$("#TableRequests").jtable("reload")});$("#txtStartDate").datepicker();$("#txtEndDate").datepicker();$.datepicker.setDefaults({dateFormat:commonDateFormat,showButtonPanel:false,changeMonth:false,changeYear:false,});var a=new Date(new Date().getTime()+24*60*60*1000);var i=a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1;var b=a.getDate()<10?"0"+a.getDate():a.getDate();var k=a.getFullYear();$("#txtStartDate").val(k+"-01-01");$("#txtEndDate").val(k+"-"+i+"-"+b);var g=ReportsRequests.getDictionary("DictDepartments");var d=$("#chblDepartment");$.each(g,function(){d.append($("<option>",{value:this.Name,text:this.Name}))});var h=ReportsRequests.getDictionary("DictProjects");var e=$("#chblProject");$.each(h,function(){e.append($("<option>",{value:this.Name,text:this.Name}))});var f=ReportsRequests.getDictionary("DictCostCenters");var c=$("#chblCostCenter");$.each(f,function(){c.append($("<option>",{value:this.Name,text:this.Name}))});var j=function(){var m=navigator.appName==="Microsoft Internet Explorer";var l=!!navigator.userAgent.match(/Trident\/7\./);return !(m||l)};$("#btnExport").click(function(p){var l='","';var r='"\r\n';var m='"Id","Created","Start Date","End Date","Request Status","Requester Name","Trip Purpose","Department","Project","Cost Center","Total Cost'+r;var o=ReportsRequests.getExportData();$.each(o,function(){m+='"'+this.Id+l+moment(this.Created).format(commonDateFormat2)+l+moment(this.TripStartDate).format(commonDateFormat2)+l+moment(this.TripEndDate).format(commonDateFormat2)+l+this.RequestStatus+l+this.RequesterName+l+this.TripPurpose+l+this.Department+l+this.Project+l+this.CostCenter+l+this.RequestTotalCost+r});if(!j()){n=decodeURIComponent(m);var q=document.getElementById("csvDownloadFrame");q=q.contentWindow||q.contentDocument;q.document.open("text/csv","replace");q.document.write(n);q.document.close();q.focus();q.document.execCommand("SaveAs",true,"export-summary.csv")}else{var n="data:application/csv;charset=utf-8,"+encodeURIComponent(m);$(this).attr({download:"export.csv",href:n,target:"_blank"})}});$("#btnExportExpenses").click(function(p){var l='","';var r='"\r\n';var m='"Id","Requester Name","Project","Department","Cost Center","Expense Date","Description","Category","Payment Source","Currency","Exchange Rate","Currency Amount'+r;var o=ReportsRequests.getExportData();$.each(o,function(){var w=this.Id;var x=this.RequesterName;var v=this.Project;var t=this.Department;var s=this.CostCenter;var u=$.parseJSON(this.TravelExpensesJSON);$.each(u,function(){if(this.ExpenseDate!=null||this.CurrencyAmount!=null){m+='"'+w+l+x+l+v+l+t+l+s+l+(this.ExpenseDate!=null?this.ExpenseDate:"")+l+(this.Description!=null?this.Description:"")+l+(this.Category!=null?this.Category:"")+l+(this.PaymentSource!=null?this.PaymentSource:"")+l+(this.Currency!=null?this.Currency:"")+l+(this.ExchangeRate!=null?this.ExchangeRate:"")+l+(this.CurrencyAmount!=null?this.CurrencyAmount:"")+r}})});if(!j()){n=decodeURIComponent(m);var q=document.getElementById("csvDownloadFrame");q=q.contentWindow||q.contentDocument;q.document.open("text/csv","replace");q.document.write(n);q.document.close();q.focus();q.document.execCommand("SaveAs",true,"export-expenses.csv")}else{var n="data:application/csv;charset=utf-8,"+encodeURIComponent(m);$(this).attr({download:"export.csv",href:n,target:"_blank"})}});$(function(){$("#TableRequests").jtable({title:"Requests list",paging:true,pageSize:10,sorting:true,multiSorting:true,defaultSorting:"Id desc",actions:{listAction:ReportsRequests.getRequests,deleteAction:function(l){return ReportsRequests.deleteItem(l.Id);$("#TableRequests").jtable("reload")}},fields:{Id:{key:true,create:false,edit:false,list:true,title:"ID",width:"3%",},Created:{title:"Created",width:"7%",display:function(l){var m=moment(l.record.Created);if(m.isValid()){return m.format(commonDateFormat2)}}},TripStartDate:{title:"Trip Start",width:"7%",display:function(l){var m=moment(l.record.TripStartDate);if(m.isValid()){return m.format(commonDateFormat2)}}},TripEndDate:{title:"Trip End",width:"7%",display:function(l){var m=moment(l.record.TripEndDate);if(m.isValid()){return m.format(commonDateFormat2)}}},RequestStatus:{title:"Status",width:"10%"},RequesterName:{title:"Requester Name",width:"15%"},Department:{title:"Department",width:"10%",sorting:true,},Project:{title:"Project",width:"10%",sorting:true,},CostCenter:{title:"CostCenter",width:"10%",sorting:true,},RequestTotalCost:{title:"Total Cost ("+SystemSettings.DefaultCurrencyName+")",width:"10%",sorting:false},CustomViewAction:{title:"",listClass:"jtable-command-column",sorting:false,width:"1%",display:function(l){return"<button title='View' onclick='location.href=\"RequestFormView.aspx?requestID="+l.record.Id+"\"' class='jtable-command-button jtable-view-command-button'><span>View</span></button>"}},CustomEditAction:{title:"",listClass:"jtable-command-column",sorting:false,width:"1%",display:function(l){return"<button title='Edit' onclick='location.href=\"RequestFormEdit.aspx?requestID="+l.record.Id+"\"' class='jtable-command-button jtable-edit-command-button'><span>Edit</span></button>"}}}});$("#TableRequests").jtable("load")})});