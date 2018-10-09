/*
=======================================================
Author:PixelsHarmony (http://www.pixelsharmony.com/)
Date:02 July, 2016
Version:1.0
Description:Volatile - JS Theme Functions
=======================================================
 JavaScript Content
=======================================================
*/
var msie = window.navigator.userAgent.indexOf('MSIE ');
var isIE = msie > 0;
var pageloader = false;
jQuery("body").addClass("body-preloader");
/*
=======================================================
 Page Preloader
=======================================================
*/
function phpagepreloader() {
      var loadingInterval, counter = 0;
      $('.status').fadeOut();
      $('.page-preloader').delay(240).fadeOut('slow').after(function() {
         /* Show Modal Preloader */
         modalNewsletterShop();
         pageloader = true;
         loadingInterval = setInterval(function() {
            counter += 200;
            if (isIE) {
               jQuery(window).trigger('resize');
            } else {
               window.dispatchEvent(new Event('resize'));
            }
            if (counter > 1000) {
               clearInterval(loadingInterval);
            }
         }, 200);
      });
   }
/*
=======================================================
 Active Navgiation
=======================================================
*/
$(function() {
   var segments = location.pathname.split('/');
   pgurl = segments[segments.length - 2] + '/';
   if (segments.length == 3) {
      if (segments[2] == "") $('.default-homepage').addClass("active");
   }
   $('.dropdown-toggle').on('click', function(e) {
      e.preventDefault();
   })
   $("ul.dropdown-menu li a").each(function() {
      if ($(this).attr("href") == pgurl || $(this).attr("href") == '') {
         $(this).parent().addClass("active");
         if (!$(this).closest(".menu-large").length) {
            $(this).parent().closest(".dropdown-single ").addClass("active");
         } else {
            $(this).closest(".menu-large").addClass("active");
         }
      };
   });
   $(".dropdown-menu.single li ul li a").each(function() {
      if ($(this).attr("href") == pgurl || $(this).attr("href") == '') {
         $(this).parent().addClass("active");
         if (!$(this).closest(".menu-large").length) {
            $(this).closest(".dropdown-single ").addClass("active");
         } else {
            $(this).closest(".menu-large").addClass("active");
         }
      };
   })
});
/*
=======================================================
 Responsive Navigation
=======================================================
*/
function addResponsiveNavigation() {
   if (jQuery(window).width() < 1280 && jQuery(".offscreen-container.reveal-nav").length == 0) {
      jQuery.when(jQuery.get("responsive-navigation/responsive-navigation.php", {}).done(function(data) {
         data = jQuery(data);
         jQuery(".offscreen-container.reveal-nav").remove();
         jQuery("#wrapper").before(data);
         phnavigation();
      }));
   }
}
addResponsiveNavigation();
/*
=======================================================
 Parallax Video
=======================================================
*/
function phparallaxvideo() {
	
	var phvarparallaxvideo = $('.parallax-video');
      if (phvarparallaxvideo.length && jQuery()) {
         phvarparallaxvideo.backgroundVideo({
            $videoWrap: $('.video-wrap'),
            $outerWrap: $('#page-title'),
            pauseVideoOnViewLoss: false
         });
      }
   };
   /*
   =======================================================
    SmoothScroll
   =======================================================
   */
function phnicescroll() {
   if ($('.nicescroll').length && jQuery()) {
      SmoothScroll();
   };
};
/*
=======================================================
 Full Height
=======================================================
*/
function phfullheight() {
   $(window).load(function() {
	   var phvarfullheight = $('.full-height');
      if (phvarfullheight.length && jQuery()) {
         var fullbodyheight = $(window).height();
         var headerheight = $('#header').height();
         var navheight = $('#nav').height();
		 phvarfullheight.css("height", "auto");
         if ($('#header').hasClass('header-fixed')) {
            var introfullheight = fullbodyheight;
            phvarfullheight.css("height", introfullheight);
            phvarfullheight.css("padding-top", headerheight);
         } else if ($('#header').hasClass('header-default')) {
            var introfullheight = fullbodyheight - headerheight - navheight;
            phvarfullheight.css("height", introfullheight);
         } else {
            var introfullheight = fullbodyheight - headerheight;
            phvarfullheight.css("height", introfullheight);
         }
         phpagetitleopacity();
         phparallax();
         phparallaxvideo();
      };
   });
};
/*
=======================================================
 Full Height Blog
=======================================================
*/
function phfullheightblog() {
   $(window).load(function() {
	   var phvarfullheightblog = $('.full-height-blog');
      if (phvarfullheightblog.length && jQuery()) {
         var fullbodyheight = $(window).height();
         var headerheight = $('#header').height();
         var navheight = $('#nav').height();
		 phvarfullheightblog.css("height", "auto");
         var introfullheight = fullbodyheight;
         phvarfullheightblog.css("height", introfullheight);



      };
   });
};
/*
=======================================================
 Full Height Box
=======================================================
*/
function phfullheightbox() {
	var phvarfullheightbox = $('.full-height-box');
   if (phvarfullheightbox.length && jQuery()) {
      phvarfullheightbox.each(function() {
         var maxheightbox = 0;
         var heigthboxchild = $(this).children('.equal-height-col');
         heigthboxchild.css("height", "auto");
         heigthboxchild.each(function() {
            var heightbox = $(this).height();
            maxheightbox = heightbox > maxheightbox ? heightbox : maxheightbox;
         });
         heigthboxchild.css("height", maxheightbox);
      });
   };
};
/*
=======================================================
 Galleria PLugin
=======================================================
*/
function galleriaPlugin() {
      if (jQuery("#galleria").length > 0 && jQuery()) {
		 Galleria.loadTheme('plugins/galleria/themes/classic/galleria.classic.min.js');
         Galleria.configure({
            swipe: 'enforced'
         })
         Galleria.run('#galleria');
      }
   };
/*
=======================================================
 Filter To Select
=======================================================
*/
var callOncePhFilter = true;

function phfiltertoselect() {
	 var phvarportfoliofilter = $('#portfolio-filter');
      if (phvarportfoliofilter.length && jQuery()) {
         if (callOncePhFilter) {
            phvarportfoliofilter.each(function() {
               var select = $(document.createElement('select')).insertBefore($(this));
               $('>li a', this).each(function() {
                  var datafilter = $(this).data("filter");
                  option = $(document.createElement('option')).appendTo(select).val(datafilter).html($(this).html()).on( "click", function() {});
               });
            });
            callOncePhFilter = false;
         }
         $('.portfolio-filter .selecter-options').on('click', 'span', function(e) {
            e.preventDefault();
            if ($(this).hasClass('activeFilter')) {
               return false;
            }
            $(this).parents('.selecter-options').find('.activeFilter').removeClass('activeFilter');
            $(this).addClass('activeFilter');
            var selector = $(this).attr('data-value');
			 var phvarportfolioisotope = $('.portfoliofitrows, .portfoliomasonry, .portfoliomasonrymixed');
            if (jQuery(this).hasClass("wow-animation")) {
               phvarportfolioisotope.isotope({
                  filter: function() {
                     var item = jQuery(this);
                     if (selector != "*") {
                        if (!item.hasClass(selector.substr(1))) {
                           return false;
                        }
                     }
                     return true;
                  }
               });
            } else {
               phvarportfolioisotope.isotope({
                  filter: function() {
                     var item = jQuery(this);
                     if (selector != "*") {
                        if (!item.hasClass(selector.substr(1))) {
                           return false;
                        }
                     }
                     return true;
                  }
               });
            }
         });
      }
   };
/*
=======================================================
 Scroll To Top
=======================================================
*/
function phscrolltotop() {
	var phvarscrolltotopfixed = $('.scroll-to-top-fixed');
   if (phvarscrolltotopfixed.length && jQuery()) {
      $(window).scroll(function() {
         var offsetscroll = $(window).scrollTop();
         var offsetbody = $(window).height();
         if (offsetscroll > offsetbody) {
            phvarscrolltotopfixed.addClass("sticky-btn");
         } else {
            phvarscrolltotopfixed.removeClass("sticky-btn");
         }
      });
   };
};
/*
=======================================================
 Page Title Opacity
=======================================================
*/
function phpagetitleopacity() {
	var titleopacity = $('.titleopacity');
   if (titleopacity.length && jQuery()) {
	  var phvarpagetitle = $('#page-title');
      var titleopacityuntil = (phvarpagetitle.outerHeight()) - (titleopacity.outerHeight());
      var titleopacityoffset = titleopacityuntil / 1.2;
      var offset = phvarpagetitle.offset().top;
      $(window).on('scroll', function() {
         var windowtop = $(window).scrollTop();
         scrollPos = $(this).scrollTop() - offset;
         if (windowtop > offset) {
            titleopacity.css({
               'transform': "translateY(" + (scrollPos / 3) + "%)",
               'opacity': 1 - (scrollPos / titleopacityoffset),
               '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + 1 - (scrollPos / 300) + ')'
            });
         }
         clearTimeout(jQuery.data(this, 'scrollTimer'));
         jQuery.data(this, 'scrollTimer', setTimeout(function() {
            var windowtop = $(window).scrollTop();
            scrollPos = $(this).scrollTop() - offset;
            titleopacity.css({
               'transform': "translateY(" + (1 - (scrollPos / titleopacityoffset) > 1 ? 0 : (scrollPos / 3)) + "%)",
               'opacity': 1 - (scrollPos / titleopacityoffset),
               '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + 1 - (scrollPos / 300) + ')'
            });
         }, 250));
      });
   };
};
/*
=======================================================
 Page Scroll Animation
=======================================================
*/
function phpagescrollanimation() {
	var phvarpagescroll = $('.page-scroll');
   if (phvarpagescroll.length && jQuery()) {
      phvarpagescroll.on('click', function(e) {
         var $anchor = $(this);
         var soffsettop = $($anchor.attr('href')).offset().top;
         var offsetall = soffsettop;
         $('html, body').stop().animate({
            scrollTop: offsetall
         }, 1500, 'easeInOutExpo');
         e.preventDefault();
      });
   };
};
/*
=======================================================
 Counters
=======================================================
*/
function phcounters() {
   if ($('.count-number').length && jQuery()) {
      var counter = jQuery('.count-number span');
      var counterfinished = 'counterfinished';
      counter.each(function() {
         var custom = jQuery(this);
         var waypoint = new Waypoint({
            element: custom,
            offset: '110%',
            handler: function(direction) {
               var $this = jQuery(this.element[0]);
               if (!$this.hasClass(counterfinished)) {
                  $this.countTo({
                     speed: 2200,
                     refreshInterval: 50,
                     formatter: function(value, options) {
                        return value.toFixed(options.decimals);
                     }
                  }).addClass(counterfinished);
               }
            }
         })
      });
   };
};
/*
=======================================================
 Progress Bar
=======================================================
*/
function phprogressbar() {
	var progressbar = jQuery('.progress-bar-box');
   if (progressbar.length && jQuery()) {
      var progressbarfinished = 'progressbarfinished';
      $(".progress-bar").css("width", "0");
      progressbar.each(function() {
         var progressbarcustom = jQuery(this);
         var waypoint = new Waypoint({
            element: progressbarcustom,
            offset: '100%',
            handler: function(direction) {
               var $this = jQuery(this.element[0]);
               b = $this.find(".progress").attr("data-width");
               if (!$this.hasClass(progressbarfinished)) {
                  $this.find(".progress-bar").animate({
                     width: b + "%"
                  }, 2000, "linear");
                  $this.addClass(progressbarfinished);
               }
            }
         });
      });
   };
};
/*
=======================================================
 Pie Chart
=======================================================
*/
function phpiechart() {
	var piechart = jQuery('.pie-chart');
   if (piechart.length && jQuery()) {
      var piechartloaded = 'pie-chart-loaded';
      piechart.each(function() {
         var customChart = jQuery(this);
         var waypoint = new Waypoint({
            element: customChart,
            offset: '80%',
            handler: function(direction) {
               if (direction === 'down') {
                  var $this = jQuery(this.element[0]),
                     piechartbarcolor = ($this.data('barcolor')) ? ($this.data('barcolor')) : "#3a3a3a",
                     piechartlinewidth = ($this.data('linewidth')) ? ($this.data('linewidth')) : 6,
                     piechartbarwidth = ($this.data('barwidth')) ? ($this.data('barwidth')) : 180;
                  piechartanimatespeed = ($this.data('animatespeed')) ? ($this.data('animatespeed')) : 4000;
                  piecharttrackcolor = ($this.data('trackcolor')) ? ($this.data('trackcolor')) : "#dddddd";
                  if (!$this.hasClass(piechartloaded)) {
                     $this.easyPieChart({
                        animate: piechartanimatespeed,
                        size: piechartbarwidth,
                        lineWidth: piechartlinewidth,
                        scaleColor: false,
                        trackColor: piecharttrackcolor,
                        lineCap: 'square',
                        barColor: piechartbarcolor,
                        onStart: function() {
                           $('.pie-chart-percent').countTo({
                              from: 0,
                              speed: piechartanimatespeed - 600,
                              formatter: function(value, options) {
                                 return value.toFixed(options.decimals) + '%';
                              }
                           });
                        }
                     }).addClass(piechartloaded);
                  }
               }
            }
         })
      });
      phparallax();
   };
};
/*
=======================================================
 Full Page Plugin
=======================================================
*/
function phfullpageplugin() {
	var phvarfullpage = $('#fullpage');
   if (phvarfullpage.length && jQuery()) {
      jQuery("body, html").css("overflow", "hidden");
      phvarfullpage.fullpage({
         'verticalCentered': false,
         'css3': true,
         'navigation': true,
         scrollBar: true,
         'navigationPosition': 'right',
         onLeave: function(index, nextIndex, direction) {
            var leavingSection = $(this),
               nextSection = jQuery("#fullpage .fp-section:eq(" + (nextIndex - 1) + ")");
            if (direction == 'down') {
               var counterfinished = 'counterfinished';
               jQuery('.count-number span').countTo({
                  speed: 2200,
                  refreshInterval: 50,
                  formatter: function(value, options) {
                     return value.toFixed(options.decimals);
                  }
               }).addClass(counterfinished);
            }
         }
      });
   };
};
/*
=======================================================
 Slider Price Filter
=======================================================
*/
function phsliderpricefilter() {
	var phvarsliderpricefilter = $('#slider-price-filter');
   if (phvarsliderpricefilter.length && jQuery()) {
      phvarsliderpricefilter.slider({
         range: true,
         min: 0,
         max: 1000,
         values: [0, 1000],
         slide: function(event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
         }
      });
      $("#amount").val("$" + phvarsliderpricefilter.slider("values", 0) + " - $" + phvarsliderpricefilter.slider("values", 1));
   };
};
/*
=======================================================
 Portfolio Carousel
=======================================================
*/
if ($('.portfoliocarousel').length && jQuery()) {
   $('.portfoliocarousel').each(function() {
      jQuery(this).slick({
         swipeToSlide: true,
         slidesToShow: 4,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 5000,
         arrows: false,
         responsive: [{
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }, {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }, , {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1
            }
         }, {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 1
            }
         }]
      });
   });
};

function phportfoliocarousel() {};
if ($('.intropostcarousel').length && jQuery()) {
   $('.intropostcarousel').each(function() {
      jQuery(this).slick({
         swipeToSlide: true,
         slidesToShow: 3,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 5000,
         arrows: false,
         responsive: [{
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }, {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }, , {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1
            }
         }, {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 1
            }
         }]
      });
   });
};

function phintropostcarousel() {};
if ($('.portfoliocarousel5').length && jQuery()) {
   $('.portfoliocarousel5').each(function() {
      jQuery(this).slick({
         swipeToSlide: true,
         slidesToShow: 5,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 5000,
         arrows: false,
         responsive: [{
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }, {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }, , {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1
            }
         }, {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 1
            }
         }]
      });
   });
};
/*
=======================================================
 Testimonials Carousel
=======================================================
*/
if ($('.testimonials-carousel').length && jQuery()) {
   $('.testimonials-carousel').each(function() {
      jQuery(this).slick({
         slidesToShow: 3,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 5000,
         arrows: false,
         swipeToSlide: true,
         responsive: [{
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }, {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }, , {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1
            }
         }]
      });
   });
};

function phtestimonialscarousel() {};
/*
=======================================================
 Testimonials Slider
=======================================================
*/
if ($('.testimonialsslider').length && jQuery()) {
   $('.testimonialsslider').each(function() {
      jQuery(this).slick({
         slidesToShow: 1,
         dots: true,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 5000,
         arrows: false,
         adaptiveHeight: true,
         swipeToSlide: true
      });
   });
};

function phflexslidertestimonial() {};
/*
=======================================================
 Clients Carousel
=======================================================
*/
if ($('.clients-carousel').length && jQuery()) {
   $('.clients-carousel').each(function() {
      jQuery(this).slick({
         swipeToSlide: true,
         slidesToShow: 7,
         slidesToScroll: 2,
         autoplay: false,
         autoplaySpeed: 5000,
         arrows: false,
         responsive: [{
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }, {
            breakpoint: 600,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1
            }
         }, , {
            breakpoint: 768,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 1
            }
         }, {
            breakpoint: 1081,
            settings: {
               slidesToShow: 4,
               slidesToScroll: 1
            }
         }]
      });
   });
};
if ($('.clients-carousel-5').length && jQuery()) {
   $('.clients-carousel-5').each(function() {
      jQuery(this).slick({
         swipeToSlide: true,
         slidesToShow: 5,
         slidesToScroll: 2,
         autoplay: false,
         autoplaySpeed: 5000,
         arrows: false,
         responsive: [{
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }, {
            breakpoint: 600,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1
            }
         }, , {
            breakpoint: 768,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 1
            }
         }, {
            breakpoint: 1081,
            settings: {
               slidesToShow: 4,
               slidesToScroll: 1
            }
         }]
      });
   });
};

function phclientscarousel() {};
/*
=======================================================
 Slick Arrows Click
=======================================================
*/
function phslickarrows() {
      $('.slick-custom-next, .slick-testimonial-next, .slick-clients-next').on('click', function() {
         var id = jQuery(this).attr("data-id");
         jQuery(id).slick('slickNext');
      });
      $('.slick-custom-prev, .slick-testimonial-prev, .slick-clients-prev').each(function() {
         jQuery(this).on('click', function() {
            var id = jQuery(this).attr("data-id");
            jQuery(id).slick('slickPrev');
         });
      });
   };
/*
=======================================================
    Tabs Reload Gmap
=======================================================
*/
function phtabsreloadgmap() {
   if ($('.nav-tabs').length && jQuery()) {
      $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
         phgooglemap();
         phshopsort();
      });
   };
};
/*
=======================================================
 Shop Title Effect
=======================================================
*/
function phshoptitleeffect() {
	
   if ($('.shop-desc h5 a').length && jQuery()) {
      $('.shop-desc h5 a').mouseenter(function(e) {
         $(this).parent().parent().parent().parent().find('.shop-image-holder').addClass("animation-hover-js");
      }).mouseleave(function(e) {
         $(this).parent().parent().parent().parent().find('.shop-image-holder').removeClass("animation-hover-js");
      });
   };
};
/*
=======================================================
 Shop Hover Effect
=======================================================
*/
function phshophovereffect() {
   if ($('.ssp-title').length && jQuery()) {
      $('.ssp-title').mouseenter(function(e) {
         $(this).parent().find('.image-thumb').addClass("animation-hover-js");
      }).mouseleave(function(e) {
         $(this).parent().find('.image-thumb').removeClass("animation-hover-js");
      });
   };
};
/*
=======================================================
 Blog Hover Effect
=======================================================
*/
function phbloghovereffect() {
   if ($('.blog-list').length && jQuery()) {
      $('.blog-list .blog-desc h4').mouseenter(function(e) {
         $(this).parent().parent().find('.blog-image-box').addClass("animation-hover-js");
         $(this).parent().parent().find('.slider-image-box').addClass("animation-hover-js");
      }).mouseleave(function(e) {
         $(this).parent().parent().find('.blog-image-box').removeClass("animation-hover-js");
         $(this).parent().parent().find('.slider-image-box').removeClass("animation-hover-js");
      });
   };
};
/*
=======================================================
 Blog Read Hover Effect
=======================================================
*/
function phblogreadhovereffect() {
   if ($('.blog-list').length && jQuery()) {
      $('.blog-list .blog-desc .btn-breadmore').mouseenter(function(e) {
         $(this).parent().parent().parent().find('.blog-image-box').addClass("animation-hover-js");
         $(this).parent().parent().parent().find('.slider-image-box').addClass("animation-hover-js");
      }).mouseleave(function(e) {
         $(this).parent().parent().parent().find('.blog-image-box').removeClass("animation-hover-js");
         $(this).parent().parent().parent().find('.slider-image-box').removeClass("animation-hover-js");
      });
   };
};
/*
=======================================================
 Cart Title Effect
=======================================================
*/
function phcarttitleeffect() {
   if ($('.csp-title').length && jQuery()) {
      $('.csp-title').mouseenter(function(e) {
         $(this).parent().find('.image-thumb').addClass("animation-hover-js");
      }).mouseleave(function(e) {
         $(this).parent().find('.image-thumb').removeClass("animation-hover-js");
      });
   };
};
/*
=======================================================
 Portfolio Title Effect
=======================================================
*/
function phportfoliotitleeffect() {
   if ($('.text_holder_normal .portfolio_title a').length && jQuery()) {
      $('.text_holder_normal .portfolio_title a').mouseenter(function(e) {
         $(this).parent().parent().parent().find('.image-box').addClass("animation-hover-js");
      }).mouseleave(function(e) {
         $(this).parent().parent().parent().find('.image-box').removeClass("animation-hover-js");
      });
   };
};

function stickyElements() {
	var phvarsidebar = $('.fixed-sidebar');
      if (phvarsidebar.length && jQuery()) {
         
         phvarsidebar.each(function() {
            jQuery(this).sticky({
               topSpacing: 80,
               bottomSpacing: jQuery(document).height() - jQuery(jQuery(this).attr("data-id")).offset().top + 40
            })
         });
         jQuery(window).load(function() {
            phvarsidebar.sticky('update');
         });
      }
	  var phvarfixedblogimage = $('.fixed-blog-image');
	   if (phvarfixedblogimage.length && jQuery()) {

           phvarfixedblogimage.sticky({
               topSpacing: 0
            })
        phvarfixedblogimage.on('sticky-start', function() { phfullheight(); });
        phvarfixedblogimage.on('sticky-end', function() { phfullheight(); });
      }
   };
/*
=======================================================
 Audio Player
=======================================================
*/
function phaudioplayer() {
   if ($('audio').length && jQuery()) {
      $('audio').audioPlayer();
   };
};
/*
=======================================================
 Contact Form Effect
=======================================================
*/
function phcontactformeffect() {
   if ($('.contact-overlay-effect,.maximize-form').length && jQuery()) {
      $('.contact-overlay-effect,.maximize-form').mouseenter(function(e) {
         $(this).parent().find('.overlay-map-background').addClass("animation-hover-js");
      }).mouseleave(function(e) {
         $(this).parent().find('.overlay-map-background').removeClass("animation-hover-js");
      });
   };
};
/*
=======================================================
 Home Blog Simple Effect
=======================================================
*/
function phhomeblogsimpleeffect() {
   if ($('.blog-wrapper-simple').length && jQuery()) {
      $('.blog-wrapper-simple article.blog-item .blog-desc h4 a').mouseenter(function(e) {
		  var sourceimage = $(this).attr("data-image");
		  $("body").find('.fixed-blog-image .hover-cover-bg').css('background-image', 'url(' + sourceimage + ')');
		  $("body").find('.fixed-blog-image').addClass("hoveractive");
      }).mouseleave(function(e) {
		  var defaultsourceimage = $("body").find('.fixed-blog-image .default-cover-bg').attr("data-defaultimage");
         $("body").find('.fixed-blog-image .default-cover-bg').css('background-image', 'url(' + defaultsourceimage + ')');
		 $("body").find('.fixed-blog-image').removeClass("hoveractive");
      });
   };
};
/*
=======================================================
 Contact Form Validation
=======================================================
*/
function phcontactvalidation() {
   if ($('.form-contact').length && jQuery()) {
      jQuery(".newsletter-form-action").find(".alert-success,.alert-danger").hide();
      $('.form-contact').validator().on('submit', function(e) {
         if (e.isDefaultPrevented()) {
            console.log("invalid");
         } else {
            if (jQuery(this).hasClass("newsletter-form-action")) {}
            e.preventDefault();
            var from = jQuery(this);
            $.ajax({
               type: from.attr('method'),
               url: from.attr('action'),
               data: from.serialize(),
               cache: false,
               dataType: 'json',
               contentType: "application/json; charset=utf-8",
               error: function(err) {
                  from.find(".alert-success,.alert-danger").hide();
                  from.find(".alert-danger").html('Could not subscribe at the moment. Please try again later.');
                  from.find(".alert-danger").show();
               },
               success: function(data) {
                  from.find(".alert-success,.alert-danger").hide();
                  if (data.result != "success") {
                     var message = data.msg.substring(4);
                     from.find(".alert-danger").html(message);
                     from.find(".alert-danger").fadeIn();
                  } else {
                     var message = data.msg;
                     from.find(".alert-success").html(message);
                     from.find(".alert-success").fadeIn();
                  }
               }
            });
         }
      })
   };
};
/*
=======================================================
 Custom Select
=======================================================
*/
function phcustomselect() {
   if ($('select').length && jQuery()) {
      $("select").not(".selecter_callback,.select-font-family ").selecter({
         label: "Sort Products"
      });
      $("select.selecter_callback").selecter({
         callback: selectCallback
      });
   };
};

function selectCallback(value, index) {
   $(".callback_output").prepend("<p>VALUE: " + value + ", INDEX: " + index + "</p>");
};
/*
=======================================================
 Shop Fit Rows Sort
=======================================================
*/
function phshopsort() {
	var phvarshopfitrows = $('.shopfitrows');
   if (phvarshopfitrows.length && jQuery()) {
      var $grid;
	  
      $grid = phvarshopfitrows.isotope({
         itemSelector: '.shop-item',
         layoutMode: 'fitRows',
         getSortData: {
            sortbyname: '.sortbyname',
            sortbynamedescending: '.sortbyname',
            sortbyprice: function(itemElem) {
               var sortbyprice = $(itemElem).find('.sortbyprice').text();
               return parseFloat(sortbyprice.replace(/[\(\)]/g, ''));
            },
            sortbypricedescending: function(itemElem) {
               var sortbyprice = $(itemElem).find('.sortbyprice').text();
               return parseFloat(sortbyprice.replace(/[\(\)]/g, ''));
            },
            sortbyrating: function(itemElem) {
               var sortbyrating = $(itemElem).find('.sortbyrating').text();
               return parseFloat(sortbyrating.replace(/[\(\)]/g, ''));
            },
            sortbyratingdescending: function(itemElem) {
               var sortbyrating = $(itemElem).find('.sortbyrating').text();
               return parseFloat(sortbyrating.replace(/[\(\)]/g, ''));
            },
            sortbydate: function(itemElem) {
               var date = new Date($(itemElem).find('.sortbydate').text());
               return date.getTime();
            },
            sortbydatedescending: function(itemElem) {
               var date = new Date($(itemElem).find('.sortbydate').text());
               return date.getTime();
            }
         },
         sortAscending: {
            sortbyname: true,
            sortbynamedescending: false,
            sortbyprice: true,
            sortbypricedescending: false,
            sortbyrating: true,
            sortbyratingdescending: false,
            sortbydate: true,
            sortbydatedescending: false
         }
      });
      $('.selecter-options').on('click', 'span', function() {
		  phvarshopfitrows.find(".shop-item").removeClass("wow animated fadeInUp");
         var sortValue = $(this).attr('data-value');
         $grid.isotope({
            sortBy: sortValue
         });
		 phvarshopfitrows.find(".shop-item").addClass("wow animated fadeInUp");
      });
      var filterFns = {
         filterPrice: function() {
            var price = jQuery(".price-filter-desc #amount").val();
            price = price.replace(/ /g, "").split("-");
            var number = $(this).find('.sortbyprice').text();
            return parseInt(number, 10) >= parseInt(price[0].replace("$", ""), 10) && parseInt(number, 10) <= parseInt(price[1].replace("$", ""), 10);
         },
      };
      $(".price-filter-desc a").on( "click", function(e) {
         e.preventDefault();
		 phvarshopfitrows.find(".shop-item").removeClass("wow animated fadeInUp");
         var filterValue = "filterPrice";
         filterValue = filterFns[filterValue] || filterValue;
         $grid.isotope({
            filter: filterValue
         });
		 phvarshopfitrows.find(".shop-item").addClass("wow animated fadeInUp");
      });
   };
};
function phshopsortResize() {
      if ($('.shopfitrows').length && jQuery() && jQuery(".shopfitrows").data('isotope')) {
         var shopfitrows = jQuery(".shopfitrows");
         shopfitrows.isotope("destroy");
         phshopsort();
      };
};
/*
=======================================================
 Shop Masonry Sort
=======================================================
*/ 
function phshopsortmasonry() {
   var phvarshopmasonry = $('.shopmasonry');
   if (phvarshopmasonry.length && jQuery()) {
      var $gridmasonry;
      $gridmasonry = phvarshopmasonry.isotope({
         itemSelector: '.shop-item',
         layoutMode: 'masonry',
         getSortData: {
            sortbyname: '.sortbyname',
            sortbynamedescending: '.sortbyname',
            sortbyprice: function(itemElem) {
               var sortbyprice = $(itemElem).find('.sortbyprice').text();
               return parseFloat(sortbyprice.replace(/[\(\)]/g, ''));
            },
            sortbypricedescending: function(itemElem) {
               var sortbyprice = $(itemElem).find('.sortbyprice').text();
               return parseFloat(sortbyprice.replace(/[\(\)]/g, ''));
            },
            sortbyrating: function(itemElem) {
               var sortbyrating = $(itemElem).find('.sortbyrating').text();
               return parseFloat(sortbyrating.replace(/[\(\)]/g, ''));
            },
            sortbyratingdescending: function(itemElem) {
               var sortbyrating = $(itemElem).find('.sortbyrating').text();
               return parseFloat(sortbyrating.replace(/[\(\)]/g, ''));
            },
            sortbydate: function(itemElem) {
               var date = new Date($(itemElem).find('.sortbydate').text());
               return date.getTime();
            },
            sortbydatedescending: function(itemElem) {
               var date = new Date($(itemElem).find('.sortbydate').text());
               return date.getTime();
            }
         },
         sortAscending: {
            sortbyname: true,
            sortbynamedescending: false,
            sortbyprice: true,
            sortbypricedescending: false,
            sortbyrating: true,
            sortbyratingdescending: false,
            sortbydate: true,
            sortbydatedescending: false
         }
      });
      $('.selecter-options').on('click', 'span', function() {
		  phvarshopmasonry.find(".shop-item").removeClass("wow animated fadeInUp");
         var sortValue = $(this).attr('data-value');
         $gridmasonry.isotope({
            sortBy: sortValue
         });
		 phvarshopmasonry.find(".shop-item").addClass("wow animated fadeInUp");
      });
      var filterFns = {
         filterPrice: function() {
            var price = jQuery(".price-filter-desc #amount").val();
            price = price.replace(/ /g, "").split("-");
            var number = $(this).find('.sortbyprice').text();
            return parseInt(number, 10) >= parseInt(price[0].replace("$", ""), 10) && parseInt(number, 10) <= parseInt(price[1].replace("$", ""), 10);
         },
      };
      $(".price-filter-desc a").on( "click", function(e) {
		  phvarshopmasonry.find(".shop-item").removeClass("wow animated fadeInUp");
         e.preventDefault();
         var filterValue = "filterPrice";
         filterValue = filterFns[filterValue] || filterValue;
         $gridmasonry.isotope({
            filter: filterValue
         });
		 phvarshopmasonry.find(".shop-item").addClass("wow animated fadeInUp");
      });
   };
};
function phshopsortmasonryResize() {
      if ($('.shopmasonry').length && jQuery() && jQuery(".shopmasonry").data('isotope')) {
         var shopmasonry = jQuery(".shopmasonry");
         shopmasonry.isotope("destroy");
         phshopsortmasonry();
      };
};
/*
=======================================================
 Flexslider FullScreen
=======================================================
*/
function phflexsliderfullscreen() {
   $(window).load(function() {
	   var phvarflexsliderfullscreen = $('.flexslider.fullscreen');
      if (phvarflexsliderfullscreen.length && jQuery()) {
         phvarflexsliderfullscreen.flexslider({
            animation: "fade",
            slideshowSpeed: 5000,
            animationSpeed: 1500,
            animationLoop: true,
            pausePlay: false,
            slideshow: true,
            start: function() {
               phparallaxvideo();
               phparallax();
            }
         });
      };
   });
};
/*
=======================================================
 Flexslider Thumbnails
=======================================================
*/
function phflexsliderthumbnails() {
   if ($('.flexslider.flex-slider-thumbnail').length && jQuery()) {
      $('#flex-thumbnail-carousel').flexslider({
         animation: "slide",
         controlNav: false,
         animationLoop: false,
         slideshow: false,
         itemWidth: 322,
         itemMargin: 5,
         asNavFor: '#flex-thumbnail-slider'
      });
      $('#flex-thumbnail-slider').flexslider({
         animation: "slide",
         controlNav: false,
         animationLoop: false,
         slideshow: false,
         sync: "#flex-thumbnail-carousel"
      });
   };
};
/*
=======================================================
 Flexslider Single Shop
=======================================================
*/
function phflexslidersingleshop() {
   $(window).load(function() {
      if ($('.flexslider.shop-single-slider').length && jQuery()) {
         $('.flexslider.shop-single-carousel').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 158,
            itemMargin: 0,
            asNavFor: '.flexslider.shop-single-slider'
         });
         $('.flexslider.shop-single-slider').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            direction: "vertical",
            directionNav: false,
            slideshow: false,
            sync: ".flexslider.shop-single-carousel"
         });
      };
   });
};
/*
=======================================================
 Flexslider Single Post
=======================================================
*/
function phflexslidersinglepost() {
	var phvarflexsinglepostslider = $('.flexslider.single-post-slider');
   if (phvarflexsinglepostslider.length && jQuery()) {
      phvarflexsinglepostslider.flexslider({
         animation: "slide",
         controlNav: true,
         direction: "horizontal",
         directionNav: true,
         slideshow: true,
         start: function() {
            phblogmasonry();
            phmasonryblog();
            phmasonryblogmixed();
         }
      });
   };
};
/*
=======================================================
 Flexslider Portfolio
=======================================================
*/
function phflexsliderportfolio() {
	var phvarflexportfolioslider = $('.flexslider.portofolio-slider');
   if (phvarflexportfolioslider.length && jQuery()) {
      phvarflexportfolioslider.flexslider({
         animation: "slide",
         slideshowSpeed: 40000,
         animationSpeed: 500,
         animationLoop: false,
         pausePlay: false,
         slideshow: true,
         start: function() {
            phportfoliomasonry();
            phportfoliomasonrymixed();
         }
      });
   };
};
/*
=======================================================
 Flexslider Clients
=======================================================
*/
function phflexsliderclients() {
   $(window).load(function() {
	   var phvarflexclientsslider = $('.flexslider.clients');
      if (phvarflexclientsslider .length && jQuery()) {
         phvarflexclientsslider.flexslider({
            animation: "slide",
            slideshowSpeed: 4000,
            animationSpeed: 1500,
            animationLoop: false,
            smoothHeight: true,
            pausePlay: false,
            slideshow: false,
            controlNav: true,
            directionNav: false
         });
      };
   });
};
/*
=======================================================
 Isotope Portfolio Fit Rows
=======================================================
*/
function phportfoliofitrows() {
	var phvarportfoliofitrows = $('.portfoliofitrows');
   if (phvarportfoliofitrows.length && jQuery()) {
      phvarportfoliofitrows.isotope({
         itemSelector: '.p-item',
         percentPosition: true,
         layoutMode: 'fitRows',
         masonry: {}
      });
      phflexsliderportfolio();
   };
};
/*
=======================================================
 Isotope Gallery Fit Rows
=======================================================
*/
function phgalleryfitrows() {
   if ($('.galleryfitrows').length && jQuery()) {
      $('.galleryfitrows').isotope({
         itemSelector: '.g-item',
         percentPosition: true,
         layoutMode: 'fitRows',
         masonry: {}
      });
   };
};
/*
=======================================================
 Isotope Portfolio Masonry
=======================================================
*/
function phportfoliomasonry() {
   if ($('.portfoliomasonry').length && jQuery()) {
      $('.portfoliomasonry').isotope({
         itemSelector: '.p-item',
         percentPosition: true,
         masonry: {}
      });
      phflexsliderportfolio();
   };
};
/*
=======================================================
 Isotope Portfolio Masonry
=======================================================
*/
function phportfoliomasonrymixed() {
   if ($('.portfoliomasonrymixed').length && jQuery()) {
      $('.portfoliomasonrymixed').isotope({
         itemSelector: '.p-item',
         percentPosition: true,
         masonry: {
            columnWidth: '.p-sizer'
         }
      });
      phflexsliderportfolio();
   };
};
/*
=======================================================
 Shop Categories Masonry
=======================================================
*/
function phshopcategoriesmasonry() {
   if ($('.shopcategoriesmasonry').length && jQuery()) {
      $('.shopcategoriesmasonry').isotope({
         itemSelector: '.sc-item',
         percentPosition: true,
         masonry: {
            columnWidth: '.sc-sizer'
         }
      });
   };
};
/*
=======================================================
 Isotope Blog Masonry
=======================================================
*/
function phblogmasonry() {
   if ($('.blog-masonry').length && jQuery()) {
      $('.blog-masonry').isotope({
         itemSelector: '.blog-item',
         percentPosition: true,
         masonry: {}
      });
      phflexslidersinglepost();
   };
};

function phblogmasonryResize() {
   if ($('.blog-masonry').length && jQuery() && jQuery(".blog-masonry").data('isotope')) {
      var blogmasonry = jQuery(".blog-masonry");
      blogmasonry.isotope("destroy");
      phblogmasonry();
   };
};

function phmasonryblogmixed() {
   if ($('.blog-masonry-mixed').length && jQuery()) {
      $('.blog-masonry-mixed').isotope({
         itemSelector: '.blog-item',
         percentPosition: true,
         masonry: {
            columnWidth: '.b-sizer'
         }
      });
      phflexslidersinglepost();
   };
};

function phmasonryblogmixedResize() {
   if ($('.blog-masonry-mixed').length && jQuery() && jQuery(".blog-masonry-mixed").data('isotope')) {
      var masonryblogmixed = jQuery(".blog-masonry-mixed");
      masonryblogmixed.isotope("destroy");
      phmasonryblogmixed();
   };
};

function phmasonryblog() {
   if ($('.masonry-blog').length && jQuery()) {
      $('.masonry-blog').isotope({
         itemSelector: '.blog-item',
         percentPosition: true,
         masonry: {}
      });
      phflexslidersinglepost();
   };
};

function phmasonryblogResize() {
      if ($('.masonry-blog').length && jQuery() && jQuery(".masonry-blog").data('isotope')) {
         var masonryblog = jQuery(".masonry-blog");
         masonryblog.isotope("destroy");
         phmasonryblog();
      };
};
/*
=======================================================
 Isotope Blog Fit Rows
=======================================================
*/
function phblogfitrows() {
   if ($('.blogfitrows').length && jQuery()) {
      var blogfitrows = jQuery(".blogfitrows");
      blogfitrows.isotope({
         itemSelector: '.blog-item',
         percentPosition: true,
         layoutMode: 'fitRows'
      });
      phflexslidersinglepost();
   };
};

function phblogfitrowsResize() {
      if ($('.blogfitrows').length && jQuery() && jQuery(".blogfitrows").data('isotope')) {
         var blogfitrows = jQuery(".blogfitrows");
         blogfitrows.isotope("destroy");
         phblogfitrows();
      };
};
/*
=======================================================
 Isotope Portfolio Filter
=======================================================
*/
function phportfoliofilter() {
	var phvarportfoliofilter = $('#portfolio-filter');
   if (phvarportfoliofilter.length && jQuery()) {
      phvarportfoliofilter.on( "click", "a", function(e) {
         e.preventDefault();
		 var phvarportfoliogrids = $('.portfoliofitrows, .portfoliomasonry, .portfoliomasonrymixed');
         phvarportfoliogrids.find(".p-item").removeClass("wow animated fadeInUp");
         if ($(this).hasClass('activeFilter')) {
            return false;
         }
         $(this).parents('#portfolio-filter').find('.activeFilter').removeClass('activeFilter');
         $(this).addClass('activeFilter');
         var filterValue = $(this).attr('data-filter');
         phvarportfoliogrids.isotope({
            filter: filterValue
         });
         phvarportfoliogrids.find(".p-item").addClass("wow animated fadeInUp");
      });
   };
};
/*
=======================================================
 SwipeBox
=======================================================
*/
function phswipebox() {
   if ($('.swipebox').length && jQuery()) {
      $('.swipebox').swipebox();
   };
};
/*
=======================================================
 Shop Product Counter
=======================================================
*/
function phproductcounter() {
	var valueElement = $('#value');
   if (valueElement.length && jQuery()) {
      function incrementValue(e) {
         valueElement.val(Math.max(parseInt(valueElement.val()) + e.data.increment, 0));
         return false;
      }
      $('.count-plus').on('click', {
         increment: 1
      }, incrementValue);
      $('.count-minus').on('click', {
         increment: -1
      }, incrementValue);
   };
};
/*
=======================================================
 Add Cart Counter
=======================================================
*/
function phaddcartcounter() {
	var valuecartcount = $('.header-cart-count');
   if (valuecartcount.length && jQuery()) {
      function incrementheadercount(e) {
         valuecartcount.html(Math.max(parseInt(valuecartcount.html()) + e.data.increment, 0));
         return false;
      }
      $('.add-to-cart-item').off("click").on('click', {
         increment: 1
      }, incrementheadercount);
   };
};
/*
=======================================================
 Footer CopyRights
=======================================================
*/
var copyright = jQuery("#copyrights .copyrights-text, .copyrights-text");
if (copyright.length > 0 && jQuery()) {
   var dateNow = new Date(),
      intYear = dateNow.getFullYear(),
      content = 'Copyrights &#169; ' + intYear + ' All Rights Reserved by <a href="http://www.pixelsharmony.com/" target="_blank">PixelsHarmony';
   copyright.html(content);
};
/*
=======================================================
 Parallax Effect
=======================================================
*/
function modalNewsletterShop() {
      var modal = jQuery("#ad-modal-shop");
      if (modal.length > 0 && jQuery()) {
         modal.modal("show");
      }
};
/*
=======================================================
 Sidebar Sticky
=======================================================
*/
function phsidebarsticky() {
     jQuery('.main-sticky, .sidebar-sticky').theiaStickySidebar({

    });
};
/*
=======================================================
 Parallax Effect Fix
=======================================================
*/
function phparallaxfixheight() {
	var phvarjsparallax = $('.js-parallax');
   if (phvarjsparallax.hasClass('full-height')) {
      phvarjsparallax.parallax({
         iosFix: true,
         androidFix: true
      });
   } else {
      phvarjsparallax.each(function() {
         var parallaxheight = $(this).outerHeight();
         $(this).css("height", parallaxheight);
      });
      phvarjsparallax.parallax({
         iosFix: true,
         androidFix: true
      });
   }
};

function phparallaxcall() {
   $(window).trigger('resize');
   $(window).load(function() {
      $('.js-parallax').parallax({
         iosFix: true,
         androidFix: true
      });
   });
};

function phparallax() {
   if ($('.js-parallax').length && jQuery()) {
      jQuery(window).load(function() {
         $.when(phparallaxfixheight()).then(phparallaxcall());
         $.when(phpiechart()).then(phparallaxcall());
      });
   };
};
/*
=======================================================
 ToolTip
=======================================================
*/
function phptooltip() {
   if ($('[data-toggle="tooltip"]').length && jQuery()) {
      $('[data-toggle="tooltip"]').tooltip();
   };
};
/*
=======================================================
 Popover
=======================================================
*/
function phpopover() {
   if ($('[data-toggle="popover"]').length && jQuery()) {
      $('[data-toggle="popover"]').popover();
   };
};
/*
=======================================================
 Search Collapse
=======================================================
*/
function phsearchcollapse() {
   if ($('.btn-search').length && jQuery()) {
	   var phvarsearchpopupbox = $('.search-popup-box');
      $('.btn-search').on( "click", function(event) {
         event.preventDefault();
         phvarsearchpopupbox.addClass('visible');
         $('.search-form-popup input').focus();
         phvarsearchpopupbox.removeClass("fadeOutUp").addClass("fadeInDown").delay(1000).after(function() {});
         $(document).keyup(function(e) {

           if (e.keyCode === 27){
               $('.search-popup-close').trigger('click');
           }
         });
      });
      $('.search-popup-close').on( "click", function(event) {
         event.preventDefault();
         var timeout = setTimeout(function() {
            phvarsearchpopupbox.removeClass("visible");
            clearTimeout(timeout);
         }, 1000);
         phvarsearchpopupbox.addClass("fadeOutUp");
      });
   };
};
/*
=======================================================
 Link Prevent
=======================================================
*/
function phlinkprevent() {
   $("a[href^='#']").on( "click", function(event) {
      event.preventDefault();
   });
};
/*
=======================================================
 Contact Form Collapse
=======================================================
*/
function phcontactformcollapse() {
	var phvarcontactoverlaymap = $('.contact-overlay-map');
   if (phvarcontactoverlaymap.length && jQuery()) {
      $('.minimize-form').on( "click", function(event) {
         event.preventDefault();
         phvarcontactoverlaymap.addClass('contact-form-hidden');
      });
      $('.maximize-form').on( "click", function(event) {
         event.preventDefault();
         phvarcontactoverlaymap.removeClass('contact-form-hidden');
      });
   };
};
/*
=======================================================
 Wishlist Shop Select
=======================================================
*/
function phwishlistshopselect() {
   if ($('.add-to-wishlist').length && jQuery()) {
      $('.add-to-wishlist').off("click").on("click", function(event) {
         var button = $(this),
            text = '';
         button.toggleClass('select');
         event.preventDefault();
         jQuery(".wishlist-modal").delay(2500).remove();
         if (button.hasClass("select")) {
            jQuery("body").append('<div class="wishlist-modal added">Item added to wishlist</div>');
         } else {
            jQuery("body").append('<div class="wishlist-modal removed ">Item removed from wishlist</div>');
         }
         var animacija = "pulse";
         jQuery('.wishlist-modal').addClass(animacija + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            jQuery(this).delay(2500).remove();
         });
      });
   };
};
/*
=======================================================
 Shop Layout Switch
=======================================================
*/
function phshoplayoutswitch() {
   if ($('.shop-layout-filter').length && jQuery()) {
	   var phvarshoplistbox = $('.shop-list-box');
      $('.shop-layout-filter li a.box-layout-mode').on( "click", function(event) {
         event.preventDefault();
		 
         $('.shop-list').find(".shop-item").removeClass("wow animated fadeInUp");
         $(".shop-product .shop-desc").css("min-height", "auto");
         if (phvarshoplistbox.hasClass('shop-type-list')) {
            phvarshoplistbox.removeClass('shop-type-list');
         } else {
            phvarshoplistbox.addClass('shop-type-box');
         };
         if (!$(this).hasClass('active')) {
            $('.shop-layout-filter li a.active').removeClass("active");
            $(this).addClass("active");
         };
         phshopsort();
         phshopsortmasonry();
      });
      $('.shop-layout-filter li a.list-layout-mode').on( "click", function(event) {
         event.preventDefault();
         $('.shop-list').find(".shop-item").removeClass("wow animated fadeInUp");
         if (phvarshoplistbox.hasClass('shop-type-box')) {
            phvarshoplistbox.removeClass('shop-type-box');
         } else {
            phvarshoplistbox.addClass('shop-type-list');
         };
         if (!$(this).hasClass('active')) {
            $('.shop-layout-filter li a.active').removeClass("active");
            $(this).addClass("active");
         };
         phshoplayoutlistfix();
         phshopsort();
         phshopsortmasonry();
      });
   };
};

function phshoplayoutlistfix() {
   if ($('.shop-layout-filter').length && jQuery()) {
      var $shoplistitembuttonsheight = $('.shop-type-list .shop-product .shop-item-buttons').height() + 1;
      var $shoplistimageheight = $('.shop-type-list .shop-product .shop-image-holder').height() - $shoplistitembuttonsheight;
      $(".shop-type-list .shop-product .shop-desc").css("min-height", $shoplistimageheight);
   };
};
/*
=======================================================
 Portfolio Layout Switch
=======================================================
*/
function phportfoliolayoutswitch() {
   if ($('.shop-layout-filter').length && jQuery()) {
      $('.portfolio-layout-filter li a.box-layout-mode').on( "click", function(event) {
         event.preventDefault();
         $('.portfoliofitrows, .portfoliomasonry, .portfoliomasonrymixed').find(".p-item").removeClass("wow animated fadeInUp");
         $(".portfolio-section.portfolio-type-list .text_holder_normal").css("min-height", "auto");
         if ($('.portfolio-section').hasClass('portfolio-type-list')) {
            $('.portfolio-section').removeClass('portfolio-type-list');
         } else {
            $('.portfolio-section').addClass('portfolio-type-box');
         };
         if (!$(this).hasClass('active')) {
            $('.portfolio-layout-filter li a.active').removeClass("active");
            $(this).addClass("active");
         };
         phportfoliofitrows();
      });
      $('.portfolio-layout-filter li a.list-layout-mode').on( "click", function(event) {
         event.preventDefault();
         $('.portfoliofitrows, .portfoliomasonry, .portfoliomasonrymixed').find(".p-item").removeClass("wow animated fadeInUp");
         if ($('.portfolio-section').hasClass('portfolio-type-box')) {
            $('.portfolio-section').removeClass('portfolio-type-box');
         } else {
            $('.portfolio-section').addClass('portfolio-type-list');
         };
         if (!$(this).hasClass('active')) {
            $('.portfolio-layout-filter li a.active').removeClass("active");
            $(this).addClass("active");
         };
         phportfoliolayoutlistfix();
         phportfoliofitrows();
      });
   };
};

function phportfoliolayoutlistfix() {
   if ($('.shop-layout-filter').length && jQuery()) {
      var $portfolioimageheight = $('.portfolio-type-list .image-box').height();
      $(".portfolio-type-list .text_holder_normal").css("min-height", $portfolioimageheight);
   };
};
/*
=======================================================
 Navigation
=======================================================
*/
function phnavigationleftright() {
   $(".dropdown").on('mouseenter mouseleave', function(e) {
      if ($('ul', this).length) {

         var ddelm = $('.dropdown-menu:first', this);
		 var ddoff = ddelm.offset();
		 var ddl = ddoff.left;
         var ddw = ddelm.width();
		 var ddfw = $("#header").width();

         var isEntirelyVisible = (ddl + ddw <= ddfw);
         if (!isEntirelyVisible) {
            $(this).addClass('dropdown-right');
         } else {
            $(this).removeClass('dropdown-right');
         }
      }
   });
};

function phnavigation() {


   $(".dropdown").hoverIntent(mousein_triger , mouseout_triger);

   function mousein_triger(){
   $(this).find('.dropdown-menu:first').stop().fadeIn("fast");



   };
   function mouseout_triger() {
   $(this).find('.dropdown-menu:first').hide();
   $(this).find('.dropdown-menu:first').attr('style','');
   };

   var flag = true;
   $('.navbar-toggle').off("click").on( "click", function(e) {
      e.preventDefault();
      var width = jQuery(".offscreen-container").width(),
         itemTest = jQuery(this);
      console.log(width);
      if (!flag) {
         width = 0;
         nav_close_accordion_section_faster();
      }
      jQuery("#wrapper").animate({
         left: width
      }, {
         duration: 300,
         step: function(left) {
            itemTest.parent().css("left", left);
         },
         complete: function() {
            jQuery("window").trigger("resize");
         }
      });
      flag = !flag;
   });
   $('.main-container').off("click").on( "click", function(e) {
      e.preventDefault();
      var width = jQuery("#nav-accordion").width();
      if (!flag) {
         width = 0;
      } else {
         return;
      }
      jQuery(this).parent().animate({
         left: width
      }, {
         duration: 300,
         step: function(left) {
            jQuery("#header").css("left", left);
         }
      });
      flag = !flag;
   });
   if (screen.width > 677) {
      $(function() {
         $(window).on("resize", function() {
            var height = $(window).height();
            var k = $("#header").height();
            var l = $("#nav").height();
            $('.background-slider-item').height(height - k - l);
         }).trigger("resize");
      });
   } else if (screen.width < 677) {
      $(function() {
         $(window).on("resize", function() {
            var k = $("#header").height();
            var l = $("#nav").height();
            $('.flexslider').css("padding-top", k + l + "px");
            $('#content').css("padding-top", k + l + "px");
         }).trigger("resize");
      });
   }
   equalheight = function(container) {
      var currentTallest = 0,
         currentRowStart = 0,
         rowDivs = new Array(),
         $el,
         topPosition = 0;
      $(container).each(function() {
         $el = $(this);
         $($el).height('auto')
         topPostion = $el.position().top;
         if (currentRowStart != topPostion) {
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
               rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0;
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
         } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
         }
         for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
         }
      });
   }
};
/*
=======================================================
 Revolution FullScreen Slider
=======================================================
*/
function phrevolutionslider() {
   if ($('.tp-banner').length && jQuery()) {
      $('.tp-banner').show().revolution({
         sliderType: "standard",
         sliderLayout: "fullscreen",
         dottedOverlay: "none",
         delay: 9000,
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            touch: {
               touchenabled: "on",
               swipe_threshold: 75,
               swipe_min_touches: 1,
               swipe_direction: "horizontal",
               drag_block_vertical: false
            },
            arrows: {
               style: "hades",
               enable: true,
               hide_onmobile: false,
               hide_onleave: true,
               tmp: '<div class="tp-arr-allwrapper">	<div class="tp-arr-imgholder"></div></div>',
               left: {
                  h_align: "left",
                  v_align: "center",
                  h_offset: 0,
                  v_offset: 0
               },
               right: {
                  h_align: "right",
                  v_align: "center",
                  h_offset: 0,
                  v_offset: 0
               }
            }
         },
         responsiveLevels: [1900, 1600, 1400, 1024, 778, 480],
         gridwidth: [1900, 1600, 1240, 1024, 778, 480],
         gridheight: [900, 900, 640, 400, 400, 300],
         lazyType: "none",
         parallax: {
            type: "mouse",
            origo: "slidercenter",
            speed: 2000,
            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
         },
         shadow: 0,
         spinner: "off",
         autoHeight: "off",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            disableFocusListener: false,
         }
      });
   };
};
/*
=======================================================
 Revolution Slider FullWidth
=======================================================
*/
function phrevolutionsliderfull() {
   if ($('#fullwidth-revoultion').length && jQuery()) {
      $('#fullwidth-revoultion').show().revolution({
         sliderType: "standard",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "auto",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            touch: {
               touchenabled: "on",
               swipe_threshold: 75,
               swipe_min_touches: 1,
               swipe_direction: "horizontal",
               drag_block_vertical: false
            },
            arrows: {
               style: "hades",
               enable: true,
               hide_onmobile: false,
               hide_onleave: true,
               tmp: '<div class="tp-arr-allwrapper">	<div class="tp-arr-imgholder"></div></div>',
               left: {
                  h_align: "left",
                  v_align: "center",
                  h_offset: 0,
                  v_offset: 0
               },
               right: {
                  h_align: "right",
                  v_align: "center",
                  h_offset: 0,
                  v_offset: 0
               }
            }
         },
         responsiveLevels: [1600, 1400, 1024, 778, 480],
         gridwidth: [1600, 1240, 1024, 778, 480],
         gridheight: [700, 560, 640, 500, 500],
         lazyType: "none",
         parallax: {
            type: "mouse",
            origo: "slidercenter",
            speed: 2000,
            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
         },
         shadow: 0,
         spinner: "off",
         autoHeight: "off",
         disableProgressBar: "on",
         hideThumbsOnMobile: "on",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider FullWidth
=======================================================
*/
function phrevolutionslidertravel() {
      if ($('#travel-revolution-slider').length && jQuery()) {
         $('#travel-revolution-slider').show().revolution({
            sliderType: "standard",
            jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
            sliderLayout: "auto",
            dottedOverlay: "none",
            delay: 6000,
            navigation: {
               keyboardNavigation: "off",
               keyboard_direction: "horizontal",
               mouseScrollNavigation: "off",
               onHoverStop: "off",
               touch: {
                  touchenabled: "on",
                  swipe_threshold: 75,
                  swipe_min_touches: 1,
                  swipe_direction: "horizontal",
                  drag_block_vertical: false
               },
               bullets: {
                  enable: true,
                  hide_onmobile: true,
                  hide_under: 600,
                  style: "hermes",
                  hide_onleave: true,
                  hide_delay: 200,
                  hide_delay_mobile: 1200,
                  direction: "vertical",
                  h_align: "right",
                  v_align: "center",
                  h_offset: 30,
                  v_offset: 0,
                  space: 5,
                  tmp: ''
               }
            },
            viewPort: {
               enable: true,
               outof: "pause",
               visible_area: "80%"
            },
            responsiveLevels: [1600, 1290, 778, 480],
            gridwidth: [1600, 1290, 778, 480],
            gridheight: [795, 560, 500, 400],
            lazyType: "none",
            parallax: {
               type: "mouse",
               origo: "slidercenter",
               speed: 2000,
               levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
            },
            shadow: 0,
            spinner: "off",
            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: "off",
            autoHeight: "off",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
               simplifyAll: "off",
               nextSlideOnWindowFocus: "off",
               disableFocusListener: false,
            }
         });
      }
};
/*
=======================================================
 Revolution Slider FullWidth 600
=======================================================
*/
function phrevolutionsliderfull600() {
   if ($('#fullwidth-revoultion-600').length && jQuery()) {
      $('#fullwidth-revoultion-600').show().revolution({
         sliderType: "standard",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "auto",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            touch: {
               touchenabled: "on",
               swipe_threshold: 75,
               swipe_min_touches: 1,
               swipe_direction: "horizontal",
               drag_block_vertical: false
            },
            arrows: {
               style: "hades",
               enable: true,
               hide_onmobile: false,
               hide_onleave: true,
               tmp: '<div class="tp-arr-allwrapper"> <div class="tp-arr-imgholder"></div></div>',
               left: {
                  h_align: "left",
                  v_align: "center",
                  h_offset: 0,
                  v_offset: 0
               },
               right: {
                  h_align: "right",
                  v_align: "center",
                  h_offset: 0,
                  v_offset: 0
               }
            }
         },
         responsiveLevels: [1600, 1400, 1024, 778, 480],
         gridwidth: [1600, 1240, 1024, 778, 480],
         gridheight: [610, 540, 540, 500, 500],
         lazyType: "none",
         parallax: {
            type: "mouse",
            origo: "slidercenter",
            speed: 2000,
            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
         },
         shadow: 0,
         spinner: "off",
         autoHeight: "off",
         disableProgressBar: "on",
         hideThumbsOnMobile: "on",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Hero Slider
=======================================================
*/
function phrevolutionsliderhero() {
   if ($('#hero-revoultion').length && jQuery()) {
      $('#hero-revoultion').show().revolution({
         sliderType: "hero",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "fullscreen",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {},
         responsiveLevels: [1600, 1400, 1024, 778, 480],
         visibilityLevels: [1600, 1400, 1024, 778, 480],
         gridwidth: [1600, 1240, 1024, 778, 480],
         gridheight: [900, 640, 400, 400, 300],
         lazyType: "none",
         parallax: {
            type: "scroll",
            origo: "slidercenter",
            speed: 1000,
            levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
            type: "scroll",
         },
         shadow: 0,
         spinner: "spinner2",
         autoHeight: "off",
         fullScreenAutoWidth: "off",
         fullScreenAlignForce: "off",
         fullScreenOffsetContainer: "",
         fullScreenOffset: "0",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Intro FullWidth
=======================================================
*/
function phrevolutionsintroliderfull() {
   if ($('.revoultion-intro-slider').length && jQuery()) {
      $('.revoultion-intro-slider').show().revolution({
         sliderType: "standard",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "auto",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "on",
            touch: {
               touchenabled: "on",
               swipe_threshold: 75,
               swipe_min_touches: 1,
               swipe_direction: "horizontal",
               drag_block_vertical: false
            },
            arrows: {
               style: "hades",
               enable: true,
               hide_onmobile: false,
               hide_onleave: true,
               tmp: '<div class="tp-arr-allwrapper"> <div class="tp-arr-imgholder"></div></div>',
               left: {
                  h_align: "left",
                  v_align: "center",
                  h_offset: 0,
                  v_offset: 0
               },
               right: {
                  h_align: "right",
                  v_align: "center",
                  h_offset: 0,
                  v_offset: 0
               }
            }
         },
         responsiveLevels: [2560, 1600, 1400, 1280, 1024, 778, 480],
         gridwidth: [2560, 1600, 1240, 750, 700, 778, 480],
         gridheight: [1050, 750, 640, 400, 400, 300],
         lazyType: "none",
         parallax: {
            type: "mouse",
            origo: "slidercenter",
            speed: 2000,
            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
         },
         shadow: 0,
         spinner: "off",
         autoHeight: "off",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Team
=======================================================
*/
function phrevolutionsliderteam() {
   if ($('#team-revoultion').length && jQuery()) {
      $('#team-revoultion').show().revolution({
         sliderType: "standard",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "auto",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            onHoverStop: "off",
         },
         responsiveLevels: [1240, 1024, 778, 480],
         visibilityLevels: [1240, 1024, 778, 480],
         gridwidth: [1400, 1024, 778, 480],
         gridheight: [770, 650, 600, 500],
         lazyType: "none",
         shadow: 0,
         spinner: "off",
         stopLoop: "on",
         stopAfterLoops: 0,
         stopAtSlide: 1,
         shuffle: "off",
         autoHeight: "off",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Parallax
=======================================================
*/
function phrevolutionsliderparallax() {
   if ($('#parallax-revoultion').length && jQuery()) {
      $('#parallax-revoultion').show().revolution({
         sliderType: "hero",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "fullwidth",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {},
         responsiveLevels: [1600, 1240, 1024, 778, 480],
         visibilityLevels: [1600, 1240, 1024, 778, 480],
         gridwidth: [1600, 1400, 1240, 778, 480],
         gridheight: [820, 700, 768, 960, 720],
         lazyType: "none",
         parallax: {
            type: "3D",
            origo: "slidercenter",
            speed: 1000,
            levels: [5, 10, 15, 20, 25, 30, 5, 0, 45, 50, 47, 48, 49, 50, 51, 55],
            type: "3D",
            ddd_shadow: "off",
            ddd_bgfreeze: "off",
            ddd_overflow: "hidden",
            ddd_layer_overflow: "visible",
            ddd_z_correction: 65,
         },
         spinner: "off",
         autoHeight: "off",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Bullets
=======================================================
*/
function phrevolutionsliderfullbullets() {
   if ($('#fullscreen-with-bullets-revoultion').length && jQuery()) {
      $('#fullscreen-with-bullets-revoultion').show().revolution({
         sliderType: "standard",
         sliderLayout: "fullscreen",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            touch: {
               touchenabled: "on",
               swipe_threshold: 75,
               swipe_min_touches: 50,
               swipe_direction: "horizontal",
               drag_block_vertical: false
            },
            bullets: {
               enable: true,
               hide_onmobile: true,
               hide_under: 800,
               style: "zeus",
               hide_onleave: false,
               direction: "horizontal",
               h_align: "center",
               v_align: "bottom",
               h_offset: 0,
               v_offset: 30,
               space: 5,
               tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-imageoverlay"></span><span class="tp-bullet-title">{{title}}</span>'
            }
         },
         responsiveLevels: [1240, 1024, 778, 480],
         visibilityLevels: [1240, 1024, 778, 480],
         gridwidth: [1240, 1024, 778, 480],
         gridheight: [868, 768, 960, 720],
         lazyType: "none",
         parallax: {
            type: "scroll",
            origo: "slidercenter",
            speed: 1000,
            levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 100, 55],
            type: "scroll",
         },
         shadow: 0,
         spinner: "off",
         stopLoop: "on",
         stopAfterLoops: 0,
         stopAtSlide: 1,
         shuffle: "off",
         autoHeight: "off",
         fullScreenAutoWidth: "off",
         fullScreenAlignForce: "off",
         fullScreenOffsetContainer: "",
         fullScreenOffset: "60px",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider FullScreen with Thumbs
=======================================================
*/
function phrevolutionsliderfullthumbs() {
   if ($('#fullthumbs-revoultion').length && jQuery()) {
      $('#fullthumbs-revoultion').show().revolution({
         sliderType: "standard",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "auto",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            touch: {
               touchenabled: "on",
               swipe_threshold: 75,
               swipe_min_touches: 1,
               swipe_direction: "horizontal",
               drag_block_vertical: false
            },
            arrows: {
               style: "hades",
               enable: true,
               hide_onmobile: false,
               hide_onleave: true,
               tmp: '<div class="tp-arr-allwrapper">	<div class="tp-arr-imgholder"></div></div>',
               left: {
                  h_align: "left",
                  v_align: "center",
                  h_offset: 0,
                  v_offset: 0
               },
               right: {
                  h_align: "right",
                  v_align: "center",
                  h_offset: 0,
                  v_offset: 0
               }
            },
            thumbnails: {
               style: "erinyen",
               enable: true,
               width: 150,
               height: 100,
               min_width: 150,
               wrapper_padding: 5,
               wrapper_color: "transparent",
               wrapper_opacity: "1",
               tmp: '<span class="tp-thumb-over"></span><span class="tp-thumb-image"></span><span class="tp-thumb-title">{{title}}</span><span class="tp-thumb-more"></span>',
               visibleAmount: 5,
               hide_onmobile: true,
               hide_under: 800,
               hide_onleave: false,
               direction: "horizontal",
               span: false,
               position: "inner",
               space: 0,
               h_align: "center",
               v_align: "bottom",
               h_offset: 0,
               v_offset: 20
            }
         },
         viewPort: {
            enable: true,
            outof: "pause",
            visible_area: "80%"
         },
         responsiveLevels: [1240, 1024, 778, 480],
         visibilityLevels: [1240, 1024, 778, 480],
         gridwidth: [1240, 1024, 778, 480],
         gridheight: [800, 700, 600, 500],
         lazyType: "none",
         parallax: {
            type: "mouse",
            origo: "slidercenter",
            speed: 2000,
            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50, 46, 47, 48, 49, 50, 55],
            type: "mouse",
         },
         shadow: 0,
         spinner: "off",
         stopLoop: "off",
         stopAfterLoops: -1,
         stopAtSlide: -1,
         shuffle: "off",
         autoHeight: "off",
         hideThumbsOnMobile: "on",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Gallery Food
=======================================================
*/
function phrevolutionslidergalleryfood() {
   if ($('#gallery-food-revoultion').length && jQuery()) {
      $('#gallery-food-revoultion').show().revolution({
         sliderType: "carousel",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "fullwidth",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            arrows: {
               style: "metis",
               enable: true,
               hide_onmobile: true,
               hide_under: 768,
               hide_onleave: false,
               tmp: '',
               left: {
                  h_align: "left",
                  v_align: "center",
                  h_offset: 0,
                  v_offset: 0
               },
               right: {
                  h_align: "right",
                  v_align: "center",
                  h_offset: 0,
                  v_offset: 0
               }
            },
            thumbnails: {
               style: "erinyen",
               enable: true,
               width: 150,
               height: 100,
               min_width: 150,
               wrapper_padding: 20,
               wrapper_color: "#000000",
               wrapper_opacity: "0.05",
               tmp: '<span class="tp-thumb-over"></span><span class="tp-thumb-image"></span><span class="tp-thumb-title">{{title}}</span><span class="tp-thumb-more"></span>',
               visibleAmount: 9,
               hide_onmobile: false,
               hide_onleave: false,
               direction: "horizontal",
               span: true,
               position: "outer-bottom",
               space: 10,
               h_align: "center",
               v_align: "bottom",
               h_offset: 0,
               v_offset: 0
            }
         },
         carousel: {
            maxRotation: 65,
            vary_rotation: "on",
            minScale: 55,
            vary_scale: "off",
            horizontal_align: "center",
            vertical_align: "center",
            fadeout: "on",
            vary_fade: "on",
            maxVisibleItems: 5,
            infinity: "on",
            space: -150,
            stretch: "off"
         },
         gridwidth: 600,
         gridheight: 500,
         lazyType: "none",
         shadow: 0,
         spinner: "off",
         stopLoop: "on",
         stopAfterLoops: 0,
         stopAtSlide: 1,
         shuffle: "off",
         autoHeight: "off",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Gallery HighLights
=======================================================
*/
function phrevolutionslidergalleryhightlights() {
   if ($('#gallery-hightlights-revoultion').length && jQuery()) {
      $('#gallery-hightlights-revoultion').show().revolution({
         sliderType: "standard",
         sliderLayout: "auto",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            touch: {
               touchenabled: "on",
               swipe_threshold: 75,
               swipe_min_touches: 1,
               swipe_direction: "horizontal",
               drag_block_vertical: false
            },
            tabs: {
               style: "zeus",
               enable: true,
               width: 100,
               height: 30,
               min_width: 100,
               wrapper_padding: 0,
               wrapper_color: "transparent",
               wrapper_opacity: "0",
               tmp: '<span class="tp-tab-title">{{title}}</span>',
               visibleAmount: 3,
               hide_onmobile: true,
               hide_under: 480,
               hide_onleave: false,
               hide_delay: 200,
               direction: "horizontal",
               span: true,
               position: "inner",
               space: 1,
               h_align: "left",
               v_align: "top",
               h_offset: 30,
               v_offset: 100
            }
         },
         viewPort: {
            enable: true,
            outof: "pause",
            visible_area: "80%"
         },
         responsiveLevels: [1240, 1024, 778, 480],
         gridwidth: [1240, 1024, 767, 480],
         gridheight: [700, 700, 480, 360],
         lazyType: "none",
         parallax: {
            type: "scroll",
            origo: "enterpoint",
            speed: 400,
            levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
         },
         shadow: 0,
         spinner: "off",
         stopLoop: "off",
         stopAfterLoops: -1,
         stopAtSlide: -1,
         shuffle: "off",
         autoHeight: "off",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Gallery Simple
=======================================================
*/
function phrevolutionslidergallerysimple() {
   if ($('#gallery-simple-revoultion').length && jQuery()) {
      $('#gallery-simple-revoultion').show().revolution({
         sliderType: "carousel",
         sliderLayout: "auto",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "on",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            arrows: {
               style: "hesperiden",
               enable: true,
               hide_onmobile: true,
               hide_under: 778,
               hide_onleave: true,
               hide_delay: 200,
               hide_delay_mobile: 1200,
               tmp: '',
               left: {
                  h_align: "left",
                  v_align: "center",
                  h_offset: 20,
                  v_offset: 0
               },
               right: {
                  h_align: "right",
                  v_align: "center",
                  h_offset: 20,
                  v_offset: 0
               }
            },
            thumbnails: {
               style: "gyges",
               enable: true,
               width: 80,
               height: 80,
               min_width: 80,
               wrapper_padding: 20,
               wrapper_color: "#222222",
               wrapper_opacity: "1",
               tmp: '<span class="tp-thumb-img-wrap">  <span class="tp-thumb-image"></span></span>',
               visibleAmount: 10,
               hide_onmobile: false,
               hide_onleave: false,
               direction: "vertical",
               span: true,
               position: "outer-left",
               space: 10,
               h_align: "left",
               v_align: "top",
               h_offset: 0,
               v_offset: 0
            }
         },
         carousel: {
            border_radius: "20px",
            padding_top: "50",
            padding_bottom: "50",
            maxRotation: 35,
            vary_rotation: "on",
            minScale: 25,
            vary_scale: "on",
            horizontal_align: "center",
            vertical_align: "center",
            fadeout: "on",
            vary_fade: "on",
            maxVisibleItems: 7,
            infinity: "on",
            space: 30,
            stretch: "off"
         },
         responsiveLevels: [1600, 1300, 778, 480],
         gridwidth: [640, 640, 480, 320],
         gridheight: [640, 460, 480, 320],
         lazyType: "smart",
         shadow: 0,
         spinner: "spinner3",
         stopLoop: "on",
         stopAfterLoops: 0,
         stopAtSlide: 1,
         shuffle: "off",
         autoHeight: "off",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Gallery Media
=======================================================
*/
function phrevolutionslidergallerymedia() {
   if ($('#gallery-media-revoultion').length && jQuery()) {
      $('#gallery-media-revoultion').show().revolution({
         sliderType: "standard",
         sliderLayout: "auto",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            tabs: {
               style: "hesperiden",
               enable: true,
               width: 250,
               height: 80,
               min_width: 250,
               wrapper_padding: 0,
               wrapper_color: "#ffffff",
               wrapper_opacity: "1",
               tmp: '<div class="tp-tab-content">  <span class="tp-tab-date">{{param1}}</span>  <span class="tp-tab-title">{{title}}</span></div><div class="tp-tab-image"></div>',
               visibleAmount: 5,
               hide_onmobile: false,
               hide_onleave: false,
               hide_delay: 200,
               direction: "horizontal",
               span: false,
               position: "outer-bottom",
               space: 0,
               h_align: "center",
               v_align: "bottom",
               h_offset: 0,
               v_offset: 0
            }
         },
         responsiveLevels: [1600, 1300, 778, 480],
         gridwidth: [1600, 1300, 778, 480],
         gridheight: [800, 550, 480, 320],
         lazyType: "smart",
         shadow: 0,
         spinner: "off",
         stopLoop: "on",
         stopAfterLoops: 0,
         stopAtSlide: 1,
         shuffle: "off",
         autoHeight: "off",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Hosting
=======================================================
*/
function phrevolutionsliderhosting() {
   if ($('#hosting-revoultion').length && jQuery()) {
      $('#hosting-revoultion').show().revolution({
         sliderType: "standard",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "fullwidth",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            tabs: {
               style: "hesperiden",
               enable: true,
               width: 250,
               height: 80,
               min_width: 250,
               wrapper_padding: 20,
               wrapper_color: "#ffffff",
               wrapper_opacity: "1",
               tmp: '<div class="tp-tab-content">  <span class="tp-tab-date">{{param1}}</span>  <span class="tp-tab-title">{{title}}</span></div><div class="tp-tab-image"></div>',
               visibleAmount: 5,
               hide_onmobile: true,
               hide_onleave: false,
               hide_delay: 200,
               direction: "horizontal",
               span: false,
               position: "outer-bottom",
               space: 0,
               h_align: "left",
               v_align: "bottom",
               h_offset: 0,
               v_offset: 0
            }
         },
         responsiveLevels: [1400, 1281, 778, 480],
         visibilityLevels: [1400, 1281, 778, 480],
         gridwidth: [1400, 1281, 778, 480],
         gridheight: [600, 480, 480, 400],
         lazyType: "smart",
         shadow: 0,
         spinner: "off",
         stopLoop: "on",
         stopAfterLoops: 0,
         stopAtSlide: 1,
         shuffle: "off",
         autoHeight: "off",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Gym 2
=======================================================
*/
function phrevolutionslidergym2() {
   if ($('#gym-2-revoultion').length && jQuery()) {
      $('#gym-2-revoultion').show().revolution({
         sliderType: "standard",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "fullwidth",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            tabs: {
               style: "zeus",
               enable: true,
               width: 291,
               height: 80,
               min_width: 100,
               wrapper_padding: 0,
               wrapper_color: "transparent",
               wrapper_opacity: "0.05",
               tmp: '<span class="tp-tab-title">{{title}}</span>',
               visibleAmount: 5,
               hide_onmobile: false,
               hide_onleave: false,
               hide_delay: 200,
               direction: "horizontal",
               span: false,
               position: "inner",
               space: 5,
               h_align: "center",
               v_align: "bottom",
               h_offset: 10,
               v_offset: 44
            }
         },
         responsiveLevels: [2560, 1600, 1400, 1280, 1024, 778, 480],
         gridwidth: [2560, 1600, 1400, 1280, 1024, 778, 480],
         gridheight: [1050, 740, 551, 500, 400, 300, 300],
         lazyType: "smart",
         shadow: 0,
         spinner: "off",
         stopLoop: "on",
         stopAfterLoops: 0,
         stopAtSlide: 1,
         shuffle: "off",
         autoHeight: "off",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider News
=======================================================
*/
function phrevolutionslidernews() {
   if ($('#news-revoultion').length && jQuery()) {
      $('#news-revoultion').show().revolution({
         sliderType: "standard",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "auto",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            mouseScrollReverse: "default",
            onHoverStop: "on",
            touch: {
               touchenabled: "on",
               swipe_threshold: 75,
               swipe_min_touches: 50,
               swipe_direction: "horizontal",
               drag_block_vertical: false
            },
            thumbnails: {
               style: "gyges",
               enable: true,
               width: 80,
               height: 80,
               min_width: 80,
               wrapper_padding: 10,
               wrapper_color: "#333333",
               wrapper_opacity: "0",
               tmp: '<span class="tp-thumb-img-wrap">  <span class="tp-thumb-image"></span></span>',
               visibleAmount: 5,
               hide_onmobile: false,
               hide_onleave: false,
               direction: "vertical",
               span: true,
               position: "inner",
               space: 5,
               h_align: "left",
               v_align: "top",
               h_offset: 0,
               v_offset: 0
            }
         },
         responsiveLevels: [1240, 1024, 778, 480],
         visibilityLevels: [1240, 1024, 778, 480],
         gridwidth: [1200, 1024, 778, 480],
         gridheight: [600, 600, 600, 450],
         lazyType: "single",
         parallax: {
            type: "scroll",
            origo: "slidercenter",
            speed: 400,
            levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
            type: "scroll",
         },
         shadow: 0,
         spinner: "off",
         stopLoop: "off",
         stopAfterLoops: -1,
         stopAtSlide: -1,
         shuffle: "off",
         autoHeight: "off",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider One Page
=======================================================
*/
function phrevolutionslideronepage() {
   if ($('#one-page-revoultion').length && jQuery()) {
      $('#one-page-revoultion').show().revolution({
         sliderType: "standard",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "fullscreen",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "on",
            onHoverStop: "off",
            touch: {
               touchenabled: "on",
               swipe_threshold: 75,
               swipe_min_touches: 1,
               swipe_direction: "vertical",
               drag_block_vertical: false
            }
         },
         responsiveLevels: [1240, 1024, 778, 480],
         gridwidth: [1240, 1024, 778, 480],
         gridheight: [868, 768, 960, 720],
         lazyType: "none",
         shadow: 0,
         spinner: "off",
         stopLoop: "on",
         stopAfterLoops: 0,
         stopAtSlide: 1,
         shuffle: "off",
         autoHeight: "off",
         fullScreenAlignForce: "off",
         fullScreenOffsetContainer: "",
         fullScreenOffset: "",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Photo Gallery
=======================================================
*/
function phrevolutionsliderphotogallery() {
   if ($('#photo-gallery-revoultion').length && jQuery()) {
      $('#photo-gallery-revoultion').show().revolution({
         sliderType: "carousel",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "fullscreen",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            onHoverStop: "off",
         },
         carousel: {
            maxRotation: 5,
            vary_rotation: "off",
            minScale: 15,
            vary_scale: "off",
            horizontal_align: "center",
            vertical_align: "center",
            fadeout: "on",
            vary_fade: "on",
            maxVisibleItems: 3,
            infinity: "off",
            space: -80,
            stretch: "off"
         },
         responsiveLevels: [1240, 1024, 778, 480],
         gridwidth: [1024, 900, 778, 480],
         gridheight: [868, 768, 960, 720],
         lazyType: "none",
         shadow: 0,
         spinner: "off",
         stopLoop: "on",
         stopAfterLoops: 0,
         stopAtSlide: 1,
         shuffle: "off",
         autoHeight: "off",
         fullScreenAlignForce: "off",
         fullScreenOffsetContainer: "",
         fullScreenOffset: "",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Scroll Effect
=======================================================
*/
function phrevolutionsliderscrolleffect() {
   if ($('#scroll-effect-revoultion').length && jQuery()) {
      var serevoultion;
      serevoultion = $('#scroll-effect-revoultion').show().revolution({
         sliderType: "standard",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "fullscreen",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            touch: {
               touchenabled: "on",
               swipe_threshold: 75,
               swipe_min_touches: 1,
               swipe_direction: "horizontal",
               drag_block_vertical: false
            },
            bullets: {
               enable: true,
               hide_onmobile: true,
               hide_under: 960,
               style: "zeus",
               hide_onleave: false,
               direction: "horizontal",
               h_align: "right",
               v_align: "bottom",
               h_offset: 80,
               v_offset: 50,
               space: 5,
               tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-imageoverlay"></span><span class="tp-bullet-title">{{title}}</span>'
            }
         },
         responsiveLevels: [1240, 1024, 778, 480],
         gridwidth: [1240, 1024, 778, 480],
         gridheight: [868, 768, 960, 720],
         lazyType: "none",
         parallax: {
            type: "mouse",
            origo: "slidercenter",
            speed: 2000,
            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
            disable_onmobile: "on"
         },
         shadow: 0,
         spinner: "off",
         stopLoop: "on",
         stopAfterLoops: 0,
         stopAtSlide: 1,
         shuffle: "off",
         autoHeight: "off",
         fullScreenAlignForce: "off",
         fullScreenOffsetContainer: "",
         fullScreenOffset: "60px",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
      var newCall = new Object(),
         cslide;
      newCall.callback = function() {
         var proc = serevoultion.revgetparallaxproc(),
            fade = 1 + proc,
            scale = 1 + (Math.abs(proc) / 10);
         punchgs.TweenLite.set(serevoultion.find('.slotholder, .rs-background-video-layer'), {
            opacity: fade,
            scale: scale
         });
      }
      newCall.inmodule = "parallax";
      newCall.atposition = "start";
      serevoultion.on("revolution.slide.onloaded", function(e) {
         serevoultion.revaddcallback(newCall);
      });
   }
};
/*
=======================================================
 Revolution Slider Classic Full
=======================================================
*/
function phrevolutionsliderclassicfull() {
   if ($('#classic-full-revolution').length && jQuery()) {
      $("#classic-full-revolution").show().revolution({
         sliderType: "standard",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "fullwidth",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            touch: {
               touchenabled: "on",
               swipe_threshold: 75,
               swipe_min_touches: 1,
               swipe_direction: "horizontal",
               drag_block_vertical: false
            },
            arrows: {
               style: "zeus",
               enable: true,
               hide_onmobile: true,
               hide_under: 600,
               hide_onleave: true,
               hide_delay: 200,
               hide_delay_mobile: 1200,
               tmp: '<div class="tp-title-wrap">    <div class="tp-arr-imgholder"></div> </div>',
               left: {
                  h_align: "left",
                  v_align: "center",
                  h_offset: 30,
                  v_offset: 0
               },
               right: {
                  h_align: "right",
                  v_align: "center",
                  h_offset: 30,
                  v_offset: 0
               }
            },
            bullets: {
               enable: true,
               hide_onmobile: true,
               hide_under: 600,
               style: "metis",
               hide_onleave: true,
               hide_delay: 200,
               hide_delay_mobile: 1200,
               direction: "horizontal",
               h_align: "center",
               v_align: "bottom",
               h_offset: 0,
               v_offset: 30,
               space: 5,
               tmp: '<span class="tp-bullet-img-wrap">  <span class="tp-bullet-image"></span></span><span class="tp-bullet-title">{{title}}</span>'
            }
         },
         viewPort: {
            enable: true,
            outof: "pause",
            visible_area: "80%"
         },
         responsiveLevels: [2560, 1600, 1400, 1280, 1024, 778, 480],
         gridwidth: [2560, 1600, 1240, 750, 700, 778, 480],
         gridheight: [1050, 820, 640, 640, 400, 300],
         lazyType: "none",
         parallax: {
            type: "mouse",
            origo: "slidercenter",
            speed: 2000,
            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
         },
         shadow: 0,
         spinner: "off",
         stopLoop: "off",
         stopAfterLoops: -1,
         stopAtSlide: -1,
         shuffle: "off",
         autoHeight: "off",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Touch
=======================================================
*/
function phrevolutionslidertouch() {
   if ($('#touch-revoultion').length && jQuery()) {
      $('#touch-revoultion').show().revolution({
         sliderType: "standard",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "fullscreen",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            touch: {
               touchenabled: "on",
               swipe_threshold: 75,
               swipe_min_touches: 50,
               swipe_direction: "horizontal",
               drag_block_vertical: false
            },
            tabs: {
               style: "metis",
               enable: true,
               width: 250,
               height: 40,
               min_width: 249,
               wrapper_padding: 0,
               wrapper_color: "",
               wrapper_opacity: "0",
               tmp: '<div class="tp-tab-wrapper"><div class="tp-tab-number">{{param1}}</div><div class="tp-tab-divider"></div><div class="tp-tab-title-mask"><div class="tp-tab-title">{{title}}</div></div></div>',
               visibleAmount: 5,
               hide_onmobile: true,
               hide_under: 800,
               hide_onleave: false,
               hide_delay: 200,
               direction: "vertical",
               span: true,
               position: "inner",
               space: 0,
               h_align: "left",
               v_align: "center",
               h_offset: 0,
               v_offset: 0
            }
         },
         responsiveLevels: [1240, 1024, 778, 480],
         visibilityLevels: [1240, 1024, 778, 480],
         gridwidth: [1240, 1024, 778, 480],
         gridheight: [868, 768, 960, 720],
         lazyType: "none",
         parallax: {
            type: "3D",
            origo: "slidercenter",
            speed: 1000,
            levels: [2, 4, 6, 8, 10, 12, 14, 16, 45, 50, 47, 48, 49, 50, 0, 50],
            type: "3D",
            ddd_shadow: "off",
            ddd_bgfreeze: "on",
            ddd_overflow: "hidden",
            ddd_layer_overflow: "visible",
            ddd_z_correction: 100,
         },
         spinner: "off",
         stopLoop: "on",
         stopAfterLoops: 0,
         stopAtSlide: 1,
         shuffle: "off",
         autoHeight: "off",
         fullScreenAutoWidth: "off",
         fullScreenAlignForce: "off",
         fullScreenOffsetContainer: "",
         fullScreenOffset: "60px",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Vertical Bullet
=======================================================
*/
function phrevolutionsliderverticalbullet() {
   if ($('#slider-vb-revoultion').length && jQuery()) {
      $('#slider-vb-revoultion').show().revolution({
         sliderType: "standard",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "auto",
         dottedOverlay: "none",
         delay: 6000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            touch: {
               touchenabled: "on",
               swipe_threshold: 75,
               swipe_min_touches: 1,
               swipe_direction: "horizontal",
               drag_block_vertical: false
            },
            bullets: {
               enable: true,
               hide_onmobile: true,
               hide_under: 600,
               style: "hermes",
               hide_onleave: true,
               hide_delay: 200,
               hide_delay_mobile: 1200,
               direction: "vertical",
               h_align: "right",
               v_align: "center",
               h_offset: 30,
               v_offset: 0,
               space: 5,
               tmp: ''
            }
         },
         viewPort: {
            enable: true,
            outof: "pause",
            visible_area: "80%"
         },
         responsiveLevels: [1240, 1024, 778, 480],
         gridwidth: [1240, 1024, 778, 480],
         gridheight: [670, 600, 500, 400],
         lazyType: "none",
         parallax: {
            type: "mouse",
            origo: "slidercenter",
            speed: 2000,
            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
         },
         shadow: 0,
         spinner: "off",
         stopLoop: "off",
         stopAfterLoops: -1,
         stopAtSlide: -1,
         shuffle: "off",
         autoHeight: "off",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Vertical Bullet
=======================================================
*/
function phrevolutionslidernotgeneric() {
   if ($('#slider-not-generic-revoultion').length && jQuery()) {
      $('#slider-not-generic-revoultion').show().revolution({
         sliderType: "standard",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "fullscreen",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "off",
            touch: {
               touchenabled: "on",
               swipe_threshold: 75,
               swipe_min_touches: 1,
               swipe_direction: "horizontal",
               drag_block_vertical: false
            }
         },
         responsiveLevels: [1240, 1024, 778, 480],
         gridwidth: [1240, 1024, 778, 480],
         gridheight: [868, 768, 960, 720],
         lazyType: "none",
         parallax: {
            type: "mouse",
            origo: "slidercenter",
            speed: 2000,
            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
            disable_onmobile: "on"
         },
         shadow: 0,
         spinner: "off",
         stopLoop: "on",
         stopAfterLoops: 0,
         stopAtSlide: 1,
         shuffle: "off",
         autoHeight: "off",
         fullScreenAlignForce: "off",
         fullScreenOffsetContainer: "",
         fullScreenOffset: "0px",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 Revolution Slider Restaurant 1
=======================================================
*/
function phrevolutionsliderrestaurant1() {
      if ($('.slider-revolution-restaurant-1').length && jQuery()) {
         $('.slider-revolution-restaurant-1').show().revolution({
            sliderType: "standard",
            sliderLayout: "auto",
            dottedOverlay: "none",
            jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
            delay: 9000,
            navigation: {
               keyboardNavigation: "off",
               keyboard_direction: "horizontal",
               mouseScrollNavigation: "off",
               onHoverStop: "off",
               touch: {
                  touchenabled: "on",
                  swipe_threshold: 75,
                  swipe_min_touches: 1,
                  swipe_direction: "horizontal",
                  drag_block_vertical: false
               },
               arrows: {
                  style: "zeus",
                  enable: true,
                  hide_onmobile: true,
                  hide_under: 600,
                  hide_onleave: true,
                  hide_delay: 200,
                  hide_delay_mobile: 1200,
                  tmp: '<div class="tp-title-wrap">    <div class="tp-arr-imgholder"></div> </div>',
                  left: {
                     h_align: "left",
                     v_align: "center",
                     h_offset: 30,
                     v_offset: 0
                  },
                  right: {
                     h_align: "right",
                     v_align: "center",
                     h_offset: 30,
                     v_offset: 0
                  }
               }
            },
            responsiveLevels: [1600, 1400, 1024, 778, 480],
            gridwidth: [1600, 1240, 1024, 778, 480],
            gridheight: [900, 640, 400, 400, 300],
            lazyType: "none",
            parallax: {
               type: "mouse",
               origo: "slidercenter",
               speed: 2000,
               levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
            },
            shadow: 0,
            spinner: "off",
            autoHeight: "off",
            disableProgressBar: "on",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
               simplifyAll: "off",
               disableFocusListener: false,
            }
         });
      }
};
/*
=======================================================
 Revolution Slider Restaurant 2
=======================================================
*/
function phrevolutionsliderrestaurant2() {
      if ($('.slider-revolution-restaurant-2').length && jQuery()) {
         $('.slider-revolution-restaurant-2').show().revolution({
            sliderType: "carousel",
            sliderLayout: "fullwidth",
            dottedOverlay: "none",
            jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
            delay: 9000,
            navigation: {
               keyboardNavigation: "off",
               keyboard_direction: "horizontal",
               mouseScrollNavigation: "off",
               onHoverStop: "off",
               arrows: {
                  style: "metis",
                  enable: true,
                  hide_onmobile: true,
                  hide_under: 768,
                  hide_onleave: false,
                  tmp: '',
                  left: {
                     h_align: "left",
                     v_align: "center",
                     h_offset: 0,
                     v_offset: 0
                  },
                  right: {
                     h_align: "right",
                     v_align: "center",
                     h_offset: 0,
                     v_offset: 0
                  }
               },
               thumbnails: {
                  style: "erinyen",
                  enable: false,
                  width: 150,
                  height: 100,
                  min_width: 150,
                  wrapper_padding: 20,
                  wrapper_color: "#000000",
                  wrapper_opacity: "0.05",
                  tmp: '<span class="tp-thumb-over"></span><span class="tp-thumb-image"></span><span class="tp-thumb-title">{{title}}</span><span class="tp-thumb-more"></span>',
                  visibleAmount: 9,
                  hide_onmobile: false,
                  hide_onleave: false,
                  direction: "horizontal",
                  span: true,
                  position: "outer-bottom",
                  space: 10,
                  h_align: "center",
                  v_align: "bottom",
                  h_offset: 0,
                  v_offset: 0
               }
            },
            carousel: {
               maxRotation: 65,
               vary_rotation: "on",
               minScale: 55,
               vary_scale: "off",
               horizontal_align: "center",
               vertical_align: "center",
               fadeout: "on",
               vary_fade: "on",
               maxVisibleItems: 5,
               infinity: "on",
               space: -150,
               stretch: "off"
            },
            gridwidth: 600,
            gridheight: 600,
            lazyType: "none",
            shadow: 0,
            spinner: "off",
            stopLoop: "on",
            stopAfterLoops: 0,
            stopAtSlide: 1,
            shuffle: "off",
            autoHeight: "off",
            disableProgressBar: "on",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
               simplifyAll: "off",
               nextSlideOnWindowFocus: "off",
               disableFocusListener: false,
            }
         });
      }
};
/*
=======================================================
 Revolution Slider Shop
=======================================================
*/
function phrevolutionslidershop() {
   if ($('#slider-shop-revolution').length && jQuery()) {
      $('#slider-shop-revolution').show().revolution({
         sliderType: "standard",
         jsFileLocation: "http://zone.pixelsharmony.netdna-cdn.com/plugins/revolution-slider/js/",
         sliderLayout: "auto",
         dottedOverlay: "none",
         delay: 9000,
         navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            onHoverStop: "on",
            touch: {
               touchenabled: "on",
               swipe_threshold: 75,
               swipe_min_touches: 50,
               swipe_direction: "horizontal",
               drag_block_vertical: false
            },
            arrows: {
               style: "gyges",
               enable: true,
               hide_onmobile: false,
               hide_onleave: false,
               tmp: '',
               left: {
                  h_align: "right",
                  v_align: "bottom",
                  h_offset: 40,
                  v_offset: 0
               },
               right: {
                  h_align: "right",
                  v_align: "bottom",
                  h_offset: 0,
                  v_offset: 0
               }
            }
         },
         responsiveLevels: [1240, 1024, 778, 480],
         visibilityLevels: [1240, 1024, 778, 480],
         gridwidth: [1200, 1024, 778, 480],
         gridheight: [600, 510, 410, 210],
         lazyType: "single",
         parallax: {
            type: "scroll",
            origo: "slidercenter",
            speed: 400,
            levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
            type: "scroll",
         },
         shadow: 0,
         spinner: "off",
         stopLoop: "off",
         stopAfterLoops: -1,
         stopAtSlide: -1,
         shuffle: "off",
         autoHeight: "off",
         disableProgressBar: "on",
         hideThumbsOnMobile: "off",
         hideSliderAtLimit: 0,
         hideCaptionAtLimit: 0,
         hideAllCaptionAtLilmit: 0,
         debugMode: false,
         fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
         }
      });
   }
};
/*
=======================================================
 HTML Video Player
=======================================================
*/
function phhtml5videoplayer() {
   if ($('.jp-video').length && jQuery()) {
      $("#jquery_jplayer_1").jPlayer({
         ready: function() {
            $(this).jPlayer("setMedia", {
               title: "Big Buck Bunny",
               m4v: "http://zone.pixelsharmony.netdna-cdn.com/videos/video-03.mov",
               ogv: "http://zone.pixelsharmony.netdna-cdn.com/videos/video-03.ogv",
               poster: "http://zone.pixelsharmony.netdna-cdn.com/images/video/01.jpg"
            });
         },
         swfPath: "../../dist/jplayer",
         supplied: "ogv, m4v",
         size: {
            width: "100%",
            height: "100%",
            cssClass: "jp-video-full-resize"
         },
         useStateClassSkin: true,
         autoBlur: false,
         smoothPlayBar: true,
         keyEnabled: true,
         remainingDuration: true,
         toggleDuration: true
      });
      new jPlayerPlaylist({
         jPlayer: "#jquery_jplayer_2",
         cssSelectorAncestor: "#jp_container_2"
      }, [{
         title: "Business Grow",
         artist: "PixelsHarmony",
         free: true,
         m4v: "http://zone.pixelsharmony.netdna-cdn.com/videos/video-04.mov",
         ogv: "http://zone.pixelsharmony.netdna-cdn.com/videos/video-04.ogv",
         poster: "http://zone.pixelsharmony.netdna-cdn.com/images/video/02.jpg"
      }, {
         title: "Finding Right Way",
         artist: "PixelsHarmony",
         m4v: "http://zone.pixelsharmony.netdna-cdn.com/videos/video-05.mov",
         ogv: "http://zone.pixelsharmony.netdna-cdn.com/videos/video-05.ogv",
         poster: "http://zone.pixelsharmony.netdna-cdn.com/images/video/03.jpg"
      }, {
         title: "Readable and Modern Web",
         artist: "PixelsHarmony",
         m4v: "http://zone.pixelsharmony.netdna-cdn.com/videos/video-06.mov",
         ogv: "http://zone.pixelsharmony.netdna-cdn.com/videos/video-06.ogv",
         poster: "http://zone.pixelsharmony.netdna-cdn.com/images/video/04.jpg"
      }], {
         swfPath: "../../dist/jplayer",
         supplied: "ogv, m4v",
         size: {
            width: "100%",
            height: "100%",
            cssClass: "jp-video-full-resize"
         },
         useStateClassSkin: true,
         autoBlur: false,
         smoothPlayBar: true,
         keyEnabled: true
      });
   };
};
/*
=======================================================
 HTML Video Player Fix
=======================================================
*/
function phhtml5videoplayerfix() {
      if ($('.jp-video').length && jQuery()) {
         var playerheight = jQuery(".jp-jplayer").height();
         jQuery(".jp-video-play").css("height", playerheight);
      };
};
/*
=======================================================
 Load More
=======================================================
*/
jQuery(document).ajaxComplete(function() {
   if (jQuery("#load-more-content").length) {
      var load = jQuery("#load-more-content");
      var data = jQuery(load.html());
      var id = load.attr("data-id");
      jQuery(id).isotope('insert', data);
      load.remove();
   }
   setTimeout(function() {
      if (isIE) {
         jQuery(window).trigger('resize');
      } else {
         window.dispatchEvent(new Event('resize'));
      }
      customFilterLoad();
      customLoadMoreCallback();
   }, 100);
});
var loadMoreTimeout;

function phloadmore() {
   if ($('.load-more-btn').length && jQuery()) {
      jQuery(".load-more-btn").off("click").on( "click", function(e) {
         e.preventDefault();
         var load = jQuery(this);
         var page = load.attr("data-page");
         var max = load.attr("data-max");
         var id = load.attr("data-id");
         var content = load.attr("data-content");
         var itemContent = jQuery(id).clone();
         if (page <= max) {
            jQuery.when(jQuery.get(content + page + ".php", {}).done(function(data) {
               data = jQuery(data);
               load.after("<div id='load-more-content' style='display:none;' data-id='" + id + "'></div>");
               jQuery("#load-more-content").html(data);
               load.attr("data-page", parseInt(page) + 1);
            })).then(function() {
               loadMoreTimeout = setTimeout(function() {
                  if (isIE) {
                     jQuery(window).trigger('resize');
                  } else {
                     window.dispatchEvent(new Event('resize'));
                  }
                  /*** Add Isotope Callsto to prevent overalpping */
                  phportfoliofitrows();
                  phgalleryfitrows();
                  phportfoliomasonry();
                  phblogmasonry();
                  phmasonryblogmixed();
                  phmasonryblog();
                  phshopcategoriesmasonry();
                  phportfoliomasonrymixed();
                  phshopsort();
                  phshopsortmasonry();
                  clearTimeout(loadMoreTimeout);
               }, 3000);
            });
         }
         if (page == max) {
            load.html("No more items");
            load.off("click").on("click", function(e) {
               return false;
            });
         }
      });
   };
};

function customFilterLoad() {
      var selector = "*";
      $('.portfoliofitrows, .portfoliomasonry').isotope({
         filter: function() {
            var item = jQuery(this);
            if (selector != "*") {
               if (!item.hasClass(selector.substr(1))) {
                  return false;
               }
            }
            return true;
         }
      });
};
/*
=======================================================
 Animated Module
=======================================================
*/
function phanimatedmodule() {
   $(".hover-animation-1").mouseleave(function() {
      $(".hover-animation-icon", this).addClass("animated bounceInLeft");
   });
   $(".hover-animation-1").mouseover(function() {
      $(".hover-animation-icon", this).removeClass("animated bounceInLeft");
   });
   $(".hover-animation-2").mouseleave(function() {
      $(".hover-animation-icon", this).addClass("animated bounceInRight");
   });
   $(".hover-animation-2").mouseover(function() {
      $(".hover-animation-icon", this).removeClass("animated bounceInRight");
   });
   $(".hover-animation-3").mouseleave(function() {
      $(".hover-animation-icon", this).addClass("animated bounceInDown");
   });
   $(".hover-animation-3").mouseover(function() {
      $(".hover-animation-icon", this).removeClass("animated bounceInDown");
   });
   $(".hover-animation-4").mouseleave(function() {
      $(".hover-animation-icon-style-2 i", this).toggleClass("animated bounce");
   });
   $(".hover-animation-4").mouseover(function() {
      $(".hover-animation-icon-style-2 i", this).toggleClass("animated bounce");
   });
};
/*
=======================================================
 Google Map
=======================================================
*/
function phgooglemap() {
   if ($('#google-map').length && jQuery()) {
      var $map = $('#google-map');
      $map.gMap({
         markers: [{
            'address': 'Level 13, 2 Elizabeth St, Melbourne Victoria 3000 Australia',
            icon: {
               image: 'images/marker-icon.png',
               iconsize: [25, 41],
            },
         }],
         zoom: 14,
         scrollwheel: false
      });
   }
   if ($('#google-map-2').length && jQuery()) {
      var $map1 = $('#google-map-2');
      $map1.gMap({
         latitude: "fit",
         longitude: "fit",
         zoom: 14,
         scrollwheel: false,
         markers: [{
            'address': 'Level 13, 2 Elizabeth St, Melbourne Victoria 3000 Australia',
            icon: {
               image: 'images/marker-icon.png',
               iconsize: [25, 41],
            },
         }],
         styles: [{
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
               "color": "#6195a0"
            }]
         }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
               "color": "#f2f2f2"
            }]
         }, {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{
               "color": "#ffffff"
            }]
         }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
               "color": "#e6f3d6"
            }, {
               "visibility": "on"
            }]
         }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
               "saturation": -100
            }, {
               "lightness": 45
            }, {
               "visibility": "simplified"
            }]
         }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
               "visibility": "simplified"
            }]
         }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
               "color": "#f4d2c5"
            }, {
               "visibility": "simplified"
            }]
         }, {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [{
               "color": "#4e4e4e"
            }]
         }, {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
               "color": "#f4f4f4"
            }]
         }, {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [{
               "color": "#787878"
            }]
         }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
               "color": "#eaf6f8"
            }, {
               "visibility": "on"
            }]
         }, {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
               "color": "#eaf6f8"
            }]
         }]
      });
   }
   if ($('#google-map-3').length && jQuery()) {
      var $map2 = $('#google-map-3');
      $map2.gMap({
         latitude: "fit",
         longitude: "fit",
         scrollwheel: false,
         zoom: 14,
         markers: [{
            'address': 'Level 13, 2 Elizabeth St, Melbourne Victoria 3000 Australia',
            icon: {
               image: 'images/marker-icon.png',
               iconsize: [25, 41],
            },
         }],
         styles: [{
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{
               "visibility": "simplified"
            }]
         }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
               "visibility": "simplified"
            }, {
               "color": "#fcfcfc"
            }]
         }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
               "visibility": "simplified"
            }, {
               "color": "#fcfcfc"
            }]
         }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
               "visibility": "simplified"
            }, {
               "color": "#dddddd"
            }]
         }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
               "visibility": "simplified"
            }, {
               "color": "#dddddd"
            }]
         }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
               "visibility": "simplified"
            }, {
               "color": "#eeeeee"
            }]
         }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
               "visibility": "simplified"
            }, {
               "color": "#dddddd"
            }]
         }]
      });
   }
   if ($('#google-map-4').length && jQuery()) {
      var $map3 = $('#google-map-4');
      $map3.gMap({
         latitude: "fit",
         longitude: "fit",
         scrollwheel: false,
         zoom: 14,
         markers: [{
            'address': 'Level 13, 2 Elizabeth St, Melbourne Victoria 3000 Australia',
            icon: {
               image: 'images/marker-icon.png',
               iconsize: [25, 41],
            },
         }],
         styles: [{
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
               "color": "#444444"
            }]
         }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
               "color": "#f2f2f2"
            }]
         }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "poi.business",
            "elementType": "geometry.fill",
            "stylers": [{
               "visibility": "on"
            }]
         }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
               "saturation": -100
            }, {
               "lightness": 45
            }]
         }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
               "visibility": "simplified"
            }]
         }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
               "color": "#b4d4e1"
            }, {
               "visibility": "on"
            }]
         }]
      });
   }
   if ($('#google-map-5').length && jQuery()) {
      var $map4 = $('#google-map-5');
      $map4.gMap({
         latitude: "fit",
         longitude: "fit",
         scrollwheel: false,
         zoom: 14,
         markers: [{
            'address': 'Level 13, 2 Elizabeth St, Melbourne Victoria 3000 Australia',
            icon: {
               image: 'images/marker-icon.png',
               iconsize: [25, 41],
            },
         }],
         styles: [{
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
               "color": "#444444"
            }]
         }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
               "color": "#f2f2f2"
            }]
         }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
               "saturation": -100
            }, {
               "lightness": 45
            }]
         }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
               "visibility": "simplified"
            }]
         }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
               "color": "#c0e4f3"
            }, {
               "visibility": "on"
            }]
         }]
      });
   }
   if ($('#google-map-6').length && jQuery()) {
      var $map5 = $('#google-map-6');
      $map5.gMap({
         latitude: "fit",
         longitude: "fit",
         scrollwheel: false,
         zoom: 14,
         markers: [{
            'address': 'Level 13, 2 Elizabeth St, Melbourne Victoria 3000 Australia',
            icon: {
               image: 'images/marker-icon.png',
               iconsize: [25, 41],
            },
         }],
         styles: [{
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [{
               "color": "#ffffff"
            }]
         }, {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
               "gamma": 0.01
            }, {
               "lightness": 20
            }]
         }, {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
               "saturation": -31
            }, {
               "lightness": -33
            }, {
               "weight": 2
            }, {
               "gamma": 0.8
            }]
         }, {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [{
               "color": "#050505"
            }]
         }, {
            "featureType": "administrative.locality",
            "elementType": "labels.text.stroke",
            "stylers": [{
               "color": "#fef3f3"
            }, {
               "weight": "3.01"
            }]
         }, {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text.fill",
            "stylers": [{
               "color": "#0a0a0a"
            }, {
               "visibility": "off"
            }]
         }, {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text.stroke",
            "stylers": [{
               "color": "#fffbfb"
            }, {
               "weight": "3.01"
            }, {
               "visibility": "off"
            }]
         }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
               "lightness": 30
            }, {
               "saturation": 30
            }]
         }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
               "saturation": 20
            }]
         }, {
            "featureType": "poi.attraction",
            "elementType": "labels.icon",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
               "lightness": 20
            }, {
               "saturation": -20
            }]
         }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
               "lightness": 10
            }, {
               "saturation": -30
            }]
         }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
               "saturation": 25
            }, {
               "lightness": 25
            }]
         }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
               "visibility": "on"
            }, {
               "color": "#a1a1a1"
            }]
         }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
               "color": "#292929"
            }]
         }, {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{
               "visibility": "on"
            }, {
               "color": "#202020"
            }]
         }, {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [{
               "visibility": "on"
            }, {
               "color": "#ffffff"
            }]
         }, {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [{
               "visibility": "simplified"
            }, {
               "hue": "#0006ff"
            }, {
               "saturation": "-100"
            }, {
               "lightness": "13"
            }, {
               "gamma": "0.00"
            }]
         }, {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
               "visibility": "on"
            }, {
               "color": "#686868"
            }]
         }, {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [{
               "visibility": "off"
            }, {
               "color": "#8d8d8d"
            }]
         }, {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [{
               "visibility": "on"
            }, {
               "color": "#353535"
            }, {
               "lightness": "6"
            }]
         }, {
            "featureType": "road.arterial",
            "elementType": "labels.text.stroke",
            "stylers": [{
               "visibility": "on"
            }, {
               "color": "#ffffff"
            }, {
               "weight": "3.45"
            }]
         }, {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
               "color": "#d0d0d0"
            }]
         }, {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [{
               "lightness": "2"
            }, {
               "visibility": "on"
            }, {
               "color": "#999898"
            }]
         }, {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [{
               "color": "#383838"
            }]
         }, {
            "featureType": "road.local",
            "elementType": "labels.text.stroke",
            "stylers": [{
               "color": "#faf8f8"
            }]
         }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
               "lightness": -20
            }]
         }]
      });
   }
   if ($('#google-map-7').length && jQuery()) {
      var $map6 = $('#google-map-7');
      $map6.gMap({
         latitude: "fit",
         scrollwheel: false,
         longitude: "fit",
         zoom: 14,
         markers: [{
            'address': 'Level 13, 2 Elizabeth St, Melbourne Victoria 3000 Australia',
            icon: {
               image: 'images/marker-icon.png',
               iconsize: [25, 41],
            },
         }],
         styles: [{
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
               "saturation": -100
            }, {
               "lightness": 65
            }, {
               "visibility": "on"
            }]
         }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
               "saturation": -100
            }, {
               "lightness": 51
            }, {
               "visibility": "simplified"
            }]
         }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
               "saturation": -100
            }, {
               "visibility": "simplified"
            }]
         }, {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [{
               "saturation": -100
            }, {
               "lightness": 30
            }, {
               "visibility": "on"
            }]
         }, {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [{
               "saturation": -100
            }, {
               "lightness": 40
            }, {
               "visibility": "on"
            }]
         }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
               "saturation": -100
            }, {
               "visibility": "simplified"
            }]
         }, {
            "featureType": "transit",
            "elementType": "geometry.fill",
            "stylers": [{
               "visibility": "on"
            }]
         }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
               "hue": "#ffff00"
            }, {
               "lightness": -25
            }, {
               "saturation": -97
            }]
         }, {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{
               "visibility": "on"
            }, {
               "lightness": -25
            }, {
               "saturation": -100
            }]
         }]
      });
   }
   if ($('#google-map-8').length && jQuery()) {
      var $map7 = $('#google-map-8');
      $map7.gMap({
         latitude: "fit",
         scrollwheel: false,
         longitude: "fit",
         zoom: 14,
         markers: [{
            'address': 'Level 13, 2 Elizabeth St, Melbourne Victoria 3000 Australia',
            icon: {
               image: 'images/marker-icon.png',
               iconsize: [25, 41],
            },
         }],
         styles: [{
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
               "saturation": 36
            }, {
               "color": "#000000"
            }, {
               "lightness": 40
            }]
         }, {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
               "visibility": "on"
            }, {
               "color": "#000000"
            }, {
               "lightness": 16
            }]
         }, {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
               "color": "#000000"
            }, {
               "lightness": 20
            }]
         }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
               "color": "#000000"
            }, {
               "lightness": 17
            }, {
               "weight": 1.2
            }]
         }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
               "visibility": "on"
            }]
         }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
               "color": "#000000"
            }, {
               "lightness": 20
            }]
         }, {
            "featureType": "landscape",
            "elementType": "labels.icon",
            "stylers": [{
               "saturation": "-100"
            }, {
               "lightness": "-54"
            }]
         }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
               "visibility": "on"
            }, {
               "lightness": "0"
            }]
         }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
               "color": "#000000"
            }, {
               "lightness": 21
            }]
         }, {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [{
               "saturation": "-89"
            }, {
               "lightness": "-55"
            }]
         }, {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
               "color": "#000000"
            }, {
               "lightness": 17
            }]
         }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
               "color": "#000000"
            }, {
               "lightness": 29
            }, {
               "weight": 0.2
            }]
         }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
               "color": "#000000"
            }, {
               "lightness": 18
            }]
         }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
               "color": "#000000"
            }, {
               "lightness": 16
            }]
         }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
               "color": "#000000"
            }, {
               "lightness": 19
            }]
         }, {
            "featureType": "transit.station",
            "elementType": "labels.icon",
            "stylers": [{
               "visibility": "on"
            }, {
               "saturation": "-100"
            }, {
               "lightness": "-51"
            }]
         }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
               "color": "#000000"
            }, {
               "lightness": 17
            }]
         }]
      });
   }
   if ($('#google-map-9').length && jQuery()) {
      var $map8 = $('#google-map-9');
      $map8.gMap({
         latitude: "fit",
         scrollwheel: false,
         longitude: "fit",
         zoom: 14,
         markers: [{
            'address': 'Level 13, 2 Elizabeth St, Melbourne Victoria 3000 Australia',
            icon: {
               image: 'images/marker-icon.png',
               iconsize: [25, 41],
            },
         }],
         styles: [{
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
               "color": "#444444"
            }]
         }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
               "color": "#f2f2f2"
            }]
         }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
               "saturation": -100
            }, {
               "lightness": 45
            }]
         }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
               "visibility": "simplified"
            }]
         }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
               "visibility": "off"
            }]
         }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
               "color": "#000000"
            }, {
               "visibility": "on"
            }]
         }]
      });
   }
};
/*
=======================================================
 DRAGGABLE PANEL + SUBMIT FORM ITEMS
=======================================================
*/
function phdraggablepanel() {
   if ($('#draggablePanelList').length && jQuery()) {
      var panelList = $('#draggablePanelList');
      panelList.sortable({
         handle: '.panel-heading',
         update: function() {
            $('.panel', panelList).each(function(index, elem) {
               var $listItem = $(elem),
                  newIndex = $listItem.index();
            });
         }
      });
      $('.add-addinfo').on( "click", function(e) {
         event.preventDefault();
         var newElem = $('<li><div class="panel panel-info"><span class="icon-drag-1 panel-heading"></span><div class="panel-body no-margin"><input class="addinfo-input" name="addinfo-name" type="text" placeholder="Name of ingredient"><input class="addinfo-input" name="addinfo-note" tabindex="6" type="text" placeholder="Notes (quantity, additional info)"><p class="delete-form-item btn btn-default"><span class="icon-minus-circle"></span></p></div></div></li>');
         newElem.appendTo('.addinfo-sort');
      });
      $('.add-separator').on( "click", function(e) {
         event.preventDefault();
         var newElem = $('<li><div class="panel panel-info"><span class="icon-drag-1 panel-heading"></span><div class="panel-body no-margin"><input class="addinfo-input" name="addinfo-name" type="text"><p class="delete-form-item btn btn-default"><span class="icon-minus-circle"></span></p></div></div></li>');
         newElem.appendTo('.addinfo-sort');
      });
      $('#draggablePanelList').on('click', '.delete-form-item', function() {
         event.preventDefault();
         if ($("#draggablePanelList").children().length > 1) {
            $(this).parent().parent().parent().remove();
         }
      });
   };
};
/*
=======================================================
 TEXT EDITOR
=======================================================
*/
function phtexteditor() {
   if ($('.edittextarea').length && jQuery()) {
      tinymce.init({
         selector: ".edittextarea",
         plugins: ["advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker", "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking", "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern"],
         toolbar1: "newdocument | bold italic underline | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect | table forecolor backcolor blockquote | subscript superscript | image media code | print fullscreen | undo redo",
         menubar: false,
         toolbar_items_size: 'small',
         style_formats: [{
            title: 'Bold text',
            inline: 'b'
         }, {
            title: 'Red text',
            inline: 'span',
            styles: {
               color: '#ff0000'
            }
         }, {
            title: 'Red header',
            block: 'h1',
            styles: {
               color: '#ff0000'
            }
         }, {
            title: 'Example 1',
            inline: 'span',
            classes: 'example1'
         }, {
            title: 'Example 2',
            inline: 'span',
            classes: 'example2'
         }, {
            title: 'Table styles'
         }, {
            title: 'Table row 1',
            selector: 'tr',
            classes: 'tablerow1'
         }],
         templates: [{
            title: 'Test template 1',
            content: 'Test 1'
         }, {
            title: 'Test template 2',
            content: 'Test 2'
         }]
      });
   };
};
/*
=======================================================
 WOW Animation
=======================================================
*/
function phwowanimation() {
   if ($('.wow').length && jQuery() ) {
      wow = new WOW({
         boxClass: 'wow',
         animateClass: 'animated',
         offset: 150,
         mobile: false,
         live: true
      });
      wow.init();
   };
};
/*
=======================================================
 WOW Animation Off
=======================================================
*/
function phwowanimationoff() {
if((jQuery(window).width() < 768)) {
    $('.wow').addClass('wow-removed').removeClass('wow');
} else {
    $('.wow-removed').addClass('wow').removeClass('wow-removed');
	phwowanimation();
}
};
/*
=======================================================
  SELECT PICKER
=======================================================
*/
if ($('.select-box').length && jQuery()) {
   $('.selectpicker').selectpicker({
      iconBase: 'Simple-Line-Icons-Pro',
      tickIcon: 'icon-check',
      style: 'btn-white',
      size: 4
   });
};
/*
=======================================================
 Coming Soon Timer
=======================================================
*/
function phcomingsoonetimer() {
   if ($('.clock').length && jQuery()) {
      var clock;
      clock = $('.clock').FlipClock({
         clockFace: 'DailyCounter',
         autoStart: false,
         callbacks: {
            stop: function() {
               $('.message').html('The clock has stopped!')
            }
         }
      });
      clock.setTime(220880);
      clock.setCountdown(true);
      clock.start();
   };
};
/*
=======================================================
 Page Scroll Animation
=======================================================
*/
function phonepagenav() {
   if ($('.link-scroll').length && jQuery()) {
      jQuery('.link-scroll:eq(0)').toggleClass('first-element');
      $('.link-scroll').on('click', function(e) {
         var li = $(this);
         var $anchor = li.children();
         if (li.hasClass('first-element')) {
            var soffsetenter = $('#header').height();
            console.log(soffsetenter);
         } else {
            var soffsetenter = $('.navbar.banner--clone').height();
            console.log(soffsetenter);
         };
         var soffsettop = $($anchor.attr('href')).offset().top;
         var offsetall = soffsettop - soffsetenter;
         $('html, body').stop().animate({
            scrollTop: offsetall
         }, 1500, 'easeInOutExpo');
         e.preventDefault();
      });
   };
};
/*
=======================================================
 Page Scroll Animation
=======================================================
*/
var stickyOnce2 = true,
   introTop, stickyTop, stickyOnce3 = true;

function phelementsticky() {
	var phvarstickyelement = $('.sticky-element');
   if (phvarstickyelement.length && jQuery()) {
      if (jQuery(window).width() > 786) {
         phvarstickyelement.sticky({
            topSpacing: 63
         });
         stickyOnce3 = false;
      }
      stickyTop = phvarstickyelement.offset().top;
      jQuery(window).scroll(function() {
         if (jQuery(window).width() > 1079) {
            if ($(this).scrollTop() >= stickyTop - 63) { /*} + jQuery($(".sticky-element-intro").attr("data-id")).height() ) {*/
               if (stickyOnce2) {
                  phvarstickyelement.sticky({
                     topSpacing: 63
                  });
                  stickyOnce2 = false;
               }
            }
            if ($(this).scrollTop() < stickyTop - 63) { /*} + jQuery($(".sticky-element-intro").attr("data-id")).height() ) {*/
               phvarstickyelement.unstick();
               stickyOnce2 = true;
            }
         } else {
            $(".sticky-element-intro").unstick();
            stickyOnce2 = true;
         }
      });
      jQuery(window).resize(function() {
         stickyTop = phvarstickyelement.offset().top;
         if (jQuery(window).width() < 1079) {
            phvarstickyelement.unstick();
         }
      });
   };
   var phvarstickyelementintro = $('.sticky-element-intro');
   if (phvarstickyelementintro.length && jQuery()) {
      introTop = phvarstickyelementintro.offset().top;
      jQuery(window).scroll(function() {
         if (jQuery(window).width() > 1079) {
            if ($(this).scrollTop() >= introTop - 63) { /*} + jQuery($(".sticky-element-intro").attr("data-id")).height() ) {*/
               if (stickyOnce2) {
                  phvarstickyelementintro.sticky({
                     topSpacing: 63
                  });
                  stickyOnce2 = false;
               }
            }
            if ($(this).scrollTop() < introTop - 63) { /*} + jQuery($(".sticky-element-intro").attr("data-id")).height() ) {*/
               phvarstickyelementintro.unstick();
               stickyOnce2 = true;
            }
         } else {
            phvarstickyelementintro.unstick();
            stickyOnce2 = true;
         }
      });
      jQuery(window).resize(function() {
         introTop = phvarstickyelementintro.offset().top;
         if (jQuery(window).width() < 1079) {
            phvarstickyelementintro.unstick();
            stickyOnce2 = true;
         }
      });
   }
};
/*
=======================================================
 Sticky Blog Post Title
=======================================================
*/
function phelementstickyposttile() {
   var stickyOnce = true;
   if ($('.sticky-blog-title').length && jQuery()) {
      jQuery(window).scroll(function() {
         console.log(jQuery($(".sticky-blog-title").attr("data-id")).offset().top);
         if ($(this).scrollTop() >= jQuery($(".sticky-blog-title").attr("data-id")).offset().top - 63) { /*} + jQuery($(".sticky-blog-title").attr("data-id")).height() ) {*/
            if (stickyOnce) {
               $(".sticky-blog-title").show();
               $(".sticky-blog-title").sticky({
                  topSpacing: 63
               });
               stickyOnce = false;
               jQuery($(".sticky-blog-title").attr("data-margin")).css("margin-top", "-63px");
            }
         }
         if ($(this).scrollTop() - 10 < jQuery($(".sticky-blog-title").attr("data-id")).offset().top - 63) { /*} + jQuery($(".sticky-blog-title").attr("data-id")).height() ) {*/
            $(".sticky-blog-title").hide();
            $(".sticky-blog-title").unstick();
            stickyOnce = true;
            jQuery($(".sticky-blog-title").attr("data-margin")).css("margin-top", "0px");
            if (isIE) {
               jQuery(window).trigger('resize');
            } else {
               window.dispatchEvent(new Event('resize'));
            }
         }
      });
   };
};
/*
=======================================================
 Header Sticky
=======================================================
*/
function phheadersticky() {
   if ($('#header').length && jQuery()) {
	    if ($('#header').hasClass('header-fixed')) {} else {
         var headerbodypadding = $('#header').outerHeight();
         $("body").css("padding-top", headerbodypadding);

      }
      $(window).scroll(function() {
         var offsetscroll = $(window).scrollTop();

         var offsetheader = ($("#header").height() / 2);
         if (offsetscroll >= offsetheader) {
            $(".header2").addClass("header-sticky");
            $(".reveal-nav").addClass("reveal-nav-sticky");
         }
		 else if (offsetscroll == 0) {
			$(".header2").removeClass("header-sticky");
            $(".reveal-nav").removeClass("reveal-nav-sticky");

		}
		 else {
            $(".header2").removeClass("header-sticky");
            $(".reveal-nav").removeClass("reveal-nav-sticky");
         }
		  if ($('#header').hasClass('header-fixed')) {} else {
         var headerbodypaddingcallback = $('#header').outerHeight();
         $("body").css("padding-top", headerbodypaddingcallback);
      }
      });


      $(window).scroll(function() {
         var offsetscroll = $(window).scrollTop();

		 var offsetheadernav =  ($("#header").height() / 2);

         if (offsetscroll >= offsetheadernav) {
            $("#header.header").addClass("nav-sticky");
         }
		 else if (offsetscroll == 0) {
			$("#header.header").removeClass("nav-sticky");
            $(".reveal-nav").removeClass("reveal-nav-sticky");
			}
		 else {
            $("#header.header").removeClass("nav-sticky");
			$(".reveal-nav").removeClass("reveal-nav-sticky");
         }
      });
   };
};
/*
=======================================================
 Portfolio Animation Slide
=======================================================
*/
function phportfolioanimationslide() {
   if ($('.portfolio-animation-slide').length && jQuery()) {
      $('.portfolio-animation-slide > article').hoverdir({
         hoverDelay: 75,
         hoverElem: '.sliding-content'
      });
   };
};
/*
=======================================================
 Scroll Spy
=======================================================
*/
function phscrollspy() {
   if ($('.link-scroll').length && jQuery()) {
      if ($('.navbar').hasClass('banner--stick')) {
         var lcspyoffset = $('.navbar.banner--clone').height();
      } else {
         var lcspyoffset = $('#header').height();
      };
      $('body').scrollspy({
         target: '.navbar',
         offset: lcspyoffset
      });
   };
};
/*
=======================================================
 Vertical Center Element
=======================================================
*/
function phverticalcenterelement() {
   if ($('.vertical-center-element').length && jQuery()) {
      var phvecelelement = $('.vertical-center-element').height();
      var phvectopfit = -(phvecelelement / 2);
      $(".vertical-center-element").css("top", "50%");
      $(".vertical-center-element").css("margin-top", phvectopfit);
   };
};

function nav_close_accordion_section() {
   if ($('#nav-accordion').length && jQuery()) {
      $('#nav-accordion .nav-accordion-section-title').removeClass('active');
      $('#nav-accordion .nav-accordion-section-content').slideUp(600).removeClass('open');
   };
};

function nav_close_accordion_section_faster() {
   if ($('#nav-accordion').length && jQuery()) {
      $('#nav-accordion .nav-accordion-section-title').removeClass('active');
      $('#nav-accordion .nav-accordion-section-content').slideUp(100).removeClass('open');
   };
};

function phnavaccordion() {
   if ($('#nav-accordion').length && jQuery()) {
      nav_close_accordion_section();
      $('.nav-accordion-section-title').off("click").on("click", function(e) {
         /* Grab current anchor value */
         var currentAttrValue = $(this).attr('href');
         if ($(e.target).is('.active')) {
            nav_close_accordion_section();
         } else {
            nav_close_accordion_section();
            /* Add active class to section title */
            $(this).addClass('active');
            /* Open up the hidden content panel */
            $('#nav-accordion ' + currentAttrValue).slideDown(300).addClass('open');
         }
         e.preventDefault();
      });
   };
};
/*
=======================================================
 Shop Carousel
=======================================================
*/
if ($('.shopcarousel').length && jQuery()) {
   $('.shopcarousel').each(function() {
      jQuery(this).slick({
         swipeToSlide: true,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: false,
         autoplaySpeed: 5000,
         arrows: false
      });
   });
};

function phshopcarousel() {};
/*
=======================================================
 Swiper Slider
=======================================================
*/
function phswiperslider() {
   if (jQuery(".swiper-container").length > 0) {
      var swiper = new Swiper('.swiper-container', {
         pagination: '.swiper-pagination',
         paginationClickable: true,
         nextButton: '.swiper-button-next',
         prevButton: '.swiper-button-prev',
         loop: true,
         speed: 1000,
         onSlideChangeStart: function(swiper) {

            var h1_atr = $(".swiper-content h1[data-animation]").attr("data-animation");
            var p_atr = $(".swiper-content p[data-animation]").attr("data-animation");
            var a_atr = $(".swiper-content a.btn[data-animation]").attr("data-animation");

            $(".swiper-slide.cover-bg.swiper-slide-active h1").addClass(h1_atr);
            $(".swiper-slide.cover-bg.swiper-slide-active p").addClass(p_atr);
            $(".swiper-slide.cover-bg.swiper-slide-active a.btn").addClass(a_atr);  

            $(".swiper-slide.cover-bg.swiper-slide-prev h1").removeClass(h1_atr);
            $(".swiper-slide.cover-bg.swiper-slide-prev p").removeClass(p_atr);
            $(".swiper-slide.cover-bg.swiper-slide-prev a.btn").removeClass(a_atr);
            $(".swiper-slide.cover-bg.swiper-slide-next h1").removeClass(h1_atr);
            $(".swiper-slide.cover-bg.swiper-slide-next p").removeClass(p_atr);
            $(".swiper-slide.cover-bg.swiper-slide-next a.btn").removeClass(a_atr);
         }
      });
   }
   if (jQuery(".swiper-intro").length > 0) {
      var swiper = new Swiper('.swiper-container', {
         pagination: '.swiper-pagination',
         paginationClickable: true,
         nextButton: '.swiper-button-next',
         prevButton: '.swiper-button-prev',
         loop: false,
         speed: 1000,
         onSlideChangeStart: function(swiper) {

            var h1_atr = $(".swiper-content h1[data-animation]").attr("data-animation");
            var p_atr = $(".swiper-content p[data-animation]").attr("data-animation");
            var a_atr = $(".swiper-content a.btn[data-animation]").attr("data-animation");

            $(".swiper-slide.cover-bg.swiper-slide-active h1").addClass(h1_atr);
            $(".swiper-slide.cover-bg.swiper-slide-active p").addClass(p_atr);
            $(".swiper-slide.cover-bg.swiper-slide-active a.btn").addClass(a_atr);  

            $(".swiper-slide.cover-bg.swiper-slide-prev h1").removeClass(h1_atr);
            $(".swiper-slide.cover-bg.swiper-slide-prev p").removeClass(p_atr);
            $(".swiper-slide.cover-bg.swiper-slide-prev a.btn").removeClass(a_atr);
            $(".swiper-slide.cover-bg.swiper-slide-next h1").removeClass(h1_atr);
            $(".swiper-slide.cover-bg.swiper-slide-next p").removeClass(p_atr);
            $(".swiper-slide.cover-bg.swiper-slide-next a.btn").removeClass(a_atr);
         }
      });
   }
};
/*
=======================================================
 Card Slider
=======================================================
*/
function phcardslider() {
   if (jQuery(".cardslider").length > 0) {
      jQuery('.cardslider').cardSlider({
         autoPlay: true,
         pauseOnHover: true,
         interval: 4000,
         nav: true,
         dots: true
      });
   }
};
/*
=======================================================
 Arrow Animated
=======================================================
*/
function pharrowanimated() {
   if (jQuery(".arrow-animated").length > 0) {
      var $root = $('html, body');
      $('.arrow-animated a').on( "click", function() {
         $root.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
         }, 500);
         return false;
      });
   };
};
/*
=======================================================
 Layer Slider
=======================================================
*/
function phlayerslider() {
   if (jQuery("#layerslider").length > 0) {
      jQuery("#layerslider").layerSlider({
         autoStart: true,
         responsive: true,
         responsiveUnder: 0,
         sublayerContainer: 0,
         firstLayer: 1,
         twoWaySlideshow: true,
         randomSlideshow: false,
         keybNav: true,
         touchNav: true,
         imgPreload: true,
         navPrevNext: true,
         navStartStop: true,
         navButtons: true,
         thumbnailNavigation: 'hover',
         tnWidth: 100,
         tnHeight: 60,
         tnContainerWidth: '60%',
         tnActiveOpacity: 35,
         tnInactiveOpacity: 100,
         hoverPrevNext: true,
         hoverBottomNav: false,
         skin: 'default',
         skinsPath: 'plugins/layerslider/skins/',
         pauseOnHover: true,
         globalBGColor: 'transparent',
         globalBGImage: false,
         animateFirstLayer: true,
         yourLogo: false,
         yourLogoStyle: 'position: absolute; z-index: 1001; left: 10px; top: 10px;',
         yourLogoLink: false,
         yourLogoTarget: '_blank',
         loops: 0,
         forceLoopNum: true,
         autoPlayVideos: true,
         autoPauseSlideshow: 'auto',
         youtubePreview: 'maxresdefault.jpg',
         showBarTimer: false,
         showCircleTimer: false,
         slideDirection: 'right',
         slideDelay: 8000,
         durationIn: 3000,
         durationOut: 3000,
         easingIn: 'easeInOutQuint',
         easingOut: 'easeInOutQuint',
         delayIn: 0,
         delayOut: 0
      });
   }
};
/*
=======================================================
 Master Slider
=======================================================
*/
function phmasterslider() {
   if (jQuery("#masterslider").length > 0) {
      var slider = new MasterSlider();
      slider.control('arrows', {
         insertTo: '#masterslider'
      });
      slider.setup('masterslider', {
         width: 1200,
         height: 800,
         space: 5,
         autoplay: true,
         layout: "fullwidth",
         loop: true
      });
   }
};
/*
=======================================================
 Royal Slider
=======================================================
*/
function phroyalslider() {
   if (jQuery(".royalSlider").length > 0) {
      $(".royalSlider-default").royalSlider({
         autoScaleSliderWidth: 1600,
         autoScaleSliderHeight: 600,
         keyboardNavEnabled: true,
         loop: true,
         autoScaleSlider: true,
         imageAlignCenter: true,
         imageScaleMode: 'fill',
         arrowsNav: true,
         arrowsNavAutoHide: true,
         autoPlay: {
            enabled: true,
            pauseOnHover: true
         }
      });
      $(".royalSlider-fullscreen").royalSlider({
         keyboardNavEnabled: true,
         loop: true,
         autoScaleSlider: true,
         imageAlignCenter: true,
         imageScaleMode: 'fill',
         arrowsNav: true,
         arrowsNavAutoHide: true,
         fullscreen: {
            enabled: true,
            nativeFS: false
         },
         autoPlay: {
            enabled: true,
            pauseOnHover: true
         }
      });
   }
};
/*
=======================================================
 Owl Carousel Slider
=======================================================
*/
function phowlcarouselslider() {
   if (jQuery(".owl-carousel-fullwidth").length > 0) {
      jQuery('.owl-carousel-fullwidth').owlCarousel({
         margin: 0,
         responsiveClass: true,
         items: 1,
         autoHeight: false,
         nav: true,
         dots: false,
         loop: true,
         autoplay: true,
         autoplayTimeout: 6000,
         autoplayHoverPause: true,
         responsive: {
            0: {
               items: 1,
               responsive: true,
               responsiveRefreshRate: 50
            },
            1140: {
               items: 1,
               responsive: true,
               responsiveRefreshRate: 50
            },
            1440: {
               items: 1,
               responsive: true,
               responsiveRefreshRate: 50,
            }
         }
      });
   }
};
/*
=======================================================
 Landing Page Carousel
=======================================================
*/
if ($('.landing-page-carousel').length && jQuery()) {
   $('.landing-page-carousel').each(function() {
      jQuery(this).slick({
         swipeToSlide: true,
         slidesToShow: 2,
         slidesToScroll: 2,
         autoplay: true,
         autoplaySpeed: 5000,
         arrows: false
      });
   });
};

function landingpagecarousel() {};
/*
=======================================================
 Slick Slider
=======================================================
*/
function slickslider() {
   if ($('.slider-slick.simple-slick').length && jQuery()) {
      $('.slider-slick').slick({
         swipeToSlide: true,
         centerMode: true,
         centerPadding: '60px',
         slidesToShow: 3,
         responsive: [{
            breakpoint: 768,
            settings: {
               arrows: false,
               centerMode: true,
               centerPadding: '0px',
               slidesToShow: 3
            }
         }, {
            breakpoint: 480,
            settings: {
               arrows: false,
               centerMode: true,
               centerPadding: '0px',
               slidesToShow: 1
            }
         }]
      });
   }
   if ($('.slider-slick.blog-slick').length && jQuery()) {
      $('.slider-slick').slick({
         swipeToSlide: true,
         centerMode: true,
         centerPadding: '60px',
         slidesToShow: 4,
         responsive: [{
            breakpoint: 768,
            settings: {
               arrows: false,
               centerMode: true,
               centerPadding: '0px',
               slidesToShow: 3
            }
         }, {
            breakpoint: 480,
            settings: {
               arrows: false,
               centerMode: true,
               centerPadding: '0px',
               slidesToShow: 1
            }
         }]
      });
   };
};
/*
=======================================================
 Testimonials Single Slider
=======================================================
*/
if ($('.testimonial-single').length && jQuery()) {
   $('.testimonial-single').each(function() {
      jQuery(this).slick({
         swipeToSlide: true,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: false,
         autoplaySpeed: 5000,
         arrows: true,
         dots: true
      });
   });
};

function phtestimonialsingle() {};
/*
=======================================================
 Accordion Slider
=======================================================
*/
function phaccordionSlider() {
   if ($('.accordion-slider').length && jQuery()) {
	   
	   var accordionsliderheight = $( window ).height();
	   if (accordionsliderheight > 800) {
       var accordionsliderheight = 800;
       }
	   else if (accordionsliderheight < 400) { 
	    var accordionsliderheight = 400;
	   }
	  $('.accordion-slider').accordionSlider({
         width: '100%',
         height: accordionsliderheight,
         responsiveMode: 'auto',
         visiblePanels: 7,
         startPanel: 3,
		 openedPanelSize: 'max',
	     maxOpenedPanelSize: '80%',
         closePanelsOnMouseOut: false,
         shadow: false,
         panelDistance: 0,
         autoplay: false,
         mouseWheel: false,
         breakpoints: {
			 960: {
               visiblePanels: 5
            },
            800: {
               visiblePanels: 3
            },
            650: {
               visiblePanels: 4
            },
            500: {
               visiblePanels: 3
            }
         }
      });
   };
};
/*
=======================================================
 Slick Four Columns Carousel
=======================================================
*/
if ($('.slick-four-columns').length && jQuery()) {
   $('.slick-four-columns').each(function() {
      jQuery(this).slick({
         swipeToSlide: true,
         slidesToShow: 4,
         slidesToScroll: 1,
         autoplay: false,
         autoplaySpeed: 5000,
         arrows: false,
         responsive: [{
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }, {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }, , {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1
            }
         }, {
            breakpoint: 1081,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 1
            }
         }]
      });
   });
};

function phslickfourcolumnscarousel() {};
/*
=======================================================
 Vertical Timeline
=======================================================
*/
function verticaltimeline() {
   if ($('.cd-timeline-block').length && jQuery()) {
      var timelineBlocks = $('.cd-timeline-block'),
         offset = 0.8;
      hideBlocks(timelineBlocks, offset);
      $(window).on('scroll', function() {
         (!window.requestAnimationFrame) ? setTimeout(function() {
            showBlocks(timelineBlocks, offset);
         }, 100): window.requestAnimationFrame(function() {
            showBlocks(timelineBlocks, offset);
         });
      });

      function hideBlocks(blocks, offset) {
         blocks.each(function() {
            ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden wow fadeIn animated');
         });
      }

      function showBlocks(blocks, offset) {
         blocks.each(function() {
            ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('wow fadeIn animated');
         });
      }
      $('.cd-timeline-inner-content h4').mouseenter(function(e) {
         $(this).parent().parent().find('.cd-bg-image').addClass("animation-hover-js");
      }).mouseleave(function(e) {
         $(this).parent().parent().find('.cd-bg-image').removeClass("animation-hover-js");
      });
   };
};
/*
=======================================================
 CheckBox
=======================================================
*/
function checkbox() {
   if ($('.my-checkbox').length && jQuery()) {
      $('.my-checkbox').bootstrapSwitch({
         onSwitchChange: function(event, state) {
            var mainDiv = jQuery(jQuery(this).attr("data-id"));
            var toflipclass = jQuery(mainDiv).find(".flip-pricing-tables");
            if ($(this).is(':checked')) {
               toflipclass.flip(false);
            } else {
               toflipclass.flip(true);
            }
         }
      });
   };
};
/*
=======================================================
 Bootstrap Data Table
=======================================================
*/
function bootstrapDataTable() {
      if (jQuery("#bootstrap-table").length && jQuery()) {
         jQuery('#bootstrap-table').bdt();
      }
};
/*
=======================================================
 Vivus Svg Animations
=======================================================
*/
function vivusSvgAnimations() {
      if (jQuery(".svg-animation-1").length && jQuery()) {
         $(".svg-animation-1").each(function() {
            new Vivus(this, {
               type: 'delayed',
               duration: 350
            });
         });
      }
      if (jQuery(".svg-animation-2").length && jQuery()) {
         $(".svg-animation-2").each(function() {
            new Vivus(this, {
               type: 'async',
               duration: 350
            });
         });
      }
      if (jQuery(".svg-animation-3").length && jQuery()) {
         $(".svg-animation-3").each(function() {
            new Vivus(this, {
               type: 'oneByOne',
               duration: 350
            });
         });
      }
      if (jQuery(".svg-animation-4").length && jQuery()) {
         $(".svg-animation-4").each(function() {
            new Vivus(this, {
               type: 'scenario',
               duration: 350
            });
         });
      }
      if (jQuery(".svg-animation-5").length && jQuery()) {
         $(".svg-animation-5").each(function() {
            new Vivus(this, {
               type: 'scenario-sync',
               duration: 350
            });
         });
      }
};
/*
=======================================================
 Full Calendar
=======================================================
*/
function fullCalendar() {
   if (jQuery(".calendar").length && jQuery()) {
      $('.calendar-simple').fullCalendar({
         dayClick: function() {
            $(this).toggleClass('background-1');
         },
         fixedWeekCount: false
      });
      $('.calendar-agenda').fullCalendar({
         header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
         },
         defaultDate: '2016-01-12',
         editable: true,
         eventLimit: true,
         events: [{
            title: 'All Day Event',
            start: '2016-04-05'
         }, {
            title: 'Long Event',
            start: '2016-04-07',
            end: '2016-01-10'
         }, {
            id: 999,
            title: 'Repeating Event',
            start: '2016-01-09T16:00:00'
         }, {
            id: 999,
            title: 'Repeating Event',
            start: '2016-01-16T16:00:00'
         }, {
            title: 'Conference',
            start: '2016-01-11',
            end: '2016-01-13'
         }, {
            title: 'Meeting',
            start: '2016-01-12T10:30:00',
            end: '2016-01-12T12:30:00'
         }, {
            title: 'Lunch',
            start: '2016-01-12T12:00:00'
         }, {
            title: 'Meeting',
            start: '2016-01-12T14:30:00'
         }, {
            title: 'Happy Hour',
            start: '2016-01-12T17:30:00'
         }, {
            title: 'Dinner',
            start: '2016-01-12T20:00:00'
         }, {
            title: 'Birthday Party',
            start: '2016-01-13T07:00:00'
         }, {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2016-01-28'
         }],
         fixedWeekCount: false
      });
      $('.calendar-bg-events').fullCalendar({
         header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
         },
         defaultDate: '2016-01-12',
         businessHours: true,
         editable: true,
         events: [{
               title: 'Business Lunch',
               start: '2016-01-03T13:00:00',
               constraint: 'businessHours'
            }, {
               title: 'Meeting',
               start: '2016-01-13T11:00:00',
               constraint: 'availableForMeeting',
               color: '#257e4a'
            }, {
               title: 'Conference',
               start: '2016-01-18',
               end: '2016-01-20'
            }, {
               title: 'Party',
               start: '2016-01-29T20:00:00'
            },
            /*/ areas where "Meeting" must be dropped*/
            {
               id: 'availableForMeeting',
               start: '2016-01-11T10:00:00',
               end: '2016-01-11T16:00:00',
               rendering: 'background'
            }, {
               id: 'availableForMeeting',
               start: '2016-01-13T10:00:00',
               end: '2016-01-13T16:00:00',
               rendering: 'background'
            }, {
               start: '2016-01-24',
               end: '2016-01-28',
               overlap: false,
               rendering: 'background',
               color: '#ff9f89'
            }, {
               start: '2016-01-06',
               end: '2016-01-08',
               overlap: false,
               rendering: 'background',
               color: '#ff9f89'
            }
         ],
         fixedWeekCount: false
      });
      $('.calendar-selectable').fullCalendar({
         header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
         },
         defaultDate: '2016-01-12',
         selectable: true,
         selectHelper: true,
         select: function(start, end) {
            var title = prompt('Event Title:');
            var eventData;
            if (title) {
               eventData = {
                  title: title,
                  start: start,
                  end: end
               };
               $('#calendar').fullCalendar('renderEvent', eventData, true); /*/ stick? = true */
            }
            $('#calendar').fullCalendar('unselect');
         },
         editable: true,
         eventLimit: true,
         events: [{
            title: 'All Day Event',
            start: '2016-01-01'
         }, {
            title: 'Long Event',
            start: '2016-01-07',
            end: '2016-01-10'
         }, {
            id: 999,
            title: 'Repeating Event',
            start: '2016-01-09T16:00:00'
         }, {
            id: 999,
            title: 'Repeating Event',
            start: '2016-01-16T16:00:00'
         }, {
            title: 'Conference',
            start: '2016-01-11',
            end: '2016-01-13'
         }, {
            title: 'Meeting',
            start: '2016-01-12T10:30:00',
            end: '2016-01-12T12:30:00'
         }, {
            title: 'Lunch',
            start: '2016-01-12T12:00:00'
         }, {
            title: 'Meeting',
            start: '2016-01-12T14:30:00'
         }, {
            title: 'Happy Hour',
            start: '2016-01-12T17:30:00'
         }, {
            title: 'Dinner',
            start: '2016-01-12T20:00:00'
         }, {
            title: 'Birthday Party',
            start: '2016-01-13T07:00:00'
         }, {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2016-01-28'
         }]
      });
   };
};
/*
=======================================================
 Right Side Navigation
=======================================================
*/
function rightsidenavigation() {
   if ($('#vlt-showRight').length && jQuery()) {
      /** Pocetak animacije **/
      var menuRightNav = document.getElementById('vlt-right-menu-s2'),
         showRightPushNav = document.getElementById('vlt-showRight'),
         body = document.body;
      var flagNav = false;
      jQuery("#vlt-showRight").on( "click", function(e) {
         e.preventDefault();
         if (flagNav) {
            jQuery("#nav-icon2").removeClass('open');
            jQuery(".vlt-nav").stop().animate({
               right: 15
            }, {
               duration: 250,
               step: function(currentLeft) {
                  jQuery("#wrapper").css("left", -currentLeft + 15);
                  jQuery("#header.header-container").css("left", -currentLeft + 15);
                  jQuery(".vlt-right-menu").css("right", -395 + currentLeft);
               }
            });
         } else {
            jQuery("#nav-icon2").addClass('open');
            jQuery(".vlt-nav").stop().animate({
               right: 380
            }, {
               duration: 250,
               step: function(currentLeft) {
                  jQuery("#wrapper").css("left", -currentLeft);
                  jQuery("#header.header-container").css("left", -currentLeft - 238);
                  jQuery(".vlt-right-menu").css("right", -380 + currentLeft);
                  console.log(currentLeft);
               }
            });
         }
         flagNav = !flagNav;
      });
   };
};
/*
=======================================================
 Left Side Navigation
=======================================================
*/
function leftsidenavigation() {
   if ($('#vlt-showLeft').length && jQuery()) {
      var menuRightNav = document.getElementById('vlt-left-menu-s2'),
         showRightPushNav = document.getElementById('vlt-showLeft'),
         body = document.body;
      var flagNav = false;
      jQuery("#vlt-showLeft").on( "click", function(e) {
         e.preventDefault();
         if (flagNav) {
            jQuery("#nav-icon2").removeClass('open');
            jQuery(".vlt-nav").stop().animate({
               left: 15
            }, {
               duration: 250,
               step: function(currentRight) {
                  jQuery("#wrapper").css("right", -currentRight + 15);
                  jQuery(".vlt-left-menu").css("left", -395 + currentRight);
               }
            });
         } else {
            jQuery("#nav-icon2").addClass('open');
            jQuery(".vlt-nav").stop().animate({
               left: 380
            }, {
               duration: 250,
               step: function(currentRight) {
                  jQuery("#wrapper").css("right", -currentRight);
                  jQuery(".vlt-left-menu").css("left", -380 + currentRight);
                  console.log(currentRight);
               }
            });
         }
         flagNav = !flagNav;
      });
   };
};

function countDownNew() {
   jQuery('.countdown').downCount({
      date: '09/23/2016 12:00:00',
      offset: +10
   });
};
/*
=======================================================
 Mouse Movement Event
=======================================================
*/
function mouseMovement() {
   if ($('.mouse-movement').length && jQuery()) {
      new logosDistort(document.getElementsByClassName('mouse-movement'), {
         perspectiveMulti: 1.3
      });
   };
};
/*
=======================================================
 Social Share Click Event
=======================================================
*/
function socialShareClick() {
   if ($('.share-number').length > 0 && jQuery()) {
      $(".share-number").off("click").on('click', function(e) {
         var item = jQuery(this);
         e.preventDefault();
         item.parent().find(".meta-share-social").fadeIn();
         item.css("display", "none");
      });
      $(document).on('click', 'body', function(e) {
         var item = jQuery(e.target);
         if (!item.hasClass("share-number") && !item.parent().hasClass("share-number") && !item.hasClass("meta-share-social") && !item.parent().hasClass("meta-share-social")) {
            jQuery(".share-number").fadeIn();
            jQuery(".share-number").parent().find(".meta-share-social").css("display", "none");
         }
      });
   };
};
/*
=======================================================
 Process Step
=======================================================
*/
function processSteps() {
   if ($('.process-steps').length && jQuery()) {
      $(".process-steps").steps({
         headerTag: "h3",
         bodyTag: "section",
         transitionEffect: "slideLeft",
         autoFocus: true
      });
      $(".process-steps .actions ul li a").addClass("btn btn-lg btn-default");
   };
};
/*
=======================================================
 Range Sliders
=======================================================
*/
function rangeSliders() {
   if (($('.range-slider').length) && jQuery()) {
      $(".simple-range-1").ionRangeSlider();
      $(".simple-range-2").ionRangeSlider({
         min: 100,
         max: 1000,
         from: 550
      });
      $(".simple-range-3").ionRangeSlider({
         type: "double",
         grid: true,
         min: 0,
         max: 1000,
         from: 200,
         to: 800,
         prefix: "$"
      });
      $(".simple-range-4").ionRangeSlider({
         type: "double",
         grid: true,
         min: -1000,
         max: 1000,
         from: -500,
         to: 500
      });
      $(".simple-range-5").ionRangeSlider({
         type: "double",
         grid: true,
         min: -1000,
         max: 1000,
         from: -500,
         to: 500,
         step: 250
      });
      $(".simple-range-6").ionRangeSlider({
         type: "double",
         grid: true,
         min: -12.8,
         max: 12.8,
         from: -3.2,
         to: 3.2,
         step: 0.1
      });
      $(".simple-range-7").ionRangeSlider({
         type: "double",
         grid: true,
         from: 1,
         to: 5,
         values: [0, 10, 100, 1000, 10000, 100000, 1000000]
      });
      $(".simple-range-8").ionRangeSlider({
         grid: true,
         from: 5,
         values: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
      });
      $(".simple-range-9").ionRangeSlider({
         grid: true,
         from: 3,
         values: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      });
      $(".simple-range-10").ionRangeSlider({
         grid: true,
         min: 1000,
         max: 1000000,
         from: 200000,
         step: 1000,
         prettify_enabled: true
      });
      $(".simple-range-11").ionRangeSlider({
         grid: true,
         min: 1000,
         max: 1000000,
         from: 300000,
         step: 1000,
         prettify_enabled: true,
         prettify_separator: "."
      });
      $(".simple-range-12").ionRangeSlider({
         type: "double",
         grid: true,
         min: 0,
         max: 10000,
         from: 1000,
         step: 9000,
         prefix: "$"
      });
      $(".simple-range-13").ionRangeSlider({
         type: "single",
         grid: true,
         min: -90,
         max: 90,
         from: 0,
         postfix: "°"
      });
      $(".simple-range-14").ionRangeSlider({
         grid: true,
         min: 18,
         max: 70,
         from: 30,
         prefix: "Age ",
         max_postfix: "+"
      });
      $(".simple-range-15").ionRangeSlider({
         type: "double",
         min: 100,
         max: 200,
         from: 148,
         to: 152,
         prefix: "Weight: ",
         postfix: " million pounds",
         values_separator: " → "
      });
      $(".simple-range-16").ionRangeSlider({
         type: "double",
         min: 1000,
         max: 2000,
         from: 1200,
         to: 1800,
         hide_min_max: true,
         hide_from_to: false,
         grid: false
      });
      $(".simple-range-17").ionRangeSlider({
         type: "double",
         min: 0,
         max: 10000,
         step: 500,
         grid: true,
         grid_snap: true
      });
      $(".simple-range-18").ionRangeSlider({
         type: "double",
         min: 0,
         max: 100,
         from: 20,
         from_min: 10,
         from_max: 30,
         from_shadow: true,
         to: 80,
         to_min: 70,
         to_max: 90,
         to_shadow: true,
         grid: true,
         grid_num: 10
      });
      $(".simple-range-19").ionRangeSlider({
         min: 0,
         max: 100,
         from: 30,
         disable: true
      });
      $(".simple-range-20").ionRangeSlider({
         min: +moment().subtract(12, "hours").format("X"),
         max: +moment().format("X"),
         from: +moment().subtract(6, "hours").format("X"),
         grid: true,
         force_edges: true,
         prettify: function(num) {
            var m = moment(num, "X").locale("ru");
            return m.format("Do MMMM, HH:mm");
         }
      });
      $(".simple-range-21").ionRangeSlider({
         min: +moment().subtract(12, "hours").format("X"),
         max: +moment().format("X"),
         from: +moment().subtract(6, "hours").format("X"),
         grid: true,
         force_edges: true,
         prettify: function(num) {
            var m = moment(num, "X").locale("ja");
            return m.format("Do MMMM, LT");
         }
      });
   };
};
/*
=======================================================
 Process Multi Steps
=======================================================
*/
function processMultiSteps() {
   if (($('#msform').length) && jQuery()) {
      var current_fs, next_fs, previous_fs;
      var left, opacity, scale;
      var animating;
      $(".next").on( "click", function() {
         if (animating) return false;
         animating = true;
         current_fs = $(this).parent();
         next_fs = $(this).parent().next();
         $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
         next_fs.show();
         current_fs.animate({
            opacity: 0
         }, {
            step: function(now, mx) {
               scale = 1 - (1 - now) * 0.2;
               left = (now * 50) + "%";
               opacity = 1 - now;
               current_fs.css({
                  'transform': 'scale(' + scale + ')'
               });
               next_fs.css({
                  'left': left,
                  'opacity': opacity
               });
            },
            duration: 800,
            complete: function() {
               current_fs.hide();
               animating = false;
            },
            easing: 'easeInOutBack'
         });
      });
      $(".previous").on( "click", function() {
         if (animating) return false;
         animating = true;
         current_fs = $(this).parent();
         previous_fs = $(this).parent().prev();
         $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
         previous_fs.show();
         current_fs.animate({
            opacity: 0
         }, {
            step: function(now, mx) {
               scale = 0.8 + (1 - now) * 0.2;
               left = ((1 - now) * 50) + "%";
               opacity = 1 - now;
               current_fs.css({
                  'left': left
               });
               previous_fs.css({
                  'transform': 'scale(' + scale + ')',
                  'opacity': opacity
               });
            },
            duration: 800,
            complete: function() {
               current_fs.hide();
               animating = false;
            },
            easing: 'easeInOutBack'
         });
      });
   };
};
/*
=======================================================
 Charts
=======================================================
*/
function pizzaChats() {
   if (($('#vlt-bar-chart').length || $('#vlt-line-graph').length || $('#vlt-donut-graph').length || $('#vlt-graph-line').length) && jQuery()) {
      Pizza.init();
   };
};


function googlecharts() {
      if ($('.google-charts-box').length && jQuery()) {
      
      google.charts.load('current', {'packages':['corechart', 'bar']});
      google.charts.setOnLoadCallback(googlepiechart);
	  google.charts.setOnLoadCallback(googlecolumnsbar);
	  google.charts.setOnLoadCallback(googleareachart);
	  google.charts.setOnLoadCallback(googledonutchart);
      function googlepiechart() {
      var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ]);
        var options = {'title':'How Much Pizza I Ate Last Night',
		colors: ['#0eb1eb', '#fe403b', '#323a44']
		};
        var chart = new google.visualization.PieChart(document.getElementById('googlepiechart'));
        chart.draw(data, options);
      }
	  function googlecolumnsbar() {
      var data = new google.visualization.DataTable();
      data.addColumn('timeofday', 'Time of Day');
      data.addColumn('number', 'Motivation Level');
      data.addColumn('number', 'Energy Level');

      data.addRows([
        [{v: [8, 0, 0], f: '8 am'}, 1, .25],
        [{v: [9, 0, 0], f: '9 am'}, 2, .5],
        [{v: [10, 0, 0], f:'10 am'}, 3, 1],
        [{v: [11, 0, 0], f: '11 am'}, 4, 2.25],
        [{v: [12, 0, 0], f: '12 pm'}, 5, 2.25],
        [{v: [13, 0, 0], f: '1 pm'}, 6, 3],
        [{v: [14, 0, 0], f: '2 pm'}, 7, 4],
        [{v: [15, 0, 0], f: '3 pm'}, 8, 5.25],
        [{v: [16, 0, 0], f: '4 pm'}, 9, 7.5],
        [{v: [17, 0, 0], f: '5 pm'}, 10, 10],
      ]);

      var options = {
        title: 'Motivation and Energy Level Throughout the Day',
        colors: ['#0eb1eb', '#fe403b'],
        hAxis: {
          title: 'Time of Day',
          format: 'h:mm a',
          viewWindow: {
            min: [7, 30, 0],
            max: [17, 30, 0]
          }
        },
        vAxis: {
          title: 'Rating (scale of 1-10)'
        }
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('googlecolumnsbar'));
      chart.draw(data, options);
    }
	function googleareachart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses'],
          ['2013',  1000,      400],
          ['2014',  1170,      460],
          ['2015',  660,       1120],
          ['2016',  1030,      540]
        ]);

        var options = {
          title: 'Company Performance',
          hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0},
           colors: ['#0eb1eb', '#fe403b'],
		   areaOpacity: 0.0
        };

        var chart = new google.visualization.AreaChart(document.getElementById('googleareachart'));
        chart.draw(data, options);
      }
	  function googledonutchart() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
		  ['Sleep',      4],
        ]);

        var options = {
          title: 'My Daily Activities',
          pieHole: 0.4,
		  colors: ['#0eb1eb', '#fe403b', '#323a44']
        };

        var chart = new google.visualization.PieChart(document.getElementById('googledonutchart'));
        chart.draw(data, options);
      }
};
};
function flotcharts() {

function flotbasicchart() {
	if ($('#flotbasicchart').length && jQuery()) {
        var d1 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.25) {
			d1.push([i, Math.sin(i)]);
		}

		var d2 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.25) {
			d2.push([i, Math.cos(i)]);
		}

		var d3 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.1) {
			d3.push([i, Math.tan(i)]);
		}

		$.plot("#flotbasicchart", [
			{ label: "sin(x)", data: d1, color: '#0eb1eb' },
			{ label: "cos(x)", data: d2, color: '#fe403b', },
			{ label: "tan(x)", data: d3, color: '#323a44', }
		], {
			series: {
				lines: { show: true },
				points: { show: true }
			},
			xaxis: {
				ticks: [
					0, [ Math.PI/2, "\u03c0/2" ], [ Math.PI, "\u03c0" ],
					[ Math.PI * 3/2, "3\u03c0/2" ], [ Math.PI * 2, "2\u03c0" ]
				]
			},
			yaxis: {
				ticks: 10,
				min: -2,
				max: 2,
				tickDecimals: 3
			},
			grid: {
				backgroundColor: "#ffffff",
				borderWidth: {
					top: 1,
					right: 1,
					bottom: 2,
					left: 2
				}
			}
		});

		

	


	};
};

function flottrackingchart() {
	if ($('#flottrackingchart').length && jQuery()) {
        var sin = [], cos = [];
		for (var i = 0; i < 14; i += 0.1) {
			sin.push([i, Math.sin(i)]);
			cos.push([i, Math.cos(i)]);
		}

		plot = $.plot("#flottrackingchart", [
			{ data: sin, label: "sin(x) = -0.00", color: '#0eb1eb' },
			{ data: cos, label: "cos(x) = -0.00", color: '#fe403b' }
		], {
			series: {
				lines: {
					show: true
				}
			},
			crosshair: {
				mode: "x"
			},
			grid: {
				hoverable: true,
				autoHighlight: false
			},
			yaxis: {
				min: -1.2,
				max: 1.2
			}
		});

		var legends = $("#flottrackingchart .legendLabel");

		legends.each(function () {
		
			$(this).css('width', $(this).width());
		});

		var updateLegendTimeout = null;
		var latestPosition = null;

		function updateLegend() {

			updateLegendTimeout = null;

			var pos = latestPosition;

			var axes = plot.getAxes();
			if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
				pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) {
				return;
			}

			var i, j, dataset = plot.getData();
			for (i = 0; i < dataset.length; ++i) {

				var series = dataset[i];

				

				for (j = 0; j < series.data.length; ++j) {
					if (series.data[j][0] > pos.x) {
						break;
					}
				}


				var y,
					p1 = series.data[j - 1],
					p2 = series.data[j];

				if (p1 == null) {
					y = p2[1];
				} else if (p2 == null) {
					y = p1[1];
				} else {
					y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);
				}

				legends.eq(i).text(series.label.replace(/=.*/, "= " + y.toFixed(2)));
			}
		}

		$("#flottrackingchart").on("plothover",  function (event, pos, item) {
			latestPosition = pos;
			if (!updateLegendTimeout) {
				updateLegendTimeout = setTimeout(updateLegend, 50);
			}
		});

		

	


	};
};

	function flotrealtimechart() {
       
if ($('#flotrealtimechart').length && jQuery()) {

	

		var data = [],
			totalPoints = 300;

		function getRandomData() {

			if (data.length > 0)
				data = data.slice(1);

			

			while (data.length < totalPoints) {

				var prev = data.length > 0 ? data[data.length - 1] : 50,
					y = prev + Math.random() * 10 - 5;

				if (y < 0) {
					y = 0;
				} else if (y > 100) {
					y = 100;
				}

				data.push(y);
			}

			

			var res = [];
			for (var i = 0; i < data.length; ++i) {
				res.push([i, data[i]])
			}

			return res;
		}

		

		var updateInterval = 30;
		$("#updateInterval").val(updateInterval).change(function () {
			var v = $(this).val();
			if (v && !isNaN(+v)) {
				updateInterval = +v;
				if (updateInterval < 1) {
					updateInterval = 1;
				} else if (updateInterval > 2000) {
					updateInterval = 2000;
				}
				$(this).val("" + updateInterval);
			}
		});

		var plot = $.plot("#flotrealtimechart", [ getRandomData() ], {
			series: {
				lines: {
				shadowSize: 0,
				fill: true
				},
				color: '#0eb1eb'
			},
			yaxis: {
				min: 0,
				max: 100
			},
			xaxis: {
				show: false
			}
		});

		function update() {

			plot.setData([getRandomData()]);
            plot.draw();
			setTimeout(update, updateInterval);
		}

		update();

		

		

	


	};
	};
     flotbasicchart();
	 flottrackingchart();
	 flotrealtimechart();
	};
	function morrischarts() { 
	if ($('#morrisdonutgraph').length && jQuery()) {
	Morris.Donut({
  element: 'morrisdonutgraph',
  data: [
    {value: 70, label: 'Business'},
    {value: 15, label: 'Coporate'},
    {value: 10, label: 'Restaurant'},
    {value: 5, label: 'Shop'}
  ],
  colors: [
    '#0eb1eb',
    '#fe403b',
    '#323a44'
    
  ],
  formatter: function (x) { return x + "%"}
  }).on('click', function(i, row){
  console.log(i, row);
   });
	};
	if ($('#morrisareagraph').length && jQuery()) {
   Morris.Area({
  element: 'morrisareagraph',
  data: [
    {x: '2010 Q4', y: 3, z: 7},
    {x: '2011 Q1', y: 3, z: 4},
    {x: '2011 Q2', y: null, z: 1},
    {x: '2011 Q3', y: 2, z: 5},
    {x: '2011 Q4', y: 8, z: 2},
    {x: '2012 Q1', y: 4, z: 4}
  ],
  xkey: 'x',
  ykeys: ['y', 'z'],
  labels: ['Y', 'Z'],
  lineColors: [
    '#0eb1eb',
    '#fe403b',
    
    
  ]
}).on('click', function(i, row){
  console.log(i, row);
});
	};
	if ($('#morrislinegraph').length && jQuery()) {
      Morris.Line({
  element: 'morrislinegraph',
  data: [
    {x: '2010 Q4', y: 3, z: 7},
    {x: '2011 Q1', y: 3, z: 4},
    {x: '2011 Q2', y: 2, z: 1},
    {x: '2011 Q3', y: 2, z: 5},
    {x: '2011 Q4', y: 8, z: 2},
    {x: '2012 Q1', y: 4, z: 4}
  ],
  xkey: 'x',
  ykeys: ['y', 'z'],
  labels: ['Y', 'Z'],
  lineColors: [
    '#0eb1eb',
    '#fe403b',
    
    
  ]
}).on('click', function(i, row){
  console.log(i, row);
});
	};
	if ($('#morrisbargraph').length && jQuery()) {
Morris.Bar({
  element: 'morrisbargraph',
  data: [
    {x: '2011 Q1', y: 3, z: 2, a: 3},
    {x: '2011 Q2', y: 2, z: null, a: 1},
    {x: '2011 Q3', y: 0, z: 2, a: 4},
    {x: '2011 Q4', y: 2, z: 4, a: 3}
  ],
  xkey: 'x',
  ykeys: ['y', 'z', 'a'],
  labels: ['Y', 'Z', 'A'],
  barColors: [
    '#0eb1eb',
    '#fe403b',
    '#323a44'
    
  ]
}).on('click', function(i, row){
  console.log(i, row);
});
	};
	};
function chartlicharts() { 
if ($('#chartli1').length && jQuery()) {
var chartliexample1 = echarts.init(document.getElementById('chartli1'));


        option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Microsoft', 'Apple', 'Samsung', 'Cisco', 'Sony']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: false },
                    dataView: { show: false, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                    restore: { show: true, title: 'Refresh' },
                    saveAsImage: { show: true, title: 'Save As Image' }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
			color: ['#0eb1eb', '#fe403b', '#323a44', '#069dd4', '#e53029'],
            series: [
                {
                    name: 'Microsoft',
                    type: 'line',
                    stack: 'Total',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Apple',
                    type: 'line',
                    stack: 'Total',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Samsung',
                    type: 'line',
                    stack: 'Total',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: 'Cisco',
                    type: 'line',
                    stack: 'Total',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: 'Sony',
                    type: 'line',
                    stack: 'Total',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };



        chartliexample1.setOption(option);
}
if ($('#chartli2').length && jQuery()) {
var chartliexample2 = echarts.init(document.getElementById('chartli2'));
        option = {
            title: {
                text: 'A real estate sales',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Request', 'Pre Order', 'Transactions']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: false },
                    dataView: { show: false, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                    restore: { show: true, title: 'Refresh' },
                    saveAsImage: { show: true, title: 'Save As Image' }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
			color: ['#0eb1eb', '#fe403b', '#323a44', '#069dd4'],
            series: [
                {
                    name: 'Transactions',
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' } } },
                    data: [10, 12, 21, 54, 260, 830, 710]
                },
                {
                    name: 'Pre Order',
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' } } },
                    data: [30, 182, 434, 791, 390, 30, 10]
                },
                {
                    name: 'Request',
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' } } },
                    data: [1320, 1132, 601, 234, 120, 90, 20]
                }
            ]
        };

        chartliexample2.setOption(option);


	}
	if ($('#chartli3').length && jQuery()) {
    var chartliexample3 = echarts.init(document.getElementById('chartli3'));
        window.onresize = chartliexample3.resize

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'        // type：'line' | 'shadow'
                }
            },
            legend: {
                data: ['Lenovo', 'Apple', 'Samsung', 'Dell', 'Acer', 'Toshiba', 'Hp', 'IBM', 'Huweai']
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                x: 'right',
                y: 'center',
                feature: {
                    mark: { show: false },
                    dataView: { show: false, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                    restore: { show: true ,title:'Refresh'},
                    saveAsImage: { show: true ,title:'Save As Image'}
                }
            },
            calculable: true,
			color: ['#0eb1eb', '#fe403b', '#323a44', '#069dd4', '#e53029', '#556273', '#03CEA4', '#FA7921'],
            xAxis: [
                {
                    type: 'category',
                    data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday', 'Sunday']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Lenovo',
                    type: 'bar',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: 'Apple',
                    type: 'bar',
                    stack: 'Smartphone',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Samsung',
                    type: 'bar',
                    stack: 'Smartphone',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Dell',
                    type: 'bar',
                    stack: 'Computer',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: 'Acer',
                    type: 'bar',
                    data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                    markLine: {
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    type: 'dashed'
                                }
                            }
                        },
                        data: [
                            [{ type: 'min' }, { type: 'max' }]
                        ]
                    }
                },
                {
                    name: 'Toshiba',
                    type: 'bar',
                    barWidth: 5,
                    stack: 'Computer',
                    data: [620, 732, 701, 734, 1090, 1130, 1120]
                },
                {
                    name: 'Hp',
                    type: 'bar',
                    stack: 'Notebook',
                    data: [120, 132, 101, 134, 290, 230, 220]
                },
                {
                    name: 'IBM',
                    type: 'bar',
                    stack: 'Server',
                    data: [60, 72, 71, 74, 190, 130, 110]
                },
                {
                    name: 'Huweai',
                    type: 'bar',
                    stack: 'Server',
                    data: [62, 82, 91, 84, 109, 110, 120]
                }
            ]
        };

        chartliexample3.setOption(option);

	}
	if ($('#chartli4').length && jQuery()) { 
	var chartliexample4 = echarts.init(document.getElementById('chartli4'));
        window.onresize = chartliexample4.resize
        option = {
            title: {
                text: '',
                subtext: '',
                sublink: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'        // type:'line' | 'shadow'
                },
                formatter: function (params) {
                    return params[0].name + '<br />'
                           + params[0].seriesName + ' : ' + params[0].value + '<br />'
                           + params[1].seriesName + ' : ' + (params[1].value + params[0].value);
                }
            },
            legend: {
                selectedMode: false,
                data: ['Yahoo', 'Forecast']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: false },
                    dataView: { show: false, readOnly: false },
                    //magicType: { show: true, type: ['line', 'bar',  'tiled'] },
                    restore: { show: true, title: 'Refresh' },
                    saveAsImage: { show: true, title: 'Save As Image' }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: ['New York', 'London', 'Istanbul', 'Milano', 'Kiev', 'Munchen']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    boundaryGap: [0, 0.1]
                }
            ],
            series: [
                {
                    name: 'Yahoo',
                    type: 'bar',
                    stack: 'sum',
                    barCategoryGap: '50%',
                    itemStyle: {
                        normal: {
                            color: '#0eb1eb',
                            barBorderColor: '#0eb1eb',
                            barBorderWidth: 6,
                            barBorderRadius: 0,
                            label: {
                                show: true, position: 'insideTop'
                            }
                        }
                    },
                    data: [260, 200, 220, 120, 100, 80]
                },
                {
                    name: 'Forecast',
                    type: 'bar',
                    stack: 'sum',
                    itemStyle: {
                        normal: {
                            color: '#323a44',
                            barBorderColor: '#0eb1eb',
                            barBorderWidth: 6,
                            barBorderRadius: 0,
                            label: {
                                show: true,
                                position: 'top',
                                formatter: function (params) {
                                    for (var i = 0, l = option.xAxis[0].data.length; i < l; i++) {
                                        if (option.xAxis[0].data[i] == params.name) {
                                            return option.series[0].data[i] + params.value;
                                        }
                                    }
                                },
                                textStyle: {
                                    color: 'tomato'
                                }
                            }
                        }
                    },
                    data: [40, 80, 50, 80, 80, 70]
                }
            ]
        };

        chartliexample4.setOption(option);
	}
	if ($('#chartli5').length && jQuery()) {  
	var chartliexample5 = echarts.init(document.getElementById('chartli5'));

        option = {
            title: {
                text: 'Male Female Height Weight Distribution',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis',
                showDelay: 0,
                formatter: function (params) {
                    if (params.value.length > 1) {
                        return params.seriesName + ' :<br />'
                           + params.value[0] + 'cm '
                           + params.value[1] + 'kg ';
                    }
                    else {
                        return params.seriesName + ' :<br />'
                           + params.name + ' : '
                           + params.value + 'kg ';
                    }
                },
                axisPointer: {
                    show: true,
                    type: 'cross',
                    lineStyle: {
                        type: 'dashed',
                        width: 1
                    }
                }
            },
            legend: {
                data: ['Female', 'Male']
            },
            toolbox: {
                show: true,
                feature: {
                    restore: { show: true, title: 'Refresh' },
                    //magicType: { show: true, type: ['force', 'chord'] },
                    saveAsImage: { show: true, title: 'Save As Image' }
                }
            },
            xAxis: [
                {
                    type: 'value',
                    scale: true,
                    axisLabel: {
                        formatter: '{value} cm'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    axisLabel: {
                        formatter: '{value} kg'
                    }
                }
            ],
            series: [
                {
                    name: 'Female',
                    type: 'scatter',
					itemStyle: {
                        normal: {
                            color: '#0eb1eb',
                         }
                    },
                    data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
                        [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
                        [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
                        [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
                        [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
                        [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
                        [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
                        [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
                        [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
                        [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
                        [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
                        [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
                        [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
                        [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
                        [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
                        [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
                        [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
                        [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
                        [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
                        [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
                        [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
                        [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
                        [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
                        [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
                        [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
                        [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
                        [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
                        [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
                        [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
                        [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
                        [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
                        [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
                        [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
                        [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
                        [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
                        [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
                        [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
                        [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
                        [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
                        [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
                        [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
                        [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
                        [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
                        [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
                        [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
                        [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
                        [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
                        [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
                        [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
                        [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
                        [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
                        [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]
                    ],
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Max:' },
                            { type: 'min', name: 'Min:' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: 'Avarage' }
                        ]
                    }
                },
                {
                    name: 'Male',
                    type: 'scatter',
					itemStyle: {
                        normal: {
                            color: '#fe403b',
                         }
                    },
                    data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
                        [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
                        [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0],
                        [184.0, 79.6], [192.7, 93.8], [171.5, 70.0], [173.0, 72.4], [176.0, 85.9],
                        [176.0, 78.8], [180.5, 77.8], [172.7, 66.2], [176.0, 86.4], [173.5, 81.8],
                        [178.0, 89.6], [180.3, 82.8], [180.3, 76.4], [164.5, 63.2], [173.0, 60.9],
                        [183.5, 74.8], [175.5, 70.0], [188.0, 72.4], [189.2, 84.1], [172.8, 69.1],
                        [170.0, 59.5], [182.0, 67.2], [170.0, 61.3], [177.8, 68.6], [184.2, 80.1],
                        [186.7, 87.8], [171.4, 84.7], [172.7, 73.4], [175.3, 72.1], [180.3, 82.6],
                        [182.9, 88.7], [188.0, 84.1], [177.2, 94.1], [172.1, 74.9], [167.0, 59.1],
                        [169.5, 75.6], [174.0, 86.2], [172.7, 75.3], [182.2, 87.1], [164.1, 55.2],
                        [163.0, 57.0], [171.5, 61.4], [184.2, 76.8], [174.0, 86.8], [174.0, 72.2],
                        [177.0, 71.6], [186.0, 84.8], [167.0, 68.2], [171.8, 66.1], [182.0, 72.0],
                        [167.0, 64.6], [177.8, 74.8], [164.5, 70.0], [192.0, 101.6], [175.5, 63.2],
                        [171.2, 79.1], [181.6, 78.9], [167.4, 67.7], [181.1, 66.0], [177.0, 68.2],
                        [174.5, 63.9], [177.5, 72.0], [170.5, 56.8], [182.4, 74.5], [197.1, 90.9],
                        [180.1, 93.0], [175.5, 80.9], [180.6, 72.7], [184.4, 68.0], [175.5, 70.9],
                        [180.6, 72.5], [177.0, 72.5], [177.1, 83.4], [181.6, 75.5], [176.5, 73.0],
                        [175.0, 70.2], [174.0, 73.4], [165.1, 70.5], [177.0, 68.9], [192.0, 102.3],
                        [176.5, 68.4], [169.4, 65.9], [182.1, 75.7], [179.8, 84.5], [175.3, 87.7],
                        [184.9, 86.4], [177.3, 73.2], [167.4, 53.9], [178.1, 72.0], [168.9, 55.5],
                        [157.2, 58.4], [180.3, 83.2], [170.2, 72.7], [177.8, 64.1], [172.7, 72.3],
                        [165.1, 65.0], [186.7, 86.4], [165.1, 65.0], [174.0, 88.6], [175.3, 84.1],
                        [185.4, 66.8], [177.8, 75.5], [180.3, 93.2], [180.3, 82.7], [177.8, 58.0],
                        [177.8, 79.5], [177.8, 78.6], [177.8, 71.8], [177.8, 116.4], [163.8, 72.2],
                        [188.0, 83.6], [198.1, 85.5], [175.3, 90.9], [166.4, 85.9], [190.5, 89.1],
                        [166.4, 75.0], [177.8, 77.7], [179.7, 86.4], [172.7, 90.9], [190.5, 73.6],
                        [185.4, 76.4], [168.9, 69.1], [167.6, 84.5], [175.3, 64.5], [170.2, 69.1],
                        [190.5, 108.6], [177.8, 86.4], [190.5, 80.9], [177.8, 87.7], [184.2, 94.5],
                        [176.5, 80.2], [177.8, 72.0], [180.3, 71.4], [171.4, 72.7], [172.7, 84.1],
                        [172.7, 76.8], [177.8, 63.6], [177.8, 80.9], [182.9, 80.9], [170.2, 85.5],
                        [167.6, 68.6], [175.3, 67.7], [165.1, 66.4], [185.4, 102.3], [181.6, 70.5],
                        [172.7, 95.9], [190.5, 84.1], [179.1, 87.3], [175.3, 71.8], [170.2, 65.9],
                        [193.0, 95.9], [171.4, 91.4], [177.8, 81.8], [177.8, 96.8], [167.6, 69.1],
                        [167.6, 82.7], [180.3, 75.5], [182.9, 79.5], [176.5, 73.6], [186.7, 91.8],
                        [188.0, 84.1], [188.0, 85.9], [177.8, 81.8], [174.0, 82.5], [177.8, 80.5],
                        [171.4, 70.0], [185.4, 81.8], [185.4, 84.1], [188.0, 90.5], [188.0, 91.4],
                        [182.9, 89.1], [176.5, 85.0], [175.3, 69.1], [175.3, 73.6], [188.0, 80.5],
                        [188.0, 82.7], [175.3, 86.4], [170.5, 67.7], [179.1, 92.7], [177.8, 93.6],
                        [175.3, 70.9], [182.9, 75.0], [170.8, 93.2], [188.0, 93.2], [180.3, 77.7],
                        [177.8, 61.4], [185.4, 94.1], [168.9, 75.0], [185.4, 83.6], [180.3, 85.5],
                        [174.0, 73.9], [167.6, 66.8], [182.9, 87.3], [160.0, 72.3], [180.3, 88.6],
                        [167.6, 75.5], [186.7, 101.4], [175.3, 91.1], [175.3, 67.3], [175.9, 77.7],
                        [175.3, 81.8], [179.1, 75.5], [181.6, 84.5], [177.8, 76.6], [182.9, 85.0],
                        [177.8, 102.5], [184.2, 77.3], [179.1, 71.8], [176.5, 87.9], [188.0, 94.3],
                        [174.0, 70.9], [167.6, 64.5], [170.2, 77.3], [167.6, 72.3], [188.0, 87.3],
                        [174.0, 80.0], [176.5, 82.3], [180.3, 73.6], [167.6, 74.1], [188.0, 85.9],
                        [180.3, 73.2], [167.6, 76.3], [183.0, 65.9], [183.0, 90.9], [179.1, 89.1],
                        [170.2, 62.3], [177.8, 82.7], [179.1, 79.1], [190.5, 98.2], [177.8, 84.1],
                        [180.3, 83.2], [180.3, 83.2]
                    ],
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Max:' },
                            { type: 'min', name: 'Min:' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: 'Avarage' }
                        ]
                    }
                }
            ]
        };

        chartliexample5.setOption(option);
	
	
	
	}
	if ($('#chartli6').length && jQuery()) { 
	 var chartliexample6 = echarts.init(document.getElementById('chartli6'));

        option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    var res = params[0].seriesName + ' ' + params[0].name;
                    res += '<br />  Opening : ' + params[0].value[0] + '  Highest : ' + params[0].value[3];
                    res += '<br />  Closing : ' + params[0].value[1] + '  Lowest : ' + params[0].value[2];
                    return res;
                }
            },
            legend: {
                data: ['The Composite Index']
            },
            toolbox: {
                show: true,
                feature: {

                    dataZoom: { show: true, title: 'Zoom' },

                    restore: { show: true, title: 'Refresh' },
                    //magicType: { show: true, type: ['line', 'bar'] },
                    saveAsImage: { show: true, title: 'Save As Image' }
                }
            },
            dataZoom: {
                show: true,
                realtime: true,
                start: 50,
                end: 100
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisTick: { onGap: false },
                    splitLine: { show: false },
                    data: [
                        "2013/1/24", "2013/1/25", "2013/1/28", "2013/1/29", "2013/1/30",
                        "2013/1/31", "2013/2/1", "2013/2/4", "2013/2/5", "2013/2/6",
                        "2013/2/7", "2013/2/8", "2013/2/18", "2013/2/19", "2013/2/20",
                        "2013/2/21", "2013/2/22", "2013/2/25", "2013/2/26", "2013/2/27",
                        "2013/2/28", "2013/3/1", "2013/3/4", "2013/3/5", "2013/3/6",
                        "2013/3/7", "2013/3/8", "2013/3/11", "2013/3/12", "2013/3/13",
                        "2013/3/14", "2013/3/15", "2013/3/18", "2013/3/19", "2013/3/20",
                        "2013/3/21", "2013/3/22", "2013/3/25", "2013/3/26", "2013/3/27",
                        "2013/3/28", "2013/3/29", "2013/4/1", "2013/4/2", "2013/4/3",
                        "2013/4/8", "2013/4/9", "2013/4/10", "2013/4/11", "2013/4/12",
                        "2013/4/15", "2013/4/16", "2013/4/17", "2013/4/18", "2013/4/19",
                        "2013/4/22", "2013/4/23", "2013/4/24", "2013/4/25", "2013/4/26",
                        "2013/5/2", "2013/5/3", "2013/5/6", "2013/5/7", "2013/5/8",
                        "2013/5/9", "2013/5/10", "2013/5/13", "2013/5/14", "2013/5/15",
                        "2013/5/16", "2013/5/17", "2013/5/20", "2013/5/21", "2013/5/22",
                        "2013/5/23", "2013/5/24", "2013/5/27", "2013/5/28", "2013/5/29",
                        "2013/5/30", "2013/5/31", "2013/6/3", "2013/6/4", "2013/6/5",
                        "2013/6/6", "2013/6/7", "2013/6/13"
                    ]
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    boundaryGap: [0.01, 0.01]
                }
            ],
			
			series: [
                {
                    name: 'The Composite Index',
                    type: 'k',
					itemStyle: {
                        normal: {
                            color: '#0eb1eb',
							borderColor: '#0eb1eb'
                         }
                    },
                    data: [ // Opening，Closing，Lowest，Highest
                        [2320.26, 2302.6, 2287.3, 2362.94],
                        [2300, 2291.3, 2288.26, 2308.38],
                        [2295.35, 2346.5, 2295.35, 2346.92],
                        [2347.22, 2358.98, 2337.35, 2363.8],
                        [2360.75, 2382.48, 2347.89, 2383.76],
                        [2383.43, 2385.42, 2371.23, 2391.82],
                        [2377.41, 2419.02, 2369.57, 2421.15],
                        [2425.92, 2428.15, 2417.58, 2440.38],
                        [2411, 2433.13, 2403.3, 2437.42],
                        [2432.68, 2434.48, 2427.7, 2441.73],
                        [2430.69, 2418.53, 2394.22, 2433.89],
                        [2416.62, 2432.4, 2414.4, 2443.03],
                        [2441.91, 2421.56, 2415.43, 2444.8],
                        [2420.26, 2382.91, 2373.53, 2427.07],
                        [2383.49, 2397.18, 2370.61, 2397.94],
                        [2378.82, 2325.95, 2309.17, 2378.82],
                        [2322.94, 2314.16, 2308.76, 2330.88],
                        [2320.62, 2325.82, 2315.01, 2338.78],
                        [2313.74, 2293.34, 2289.89, 2340.71],
                        [2297.77, 2313.22, 2292.03, 2324.63],
                        [2322.32, 2365.59, 2308.92, 2366.16],
                        [2364.54, 2359.51, 2330.86, 2369.65],
                        [2332.08, 2273.4, 2259.25, 2333.54],
                        [2274.81, 2326.31, 2270.1, 2328.14],
                        [2333.61, 2347.18, 2321.6, 2351.44],
                        [2340.44, 2324.29, 2304.27, 2352.02],
                        [2326.42, 2318.61, 2314.59, 2333.67],
                        [2314.68, 2310.59, 2296.58, 2320.96],
                        [2309.16, 2286.6, 2264.83, 2333.29],
                        [2282.17, 2263.97, 2253.25, 2286.33],
                        [2255.77, 2270.28, 2253.31, 2276.22],
                        [2269.31, 2278.4, 2250, 2312.08],
                        [2267.29, 2240.02, 2239.21, 2276.05],
                        [2244.26, 2257.43, 2232.02, 2261.31],
                        [2257.74, 2317.37, 2257.42, 2317.86],
                        [2318.21, 2324.24, 2311.6, 2330.81],
                        [2321.4, 2328.28, 2314.97, 2332],
                        [2334.74, 2326.72, 2319.91, 2344.89],
                        [2318.58, 2297.67, 2281.12, 2319.99],
                        [2299.38, 2301.26, 2289, 2323.48],
                        [2273.55, 2236.3, 2232.91, 2273.55],
                        [2238.49, 2236.62, 2228.81, 2246.87],
                        [2229.46, 2234.4, 2227.31, 2243.95],
                        [2234.9, 2227.74, 2220.44, 2253.42],
                        [2232.69, 2225.29, 2217.25, 2241.34],
                        [2196.24, 2211.59, 2180.67, 2212.59],
                        [2215.47, 2225.77, 2215.47, 2234.73],
                        [2224.93, 2226.13, 2212.56, 2233.04],
                        [2236.98, 2219.55, 2217.26, 2242.48],
                        [2218.09, 2206.78, 2204.44, 2226.26],
                        [2199.91, 2181.94, 2177.39, 2204.99],
                        [2169.63, 2194.85, 2165.78, 2196.43],
                        [2195.03, 2193.8, 2178.47, 2197.51],
                        [2181.82, 2197.6, 2175.44, 2206.03],
                        [2201.12, 2244.64, 2200.58, 2250.11],
                        [2236.4, 2242.17, 2232.26, 2245.12],
                        [2242.62, 2184.54, 2182.81, 2242.62],
                        [2187.35, 2218.32, 2184.11, 2226.12],
                        [2213.19, 2199.31, 2191.85, 2224.63],
                        [2203.89, 2177.91, 2173.86, 2210.58],
                        [2170.78, 2174.12, 2161.14, 2179.65],
                        [2179.05, 2205.5, 2179.05, 2222.81],
                        [2212.5, 2231.17, 2212.5, 2236.07],
                        [2227.86, 2235.57, 2219.44, 2240.26],
                        [2242.39, 2246.3, 2235.42, 2255.21],
                        [2246.96, 2232.97, 2221.38, 2247.86],
                        [2228.82, 2246.83, 2225.81, 2247.67],
                        [2247.68, 2241.92, 2231.36, 2250.85],
                        [2238.9, 2217.01, 2205.87, 2239.93],
                        [2217.09, 2224.8, 2213.58, 2225.19],
                        [2221.34, 2251.81, 2210.77, 2252.87],
                        [2249.81, 2282.87, 2248.41, 2288.09],
                        [2286.33, 2299.99, 2281.9, 2309.39],
                        [2297.11, 2305.11, 2290.12, 2305.3],
                        [2303.75, 2302.4, 2292.43, 2314.18],
                        [2293.81, 2275.67, 2274.1, 2304.95],
                        [2281.45, 2288.53, 2270.25, 2292.59],
                        [2286.66, 2293.08, 2283.94, 2301.7],
                        [2293.4, 2321.32, 2281.47, 2322.1],
                        [2323.54, 2324.02, 2321.17, 2334.33],
                        [2316.25, 2317.75, 2310.49, 2325.72],
                        [2320.74, 2300.59, 2299.37, 2325.53],
                        [2300.21, 2299.25, 2294.11, 2313.43],
                        [2297.1, 2272.42, 2264.76, 2297.1],
                        [2270.71, 2270.93, 2260.87, 2276.86],
                        [2264.43, 2242.11, 2240.07, 2266.69],
                        [2242.26, 2210.9, 2205.07, 2250.63],
                        [2190.1, 2148.35, 2126.22, 2190.1]
                    ]
                }
            ]
        };

        chartliexample6.setOption(option);
	
	
	}
	if ($('#chartli7').length && jQuery()) { 
	var chartliexample7 = echarts.init(document.getElementById('chartli7'));

        option = {
            title: {
                text: 'A site user to access source',
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br />{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['Direct Interview', 'E-mail Marketing', 'Advertising Alliance', 'Video Ads', 'Search Engine']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
			color: ['#0eb1eb', '#fe403b', '#323a44', '#06D6A0', '#FFD166'],
            calculable: true,
            series: [
                {
                    name: 'Access Sources',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 335, name: 'Direct Interview' },
                        { value: 310, name: 'E-mail Marketing' },
                        { value: 234, name: 'Advertising Alliance' },
                        { value: 135, name: 'Video Ads' },
                        { value: 1548, name: 'Search Engine' }
                    ]
                }
            ]
        };

        chartliexample7.setOption(option);
	}
	if ($('#chartli8').length && jQuery()) { 
	var chartliexample8 = echarts.init(document.getElementById('chartli8'));

        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br />{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['Direct Interview', 'E-mail Marketing', 'Advertising Alliance', 'Video Ads', 'Search Engine']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'center',
                                max: 1548
                            }
                        }
                    },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
			
            color: ['#0eb1eb', '#fe403b', '#323a44', '#06D6A0', '#FFD166'],
            calculable: true,
            series: [
                {
                    name: 'Access Sources',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                                position: 'center',
                                textStyle: {
                                    fontSize: '15',
                                    fontWeight: 'bold'
                                }
                            }
                        }
                    },
                    data: [
                        { value: 335, name: 'Direct Interview' },
                        { value: 310, name: 'E-mail Marketing' },
                        { value: 234, name: 'Advertising Alliance' },
                        { value: 135, name: 'Video Ads' },
                        { value: 1548, name: 'Search Engine' }
                    ]
                }
            ]
        };

        chartliexample8.setOption(option);
	}
	if ($('#chartli9').length && jQuery()) {
	var chartliexample9 = echarts.init(document.getElementById('chartli9'));
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br />{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['Through', 'E-mail Marketing', 'Advertising Alliance', 'Video Ads', 'Yandex', 'Google', 'Bing', 'Other']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            color: ['#0eb1eb', '#fe403b', '#323a44', '#069dd4', '#e53029', '#556273', '#06D6A0', '#FFD166'],


            calculable: false,
            series: [
                {
                    name: 'Access Sources',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, 70],

                    // for funnel
                    x: '20%',
                    width: '40%',
                    funnelAlign: 'right',
                    max: 1548,

                    itemStyle: {
                        normal: {
                            label: {
                                position: 'inner'
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    data: [
                        { value: 650, name: 'Yandex' },
                        { value: 379, name: 'Bing' },
                        { value: 1500, name: 'Google', selected: true }
                    ]
                },
                {
                    name: 'Access Sources',
                    type: 'pie',
                    radius: [100, 140],

                    // for funnel
                    x: '60%',
                    width: '35%',
                    funnelAlign: 'left',
                    max: 1048,

                    data: [
                        { value: 335, name: 'Through' },
                        { value: 310, name: 'E-mail Marketing' },
                        { value: 234, name: 'Advertising Alliance' },
                        { value: 135, name: 'Video Ads' },
                        { value: 20, name: 'Yandex' },
                        { value: 1500, name: 'Google' },
                        { value: 147, name: 'Bing' },
                        { value: 102, name: 'Other' }
                    ]
                }
            ]
        };

        chartliexample9.setOption(option);	
		
	}
	if ($('#chartli10').length && jQuery()) { 
		var chartliexample10 = echarts.init(document.getElementById('chartli10'));

        option = {
            title: {
                text: 'Budget vs expenses（Budget vs spending）',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                y: 'bottom',
                data: ['Budget allocation（Allocated Budget）', 'The actual cost（Actual Spending）']
            },
            toolbox: {
                show: true,
                feature: {
                    restore: { show: true, title: 'Refresh' },
                    //magicType: { show: true, type: ['force', 'chord'] },
                    saveAsImage: { show: true, title: 'Save As Image' }
                }
            },
            color: ['#0eb1eb', '#fe403b'],
            polar: [
               {
                   indicator: [
                       { text: 'Sales（Sales）', max: 6000 },
                       { text: 'Administration（Administration）', max: 16000 },
                       { text: 'Information Technology（Information Techology）', max: 30000 },
                       { text: 'Customer Support（Customer Support）', max: 38000 },
                       { text: 'Development（Development）', max: 52000 },
                       { text: 'Marketing（Marketing）', max: 25000 }
                   ]
               }
            ],
            calculable: true,
            series: [
                {
                    name: 'Budget vs expenses（Budget vs spending）',
                    type: 'radar',
                    data: [
                        {
                            value: [4300, 10000, 28000, 35000, 50000, 19000],
                            name: 'Budget allocation（Allocated Budget）'
                        },
                         {
                             value: [5000, 14000, 28000, 31000, 42000, 21000],
                             name: 'The actual cost（Actual Spending）'
                         }
                    ]
                }
            ]
        };

        chartliexample10.setOption(option);
	}
	if ($('#chartli11').length && jQuery()) {
		 var chartliexample11 = echarts.init(document.getElementById('chartli11'));

        option = {
            title: {
                text: 'Ronaldo vs Messi',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                x: 'center',
                data: ['Ronaldo', 'Messi']
            },
            toolbox: {
                show: true,
                feature: {
                    restore: { show: true, title: 'Refresh' },
                    //magicType: { show: true, type: ['force', 'chord'] },
                    saveAsImage: { show: true, title: 'Save As Image' }
                }
            },
            color: ['#0eb1eb', '#fe403b'],

            calculable: true,
            polar: [
                {
                    indicator: [
                        { text: 'Attack', max: 100 },
                        { text: 'Defend', max: 100 },
                        { text: 'Fitness', max: 100 },
                        { text: 'Speed', max: 100 },
                        { text: 'Power', max: 100 },
                        { text: 'Skill', max: 100 }
                    ],
                    radius: 130
                }
            ],
            series: [
                {
                    name: 'Players fully live data',
                    type: 'radar',
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data: [
                        {
                            value: [97, 42, 88, 90, 90, 98],
                            name: 'Messi'
                        },
                        {
                            value: [97, 32, 90, 98, 95, 95],
                            name: 'Ronaldo'
                        }
                    ]
                }
            ]
        };

        chartliexample11.setOption(option);
		
	}
	if ($('#chartli12').length && jQuery()) {
		 var myChart = echarts.init(document.getElementById('chartli12'));
        myChart.showLoading();

        $.get('plugins/chartli/maps/world.json', function (usaJson) {
            myChart.hideLoading();

            echarts.registerMap('world', usaJson, {

            });
            option = {
                title: {
                    text: 'World Population',
                    subtext: 'Datas Are Not Real',
                    sublink: '',
                    left: 'right'
                },
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
                        var value = (params.value + '').split('.');
                        value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                        return params.seriesName + '<br />' + params.name + ': ' + value;
                    }
                },
                visualMap: {
                    left: 'right',
                    min: 0,
                    max: 1000000,
                    inRange: {
                        color: ['#0eb1eb', '#fe403b', '#323a44']
                    },
                    text: ['High', 'Low'],
                    calculable: true
                },

                toolbox: {
                    show: true,
                    //orient: 'vertical',
                    left: 'left',
                    top: 'top',
                    feature: {
                        dataView: { readOnly: false },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: 'World Population',
                        type: 'map',
                        map: 'world',
                        itemStyle: {
                            emphasis: { label: { show: false } }
                        },
                        zoom: 1.2,
                        data: [
                        { name: 'Afghanistan', value: 28397.812 },
                        { name: 'Angola', value: 19549.124 },
                        { name: 'Albania', value: 3150.143 },
                        { name: 'United Arab Emirates', value: 8441.537 },
                        { name: 'Argentina', value: 40374.224 },
                        { name: 'Armenia', value: 2963.496 },
                        { name: 'French Southern and Antarctic Lands', value: 268.065 },
                        { name: 'Australia', value: 22404.488 },
                        { name: 'Austria', value: 8401.924 },
                        { name: 'Azerbaijan', value: 9094.718 },
                        { name: 'Burundi', value: 9232.753 },
                        { name: 'Belgium', value: 10941.288 },
                        { name: 'Benin', value: 9509.798 },
                        { name: 'Burkina Faso', value: 15540.284 },
                        { name: 'Bangladesh', value: 151125.475 },
                        { name: 'Bulgaria', value: 7389.175 },
                        { name: 'The Bahamas', value: 66402.316 },
                        { name: 'Bosnia and Herzegovina', value: 3845.929 },
                        { name: 'Belarus', value: 9491.07 },
                        { name: 'Belize', value: 308.595 },
                        { name: 'Bermuda', value: 64.951 },
                        { name: 'Bolivia', value: 716.939 },
                        { name: 'Brazil', value: 195210.154 },
                        { name: 'Brunei', value: 27.223 },
                        { name: 'Bhutan', value: 716.939 },
                        { name: 'Botswana', value: 1969.341 },
                        { name: 'Central African Republic', value: 4349.921 },
                        { name: 'Canada', value: 34126.24 },
                        { name: 'Switzerland', value: 7830.534 },
                        { name: 'Chile', value: 17150.76 },
                        { name: 'China', value: 1359821.465 },
                        { name: 'Ivory Coast', value: 60508.978 },
                        { name: 'Cameroon', value: 20624.343 },
                        { name: 'Democratic Republic of the Congo', value: 62191.161 },
                        { name: 'Republic of the Congo', value: 3573.024 },
                        { name: 'Colombia', value: 46444.798 },
                        { name: 'Costa Rica', value: 4669.685 },
                        { name: 'Cuba', value: 11281.768 },
                        { name: 'Northern Cyprus', value: 1.468 },
                        { name: 'Cyprus', value: 1103.685 },
                        { name: 'Czech Republic', value: 10553.701 },
                        { name: 'Germany', value: 83017.404 },
                        { name: 'Djibouti', value: 834.036 },
                        { name: 'Denmark', value: 5550.959 },
                        { name: 'Dominican Republic', value: 10016.797 },
                        { name: 'Algeria', value: 37062.82 },
                        { name: 'Ecuador', value: 15001.072 },
                        { name: 'Egypt', value: 78075.705 },
                        { name: 'Eritrea', value: 5741.159 },
                        { name: 'Spain', value: 46182.038 },
                        { name: 'Estonia', value: 1298.533 },
                        { name: 'Ethiopia', value: 87095.281 },
                        { name: 'Finland', value: 5367.693 },
                        { name: 'Fiji', value: 860.559 },
                        { name: 'Falkland Islands', value: 49.581 },
                        { name: 'France', value: 63230.866 },
                        { name: 'Gabon', value: 1556.222 },
                        { name: 'United Kingdom', value: 62066.35 },
                        { name: 'Georgia', value: 4388.674 },
                        { name: 'Ghana', value: 24262.901 },
                        { name: 'Guinea', value: 10876.033 },
                        { name: 'Gambia', value: 1680.64 },
                        { name: 'Guinea Bissau', value: 10876.033 },
                        { name: 'Equatorial Guinea', value: 696.167 },
                        { name: 'Greece', value: 11109.999 },
                        { name: 'Greenland', value: 56.546 },
                        { name: 'Guatemala', value: 14341.576 },
                        { name: 'French Guiana', value: 231.169 },
                        { name: 'Guyana', value: 786.126 },
                        { name: 'Honduras', value: 7621.204 },
                        { name: 'Croatia', value: 4338.027 },
                        { name: 'Haiti', value: 9896.4 },
                        { name: 'Hungary', value: 10014.633 },
                        { name: 'Indonesia', value: 240676.485 },
                        { name: 'India', value: 1205624.648 },
                        { name: 'Ireland', value: 4467.561 },
                        { name: 'Iran', value: 240676.485 },
                        { name: 'Iraq', value: 30962.38 },
                        { name: 'Iceland', value: 318.042 },
                        { name: 'Israel', value: 7420.368 },
                        { name: 'Italy', value: 60508.978 },
                        { name: 'Jamaica', value: 2741.485 },
                        { name: 'Jordan', value: 6454.554 },
                        { name: 'Japan', value: 127352.833 },
                        { name: 'Kazakhstan', value: 15921.127 },
                        { name: 'Kenya', value: 40909.194 },
                        { name: 'Kyrgyzstan', value: 5334.223 },
                        { name: 'Cambodia', value: 14364.931 },
                        { name: 'South Korea', value: 51452.352 },
                        { name: 'Kosovo', value: 97.743 },
                        { name: 'Kuwait', value: 2991.58 },
                        { name: 'Laos', value: 6395.713 },
                        { name: 'Lebanon', value: 4341.092 },
                        { name: 'Liberia', value: 3957.99 },
                        { name: 'Libya', value: 6040.612 },
                        { name: 'Sri Lanka', value: 20758.779 },
                        { name: 'Lesotho', value: 2008.921 },
                        { name: 'Lithuania', value: 3068.457 },
                        { name: 'Luxembourg', value: 507.885 },
                        { name: 'Lithuania', value: 2090.519 },
                        { name: 'Morocco', value: 31642.36 },
                        { name: 'Moldova', value: 103.619 },
                        { name: 'Madagascar', value: 21079.532 },
                        { name: 'Mexico', value: 117886.404 },
                        { name: 'Macedonia', value: 507.885 },
                        { name: 'Mali', value: 13985.961 },
                        { name: 'Myanmar', value: 51931.231 },
                        { name: 'Montenegro', value: 620.078 },
                        { name: 'Mongolia', value: 2712.738 },
                        { name: 'Mozambique', value: 23967.265 },
                        { name: 'Mauritania', value: 3609.42 },
                        { name: 'Malawi', value: 15013.694 },
                        { name: 'Malaysia', value: 28275.835 },
                        { name: 'Namibia', value: 2178.967 },
                        { name: 'New Caledonia', value: 246.379 },
                        { name: 'Niger', value: 15893.746 },
                        { name: 'Nigeria', value: 159707.78 },
                        { name: 'Nicaragua', value: 5822.209 },
                        { name: 'Netherlands', value: 16615.243 },
                        { name: 'Norway', value: 4891.251 },
                        { name: 'Nepal', value: 26846.016 },
                        { name: 'New Zealand', value: 4368.136 },
                        { name: 'Oman', value: 2802.768 },
                        { name: 'Pakistan', value: 173149.306 },
                        { name: 'Panama', value: 3678.128 },
                        { name: 'Peru', value: 29262.83 },
                        { name: 'Philippines', value: 93444.322 },
                        { name: 'Papua New Guinea', value: 6858.945 },
                        { name: 'Poland', value: 38198.754 },
                        { name: 'Puerto Rico', value: 3709.671 },
                        { name: 'North Korea', value: 1.468 },
                        { name: 'Portugal', value: 10589.792 },
                        { name: 'Paraguay', value: 6459.721 },
                        { name: 'Qatar', value: 1749.713 },
                        { name: 'Romania', value: 21861.476 },
                        { name: 'Russia', value: 21861.476 },
                        { name: 'Rwanda', value: 10836.732 },
                        { name: 'Western Sahara', value: 514.648 },
                        { name: 'Saudi Arabia', value: 27258.387 },
                        { name: 'Sudan', value: 35652.002 },
                        { name: 'South Sudan', value: 9940.929 },
                        { name: 'Senegal', value: 12950.564 },
                        { name: 'Solomon Islands', value: 526.447 },
                        { name: 'Sierra Leone', value: 5751.976 },
                        { name: 'El Salvador', value: 6218.195 },
                        { name: 'Somaliland', value: 9636.173 },
                        { name: 'Somalia', value: 9636.173 },
                        { name: 'Republic of Serbia', value: 3573.024 },
                        { name: 'Suriname', value: 524.96 },
                        { name: 'Slovakia', value: 5433.437 },
                        { name: 'Slovenia', value: 2054.232 },
                        { name: 'Sweden', value: 9382.297 },
                        { name: 'Swaziland', value: 1193.148 },
                        { name: 'Syria', value: 7830.534 },
                        { name: 'Chad', value: 11720.781 },
                        { name: 'Togo', value: 6306.014 },
                        { name: 'Thailand', value: 66402.316 },
                        { name: 'Tajikistan', value: 7627.326 },
                        { name: 'Turkmenistan', value: 5041.995 },
                        { name: 'East Timor', value: 10016.797 },
                        { name: 'Trinidad and Tobago', value: 1328.095 },
                        { name: 'Tunisia', value: 10631.83 },
                        { name: 'Turkey', value: 72137.546 },
                        { name: 'United Republic of Tanzania', value: 44973.33 },
                        { name: 'Uganda', value: 33987.213 },
                        { name: 'Ukraine', value: 46050.22 },
                        { name: 'Uruguay', value: 3371.982 },
                        { name: 'United States of America', value: 312247.116 },
                        { name: 'Uzbekistan', value: 27769.27 },
                        { name: 'Venezuela', value: 236.299 },
                        { name: 'Vietnam', value: 89047.397 },
                        { name: 'Vanuatu', value: 236.299 },
                        { name: 'West Bank', value: 13.565 },
                        { name: 'Yemen', value: 22763.008 },
                        { name: 'South Africa', value: 51452.352 },
                        { name: 'Zambia', value: 13216.985 },
                        { name: 'Zimbabwe', value: 13076.978 }
                        ]
                    }
                ]
            };

            myChart.setOption(option);
        });
		
	}	
	if ($('#chartli13').length && jQuery()) {
		 var chartliexample13 = echarts.init(document.getElementById('chartli13'));
        chartliexample1option = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
			color: ['#0eb1eb', '#fe403b', '#323a44'],
            series: [
                {
                    name: 'Speed',
                    type: 'gauge',
                    detail: { formatter: '{value}%' },
                    data: [{ value: 50, name: 'Km/h' }],
					axisLine: {            // Coordinate axis
                        lineStyle: {       // Property lineStyle control line style
                            color: [[0.2, '#0eb1eb'], [0.8, '#fe403b'], [1, '#323a44']],
                           
                        }
                    },
                }
            ]
        };

        timeTicket = setInterval(function () {
            chartliexample1option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
            chartliexample1.setOption(chartliexample1option, true);
        }, 2000);

        chartliexample13.setOption(chartliexample1option);
		
	}
	if ($('#chartli14').length && jQuery()) {
		var timerTwo;
        var chartliexample14 = echarts.init(document.getElementById('chartli14'));

        chartliexample14option = {
            tooltip: {
                formatter: "{a} <br />{b} : {c}%"
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: false },
                    restore: { show: true, title: 'Refresh' },
                    saveAsImage: { show: true, title: 'Save As Image' }
                }
            },
            series: [
                {
                    name: 'Business Indicators',
                    type: 'gauge',
                    splitNumber: 10,       // Dividing the number of segments，The default is 5
                    axisLine: {            // Coordinate axis
                        lineStyle: {       // Property lineStyle control line style
                            color: [[0.2, '#0eb1eb'], [0.8, '#fe403b'], [1, '#323a44']],
                            width: 8
                        }
                    },
                    axisTick: {            // Axis markers
                        splitNumber: 10,   // How much of each split segment segment
                        length: 12,        // Attribute length Control line length
                        lineStyle: {       // Property lineStyle control line style
                            color: 'auto'
                        }
                    },
                    axisLabel: {           // Axis text labels
                        textStyle: {       // The remaining properties using the global default text style
                            color: 'auto'
                        }
                    },
                    splitLine: {           // Divider
                        show: true,        // The default display, control display properties show or not
                        length: 30,         // Attribute length Control line length
                        lineStyle: {       // Property lineStyle control line style
                            color: 'auto'
                        }
                    },
                    pointer: {
                        width: 15
                    },
                    title: {
                        show: true,
                        offsetCenter: [0, '-40%'],       // x, y, units px
                        textStyle: {       //The remaining properties using the global default text style
                            fontWeight: 'bolder'
                        }
                    },
                    detail: {
                        formatter: '{value}%',
                        textStyle: {       // The remaining properties using the global default text style
                            color: 'auto',
                            fontWeight: 'bolder'
                        }
                    },
                    data: [{ value: 80, name: 'Completion Rate' }]
                }
            ]
        };

        timeTicket = setInterval(function () {
            chartliexample14option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
            chartliexample14.setOption(chartliexample14option, true);
        }, 2000);

        chartliexample14.setOption(chartliexample14option);
	}
	if ($('#chartli15').length && jQuery()) { 
	 var chartliexample15 = echarts.init(document.getElementById('chartli15'));

        option = {
            title: {
                text: '',
                subtext: ''
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br />{b} : {c}%"
            },
            toolbox: {
                show: true,
                feature: {
                    restore: { show: true, title: 'Refresh' },
                    //magicType: { show: true, type: ['force', 'chord'] },
                    saveAsImage: { show: true, title: 'Save As Image' }
                }
            },
            legend: {
                data: ['Porshe', 'Jeep', 'Alfa Romeo', 'Jaguar', 'Opel']
            },
			color: ['#0eb1eb', '#fe403b', '#323a44', '#06D6A0', '#FFD166'],
            calculable: true,
            series: [
                {
                    name: 'Funnel',
                    type: 'funnel',
                    width: '40%',
                    data: [
                        { value: 60, name: 'Alfa Romeo' },
                        { value: 40, name: 'Jaguar' },
                        { value: 20, name: 'Opel' },
                        { value: 80, name: 'Jeep' },
                        { value: 100, name: 'Porshe' }
                    ]
                },
                {
                    name: 'Pyramid',
                    type: 'funnel',
                    x: '50%',
                    sort: 'ascending',
                    itemStyle: {
                        normal: {

                            label: {
                                position: 'left'
                            }
                        }
                    },
                    data: [
                        { value: 60, name: 'Alfa Romeo' },
                        { value: 40, name: 'Jaguar' },
                        { value: 20, name: 'Opel' },
                        { value: 80, name: 'Jeep' },
                        { value: 100, name: 'Porshe' }
                    ]
                }
            ]
        };

        chartliexample15.setOption(option);
	}
	if ($('#chartli16').length && jQuery()) { 
	var chartliexample16 = echarts.init(document.getElementById('chartli16'));
        option = {
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            legend: {
                data: ['Evaporation', 'Precipitation', 'Average Temperature']
            },
            color: ['#0eb1eb', '#fe403b', '#323a44', '#069dd4', '#FFD166'],

            xAxis: [
                {
                    type: 'category',
                    data: ['1 Month', '2 Month', '3 Month', '4 Month', '5 Month', '6 Month', '7 Month', '8 Month', '9 Month', '10 Month', '11 Month', '12 Month']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Water',
                    axisLabel: {
                        formatter: '{value} ml'
                    }
                },
                {
                    type: 'value',
                    name: 'Temperature',
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                }
            ],
            series: [

                {
                    name: 'Evaporation',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                },
                {
                    name: 'Precipitation',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                },
                {
                    name: 'Average Temperature',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ]
        };

        chartliexample16.setOption(option);
	}
};
/*
 =======================================================
 Fliping Pricing Tables
 =======================================================
 */
function flipingpricingtables() {
   $(".flip-pricing-tables").each(function() {
      var height = 0;
      jQuery(this).find("div[class*='-column']").each(function() {
         if (height < jQuery(this).outerHeight()) {
            height = jQuery(this).outerHeight();
         }
      });
      jQuery(this).css("height", height + "px");
   });
   $(".flip-pricing-tables").flip({
      speed: 440
   });
};
/*
=======================================================
 Video Play on Click
=======================================================
 */
function videoPlay() {
   if (jQuery(".single-video-play").length > 0 && jQuery()) {
      jQuery(".single-video-play").off("click").on("click", function(e) {
         e.preventDefault();
         var item = jQuery(this),
            parent = jQuery(item.attr("data-id")),
            frame = item.attr("data-frame"),
            video = item.attr("data-video"),
            videoHtml = '',
            videoImage = item.attr("data-image");
         if (frame === "1") {
            /* Video Is Frame */
            videoHtml = '<div class="video-blog-wrapper"><iframe src="' + video + '" frameborder="0" allowfullscreen></iframe></div>'
         } else {
            /* Video Is HTML 5 */
            video = JSON.parse(item.attr("data-video"));
            videoHtml += '<div class="video-blog-wrapper">';
            if (videoImage != undefined) {
               videoHtml += '<video poster="' + videoImage + '" preload="auto" loop autoplay>';
            } else {
               videoHtml += '<video preload="auto" loop autoplay controls>';
            }
            for (key in video) {
               videoHtml += "<source src='" + video[key] + "' type='video/" + key + "'/>";
            }
            videoHtml += '</video>';
            videoHtml += '</div>';
         }
         parent.html(videoHtml);
      });
   }
};
/*
=======================================================
 Process Steps
=======================================================
 */
 function phprocessSteps(){
   if (jQuery(".process-step-1").length > 0 && jQuery()){

             $('.tsf-wizard-1.process-step-1').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style1',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });           

            $('.tsf-wizard-2.process-step-1').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style1',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-1').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style1',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
            $('.tsf-wizard-4.process-step-1').tsfWizard({
                 stepEffect: 'basic',
                stepStyle: 'style1',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
   }
   if (jQuery(".process-step-2").length > 0 && jQuery()){

            $('.tsf-wizard-1.process-step-2').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style2',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });

            $('.tsf-wizard-2.process-step-2').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style2',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'  
            });
            $('.tsf-wizard-3.process-step-2').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style2',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'   
            });
            $('.tsf-wizard-4.process-step-2').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style2',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
   }
   if (jQuery(".process-step-3").length > 0 && jQuery()){

            $('.tsf-wizard-1.process-step-3').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style3',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });

            $('.tsf-wizard-2.process-step-3').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style3',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-3').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style3',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'    
            });
            $('.tsf-wizard-4.process-step-3').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style3',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'  
            });
   }
   if (jQuery(".process-step-4").length > 0 && jQuery()){

            $('.tsf-wizard-1.process-step-4').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style4',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'   
            });

            $('.tsf-wizard-2.process-step-4').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style4',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-4').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style4',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-4').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style4',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'  
            });
   }
   if (jQuery(".process-step-5").length > 0 && jQuery()){

            $('.tsf-wizard-1.process-step-5').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style5',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });

            $('.tsf-wizard-2.process-step-5').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style5',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
            $('.tsf-wizard-3.process-step-5').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style5',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-5').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style5',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
   }
   if (jQuery(".process-step-6").length > 0 && jQuery()){

            $('.tsf-wizard-1.process-step-6').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style5_circle',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'  
            });

            $('.tsf-wizard-2.process-step-6').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style5_circle',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-6').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style5_circle',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-6').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style5_circle',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'   
            });
   }
   if (jQuery(".process-step-7").length > 0 && jQuery()){

            $('.tsf-wizard-1.process-step-7').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style6',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });

            $('.tsf-wizard-2.process-step-7').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style6',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-7').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style6',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
            $('.tsf-wizard-4.process-step-7').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style6',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'  
            });
   }
   if (jQuery(".process-step-8").length && jQuery()){

            $('.tsf-wizard-1.process-step-8').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderTop',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });

            $('.tsf-wizard-2.process-step-8').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderTop',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-8').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderTop',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-8').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderTop',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
   }
   if (jQuery(".process-step-9").length && jQuery()){
      $('.tsf-wizard-1.process-step-9').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderRight',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'   
            });

            $('.tsf-wizard-2.process-step-9').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderRight',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-9').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderRight',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-9').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderRight',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
   }

   if (jQuery(".process-step-10").length && jQuery()){
      $('.tsf-wizard-1.process-step-10').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderBottom',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });

            $('.tsf-wizard-2.process-step-10').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderBottom',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-10').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderBottom',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-10').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderBottom',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
   }

   if (jQuery(".process-step-11").length && jQuery()){
      $('.tsf-wizard-1.process-step-11').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderLeft',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });

            $('.tsf-wizard-2.process-step-11').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderLeft',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-11').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderLeft',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-11').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderLeft',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
   }

   if (jQuery(".process-step-12").length && jQuery()){
      
      $('.tsf-wizard-1.process-step-12').tsfWizard({

                stepEffect: 'basic',
                stepStyle: 'style7_borderTop_circle',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });

            $('.tsf-wizard-2.process-step-12').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderTop_circle',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-12').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderTop_circle',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-12').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderTop_circle',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
   }

   if (jQuery(".process-step-13").length && jQuery()){
      $('.tsf-wizard-1.process-step-13').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderRight_circle',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });

            $('.tsf-wizard-2.process-step-13').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderRight_circle',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-13').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderRight_circle',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-13').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderRight_circle',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
   }

   if (jQuery(".process-step-14").length && jQuery()){
      $('.tsf-wizard-1.process-step-14').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderBottom_circle',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });

            $('.tsf-wizard-2.process-step-14').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderBottom_circle',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-14').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderBottom_circle',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-14').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderBottom_circle',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
   }

   if (jQuery(".process-step-15").length && jQuery()){
      $('.tsf-wizard-1.process-step-15').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderLeft_circle',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });

            $('.tsf-wizard-2.process-step-15').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderLeft_circle',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-15').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderLeft_circle',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-15').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style7_borderLeft_circle',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
   }

   if (jQuery(".process-step-16").length && jQuery()){
      $('.tsf-wizard-1.process-step-16').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style8',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'   
            });

            $('.tsf-wizard-2.process-step-16').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style8',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-16').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style8',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-16').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style8',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
   }

   if (jQuery(".process-step-17").length && jQuery()){
      $('.tsf-wizard-1.process-step-17').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style8_circle',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });

            $('.tsf-wizard-2.process-step-17').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style8_circle',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-17').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style8_circle',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-17').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style8_circle',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
   }

   if (jQuery(".process-step-18").length && jQuery()){
      $('.tsf-wizard-1.process-step-18').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style9',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });

            $('.tsf-wizard-2.process-step-18').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style9',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-18').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style9',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-18').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style9',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
   }

   if (jQuery(".process-step-19").length && jQuery()){
      $('.tsf-wizard-1.process-step-19').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style10',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });

            $('.tsf-wizard-2.process-step-19').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style10',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-19').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style10',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-19').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style10',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
   }

   if (jQuery(".process-step-20").length && jQuery()){
      $('.tsf-wizard-1.process-step-20').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style11',
                navPosition: 'top',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });

            $('.tsf-wizard-2.process-step-20').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style11',
                navPosition: 'right',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-20').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style11',
                navPosition: 'left',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-4.process-step-20').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style11',
                navPosition: 'bottom',
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'
            });
   }

   if (jQuery(".process-step-21").length && jQuery()){
      $('.tsf-wizard-1.process-step-21').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style1',
                navPosition: 'top',
                manySteps: true,
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });

            $('.tsf-wizard-2.process-step-21').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style1',
                navPosition: 'top',
                manySteps: true,
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
            $('.tsf-wizard-3.process-step-21').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style1',
                navPosition: 'top',
                manySteps: true,
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px'   
            });
            $('.tsf-wizard-4.process-step-21').tsfWizard({
                stepEffect: 'basic',
                stepStyle: 'style1',
                navPosition: 'top',
                manySteps: true,
                stepTransition: true,
                showButtons: true,
                showStepNum: true,
                height: '300px' 
            });
   }
 }
/*
=======================================================
 Date Time Picker
=======================================================
*/
function phflatpicker() {
   if (jQuery(".flatpickr").length > 0 && jQuery()) {
      $(".flatpickr").flatpickr();
   }
}
/*
=======================================================
 Search Form AutoComplete
=======================================================
*/
var availableTags = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];

function searchFormAutoComplete() {
   if (jQuery(".search-form-autocomplete").length > 0 && jQuery()) {
      $(".search-form-autocomplete").autocomplete({
         source: availableTags
      })
   };
}

function phtinymceeditors() {
      var jsFileLocation = "";
      var path = location.pathname.split("/");
      for (i = 0; i < path.length-2; i++) {
         if (path[i].indexOf(".html") === -1) {
            jsFileLocation += path[i];

		}
      }
      if (typeof(base_url) == "undefined") {
         var base_url = location.protocol + '//' + location.host + '/';
      }
      base_url += jsFileLocation;

      if (jQuery("#html").length && jQuery()) {
         $("#html").tinymce({
            script_url: base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/tinymce.min.js',
			theme_url: base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/themes/modern/theme.min.js',
			skin_url: base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/skins/lightgray',
            document_base_url: base_url,
            plugins: ["bootstrap"],
            bootstrapConfig: {
               'bootstrapCssPath': base_url + '/plugins/texteditor/plugins/bootstrap/css/bootstrap.min.css',
               'imagesPath': '/plugins/tinymce-bootstrap-plugin/examples/img/'
            },
			external_plugins: { "bootstrap" : base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/plugins/bootstrap/plugin.min.js'},
            toolbar: "bootstrap",
            theme: "modern"
         });
      }
      /** Darkly TINYMCE */
      if (jQuery("#html-darkly").length && jQuery()) {
         $("#html-darkly").tinymce({
            script_url: base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/tinymce.min.js',
			theme_url: base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/themes/modern/theme.min.js',
			skin_url: base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/skins/lightgray',
            document_base_url: base_url,
            plugins: ["bootstrap"],
            bootstrapConfig: {
               'bootstrapCssPath': base_url + '/plugins/texteditor/plugins/bootstrap/themes/darkly/bootstrap.min.css',
               'imagesPath': '/plugins/tinymce-bootstrap-plugin/examples/img/'
            },
			external_plugins: { "bootstrap" : base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/plugins/bootstrap/plugin.min.js'},
            toolbar: "bootstrap",
            theme: "modern"
         });
      }
      /** Flatly TINYMCE */
      if (jQuery("#html-flatly").length && jQuery()) {
         $("#html-flatly").tinymce({
            script_url: base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/tinymce.min.js',
			theme_url: base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/themes/modern/theme.min.js',
			skin_url: base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/skins/lightgray',
            document_base_url: base_url,
            plugins: ["bootstrap"],
            bootstrapConfig: {
               'bootstrapCssPath': base_url + '/plugins/texteditor/plugins/bootstrap/themes/flatly/bootstrap.min.css',
               'imagesPath': '/plugins/tinymce-bootstrap-plugin/examples/img/'
            },
			external_plugins: { "bootstrap" : base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/plugins/bootstrap/plugin.min.js'},
            toolbar: "bootstrap",
            theme: "modern"
         });
      }
      /** Slate TINYMCE */
      if (jQuery("#html-slate").length && jQuery()) {
         $("#html-slate").tinymce({
            script_url: base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/tinymce.min.js',
			theme_url: base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/themes/modern/theme.min.js',
			skin_url: base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/skins/lightgray',
            document_base_url: base_url,
            plugins: ["bootstrap"],
            bootstrapConfig: {
               'bootstrapCssPath': base_url + '/plugins/texteditor/plugins/bootstrap/themes/slate/bootstrap.min.css',
               'imagesPath': '/plugins/tinymce-bootstrap-plugin/examples/img/'
            },
			external_plugins: { "bootstrap" : base_url + '/plugins/tinymce-bootstrap-plugin/examples/tinymce/plugins/bootstrap/plugin.min.js'},
            toolbar: "bootstrap",
            theme: "modern"
         });
      }
};
/*
=======================================================
 Mega Menu Same Height on Hover
=======================================================
*/
jQuery(window).load(function() {
   blogSameHeight();
});
 
  
  /**
   * jQuery function to prevent default anchor event and take the href * and the title to make a share pupup
   *
   * @param  {[object]} e           [Mouse event]
   * @param  {[integer]} intWidth   [Popup width defalut 500]
   * @param  {[integer]} intHeight  [Popup height defalut 400]
   * @param  {[boolean]} blnResize  [Is popup resizeabel default true]
   */
  function customerPopup(e, obj) {
    
    // Prevent default anchor event
    e.preventDefault();
    
    // Set values for window
    intWidth =  '500';
    intHeight = '400';
    strResize = 'yes';

    // Set title and open popup with focus on it
    var strTitle = ((typeof obj.attr('title') !== 'undefined') ? obj.attr('title') : 'Social Share'),
        strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,            
        objWindow = window.open(obj.attr('href'), strTitle, strParam).focus();
  }
  
  /* ================================================== */
  
  $(document).ready(function ($) {
    $('.popup-share').on("click", function(e) {
      obj = $(this);
      customerPopup(e, obj);
       
    });
  });
    
 
function blogSameHeight() {
   if ($('.boxes-same-height').length && jQuery()) {
      jQuery(".blog-desc").css("height", "auto");
      jQuery(".horizontal-post").css("height", "100%");
      jQuery(".boxes-same-height").each(function() {
         var height = 0;
         jQuery(this).find(".blog-desc").each(function() {
            console.log(jQuery(this).css("height"));
            if (jQuery(this).height() > height) {
               height = jQuery(this).css("height");
            }
            jQuery(".horizontal-post").css("height", height);
         });
      });
      jQuery(".blogfitrows").isotope('reloadItems');
   }
}
loadingInterval2 = setInterval(function() {
   if (pageloader) {
      phwowanimation();
      jQuery("body").toggleClass("body-preloader", false);
      clearInterval(loadingInterval2);
   }
}, 50);

function sameHeightClass() {
   if (jQuery(".same-height-box").length > 0 && jQuery(".same-height").length > 0 && jQuery()) {
      jQuery(".same-height-box").each(function() {
         var height = 0;
         jQuery(this).find(".same-height").each(function() {
            console.log(jQuery(this).css("height"));
            if (jQuery(this).height() > height) {
               height = jQuery(this).css("height");
            }
            jQuery(".same-height").css("height", height);
         });
      });
   }
}
jQuery(document).ready(function() {
   phfullheight();
   phfullheightbox();
   phhtml5videoplayer();
   phpiechart();
   phfullheightblog();
});
/*
=======================================================
 Call Functions
=======================================================
*/
$(window).load(function() {
   phpagepreloader();
    
   if (jQuery("#post-content").length > 0) {
      jQuery('#post-content p,#post-content h1,#post-content h2,#post-content h3,#post-content h4,#post-content h5,#post-content h6,#post-content span,#post-content blockquote').selectionSharer();
   }
   // Page logo
   $('.vlt-nav').find('a.brand-modern').html($('.header-content').find('.brand-modern').html());
   $('#footer').find('a.brand-modern').html($('.header-content').find('.brand-modern').html());

   phcomingsoonetimer();
   phnavigation();
   phnavigationleftright();
   phcustomselect();
   phnicescroll();
   phpagescrollanimation();
   phscrolltotop();
   phsliderpricefilter();
   phflexsliderfullscreen();
   phflexslidertestimonial();
   phflexslidersingleshop();
   phflexsliderthumbnails();
   phflexslidersinglepost();
   phcontactformcollapse();
   phlinkprevent();
   phhtml5videoplayerfix();
   phpagetitleopacity();
   phbloghovereffect();
   phblogreadhovereffect();
   phptooltip();
   phpopover();
   phprocessSteps();
   phflatpicker();
   flipingpricingtables();
   phcontactformeffect();
   phhomeblogsimpleeffect();
   phsearchcollapse();
   phsidebarsticky();
   phrevolutionslider();
   phrevolutionsliderfull();
   phrevolutionsliderfull600();
   phrevolutionslidertravel();
   phrevolutionsliderhero();
   phrevolutionsliderteam();
   phrevolutionsliderparallax();
   phrevolutionsliderfullbullets();
   phrevolutionsliderfullthumbs();
   phrevolutionslidergalleryfood();
   phrevolutionslidergalleryhightlights();
   phrevolutionslidergallerysimple();
   phrevolutionslidergallerymedia();
   phrevolutionsliderhosting();
   phrevolutionslidergym2();
   phrevolutionslidernews();
   phrevolutionslideronepage();
   phrevolutionsliderphotogallery();
   phrevolutionsliderscrolleffect();
   phrevolutionsliderclassicfull();
   phrevolutionslidertouch();
   phrevolutionsliderverticalbullet();
   phrevolutionsintroliderfull();
   phrevolutionslidernotgeneric();
   phrevolutionslidershop();
   phrevolutionsliderrestaurant1();
   phrevolutionsliderrestaurant2();
   phcounters();
   phparallax();
   phfiltertoselect();
   phtabsreloadgmap();
   phportfoliocarousel();
   phintropostcarousel();
   phshopcarousel();
   phclientscarousel();
   phflexsliderportfolio();
   phflexsliderclients();
   phshoplayoutswitch();
   phportfoliolayoutswitch();
   phshoplayoutlistfix()
   phportfoliofilter();
   phswipebox();
   phproductcounter();
   phgooglemap();
   phaddcartcounter();
   phshoptitleeffect();
   phportfoliotitleeffect();
   phdraggablepanel();
   phtexteditor();
   phloadmore();
   phcontactvalidation();
   phfullpageplugin();
   phanimatedmodule();
   phparallaxvideo();
   phshophovereffect();
   phcarttitleeffect();
   phtestimonialscarousel();
   phonepagenav();
   phscrollspy();
   phverticalcenterelement();
   phnavaccordion();
   phelementsticky();
   phwishlistshopselect();
   phswiperslider();
   phcardslider();
   phportfolioanimationslide();
   pharrowanimated();
   phlayerslider();
   phmasterslider();
   phroyalslider();
   phowlcarouselslider();
   phheadersticky();
   landingpagecarousel();
   phaudioplayer();
   slickslider();
   phtestimonialsingle();
   phaccordionSlider();
   phslickfourcolumnscarousel();
   verticaltimeline();
   phslickarrows();
   checkbox();
   rightsidenavigation();
   leftsidenavigation();
   countDownNew();
   bootstrapDataTable();
   vivusSvgAnimations();
   fullCalendar();
   mouseMovement();
   phprocessSteps();
   phflatpicker();
   pizzaChats();
   googlecharts();
   flotcharts();
   morrischarts();
   chartlicharts();
   processMultiSteps();
   galleriaPlugin();
   searchFormAutoComplete();
   socialShareClick();
   sameHeightClass();
   phportfoliofitrows();
   phgalleryfitrows();
   phportfoliomasonry();
   phblogmasonry();
   phmasonryblogmixed();
   phmasonryblog();
   phshopcategoriesmasonry();
   phportfoliomasonrymixed();
   phshopsort();
   phshopsortmasonry();
   phblogfitrows();
   stickyElements();
   phelementstickyposttile();
   phprogressbar();
   videoPlay();
   phtinymceeditors();
});
jQuery(window).resize(function() {
   phportfoliofitrows();
   phgalleryfitrows();
   phportfoliomasonry();
   phwowanimationoff();
   phblogmasonry();
   phmasonryblogmixed();
   phmasonryblog();
   phshopcategoriesmasonry();
   phportfoliomasonrymixed();
   phshopsort();
   phshopsortmasonry();
   /* Isotope Fix REsize */
   phblogmasonryResize();
   phmasonryblogmixedResize();
   phmasonryblogResize();
   phblogfitrowsResize();
   phshopsortmasonryResize();
   phshopsortResize();
   phhtml5videoplayerfix();
   phfullheightbox();
   addResponsiveNavigation();
   phfiltertoselect();
   phheadersticky();
   flipingpricingtables();
});

function customLoadMoreCallback() {
   jQuery(window).trigger('resize');
   /*** Recall Animation Functions ***/
   phcomingsoonetimer();
   phcustomselect();
   phnicescroll();
   phpagescrollanimation();
   phfullheight();
   phfullheightbox();
   phscrolltotop();
   phsliderpricefilter();
   phflexsliderfullscreen();
   phflexslidertestimonial();
   phflexslidersingleshop();
   phflexsliderthumbnails();
   phflexslidersinglepost();
   phcontactformcollapse();
   phlinkprevent();
   phpagetitleopacity();
   phbloghovereffect();
   phblogreadhovereffect();
   phparallax();
   phptooltip();
   phpopover();
   phprocessSteps();
   phcontactformeffect();
   phsearchcollapse();
   phrevolutionslider();
   phrevolutionsliderfull();
   phrevolutionsliderfull600();
   phrevolutionslidertravel();
   phhtml5videoplayerfix();
   phrevolutionsliderhero();
   phrevolutionsliderteam();
   phrevolutionsliderparallax();
   phrevolutionsliderfullbullets();
   phrevolutionsliderfullthumbs();
   phrevolutionslidergalleryfood();
   phrevolutionslidergalleryhightlights();
   phrevolutionslidergallerysimple();
   phrevolutionslidergallerymedia();
   phrevolutionsliderhosting();
   phrevolutionslidergym2();
   phrevolutionslidernews();
   phrevolutionslideronepage();
   phrevolutionsliderphotogallery();
   phrevolutionsliderscrolleffect();
   phrevolutionsliderclassicfull();
   phrevolutionslidertouch();
   phrevolutionsliderverticalbullet();
   phrevolutionsintroliderfull();
   phrevolutionslidernotgeneric();
   phrevolutionslidershop();
   phrevolutionsliderrestaurant1();
   phrevolutionsliderrestaurant2();
   phportfoliocarousel();
   phintropostcarousel();
   phshopcarousel();
   phclientscarousel();
   phflexsliderportfolio();
   phflexsliderclients();
   phshoplayoutswitch();
   phportfoliolayoutswitch();
   phshoplayoutlistfix()
   phportfoliofilter();
   phswipebox();
   phproductcounter();
   phgooglemap();
   phaddcartcounter();
   phshoptitleeffect();
   phportfoliotitleeffect();
   phdraggablepanel();
   phtexteditor();
   phfullpageplugin();
   phanimatedmodule();
   phparallaxvideo();
   phshophovereffect();
   phcarttitleeffect();
   phtestimonialscarousel();
   phonepagenav();
   phscrollspy();
   phverticalcenterelement();
   phnavaccordion();
   phwishlistshopselect();
   phswiperslider();
   phcardslider();
   phportfolioanimationslide();
   pharrowanimated();
   landingpagecarousel();
   slickslider();
   phtestimonialsingle();
   phaccordionSlider();
   phslickfourcolumnscarousel();
   phportfoliofitrows();
   phgalleryfitrows();
   phportfoliomasonry();
   phblogmasonry();
   phmasonryblogmixed();
   phmasonryblog();
   phshopcategoriesmasonry();
   phportfoliomasonrymixed();
   phshopsort();
   phshopsortmasonry();
   phblogfitrows();
   verticaltimeline();
   phslickarrows();
   blogSameHeight();
   checkbox();
   rightsidenavigation();
   leftsidenavigation();
   countDownNew();
   mouseMovement();
   rangeSliders();
   pizzaChats();
   
   processMultiSteps();
   sameHeightClass();
   socialShareClick();
};
