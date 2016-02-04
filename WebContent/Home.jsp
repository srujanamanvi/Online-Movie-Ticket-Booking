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
<style type="text/css">
<%@
include file="/../css/mystyle.css"
%>
</style>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Home Page</title>
</head>
<body>
<div align="center"> 
	<br />
	<br />
	<br />
	<br />
	<br />
	<center>
	 <h2>
			<% String a=session.getAttribute("username").toString(); 
			String b=session.getAttribute("pass").toString();
			out.println("Hello "+a); %>
		</h2>
				
			<%  Movies mov = new Movies(); 
				String uid=mov.getUserId(a, b);
			session.setAttribute("userid",uid);
			out.println(mov.getMembership(uid));  
				
			
			   %> 
		<a href="UserDetails.jsp"><b>MyInfo</b></a>
		<div style = "text-align:left; float:left">
      <b>Links:</b>
   </div>
		<div style = "clear: left; float: left; text-align: left;">
      <br />
      <a href = "discussion.jsp"><b>Discussion Board</b></a>	
      </div>
<form action="Home.jsp">
	<tr>
				<td align="right" valign="top" style="padding-top: 5px">State*</td>
				<td>
					<table>
						<tr>
							<td><select id="State">
									<option value="IL">IL</option>

							</select></td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td align="right">City*</td>
				<td><select name ="City" id="City">
				<%if(request.getParameter("City")!=null)
				out.print("<option value=\"" + request.getParameter("City")+"\">"+request.getParameter("City")+"</option>");
				else
					out.print("<option value=\"\"></option>");
				%>
				
			
						
						<option value="Chicago">Chicago</option>
						<option value="SpringFieild">Springfield</option>

				</select></td>

			</tr>
			<tr>
				<td align="right">ZipCode*</td>
				<td><select id="zipCombo">
						<option value=""></option>

				</select></td>
			</tr>
			<tr>
			<td><input type="Submit" value="Go" class="customButton"></td>		
			</form>
			<%

			session.setAttribute("City",request.getParameter("City"));
	%>
			
			<form action="MovieSearch.jsp">
			 <input type="submit" name="Movies" value="Movies" class="customButton">
			</form>
			
			<form action="TheatreSearch.jsp">
			 <input type="submit" name="Theatre" value="Theatres" class="customButton">
			</form>
			

		<tr>

			<a href="Logout.jsp">Logout</a>
	</center>
	</div> 
</body>
</html>

