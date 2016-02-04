<%@page import="java.sql.*"%>
<%@page import="oracle.jdbc.driver.*" %> 
<%@page import="oracle.sql.*" %>
<%@ page import="utility.Movies"%>
<%@ page import="utility.Rand"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body><%
String username=request.getParameter("uname");
String password =request.getParameter("passw");
String email=request.getParameter("email");
String phno=request.getParameter("phno");
String address = request.getParameter("address");
String nameOnCard= request.getParameter("nameOnCard");
String cardNumber= request.getParameter("crno");
String securityques=request.getParameter("secques");
String securityans = request.getParameter("seqans");
String cardType = request.getParameter("CardType");
String expDate = request.getParameter("expdate");


try
{
Connection	con = null;

Class.forName("oracle.jdbc.driver.OracleDriver"); 

con = DriverManager.getConnection("jdbc:oracle:thin:@fourier.cs.iit.edu:1521:orcl","smanvi", "srujana");       

Statement st = con.createStatement();
st.executeQuery("alter session set NLS_DATE_FORMAT = 'mm-dd-yyyy'");
st.executeQuery("commit");
Rand rn = new Rand();
boolean unique=false;
String userId="U";
while(!unique)
{
	int i = rn.generateId();
	userId="U"+String.valueOf(i);
	ResultSet rs1 = st.executeQuery("select count(*) from user_info where user_id=\'"+rn+"\'");
	int cnt=-1;
	if(rs1.next())
	{
		cnt= Integer.parseInt(rs1.getString(1));
		if(cnt==0)
			unique=true;
	}	
	
	out.println("user !!"+userId);
	
}



ResultSet rs= st.executeQuery("insert into user_info (user_id,user_name,password,phone_number,email,security_qtn,security_ans) values ('"+userId+"','"+username+"','"+password+"','"+phno+"','"+email+"','"+securityques+"','"+securityans+"')");      

String query="insert into Credit_Card_Info values('"+cardNumber+"','"+nameOnCard+"','"+expDate+"','"+cardType+"','"+userId+"')";
out.println("query 2!! "+ query);
st.executeQuery(query);
//String cardInfo="insert credit_card_info ";
ResultSet rs2 = st.executeQuery("select * from user_info where user_id=\'"+userId+"\'");

out.println("query !"+ "insert into user_info (user_id,user_name,password,phone_number,email,security_qtn,security_ans) values ('"+userId+"','"+username+"','"+password+"','"+phno+"','"+email+"','"+securityques+"','"+securityans+"'");

st.executeQuery("insert into user_credits values('"+userId+"',0)");
st.executeQuery("insert into membership_info values('"+userId+"','Silver')");
st.executeQuery("commit");
st.close();
con.close();

if(rs2!=null){
	%>

	<p>Registered successfully </p>
	<% 
	response.sendRedirect("LoginPage.jsp");
}  
 else{
	 %>
	//response.sendRedirect("Error.jsp");
	
	 <p>Registered Unsuccessful !!! please check the details entered</p>
<%
} 
}
catch(Exception ex){

	out.println("exception has occured "+ex.getMessage());  
}
%>

</body>
</html>