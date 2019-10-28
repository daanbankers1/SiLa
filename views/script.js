//Socket connection opzetten
const socket = io.connect("http://localhost:8000"); 

//Creating elements throught variables
const exampleimage = document.getElementById('exampleimg')
var video = document.getElementById('video');

//init function changing video height
window.onload = init;
function init(){
video.style.height = exampleimage.clientHeight + 'px'
}

// Get access to the camera! And creating live video
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });
}

//Creating leap controller
var controller = new Leap.Controller({enableGestures: true});
controller.loop(function(frame) {
//If theres a hand start next page
if(frame.hands.length > 0)   
    {
        window.location.href = '/start'  
    }
    //If theres no hands
    else{
        console.log('no hands')
    }
});

