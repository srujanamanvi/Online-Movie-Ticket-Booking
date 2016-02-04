package utility;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.LinkedList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class MyServlet
 */
public class MyServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MyServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
    
   

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String comm=request.getParameter("comments");
		String user1=request.getParameter("mydata");
		String date=request.getParameter("date");
		String time1=request.getParameter("time");
		String movie1=request.getParameter("movies");
		System.out.println(comm);
		System.out.println(user1);
		System.out.println(date);
		System.out.println(time1);
		System.out.println(movie1);
		String splitString[] = date.split("-");
		String year=splitString[0];
		String day=splitString[1];
		String month=splitString[2];
		String date2= month+"/"+day+"/"+year;
		
	
		System.out.println(date2);
				
			
		 response.setContentType("text/html");
	        // Get a output writer to write the response message into the network socket
	        PrintWriter out = response.getWriter();

	        Connection conn = null;
	        Statement stmt = null;

	        try {
	            // Step 1: Allocate a database Connection object
	            Class.forName("oracle.jdbc.driver.OracleDriver");
	            conn = DriverManager.getConnection("jdbc:oracle:thin:@fourier.cs.iit.edu:1521:orcl","smanvi", "srujana");// <== Check!
	            // database-URL(hostname, port, default database), username, password

	            // Step 2: Allocate a Statement object within the Connection
	            stmt = conn.createStatement();

	            // Step 3: Execute a SQL SELECT query
	            String sqlStr = "select user_id from user_info where user_name=\'"+user1+"\'";
               
	            ResultSet rset = stmt.executeQuery(sqlStr);  // Send the query to the server

	            // Step 4: Process the query result set
	            String uid="";
	            while (rset.next()) {
	            	
	            	   System.out.println(rset.getString(1));
	                // Print a paragraph <p>...</p> for each record
	               
	             uid=rset.getString(1);
	              }
	            
	            String getmid = "select movie_id from movie_info where name=\'"+movie1+"\'";
	               
	            ResultSet rs2 = stmt.executeQuery(getmid); 
	            String mid="";
	            while(rs2.next()){
	            	System.out.println(rs2.getString(1));
	            	mid=rs2.getString(1);
	            }
	            int temp=0;
	            String No_cols = "select COUNT(*) from reviews";
	            ResultSet rs = stmt.executeQuery(No_cols);
	            while(rs.next()){
	            temp=Integer.parseInt(rs.getString(1));
	            }
	           
	            
	            String review="R"+String.valueOf(temp+1);   
                   System.out.println(review);
	            // Print an HTML page as the output of the query
                   /*CallableStatement cstmt = conn.prepareCall("{call insertreview(?,?,?,?,?)}");
       			cstmt.setString(1,review);
       			cstmt.setString(2,uid);
       			cstmt.setString(3,comm);
       			cstmt.setString(4,date2);
       			cstmt.setString(5,time1);
       			cstmt.registerOutParameter(7,Types.INTEGER);*/
       			//cstmt.execute();
                   String sess="alter session set NLS_DATE_FORMAT = 'mm-dd-yyyy'";
                String date_month = "select date_of_review, time_of_review from reviews";
               stmt.executeQuery(sess);
                ResultSet rt = stmt.executeQuery(date_month);
                while(rt.next()){
                	System.out.println(rt.getString(1));
                	System.out.println(rt.getString(2));	
                }
                stmt.executeQuery("commit");  
                int r=0;
               String insertSQL = "insert into reviews "
                   		+ "values('"+review+"','"+uid+"','"+comm+"','"+date2+"','"+time1+"')";
              
                System.out.println(insertSQL);
                stmt.executeUpdate(insertSQL);
                stmt.executeQuery("commit");
                
                String insertrev= "insert into movie_review values('"+review+"','"+mid+"')";
                System.out.println(insertrev);
                stmt.executeUpdate(insertrev);
                out.println("<p>comment inserted successfully"); 
                out.println("<br>");
                out.println("<br>");
                stmt.executeQuery("commit");
               
               
               
                String member= "select points from type_of_review tr, membership_info m "
        				+ "where tr.membership_type=m.membership "
        				+ "and reviewtype='Movie Review' and user_id IN"
        				+ "( select user_id from user_info where user_name=\'"+user1+"\')";
        		
    			String points_allocate="";
        		ResultSet res1=stmt.executeQuery(member);	
        		while(res1.next()){
        		points_allocate=res1.getString(1);
        			System.out.println(points_allocate);
        		}
        	
        		
        		String user_uid="";
        		String userid="select user_id from user_info where user_name=\'"+user1+"\'";
        		res1=stmt.executeQuery(userid);
        		while(res1.next()){
        			user_uid=res1.getString(1);
        		}
        		
        		int upoints=0;
        		String user_points= "select points from user_credits where user_id=\'"+user_uid+"\'";
        		ResultSet res2=stmt.executeQuery(user_points);
        		while(res2.next()){
        			upoints=res2.getInt(1);
        			System.out.println("before updation : "+upoints);
        		}
        		
        		int p=Integer.parseInt(points_allocate);
        		int count=upoints+p;
        		String newp= String.valueOf(count);
        		
        		String update_points="update user_credits set points=\'"+newp+"\' where user_id=\'"+user_uid+"\'";
        		stmt.executeQuery(update_points);
        	   stmt.executeQuery("commit");
        	System.out.println("update successful");
        		
        		
        		int mins=0, ming=0, minpl=0;
        		String minSil="select min_points from type_of_membership where membership_type='Silver'";
        		ResultSet res4=stmt.executeQuery(minSil);
        		while(res4.next()){
        			mins=res4.getInt(1);
        			System.out.println(mins);
        		}
        		
        		String mingold="select min_points from type_of_membership where membership_type='Gold'";
        		ResultSet res5=stmt.executeQuery(mingold);
        		while(res5.next()){
        			ming=res5.getInt(1);
        			System.out.println(ming);
        		}
        		
        		
        		String minpla="select min_points from type_of_membership where membership_type='Platinum'";
        		ResultSet res6=stmt.executeQuery(minpla);
        		while(res6.next()){
        			minpl=res6.getInt(1);
        			System.out.println(minpl);
        		}
        		
        		System.out.println("after updation : "+count);
        		if(count>minpl){
        		String update1="update membership_info set membership='Platinum' where user_id=\'"+user_uid+"\'";
        		stmt.executeUpdate(update1);
        		stmt.executeQuery("commit");
        		}
        		else if(count>ming){
        		
        			 String update2="update membership_info set membership='Gold' where user_id=\'"+user_uid+"\'";
        			 stmt.executeUpdate(update2);
             		stmt.executeQuery("commit");
        		}
        		else if(count>mins){
        			String update3="update membership_info set membership='Silver' where user_id=\'"+user_uid+"\'";
        			stmt.executeUpdate(update3);
            		stmt.executeQuery("commit");
        		}
        	
        		
        		 Movies mov = new Movies ();
                 LinkedList<String> reviewInfo =mov.getReviewofMovie(movie1);
                 for(int i=0;i<reviewInfo.size();i++){
                 out.println("Review : "+ reviewInfo.get(i));
                 out.println("<br>");
                 out.println("<br>");
                 
                 }
                 
                 
                 
        
                
	        }catch(Exception ex){
                	System.out.println("error message"+ex.getMessage());
                	out.println("<br>");
                	out.println("<br>");
                	out.println("<br>");
                }
                	
	          
              /*Thread.sleep(5000);
	            r=2;
	            if(r==2)
	            {*/
	            	RequestDispatcher requestDispatcher = request
	                        .getRequestDispatcher("/review.jsp");
	                       
	                requestDispatcher.forward(request, response);
	           /* }
	        } catch (Exception ex) {
	            ex.printStackTrace();
	        }*/
	    }

		
        /*PreparedStatement prepareSQL = connection
                .prepareStatement(strAllAccocuntsSQL);
                    prepareSQL.setString(1, usrID);   
        ResultSet resultWithAccounts = prepareSQL.executeQuery();*/
	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
   doGet(request,response);
  
   
  }
}
 