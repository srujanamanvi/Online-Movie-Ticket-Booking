<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
<%@
include file="/../css/mystyle.css"
%>
</style>
<title>JSP Page</title>
</head>
<body>
	<div align="center">
		<h1>Welcome !!</h1>
		<h1>Online Movie Ticket Booking</h1>
		<section class="login">
		<div style="font-weight: bold; font-size: 25px;" >Login</div>
		<form action="LoginCheck.jsp" method="post" enctype="application/x-www-form-urlencoded">
			<table id="login">
				<tr>
					<td style="font-weight: bold; font-size: 15px; padding-top: 15px;" align="left"><u>U</u>ser Name</td>
					<td style="padding-top: 15px;"><input type="text" name="username" accesskey="u" /></td>
				</tr>
				<tr height="35px">
					<td style="font-weight: bold; font-size: 15px; padding-top: 15px;" align="left"><u>P</u>assword</td>
					<td style="padding-top: 15px;"><input type="password" name="password" accesskey="p"
						value="" /></td>
				</tr>
				<tr height="35px">

					<td colspan="2" align="center">
						<table>
							<tr>
								<td style="padding-top: 15px;"><input type="submit" class="customButton" value="submit"
									></td>
								<td width="20px"></td>
								<td style="padding-top: 15px;"><input type="reset" class="customButton" value="Cancel"
									></td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			
				<div>
					<a href="Register.jsp" title="Ver Carásteres">Register</a>
				</div>
				<div>
					<a href="#" title="Recuperar Password">Forgot Password?</a>
				</div>
				<div>
					<a href="guest.jsp" title="Ver Carásteres">CONTINUE AS GUEST
						USER</a>
				</div>
			
			</div>
		</form>
		</section>
</body>
</html>
