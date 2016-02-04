var monthname=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
var agree;
var htmldata;
var noOfSelectedSeats=0;
var selectedSeats=new Array();
var str;
var seat;

function login(){	
	loc="login.jsp"+getSubmitQuery(document.loginform);
	showmessage(loc,"logininfo")	
	autorefreshmsg();
}
function logout(){
	if(confirm("Are you sure want to log out ?")){
		showmessage("logout.jsp","messagecenter");		
	}
}
function loadschedule(showby,showvalue){
	loc="schedule.jsp?showby="+showby+"&showvalue="+showvalue;
	//alert(loc);
	showmessage(loc,showby);
	if(showby=="Date"){
		showmessage("filmdesc.jsp?Filmid="+document.schedule.Film.value,"Filmdesc");
		if(showvalue!=0){			
			var s1 = new SWFObject("player.swf","ply","400","300","9","#000000");
			s1.addParam("allowfullscreen","true");
			s1.addParam("allowscriptaccess","always");
			s1.addParam("flashvars",document.getElementById("flashvars").value);
			s1.write("container");
		}
	}
}
function loadfilmdesc(filmid){
	showmessage("filmdesc.jsp?Filmid="+filmid ,"Filmdesc");
	if(filmid!=0){
		var s1 = new SWFObject("player.swf","ply","400","300","9","#000000");
		s1.addParam("allowfullscreen","true");
		s1.addParam("allowscriptaccess","always");
		s1.addParam("flashvars",document.getElementById("flashvars").value);
		s1.write("container");
	}
}

function autorefreshmsg(){	
	showmessage("message.jsp?loc=center","messagecenter");
	showmessage("message.jsp?loc=right","messageright");	
}

function initschedule(){
	showmessage("schedule.jsp?showby=Country","Country");
	document.getElementById("State").innerHTML="<select><option>Select A State</option></select>";
	document.getElementById("City").innerHTML="<select><option>Select A City</option></select>";
	document.getElementById("Cinema").innerHTML="<select><option>Select An area</option></select>";
	document.getElementById("Film").innerHTML="<select><option>Select A Movie</option></select>";
	document.getElementById("Date").innerHTML="<select><option>Select A Date</option></select>";
	document.getElementById("Time").innerHTML="<select name='Time'><option value='0'>Select A Time</option></select>";	
	document.getElementById("Filmdesc").innerHTML="<table border=1 height=50px width=100%><tr align=center><td>No Movie Selected</td></tr></table>";
} 

function selectseat(seatclicked){
	seatno=parseInt(seatclicked.id.substring(4));	
	if (seatclicked.style.background=='yellow'){ //Unselecting seat
		seatclicked.style.background="white";		
		var index;
		for(i=0;i<noOfSelectedSeats;i++){
			if(selectedSeats[i]==seatno){
				index=i;
				break;
			}			
		}
		noOfSelectedSeats--;
		selectedSeats[index]=selectedSeats[noOfSelectedSeats]
		if(seatno < 41)	seat[0]--;
		else if(seatno < 81) seat[1]--;
		else seat[2]--;	
	}else{		
		if(noOfSelectedSeats>4){
			seatclicked.style.background="white";
			alert("You can select only five seats per ticket");
		}else{
			seatclicked.style.background="yellow";			
			selectedSeats[noOfSelectedSeats]=seatno;
			noOfSelectedSeats++;
			if(seatno < 41)	seat[0]++;
			else if(seatno< 81) seat[1]++;
			else seat[2]++;
		}
	}
	document.getElementById("price").innerHTML=seat[0]+ "-Silver , " +seat[1]+ "-Gold , "+seat[2]+ "-Platinum " + "Total Price =" +(seat[0]*75+seat[1]*100+seat[2]*125);
}
function loadseat(){
	loc="seats.jsp?scheduleid="+document.schedule.Date.value+"&timeslot="+ document.schedule.Time.value;
	htmldata="<table><tr><td><table id='seattable'>";
	xmlHttp.open("POST",loc,false);
	noOfSelectedSeats=0;
	seat=[0,0,0]; //seat types e.g Platinum ,Gold ,Silver

	
	xmlHttp.onreadystatechange=function(){
		if(xmlHttp.readyState==4){			
			var alpha=" ABCDE";
 			var text="" +xmlHttp.responseText;
			seats=text.split(";")
			for(i=0;i<=5;i++){				
				htmldata+="<tr>"
				
				for(j=0;j<=20;j++){
					if(i==0){
						if(j==0)	htmldata+="<td>&nbsp;</td>";
						else		htmldata+="<td>"+j+"</td>";
					}else{
						if(j==0)	htmldata+="<td>"+alpha.charAt(i)+"</td>";
						else		htmldata+="<td id=seat"+((i-1)*20+j)+" onclick='selectseat(this)' style='background:white;'></td>";
					}
				}
				
				htmldata+="</tr>"
			}
			htmldata+="</table></td></tr>";
			htmldata+="<tr><td >A,B-Silver 75INR | C,D-Gold 100INR | E-Platinum 125INR</td></tr>"
			htmldata+="<tr><td id='price'></td></tr>"
			htmldata+="</table>";			
			document.getElementById("Seats").innerHTML=htmldata;			
			for(i=0;i<seats.length-1;i++){
				document.getElementById("seat"+parseInt(seats[i])).style.background="red";				
				document.getElementById("seat"+parseInt(seats[i])).onclick="";
			}			
		}
	}
	xmlHttp.send(null);
}

function bookTicket(){
	if(document.schedule.Time.value==0){
		alert("Please select the details ")
	}else if(noOfSelectedSeats==0){
		alert("Please select at least one seat")
	}else if(confirm("Are you sure ?\n"+document.getElementById("price").innerHTML)){
		str=getSubmitQuery(document.schedule);		
		document.getElementById("databar").innerHTML="<form name='regform'><table><tr><td colspan='2' align='center'><h2>Confirm Ticket Book</h2></td></tr>"+
		"<tr><td>Creditcard No</td><td><input type='text' id='crno' onkeyup='javascript:checkcrno()'/><label id='m_crno'></label></td></tr>"+
		"<tr><td><a href='javascript:confirmBookTicket()' class='navigation'>Confirm</a></td>"+
		"<td><a href='javascript:navtoschedule()' class='navigation'>Cancel</a></td></tr></table></form>";
	}
}
function confirmBookTicket(){
	if(checkcrno()){
		seats=selectedSeats.join(";")
		seats+=";"
		loc=str+"&seats="+encodeURI(seats)+"&crno="+encodeURI(document.getElementById("crno").value)		
		showmessage("booktickets.jsp"+loc,"databar")
	}else{
		alert("Please Enter an valid credit card No.")
	}
}
function printTicket(){
	neww=window.open("","","left="+(window.screenLeft+160)+" ,top=" +(window.screenTop+60)+",height=365, width=350");
	neww.document.write(document.getElementById("ticket").innerHTML);
	document.close();
}
function editProfile(){
	showdata("profile.jsp","databar");
	showmessage("cities.jsp","citycombo");
	document.regform.City.value=document.regform.hcity.value
}
function saveProfile(){	
	if(document.regform.fname.value.length<1){	
		alert("You must enter your First Name"); 
		document.regform.fname.focus();
	}else if(document.regform.lname.value.length<1){	
		alert("You must enter your Last Name"); 
		document.regform.lname.focus();
	}else if(checkemail()&& checkphno() && checkcrno()){
		showmessage("saveProfile.jsp"+getSubmitQuery(document.regform),"profileMessage");
	}	
}
function changePassw(){
	if(document.regform.passw.value!=document.regform.passw2.value){
		alert("Your passwords do not match");	
	}else if(checkpassw()){		
		showmessage("changePassw.jsp"+getSubmitQuery(document.regform),"messagePassw");
	}
}