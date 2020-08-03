//Function to check for authentication state change
/*
firebase.auth().onAuthStateChanged(function(user) {
	window.user = user;
	if(user){
        console.log(user)
	}
});
*/
//Function to send password reset email
// Your web app's Firebase configuration
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
document.cookie='auth ='+"false"
document.cookie='user ='+null


function reset(){
	var auth = firebase.auth();
	var emailAddress = document.getElementById("exampleInputEmail1").value
	auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
    console.log('sent')
	//document.getElementById("sign").style.display = 'none';
    document.getElementById("sign").innerHTML= 'if the email provided is correct an email with password reset link will be sent to you.';})
    .catch(function(error) {

    });
}

//Function For logging in user
function login(){
	var userEmail=document.getElementById("exampleInputEmail1").value
    var userPass=document.getElementById("exampleInputPassword1").value
    console.log(userEmail)
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then(function(user){    
        document.cookie='auth ='+"true"
        document.cookie='user ='+userEmail
        window.location.href=('/index')
    })
    .catch(function(error) {
        document.cookie='auth ='+"false"
        document.cookie='user ='+null
		var errorCode = error.code;
		var errorMessage = error.message;
		window.alert(errorMessage)
})
}

//Function For Signing Up



function signOut(){
	firebase.auth().signOut().then(function() {
        // Sign-out successful.
        document.cookie='auth ='+"false"
        document.cookie='user ='+null
		window.location.href="/"
	}).catch(function(error) {
		// An error happened.
	});
}

function validate(){
    var n = document.getElementById('exampleInputName1').value;
    var an = document.getElementById('exampleInputaadhar1').value;
    var pw = document.getElementById('exampleInputPassword1').value;
    var cpw = document.getElementById('exampleInputPassword2').value;
    var st = document.getElementById('exampleInputaadhar1').value;
    var di = document.getElementById('exampleInputaadhar1').value;
    var vi = document.getElementById('exampleInputaadhar1').value;
    var aadharno = /^\d{12}$/;
    
    if (n=="") {
        alert("Enter valid Name");
        return false
    }
    if ((!aadharno.test(an))) {
        console.log()
        alert("Enter valid Aadhar");
        return false
    }
    if(st==""){
        alert("Enter State");
        return false
    }
    if(di==""){
        alert("Enter District");
        return false
    }
    if(vi==""){
        alert("Enter Village");
        return false
    }
    if(pw.length<6 || cpw.length<6){
        alert("Password must be more than 6 characters")
        return false
    }if(pw!=cpw){
        alert("Password must match")
        return false
    }
    return true;

}

function signup(){
    console.log(validate())
    if(validate()){
        var m = document.getElementById('exampleInputEmail1').value;
        var pw = document.getElementById('exampleInputPassword1').value;
        var n = document.getElementById('exampleInputName1').value;
        var an = document.getElementById('exampleInputaadhar1').value;
        var st = document.getElementById('exampleInputstate1').value;
        var di = document.getElementById('exampleInputdistrict1').value;
        var vi = document.getElementById('exampleInputvillage1').value;
        var pn = document.getElementById('exampleInputphone1').value;
        firebase.auth().createUserWithEmailAndPassword(m, pw)
        .then(function(){
            console.log(m)
        const button = document.getElementById('form_submit');
        function toggleClass() {
            this.classList.toggle('active');
            }
            button.addEventListener('click', toggleClass);
            var db = firebase.firestore();
            db.collection("adhikari").doc(m).set({
                name: n,
                email:m,
                phone:pn,
                state: st,
                district: di,
                village: vi,
                aadhar:an,
            })
            .then(function() {
                document.cookie='user ='+m
                document.cookie='auth ='+"true"
                window.location.href=("/index")
                
            })
        })
        .catch(function(error) {
            document.cookie='auth ='+"false"
            document.cookie='user ='+null

            
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            window.alert(errorMessage)

            // ...
          });          
    }
}