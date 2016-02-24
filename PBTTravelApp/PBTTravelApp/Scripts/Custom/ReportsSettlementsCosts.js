﻿"use strict";var ReportsSettlementsCosts=window.ReportsSettlementsCosts||{};var data;Number.prototype.round=function(a){return +(Math.round(this+"e+"+a)+"e-"+a)};ReportsSettlementsCosts=function(){var a=function(e,c){var f="";if(e!=null){for(var d=0;d<e.length;d++){f+=c+" eq '"+e[d]+"' ";if(d<e.length-1){f+=" or "}}}return f},b=function(){var g;var h=$("#txtStartDate").val();var d=$("#txtEndDate").val();if(moment(h).isValid()==false||moment(d).isValid()==false){addMessage("Incorrect date format in date filter","error");return $.Deferred(function(j){})}var c=" and (TripStartDate ge datetime'"+h+"T00%3a00%3a00') and (TripStartDate le datetime'"+d+"T00%3a00%3a00') ";var i=" ";if($("#chblStatus").val()!=null){i=" and ("+a($("#chblStatus").val(),"RequestStatus")+") "}var e="Department ne null and Project ne null and CostCenter ne null and IsSettlement eq true  "+c+i;var f=appweburl+"/_vti_bin/ListData.svc/TravelRequests/?$filter="+e+"&$inlinecount=allpages&$select=Department,Project,CostCenter,SettlementTotalCost";$.ajax({url:f,type:"GET",async:false,cache:false,headers:{accept:"application/json;odata=verbose"},dataType:"json",success:function(j){g=j.d.results},error:function(j,k,l){alert(l)}});return g};return{readReportsRequests:b}}();$(document).ready(function(){if(CurrentUser.IsAdmin==false){location.href="AccessDenied.aspx";return}$("#btnRefresh").click(function(f){f.preventDefault();data=ReportsSettlementsCosts.readReportsRequests();$("#Total").jtable("reload");$("#TotalByProject").jtable("reload");$("#TotalByDepartment").jtable("reload");$("#TotalByCostCenter").jtable("reload")});$("#txtStartDate").datepicker();$("#txtEndDate").datepicker();$.datepicker.setDefaults({dateFormat:commonDateFormat,showButtonPanel:false,changeMonth:false,changeYear:false,});var a=new Date(new Date().getTime()+24*60*60*1000);var c=a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1;var b=a.getDate()<10?"0"+a.getDate():a.getDate();var d=a.getFullYear();$("#txtStartDate").val(d+"-01-01");$("#txtEndDate").val(d+"-"+c+"-"+b);data=ReportsSettlementsCosts.readReportsRequests();$(function(){$("#Total").jtable({title:"Total Amount",paging:false,sorting:false,actions:{listAction:function(f,e){var h=_.reduce(data,function(i,j){return i+parseFloat(j.SettlementTotalCost.replace(/,/g,""))},0);var g={records:[{val:h.round(2)}]};return{Result:"OK",Records:g.records}}},fields:{val:{title:"Total Amount ("+SystemSettings.DefaultCurrencyName+")",width:"50%",display:function(e){return numeral(e.record.val).format("0,0.00")}}}});$("#Total").jtable("load")});$(function(){$("#TotalByDepartment").jtable({title:"Total Amount by Department",paging:false,sorting:false,defaultSorting:"SettlementTotalCost desc",actions:{listAction:function(h,f){var e=_(data).groupBy("Department");var g=_(e).map(function(i,j){return{Department:j,val:_(i).reduce(function(k,l){return k+parseFloat(l.SettlementTotalCost.replace(/,/g,""))},0)}});return{Result:"OK",Records:g}}},fields:{Department:{title:"Department",width:"50%",},val:{title:"Total Amount ("+SystemSettings.DefaultCurrencyName+")",width:"50%",display:function(e){return numeral(e.record.val).format("0,0.00")}}}});$("#TotalByDepartment").jtable("load")});$(function(){$("#TotalByProject").jtable({title:"Total Amount by Project",paging:false,sorting:false,defaultSorting:"SettlementTotalCost desc",actions:{listAction:function(h,f){var e=_(data).groupBy("Project");var g=_(e).map(function(i,j){return{Project:j,val:_(i).reduce(function(k,l){return k+parseFloat(l.SettlementTotalCost.replace(/,/g,""))},0)}});return{Result:"OK",Records:g}}},fields:{Project:{title:"Project",width:"50%",},val:{title:"Total Amount ("+SystemSettings.DefaultCurrencyName+")",width:"50%",display:function(e){return numeral(e.record.val).format("0,0.00")}}}});$("#TotalByProject").jtable("load")});$(function(){$("#TotalByCostCenter").jtable({title:"Total Amount by Cost Center",paging:false,sorting:false,defaultSorting:"SettlementTotalCost desc",actions:{listAction:function(h,f){var e=_(data).groupBy("CostCenter");var g=_(e).map(function(i,j){return{CostCenter:j,val:_(i).reduce(function(k,l){return k+parseFloat(l.SettlementTotalCost.replace(/,/g,""))},0)}});return{Result:"OK",Records:g}}},fields:{CostCenter:{title:"Cost Center",width:"50%",},val:{title:"Total Amount ("+SystemSettings.DefaultCurrencyName+")",width:"50%",display:function(e){return numeral(e.record.val).format("0,0.00")}}}});$("#TotalByCostCenter").jtable("load")})});