// Bind normal buttons
Ladda.bind( '.auntiebutton', { timeout: 4000 } );

// Bind progress buttons and simulate loading progress
Ladda.bind( '.auntiebutton', {
  callback: function( instance ) {
    var progress = 0;
    var interval = setInterval( function() {
      progress = Math.min( progress + Math.random() * 0.1, 1 );
      instance.setProgress( progress );

      if( progress === 1 ) {
        instance.stop();
        clearInterval( interval );
      }
    }, 100 );
  }
} );

$(".auntiebuttongroup").hide();

$(document).ready(function(){
  
  $(".findbutton").click(function(){
    $(".auntiebuttongroup").fadeIn();
    $(".auntiebutton").click();
    setTimeout(
      function() {
      //do something special
        $(".found").html('<span class="ladda-label"><b>Auntie Ariel</b> - <i>Blk 23 Toa Payoh #14-54 S184727</i></span> &#10003');
      }, 2200);
  });

});

// You can control loading explicitly using the JavaScript API
// as outlined below:

// var l = Ladda.create( document.querySelector( 'button' ) );
// l.start();
// l.stop();
// l.toggle();
// l.isLoading();
// l.setProgress( 0-1 );