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
        <option value="Back pain">
        <option value="Chest pain">
        <option value="Otalgia">
        <option value="Headache">
        <option value="Chronic pelvic pain">
        <option value="Toothache">
        <option value="Vaginal pain">
        <option value="Rectal pain">
        <option value="Dermatomal pain">
        <option value="Chills">
        <option value="Fever">
        <option value="Paresthesia">
        <option value="Light-headed">
        <option value="Dizzy">
        <option value="Dry mouth">
        <option value="Nausea">
        <option value="Sick">
        <option value="Short of breath">
        <option value="Sleepy">
        <option value="Fatigue">
        <option value="Sweaty">
        <option value="Thirsty">
        <option value="Tired">
        <option value="Weak">
        <option value="Hearing difficulty">
        <option value="Urine issues">
        <option value="Blurred vision">
        <option value="Double vision">
        <option value="Insomnia">
        <option value="Difficulty of smell">
        <option value="Excess sweat">
        <option value="Speach impedament">
        <option value="Swallow normally">
        <option value="Balance">
        <option value="Difficulty writing">
        <option value="Pyrexia">
        <option value="Loss of appetite">
        <option value="Weight gain">
        <option value="Muscle weakness">
        <option value="Brusing">
        <option value="Epistaxis">
        <option value="Tremor">
        <option value="Muscle cramps">
        <option value="Convulsions">
        <option value="Tinnitus">
        <option value="Vertigo">
        <option value="Passing out/Faintng (syncope)">
        <option value="Hypothemia">
        <option value="Hyperthemia">
        <option value="Bleeding">
        <option value="Discharge">
        <option value="Swelling">
        <option value="Deformity">
        <option value="Depression">
        <option value="Psychological symptom">
        <option value="Paralysis">
        <option value="Hallucination">
        <option value="Confusion">
        <option value="Paranoia">
        <option value="Anxiety">
        <option value="Anorexia">
        <option value="Bloating">
        <option value="Belching">
        <option value="Constipation">
        <option value="Diarrhea">
        <option value="Vomiting">
        <option value="Dysphagia">
        <option value="Dyspepsia">
        <option value="Vomiting of blood(haematemesis)">
        <option value="Painful swallowing (odynophagia)">
        <option value="Difficulty walking (claudication)">
        <option value="Irregular heartbeat (palpitation)">
        <option value="Abnormal heart rate">
        <option value="Cough">
        <option value="Sneeze">
        <option value="Runny nose">
        <option value="Blister">
        <option value="Rash">
        <option value="Itching">
        <option value="Abrasion">
        <option value="Laceration">
        <option value="Wheezing">
        <option value="Infertillity">
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
                <li><a href="connectt.php">Connect</a></li>
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

            </div>
        </div>
    </div>
    <div class="contact2" id="2" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>

            </div>
        </div>
    </div>
    <div class="contact3" id="3" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>

            </div>
        </div>
    </div>
    <div class="contact4" id="4" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>

            </div>
        </div>
    </div>
    <div class="contact5" id="5" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>

            </div>
        </div>
    </div>
    <div class="contact6" id="6" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>

            </div>
        </div>
    </div>
    <div class="contact7" id="9" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>

            </div>
        </div>
    </div>
    <div class="contact8" id="10" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>

            </div>
        </div>
    </div>
    <div class="contact9" id="7" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>

            </div>
        </div>
    </div>
    <div class="contact10" id="8" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>

            </div>
        </div>
    </div>
    <div class="contact11" id="11" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>

            </div>
        </div>
    </div>
    <div class="contact12" id="12" style="display: none;">
        <div id="frac3">
            <div class="dname1">
                <div id = "dinfo1">

                </div>

            </div>
        </div>
    </div>
</div>



</body>
</html>
