/**
 * Created by ANICET ERIC KOUAME on 05/03/2017.
 */

var ROOT_URL="http://localhost:8088/org.file.upload.js/";

$(document).ready(function () {


    $("#submit-btn").click(function () {

        beforeSubmit();
    });

});




//function to check file size before uploading.
function beforeSubmit() {

    $('#output').html("<b class='text-center'><img src='images/ajax-loader.gif' alt='' /> In progress...</b>");


    //check whether browser fully supports all File API
    if (window.File && window.FileReader && window.FileList && window.Blob) {

        if (!$('#imageInput').val()) //check empty input filed
        {
            $("#output").html("Select file !!!!!!");
            return false
        }

        var fsize = $('#imageInput')[0].files[0].size; //get file size
        var ftype = $('#imageInput')[0].files[0].type; // get file type

        
        //Allowed file size is less than 1 MB (1048576)
        if (fsize > 1048576) {
            $("#output").html("<b>" + bytesToSize(fsize) + "</b> Too big Image file! <br />Please reduce the size of your photo using an image editor.");
            return false
        }
        

        upload();
    }
    else {
        //Output error to older unsupported browsers that doesn't support HTML5 File API
        $("#output").html("Please upgrade your browser, because your current browser lacks some new features we need!!");
        return false;
    }
}

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



function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


