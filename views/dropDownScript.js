//Initialize function
window.onload = init;
function init(){

//Let the window load before starting a function
setTimeout(addButtonValues,2000);
//Setting interval for function that keeps things updated
setInterval(checkDropDown, 20);
}

//Array for items in fake dropdown
let SignArray = [];

//Voor manueel en door leap motion aanpassen
let MousePicked = false;

//Fake dropdown 
function addButtonValues(){

//Creating an item in the fake dropdown for every item in the selector dropdown
$('.id_100 option').each(function(){  
  var img = $(this).attr("data-thumbnail");
  var text = this.innerText;
  var value = $(this).val();
  var item = '<li ><img src="'+ img +'" alt="" value="'+value+'"/><span>'+ text +'</span></li>';
  SignArray.push(item);
})
//Putting every item in the fake dropdown
$('#a').html(SignArray);

//Set the button value to the first el of the array
$('.btn-select').html(SignArray[0]);
$('.btn-select').attr('value', '0');

$('#a li').click(buttonChanged);
}

//Change the button values on click
function buttonChanged(){
  
  //Removing all selected items from real selector dropdown
  $('.id_100 option').removeAttr('selected')

    console.log(this.innerText)
  $('.id_100 option[value='+$(this).find('img').attr('value')+']').attr('selected','selected');
   var img = $(this).find('img').attr("src");
   var value = $(this).find('img').attr('value');
   var text = this.innerText;
   var item = '<li class="listitem"><img src="'+ img +'" alt="" /><span>'+ text +'</span></li>';
  $('.btn-select').html(item);
  $('.btn-select').attr('value', value);
  $(".b").toggle();
  MousePicked = true;
}





$(".btn-select").click(function(){
        $(".b").toggle();
    });

//check local storage for the lang
var sessionLang = localStorage.getItem('lang');
if (sessionLang){
  //find an item with value of sessionLang
  var langIndex = SignArray.indexOf(sessionLang);
  $('.btn-select').html(SignArray[langIndex]);
  $('.btn-select').attr('value', sessionLang);
} else {
   var langIndex = SignArray.indexOf('ch');
  console.log(langIndex);
  $('.btn-select').html(SignArray[langIndex]);
  //$('.btn-select').attr('value', 'en');
}
var e = document.getElementById("selection");
function checkDropDown(){
        if($('.btn-select li span').text() != $('#SignData').html() && !MousePicked){
          var value = e.options[e.selectedIndex].value;
        var text = e.options[e.selectedIndex].innerText;
        var img = e.options[e.selectedIndex].getAttribute('data-thumbnail');
        var item = '<li><img src="'+ img +'" alt="" /><span>'+ text +'</span></li>';
        $('.btn-select').attr('value', value);
        $('.btn-select').html(item);
        }
}

$('.id_100').change(function(){
    // var img = $(this).attr("data-thumbnail");
    console.log('value changed')
    
    var value = e.options[e.selectedIndex].value;
    console.log(value)
    var text = e.options[e.selectedIndex].innerText;
    console.log(text)
    var img = e.options[e.selectedIndex].getAttribute('data-thumbnail');
    console.log(img)
    var item = '<li><img src="'+ img +'" alt="" /><span>'+ text +'</span></li>';
    $('.btn-select').attr('value', value);
    $('.btn-select').html(item);
    // console.log(e);
})