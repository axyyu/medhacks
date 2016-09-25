<?php
session_start();

?>
<!DOCTYPE html>
<html>

<head>
    <title>Messages</title>
    <link href="resources/css/messages.css" rel="stylesheet" type="text/css">
    <script src="resources/js/mess.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
</head>

<body>
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
                <li><a href="index.php">Home</a></li>
                <li><a href="diag.php">Diagnostic</a></li>
                <li class = "active"><a href="#" target="_blank">Connect</a></li>
            </ul>

            <?php if($_SESSION["login"]):?>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">My Account<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="history.php">History</a></li>
                            <li><a href="#">Messages</a></li>
                            <li><a href="accountinfo.php"><b>Account Info</b></a></li>
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

<?php
if(!isset($_SESSION['name'])):
?>
    <div id="wrapper">
        <div id="menu">
            <p class="welcome">Welcome, <b><?php echo $_SESSION['name']; ?></b></p>
            <p class="logout"><a id="exit" href="#">Exit Chat</a></p>
            <div style="clear:both"></div>
        </div>
        <div id="chatbox"></div>

        <form name="message" action="">
            <input name="usermsg" type="text" id="usermsg" size="63" />
            <input name="submitmsg" type="submit"  id="submitmsg" value="Send" />
        </form>
    </div>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
    <script type="text/javascript">
        // jQuery Document
        $(document).ready(function(){
        });
    </script>
    <?php
endif
?>
</body>

</html>
