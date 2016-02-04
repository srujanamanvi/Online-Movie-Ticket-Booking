<%@page import="java.sql.*"%>
<%@page import="oracle.jdbc.driver.*"%>
<%@page import="oracle.sql.*"%>
<%@ page import="utility.Movies"%>
<%@ page import="java.util.*"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<style type="text/css">
<%@
include file="/../css/mystyle.css"
%>
</style>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title h"WebContent/EditDetails.jsp"ere</title>
</head>
<body>
Edit Information
 <% Movies mov = new Movies();
LinkedList<String> ls =mov.getUserInformation(session.getAttribute("userid").toString());

String date1=ls.get(4).replaceAll("0:0:0", "");
String split[]=date1.split("/");
String date=split[2];
String month= split[1];
String year=split[0];
String fin =month+"/"+date+"/"+year;
session.setAttribute("dd",fin);

%> 


</body>

<div align="center">
 <form action="EditRes.jsp" method="POST">
 <h1>Edit Details</h1>
  <tr> Phone Number: <input type="text" id="" name="phone" value=<%=ls.get(0)%>></tr>
  <tr> Email: <input type="text" id="" name="email" value=<%=ls.get(1)%>></tr>
   <tr> Name On Card : <input type="text" id="" name="cname"  value=<%=ls.get(3)%>></tr>
      <tr> Card Number : <input type="text" id="" name="cnum"  value=<%=ls.get(2)%>></tr>
      <tr> Expiry Date (MM/DD/YYYY): <input type="text" id="" name="expdate" value=<%=session.getAttribute("dd").toString()%>></tr>
      <tr> Card Type: <input type="text" id="" name="ctype" value=<%=ls.get(5)%>></tr>
      
      <br><%session.getAttribute("userid").toString(); %><br>
      
        <input type="hidden"  name="userid" value="<%session.getAttribute("userid").toString(); %>" />
       <input type="submit" value="Submit" />
       
    </form>
</div>
</html>