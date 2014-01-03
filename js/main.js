

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
      	

      slide = $('.slide');
      nav = $('div.header-container');
      
      h = h - nav.innerHeight();

      // put the content 10% from the top
      slide.css({
        "min-height": (h) + "px",
        "padding-top": (h * 0.10) + "px",
      });


      // Expansion of work list items when clicked
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

      
      // expand or collapse all work items
      $(".toggle-all").on("click", function(e) {
      	e.preventDefault();
      	if ( $(e.currentTarget).hasClass("active")) {
      		collapseAll();
      	}
    	else expandAll();
      });




    }));
