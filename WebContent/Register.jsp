<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="/../javascript/validate.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<style type="text/css">
<%@ include file="/../css/mystyle.css" %>
 </style>
<title>Register</title>
</head>
<body>
	<div align="center">
<h1>Create a New Account</h1>
	<form name="regform" action="RegisterDB.jsp">
		<table id="register">
			<tr>
				<td align="right" valign="top" style="font-weight: bold; font-size: 15px; padding-top: 15px">Name*</td>
				<td>
					<table>      
						<tr>
							<td style="padding-top: 15px;"><input type="text" name="fname" required="required"
								placehoder="First name" /></td>
							
							<td style="padding-top: 15px;"><input name="lname" type="text" required="required"
								placehoder="Last name" /></td>
						</tr>
						<tr>
							<td style="font-weight: bold;font-size: 15px; padding-top: 15px" align="center">(First name)*</td>
							
							<td style="font-weight: bold; font-size: 15px; padding-top: 15px " align="center">(Last name)*</td>
						</tr>
					</table>
				</td> 
			</tr>
			<tr>
				<td style="font-weight: bold; font-size: 15px; padding-top: 15px" align="right">User Name*</td>
				<td><input name="uname" type="text" required="required"
					onblur="javascript:checkname()" /> <input type="button"
					style="width: 120px;" value="Check Availability" class="customButton"
					onclick="isAvailName()" /> <label id="m_uname"></label></td>
			</tr>
			<tr>
				<td style="font-weight: bold; font-size: 15px; padding-top: 15px;" align="right">Password*</td>
				<td style="padding-top: 15px;"><input name="passw" type="password" required="required"
					onblur="javascript:checkpassw()" /><label id="m_passw"></label></td>
			</tr>
			<tr>
				<td style="font-weight: bold;font-size: 15px; padding-top: 15px;" align="right">Retype Password*</td>
				<td style="padding-top: 15px;"><input name="passw2" type="password" required="required" /></td>
			</tr>
			<tr>
				<td style="font-weight: bold; font-size: 15px; padding-top: 15px;" align="right">Email-Id*</td>
				<td style="padding-top: 15px;"><input name="email" type="text" required="required"
					onblur="javascript:checkemail()" /> <label id="m_email"></label></td>
			</tr>
			<tr>
				<td style="font-weight: bold;font-size: 15px; padding-top: 10px;" align="right">Phone No.</td>
				<td style="padding-top: 10px;"><input name="phno" type="text" required="required"
					onblur="javascript:checkphno()" /><label id="m_phno"></label></td>
			</tr>
			<tr>
				<td style="font-weight: bold;font-size: 15px; padding-top: 15px;" align="right">Address*</td>
				<td style="padding-top: 15px;"><textarea name="address" required="required"></textarea></td>
			</tr>
			<tr>
				<td style="font-weight: bold; font-size: 15px; padding-top: 15px;" align="right">City</td>
				<td style="padding-top: 15px;"><select id="cityCombo">
						<option value="IL">IL</option>
						<option value="NY">NY</option>
						<option value="OH">OH</option>
						<option value="CA">CA</option>
				</select></td>
			</tr>
			<tr>
				<td style="font-weight: bold; font-size: 15px; padding-top: 15px;" align="right">Credit Card No.*</td>
				<td style="padding-top: 15px;"><input name="crno" type="text" required="required"
					onblur="javascript:checkcrno()" /><label id="m_crno"></label></td>
			</tr>
			<tr>
			<td style="font-weight: bold; font-size: 15px; padding-top: 15px;" align="right">CardType*</td>
			<td style="padding-top: 15px;"><select name="CardType" id="CardType" required>
					<option value="Debit">Debit</option>
					<option value="Visa">Visa</option>
					<option value="Master">Master</option>
					
			</select></td>
		</tr>
		
		 <tr>
		 <td style="font-weight: bold; font-size: 15px; padding-top: 15px;" align="right"> 
		 Expiry Date (MM/DD/YYY)*: </td><td style="padding-top: 15px;">
		 <input type="text" id="expdate" name="expdate" required="required"/>
		 </td>
		 </tr>
		
			
			<tr>
				<td style="font-weight: bold; font-size: 15px; padding-top: 15px;" align="right">Security Question*</td>
				<td style="padding-top: 15px;"><input name="secques" type="text"
					placeholder="Security Question" required="required"></td>

			</tr>
			<tr>
				<td style="font-weight: bold; font-size: 15px; padding-top: 15px;" align="right">Security Answer.*</td>      
				<td style="padding-top: 15px;"><input name="seqans" type="text"
					placeholder="Security Answer" required="required"></td>

			</tr>
		</table>
		
		<table>
			<tr>
				<td style="padding-top: 15px;" width="105"><input type="submit" class="customButton"
					value="Register"></td>
				<td  style="padding-top: 15px;" width="169"><input type="reset" class="customButton"
					value="Cancel"></td>
			</tr>
		</table>
	</form>
	</div>

</body>
</html>              