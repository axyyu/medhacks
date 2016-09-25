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
        $("#container2").hide();
        $("#container3").show();
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
        $("#container2").hide();
        $("#container3").show();
    });
    $('#age').keypress(function (e) {
        if (e.which == 13) {

            $.ajax({
                type: "POST",
                data:  $("#aform").serialize(),

                success: function(data){

                    $('.php').html(data);

                }
            });
            $("#container3").hide();
            $("#container4").show();
            return false;    //<---- Add this line
        }
    });
    $('#weight').keypress(function (e) {
        if (e.which == 13) {

            $.ajax({
                type: "POST",
                data:  $("#wform").serialize(),

                success: function(data){

                    $('.php').html(data);

                }
            });
            $("#container4").hide();
            $("#container5").show();
            return false;    //<---- Add this line
        }
    });
    $('#allergy').keypress(function (e) {
        if (e.which == 13) {

            $.ajax({
                type: "POST",
                data:  $("#gform").serialize(),

                success: function(data){

                    $('.php').html(data);

                }
            });
            $("#container5").hide();
            $("#container6").show();
            return false;    //<---- Add this line
        }
    });
    $('#risk').keypress(function (e)
    {
        if(e.which == 13)
        {
            $.ajax({
                type: "POST",
                data:  $("#rform").serialize(),

                success: function(data){

                    $('.phpr').html(data);

                }
            });
        }
    });

});