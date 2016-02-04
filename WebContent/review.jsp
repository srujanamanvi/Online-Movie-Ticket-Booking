<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="utility.Movies"%>
<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Reviews</title>
<style type="text/css">
<%@
include file="/../css/mystyle.css"
%>
</style>

</head>
<body>
<%Boolean a=(session.getAttribute("username").toString()).equals("Guest");out.println("a"+a);%>
<%
Movies mov = new Movies ();
LinkedList<String> reviewInfo =mov.getReviewofMovie(session.getAttribute("movie").toString());
for(int i=0;i<reviewInfo.size();i++){
out.println("Review : "+ reviewInfo.get(i)); 
out.println("<br>");
}

%>

 <% int z=1; %>
<form method="Post" action="MyServlet">
        <input type="text" name="comments" />
        <input type="hidden" name="mydata" value="<%=session.getAttribute("username")%>">
          
        <%
        long MSEC_SINCE_EPOCH = System.currentTimeMillis();
        java.util.Date utilDate = new java.util.Date();
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
        java.sql.Date instant = new java.sql.Date( MSEC_SINCE_EPOCH );
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat( "HH:mm:ss" );
        String time = sdf.format( instant );
        String movies=session.getAttribute("movie").toString();
        %>
        <input type="hidden" name="movies" value="<%=movies%>">
        <input type="hidden" name="date" value="<%=sqlDate%>">
        <input type="hidden" name="time" value="<%=time%>">
      <%if(a==false){ out.println("<input type=\"submit\" name=\"btn1\" value=\"Post Comment\"/>");}
      else{
    	  out.println("<input type=\"submit\" name=\"btn1\" disabled='disabled' value=\"Post Comment\"/>");
    	  out.println("<p>Register to comment</p>");
      }
      %>
        
</form>
</body>
</html>