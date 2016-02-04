var nameAvail=false;
function register()
{
	isAvailName();
	if(document.regform.passw.value!=document.regform.passw2.value)
		alert("Your passwords do not match");	
	else if(document.regform.fname.value.length<1){	
		alert("You must enter your First Name"); 
		document.regform.fname.focus();
	}else if(document.regform.lname.value.length<1){	
		alert("You must enter your Last Name"); 
		document.regform.lname.focus();
	}else if(checkpassw()&& checkemail()&& checkphno() && checkcrno()){
		if(nameAvail){
			if(agree){
				showmessage("register.jsp"+getSubmitQuery(document.regform),"databar");
			}else{
				alert("You must agree to our Terms and Policy")
			}
			
		}
	}
}
function checkname(){
	if(document.regform.uname.value.length<6){
		document.getElementById("m_uname").innerHTML="Name must be atleast 6 characters long";
		document.getElementById("m_uname").style.color="red" ;
		document.regform.uname.focus();
		return false;
	}else{
		document.getElementById("m_uname").innerHTML="Name OK";
		document.getElementById("m_uname").style.color="green" ;
		return true;
		}
}
function checkpassw(){
	var len=document.regform.passw.value.length 
	if(len<5){
		document.getElementById("m_passw").innerHTML="Too Short (Min 5 chars)";
		document.getElementById("m_passw").style.color="red" ;
		document.regform.passw.focus();
		return false;
	}else if(len <8){
		document.getElementById("m_passw").innerHTML="Weak";
		document.getElementById("m_passw").style.color="Yellow";
		return true ;
	}else{
		document.getElementById("m_passw").innerHTML="Strong" ;
		document.getElementById("m_passw").style.color="cyan";
		return true ;
	}
}
function checkemail(){
	var str=document.regform.email.value
	var len=str.length
	var iat=str.indexOf("@")
	var idot=str.indexOf(".")
	var idot2=str.indexOf(".",iat)
	if(iat<1||(iat>idot2)|| idot2>=len-1){
		document.getElementById("m_email").innerHTML="Enter valid email";
		document.getElementById("m_email").style.color="red" ;
		document.regform.email.focus();
		return false;
	}else{
		document.getElementById("m_email").innerHTML="Email ok";
		document.getElementById("m_email").style.color="green";
		return true;
	}
}

 
function checkcrno(){
	var crno=document.regform.crno.value
	var valid=false
	var cardtype
	var len=crno.length
	if(len>12&&len<17){
		switch(crno.charAt(0)){
			case "5": //Master Card
				var c2=crno.charAt(1)
				if(len==16 && c2<=5 && c2>=1){				
					valid=true
					cardtype="Master Card"
				}
				break;
			case "4": //VISA
				if((len==16 || len==14)){				
					valid=true
					cardtype="VISA"
				}
				break;
				case "3": //Amex
				if((len==16 || len==14)){				
					valid=true
					cardtype="American Express"
				}
				break;
				case "6": //Discover
				if((len==16 || len==14)){				
					valid=true
					cardtype="Discover"
				}
				break;
		}
	}
	if(valid){
		document.getElementById("m_crno").innerHTML=cardtype;
		document.getElementById("m_crno").style.color="green" ;						
	}else{
		document.getElementById("m_crno").innerHTML="Enter valid Credit Card No.";
		document.getElementById("m_crno").style.color="red" ;
		document.regform.crno.focus();
	}		
	return valid
}
function checkphno(){	
	var len=document.regform.phno.value.length
		if(len==0){
			document.getElementById("m_phno").innerHTML="";
			return true;
		}
		else if(isNumber(document.regform.phno.value)){
			if(len==10){
				document.getElementById("m_phno").innerHTML="Phone No OK";
				document.getElementById("m_phno").style.color="green" ;
				return true;
			}else{
				document.getElementById("m_phno").innerHTML="Phone No should only contain 10 to 12 digits or leave empty";
				document.getElementById("m_phno").style.color="red" ;			
			}
		}else{
			document.getElementById("m_phno").innerHTML="Phone No should contain only digits";
			document.getElementById("m_phno").style.color="red" ;
			}	
	return false;
}
function isNumber(char){
	var numcheck = /\D/;
	for(i=0;i<char.length;i++){
		if(numcheck.test(char.charAt(i)))
			return false;
	}	
	return true;
}

function isAvailName(){
	if(checkname()){
		xmlHttp.open("POST","checkName.jsp?name="+document.regform.uname.value,false);
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4){
				if(xmlHttp.responseText.indexOf("false")!=-1){
					document.getElementById("m_uname").innerHTML="This User Name is already in use.";
					document.getElementById("m_uname").style.color="red" ;
					nameAvail=false
				}else{
					document.getElementById("m_uname").innerHTML="This User name is available.";
					document.getElementById("m_uname").style.color="Green" ;
					nameAvail=true;
				}
			}
		}
		xmlHttp.send(null);
	}
}