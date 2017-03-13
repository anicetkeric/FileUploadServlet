package org.file.upload.utils;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.google.gson.Gson;


public class FileUploadHandler extends HttpServlet{

	
	private static final long serialVersionUID = 1L;
	
	private final String UPLOAD_DIRECTORY = "<your directory>";
	  
	  
	   
	    @Override
	    protected void doPost(HttpServletRequest request, HttpServletResponse response)
	            throws ServletException, IOException {
	    
	    	
	    	 String json="";
		
		
			 
	        //process only if its multipart content
	        if(ServletFileUpload.isMultipartContent(request)){
	            try {
	                @SuppressWarnings("unchecked")
					List<FileItem> multiparts = new ServletFileUpload(
	                                         new DiskFileItemFactory()).parseRequest(request);
	              
	                for(FileItem item : multiparts){
	                    if(!item.isFormField()){
	                        String name = new File(item.getName()).getName();	                        
	                        
	                        item.write( new File(UPLOAD_DIRECTORY + File.separator + name));
	                    }
	                }
	           
					
					 json = new Gson().toJson("Succes");  
	                
	           
	            } catch (Exception ex) {
	            	
	               json = new Gson().toJson( "Download File Failure. Error:  " + ex);
	            }          
	         
	        }else{
	            json = new Gson().toJson("Sorry we could not download the file");
	        }
	      
	        response.setContentType("application/json");
			 response.getWriter().write(json);
	     
	    }
	
}
