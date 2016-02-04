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
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Payments</title>
</head>
<body>
	<div align="center">
		<h1>Payment Gateway</h1>
		<form action="GenerateTicket.jsp">
			<%
				out.println("Movie :" + session.getAttribute("movie"));
				out.println("<br>");
				out.println("Theatre:" + session.getAttribute("theatre"));
				out.println("<br>");
				out.println("Show Time :" + session.getAttribute("showtime"));
				out.println("<br>");
				out.println("No of tickets :" + request.getParameter("ticketCombo"));
				out.println("<br>");
				int perUnit = Integer.parseInt(session.getAttribute("price").toString());
				int ticNum = Integer.parseInt(request.getParameter("ticketCombo"));
				int total = perUnit * ticNum;
				out.println("Total Price :$" + total);
				out.println("<br>");
			%>
			<tr>
				<td align="right">CardType</td>
				<td><select name="CardType" id="CardType">
						<option value="Debit">Debit</option>
						<option value="Visa">Visa</option>
						<option value="Master">Master</option>

				</select></td>
			</tr>

			<tr>
				<td align="right">CardNumber</td>
				<input type="text" name="cardNumber" placeholder="Enter the 16 digit Number">
				</td>
			</tr>
			<tr>
				<td align="right">CardNumber</td>
				<input type="password" name="cvv" placeholder="Cvv" data-icon="x">
				</td>
			</tr>
			<tr>
				<td><input type="Submit" value="Pay" class="customButton"></td>
			</tr>
		</form>
	</div>
</body>

</html>