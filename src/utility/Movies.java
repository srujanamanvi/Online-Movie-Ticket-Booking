package utility;
import java.lang.Thread.State;
import java.sql.Array;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Map.Entry;

public class Movies {

	LinkedList<String> listOFMovies=new LinkedList<>();
	public static void main(String[] args) throws SQLException

	{
		Movies obj = new Movies();
		//obj.getMovieInCity("Springfield");
		obj.getTheatresOfMovie("panormal activity","Chicago");
		//obj.getMovie_Info("");
	}


	static Connection con = null;
	static Statement st = null;
	static{
		try
		{
			Class.forName("oracle.jdbc.driver.OracleDriver");

			con = DriverManager.getConnection("jdbc:oracle:thin:@fourier.cs.iit.edu:1521:orcl","smanvi", "srujana");   

			st = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);
		}
		catch(Exception ex)
		{
			System.out.println("Ex "+ex.getMessage());
		}
	}
	
	public LinkedList getMovie() throws SQLException
	{
		//LinkedList<String> listOFMovies=new LinkedList<>();

		/*String username=request.getParameter("username");
	String password =request.getParameter("password");*/

		try {
			ResultSet rs=st.executeQuery("select * from movie_info");


			while(rs.next()){
				System.out.println(rs.getString(2));
				//listOFMovies.add(rs.getString(1));
				listOFMovies.add(rs.getString(2));
			}   


			System.out.println("count of list "+ listOFMovies.size());

		}
		catch(Exception ex){

			System.out.println("exception has occured "+ex.getMessage());  

		}
		return listOFMovies;
	}

	
	public HashMap<String, String> getDiscussionTopics(){
		LinkedList<String> lis=new LinkedList<>();
		LinkedList<String> list1=new LinkedList<>();
		LinkedList<String> threads=new LinkedList<>();
		HashMap<String,String> thrd = new HashMap<>();
				ResultSet res=null;
		
      try{
    	  String dis="select unique thread_id, discussion_topic from discussion_visit";
    	  ResultSet res1=st.executeQuery(dis);
    	  
    	  while(res1.next()){
    		String thr_id = res1.getString(1);
    		String dis_top = res1.getString(2);
    		thrd.put(thr_id, dis_top);
    	  }
    	
      }catch(Exception ex){
    	 System.out.println("exception has occured "+ex.getMessage());
      }
      return thrd;
	}

	
public void getVisits(String ds) throws SQLException
	{
		
          int Num_visits=0;
          int vl=0;
      	
       
		try {
			
			      String dis="select no_of_visits from discussion_visit where discussion_topic=\'"+ds+"\'";
		    	  ResultSet res1=st.executeQuery(dis);
		    	  
		    	  while(res1.next()){
		    		  Num_visits = res1.getInt(1);
		    		  System.out.println(Num_visits);
		    	  }
		    	 
            int count=Num_visits+1;
			String updated_visit= String.valueOf(count);
		
			System.out.println(updated_visit);
			String updatevisit="update discussion_visit set no_of_visits=\'"+updated_visit+"\' "
					+ "where discussion_topic=\'"+ds+"\'";
			ResultSet result=st.executeQuery(updatevisit);
			st.executeQuery("commit");
            
			System.out.println(updatevisit);
			while(result.next()){
				System.out.println(result.getString(1));
			}

		}
		
		catch(Exception ex){

			System.out.println("exception has occured "+ex.getMessage());  

		}
	
	}
     
	
public LinkedList get_Comments(String Thread_id){ 
		
		LinkedList<String> threads=new LinkedList<>();
		LinkedList<String> list2=new LinkedList<>();
		ResultSet result=null;
		try{
			 
				String com= "select comments from discussion_thread where thread_id=\'"+Thread_id+"\'";
				result=st.executeQuery(com);
				System.out.println(com);
				while(result.next()){
					list2.add(result.getString(1));
					System.out.println(result.getString(1));
				}
			
		}catch(Exception ex)
		{
			System.out.println("error occured"+ex.getMessage());
		}
		
		return list2;
	
	}

public String getDiscussionName(String Thread_id) throws SQLException
{
	ResultSet rs=null;
	String disc_name="";
	try {


		String queryrev="select discussion_topic from discussion_visit where thread_id=\'"+Thread_id+"\'";
		System.out.println(queryrev);
		rs=st.executeQuery(queryrev);
		while(rs.next()){
		disc_name=rs.getString(1);	
		}
		
		System.out.println(disc_name);
	}
	catch(Exception ex){
		System.out.println("error occured"+ex.getMessage());
	}
	
	return disc_name;
}
	
	
public LinkedList getReviewofMovie(String movieName) throws SQLException
{
		LinkedList<String> lis = new LinkedList<>();
		ResultSet res=null;	
		try {


			String queryrev="select comments from reviews where "
					+ "review_id in(select review_id from movie_review where movie_id "
					+ "in(select movie_id from movie_info where name=\'"+movieName+"\'))";
			ResultSet rs=st.executeQuery(queryrev);
			/*while(rs.next()){
				//System.out.println(rs.getString(1));

				//System.out.println();
				//listOFMovies.add(rs.getString(1));
				lis.add(rs.getString(1));				
		     }*/
			
			//System.out.println("before sta !!!"+ls.size());
			int count =0;
		
			while (rs.next())
			{
				lis.add(rs.getString(1));
			}
			
		}
			catch(Exception ex){

				System.out.println("exception has occured "+ex.getMessage());  

			}

			return lis;
	}


	public LinkedList getMovieInCity(String cityname) throws SQLException
	{
		//LinkedList<String> listOFMovies=new LinkedList<>();

		/*String username=request.getParameter("username");
	String password =request.getParameter("password");*/

		try {


			String queryMov="select name from movie_info "+
					"where movie_id in (select movie_id from shows "+
					"where show_id in (select show_id from showing_at "+
					"where screen_id in (select screen_id from screens_in_theatre "+
					"where theatre_id in(select theatre_id from theatre_address "+
					"where city=\'"+cityname+"\'))))";

			ResultSet rs=st.executeQuery(queryMov);

			while(rs.next()){
				System.out.println(rs.getString(1));
				//listOFMovies.add(rs.getString(1));
				listOFMovies.add(rs.getString(1));
			}   


			//System.out.println("count of list "+ listOFMovies.size());

		}
		catch(Exception ex){

			System.out.println("exception has occured "+ex.getMessage());  

		}
		return listOFMovies;
	}


public LinkedList<String> getMovie_Info(String movieName)
{
		LinkedList<String> ls = new LinkedList<>();
		ResultSet res=null;	
		try {


			String queryMov="select name,genre, director,description ,rating ,poster  "
					+ "from movie_info where name=\'"+movieName+"\'";
			String queryStar="select star_name from stars_in "+
					"where movie_id in (select movie_id from movie_info where name=\'"+movieName+"\')";

			ResultSet rs=st.executeQuery(queryMov);

			while(rs.next()){
				//System.out.println(rs.getString(1));

				//System.out.println();
				//listOFMovies.add(rs.getString(1));
				ls.add(rs.getString(1));
				ls.add(rs.getString(2));
				ls.add(rs.getString(3));
				ls.add(rs.getString(4));
				ls.add(rs.getString(5));

			}   

			ResultSet stars= st.executeQuery(queryStar);
			//System.out.println("before sta !!!"+ls.size());
			int count =0;
			String allStar="";
			while (stars.next())
			{
				allStar= allStar+ stars.getString(1)+ ",";

			}

			ls.add(allStar);
			//System.out.println("count of list "+ listOFMovies.size());

			/*
			for(int i =0; i<ls.size();i++)
			{
				System.out.println(ls.get(i));
			}*/

		}
		catch(Exception ex){

			System.out.println("exception has occured "+ex.getMessage());  

		}

		return ls;


	}
public HashMap<String, LinkedList<String>> getTheatresOfMovie(String movieName, String cityName)
{


	LinkedList<String> timePrice=null;
	ResultSet rs=null;
	HashMap<String,LinkedList<String>> showsInTheatre=new HashMap<>();
	LinkedList<String> thea = new LinkedList<>();


	try {


		String queryMov="select name from theatre, theatre_address where theatre.theatre_id in "+
				"(select theatre_id from screens_in_theatre where screen_id in ( "+
				"select screen_id from  showing_at where show_id in( "+
				"select show_id from shows where movie_id in (select movie_id from movie_info where name ='"+movieName+"')))) "+
				"and theatre.theatre_id=theatre_address.theatre_id "+
				"and city ='Chicago'";

		rs=st.executeQuery(queryMov);
		LinkedList<String> theatres=new LinkedList<>();


		while(rs.next()){


			String theatre=rs.getString(1);

			thea.add(theatre);
		}   



		for(String theatre: thea)
		{
			LinkedList<String> slot= new LinkedList<>();
			String queryShowIntheate="select  show_date,show_time, price from show_time where show_id in( "+
					"select show_time.show_id from show_time,shows "+
					"where movie_id in (select movie_id from movie_info where name=\'"+movieName+"\') "+
					"and show_time.show_id = shows.show_id "+
					"Intersect "+
					"select show_id from showing_at where screen_id in (select screen_id from screens_in_theatre where theatre_id in "+
					"(select theatre_id from theatre where name=\'"+theatre+"\')))";


			ResultSet sh=st.executeQuery(queryShowIntheate);
			while(sh.next())
			{


				String dat =sh.getString(1).toString().replace("0.0.0.0","");
				String tm=sh.getString(2).toString();
				String pr=sh.getString(3).toString();

				String showing=dat+tm+" $"+pr;
				String pat = showing;
				String split[] = pat.split("\\$");
				System.out.println("Show Time and price:"+split[1]);
				slot.add(showing);
			}

			showsInTheatre.put(theatre, slot);
		}

		/*
		Iterator it = showsInTheatre.entrySet().iterator();
		while (it.hasNext()) {
			Map.Entry pair = (Map.Entry)it.next();



			System.out.println(pair.getKey());
			String key =pair.getKey().toString();
			LinkedList<String> slots=(LinkedList<String>) pair.getValue();
			Iterator itr = slots.iterator();
			while(itr.hasNext())
			{

				System.out.println(itr.next());

			}

		}*/
	}
	catch(Exception ex){

		System.out.println("exception has occured "+ex.getMessage());  

	}

	return showsInTheatre;

}

	public LinkedList<String> getUserInformation(String User_id)

	{
		LinkedList<String> details = new LinkedList<>();

		try
		{
			String query = "select phone_number , email from user_info where user_id='"+User_id+"'";
			ResultSet rs = st.executeQuery(query);
			
			while(rs.next())
			{
				details.add(rs.getString(1));
				details.add(rs.getString(2));


			}

			String query2="select credit_cardNumber ,name_on_card,expiry_date,type from credit_card_info where user_id='"+User_id+"'";
			ResultSet rs1 = st.executeQuery(query2);


			while(rs1.next())
			{
				details.add(rs1.getString(1));
				details.add(rs1.getString(2));
				details.add(rs1.getString(3).toString().replace("0.0.0.0",""));
				details.add(rs1.getString(4));


			}



			String query3="select membership from membership_info where user_id='"+User_id+"'";
			ResultSet rs2 = st.executeQuery(query3);


			while(rs2.next())
			{
				details.add(rs2.getString(1));



			}

			String query4="select points from user_credits where user_id='"+User_id+"'";
			ResultSet rs3 = st.executeQuery(query4);


			while(rs3.next())
			{
				details.add(rs3.getString(1));

			}

			return details;
		}

		catch(Exception ex)
		{
		}
		return details;
	}
	
	
	public String getMembership(String User_id)

	{
		String mem= new String();

		try
		{
			

			String query3="select membership from membership_info where user_id='"+User_id+"'";
			ResultSet rs2 = st.executeQuery(query3);


			while(rs2.next())
			{
				mem=rs2.getString(1);

			}

			

			return mem;
		}

		catch(Exception ex)
		{
		}
		return mem;
	}
	
	
	public String getUserId(String Username,String password)

	{
		String id= new String();

		try
		{
			

			String query3="select user_id from user_info where user_name='"+Username+"' and password='"+password+"'";
			ResultSet rs2 = st.executeQuery(query3);


			while(rs2.next())
			{
				id=rs2.getString(1);

			}

			

			return id;
		}

		catch(Exception ex)
		{
		}
		return id;
	}

	
	public int generateId()
	{
		Random rnd = new Random(System.currentTimeMillis());
		
	    int rand =(rnd.nextInt(900) + 100);
	    System.out.println("random "+rand);
	    return rand;
	}
	
	
	public void UpdateUserInfo(String uid,String phone,String email )
	{
	try{
		
		st.executeQuery("alter session set NLS_DATE_FORMAT = 'mm-dd-yyyy'");
		st.executeQuery("commit");
		
		

        // Step 3: Execute a SQL SELECT query
        
        String sqlStr = "update user_info set phone_number=\'"+phone+"\', email='"+email+"'";
       System.out.println(sqlStr);
        ResultSet rset = st.executeQuery(sqlStr);  // Send the query to the server

        
       System.out.println("Successfully done");
	}
	catch(Exception ex)
	{
		
	}
	}

	public void UpdateCard(String uid,String cname,String cnum, String expdate,String  ctype)
	{
	
		try{
		st.executeQuery("alter session set NLS_DATE_FORMAT = 'mm-dd-yyyy'");
		st.executeQuery("commit");

		         
		         
		       
		   String sqlStr2 = "update credit_card_info set Credit_cardNumber=\'"+cnum+"\', Name_On_Card =\'"+cname+"\',Expiry_date=\'"+expdate+"\',Type=\'"+ctype+"\' where user_id=\'"+uid+"\'";
	       
		   System.out.println(sqlStr2);
		    ResultSet rset2 = st.executeQuery(sqlStr2);  // Send the query to the server

       System.out.println("Successfully done");
     
		}
		catch(Exception ex)
		{
			System.out.println("ex "+ex.getMessage());
		}

	}
	public LinkedList<String> getListOFMovies() {
		return listOFMovies;
	}


	public void setListOFMovies(LinkedList<String> listOFMovies) {
		this.listOFMovies = listOFMovies;
	}
}