

$(document).ready(
	(function() {


      var h = $(window).height(),
          w = $(window).width(),
          toggleActive = function(e) {
          	$(e.currentTarget).toggleClass("active");
          },
          expandAll = function() {
          	$(".work ul.expandable li").removeClass("active");
      		$(".work ul.expandable li").addClass("active");
      		$(".work p a").addClass("active");
      		$(".work p a").text("Collapse All  [-]");
          },
          collapseAll = function() {
          	$(".work ul.expandable li").removeClass("active");
          	$(".work p a").removeClass("active");
      		$(".work p a").text("Expand All  [+]");
          };

          if (w >= 485) {
            $("div.next-slide").hide();
            $(".hero").children().hide();


            window.setTimeout( function() {
            $(".hero h1").fadeIn(600);
            }, 300)

            window.setTimeout( function() {
              $(".hero p").fadeIn(600);
            }, 1000)

            window.setTimeout( function() {
              $("div.next-slide").fadeIn(600);
            }, 2000)
          }
      	

      slide = $('.slide');
      nav = $('div.header-container');
      
      h = h - nav.innerHeight();
      window.slideHeight = h;

      // put the content 10% from the top
      slide.css({
        "min-height": (h) + "px",
        "padding-top": (h * 0.10) + "px",
      });


      /* * Expansion of work list items when clicked * */

      // required for touch interfaces
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

      
      /* * expand or collapse all work items * */

      $(".toggle-all").on("click", function(e) {
      	e.preventDefault();
      	if ( $(e.currentTarget).hasClass("active")) {
      		collapseAll();
      	}
    	else expandAll();
      });

/* * SCROLLSPY-like * */
	//helpers
	var flatten = function(number) {return (~~number)};
	var isWithin$ = function(value, $sel) {

		if (value >= $sel.scrollTop() && value <= ($sel.offset().top + $sel.height() ) ) {
			return true;
		}
		else return false;
	};

	var getScrollTop = function() {
		return $(document).scrollTop();
	};

	/* * CORE FUNCTIONING * */

	// specific positions:
	var epoch = $("#epoch"),
		work = $("#work"), 
		skills = $("#skills"), 
		about = $("#about"), 
		contact = $("#contact"),

		currentSlide = null,
		nextSlide = $("#work"),
		currentSlideIndex = 0,
		listed = [epoch, work, skills, about, contact];

	var getCurrentSlide = function() {

		var scroll = getScrollTop();

		// test each jQuery object to determine which slide to assign to currentSlide variable
		for (var i = 0, ii = listed.length; i < ii; i+=1) {
			if ( isWithin$(scroll, listed[i]) === true ) {
				currentSlide = listed[i];
				currentSlideIndex = i;
				console.log("current slide is ", currentSlide.selector)
				break;
			}
			else continue;
		}
	}
	var toggleNextSlide = function() {
		if (currentSlideIndex === ( listed.length - 2 ) ){
			$("div.next-slide").slideUp();
		}
		else $("div.next-slide").slideDown();
	};




    $('body').on("mousewheel", function() {
    	getCurrentSlide();
		toggleNextSlide();
    });


      
/* * Scroll-button * */
      $(".next-slide").on("click", function() {

      	//update what is considered the current slide
      	getCurrentSlide();
      	// handler for if it's the last slide
      	toggleNextSlide();
      	// scroll time
      	$.scrollTo( listed[currentSlideIndex+1], 1000);
      	
      });
}));
