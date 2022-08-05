window.onscroll = scroll_listener;

const divScroll = document.querySelector( "#progress-bar" );

function scroll_listener( ){
    let scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
    if( scrollPosition > 16 ){
        divScroll.classList.add('visible');
    }else{
        divScroll.classList.remove('visible');
    }


    let maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    let totalScrolled = scrollPosition * 100 / maxHeight;
    console.log( totalScrolled );

    document.querySelector( "#progress-bar span").style.width = totalScrolled + '%';
}




//  ir arriba

$(document).ready(function () { irArriba(); }); //Hacia arriba

function irArriba() {
  $('.ir-arriba').hide();
  $('.ir-arriba').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }) /*, 1000 */
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('.ir-arriba').fadeIn();
    }
    else {
      $('.ir-arriba').fadeOut();
    }
  });
}
