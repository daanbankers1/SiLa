//Socket connection opzetten
const socket = io.connect("http://localhost:8000"); 


//Creating elements throught variables
const exampleimage = document.getElementById('exampleimg')
var video = document.getElementById('video');


window.onload = init;
window.onresize = createVideoFilter;

function init(){
    setTimeout(createVideoFilter,1000);
}

function createVideoFilter(){
    console.log(video.clientWidth)
    document.getElementById('video_box').style.width = video.clientWidth + 10 + 'px';
    document.getElementById('video_box').style.height = video.clientHeight + 10 + 'px';
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

//Calling the leap controller and connecting
var controller = new Leap.Controller({enableGestures: true});
controller.connect();

//Checking if hand makes Sign from database
function checkHandHome(){
    //Making frame
    var frame = controller.frame();

    //Als er handen in beeld zijn
    if(frame.hands.length > 0)
    {
        window.location.href = '/start'  
    }
    //If theres no hands in the frame
    else{
        console.log('no hands')
    }
}

let checkHandHomeInterval="";
//Starting the sign recognition
$('#CheckButtonStart').click(Start)

//Stopping the sign recognition
$('#CheckButtonStop').click(StopRec)

//Start sign recognition function
function Start(){
    document.getElementById('video').style.border = "10px solid rgb(8, 255, 8)";
    document.getElementById('video_overlays').style.backgroundColor = 'rgba(0, 0, 0, 0.0)'
    document.getElementById('video_overlays').innerHTML = '<div style="display:flex; justify-content:flex-start; flex-direction:row; width:100%;"><div style="width:33.33%;"><img src="Signs/5.jpg" style="width:100px; height:100px;"/></div><div style="width:33.33%;"><div id="CheckButtonStop" style="width:100%;"class="CheckButton">Stop</div></div></div>';
    document.getElementById('video_overlays').style.alignItems = 'flex-start';
    checkHandHomeInterval = setInterval(checkHandHome,500);
    $('#CheckButtonStop').click(StopRec)
}

//Stop sign recognition function
function StopRec(){
    document.getElementById('video').style.border = "10px solid red";
    document.getElementById('video_overlays').style.backgroundColor = 'rgba(0, 0, 0, 0.85)'
    document.getElementById('video_overlays').innerHTML = '<div id="CheckButtonStart" class="CheckButton">Start</div>';
    document.getElementById('video_overlays').style.alignItems = 'center';
    clearInterval(checkHandHomeInterval)
    $('#CheckButtonStart').click(Start)
}