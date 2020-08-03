var questions = [
  {question:"What's your name?"},
  {question:"Aadhar Number",pattern: /\d{12}/},
  {question:"Mobile Number?", pattern: /\d{10}/},
  {question:"Village Name?"},
  {question:"District Name?"},
  {question:"State Name?"},
  {question:"Which Crop was sown here before the present harvest?"},
  {question:"Which crop are you growing in this period?"},
  {question:"Which crop are you planning to grow after the present harvest?"},
  {question:"What is the area of your land?",pattern: /\d+/},
  {question:"What is the number of grains per head of your current crop?",pattern: /\d+/},
  {question:"What is the number of heads per metre square of your current crop?",pattern: /\d+/},
];

(function(){

  var tTime = 100  // transition transform time from #register in ms
  var wTime = 200  // transition width time from #register in ms
  var eTime = 1000 // transition width time from inputLabel in ms

  var position = 0

  putQuestion()

  backButton.addEventListener('click', back)

  progressButton.addEventListener('click', validate)

  inputField.addEventListener('keyup', function(e){
    transform(0, 0) // ie hack to redraw
    if(e.keyCode == 13) validate()
  })

  // load the next question
  function putQuestion() {
    inputLabel.innerHTML = questions[position].question
    inputField.value = ''
    inputField.type = questions[position].type || 'text'  
    inputField.focus()
    showCurrent()
  }
  
  // when all the questions have been answered
  function done() {

    var grainWeight1000 = {
      "rice": 20.5,
      "wheat": 37.5,
      "maize": 252.5,
      "arhar": 96.4,
      "urad": 38,
      "moong": 29.25,
      "gram" : 390,
      "peas" : 200,
      "lentils" : 40,
      "potato" : 59,
      "onion" : 3.25,
      "eggplant" : 4.75,
      "cauliflower" : 4,
      "lychee" : 30,
      "pineapple" : 46,
      "mango" : 84,
      "banana" : 40,
      "guava" : 9.56,
      "sugarcane" : 32,
      "jute" : 2.484
    };
    
    console.log(questions)
    var name=questions[0].value;
    var aadhar=questions[1].value;
    var mobile=questions[2].value;
    var village=questions[3].value;
    var district=questions[4].value;
    var state=questions[5].value;
    var pastcrop=questions[6].value;
    var currentcrop=questions[7].value;
    var futurecrop=questions[8].value;
    var area=questions[9].value;
    var grainperhead=questions[10].value;
    var headpermeter=questions[11].value;
    var db=firebase.firestore();
    
    var yield = ((grainperhead * headpermeter) * grainWeight1000[currentcrop])/100000;




    // remove the box if there is no next question
    register.className = 'close'
    var h1 = document.createElement('h1')
    var div=document.createElement('div')

    h1.appendChild(document.createTextNode('Data For ' + questions[0].value + ' Has been Saved'))

    div.appendChild(h1)

    setTimeout(function() {
      register.parentElement.appendChild(div)     
      setTimeout(function() {h1.style.opacity = 1}, 50)

    },eTime)
    
    db.collection('users').doc(aadhar).collection('lands').add({
      aadharNumber:aadhar,
      areaOfLand:area,
      currentCropName:currentcrop,
      districtName:district,
      grainsPerHead:grainperhead,
      headsPerM2:headpermeter,
      lastCropName:pastcrop,
      mobileNumber:mobile,
      name:name,
      nextCropName:futurecrop,
      stateName:state,
      villageName:village
    }).then(function(){
      db.collection('Crops').doc(currentcrop).collection('Yield').doc(aadhar).set({
        yield:yield
      })
    })
    
  }

  // when submitting the current question
  function validate() {

    // set the value of the field into the array
    questions[position].value = inputField.value

    // check if the pattern matches
    if (!inputField.value.match(questions[position].pattern || /.+/)) wrong()
    else ok(function() {
      // set the progress of the background
      progress.style.width = ++position * 100 / questions.length + 'vw'
      // if there is a new question, hide current and load next
      if (questions[position]) hideCurrent(putQuestion)
      else hideCurrent(done)
             
    })

  }
  function back() {

    // set the value of the field into the array

    // check if the pattern matches
      // set the progress of the background
      if(position>0){
      progress.style.width = --position * 100 / questions.length + 'vw'
      // if there is a new question, hide current and load next
      if (questions[position]) hideCurrent(putQuestion)
      else hideCurrent(done)
      }
    
  }

  // helper
  // --------------

  function hideCurrent(callback) {
    inputContainer.style.opacity = 0
    inputProgress.style.transition = 'none'
    inputProgress.style.width = 0
    setTimeout(callback, wTime)
  }

  function showCurrent(callback) {
    inputContainer.style.opacity = 1
    inputProgress.style.transition = ''
    inputProgress.style.width = '100%'
    setTimeout(callback, wTime)
  }

  function transform(x, y) {
    register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
  }

  function ok(callback) {
    register.className = ''
    setTimeout(transform, tTime * 0, 0, 10)
    setTimeout(transform, tTime * 1, 0, 0)
    setTimeout(callback,  tTime * 2)
  }

  function wrong(callback) {
    register.className = 'wrong'
    for(var i = 0; i < 6; i++) // shaking motion
      setTimeout(transform, tTime * i, (i%2*2-1)*20, 0)
    setTimeout(transform, tTime * 6, 0, 0)
    setTimeout(callback,  tTime * 7)
  }

}())