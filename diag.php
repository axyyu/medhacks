<html>
<head>
    <title>Doxtal</title>
    <!-- Sources -->
    <script src="https://www.gstatic.com/firebasejs/3.4.0/firebase.js"></script>
    <script src="resources/js/jquery.js"></script>
    <script src="resources/js/dscripts.js"></script>
    <script src="resources/js/bootstrap.js"></script>
    <script src="resources/js/npm.js"></script>
    <link rel="stylesheet" type="text/css" href="resources/css/mystyle.css">
    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap-theme.css">

    <script>
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDifaAcxog3tTMMvQoLz1leAr_Vh9Uq9Ms",
            authDomain: "webhacks-caade.firebaseapp.com",
            databaseURL: "https://webhacks-caade.firebaseio.com",
            storageBucket: "",
            messagingSenderId: "267096838240"
        };
        firebase.initializeApp(config);
    </script>
</head>
<body>
<!--
    <div id = "header">
        <div id = "logo">
            <h1 class = "title">doxtal.</h1>
            <h1 class = "title"><b>me</b></h1>
        </div>
        <div id = "signbut">
            <button class = "signin" id="login">Login</button>
            <button class = "signin" id="register">Register</button>
        </div>
    </div>
    -->

<div class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
        <h1 class = "title">doxtal.</h1>
        <h1 class = "title"><b>me</b></h1> <!--FIX THIS-->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <!-- <a class="navbar-brand" href="#">Doxtal<</a> -->
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-left">
                <li ><a href="index.php">Home</a></li>
                <li class="active"><a href="#">Diagnostic</a></li>
                <li><a href="connect.php">Connect</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#">
                        <form>
                            <input type="text" name="username" placeholder="Username" required>
                            <input type="password" name="password" placeholder="Password" required>
                            <input type="submit" value="Login">
                        </form>
                    </a></li>
            </ul>
        </div>
    </div>
</div>

<!--Important Part-->
<div id = "container">
    <div class = "box">
        <div id = "centerfrac">
            <div class = "box2">
                <div id = "symplist">
                    <ul>
                    </ul>
                </div>
                <p id = "symp">Enter your symptom here:</p>
                <form method="post">
                <input class = "nodeinput" type="text" name="symptom">
                    </form>
                <br class="buttonbreak">
                <button id = "plus">+</button>
            </div>
        </div>
    </div>
</div>

<?php

    $symptom = $_POST['symptom'];
    //$curl = curl_init("https://api.infermedica.com/v2/search?phrase=headache");
    /*
    $curl = curl_init();
    // Set some options - we are passing in a useragent too here
    curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => 'https://api.infermedica.com/v2/search?phrase='.$symptom,
    CURLOPT_USERAGENT => 'Test Request',
    APP_ID => '88252933',
        app_id => '88252933',
    APP_KEY => 'dd0c08c097535c3dfc37c8a18aa7e938',
        app_key => 'dd0c08c097535c3dfc37c8a18aa7e938'
    ));
    // Send the request & save response to $resp
    $resp = curl_exec($curl);
    // Close request to clear up some resources
    curl_close($curl);

    echo "<p>".$resp."</p>";
    */
    //$cmd='curl -v -H\'app_id: 88252933\' -H\'app_key: dd0c08c097535c3dfc37c8a18aa7e938\' https://api.infermedica.com/v2/info';
    $cmd = 'curl -X GET  --header \"app_id: 88252933\" --header \"app_key: dd0c08c097535c3dfc37c8a18aa7e938\" \"https://api.infermedica.com/v2/symptoms\"';
    //$cmd = 'curl -X GET --header \"Accept: application/json\" --header \"app_id: 88252933\" --header \"app_key: dd0c08c097535c3dfc37c8a18aa7e938\" \"https://api.infermedica.com/v2/search?phrase=headache\"';
    exec($cmd,$result);

    echo '<pre>';
        print_r($result);
    echo '</pre>';

?>


</body>

</html>