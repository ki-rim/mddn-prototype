var mapMarkers = {}

function getMarker(keyName) {
  return mapMarkers[keyName]
}

function retrieveMarker(databaseRef, keyName) {
  var ref = databaseRef.child(keyName)

  ref.on("child_added", snap => {
    var name = snap.child("name").val();
    var message = snap.child("message").val();
    var long = snap.child("long").val();
    var lat = snap.child("lat").val();
    // mapMarkers[keyName] = {
    mapMarkers[snap.key] = {
      lat,
      long,
      message,
      name
    }
  })

  ref.on("child_changed", snap => {
    var name = snap.child("name").val();
    var message = snap.child("message").val();
    var long = snap.child("long").val();
    var lat = snap.child("lat").val();
    // mapMarkers[keyName] = {
    mapMarkers[snap.key] = {
      lat,
      long,
      message,
      name
    }
  })
}

retrieveMarker(firebase.database().ref(), "Users")

function createMarker(databaseRef, keyName, nameRef, messageRef) {
  var ref = databaseRef.child(keyName).push()
  navigator.geolocation.getCurrentPosition(function(pos){
    ref.set({
      name: nameRef.value,
      message: messageRef.value,
      long: pos.coords.longitude,
      lat: pos.coords.latitude
    })
    alert("Submission successful, check your position on Google Maps to see updates")
  },showError);
}

function updateMarker(databaseRef, keyName, nameRef, messageRef) {
  var ref = databaseRef.child(keyName)
  var nameText = nameRef.value;
  ref.child("user").child("Name").set(nameText);
  var messageTxt = messageRef.value;
  ref.child("user").child("Message").set(messageTxt);
  navigator.geolocation.getCurrentPosition(function(pos){
    ref.child("user").child("long").set(pos.coords.longitude);
    ref.child("user").child("lat").set(pos.coords.latitude);
  }, showError);
}

function messageClick1(){
  createMarker(firebase.database().ref(), "Users", nameField1, messageField1)
}

function showPosition() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showMap, showError);
  } else{
    alert("Sorry, your browser does not support HTML5 geolocation.");
  }
}

function putMarkerOnMap(markerInfo, map) {
  var latilongi = new google.maps.LatLng(markerInfo.lat, markerInfo.long);
  var marker = new google.maps.Marker({position:latilongi,map:map, title: markerInfo.name});
  var infowindow = new google.maps.InfoWindow({
    content: markerInfo.name + ": "+ markerInfo.message
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

function putMarkersOnMap(markerInfo, map) {
  var latilongi = new google.maps.LatLng(markerInfo.lat, markerInfo.long);
  var marker = new google.maps.Marker({position:latilongi,map:map, title: markerInfo.name});
  var infowindow = new google.maps.InfoWindow({
    content: markerInfo.name + ": "+ markerInfo.message
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

// Define callback function for successful attempt
function showMap(position){
  // Get location data
  lat = position.coords.latitude;
  long = position.coords.longitude;
  var latlong = new google.maps.LatLng(lat, long);

  var options = {
    center: latlong,
    zoom: 16,
    mapTypeControl: true,
    navigationControlOptions: {style:google.maps.NavigationControlStyle.SMALL}
  }

  var map = new google.maps.Map(document.getElementById("embedMap"), options);

  for(var markerInfo in mapMarkers) {
    putMarkerOnMap(getMarker(markerInfo), map)
  }
}

// Define callback function for failed attempt
function showError(error){
  if(error.code == 1){
    alert("You've decided not to share your position, but it's OK. We won't ask you again.")
  } else if(error.code == 2){
    alert("The network is down or the positioning service can't be reached.")
  } else if(error.code == 3){
    alert("The attempt timed out before it could get the location data.")
  } else{
    alert("Geolocation failed due to unknown error.")
  }
}
