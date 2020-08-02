//add speech reconition

var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

var recognizing;
recognition.continuous = true;
recognition.interimResults = true;
reset();
recognition.onend = reset;

var noteContent = '';
var notetextarea = document.getElementById('text-area');

// speech recognition service result
recognition.onresult = function (event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    var final = '';
    var interim = '';
    // if (event.results[i].isFinal) {
    //   notetextarea.value += event.results[i][0].transcript;
    // }
    if (event.results[i].isFinal) {
      notetextarea.value += event.results[i][0].transcript;
    } else {
      interim += event.results[i][0].transcript;
    }
    console.log(final);

    interim_span.innerHTML = interim;
  }
};
function reset() {
  recognizing = false;
  document.getElementById('start-record').innerHTML = 'Click to Speak';
}

// start/stop recognition
function toggleStartStop() {
  if (recognizing) {
    recognition.stop();
    reset();
  } else {
    recognition.start();
    recognizing = true;
    document.getElementById('start-record').innerHTML = 'Click to Stop';
  }
}
