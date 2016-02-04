package utility;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.LinkedList;

public class Theatre { 
	
	LinkedList<String> listOfMoviesfromTheatre=new LinkedList<>();
	LinkedList<String> listOFtheatres=new LinkedList<>();
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
	
	
	
	public LinkedList getTheatresInCity(String cityname) throws SQLException
	{
		//LinkedList<String> listOFMovies=new LinkedList<>();

		/*String username=request.getParameter("username");
	String password =request.getParameter("password");*/

		try {


			String queryMov="select name from theatre t, theatre_address ta "
					+ "where t.theatre_id=ta.theatre_id and city=\'"+cityname+"\'";
			ResultSet rs=st.executeQuery(queryMov);

			while(rs.next()){
				System.out.println(rs.getString(1));
				//listOFMovies.add(rs.getString(1));
				listOFtheatres.add(rs.getString(1));
			}   


			//System.out.println("count of list "+ listOFMovies.size());

		}
		catch(Exception ex){

			System.out.println("exception has occured "+ex.getMessage());  

		}
		return listOFtheatres;
	}

	
	
	public LinkedList getMovieFromTheatre(String theatre) throws SQLException
	{
		try {
		
			String queryMov="select name from movie_info where movie_id "
					+ "in (select movie_id from shows where show_id "
					+ "in (select show_id from showing_at where screen_id "
					+ "in (select screen_id from screens_in_theatre where theatre_id "
					+ "in (select theatre_id from theatre where name=\'"+theatre+"\'))))";
			ResultSet rs=st.executeQuery(queryMov);

			while(rs.next()){
				System.out.println(rs.getString(1));
				//listOFMovies.add(rs.getString(1));
				listOfMoviesfromTheatre.add(rs.getString(1));
			}   


			//System.out.println("count of list "+ listOFMovies.size());

		}
		catch(Exception ex){

			System.out.println("exception has occured "+ex.getMessage());  

		}
		return listOfMoviesfromTheatre;
	}
	
	

	public HashMap<String, LinkedList<String>> getMoviesOfTheatre(String movieName, String cityName)
	{
		LinkedList<String> timePrice=null;
		ResultSet rs=null;
		HashMap<String,LinkedList<String>> showsInTheatre=new HashMap<>();
		LinkedList<String> thea = new LinkedList<>();


		try{
			
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
				String queryShowIntheate="select  show_date,show_time from show_time where show_id in( "+
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
					
					String showing=dat+tm;
					
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
}