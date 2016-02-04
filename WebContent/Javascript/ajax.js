//var destinationid;
function getXmlHttpObject(){
	var xmlHttp;
	try{  // Firefox, Opera 8.0+, Safari  
		xmlHttp=new XMLHttpRequest();  }
	catch (e) {  // Internet Explorer
		try{xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");}
		catch (e){
   			try{ xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");}
   			catch (e){
   				alert("Your browser does not support AJAX!");
   			}
   		}
   	}
   	return xmlHttp;
}
function showdata(loc ,destinationid) {	
	xmlHttp.open("GET",loc,false);
	xmlHttp.onreadystatechange=function(){
		if(xmlHttp.readyState==4){			
 			document.getElementById(destinationid).innerHTML=xmlHttp.responseText; 			
		}
	}
	xmlHttp.send(null);
}

function showmessage(loc ,destinationid) {
	xmlHttp.open("POST",loc,false);
	xmlHttp.onreadystatechange=function(){
		if(xmlHttp.readyState==4){			
			document.getElementById(destinationid).innerHTML=xmlHttp.responseText;			
		}
	}
	xmlHttp.send(null);	
}

function showTime(){
	var d=new Date();
	var today =d.getDate()+ " " + monthname[d.getMonth()] + ", " + d.getFullYear() +" ";
	today+=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds() ;
	document.getElementById("messageleft").innerHTML=today;
}
function getSubmitQuery(fobj){
   var str = "?";   
   for(var i = 0 ;i<fobj.elements.length;i++){ 
       switch(fobj.elements[i].type){
		case "text":
		case "textarea":
		case "password":
		case "select-one":
			str += fobj.elements[i].name +"=" + encodeURI(fobj.elements[i].value) + "&"; 
			break;			
		} 
	} 
   str = str.substr(0,(str.length - 1));   
   return str;
}