(function($) {
  /*
    jquery.twitter.js v1.0
    Last updated: 26 October 2008

    Created by Damien du Toit
    http://coda.co.za/blog/2008/10/26/jquery-plugin-for-twitter

    Updated by Kiran Jonnalagadda for Eventframe/The Fifth Elephant

    Licensed under a Creative Commons Attribution-Non-Commercial 3.0 Unported License
    http://creativecommons.org/licenses/by-nc/3.0/
  */

  $.fn.getTwitter = function(options) {
    var o = $.extend({}, $.fn.getTwitter.defaults, options);

    // hide container element
    $(this).hide();

    // add heading to container element
    if (o.showHeading) {
      $(this).append('<h2>'+o.headingText+'</h2>');
    }

    // add twitter list to container element
    $(this).append('<ul class="twitter_update_list"><li></li></ul>');

    var twitterlist = $(this).find("ul.twitter_update_list");
    // hide twitter list
    twitterlist.hide();

    // add preLoader to container element
    var pl = $('<p id="'+o.preloaderId+'">'+o.loaderText+'</p>');
    $(this).append(pl);

    // add Twitter profile link to container element
    if (o.showProfileLink) {
      $(this).append('<a id="profileLink" href="http://twitter.com/'+o.userName+'">http://twitter.com/'+o.userName+'</a>');
    }

    // show container element
    $(this).show();

    // $.getScript("http://twitter.com/javascripts/blogger.js");
    // $.getScript("http://twitter.com/statuses/user_timeline/"+o.userName+".json?callback=twitterCallback2&count="+o.numTweets, function() {
    $.getJSON("http://api.twitter.com/1/statuses/user_timeline/"+o.userName+".json?&include_entities=1&include_rts=1&callback=?", {count: o.numTweets}, function(tweets) {

      var statusHTML = [];
      var make_url = function(url) {
        return '<a href="'+url+'">'+url+'</a>';
      };
      var make_reply = function(reply) {
        return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
      };

      twitterlist.empty();
      for (var i=0; i<tweets.length; i++) {
        var tweetMessage = formatTweet(tweets[i]);
        twitterlist.append(tweetMessage);
      }

      // remove preLoader from container element
      $(pl).remove();

      // show twitter list
      if (o.slideIn) {
        twitterlist.slideDown(1000);
      }
      else {
        twitterlist.show();
      }

      // give first list item a special class
      twitterlist.find("li:first").addClass("firstTweet");

      // give last list item a special class
      twitterlist.find("li:last").addClass("lastTweet");
    });
  };

  // plugin defaults
  $.fn.getTwitter.defaults = {
    userName: null,
    numTweets: 5,
    preloaderId: "preloader",
    loaderText: "Loading tweets...",
    slideIn: false,
    showHeading: true,
    headingText: "Latest Tweets",
    showProfileLink: true
  };



  var relative_time = function(time_value) {
    var values = time_value.split(" ");
    time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
    var parsed_date = Date.parse(time_value);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
    var delta = parseInt((relative_to.getTime() - parsed_date) / 1000, 10);
    delta = delta + (relative_to.getTimezoneOffset() * 60);

    if (delta < 60) {
      return 'less than a minute ago';
    } else if(delta < 120) {
      return 'about a minute ago';
    } else if(delta < (60*60)) {
      return (parseInt(delta / 60, 10)).toString() + ' minutes ago';
    } else if(delta < (120*60)) {
      return 'about an hour ago';
    } else if(delta < (24*60*60)) {
      return 'about ' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
    } else if(delta < (48*60*60)) {
      return '1 day ago';
    } else {
      return (parseInt(delta / 86400, 10)).toString() + ' days ago';
    }
  };

  function formatTweet(tweet){
    var username = tweet.user.screen_name;
    var text = tweet.text;
    var status;
    var messageContainer = $("<li>");
    if(tweet.retweeted_status !== undefined){
      var rtLength = 6 + username.length;
      username = tweet.retweeted_status.user.screen_name;
      var ot = tweet.retweeted_status.text;
      if(ot.length + rtLength > 140){
        fetchTweet(messageContainer, tweet.retweeted_status.id_str);
      }
      status = formatRtText(text, tweet.entities);
    } else {
      status = formatText(text, tweet.entities);
    }
    var message = formatMessage(username, tweet.id_str, status, tweet.created_at);
    return messageContainer.html(message);
  }

  function fetchTweet(messageContainer, id_str) {
    var rtUrl = "http://api.twitter.com/1/statuses/show/" +
      id_str + ".json?include_entities=1&callback=?";
    $.getJSON(rtUrl, function(tweet) {
      var status = formatText(tweet.text, tweet.entities);
      var message = formatMessage(tweet.user.screen_name, tweet.id_str,
        status, tweet.created_at);
      messageContainer.html(message);
    });
  }

  function formatMessage(username, statusId, status, createdAt) {
    return '<span class="twitter_id">' + username + '</span>: ' + status +
      ' <small>(<a href="http://twitter.com/' +
      username + '/statuses/' + statusId + '">' +
      relative_time(createdAt) + '</a>)</small>';
  }


  //Entity processing code

  var handleEntity = {
    hashtags: function(hashTag) {
      return '#<a href="https://twitter.com/#!/search/%23' +
        hashTag.text + '">' + hashTag.text + '</a>';
    },
    urls: function (url) {
      return '<a href="' + url.expanded_url + '">' + url.display_url + '</a>';
    },
    user_mentions: function (user) {
      return '@<a href="https://twitter.com/' +
        user.screen_name + '">' + user.screen_name + '</a>';
    }
  };

  function formatRtText(tweet, entitities) {
    var status = embedEntityLinks(tweet, entitities);
    status.splice(0, 2);
    status[0] = status[0].substring(2);
    return status.join("");
  }

  function formatText(tweet, entitities) {
    return embedEntityLinks(tweet, entitities).join("");
  }

  function embedEntityLinks(tweet, entities){
    var pel = [];
    $.each(entities, function (k, vs) {
      for(var i = 0, n = vs.length; i < n; i++ ){
        v = vs[i];
        pel.push({ entity: handleEntity[k](v), indices: v.indices });
      }
    });

    pel.sort(function(a, b){ return a.indices[0] - b.indices[0]; });

    var parts = [];
    var j = 0;
    for(var i = 0, n = pel.length; i < n; i++){
      var pe = pel[i],
          start = pe.indices[0],
          end = pe.indices[1];
      parts.push(tweet.slice(j, start));
      parts.push(pe.entity);
      j = end;
    }
    parts.push(tweet.slice(j, tweet.length));
    return parts;
  }
})(jQuery);
