//Creating a variable for the video element
var video = document.getElementById('video1');

//Creating socket connection
const socket = io.connect("http://localhost:8000"); 

$(window).resize(createVideoFilter1);

function createVideoFilter1(){
    console.log(video.clientWidth);
    document.getElementById('video_box1').style.width = '410px';
    document.getElementById('video_box1').style.height = video.clientHeight + 10 + 'px';
}



//What happens when we get the signarray
socket.once('SignArray', function(data){
    console.log(data);
    //Filling the selection element
    for (let d = 0; d  < data.length; d++) {
        const element = data[d];
        console.log(element)
        document.getElementById('selection').innerHTML += '<option value='+element+ ' data-thumbnail="Signs/'+element+'.jpg">' + element + '</option>';
    }
})

//Array for the extended fingers
let fingerextendarray = [];
//Variable for handtype
let handtype = "";
// i=0;

//Calling the leap controller and connecting
var controller = new Leap.Controller({enableGestures: true});
controller.connect();

//Checking if hand makes Sign from database
function checkHand(){
        //Making frame
        var frame = controller.frame();

        //Als er handen in beeld zijn
        if(frame.hands.length > 0)
        {
        //Feedback geven over of er handen in beeld zijn en hoeveel
            $('#SystemFeedback').text('Gedetecteerde handen:'+ frame.hands.length) 
        
      
        //Fingerextendarray resetten voordat er nieuwe data ingestopt word
        fingerextendarray = [];
       
        //Initialize hand
        let hand = frame.hands[0];
        
        //Left or right hand
        handtype = hand.type;
        
        //Putting extended fingers in array
        for (let i = 0; i < hand.fingers.length; i++) {
            fingerextendarray.push(hand.fingers[i].extended)     
        }

        //emitting data to server
        socket.emit('fingerarray', fingerextendarray)
         socket.emit('handtype', handtype)
        
        
        
    }
    //If theres no hands in the frame
    else{
        fingerextendarray = [];
        socket.emit('fingerarray', fingerextendarray)
        document.getElementById('SystemFeedback').innerHTML = 'Gedetecteerde handen: 0';
    }
}


// Get access to the camera! And showing live video
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}

//Giving a variable to the interval 
let checkHandInterval = "";

//Starting the sign recognition
$('#CheckButtonStart').click(StartHandCheck)

//Stopping the sign recognition
$('#CheckButtonStop').click(StopHandCheck)

//Start en stop with space
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        if(document.getElementById('video1').style.border == "10px solid rgb(8, 255, 8)"){
            StopHandCheck();
        }
        else{
            StartHandCheck();
        }
    }
}

//Start Sign Recognition Function
function StartHandCheck(){
    document.getElementById('video1').style.border = "10px solid rgb(8, 255, 8)";
    document.getElementById('video_overlays1').style.backgroundColor = 'rgba(0, 0, 0, 0.0)'
    document.getElementById('video_overlays1').innerHTML = '<div id="CheckButtonStop" style="width:50%;"class="CheckButton">Stop</div>';
    document.getElementById('video_overlays1').style.alignItems = 'flex-start';
    checkHandInterval = setInterval(checkHand,500);
    $('#CheckButtonStop').click(StopHandCheck)
}

//Stop Sign Recognition Function
function StopHandCheck(){
    document.getElementById('video1').style.border = "10px solid red";
    document.getElementById('video_overlays1').style.backgroundColor = 'rgba(0, 0, 0, 0.85)'
    document.getElementById('video_overlays1').innerHTML = '<div id="CheckButtonStart" class="CheckButton">Start</div>';
    document.getElementById('video_overlays1').style.alignItems = 'center';
    clearInterval(checkHandInterval)
    $('#CheckButtonStart').click(StartHandCheck)
    document.getElementById('SystemFeedback').innerHTML = 'Gedetecteerde handen: 0';
}

//variable for the SignName to check later on 
let dataSignName ="";

//What happens when get SingName
socket.on('SignName', function(data){
    console.log(data);
    document.getElementById('SignData').innerHTML = data;
    if(dataSignName != data){
        MousePicked = false
    }
    dataSignName = data;
    if(!MousePicked){
    $('.id_100 option').removeAttr('selected')
    $('.id_100 option[value='+data+']').attr('selected','selected');
    }
})