
const socket = io.connect("http://localhost:8000"); 
window.onload = init;
const exampleimage = document.getElementById('exampleimg')
// Grab elements, create settings, etc.
var video = document.getElementById('video');
function init(){
    
video.style.height = exampleimage.clientHeight + 'px'
}



// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });
}

var controller = new Leap.Controller({enableGestures: true});
controller.loop(function(frame) {

if(frame.hands.length > 0)
    
    {

        console.log('welcome')
        window.location.href = '/start'
        
    }
    else{
        console.log('no hands')
    }
});

