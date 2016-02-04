<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="utility.Movies"%>
<%@ page import="java.util.*"%>
<%@ page import="java.sql.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Comments</title>
<style type="text/css">
<%@
include file="/../css/mystyle.css"
%>
</style>
</head>
<body>

<%
String Thread_id=request.getParameter("value");
System.out.println(Thread_id);
Movies mov=new Movies();

LinkedList ls = mov.get_Comments(Thread_id);   
String ds=mov.getDiscussionName(Thread_id);	 
System.out.println(ds);
if(ls!=null)
{
	for(int i=0;i<ls.size();i++){

	   out.println(ls.get(i));
	   
	   System.out.println(ls.get(i));
	   out.println("<br>");
}
	mov.getVisits(ds);
}
%>
<%
  long MSEC_SINCE_EPOCH = System.currentTimeMillis();
       java.util.Date utilDate = new java.util.Date();
       java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
       java.sql.Date instant = new java.sql.Date( MSEC_SINCE_EPOCH );
       java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat( "HH:mm:ss" );
       String time = sdf.format( instant );
       %>    
<div align="center">
 <form method="Post" action="CreateComments" >
 <h1>Comments</h1>
 <input type="text" name="comments" style="width: 500px; height: 50px" />
 <input type="hidden" name="date" value="<%=sqlDate%>">
 <input type="hidden" name="time" value="<%=time%>"> 
 <input type="hidden" name="thread_id" value="<%=Thread_id%>"> 
 <input type="hidden" name="disc" value="<%=ds%>">   
 </br>
 </br> 
 <input type="submit" name="btn1" value="Post Comment" class="customButton"/>
        
</form>
</div>

</body>
</html>