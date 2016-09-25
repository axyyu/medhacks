<?php
session_start();

?>

<html>
<head>
    <title>Doxtal</title>
    <!-- Sources -->
    <script src="https://www.gstatic.com/firebasejs/3.4.0/firebase.js"></script>
    <script src="resources/js/jquery.js"></script>
    <script src="resources/js/scripts.js"></script>
    <script src="resources/js/bootstrap.js"></script>
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
                <li><a href="index.php">Home</a></li>
                <li><a href="diag.php">Diagnostic</a></li>
                <li class="active"><a href="#">Connect</a></li>
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
            <?php endif ?>
        </div>
    </div>
</div>

<!--Important Part-->
<div>
    <?php
    echo $_SESSION["type"];
    echo $_SESSION["username"];
    echo $_SESSION["password"];
    echo $_SESSION["email"];
    echo $_SESSION["sex"];
    echo $_SESSION["age"];
    echo $_SESSION["weight"];
    echo $_SESSION["allergy"];
    echo $_SESSION["risk"];

    echo $_SESSION["login"];
?>
</div>


</body>

</html>