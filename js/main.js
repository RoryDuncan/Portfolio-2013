

$(document).ready(
  (function() {

      var h = $(window).height(),
          w = $(window).width(),
          toggleActive = function(e) {
          	$(e.currentTarget).toggleClass("active");
          };
      	

      slide = $('.slide');
      nav = $('div.header-container');
      
      h = h - nav.innerHeight();

      // put the content 10% from the top
      slide.css({
        "min-height": (h) + "px",
        "padding-top": (h * 0.10) + "px",
      });



      $(".work ul.expandable li").on("click", toggleActive);
      $("nav .menu").on("click", function(e) {
      	if ( $("nav").hasClass("active") ) {
      		console.log("wow");
      		$("nav").removeClass("active");
      		$("nav ul").slideUp(200);
      		
      	}
      	else {
      		console.log("wow2");
      		$("nav").addClass("active");
      		$("nav ul").slideDown(200);
      		
      	}
      	// 'active'-ate the menu that was clicked.
      	toggleActive(e);
      });
    
  })
);
