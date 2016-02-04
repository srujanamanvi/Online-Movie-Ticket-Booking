<%@page import="java.sql.*"%>
<%@page import="oracle.jdbc.driver.*" %> 
<%@page import="oracle.sql.*" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<html>
<head>
<title>Auto Refresh Header Example</title>
</head>
<body>
<%  
String username=request.getParameter("username");
String password =request.getParameter("password");
try {

Connection con = null;
System.out.println("reached 1");
Class.forName("oracle.jdbc.driver.OracleDriver");

//DriverManager.registerDriver(new oracle.jdbc.driver.OracleDriver());


System.out.println("reached 2****************8");
con = DriverManager.getConnection("jdbc:oracle:thin:@fourier.cs.iit.edu:1521:orcl","smanvi", "srujana");   

Statement st = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);

ResultSet rs=st.executeQuery("select user_name,password from user_info where user_name='"+username+"' and password='"+password+"'");
session.setAttribute("DBconnection", con);
session.setAttribute("DBStatement", st);


if(rs.next()){
	
	session.setAttribute("username",rs.getString(1));
	session.setAttribute("pass", rs.getString(2));
	response.sendRedirect("Home.jsp");
}   
else{
	response.sendRedirect("Error.jsp");
}
con.close();
st.close();
}
catch(Exception ex){

	out.println("exception has occured "+ex.getMessage());  
}
%>
 
</body>
</html>

   