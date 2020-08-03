

var firebaseConfig = {
    apiKey: "AIzaSyBXHUb9nQ6M3mehIK7LyhqYLlgQfUjXLcM",
    authDomain: "upajvirasat-cd526.firebaseapp.com",
    databaseURL: "https://upajvirasat-cd526.firebaseio.com",
    projectId: "upajvirasat-cd526",
    storageBucket: "upajvirasat-cd526.appspot.com",
    messagingSenderId: "429416878044",
    appId: "1:429416878044:web:5ea7c316dea2a8b90a0919",
    measurementId: "G-8BEJRGQQDK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
	window.user = user;
	if(user){
	}
});
    

async function compdata(){
  var db=firebase.firestore();
  const s=document.getElementById('sel').innerHTML
  console.log(s)
  window.alert("Emergency Recorded")
  var m=window.user.email
  var details=await db.collection('adhikari').doc(m).get()
  var n=details.data()['name']
  var pn=details.data()['phone']
  var st=details.data()['state']
  var di=details.data()['district']
  var vi=details.data()['village']
  var an=details.data()['aadhar']
  db.collection("Emergency-Compensation").doc(an).set({
    name: n,
    phone:pn,
    state: st,
    district: di,
    village: vi,
    aadhar:an,
    reason:s
})
.then(function() {
    document.cookie='user ='+m
    document.cookie='auth ='+"true"
    window.location.href=("/index")
    
})}





function adddata(){
  document.getElementById("ad").classList.add("active");
  document.getElementById("up").classList.remove("active");
  document.getElementById("com").classList.remove("active");
  document.getElementById("adddata").style.display="block";
  document.getElementById("comp").style.display="none";
  document.getElementById("update").style.display="none";


}

function update(){
  document.getElementById("ad").classList.remove("active");
  document.getElementById("up").classList.add("active");
  document.getElementById("com").classList.remove("active");
  document.getElementById("adddata").style.display="none";
  document.getElementById("comp").style.display="none";
  document.getElementById("update").style.display="block";



}
function compensation(){
  document.getElementById("ad").classList.remove("active");
  document.getElementById("up").classList.remove("active");
  document.getElementById("com").classList.add("active");
  document.getElementById("adddata").style.display="none";
  document.getElementById("update").style.display="none";
  document.getElementById("comp").style.display="block";


}