<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*"%>
<%@ page import="utility.Theatre"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Movie Search</title>
</head>
<link rel="stylesheet" type="text/css" href="bms.css">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>MovieSearch</title>
<style type="text/css">
<%@
include file="/../css/mystyle.css"
%>
</style>
</head>
<body>
<td>Theatres Showing
<form method="post">
<%
try{
	String city=session.getAttribute("City").toString();
out.println("<br>");
Theatre mov = new Theatre();
LinkedList<String> ls=mov.getTheatresInCity(city);
for(int i=0;i<ls.size();i++){
out.print("<input type=\"submit\" name =\"theatreName\" value=\""+ls.get(i)+"\" onclick=\"javascript: form.action='Theatre.jsp';\"/>");
out.println("<br>");
out.println("<br>");
out.println("<br>");
}


}catch(Exception Ex){
System.out.println("exception in getting connection"+Ex.getMessage());
}
%>
</form>
</td>
</body>
</html>