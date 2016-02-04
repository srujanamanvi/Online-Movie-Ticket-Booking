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
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>EditRegistration</title>
<style type="text/css">
<%@
include file="/../css/mystyle.css"
%>
</style>
</head>
<body>

<%Movies mov = new Movies();
String uid = session.getAttribute("userid").toString();
String phone=request.getParameter("phone");
String email=request.getParameter("email");
String cname=request.getParameter("cname");
String cnum=request.getParameter("cnum");
String expdate=request.getParameter("expdate");
String ctype=request.getParameter("ctype");


mov.UpdateUserInfo(uid, phone, email);
mov.UpdateCard(uid, cname, cnum, expdate, ctype);

%>

<div align="center">
<form action="Home.jsp"%>
<h1>Submitted Info Click to return to home Page </h1>
<input type="submit" value="Submit" class="customButton" />
</form>
</div>

</body>
</html>