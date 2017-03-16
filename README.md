# FileUploadServlet
Java Servlet  File Upload with jQuery 


# Overview

There are many ways to upload the file to the server. this is simple example project that demonstrates how to implement file upload functionality based on Apache Common FileUpload API, servlet with jquery.

## JAVA
###Maven Dependencies
```xml
<!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload -->
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.2.2</version>
</dependency>

    <!-- https://mvnrepository.com/artifact/commons-io/commons-io -->
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.5</version>
</dependency>
    
   <!-- https://mvnrepository.com/artifact/com.google.code.gson/gson -->
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.6.2</version>
</dependency>


```

### Back-end
```java
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
```

### Front-end

```javascript

function upload() {


    var fileUpload = $('#imageInput').get(0);
      
    var files = fileUpload.files;
    
    var data = new FormData();
    for (var i = 0; i < files.length; i++) {
        data.append(files[i].name, files[i]);
    }
   
    $.ajax({
    	 type: "POST",
	        contentType:"application/x-www-form-urlencoded; charset=UTF-8",
	        url:ROOT_URL+"/uploadServlet",
	        data: data,
	        contentType: false,
	        processData: false,
	        
        success: function (r) {
        	
        	$("#output").empty();
             $("#output").html(r);
	

        },
        error: function (err) {
        	 $("#output").empty();
             $("#output").html("Error to upload file!!");
        }
    });
}

```
