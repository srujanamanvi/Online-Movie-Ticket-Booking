<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="utility.Movies"%>
<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Discussion</title>
<style type="text/css">
<%@
include file="/../css/mystyle.css"
%>
</style>
</head>
<div align="center">
<body>
<h1>Discussions</h1>
<%
	Movies mov = new Movies();
	HashMap<String,String> ls=mov.getDiscussionTopics();
	out.println("<br>");

	Iterator it = ls.entrySet().iterator();
	while (it.hasNext()) {
	    Map.Entry pair = (Map.Entry)it.next();
	
	   out.println("<br>");
	   
	   out.println(pair.getKey());
	   String key =pair.getKey().toString();
	   String disc=(String)pair.getValue();
	  
	   out.println("<a href=\"comments.jsp?value="+key+"\">"+disc+"</a>");
	   out.println("<br>");
	   
	}
%>
    
	<form method="Post" action="CreateDiscussion">
	</br>
    <input type="text" name="discussion">
    </br>
	<br/><td><input type="Submit" value="Start new discussion"
    name="submit" class="customButton"></td>
    </form>
    </div>
    </br>
</body>

</html>