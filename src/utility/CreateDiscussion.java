package utility;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class CreateDiscussion
 */
public class CreateDiscussion extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CreateDiscussion() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String disc=request.getParameter("discussion");
		System.out.println(disc);
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
	            int temp=0;
	            String No_cols = "select COUNT(*) from discussion_visit";
	            ResultSet rs = stmt.executeQuery(No_cols);
	            while(rs.next()){
	            temp=Integer.parseInt(rs.getString(1));
	            System.out.println(temp);
	            }
	           
	            
	            String visits=String.valueOf(temp*11+11);   
                System.out.println(visits);
                
                String insertSQL = "insert into discussion_visit "
                		+ "values('"+visits+"','"+disc+"',0)";
           
             System.out.println(insertSQL);
             stmt.executeUpdate(insertSQL);
             stmt.executeQuery("commit");
	     
             Movies mov = new Movies();
         	HashMap<String,String> ls=mov.getDiscussionTopics();
         	out.println("<br>");
         	System.out.println("after call to java method");

         	Iterator it = ls.entrySet().iterator();
         	while (it.hasNext()) {
         	    Map.Entry pair = (Map.Entry)it.next();
         	
         	   out.println("<br>");
         	   
         	   out.println(pair.getKey());
         	   String key =pair.getKey().toString();
         	   String disc1=(String)pair.getValue();
         	  
         	   out.println("<a href=\"comments.jsp?value="+key+"\">"+disc1+"</a>");
         	   out.println("<br>");
         	   
         	}
         	
         	
	        }catch(Exception ex){
             	System.out.println("error message"+ex.getMessage());
             	out.println("<br>");
             	out.println("<br>");
             	out.println("<br>");
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
