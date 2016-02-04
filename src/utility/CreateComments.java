package utility;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.LinkedList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class CreateComments
 */
public class CreateComments extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CreateComments() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String thread=request.getParameter("thread_id");
		String date=request.getParameter("date");
		String time1=request.getParameter("time");
		String disc_topic=request.getParameter("disc");
		String comment=request.getParameter("comments");
		System.out.println(thread);
		System.out.println(date);
		System.out.println(time1);
		System.out.println(comment);
		System.out.println(disc_topic);
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
	            String sqlStr = "select thread_id, count(discussion_id) from discussion_thread "
	            		+ "where thread_id=\'"+thread+"\'group by thread_id";
               
	            ResultSet rset = stmt.executeQuery(sqlStr);  // Send the query to the server
	            String disc_id="";
	            while(rset.next()){
                	disc_id=rset.getString(2);
                }
	            // Step 4: Process the query result set
	            
	            String discussion_id= String.valueOf(disc_id +1);
	             System.out.println(discussion_id); 
	             
	             
	            String sess="alter session set NLS_DATE_FORMAT = 'mm-dd-yyyy'";
		        stmt.executeQuery(sess);
                stmt.executeQuery("commit");
                String insertSQL = "insert into discussion_thread "
                   		+ "values('"+thread+"','"+discussion_id+"','"+comment+"','"+date2+"','"+time1+"','"+disc_topic+"')";
              
                System.out.println(insertSQL);
                stmt.executeUpdate(insertSQL);
                stmt.executeQuery("commit");
                
                Movies mov=new Movies();
    	        LinkedList ls = mov.get_Comments(thread);   
    	           
    	        for(int i=0;i<ls.size();i++){
    	        	   out.println(ls.get(i));
    	        	   out.println("<br>");
    	        	  
    	        	   System.out.println(ls.get(i));
    	        	   out.println("<br>");
    	        	   
    	        }
                    	
               
	        }catch(Exception ex){
                	System.out.println("error message"+ex.getMessage());
                	
                }
	        
	        
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
