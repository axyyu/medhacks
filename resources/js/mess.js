/**
 * Created by andre on 9/25/2016.
 */
$(document).ready(function() {
    //If user wants to end session
    $("#exit").click(function () {
        var exit = confirm("Are you sure you want to end the session?");
        if (exit == true) {
            window.location = 'index.php?logout=true';
        }
    });
});