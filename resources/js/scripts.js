var bootest = true;

$(document).ready(function()
{
    $('#inpbox').val('');

    var a = 0;
    $("#plus").click(function(){
      if(document.getElementById("symtext").value!='')
      {
      checkFunction(bootest);
    }
    });
    $(".diseasebut").click(function(){
      var txt = $(this).attr('id');
      var num = txt.charAt(txt.length-1);
      var num1 = 2*num -1;
      var num2 = 2*num;
      fadeOutOthers(num1,num2);
      $("#"+num1).fadeToggle(500);
      $("#"+num2).fadeToggle(1000);
    });


});
function fadeOutOthers(x, y)
{
  for(i=0; i<13; i++)
  {
    if(i!=x && i!=y)
    {
      $("#"+i).fadeOut(500);
    }
  }
}
function checkFunction(boo)
{
  if(bootest)
  {
    $(".disease1").fadeIn(500);
    $(".disease5").fadeIn(1000);
    $(".disease3").fadeIn(1500);
    $(".disease2").fadeIn(2000);
    $(".disease6").fadeIn(2000);
    $(".disease4").fadeIn(2000);
    $("#inpbox").hide();
    var list = document.getElementById("symul");
    var newsymp = document.getElementById("symtext").value;
    var prev = $("#symul").html();
    list.innerHTML = prev+"<li>"+newsymp+"</li";
    bootest = false;
  }
  else {
    $(".disease1").fadeOut(500);
    $(".disease5").fadeOut(1000);
    $(".disease3").fadeOut(1500);
    $(".disease2").fadeOut(2000);
    $(".disease6").fadeOut(2000);
    $(".disease4").fadeOut(2000);
    $('#inpbox').val('');
    $("#inpbox").show();
    bootest=true;
  }

}
