$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  // Format 24-hour BLIP location hours to 12 hour format
    !function() {
        var hh, m;

        for (var key in hours) {
            if (hours.hasOwnProperty(key)) {
                hh = hours[key].hours;
                m = hours[key].minutes;
                if (hh && m) {
                    var dd = "AM";
                    var h = hh;
                    if (h >= 12) {
                        h = hh-12;
                        dd = "PM";
                    }
                    if (h == 0) {
                        h = 12;
                    }
                    m = m < 10 ? "0" + m:m;

                    document.getElementById(key).innerHTML = " " + h + ":" + m + " " + dd;
                }
            }

        }
    }();

});
