// Funcion que solo acepta numeros del 0 al 9 y . -
function validaNumericos(event) {
  return event.charCode >= 45 && event.charCode != 47 && event.charCode <= 57;
}

// Funcion que solo acepta numeros del 0 al 9
function validaNumericosError(event) {
  return event.charCode >= 48 && event.charCode <= 57;
}

/*==================== TOOLTIPS BOOTSTRAP ===================*/
$(document).ready(function () {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
})

$(document).ready(function () { irArriba(); }); //Hacia arriba

function irArriba() {
  $('.ir-arriba').hide();
  $('.ir-arriba').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 1000)
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


