
var video = document.getElementById('video1');
const socket = io.connect("http://localhost:8000"); 
socket.once('SignArray', function(data){
    console.log(data);

    for (let d = 0; d  < data.length; d++) {
        const element = data[d];
        console.log(element)
        document.getElementById('selection').innerHTML += '<option value='+element+ ' data-thumbnail="Signs/'+element+'.jpg">' + element + '</option>';
    }
})

let fingerextendarray = [];
let handtype = "";
i=0;
var controller = new Leap.Controller({enableGestures: true});
controller.connect();

function checkHand(){
        var frame = controller.frame();
        if(frame.hands.length > 0)
    
        {
        if(frame.hands.length > 0 && frame.hands.length < 2){
            $('#SystemFeedback').text('Er is '+frame.hands.length+' hand gedetecteerd')
        }
        else if(frame.hands.length > 1){
            $('#SystemFeedback').text('Er zijn '+frame.hands.length+' handen gedetecteerd') 
        }
        
        fingerextendarray = [];
       
        let hand = frame.hands[0];
        
        handtype = hand.type;
        
        for (let i = 0; i < hand.fingers.length; i++) {
            fingerextendarray.push(hand.fingers[i].extended)     
        }
        // document.getElementById("data").innerHTML = fingerextendarray

        console.log(fingerextendarray);
        socket.emit('fingerarray', fingerextendarray)
         socket.emit('handtype', handtype)
        
        
        
    }
    else{
        fingerextendarray = [];
        socket.emit('fingerarray', fingerextendarray)
        document.getElementById('SystemFeedback').innerHTML = 'Er is geen hand gedetecteerd';
        // document.getElementById("data").innerHTML = "<h1 style='font-size:80px;'>No hand detected</h1>"
    }
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

let checkHandInterval = "";

$('#CheckButtonStart').click(function(){
    document.getElementById('video1').style.border = "10px solid rgb(8, 255, 8)";
    checkHandInterval = setInterval(checkHand,500);
})

$('#CheckButtonStop').click(function(){
    document.getElementById('video1').style.border = "10px solid red";
    clearInterval(checkHandInterval)
    document.getElementById('SystemFeedback').innerHTML = 'Er is geen hand gedetecteerd';
})

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        if(document.getElementById('video1').style.border == "10px solid rgb(8, 255, 8)"){
            document.getElementById('video1').style.border = "10px solid red";
            clearInterval(checkHandInterval)  
            document.getElementById('SystemFeedback').innerHTML = 'Er is geen hand gedetecteerd';
        }
        else{
            document.getElementById('video1').style.border = "10px solid rgb(8, 255, 8)";
            checkHandInterval = setInterval(checkHand,500);
        }
    }
}
let dataSignName ="";
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