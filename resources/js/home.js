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
        $.ajax({
            type: "POST",
            data:  $("#continue_form").serialize(),

            success: function(data){

                $('.php').html(data);

            }
        });
        $("#container").hide();
        $("#container3").hide();
        $("#container4").hide();
        $("#container5").hide();
        $("#container6").hide();
        $("#container2").show();
        return false;
    });
    $("#male").click(function()
    {

        document.getElementById("chosex").innerHTML = "man";
        $.ajax({
            type: "POST",
            data:  $("#pickmw").serialize(),

            success: function(data){

                $('.php').html(data);

            }
        });
        $("#container").hide();
        $("#container3").show();
        $("#container4").hide();
        $("#container5").hide();
        $("#container6").hide();
        $("#container2").hide();
    });
    $("#female").click(function()
    {

        document.getElementById("chosex").innerHTML = "woman";
        $.ajax({
            type: "POST",
            data:  $("#pickmw").serialize(),

            success: function(data){

                $('.php').html(data);

            }
        });
        $("#container").hide();
        $("#container3").show();
        $("#container4").hide();
        $("#container5").hide();
        $("#container6").hide();
        $("#container2").hide();
    });
    $('#age').keypress(function (e) {
        if (e.which == 13) {
            dat = document.getElementById("age").value;
            $.ajax({
                type: "POST",
                data:  dat,

                success: function(data){

                    $('.php').html(data);

                }
            });
            $("#container").hide();
            $("#container3").hide();
            $("#container4").show();
            $("#container5").hide();
            $("#container6").hide();
            $("#container2").hide();
            return false;    //<---- Add this line
        }
    });
    $('#weight').keypress(function (e) {
        if (e.which == 13) {
            dat = document.getElementById("weight").value;
            $.ajax({
                type: "POST",
                data:  dat,

                success: function(data){

                    $('.php').html(data);

                }
            });
            $("#container").hide();
            $("#container3").hide();
            $("#container4").hide();
            $("#container5").show();
            $("#container6").hide();
            $("#container2").hide();
            return false;    //<---- Add this line
        }
    });
    $('#allergy').keypress(function (e) {
        if (e.which == 13) {
            dat = document.getElementById("allergy").value;
            $.ajax({
                type: "POST",
                data:  dat,

                success: function(data){

                    $('.php').html(data);

                }
            });
            $("#container").hide();
            $("#container3").hide();
            $("#container4").hide();
            $("#container5").hide();
            $("#container6").show();
            $("#container2").hide();
            return false;    //<---- Add this line
        }
    });
    $('#risk').keypress(function (e)
    {
        if(e.which == 13)
        {
            dat = document.getElementById("risk").value;
            $.ajax({
                type: "POST",
                data:  dat,

                success: function(data){

                    $('.phpr').html(data);

                }
            });
            $("#container").hide();
            $("#container3").hide();
            $("#container4").hide();
            $("#container5").hide();
            $("#container6").hide();
            $("#container2").hide();
        }
    });

});