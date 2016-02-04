<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="utility.Movies"%>
<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<style type="text/css">
 <%@ include file="/../css/mystyle.css" %>
 </style>
<title>Movies</title>
</head>
<body>
<%
Movies mov = new Movies ();
LinkedList<String>  movieInfo =mov.getMovie_Info(request.getParameter("movieName"));
out.println("<br>");
out.println("Movie : "+ request.getParameter("movieName"));
out.println("<br>");
out.println("Genre : "+ movieInfo.get(1));
out.println("<br>");
out.println("Director : "+ movieInfo.get(2));
out.println("<br>");
out.println("Stars : "+ movieInfo.get(5));
out.println("<br>");
out.println("city "+session.getAttribute("City").toString());
out.println("movie "+request.getParameter("movieName"));
String mov1 = request.getParameter("movieName");
session.setAttribute("movie",mov1); 
out.println("move "+mov1);
out.println("<br>");
out.println("<br>");
out.println("<br>");
out.println("<br>");

HashMap<String, LinkedList<String>> showingat = mov.getTheatresOfMovie(mov1,session.getAttribute("City").toString());
Iterator it = showingat.entrySet().iterator();
while (it.hasNext()) {
    Map.Entry pair = (Map.Entry)it.next();
  
   
   
   out.println(pair.getKey());
   String key =pair.getKey().toString();
   LinkedList<String> slots=(LinkedList<String>) pair.getValue();
   Iterator itr = slots.iterator();
  session.setAttribute("theatre",key);
   
   while(itr.hasNext())
   {
	   
	   String timing = itr.next().toString();
	   //out.println("<a href=\"Booking.jsp?value=a\">"+itr.next()+"</a>");
out.println("<a href=\"Booking.jsp?value="+timing+"\">"+timing+"</a>");
   //out.println("<a href=\"Booking.jsp value="+itr.next()+"\">"+itr.next()+"</a>");
   }
   out.println("<br>");
}

%>

<form action="review.jsp">
<div align="center"> 
	<br/><td><input type="Submit" value="Reviews & Comments"
   name="submit" class="customButton"></td>
   </br>
</div> 	
	
	</form>
</body>
</html>