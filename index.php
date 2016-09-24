<html>
<head>
    <title>Doxtal</title>
    <!-- Sources -->
    <script src="https://www.gstatic.com/firebasejs/3.4.0/firebase.js"></script>
    <script src="resources/js/jquery.js"></script>
    <script src="resources/js/home.js"></script>
    <script src="resources/js/bootstrap.js"></script>

    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap-theme.css">
    <link rel="stylesheet" type="text/css" href="resources/css/mystyle.css">

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
                <li class="active"><a href="#">Home</a></li>
                <li><a href="daig.php">Diagnostic</a></li>
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

<div class="box2" id="boxx2">
    <img class = "logo" src="doxtal.png">
    <br>
    <button class = "begin" id="signup">Get Started</button> <!--make a purpose for this -->
</div>

<div id = "container">
    <div class = "box">
        <div id = "centerfracup">
            <div class = "box2">
                <div id = "symplist">
                    <ul>
                    </ul>
                </div>
                <h1 style="font-size:22px">Sign Up</h1>
                Account Type<br>
                <form class="signUp">
                    <!-- Account Type<br> -->
                    <select class="selectText" id="type">
                        <option>Patient</option>
                        <option>Doctor</option>
                    </select><br>
                    <label>
                        <input class="nodeinput signUpColor" type="text" name="user" placeholder="Username"><br>
                    </label>
                    <label>
                        <input class="nodeinput signUpColor" type="text" name="pass" placeholder="Password"><br>
                    </label>
                    <label>
                        <input class="nodeinput signUpColor" type="text" name="confirm" placeholder="Confirm Password"><br>
                    </label>
                    <label>
                        <input class="nodeinput signUpColor" type="email" name="email" placeholder="Email"><br>
                    </label><br>
                    <label>
                        <input class="nodeinput signUpColor" id ="continue" type="submit" value="Continue">
                    </label>
                </form>
            </div>
        </div>
    </div>
</div>


<div id = "container2">
    <div class = "box">
        <div class = "select side">
            <h1>Male</h1>
        </div>

        <div class = "select side">
            <h2>Female</h2>
        </div>
    </div>
</div>




</body>

</html>