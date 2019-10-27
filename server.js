var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/SignLanguage";
var http = require('http');
var express = require('express'),
  app = module.exports.app = express();
var server = http.createServer(app);

server.listen(8000);
app.use(express.static('views'))
var io = require('socket.io').listen(server); 
let SignArray = [];


var listener = io.listen(server);

app.get('/', function(req,res){
    res.render('index.ejs')
})

app.get('/start', function(req,res){
    res.render('SignDB.ejs')
    fillDropdownTable();
})

function fillDropdownTable(){
    MongoClient.connect(url, function(err, db) {
        //error handling
        if (err) throw err;
        //Database aanroepen

        var dbo = db.db("SignLanguage");

        dbo.collection("Signs").find({}).toArray(function(err, result) {
            if (err) throw err;
            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                SignArray.push(element.name)
            }
            console.log(SignArray);
            io.emit('SignArray', SignArray);
            db.close();
            SignArray = [];
          });
    
    
})
}

let SignName = "";
let handtype = "";
let dataArray = [];

var listener = io.listen(server);

    listener.sockets.on('connection', function(socket){
      
        socket.on('fingerarray', function(data){
            console.log(data);
            dataArray = data;
            
        });

        socket.on('handtype', function(data){
          handtype = data;
        })

       
        
 })

setInterval(checkinDB, 2000);

function checkinDB(){
    console.log(dataArray);
    MongoClient.connect(url, function(err, db) {
        //error handling
        if (err) throw err;
        //Database aanroepen
        var dbo = db.db("SignLanguage");
        //Dingen ophalen uit de database tabel
        dbo.collection("Signs").find({extended : dataArray}).toArray(function(err, TheSign) {
        //error handling
          if (err) throw err;
        //Ideeën weergeven ter controle
         if(TheSign != ""){
             console.log(TheSign[0].name);
             SignName = TheSign[0].name;
             io.emit('SignName', TheSign[0].name)
                               
            
         }   
         else{
          io.emit('SignName', 'none')
          SignName = "";
         }
         //Idee renderen  
         
         
    })
    
    
})
}