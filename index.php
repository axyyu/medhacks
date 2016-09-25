<?php
session_start();
if( $_SESSION["login"])
{
    header("Location:accountinfo.php");
}

?>
<html>

<?php
// Set session variables
if(!empty($_POST['user'])) {
    $_SESSION["type"] = $_POST['type'];
    $_SESSION["username"] = $_POST["user"];
    $_SESSION["password"] = $_POST["pass"];
    $_SESSION["email"] = $_POST["email"];
    $_SESSION["sex"] = $_POST["sex"];
    $_SESSION["age"] = $_POST["Age"];
    $_SESSION["weight"] = $_POST["Weight"];
    $_SESSION["allergy"] = $_POST["Allergies"];
    $_SESSION["risk"] = $_POST["Risks"];

    $_SESSION["login"] = true;
    print_r($_POST);
}
?>

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
        <h1 class = "title"><b>me&nbsp&nbsp&nbsp</b></h1> <!--FIX THIS-->
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
                <li><a href="diag.php">Diagnostic</a></li>
                <li><a href="connect.php">Connect</a></li>
            </ul>
            <?php if($_SESSION["login"]):?>
                <ul class="nav navbar-nav navbar-right">
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">My Account<b class="caret"></b></a>
                <ul class="dropdown-menu">
                    <li><a href="history.php">History</a></li>
                    <li><a href="messages.php">Messages</a></li>
                  <li><a href="accountinfo.php">Account Info</a></li>
                </ul>
              </li>
            </ul>
            <?php else:?>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#">
                        <form method="post">
                            <input type="text" name="username" placeholder="Username" required>
                            <input type="password" name="password" placeholder="Password" required>
                            <input type="submit" value="Login">
                        </form>
                    </a></li>
            </ul>
            <?php endif ?>
        </div>
        <div>
            <?php
                if(isset($_POST['username'])) {
                    $tuser = $_POST["username"];
                    $tpass = $_POST["password"];
                    if (strcmp($tuser, $_SESSION["username"])) {
                        if (strcmp($tpass, $_SESSION["password"])) {
                            $_SESSION["login"] = true;
                            header("Location:accountinfo.php");
                        } else {
                            echo "<script>alert(\"Wrong Password!\");</script>";
                        }
                    } else {
                        echo "<script>alert(\"Wrong Username!\");</script>";
                    }
                }
            ?>
            </div>

    </div>
</div>

<div class="box2" id="boxx2">
    <img class = "logo" src="doxtal.png">
    <br>
    <h1 align="center" id="catchphrase">Connecting doctors and patients like never before.</h1>
    <button class = "begin" id="signup">Get Started</button> <!--make a purpose  for this -->
</div>

<div id = "container" style="display: none;">
    <div class = "box">
        <div id = "centerfracup">
            <div class = "box2">
                <div id = "symplist">
                    <ul>
                    </ul>
                </div>
                <h1 style="font-size:22px">Sign Up</h1>
                Account Type<br>
                <form class="signUp" id="continue_form" method="post">
                    <!-- Account Type<br> -->
                    <select class="selectText" id="type" name="type">
                        <option>Patient</option>
                        <option>Doctor</option>
                    </select><br>
                    <label>
                        <input class="nodeinput signUpColor" type="text" name="user" placeholder="Username"><br>
                    </label>
                    <label>
                        <input class="nodeinput signUpColor" type="password" name="pass" placeholder="Password"><br>
                    </label>
                    <label>
                        <input class="nodeinput signUpColor" type="password" name="confirm" placeholder="Confirm Password"><br>
                    </label>
                    <label>
                        <input class="nodeinput signUpColor" type="email" name="email" placeholder="Email"><br>
                    </label><br>
                    <label>
                        <input class="nodeinput signUpColor" id ="continue" type="submit" value="Next">
                    </label>
                </form>
            </div>
        </div>
    </div>
</div>


<div id = "container2" style="display: none;">
    <div class = "boxx">
        <div class = "select side" id="male">
            <div class="boxxx">
                <h1>Male</h1>
                <img class="pk" src="male.png" width="50" height="70">
            </div>
        </div>
        <div class = "bigspace side">
            &nbsp&nbsp
        </div>
        <div class = "select side"id="female">
            <div class="boxxx">
                <h2>Female</h2>
                <img class="pk" src="female.png" width="50" height="70">
            </div>
        </div>
        <form method="post" style="display:none;">
            <input id="chosex" name="sex" type="text">
        </form>
    </div>
</div>

<div id = "container3" style="display: none;">
    <div class = "boxxxx">
        <div class = "circle">
            <div class = "box2">
                <h1>Your age?</h1>
                <br>
                <form class = "stalone" method="post">
                    <input class="nodeinput signUpColor" id="age" type="text" name="Age" placeholder="Age"autofocus>
                </form>
            </div>
        </div>
    </div>
</div>

<div id = "container4" style="display: none;">
    <div class = "boxxxx">
        <div class = "circle">
            <div class = "box2">
                <h1>Your weight(lb)?</h1>
                <br>
                <form class = "stalone" method="post">
                    <input class="nodeinput signUpColor" id="weight" type="text" name="Weight" placeholder="Weight" autofocus>
                </form>
            </div>
        </div>
    </div>
</div>

<div id = "container5" style="display: none;">
    <div class = "boxxxx">
        <div class = "circle">
            <div class = "box2">
                <h1>Any allergies?</h1>
                <br>
                <form class = "stalone" method="post">
                    <input class="nodeinput signUpColor" id="allergy" type="text" name="Allergies" placeholder="Allergies" autofocus>
                </form>
            </div>
        </div>
    </div>
</div>

<div id = "container6" style="display: none;">
    <div class = "boxxxx">
        <div class = "circle">
            <div class = "box2">
                <h1>Any other risk factors?</h1>
                <br>
                <form class = "stalone" action="diag.php" method="post">
                    <input class="nodeinput signUpColor" id="risk" type="text" name="Risks" placeholder="Risks" autofocus>
                </form>
            </div>
        </div>
    </div>
</div>




</body>

</html>