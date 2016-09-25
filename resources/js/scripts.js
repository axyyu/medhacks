var bootest = true;
var map = {}
map["Wheezing"] = ["Inflammatory disease of the airways", "Inflammation of the bronchi","Hypersensitivity reaction","Croup","Foreign object in the airways/respiratory tract"];
map["Weakness or numbness"] = ["Stroke: General practice, Internal medicine, Neurology","Disseminated sclerosis: General practice, Neurology"];
map["Weight gain"] = ["Eating disorder: General practice, Psychiatry","Sleeping disorder: General practice, Neurology","Depression: General practice, Psychiatry","Constipation: Gastroenterology, General practice, Internal medicine","Lack of supply of thyroid hormones: Endocrinology, General practice, Internal medicine", "Water accumulation in the tissue: General practice, Interal medicine"];
map["Vomiting blood"] = ["Stomach bleeding: Gastroenterology, General practice","Nosebleed: General practice, Otolaryngology","Stomach ulcer: Gastroenterology, General practice","Enlarged veins of the esophagus: Gastroenterology, General practice, Internal medicine", "Reflux disease: Gastroenterology, General practice","Inflammation of the stomach: Gastroenterology, General practice"];
map["Vomiting"] = ["Food poisioning: Gernal practice, Internal medicine", "Stomach flu: General practice, Internal medicine","Migraine: General practice, Internal medicine, Neurology", "Poisoning: Interal medicine, General practice,", "Inflammation of the appendix: General practice, Internal medicine, Surgery","Motion sickness: General practice"];
map["Unconsciousness, short"] = 144;
map["Tremor at rest"] = 115;
map["Tiredness"] = 16;
map["Tears"] = 211;
map["Swollen glands on the neck"] = 169;
map["Swollen glands in the armpits"] = 248;
map["Sweating"] = 138;
map["Stuffy nose"] = ["Flu: General practice, Internal medicine","Cold: General practice","Inflammation of the nose and throat: General practice, Otolaryngology","Hay fever: Allergology, General practice, Otolaryngology", "Smoking: General practice"];
map["Stomach burning"] = 179;
map["Sputum"] = 64;
map["Sore throat"] = ["Inflammation of the nose and throat: General practice, Otolaryngology","Cold: General practice", "Flu: General practice, Internal medicine", "Inflammation of the tonsils: General practice, Internal medicine","Abscess of tonsils: General practice, Internal medicine, Otolaryngology","Reflux disease: Gastroenterology, General practice"];
map["Sneezing"] = ["Flu: General practice, Internal medicine","Cold: General practice","Hay fever: Allergology, General practice, Otolaryngology"];
map["Sleeplessness"] = 52;
map["Skin rash"] = 124;
map["Shortness of breath"] = 29;
map["Runny nose"] = 14;
map["Reduced appetite"] = 54;
map["Paralysis"] = 140;
map["Palpitations"] = 37;
map["Pain on swallowing"] = 203;
map["Pain in the limbs"] = 12;
map["Night cough"] = 133;
map["Nervousness"] = 114;
map["Neck pain"] = 136;
map["Nausea"] = 44;
map["Missed period"] = 123;
map["Menstruation disorder"] = 112;
map["Memory gap"] = 235;
map["Lip swelling"] = 35;
map["Itching in the nose"] = 96;
map["Itching eyes"] = 73;
map["Increased thirst"] = 40;
map["Hot flushes"] = 149;
map["Hiccups"] = 122;
map["Heartburn"] = 45;
map["Headache"] = 9;
map["Going black before the eyes"] = 57;
map["Fever"] = 11;
map["Feeling of foreign body in the eye"] = 76;
map["Fast, deepened breathing"] = 153;
map["Eye redness"] = 33;
map["Eye pain"] = 287;
map["Early satiety"] = 92;
map["Earache"] = 87;
map["Dry eye"] = 273;
map["Drooping eyelid"] = 244;
map["Dizziness"] = 207;
map["Cough"] = 15;
map["Cold sweats"] = 139;
map["Chills"] = 175;
map["Chest tightness"] = 31;
map["Chest pain"] = 17;
map["Cheek swelling"] = 170;
map["Burning in the throat"] = 46;
map["Burning eyes"] = 75;
map["Back pain"] = 104;
map["Anxiety"] = 238;
map["Abdominal pain"] = 10;


$(document).ready(function()
{
    $('#inpbox').val('');

    var a = 0;
    $("#plus").click(function(){

      $("#symul").css({
    fontSize: 30
    });

      if(document.getElementById("symtext").value!='')
      {
        var s=$("#symtext").val();
        document.getElementById("d1").innerHTML = map[s][0];
        document.getElementById("d5").innerHTML = map[s][1];
        document.getElementById("d3").innerHTML = map[s][2];

        if(map[s][3]!=null){document.getElementById("d2").innerHTML = map[s][3];}
      else{
        document.getElementById("d2").innerHTML = null;}
        if(map[s][4]!=null){document.getElementById("d6").innerHTML = map[s][4];}
      else{
        document.getElementById("d6").innerHTML = null;}
        if(map[s][5]!=null){document.getElementById("d4").innerHTML = map[s][5];}
      else{
        document.getElementById("d4").innerHTML = null;}
        
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
  for( i in 0; i<13; i++)
  {
    if(i%2=0)
    {
      $(".contact"+i).click(function()
      {
        window.location.replace("../../prescription.php");
      });
    }
    else
    {
      $(".contact"+i).click(function()
      {
        window.location.replace("../../doctor.php");
      });
    }
  }


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
    document.getElementById("symtext").value = "";
    $("#inpbox").show();
    bootest=true;
  }

}
