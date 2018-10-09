/*
=======================================================
Author:PixelsHarmony (http://www.pixelsharmony.com/)
Date:02 July, 2016
Version:1.0
Description:Volatile - Social Widgets Config
=======================================================
 JavaScript Content
=======================================================
=======================================================
 Flickr Feed
=======================================================
*/
function phflickrfeed() {
   if ($('#flickrfeed').length && jQuery()) {
      jQuery("#flickrfeed").html("");
      $('#flickrfeed').jflickrfeed({
         limit: 9,
         qstrings: {
            id: '45388974@N00'
         },
         itemTemplate: '<li>' + '<a href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}"/></a>' + '</li>'
      });
   };
};
/*
=======================================================
 Dribbble Feed
=======================================================
*/
function phdribbblefeed() {
   if ($('.shots').length && jQuery()) {
      $.jribbble.setToken('976f17c9cd8240402efc535b3d4995380276e8f2c5700eaf62caafc1ec616190');
      $.jribbble.users('pixelsharmony').shots({
         per_page: 9
      }).then(function(shots) {
         var html = [];
         shots.forEach(function(shot) {
            html.push('<li>');
            html.push('<a href="' + shot.html_url + '" target="_blank">');
            html.push('<img src="' + shot.images.normal + '">');
            html.push('</a></li>');
         });
         $('.shots').html(html.join(''));
      });
   };
};
/*
=======================================================
 Twitter Feed
=======================================================
*/
function phtwitterfeed() {
   if ($('.tweet').length && jQuery()) {
      $('.tweet').twittie({
         username: 'pixelsharmony',
         dateFormat: '%b. %d, %Y',
         template: '{{tweet}} <div class="date">{{date}}</div>',
         count: 2,
         apiPath: 'plugins/tweetie/api/tweet.php',
         loadingText: 'Loading!'
      });
   };
};
/*
=======================================================
 Call Functions
=======================================================
*/
$(document).ready(function() {
   phtwitterfeed();
   phflickrfeed();
   phdribbblefeed();
});