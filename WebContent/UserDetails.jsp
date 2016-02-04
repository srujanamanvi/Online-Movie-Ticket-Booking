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
<title>User Information</title>
<style type="text/css">
<%@
include file="/../css/mystyle.css"
%>
</style>
</head>
<body>
<%
Movies mov = new Movies();
LinkedList<String> ls =mov.getUserInformation(session.getAttribute("userid").toString());
String s = session.getAttribute("username").toString();
	out.println("<tr>Username :"+s+"</tr><br>");
	out.println("<tr>Phone Number :"+ls.get(0)+"</tr><br>");
	out.println("<tr>Email Id :"+ls.get(1)+"</tr><br>");
	out.println("<tr>Card Details : </tr>");
	out.println("<tr>Name On Card :"+ls.get(3)+"</tr><br>");
	out.println("<tr>Card Number: "+ls.get(2)+"</tr><br>");
	out.println("<tr>Expiry Date: "+ls.get(4)+"</tr><br>");
	out.println("<tr>Card Type: "+ls.get(5)+"</tr><br>");
out.println("<form action=\"EditDetails.jsp\"><input type=\"submit\" name=\"EditUser\" value=\"Edit\"></form>");
	out.println("<tr>MemberShip Details: </tr><br>");
	out.println("<tr>Membership Type: "+ls.get(6)+"</tr><br>");
	out.println("<tr>Points: "+ls.get(7)+"</tr><br>");
	
%>
</body>
</html>