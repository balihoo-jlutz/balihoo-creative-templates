$(function() {

  var smallScreen = true;

  if ( $('.sm').css('display') == 'none' ) {
    smallScreen = false;
  }

  // Generic Modal
  $(".modal, .videoModal").click(
    function() {
      $('.body').removeClass('blur');

      if (smallScreen) {
        $('.smModal, .modal').fadeOut('slow');
      } else {
        $('.videoModal, .modal').fadeOut('slow');
      }
    }
  ); //click

  // Large screen video
  $(".video-js").click(
    function() {
      $('#video').attr('src', $('.do-video-src').attr('data-video') );
      $('#video').attr('width', $('.do-video-src').attr('data-width') );
      $('#video').attr('height', $('.do-video-src').attr('data-height') );
      $('.body').addClass('blur');
      $('.modal, .videoModal').fadeIn('fast');
    }
  ); //click

  // Small screen CTA and NAV
  if (smallScreen) {

    $(".info").click(
      function() {
        $('.body').addClass('blur');
        $('.smModal, .modal').fadeIn('slow');
      }
    ); //click

    var currentHeight = parseInt( $('.nav-js').css('height'), 10 );
    $('.nav-js').css('margin-top', -currentHeight + 'px' );
    $('.nav-js').css('display', 'block' );

    $(".hamburger").click(
      function() {

        var currentMargin = $('.nav-js').css('margin-top');
        var state = parseInt(currentMargin, 10) < 0;

        $(".nav-js").animate(
          {
            marginTop: (state ? 0:-currentHeight)
          },
          "fast"
        ); //animate

      }
    ); //click

  } // if

  // Form
  $('input, textarea').placeholder();

  if (smallScreen) {
    $('.tp').tooltipster({
        animation: 'fade',
        trigger: 'custom',
        position: 'bottom',
        theme: 'tooltipster-error',
        onlyOne: false,
        timer: 5000
    });

  } else {
    $('.tp').tooltipster({
        animation: 'fade',
        trigger: 'custom',
        position: 'left',
        theme: 'tooltipster-error',
        onlyOne: false,
        timer: 5000
    });

  }

  // initialize validate plugin on the form
  $('form').each(function () {
      $(this).validate({
          errorPlacement: function(error, element) {

              var lastError = $(element).data('lastError'),
                  newError = $(error).text();

              $(element).data('lastError', newError);

              if(newError !== '' && newError !== lastError){
                  $(element).tooltipster('content', newError);
                  $(element).tooltipster('show');
              }
          },
          success: function(label, element) {
              $(element).tooltipster('hide');
          },
          rules: {
              firstname: {
                  required: true,
              },
              lastname: {
                  required: true,
              },
              email: {
                  required: true
              },
              phone: {
                  required: false,
                  phoneUS: true
              }
          },
          messages: {
              firstname: {
                  required: "First Name",
              },
              lastname: {
                  required: "Last Name",
              },
              email: {
                  required: "Email",
              },
              phone: {
                  phoneUS: "U.S. phone format"
              }
          },
          submitHandler: function(form) { // for demo
            var data = {
              firstname: form.firstname.value,
              lastname: form.lastname.value,
              email: form.email.value,
              other: form.phone.value,
              listname: form.listname.value,
              affiliatecompanyid: form.affiliatecompanyid.value,
              affiliateemail: form.leademail.value,
              returnurl: document.URL
            };
            $.ajax({
              url: $("input[name=processURL]").val(),
              type: "POST",
              data: data,
              cache: false,
              success: function(data) {
                if (smallScreen) {
                  $('.body').removeClass('blur');
                  $('.smModal, .modal').fadeOut('slow');
                }
                $('form').addClass('hide');
                $('.info').addClass('hide');
                $('form + .thank-you').fadeIn('fast');
                formSuccess();
              },
              error: function(request, status, error) {
                alert("Oops, something went wrong. Try again later.");
              }
            });
          }
      });
  });

});
