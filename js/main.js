
var PortfolioManager = (function() {
	this.load = function() {

	};
	console.log("wow");

	return this;
})


$(document).ready(
  (function() {

      var h = $(window).height(),
          w = $(window).width();

      slide = $('.slide');
      nav = $('div.header-container');
      
      h = h - nav.innerHeight();

      // put the content 10% from the top
      slide.css({
        "min-height": (h) + "px",
        "padding-top": (h * 0.10) + "px",

      });

      a = new PortfolioManager();
      console.log(a)
    
  })
);
