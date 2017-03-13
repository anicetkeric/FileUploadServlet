<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>File upload</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script type="text/javascript" src="jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="script.js"></script>
</head>
<body>
<div id="upload-wrapper">
    <div align="center">
        <h3>Java Servlet  File Upload with jQuery </h3>
        <form onSubmit="return false" method="post" enctype="multipart/form-data" id="MyUploadForm">
            <input name="image_file" id="imageInput" type="file" />
            <input type="submit"  id="submit-btn" value="Upload" />
            <img src="images/ajax-loader.gif" id="loading-img" style="display:none;" alt="Please Wait"/>
        </form>
        <div id="progressbox" style="display:none;"><div id="progressbar"></div><div id="statustxt">0%</div></div>
        <div id="output"></div>
    </div>
</div>

<!-- /container -->


</body>
</html>