var flat;
var flong;
var fname;
var fmessage;
var rootRef = firebase.database().ref().child("Users1");
rootRef.on("child_added", snap =>{
  var name = snap.child("Name").val();
  var message = snap.child("Message").val();
  var longii = snap.child("long").val();
  var latii = snap.child("lat").val();
  flat = latii;
  flong = longii;
  fname = name;
  fmessage = message;
})

var flat2;
var flong2;
var fname2;
var fmessage2;
var rootRef2 = firebase.database().ref().child("Users2");
rootRef2.on("child_added", snap =>{
  var name2 = snap.child("Name").val();
  var message2 = snap.child("Message").val();
  var longii2 = snap.child("long").val();
  var latii2 = snap.child("lat").val();
  flat2 = latii2;
  flong2 = longii2;
  fname2 = name2;
  fmessage2 = message2;
})

var flat3;
var flong3;
var fname3;
var fmessage3;
var rootRef3 = firebase.database().ref().child("Users3");
rootRef3.on("child_added", snap =>{
  var name3 = snap.child("Name").val();
  var message3 = snap.child("Message").val();
  var longii3 = snap.child("long").val();
  var latii3 = snap.child("lat").val();
  flat3 = latii3;
  flong3 = longii3;
  fname3 = name3;
  fmessage3 = message3;
})
function messageClick1(){
  var rootRef = firebase.database().ref().child("Users1");
  var nameText = nameField1.value;
  rootRef.child("user").child("Name").set(nameText);
  var messageTxt = messageField1.value;
  rootRef.child("user").child("Message").set(messageTxt);
  navigator.geolocation.getCurrentPosition(function(pos){
    rootRef.child("user").child("long").set(pos.coords.longitude);
    rootRef.child("user").child("lat").set(pos.coords.latitude);
  });
}
function messageClick2(){
  var rootRef2 = firebase.database().ref().child("Users2");
  var nameText = nameField2.value;
  rootRef2.child("user").child("Name").set(nameText);
  var messageTxt = messageField2.value;
  rootRef2.child("user").child("Message").set(messageTxt);
  navigator.geolocation.getCurrentPosition(function(pos){
    rootRef2.child("user").child("long").set(pos.coords.longitude);
    rootRef2.child("user").child("lat").set(pos.coords.latitude);
  });
}
function messageClick3(){
  var rootRef3 = firebase.database().ref().child("Users3");
  var nameText = nameField3.value;
  rootRef3.child("user").child("Name").set(nameText);
  var messageTxt = messageField3.value;
  rootRef3.child("user").child("Message").set(messageTxt);
  navigator.geolocation.getCurrentPosition(function(pos){
    rootRef3.child("user").child("long").set(pos.coords.longitude);
    rootRef3.child("user").child("lat").set(pos.coords.latitude);
  });
}
