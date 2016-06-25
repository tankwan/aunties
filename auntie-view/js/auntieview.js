$(document).ready(function(){
  
  $(".yesfirst").click(function(){
    $(".dialoguefirst").hide();
    $(".imgfirst").hide();
    $(".buttongroupfirst").hide();
    $(".dialoguesecond").fadeIn();
    $(".imgsecond").fadeIn();
    $(".buttongroupsecond").fadeIn();
  });

  $(".yessecond").click(function(){
    $(".dialoguesecond").hide();
    $(".imgsecond").hide();
    $(".buttongroupsecond").hide();
    $(".dialoguethird").fadeIn();
    $(".imgthird").fadeIn();
    $(".buttongroupthird").fadeIn();
  });

  $(".yesthird").click(function(){
    $(".dialoguethird").hide();
    $(".imgthird").hide();
    $(".buttongroupthird").hide();
    $(".dialoguefourth").fadeIn();
    $(".imgfourth").fadeIn();
    $(".buttongroupfourth").fadeIn();
  });

  $(".yesfourth").click(function(){
    $(".dialoguefourth").hide();
    $(".imgfourth").hide();
    $(".buttongroupfourth").hide();
    $(".dialoguefifth").fadeIn();
    $(".imgfifth").fadeIn();
    // $(".buttongroupfifth").fadeIn();
  });

});