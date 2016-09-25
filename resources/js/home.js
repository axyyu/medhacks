/**
 * Created by andre on 9/24/2016.
 */
/*
$("#container").hide();
$("#container3").hide();
$("#container4").hide();
$("#container5").hide();
$("#container6").hide();
$("#container2").hide();
*/
$(document).ready(function(){

    $("#signup").click(function()
    {
        $("#container").show();
        $("#boxx2").hide();
    });
    $("#continue_form").submit(function(e)
    {
        $("#container").hide();
        $("#container2").show();
        return false;
    });
    $("#male").click(function()
    {
        $("#container2").hide();
        $("#container3").show();
        document.getElementById("chosex").innerHTML = "man";
    });
    $("#female").click(function()
    {
        $("#container2").hide();
        $("#container3").show();
        document.getElementById("chosex").innerHTML = "woman";
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