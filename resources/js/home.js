/**
 * Created by andre on 9/24/2016.
 */
$(document).ready(function(){

    $("#container").hide();
    $("#container3").hide();
    $("#container4").hide();
    $("#container5").hide();
    $("#container6").hide();
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
    $("#male").click(function()
    {
        $("#container2").hide();
        $("#container3").show();
    });
    $("#female").click(function()
    {
        $("#container2").hide();
        $("#container3").show();
    });
    $('#age').keypress(function (e) {
        if (e.which == 13) {
            $("#container3").hide();
            $("#container4").show();
            return false;    //<---- Add this line
        }
    });
    $('#weight').keypress(function (e) {
        if (e.which == 13) {
            $("#container4").hide();
            $("#container5").show();
            return false;    //<---- Add this line
        }
    });
    $('#allergy').keypress(function (e) {
        if (e.which == 13) {
            $("#container5").hide();
            $("#container6").show();
            return false;    //<---- Add this line
        }
    });
});