$(function() {

  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";
      analytics.load("4h4seVGswU7iSM33dX5Zq9dicAz2t0LA");
  }}();

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
              firstName: {
                  required: true,
              },
              lastName: {
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
              firstName: {
                  required: "First Name",
              },
              lastName: {
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
              firstName: form.firstName.value,
              lastName: form.lastName.value,
              email: form.email.value,
              phone: form.phone.value,
              notes: form.notes.value,
              brand_key: form.brand_key.value,
              location_id: form.location_id.value,
              tactic_id: form.tactic_id.value
            };
            analytics.identify(data, function() {
              if (smallScreen) {
                  $('.body').removeClass('blur');
                  $('.smModal, .modal').fadeOut('slow');
              }
              $('form').addClass('hide');
              $('.info').addClass('hide');
              $('form + .thank-you').fadeIn('fast');
            });
          }
      });
  });

});
