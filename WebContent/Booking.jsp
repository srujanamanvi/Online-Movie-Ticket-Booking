<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
	<% String showslot=request.getParameter("value");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title></title>
<style type="text/css">
<%@
include file="/../css/mystyle.css"
%>
</style>
</head>
<body>
	This is the booking page
	<br>
		<form action="Payment.jsp">	
	<%
	

out.println("Movie :"+session.getAttribute("movie"));
out.println("<br>");
out.println("Theatre:"+session.getAttribute("theatre"));
out.println("<br>");
String pat = showslot;
String split[] = pat.split("\\$");
out.println("Show Time :"+split[0]);
out.println("<br>");
out.println("Price :"+split[1]);
out.println("<br>");
session.setAttribute("price",split[1]);
session.setAttribute("showtime",split[0]);
%>
	
		<tr>
			<td align="right">No Of Tickets</td>
			<td><select name="ticketCombo" id="ticketCombo">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>

			</select></td>
		</tr>
		<td><input type="Submit" value="Continue"></td>	
	</form>


</body>
</html>