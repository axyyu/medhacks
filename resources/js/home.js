/**
 * Created by andre on 9/24/2016.
 */
$(document).ready(function(){

    $("#container").hide();

    $("#container2").hide();
    $("#signup").click(function()
    {
        $("#container").show();
        $(".boxx2").hide();
    });
    $("#continue").click(function()
    {
        $("#container2").show();
        $("#container").hide();
    });
});