// @AUTHOR: evanthebouncy@github

var drawColor = "Green";

var allMarkers = [];
var allCircles = [];
var loc_marker = null;


// ============== CREATING BUTTONS ============

// function to create toggle green btn
function CenterControlBtnGreen(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '10px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Color Green';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    drawColor = "Green";
  });
}

// function to create toggle red btn
function CenterControlBtnRed(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '10px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Color Red';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    drawColor = "Red";


  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("HEY");
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      placeMarker(pos);
    }, function() {
      // handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    // DO NOTHING LMFAO
  }


  });
}

// function to create Undo button
function CenterControlBtnUndo(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '10px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Undo';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    if (allMarkers.length > 0) {
      var lastMarker = allMarkers.pop();
      var lastCircle = allCircles.pop();
      lastMarker.setMap(null);
      lastCircle.setMap(null);
    } else {
      // Do nothing
    }
  });
}

// function to create Locate button
function CenterControlBtnLocate(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '10px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Where am I?';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("HEY");
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        if (loc_marker != null) {
          loc_marker.setMap(null);
        }
        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            clickable: false
        });
        loc_marker = marker;
      }, function() {
        // handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      // DO NOTHING LMFAO
    }

  });
}


function initMap() {
  // Create the map.
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: 37.090, lng: -95.712},
    mapTypeId: 'terrain'
  });

  // Add buttons
  // Create the DIV to hold the control and call the CenterControl()
  // constructor passing in this DIV.
  var centerControlDiv = document.createElement('div');
  var centerControlGreen = new CenterControlBtnGreen(centerControlDiv, map);
  var centerControlRed = new CenterControlBtnRed(centerControlDiv, map);
  var centerControlUndo = new CenterControlBtnUndo(centerControlDiv, map);
  var centerControlLocate = new CenterControlBtnLocate(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("HEY");
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      // handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    // DO NOTHING LMFAO
  }

  // does this work
  google.maps.event.addListener(map, 'click', function(event) {
     placeMarker(event.latLng);
  });

  function placeMarker(location) {
      var imageGrn = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      var imageRed = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      var image = null;
      var fillColor = null;
      if (drawColor == "Green") {
        image = imageGrn;
        fillColor = "#00FF00";
      } else {
        image = imageRed;
        fillColor = "#FF0000";
      } 

      var marker = new google.maps.Marker({
          position: location, 
          map: map,
          icon: image
      });

      allMarkers.push(marker);

      var circle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.0,
        strokeWeight: 0,
        fillColor: fillColor,
        fillOpacity: 0.2,
        map: map,
        center: location,
        radius: 200,
        clickable: false
      });

      allCircles.push(circle);

  }


}

