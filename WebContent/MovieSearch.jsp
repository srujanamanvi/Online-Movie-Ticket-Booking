<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*"%>
<%@ page import="utility.Movies"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<style type="text/css">
<%@
include file="/../css/mystyle.css"
%>
</style>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Movie Search</title>
</head>
<body>
<div align="center"> 
<td><h2>Movies Showing</h2>

<form method="post">
<%
try{
	String city=session.getAttribute("City").toString();
out.println("<br>");
Movies mov = new Movies();
LinkedList<String> ls=mov.getMovieInCity(city);
for(int i=0;i<ls.size();i++){
out.print("<input type=\"submit\" name =\"movieName\" value=\""+ls.get(i)+"\" onclick=\"javascript: form.action='MovieDetails.jsp';\"/>");
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
</div> 
</body>
</html>