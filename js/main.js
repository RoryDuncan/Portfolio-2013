

$(document).ready(
  (function() {
      console.log("Hello.")

      var h = window.innerHeight,
          w = window.innerWidth,
          toggleActive = function(e) {
            $(e.target).toggleClass("active");
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


          // only animate if the width of the screen is above 485px
          // contrived for presentation, but doens't need to hurt mobile users
          if (w >= 650) {

            $("div.next-slide").hide();
            $(".hero p span").hide();
            $(".hero h1").hide();

            window.setTimeout( function() {
            $(".hero h1").fadeIn(800);
            }, 300)

            window.setTimeout( function() {

              $(".hero p").show();
              
              for (x = 0, xx = $(".hero p span").length; x < xx; x++) {
                $obj = $( $(".hero p span")[x] );
                $obj.delay(x*540).fadeIn(600);
              }

            }, 1000)

            window.setTimeout( function() {
              getCurrentSlide();
              toggleNextSlide();
              $("div.next-slide").slideDown(600);
            }, 3000)
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

/* * * EVENT DRIVEN ITEMS * * */

      /* * Expansion of work list items when clicked * */

      // needed for touch interfaces, probably
      $(".work ul.expandable li").on("click", toggleActive);


      $("nav .menu").on("click", function(e) {
        if ( $("nav").hasClass("active") ) {
          $("nav").removeClass("active");
          $("nav ul").slideUp(200);
          
        }
        else {
          $("nav").addClass("active");
          $("nav ul").slideDown(200);
        }
        // 'active'-ate the menu that was clicked.
        toggleActive(e);
      });

      // close the nav menu after selecting
      $("nav ul li").on("click", function() {
        if ( $("nav").hasClass("active") ) {
          $("nav").removeClass("active");
          $("nav ul").slideUp(100);
        }
        else return;
      });

      // 
      $("nav ul li a").on("click", function(e){
          e.preventDefault();
          var t = e.target.hash;
          $.scrollTo(t, 1000);
      });



      /* * expand or collapse all work items * */

      $(".toggle-all").on("click", function(e) {
        e.preventDefault();
        if ( $(e.currentTarget).hasClass("active")) {
          collapseAll();
        }
      else expandAll();
      });


      var skillsSortState = 0;
      $(".skills ul li.description").hide()
      $(".skills ul li span.notlearnt").hide()
      $(".skills .skillsort p a").on("click", function(e) {
        e.preventDefault()
        states = ["view simple", "view detailed"]
        $("#sorttext").text( states[skillsSortState] )
        skillsSortState = skillsSortState === 1 ? 0 : 1
        $(".skills ul li.description").slideToggle()
        $(".skills ul li span.notlearnt").toggle()
        if (!skillsSortState) {
            $(".skills ul li .tag").animate({
              "padding":"15px 24px",
              "font-size":"1.2em",
              "margin":"4px 2px"
            }, 100);
         }
        else {
          $(".skills ul li .tag").animate({
              "padding":"10px 16px",
              "font-size":"1em",
              "margin":"2px 0px"
            }, 100);
        }
      });
/* * SCROLLSPY-like * */

  //helpers
  var flatten = function(number) {return (~~number)};
  var isWithin$ = function(value, $sel) {
    // checks whether or not the value is within the $sel element's bounding box
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
    //console.log(2);

    var scroll = getScrollTop();

    // test each jQuery object to determine which slide to assign to currentSlide variable
    for (var i = 0, ii = listed.length; i < ii; i+=1) {
      if ( isWithin$(scroll, listed[i]) === true ) {
        currentSlide = listed[i];
        currentSlideIndex = i;
        break;
      }
      else continue;
    }
  }
  var toggleNextSlide = function() {

    var adjusted = listed.length - 2;
        //console.log( currentSlideIndex, adjusted);

    if ( currentSlideIndex === adjusted ) {

      //console.log(4);
      $(".next-slide").slideUp(100);

    }
    else {

      $("div.next-slide").slideDown(100);
      //console.log(5);
    } 

  };
/* * Hiding and showing of navigation bar based on scrolling up and down * */
  
  var hideNavBar = function() {
    $("nav .menu").hide();
    $(".header-container").slideUp(100);
  };
  var showNavBar = function() {
    $(".header-container").slideDown(100);

    $("nav .menu").show();  
  };

  var lastScrollTop = null;
  var determineScrollDirection = function(e) {
    var scroll = getScrollTop();

    if (lastScrollTop === null) {
      lastScrollTop = scroll;
      return;
    }

    if (scroll <= lastScrollTop) {
      showNavBar();
    }
    else {
      hideNavBar();
    }

    lastScrollTop = scroll;

  };
  /* bundle all the scroll events together */
  var throttle = 0; 
  var scrollHandler = function(e){

      if ( window.innerWidth <= 650 ) {
        determineScrollDirection(e);
        throttle++;
        if (throttle % 3 == 0) {
          getCurrentSlide();
          toggleNextSlide();
        }
      }

  };


  $(document).on("scroll", function(e) {scrollHandler(e);});
  
/* * Scroll-button * */
      $("div.next-slide").on("click", function() {
        console.log(1)
        //update what is considered the current slide
        getCurrentSlide();
        // handler for if it's the last slide
        toggleNextSlide();
        // scroll time
        $.scrollTo( listed[currentSlideIndex+1], 1000);
        
      });


}));
