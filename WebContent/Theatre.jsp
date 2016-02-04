<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*"%>
<%@ page import="utility.Theatre"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<style type="text/css">
<%@
include file="/../css/mystyle.css"
%>
</style>
</head>
<body>
<td>Movies Showing
<form method="post">
<%
try{
	String theatre=request.getParameter("theatreName");
out.println("<br>");
Theatre mov = new Theatre();
LinkedList<String> ls=mov.getMovieFromTheatre(theatre);
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
</body>
</html>