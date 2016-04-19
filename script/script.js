 var fixed = false;
  var res;
  
  $(document).scroll(function() {
  var top = $('#background').outerHeight();
    if( $(this).scrollTop() > top) {
        if( !fixed ) {
            fixed = true;
            $('#arrow').show();
        }
    } else {
      if( fixed ) {
          $('#searching').val("");
          $("#searching").focus();
          fixed = false;
          $('#arrow').css({display:'none'});
      }
    }
})

$(document).on("click", ".content", function(e) {
  e.preventDefault();

  var target = $(e.target).closest('.content');
  var title = target.find('.title');

  var descr = target.data(title.text()).event;
  if (descr===null||descr===undefined) {
    descr = "Sorry, there is no description for this event provided. To learn more, follow the event link and contact to organizer. Thank you.";
  }

  bootbox.dialog({
        title: '<p class = "popup-title"><strong>' + title.text() + '</strong></p>',
        message: '<p class = "popup-desc">' +descr + '</p>',
        buttons: {
          success: {
              label: "Close",
              className: "btn-success",
              callback: function () {
                 console.log("ok")
              }
          }
        }
    });
});


 function clickButton (){

  if ($('#searching').val()==="") {
    ifInputEmptyPopup();
  } else {
    sendRequestAPI();
  }
}

function ifInputEmptyPopup () {

  bootbox.dialog({
        title: '<p class = "popup-title"><strong>Hello friend!</strong></p>',
        message: '<p class = "popup-desc">Use an input field to tell which type of event you\'d like to attend. For example: "dancing", "hiking", "music", "art", "learning" etc. Hope you\'ll enjoy the experience.</p>',
        buttons: {
          success: {
            label: "OK",
            className: "btn-success",
            callback: function () {
               console.log("ok")
            }
          }
        }
    });
}

function sendRequestAPI() {
  res = [];
  var defArr = [];
  $("#loading").show();
    var text = $('#searching').val();
    $("#header").empty();
    $('ul').empty();
    $('#footer').empty();
    callApi(text, defArr);
    $.when.apply(this, defArr).done(function() {
    if (res.length===0) {
       noEventsFoundPopup();
    } else {
      if (res.length!==0) {
        eventsFound();
      }
    }
  });
}

function noEventsFoundPopup () {

  $("#loading").hide();
  $('#searching').val("");
  $("#searching").focus();
  bootbox.dialog({
    title: '<p class = "popup-title"><strong>No events found!</strong></p>',
    message: '<p class = "popup-desc">Sorry, there are no events which meet your request. Try another keywords. For example: "dancing", "hiking", "music", "art", "learning" etc. Thank you.</p>',
    buttons: {
    success: {
    label: "OK",
    className: "btn-success",
    callback: function () {
       console.log("ok")
      }
    }
    }
  });
}

function eventsFound () {
  setTimeout(function(){
      $('#header').append('<span class = "event-header">Here you go! Check out these events in Seattle. </span>');
      $("#loading").hide();
      $('#footer').append('<span>© 2016, MIT LICENSE. All rights reserved.</span>').addClass("footer-container");
      $('html, body').animate({
         scrollTop: $(".events-content").offset().top
        }, 1000);
    }, 500);
}

function searchKeyPress(e) {
  // look for window.event in case event isn't passed in
  e = e || window.event;
  if (e.keyCode == 13) {
    document.getElementById('show-events-btn').click();
    return false;
  }
  return true;
}

 function scroll () {
   $('html, body').animate({
       scrollTop: $("#background").offset().top
    }, 1000);
 }