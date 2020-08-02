//add speech reconition
try {
  var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
} catch (e) {
  console.error(e);
}

recognition.continuous = true;
var noteContent = '';
var notetextarea = document.getElementById('text-area');
// speech recognition service starts
recognition.onstart = function () {
  console.log('We are listening. Try speaking into the microphone.');
};

// speech recognition service result
recognition.onresult = function (event) {
  //   var transcript = event.results[0][0].transcript;
  var confidence = event.results[0][0].confidence;
  var current = event.resultIndex;

  // transcript of what was said.
  var transcript = event.results[current][0].transcript;

  noteContent += transcript;
  console.log(noteContent);
  notetextarea.value = noteContent;
};

// start recognition

document.getElementById('start-record').addEventListener('click', function () {
  recognition.start();
});

// stop recognition

document.getElementById('stop-record').addEventListener('click', function () {
  recognition.stop();
});
