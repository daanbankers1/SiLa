// INITIALIZE DEPENDENCIES
//Database link
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/SignLanguage";

var http = require('http');
var express = require('express'),
  app = module.exports.app = express();
var server = http.createServer(app);
server.listen(8000);
app.use(express.static('views'))
var io = require('socket.io').listen(server); 

//Array for all signs out of database
let SignArray = [];

//Render indexs when the website gets /
app.get('/', function(req,res){
    res.render('index.ejs')
})

//Render SignDB when the website gets /start
app.get('/start', function(req,res){
    res.render('SignDB.ejs')
    //Fill the selection html element with items out of database
    fillDropdownTable();
})

//FIlling the select html element
function fillDropdownTable(){
    MongoClient.connect(url, function(err, db) {
        //Error handling
        if (err) throw err;
        //Call database
        var dbo = db.db("SignLanguage");

        //Get items out of Database Collection Signs
        dbo.collection("Signs").find({}).toArray(function(err, result) {
            //error handling
            if (err) throw err;
            //Adding the sign names to array
            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                SignArray.push(element.name)
            }
            // Sending Array to the clientside
            io.emit('SignArray', SignArray);
            db.close();
            SignArray = [];
          });  
})
}

//Variable to get handtype left or right
let handtype = "";
//Array foor extended/niet extended vingers
let dataArray = [];
//Variable to save the sign got from database
let SignName = "";
let SelectedSign = '';

//Socket Listeners
var listener = io.listen(server);

    listener.sockets.on('connection', function(socket){
      
    //What happens when get fingerarray from client
        socket.on('fingerarray', function(data){
            dataArray = data;        
        });
    //What happens when get handtype from client
        socket.on('handtype', function(data){
          handtype = data;
        })

       socket.on('SignSelected', function(data){
            SelectedSign = data;
       })
        
 })

 //Setting interval for checking if a Sign is made
setInterval(checkinDB, 500);

//Function for checking if a Sign is made
function checkinDB(){
   
    MongoClient.connect(url, function(err, db) {
        //error handling
        if (err) throw err;
        //Call database
        var dbo = db.db("SignLanguage");
        //Get sign out of table
        dbo.collection("Signs").find({extended : dataArray}).toArray(function(err, TheSign) {
        //error handling
          if (err) throw err;
        //Sending the sign thats made to the client
         if(TheSign != ""){
             SignName = TheSign[0].name;
             io.emit('SignName', TheSign[0].name)  
         }   
         else{
          io.emit('SignName', 'none')
          SignName = "";
         }     
    })  
})
}

//Checking if there is any associations for the HandFigure made
setInterval(checkAssociation, 200);
function checkAssociation(){
    if(handtype ==""){
        handtype = "right";
    }
    MongoClient.connect(url, function(err, db) {
        //error handling
        if (err) throw err;
    //Getting the name and video of the suggestion
    var dbo = db.db("SignLanguage");
    dbo.collection("GebaarAssociatie").find({ handvorm: [SelectedSign, handtype] }).toArray(function(err, Association) {
    //error handling
      if (err) throw err;
    //If the association is something send it to client
     if(Association != ''){
    io.emit('Associatie', Association[0].Gebaar)
      io.emit('SignVideo', Association[0].video); 
     }  
     //If association is nothing send none to client 
     else{
      io.emit('Associatie', 'none')
      io.emit('SignVideo', 'none'); 
     }
     
     
})
    })
}