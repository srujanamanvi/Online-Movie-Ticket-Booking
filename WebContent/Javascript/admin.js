var column="<td> </td>";
var input="<input type='text'/>";
var textarea="<textarea></textarea>";

var currentCustomer,tempCustomer;
var currentCinema,tempCinema;
var currentMovie,tempMovie;
var currentSchedule,tempSchedule;
var currentTimeslot,tempTimeslot;
//------------Test area --------(To be deleted)-----------
var querytest;

//-----------------------------------------------Customer Managment----------------------------------------------------------///
function viewCustomer(){
	showmessage("admin.jsp?do=viewcustomers","databar");
	if(document.frmAdmin){
	document.getElementById("datainfo").innerHTML="Customers";
	var trow=document.getElementById("insert");
	var cells=trow.cells;
	for ( var i = 0; i < 12; i++) {
		trow.insertCell();		
	}
	//cells[0].innerHTML=column;
	cells[1].innerHTML="<input type='text' name='insertName'/>";
	cells[2].innerHTML="<input type='text' name='insertEmail'/>";
	cells[3].innerHTML="<textarea name='insertAddress'></textarea>";
	cells[4].innerHTML="<input type='text' name='insertPhone' />";
	cells[5].id="City";
	cells[6].innerHTML="<input type='text' name='insertCrno' />";
	cells[7].innerHTML="<input type='text' name='insertBalance' />";
	//cells[8].innerHTML=column
	//cells[9].innerHTML=column
	//cells[10].innerHTML=column;
	cells[11].innerHTML="<a href='javascript:insertCustomer()' >insert</a>";
	
	showmessage("cities.jsp?name=insertCity","City");
	}
	currentCustomer=null;
}
function Customer(id,name,email,address,phone,city,crno,balance,link){
	this.id=id;this.name=name;this.email=email;this.address=address;this.phone=phone;this.city=city;this.crno=crno;this.balance=balance;this.link=link;
}
function editCustomer(cust){
	if(currentCustomer==null){
		var trow=document.getElementById(cust);
		var cells=trow.cells;
		currentCustomer=new Customer(cells[0].innerHTML,cells[1].innerHTML,cells[2].innerHTML,cells[3].innerHTML,
				cells[4].innerHTML,cells[5].innerHTML,cells[6].innerHTML,cells[7].innerHTML,cells[11].innerHTML);

		cells[1].innerHTML="<input type='text' name='editName' value='"+cells[1].innerHTML+"'/>";
		cells[2].innerHTML="<input type='text' name='editEmail' value='"+cells[2].innerHTML+"'/>";
		cells[3].innerHTML="<textarea name='editAddress'>"+cells[3].innerHTML+"</textarea>";
		cells[4].innerHTML="<input type='text' name='editPhone' value='"+cells[4].innerHTML+"'/>";
		cells[5].id='Cities';
		cells[6].innerHTML="<input type='text' name='editCrno' value='"+cells[6].innerHTML+"'/>";
		cells[7].innerHTML="<input type='text' name='editBalance'  value='"+cells[7].innerHTML+"'/>";
		cells[11].innerHTML="<a href=\"javascript:saveCustomer('"+cust+"')\">save</a> <a href=\"javascript:cancelCustomer('"+cust+"')\">cancel</a>";
		showmessage("cities.jsp?name=editCity","Cities");

		if(currentCustomer.city=="") document.frmAdmin.editCity.value=0;

		for(i=0;i<document.frmAdmin.editCity.length;i++){
			if(currentCustomer.city==document.frmAdmin.editCity.options[i].text){
				document.frmAdmin.editCity.selectedIndex=i;
				break;
			}
		}
	}else{
		alert("Another Customer record is in edit mode.\n Please save or exit that record to continue.");
	}
}
function cancelCustomer(cust){
	restoreCustomer(cust,currentCustomer);
	currentCustomer=null;
}
function restoreCustomer(cust,custObj){		
	if(custObj!=null){
		var c=document.getElementById(cust).cells;
		c[1].innerHTML=custObj.name;
		c[2].innerHTML=custObj.email;
		c[3].innerHTML=custObj.address;
		c[4].innerHTML=custObj.phone;
		c[5].innerHTML=custObj.city;
		c[5].id="";
		c[6].innerHTML=custObj.crno;
		c[7].innerHTML=custObj.balance;
		c[11].innerHTML=custObj.link;
	}
}
function insertCustomer(){
	var uname=document.frmAdmin.insertName.value;
	var email=document.frmAdmin.insertEmail.value;
	var address=document.frmAdmin.insertAddress.value;
	var phno=document.frmAdmin.insertPhone.value;
	var city=document.frmAdmin.insertCity.value;
	var crno=document.frmAdmin.insertCrno.value;
	var balance=document.frmAdmin.insertBalance.value;	
	
	if(uname==""||crno=="")
		alert("You must provide atleast User name and Credit card No. of the Customer");
	else{
		var location="insertCustomer.jsp?";
		var query="uname="+uname+"&email="+email+"&address="+address+"&phno="+phno+"&City="+city+"&crno="+crno+"&balance="+balance;
		location+=encodeURI(query);
		//alert(query);
		
		xmlHttp.open("POST",location,false);
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4){
				response=xmlHttp.responseText;					
				if(response.indexOf("not")==-1)
					viewCustomer();
				else
					alert(response);
			}
		}
		xmlHttp.send(null);
	}
}
function saveCustomer(cust){
	var query=new Array();
	var uname=document.frmAdmin.editName.value;
	var email=document.frmAdmin.editEmail.value;
	var address=document.frmAdmin.editAddress.value;
	var phno=document.frmAdmin.editPhone.value;
	var city=document.frmAdmin.editCity; //select city
	var crno=document.frmAdmin.editCrno.value;
	var balance=document.frmAdmin.editBalance.value;
	query[0]="update Customer set ";
	query[1]="update Credit set ";
	len1=query[0].length;
	len2=query[1].length;
	tempCustomer=new Customer(currentCustomer.id,currentCustomer.name,currentCustomer.email,currentCustomer.address,currentCustomer.phone,currentCustomer.city,currentCustomer.crno,currentCustomer.balance,currentCustomer.link);
	try{		
		if(uname!=tempCustomer.name){
			tempCustomer.name=uname;
			query[0]+=" uname='"+tempCustomer.name+"', ";
		}
		if(email!=tempCustomer.email){
			tempCustomer.email=email;
			query[0]+="email='"+tempCustomer.email+"', ";
		}
		if(address!=tempCustomer.address){
			tempCustomer.address=address;
			query[0]+="address='"+tempCustomer.address+"', ";
		}
		if(phno!=tempCustomer.phone){
			tempCustomer.phone=phno;
			query[0]+="phno='"+tempCustomer.phone+"', ";
		}
		if(city.options[city.selectedIndex].text!=tempCustomer.city){
			tempCustomer.city=city.options[city.selectedIndex].text;
			query[0]+="cityid="+city.value+", ";
		}
		if(query[0].length>len1){			// if modified
			query[0]=query[0].substring(0,query[0].length-2); //remove extra comma
			query[0]+=" where id="+tempCustomer.id;
		}else
			query[0]="";

		if(crno!=tempCustomer.crno){
			tempCustomer.crno=crno;
			query[1]+=" crno='"+tempCustomer.crno+"', ";
		}
		if(balance!=tempCustomer.balance){
			tempCustomer.balance=balance;
			query[1]+=" balance="+tempCustomer.balance+", ";
		}
		if(query[1].length>len2){
			query[1]=query[1].substring(0,query[1].length-2); //remove extra comma
			query[1]+=" where id=(select crid from Customer where id="+tempCustomer.id+")"; // if modified
		}else
			query[1]="";

		//alert(query[0]+"\n"+query[1])
		//--------------------------------------------Update Request-------------------------------------------------
		if(query[0]==""&& query[1]==""){
			alert("You must make changes to update the record")
		}else{
			var location="transaction.jsp?"
			for(i=0;i<query.length;i++){
				if(query[i]!="")
					location+="query="+encodeURI(query[i])+"&";
			}
			xmlHttp.open("POST",location,false);
			xmlHttp.onreadystatechange=function(){
				if(xmlHttp.readyState==4){
					response=xmlHttp.responseText;					
					if(response.indexOf("not")==-1){
						restoreCustomer(cust,tempCustomer);
						currentCustomer=null;
					}else
						alert(response);
				}
			}
			xmlHttp.send(null);
		}
	}catch(exception){alert("Update unsuccessful due to exception :"+exception)}
}
function deleteCustomer(cust){	
	if(confirm("Are you sure you want to delete this Customer ? \n This cannot be undone by any means.")){
		query="delete from Customer where id="+cust.substring(1);
		var location="transaction.jsp?query="+query;
		xmlHttp.open("POST",location,false);
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4){
				response=xmlHttp.responseText;					
				if(response.indexOf("not")==-1){
					trow=document.getElementById(cust);
					for ( var i = 0; i < 12; i++)
						trow.deleteCell();					
				}else
					alert(response);
			}
		}
		xmlHttp.send(null);
	}	
}
//-----------------------------------------------------Cinema Management-------------------------------------////
function viewCinema(){
	showmessage("admin.jsp?do=viewcinema","databar");
	if(document.frmAdmin){
		var trow=document.getElementById("insert");
		var cells=trow.cells;
		for ( var i = 0; i < 8; i++) {
			trow.insertCell();		
		}
		//cells[0].innerHTML=column;
		cells[1].innerHTML="<input type='text' name='insertName'/>";
		cells[2].innerHTML="<textarea name='insertAddress'></textarea>";		
		cells[3].id="City";
		cells[4].innerHTML="<input type='text' name='insertNoOfScreens' />";
		cells[5].innerHTML="<input type='text' name='insertCapacity' />";
		cells[6].innerHTML="<input type='text' name='insertEstablishDate' />";
		cells[7].innerHTML="<a href='javascript:insertCinema()' >insert</a>";
		document.getElementById("datainfo").innerHTML="Cinemas";		
		showmessage("cities.jsp?name=insertCity","City");
		currentCinema=null;
	}
}
function Cinema(id,name,address,city,noofscreens,capacity,established,link){
	this.id=id;this.name=name;this.address=address;this.city=city;this.noofscreens=noofscreens;this.capacity=capacity;this.established=established;this.link=link;
}

function editCinema(cnma){
	if(currentCinema==null){
		var c=document.getElementById(cnma).cells;
		currentCinema=new Cinema(c[0].innerHTML,c[1].innerHTML,c[2].innerHTML,c[3].innerHTML,c[4].innerHTML,c[5].innerHTML,c[6].innerHTML,c[7].innerHTML);
		c[1].innerHTML="<input type='text' name='editName' value='"+c[1].innerHTML+"'/>";
		c[2].innerHTML="<textarea name='editAddress'>"+c[2].innerHTML+"</textarea>";
		c[3].id="Cities";
		c[4].innerHTML="<input type='text' name='editNoOfScreens' value='"+c[4].innerHTML+"'/>";
		c[5].innerHTML="<input type='text' name='editCapacity' value='"+c[5].innerHTML+"'/>";
		c[6].innerHTML="<input type='text' name='editEstablishDate' value='"+c[6].innerHTML+"'/>";
		c[7].innerHTML="<a href=\"javascript:saveCinema('"+cnma+"')\">save</a> <a href=\"javascript:cancelCinema('"+cnma+"')\">cancel</a>";
		showmessage("cities.jsp?name=editCity","Cities");

		if(currentCinema.city=="") document.frmAdmin.editCity.value=0;

		for(var i=0;i<document.frmAdmin.editCity.length;i++){
			if(currentCinema.city==document.frmAdmin.editCity.options[i].text){
				document.frmAdmin.editCity.selectedIndex=i;
				break;
			}
		}
	}else{
		alert("Another Cinema record is in edit mode.\n Please save or exit that record to continue.");
	}
}
function cancelCinema(cnma){
	restoreCinema(cnma,currentCinema);
	currentCinema=null;
}
function restoreCinema(cnma,cnmaObj){
		if(cnmaObj!=null){			
		var c=document.getElementById(cnma).cells;
		c[1].innerHTML=cnmaObj.name;
		c[2].innerHTML=cnmaObj.address;
		c[3].innerHTML=cnmaObj.city;
		c[3].id="";
		c[4].innerHTML=cnmaObj.noofscreens;
		c[5].innerHTML=cnmaObj.capacity;
		c[6].innerHTML=cnmaObj.established;
		c[7].innerHTML=cnmaObj.link;
	}
}
function insertCinema(){
	var name=document.frmAdmin.insertName.value;	
	var address=document.frmAdmin.insertAddress.value;	
	var city=document.frmAdmin.insertCity.value;
	var noOfScreens=document.frmAdmin.insertNoOfScreens.value;
	var capacity=document.frmAdmin.insertCapacity.value;
	var establishDate=document.frmAdmin.insertEstablishDate.value;
	
	if(name==""||address==""){
		alert("You must enter the name and address of the cinema ")
	}else{
		var query="insert into Cinema(name,address,cityid,noofscreens,capacity,establishDate)values('"+name+"','"+address+"',"+city+","+noOfScreens+","+capacity+",'"+establishDate+"')";	
		var location="transaction.jsp?query="+encodeURI(query);
		xmlHttp.open("POST",location,false);
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4){
				response=xmlHttp.responseText;					
				if(response.indexOf("not")==-1)
					viewCinema();
				else
					alert(response);
			}
		}
		xmlHttp.send(null);
	}
}
function saveCinema(cnma){
	var query="update Cinema set ";	
	len=query.length;
	var name=document.frmAdmin.editName.value;	
	var address=document.frmAdmin.editAddress.value;	
	var city=document.frmAdmin.editCity;
	var noOfScreens=document.frmAdmin.editNoOfScreens.value;
	var capacity=document.frmAdmin.editCapacity.value;
	var establishDate=document.frmAdmin.editEstablishDate.value;
	tempCinema=new Cinema(currentCinema.id,currentCinema.name,currentCinema.address,currentCinema.city,currentCinema.noofscreens,currentCinema.capacity,currentCinema.established);
	try{		
		if(name!=tempCinema.name){
			tempCinema.name=name;
			query+=" name='"+tempCinema.name+"', ";
		}
		if(address!=tempCinema.address){
			tempCinema.address=address;
			query+="address='"+tempCinema.address+"', ";
		}
		if(city.options[city.selectedIndex].text!=tempCinema.city){
			tempCinema.city=city.options[city.selectedIndex].text;
			query+="cityid="+city.value+", ";
		}
		if(noOfScreens!=tempCinema.noofscreens){
			tempCinema.noofscreens=noOfScreens;
			query+="noofscreens="+tempCinema.noofscreens+", ";
		}
		if(capacity!=tempCinema.capacity){
			tempCinema.capacity=capacity;
			query+="capacity="+tempCinema.capacity+", ";
		}
		if(establishDate!=tempCinema.established){
			tempCinema.established=establishDate;
			query+="establishDate='"+tempCinema.established+"', ";
		}
		
		if(query.length>len){			// if modified
			query=query.substring(0,query.length-2); //remove extra comma
			query+=" where id="+tempCinema.id;
		}else
			query="";		

		querytest=query;
		//--------------------------------------------Update Request-------------------------------------------------
		if(query.length==0)
			alert("You must make changes to update the record")
		else{
			var location="transaction.jsp?query="+encodeURI(query);			
			xmlHttp.open("POST",location,false);
			xmlHttp.onreadystatechange=function(){
				if(xmlHttp.readyState==4){
					response=xmlHttp.responseText;					
					if(response.indexOf("not")==-1){
						restoreCinema(cnma,tempCinema);
						currentCinema=null;
					}else
						alert(response);
				}
			}
			xmlHttp.send(null);
		}
	}catch(exception){alert("Update unsuccessful due to exception"+exception);}
}
function deleteCinema(cnma){
	if(confirm("Are you sure you want to remove this Cinema ? \n This cannot be undone by any means.")){
		query="delete from Cinema where id="+cnma.substring(1);
		var location="transaction.jsp?"+query;
		xmlHttp.open("POST",location,false);
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4){
				response=xmlHttp.responseText;					
				if(response.indexOf("not")==-1){
					trow=document.getElementById(cnma);
					for ( var i = 0; i < 12; i++) 
						trow.deleteCell();
				}else
					alert(response);
			}
		}
		xmlHttp.send(null);
	}	
}
//-------------------------------------------------------Movie Management-------------------------------------------------------
function viewMovie(){
	showmessage("admin.jsp?do=viewmovie","databar");
	if(document.frmAdmin){		
		var trow=document.getElementById("insert");
		var cells=trow.cells;
		for ( var i = 0; i < 8; i++) {
			trow.insertCell();		
		}
		//cells[0].innerHTML=column;
		cells[1].innerHTML="<input type='text' name='insertName'/>";
		cells[2].innerHTML="<textarea name='insertStory'></textarea>";		
		cells[3].innerHTML="<input type='text' name='insertImage' />";
		cells[4].innerHTML="<input type='text' name='insertTrailer' />";
		cells[5].innerHTML="<textarea name='insertCasting'></textarea>";
		cells[6].innerHTML="<input type='text' name='insertCategory' />";
		cells[7].innerHTML="<a href='javascript:insertCinema()' >insert</a>";
		document.getElementById("datainfo").innerHTML="Movies";		
		currentMovie=null;
	}
}
function Movie(id,name,story,image,trailer,casting,category,link){
	this.id=id;this.name=name;this.story=story;this.image=image;this.trailer=trailer;this.casting=casting;this.category=category;this.link=link;
}
function editMovie(mov){
	if(currentMovie==null){
		var trow=document.getElementById(mov);
		var c=trow.cells;
		currentMovie=new Movie(c[0].innerHTML,c[1].innerHTML,c[2].innerHTML,c[3].innerHTML,c[4].innerHTML,c[5].innerHTML,c[6].innerHTML,c[7].innerHTML)
		c[1].innerHTML="<input type='text' name='editName' value='"+c[1].innerHTML+"'/>";
		c[2].innerHTML="<textarea name='editStory'>"+c[2].innerHTML+"</textarea>";		
		c[3].innerHTML="<input type='text' name='editImage' value='"+c[3].innerHTML+"'/>";
		c[4].innerHTML="<input type='text' name='editTrailer' value='"+c[4].innerHTML+"'/>";
		c[5].innerHTML="<textarea name='editCasting' >"+c[5].innerHTML+"</textarea>";
		c[6].innerHTML="<input type='text' name='editCategory'  value='"+c[6].innerHTML+"' />";
		c[7].innerHTML="<a href=\"javascript:saveMovie('"+mov+"')\">save</a> <a href=\"javascript:cancelMovie('"+mov+"')\">cancel</a>";
	}else
		alert("Another Movie record is in edit mode.\n Please save or exit that record to continue.");
}
function cancelMovie(mov){
	restoreMovie(mov,currentMovie);
	currentMovie=null;
}
function restoreMovie(mov,movObj){
		if(movObj!=null){
		var c=document.getElementById(mov).cells;
		c[1].innerHTML=movObj.name;
		c[2].innerHTML=movObj.story;
		c[3].innerHTML=movObj.image;
		c[4].innerHTML=movObj.trailer;
		c[5].innerHTML=movObj.casting;
		c[6].innerHTML=movObj.category;
		c[7].innerHTML=movObj.link;
	}
}
function insertMovie(){
	var name=document.frmAdmin.insertName.value;
	var story=document.frmAdmin.insertStory.value;
	var image=document.frmAdmin.insertImage.value;
	var trailer=document.frmAdmin.insertTrailer.value;
	var casting=document.frmAdmin.insertCasting.value;
	var category=document.frmAdmin.insertCategory.value;
		
	if(name==""||category=="")
		alert("You must provide atleast Name and category of the movie")
	else{
		var query="insert into Film(name,story,image,trailer,cast,category)values('"+name+"','"+story+"','"+image+"','"+trailer+"','"+casting+"','"+category+"')";
		querytest=query;
		var location="transaction.jsp?query="+encodeURI(query);
		xmlHttp.open("POST",location,false);
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4){
				response=xmlHttp.responseText;					
				if(response.indexOf("not")==-1)
					viewMovie();
				else
					alert(response);
			}
		}
		xmlHttp.send(null);
	}
}
function saveMovie(mov){	
	var name=document.frmAdmin.editName.value;
	var story=document.frmAdmin.editStory.value;
	var image=document.frmAdmin.editImage.value;
	var trailer=document.frmAdmin.editTrailer.value;
	var casting=document.frmAdmin.editCasting.value;
	var category=document.frmAdmin.editCategory.value;
	
	query="update Film set ";
	len=query.length;
	
	tempMovie=new Movie(currentMovie.id,currentMovie.name,currentMovie.story,currentMovie.image,currentMovie.trailer,currentMovie.casting,currentMovie.category,currentMovie.link);
	try{		
		if(name!=tempMovie.name){
			tempMovie.name=name;
			query+=" name='"+name+"', ";
		}
		if(story!=tempMovie.story){
			tempMovie.story=story;
			query+="story='"+story+"', ";
		}
		if(image!=tempMovie.image){
			tempMovie.image=image;
			query+="image='"+image+"', ";
		}
		if(trailer!=tempMovie.trailer){
			tempMovie.trailer=trailer;
			query+="trailer='"+trailer+"', ";
		}
		if(casting!=tempMovie.casting){
			tempMovie.casting=casting;
			query+="cast='"+casting+"', ";
		}
		if(category!=tempMovie.category){
			tempMovie.category=category;
			query+="category='"+category+"', ";
		}
		
		if(query.length>len){			// if modified
			query=query.substring(0,query.length-2); //remove extra comma
			query+=" where id="+tempMovie.id;
		}else
			query="";		

		querytest=query;
		//--------------------------------------------Update Request-------------------------------------------------
		if(query.length==0)
			alert("You must make changes to update the record")
		else{
			var location="transaction.jsp?query="+encodeURI(query);			
			xmlHttp.open("POST",location,false);
			xmlHttp.onreadystatechange=function(){
				if(xmlHttp.readyState==4){
					response=xmlHttp.responseText;					
					if(response.indexOf("not")==-1){
						restoreMovie(mov,tempMovie);
						currentMovie=null;						
					}else
						alert(response);
				}
			}
			xmlHttp.send(null);
		}
	}catch(exception){alert("Update unsuccessful due to exception"+exception)}
}
function deleteMovie(mov){
	if(confirm("Are you sure you want to remove this Movie ? \n This cannot be undone by any means.")){
		query="delete from film where id="+mov.substring(1);
		var location="transaction.jsp?query="+query;
		xmlHttp.open("POST",location,false);
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4){
				response=xmlHttp.responseText;					
				if(response.indexOf("not")==-1){
					mov.innerHTML="";
				}else
					alert(response);
			}
		}
		xmlHttp.send(null);
	}	
}
//--------------------------------------------Schedule Management-----------------------------------------------------

function viewSchedule(){
	showmessage("admin.jsp?do=viewschedule","databar");
	document.getElementById("datainfo").innerHTML="Movie Schedule";	
	if(document.frmAdmin){		
		var trow=document.getElementById("insert");
		var cells=trow.cells;
		for ( var i = 0; i < 8; i++) {
			trow.insertCell();		
		}
		//cells[0].innerHTML=column;
		cells[1].id="Cinema";
		cells[2].id="Screen";		
		cells[3].innerHTML="<input type='text' name='insertDate' />";
		cells[4].id="Movie";		
		cells[5].innerHTML="<a href='javascript:insertSchedule()' >insert</a>";
		showmessage("scheduleadmin.jsp?showby=Cinema&showid=Screen&name=insertCinema&showName=insertScreenNo","Cinema");
		showmessage("scheduleadmin.jsp?showby=Screen&showvalue=0&name=insertScreenNo","Screen");
		showmessage("scheduleadmin.jsp?showby=Movie&name=insertMovie","Movie");
		currentSchedule=null;
	}
}
function Schedule(id,cinema,screenno,showdate,movie,link){
	this.id=id;this.cinema=cinema;this.screenno=screenno;this.showdate=showdate;this.movie=movie;this.link=link;
}
function editSchedule(sch){
	if(currentSchedule==null){
		var c=document.getElementById(sch).cells;
		currentSchedule=new Schedule(c[0].innerHTML,c[1].innerHTML,c[2].innerHTML,c[3].innerHTML,c[4].innerHTML,c[5].innerHTML)
		c[1].id="Cinemas";
		c[2].id="Screens";
		c[3].innerHTML="<input type='text' name='editDate' value='"+c[3].innerHTML+"'/>";
		c[4].id="Movies";
		c[5].innerHTML="<a href=\"javascript:saveSchedule('"+sch+"')\">save</a> <a href=\"javascript:cancelSchedule('"+sch+"')\">cancel</a>";
		
		showmessage("scheduleadmin.jsp?showby=Cinema&showid=Screens&name=editCinema&showName=editScreenNo","Cinemas");

		if(currentSchedule.cinema=="") document.frmAdmin.editCinema.value=0;
		for(i=0;i<document.frmAdmin.editCinema.length;i++){
			if(currentSchedule.cinema==document.frmAdmin.editCinema.options[i].text){
				document.frmAdmin.editCinema.selectedIndex=i;
				break; 
			}
		}
		showmessage("scheduleadmin.jsp?showby=Screen&name=editScreenNo&showvalue="+document.frmAdmin.editCinema.value,"Screens");		
		showmessage("scheduleadmin.jsp?showby=Movie&name=editMovie","Movies");
		if(currentSchedule.screenno=="") document.frmAdmin.editScreenNo.value=0;
		for(i=0;i<document.frmAdmin.editScreenNo.length;i++){
			if(currentSchedule.screenno==document.frmAdmin.editScreenNo.options[i].text){
				document.frmAdmin.editScreenNo.selectedIndex=i;
				break;
			}
		}		

		if(currentSchedule.movie=="") document.frmAdmin.editMovie.value=0;
		for(i=0;i<document.frmAdmin.editMovie.length;i++){
			if(currentSchedule.movie==document.frmAdmin.editMovie.options[i].text){
				document.frmAdmin.editMovie.selectedIndex=i;
				break;
			}
		}		
	}else
		alert("Another Schedule record is in edit mode.\n Please save or exit that record to continue.");
}
function cancelSchedule(sch){
	restoreSchedule(sch,currentSchedule);
	currentSchedule=null;
}
function restoreSchedule(sch,movObj){
		if(movObj!=null){
		var c=document.getElementById(sch).cells;
		c[1].innerHTML=movObj.cinema;c[1].id="";
		c[2].innerHTML=movObj.screenno;c[2].id="";
		c[3].innerHTML=movObj.showdate;
		c[4].innerHTML=movObj.movie;c[4].id="";
		c[5].innerHTML=movObj.link;
	}
}
function insertSchedule(){
	var screenid=document.frmAdmin.insertScreenNo.value;
	var showdate=document.frmAdmin.insertDate.value;
	var filmid=document.frmAdmin.insertMovie.value;
	
	
	if(screenid==0||filmid==0||showdate=="")
		alert("All details are required");
	else{
		var query="insert into Schedule(screenid,showdate,filmid)values("+screenid+",'"+showdate+"',"+filmid+")";	
		querytest=query;
		var location="transaction.jsp?query="+encodeURI(query);;
		xmlHttp.open("POST",location,false);
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4){
				response=xmlHttp.responseText;					
				if(response.indexOf("not")==-1)
					viewSchedule();
				else
					alert(response);
			}
		}
		xmlHttp.send(null);	
	}
}
function saveSchedule(sch){
	var cinema=document.frmAdmin.editCinema;
	var screen=document.frmAdmin.editScreenNo;
	var showdate=document.frmAdmin.editDate.value;
	var film=document.frmAdmin.editMovie;
		
	query="update schedule set ";
	len=query.length;
	tempSchedule=new Schedule(currentSchedule.id,currentSchedule.cinema,currentSchedule.screenno,currentSchedule.showdate,currentSchedule.movie);

	var c=sch.childNodes;
	if(cinema.options[cinema.selectedIndex].text!=tempSchedule.cinema||screen.options[screen.selectedIndex].text!=tempSchedule.screenno){
		tempSchedule.cinema=cinema.options[cinema.selectedIndex].text;
		tempSchedule.screenno=screen.options[screen.selectedIndex].text;
		query+="screenid="+screen.value+", ";
	}
	if(showdate.value!=tempSchedule.showdate){
		tempSchedule.showdate=showdate.value;
		query+=" showdate='"+tempSchedule.showdate+"', ";
	}
	if(film.options[film.selectedIndex].text!=tempSchedule.movie){
		tempSchedule.movie=film.options[film.selectedIndex].text;
		query+="filmid="+film.value+", ";
	}
	
	if(query.length>len){			// if modified
		query=query.substring(0,query.length-2); //remove extra comma
		query+=" where id="+tempSchedule.id;
	}else
		query="";		

	querytest=query;
	if(query.length==0)
		alert("You must make changes to update the record")
	else{
		var location="transaction.jsp?query="+encodeURI(query);			
		xmlHttp.open("POST",location,false);
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4){
				response=xmlHttp.responseText;					
				if(response.indexOf("not")==-1){
					restoreSchedule(sch,tempSchedule);
					currentSchedule=null;
				}else
					alert(response);
			}
		}
		xmlHttp.send(null);
	}
}
//---------------------------------------Time Slot Management ---------------------------------- ///
function viewTimeslot(){
	showmessage("admin.jsp?do=viewtimeslot","databar");
	document.getElementById("datainfo").innerHTML="Time Slots";	
		
	if(document.frmAdmin){		
		var trow=document.getElementById("insert");
		var cells=trow.cells;
		var insertid=cells[0].innerHTML;
		//alert(insertid);
		for ( var i = 1; i < 4; i++) {
			trow.insertCell();		
		}
		
		cells[0].innerHTML=insertid;		
		temp="<select name='insertSlotNo'>";
		for(i=1;i<=4;i++)	temp+="<option value='"+i+"'>"+i+"</option>";
		temp+="</select>";		
		cells[1].innerHTML=temp;
		
		cells[2].innerHTML="<input type='text' name='insertTime' />";				
		cells[3].innerHTML="<a href='javascript:insertTimeslot()' >insert</a>";
		
		currentTimeslot=null;
	}
}
function Timeslot(id,slotno,time,link){
	this.id=id;this.slotno=slotno;this.time=time;this.link=link;
}
function editTimeslot(tmslt){
	if(currentTimeslot==null){
		var c=document.getElementById(tmslt).cells;
		var temp="<select name='editSlotNo'>";
		for(i=1;i<=4;i++)
			temp+="<option value='"+i+"'>"+i+"</option>";
		temp+="</select>";
		currentTimeslot=new Timeslot(c[0].innerHTML,c[1].innerHTML,c[2].innerHTML,c[3].innerHTML);
		c[2].innerHTML="<input type='text' name='editTime' value='"+c[2].innerHTML+"'/>";
		c[3].innerHTML="<a href=\"javascript:saveTimeslot('"+tmslt+"')\">save</a> <a href=\"javascript:cancelTimeslot('"+tmslt+"')\">cancel</a>";
	}else
		alert("Another Timeslot record is in edit mode.\n Please save or exit that record to continue.");
}
function cancelTimeslot(tmslt){
	restoreTimeslot(tmslt,currentTimeslot);
	currentTimeslot=null;
}
function restoreTimeslot(tmslt,movObj){
		if(movObj!=null){
		var c=document.getElementById(tmslt).cells;	
		c[2].innerHTML=movObj.time;
		c[3].innerHTML=movObj.link;
	}
}
function insertTimeslot(){
	var timeid=document.getElementById("insert").cells[0].innerHTML;
	var slotNo=document.frmAdmin.insertSlotNo.value;
	var time=document.frmAdmin.insertTime.value;
	c=document.getElementById("insert").childNodes;
	if(time=="")
		alert("Time value is required");
	else{
		var query="insert into tTime(id,slotno,slot)values("+timeid+",'"+slotNo+"','"+time+"')";	
		querytest=query;
		var location="transaction.jsp?query="+encodeURI(query);
		xmlHttp.open("POST",location,false);
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4){
				response=xmlHttp.responseText;					
				if(response.indexOf("not")==-1)
					viewTimeslot();
				else{
					if(response.indexOf("Admin")==-1)
						alert("May be you are inserting for same Slot no.\nYou must provide all 4 slot times to start next record\nTime value is not entered properly.");
					else
						alert(response);
				}					
			}
		}
		xmlHttp.send(null);
	}
}

function saveTimeslot(tmslt){
	var timeid=document.getElementById(tmslt).cells[0].innerHTML;
	var slotNo=document.getElementById(tmslt).cells[1].innerHTML;
	var time=document.frmAdmin.editTime.value;
	query="update tTime set ";
	len=query.length;
	tempTimeslot=new Timeslot(currentTimeslot.id,currentTimeslot.slotno,currentTimeslot.time,currentTimeslot.link);

	var c=tmslt.childNodes;
	if(time!=tempTimeslot.time){
		tempTimeslot.time=time;
		query+=" slot='"+tempTimeslot.time+"', ";
	}
	if(query.length>len){			// if modified
		query=query.substring(0,query.length-2); //remove extra comma
		query+=" where id="+tempTimeslot.id+" and slotno='"+tempTimeslot.slotno+"'";
	}else
		query="";		

	querytest=query;
	if(query.length==0)
		alert("You must make changes to update the record")
	else{
		var location="transaction.jsp?query="+encodeURI(query);			
		xmlHttp.open("POST",location,false);
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4){
				response=xmlHttp.responseText;					
				if(response.indexOf("not")==-1){
					restoreTimeslot(tmslt,tempTimeslot);
					currentTimeslot=null;
				}else
					alert(response);
			}
		}
		xmlHttp.send(null);
	}
}
//------------------------------------Tickets ------------------------
function viewTicket(){
	showmessage("admin.jsp?do=viewticket","databar");
	document.getElementById("datainfo").innerHTML="Tickets";
}
