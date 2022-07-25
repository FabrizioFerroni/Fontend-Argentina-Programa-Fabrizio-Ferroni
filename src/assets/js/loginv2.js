(function ($) {
  "use strict";
  $('#form_login').attr('autocomplete', 'off');


  function clickauto() {
    $('#pulsaBoton').trigger('click');
  }

  $(document).ready(clickauto());
  $(document).ready(function () {
    $('.input100').trigger('click');

  });

  /*==================================================================
  [ Focus Contact2 ]*/
  $('.input100').each(function () {
    if ($(this).val().trim() != "") {
      $(this).addClass('has-val');
    }
    $(this).on('blur', function () {
      if ($(this).val().trim() != "") {
        $(this).addClass('has-val');
      }
      else {
        $(this).removeClass('has-val');
      }
    })
  })


  /*==================================================================
  [ Validate ]*/
  var input = $('.validate-input .input100');

  $('.validate-form').on('submit', function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      } else {
        showValidate_success(input[i]);
        check = true;
      }
    }

    return check;
  });


  $('.validate-form .input100').each(function () {
    $(this).focus(function () {
      hideValidate(this);
      hideValidate_success(this);
    });
  });

  function validate(input) {
    if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
      if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        return false;
      }
    }
    else {
      if ($(input).val().trim() == '') {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
    $(thisAlert).addClass('error');
  }


  function showValidate_success(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('success-validate');
    $(thisAlert).addClass('success');
  }


  function hideValidate_success(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('success-validate');
    $(thisAlert).removeClass('success');
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
    $(thisAlert).removeClass('error');
  }




})(jQuery);
