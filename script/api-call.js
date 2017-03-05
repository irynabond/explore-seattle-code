function callApi(text, defArr) {
  callEventful (text, defArr);
  callEventbrite(text, defArr);
  callMeetup(text, defArr);

  function callEventful(text, defArr) {
    var deferred = $.Deferred();
    defArr.push(deferred);
    $.ajax({
      url: "http://api.eventful.com/json/events/search?l=Seattle&date=today&keywords="+ text + "&app_key=C5VJScp667pVNMHB",
      type: "get",
      dataType: "jsonp",
      success: function(result) {
         var eventData = result.events;
         if (eventData===null) {
           deferred.resolve();
         }
         eventData = result.events.event;
         for(var i = 0; i < eventData.length; i++){
            res = res.concat(eventData);
            var obj = {};
             var dateTime = moment(eventData[i].start_time);
             obj['fullDate'] = dateTime.format('YYYY-MM-DD');
             obj['time'] = dateTime.format('hh:mm a');
             obj['name'] = eventData[i].title;
             obj['description']= eventData[i].description;
             if (eventData[i].venue_address!==null) {
              obj['address']= eventData[i].venue_address;
             } else {
               obj['address']= "Please, check a link below";
             }
             obj['url']= eventData[i]["url"];
             obj['city']= eventData[i].city_name;
             obj['state']= eventData[i].region_abbr;
             obj['zip']= eventData[i].postal_code;
             obj['company_name']= "Eventful";
             showEventfulData(obj);
          }
          deferred.resolve();
        },
        error: function(){
          deferred.resolve();
        }
    });
  }

  function callMeetup(text, defArr) {
    var deferred = $.Deferred();
    defArr.push(deferred);
    $.ajax({
      url:"https://api.meetup.com/2/open_events?&sign=true&photo-host=public&zip=98109&country=usa&topic=" + text + "&city=seattle&state=wa&key=595675274d4211175b522771323d075",
      type: "get",
      dataType: "jsonp",
      success: function(result) {
         var eventData = result;
         if (eventData.code ="badtopic") {
            deferred.resolve();
         }
         eventData = result.results;
         for(var i = 0; i < eventData.length; i++){
            res = res.concat(eventData);
            var obj = {};
             var dateTime = moment(eventData[i].time);
             obj['fullDate'] = dateTime.format('YYYY-MM-DD');
             obj['time'] = dateTime.format('hh:mm a');
             obj['name'] = eventData[i].name;
             obj['description']= eventData[i].description;
             if (eventData[i].venue !== undefined) {
              obj['address']= eventData[i].venue.address_1;
              obj['city']= eventData[i].venue.city;
              obj['state']= eventData[i].state;
              obj['zip']= eventData[i].zip;
             } else {
               obj['address']= "Seattle";
                obj['city']= "Please, check a link below";
                obj['state']= "";
                obj['zip']= "";
             }
             obj['url']= eventData[i]['event_url'];
             obj['company_name']= "Meetup";
             showEventfulData(obj);
          }
          deferred.resolve();
        },
        error: function(){
          deferred.resolve();
        }
    });
  }

  function callEventbrite(text, defArr) {
    var deferred = $.Deferred();
    defArr.push(deferred);
     $.ajax({
      url: "https://www.eventbriteapi.com/v3/events/search/?location.address=Seattle&start_date.keyword=today&q="+text+"&token=MO5AQ24HAYLNBP7L5WLE",
      type: "get",
      success: function(result) {
         var eventData = result.events;
         for(var i = 0; i < eventData.length; i++){
            res = res.concat(eventData);
            var obj = {};
             var dateTime = moment(eventData[i].start.local);
             obj['fullDate'] = dateTime.format('YYYY-MM-DD');
             obj['time'] = dateTime.format('hh:mm a');
             obj['name'] = eventData[i].name.text;
             obj['description']= eventData[i].description.text;
             obj['address']= "Seattle";
             obj['url']= eventData[i].url;
             obj['city']= "Please, check a link below";
             obj['state']= "WA";
             obj['company_name']= "Eventbrite";
             showEventfulData(obj);
          }
          deferred.resolve();
        },
        error: function(){
          deferred.resolve();
        }
    });
  }
}

function showEventfulData(obj) {
  var url = '"'+obj.url+'"';
  var company = obj.company_name;
  var name = obj.name;
    $('ul').append('<li>' +
      '<div class = "content">' +
          '<p class = "title">' + obj.name + '</p>' +
          '<p class = "details">Date and time: </p>' +
          '<p class = "data-details">' +  obj.fullDate + ", " + obj.time + '</p>' +
          '<p class = "details"> Address: </p>' +
          '<p class = "data-details">' + obj.address + ", " + obj.city + '</p>' +
        '</div>' +
        '<div>' +
          '<p class ="link"> Open on <a href=' + url+ '>' + company + '</a></p>' +
        '</div>' +
    '</li>');
    $('.content').data(obj.name, {event: obj.description });

}
