/**
 * Created by andre on 9/24/2016.
 */
$(document).ready(function(){

    $("#container").hide();

    $("#container2").hide();
    $("#signup").click(function()
    {
        $("#container").show();
        $("#boxx2").hide();
    });
    $("#continue").click(function()
    {
        $("#container").hide();
        $("#container2").show();
    });
    $("#continue").click(function()
    {
        $("#container").hide();
        $("#container2").show();
    });
    $('#age').keypress(function (e) {
        if (e.which == 13) {
            return false;    //<---- Add this line
        }
    });
    $('#weight').keypress(function (e) {
        if (e.which == 13) {
            return false;    //<---- Add this line
        }
    });
});