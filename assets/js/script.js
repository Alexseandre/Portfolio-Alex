(function ($, sr) {
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout;

    return function debounced() {
      var obj = this,
        args = arguments;
      function delayed() {
        if (!execAsap) func.apply(obj, args);
        timeout = null;
      }

      if (timeout) clearTimeout(timeout);
      else if (execAsap) func.apply(obj, args);

      timeout = setTimeout(delayed, threshold || 100);
    };
  };
  // smartresize
  jQuery.fn[sr] = function (fn) {
    return fn ? this.bind("resize", debounce(fn)) : this.trigger(sr);
  };
})(jQuery, "smartresize");

var $ = jQuery;

(function () {
  ///////////////////////////////
  // Set Home Slideshow Height
  ///////////////////////////////

  function setHomeBannerHeight() {
    var windowHeight = jQuery(window).height();
    jQuery("#header").height(windowHeight);
  }

  ///////////////////////////////
  // Center Home Slideshow Text
  ///////////////////////////////

  function centerHomeBannerText() {
    var bannerText = jQuery("#header > .center");
    var bannerTextTop =
      jQuery("#header").actual("height") / 2 -
      jQuery("#header > .center").actual("height") / 2 -
      40;
    bannerText.css("padding-top", bannerTextTop + "px");
    bannerText.show();
  }

  function setHeaderBackground() {
    var scrollTop = jQuery(window).scrollTop(); // our current vertical position from the top

    if (scrollTop > 300 || jQuery(window).width() < 700) {
      jQuery("#header .top").addClass("solid");
    } else {
      jQuery("#header .top").removeClass("solid");
    }
  }

  ///////////////////////////////
  // Initialize
  ///////////////////////////////

  jQuery.noConflict();
  setHomeBannerHeight();
  centerHomeBannerText();

  //Resize events
  jQuery(window).smartresize(function () {
    setHomeBannerHeight();
    centerHomeBannerText();
  });
})();

///////////////////////////////
// Smooth Scroll
///////////////////////////////

smoothScroll.init();

///////////////////////////////
// Animate Css
///////////////////////////////
var $ = jQuery;

function animationHover(element, animation) {
  element = $(element);
  element.hover(
    function () {
      element.addClass("animated " + animation);
    },
    function () {
      //wait for animation to finish before removing classes
      window.setTimeout(function () {
        element.removeClass("animated " + animation);
      }, 2000);
    }
  );
}

$(document).ready(function () {
  $("#scrollToContent").each(function () {
    animationHover(this, "pulse");
  });
});

///////////////////////////////
// Header Fixed
///////////////////////////////

var menu = $("#navigation");
var origOffsetY = menu.offset().top;

function scroll() {
  if ($(window).scrollTop() >= origOffsetY) {
    $("#navigation").addClass("nav-wrap");
    $("#services").addClass("exp");
    //$('.content').addClass('menu-padding');
  } else {
    $("#navigation").removeClass("nav-wrap");
    $("#services").removeClass("exp");
    //$('.content').removeClass('menu-padding');
  }
}

document.onscroll = scroll;

///////////////////////////////
// Testimonial Slide
///////////////////////////////

$(document).ready(function () {
  $("#testimonial-container").owlCarousel({
    navigation: false, // Show next and prev buttons
    slideSpeed: 700,
    paginationSpeed: 400,
    singleItem: true,
  });
});

///////////////////////////////
// google map
///////////////////////////////

function initialize() {
  var mapProp = {
    center: new google.maps.LatLng(51.508742, -0.12085),
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    scrollwheel: false,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

google.maps.event.addDomListener(window, "load", initialize);

const target = document.getElementById("target");
let array = [
  "Web",
  "Motivé",
  "ReactJS",
  "Back-end",
  "Front-end",
  "D'application",
];
let wordIndex = 0;
let letterIndex = 0;

const createLetter = () => {
  const letter = document.createElement("span");
  target.appendChild(letter);

  letter.textContent = array[wordIndex][letterIndex];

  setTimeout(() => {
    letter.remove();
  }, 2800);
};

const loop = () => {
  setTimeout(() => {
    if (wordIndex >= array.length) {
      wordIndex = 0;
      letterIndex = 0;
      loop();
    } else if (letterIndex < array[wordIndex].length) {
      createLetter();
      letterIndex++;
      loop();
    } else {
      wordIndex++;
      letterIndex = 0;
      setTimeout(() => {
        loop();
      }, 2800);
    }
  }, 60);
};
loop();

const btn = document.getElementById("button");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  btn.value = "Envoie en cours...";

  const serviceID = "default_service";
  const templateID = "template_fbhd9rp";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = "Envoyé!";
    },
    (err) => {
      btn.value = "Envoyer";
      alert(JSON.stringify(err));
    }
  );
});
