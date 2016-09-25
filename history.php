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
    <script src="resources/js/npm.js"></script>

    <link rel="stylesheet" type="text/css" href="resources/css/mystyle.css">
    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap-theme.css">
    <link rel="stylesheet" type="text/css" href="resources/css/infostyle.css">

    <script>

        //Check if pass and confirm pass match
        function check(input) {
            if (input.value != document.getElementById('password').value) {
                input.setCustomValidity('Password Must be Matching.');
            } else {
                // input is valid -- reset the error message
                input.setCustomValidity('');
            }
        }
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

<!-- Navbar -->

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
                <li><a href="#">Home</a></li>
                <li><a href="diag.php">Diagnostic</a></li>
                <li><a href="connectt.php" target="_blank">Connect</a></li>
            </ul>
            <?php if($_SESSION["login"]):?>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">My Account<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="history.php">History</a></li>
                            <li><a href="messages.php" target="_blank">Messages</a></li>
                            <li><a href="#"><b>Account Info</b></a></li>
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
    </div>
</div>

<!-- body start -->

<div id = "container">
    <div class = "box">
        <div id = "centerfrac">
            <div class = "box2a">
                <h1>History</h1><br>
            </div>
            <div id = "dinfo2">
                And risk factors of family
            </div>
        </div>
    </div>
</div>

<div class="disease3a">
    <div id="frac2a">
        <div class="dname1a">
            <h2>Cancer</h2> <br>
        </div>
        <div id = "dinfo1">
            <form method="post">
                <?php
                    if($_SESSION["cancer"])
                    {
                        echo "<input class = \"cbox\" type=\"checkbox\" name=\"cancer\" value=\"Cancer\" checked>";
                    }
                    else
                    {
                        echo "<input class = \"cbox\" type=\"checkbox\" name=\"cancer\" value=\"Cancer\">";
                    }
                ?>
                <br>

            </form>
            <?php
                if(!empty($_POST["cancer"]))
                {
                    $_SESSION["cancer"] = true;
                }

            ?>
        </div>
    </div>
</div>

<div class="disease4a">
    <div id="frac2a">
        <div class="dname1a">
            <h2>Diabetes</h2><br>

        </div>
        <div id = "dinfo1">
            <form method="post">
                <?php
                if($_SESSION["diabetes"])
                {
                    echo "<input class = \"cbox\" type=\"checkbox\" name=\"diabetes\" value=\"Diabetes\" checked>";
                }
                else
                {
                    echo "<input class = \"cbox\" type=\"checkbox\" name=\"diabetes\" value=\"Diabetes\">";
                }
                ?>
                <br>

            </form>
            <?php
            if(!empty($_POST["diabetes"]))
            {
                $_SESSION["diabetes"] = true;
            }

            ?>
        </div>
    </div>
</div>

<div class="disease5a">
    <div id="frac2a">
        <div class="dname1a">
            <h2>Heart <br> Attack</h2><br>

        </div>
        <div id = "dinfo1">
            <form method="post">
                <?php
                if($_SESSION["heart"])
                {
                    echo "<input class = \"cbox\" type=\"checkbox\" name=\"heart\" value=\"Heart\" checked>";
                }
                else
                {
                    echo "<input class = \"cbox\" type=\"checkbox\" name=\"heart\" value=\"Heart\">";
                }
                ?>
                <br>

            </form>
            <?php
            if(!empty($_POST["heart"]))
            {
                $_SESSION["heart"] = true;
            }

            ?>
        </div>
    </div>
</div>

<div class="disease6a">
    <div id="frac2a">
        <div class="dname1a">
            <h2>Obesity</h2><br>
        </div>
        <div id = "dinfo1">
            <form method="post">
                <?php
                if($_SESSION["obesity"])
                {
                    echo "<input class = \"cbox\" type=\"checkbox\" name=\"obesity\" value=\"Obese\" checked>";
                }
                else
                {
                    echo "<input class = \"cbox\" type=\"checkbox\" name=\"obesity\" value=\"Obese\">";
                }
                ?>
                <br>

            </form>
            <?php
            if(!empty($_POST["obesity"]))
            {
                $_SESSION["obesity"] = true;
            }

            ?>
        </div>
    </div>
</div>
</body>

</html>