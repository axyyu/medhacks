<?php
session_start();

?>
<html>
<head>
    <title>Doxtal</title>
    <!-- Sources -->
    <script src="https://www.gstatic.com/firebasejs/3.4.0/firebase.js"></script>
    <script src="resources/js/jquery.js"></script>
    <!--     <script src="resources/js/diag.js"></script>
     --><datalist id="symptoms">
        <option value="Abdominal pain">
        <option value="Anxiety">
        <option value="Back pain">
        <option value="Burning eyes">
        <option value="Burning eyes">
        <option value="Burning in the throat">
        <option value="Cheek swelling">
        <option value="Chest pain">
        <option value="Chest tightness">
        <option value="Chills">
        <option value="Cold sweats">
        <option value="Cough">
        <option value="Dizziness">
        <option value="Drooping eyelid">
        <option value="Dry eye">
        <option value="Earache">
        <option value="Early satiety">
        <option value="Eye pain">
        <option value="Eye redness">
        <option value="Fast, deepened breathing">
        <option value="Feeling of foreign body in the eye">
        <option value="Fever">
        <option value="Going black before the eyes">
        <option value="Headache">
        <option value="Heartburn">
        <option value="Hiccups">
        <option value="Hot flushes">
        <option value="Increased thirst">
        <option value="Itching eyes">
        <option value="Itching in the nose">
        <option value="Lip swelling">
        <option value="Memory gap">
        <option value="Menstruation disorder">
        <option value="Missed period">
        <option value="Nausea">
        <option value="Neck pain">
        <option value="Nervousness">
        <option value="Night cough">
        <option value="Pain in the limbs">
        <option value="Pain on swallowing">
        <option value="Palpitations">
        <option value="Paralysis">
        <option value="Reduced appitite">
        <option value="Runny nose">
        <option value="Shortness of breath">
        <option value="Skin rash">
        <option value="Sleeplessness">
        <option value="Sneezing">
        <option value="Sore throat">
        <option value="Sputum">
        <option value="Stomach burning">
        <option value="Stuffy nose">
        <option value="Sweating">
        <option value="Swollen glands in the armpits">
        <option value="Swollen glands on the neck">
        <option value="Tears">
        <option value="Tiredness">
        <option value="Tremor at rest">
        <option value="Unconsciousness, short">
        <option value="Vomiting">
        <option value="Vomitting blood">
        <option value="Weight gain">
        <option value="Weakness or numbness">
        <option value="Wheezing">
    </datalist>
    <script src="resources/js/scripts.js"></script>
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
                <li><a href="connectt.php" target="_blank">Connect</a></li>
            </ul>
            <?php if($_SESSION["login"]):?>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">My Account<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="history.php">History</a></li>
                            <li><a href="messages.php" target="_blank">Messages</a></li>
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
<div id = "container">
    <div class = "box">
        <div id = "centerfrac">
            <div class = "box2">
                <div id = "symplist">
                    <ul id = "symul">
                    </ul>
                </div>
                <div id="inpbox">
                    <p id = "symp">Enter your symptom here:</p>
                    <input id="symtext" class = "nodeinput" type="text" name="symptom" list="symptoms" autocomplete="off">
                    <br class="buttonbreak">
                </div>
                <button id = "plus">+</button>
            </div>
        </div>
    </div>
    <div class="disease1" style="display: none;">
        <div id="frac2">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                 <br>

                <br class="buttonbreak">
                <button class="diseasebut"id = "expand1">+</button>
            </div>
        </div>
    </div>
    <div class="disease2" style="display: none;">
        <div id="frac2">
            <div class="dname1">
                <div id = "dinfo2">

                </div>
                 <br>

                <br class="buttonbreak">
                <button class="diseasebut"id = "expand2">+</button>
            </div>
        </div>
    </div>
    <div class="disease3" style="display: none;">
        <div id="frac2">
            <div class="dname1">
                <div id = "dinfo1">
                </div>
                 <br>

                <br class="buttonbreak">
                <button class="diseasebut"id = "expand3">+</button>
            </div>
        </div>
    </div>
    <div class="disease4" style="display: none;">
        <div id="frac2">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                 <br>

                <br class="buttonbreak">
                <button class="diseasebut"id = "expand4">+</button>
            </div>
        </div>
    </div>
    <div class="disease5" style="display: none;">
        <div id="frac2">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                 <br>

                <br class="buttonbreak">
                <button class="diseasebut"id = "expand5">+</button>
            </div>
        </div>
    </div>
    <div class="disease6" style="display: none;">
        <div id="frac2">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                 <br>

                <br class="buttonbreak">
                <button class="diseasebut"id = "expand6">+</button>
            </div>
        </div>
    </div>
    <div class="contact1" id="1" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                Contact a doctor
            </div>
        </div>
    </div>
    <div class="contact2" id="2" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                Prescription
            </div>
        </div>
    </div>
    <div class="contact3" id="3" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                Contact a doctor
            </div>
        </div>
    </div>
    <div class="contact4" id="4" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                Prescription
            </div>
        </div>
    </div>
    <div class="contact5" id="5" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                Contact a doctor
            </div>
        </div>
    </div>
    <div class="contact6" id="6" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                Prescription
            </div>
        </div>
    </div>
    <div class="contact7" id="9" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                Contact a doctor
            </div>
        </div>
    </div>
    <div class="contact8" id="10" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                Prescription
            </div>
        </div>
    </div>
    <div class="contact9" id="7" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                Contact a doctor
            </div>
        </div>
    </div>
    <div class="contact10" id="8" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                Prescription
            </div>
        </div>
    </div>
    <div class="contact11" id="11" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                Contact a doctor
            </div>
        </div>
    </div>
    <div class="contact12" id="12" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>
                Prescription
            </div>
        </div>
    </div>
</div>



</body>
</html>
