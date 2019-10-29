//Initialize function
window.onload = init;
function init(){

//Let the window load before starting a function
setTimeout(addButtonValues,2000);
//Setting interval for function that keeps things updated
setInterval(checkDropDown, 500);
setTimeout(createVideoFilter1,1000);
}

//Array for items in fake dropdown
let SignArray = [];

//For changing the value manual or through leap motion
let MousePicked = false;

//After data is received create fake dropdown and add event listeners
function addButtonValues(){

//Creating an item in the fake dropdown for every item in the selector dropdown
$('.id_100 option').each(function(){  
  let img = $(this).attr("data-thumbnail");
  let text = this.innerText;
  let value = $(this).val();
  let item = '<li><img src="'+ img +'" alt="" value="'+value+'"/><span>'+ text +'</span>';
  SignArray.push(item);
})
//Putting every item in the fake dropdown
$('#a').html(SignArray);

//Set the button value to the first el of the array
$('.btn-select').html(SignArray[0]);
$('.btn-select').attr('value', '0');

$('#a li').click(buttonChanged);
$("#ButtonDropDown").click(showDropDown);
}

//Change the button values on click
function buttonChanged(){
  
  //Removing all selected items from real selector dropdown
  $('.id_100 option').removeAttr('selected')

  //Change button to selected item
  $('.id_100 option[value='+$(this).find('img').attr('value')+']').attr('selected','selected');
   let img = $(this).find('img').attr("src");
   let value = $(this).find('img').attr('value');
   let text = this.innerText;
   let item = '<li style=" width:100%; display:flex; justify-content:space-between;"><div style="display:flex; align-items:center;"><img src="'+ img +'" alt="" value="'+value+'"/><span>'+ text +'</span></div><span id="ButtonDropDown">V</span></li>';
   
  $('.btn-select').html(item);
  $('.btn-select').attr('value', value);
  $(".b").toggle();

  //Change that the choice is not made with the leap motion but with the mouse, because otherwise the system sets all values to none automatically again.
  MousePicked = true;
}

//Making dropdown visible on button click
$("#ButtonDropDown").click(showDropDown);

function showDropDown(){
  $(".b").toggle();
}

//Assign html object to variable e
let e = document.getElementById("selection");
function checkDropDown(){
  //Changing selected item when value that gets send from server to client is changed.
        changeButton();
        
}

//If an item in the selection(Invisible select html item) is selected the fake dropdown also changes
$('.id_100').change(function(){
  changeButton();  
  
})

//When this function is called the button values change
function changeButton(){
  let value = e.options[e.selectedIndex].value;
  let text = e.options[e.selectedIndex].innerText;
  let img = e.options[e.selectedIndex].getAttribute('data-thumbnail');
  let item = '<li style=" width:100%; display:flex; justify-content:space-between;"><div style="display:flex; align-items:center;"><img src="'+ img +'" alt="" value="'+value+'"/><span>'+ text +'</span></div><span id="ButtonDropDown" >V</span></li>';
  $('.btn-select').attr('value', value);
  $('.btn-select').html(item);
  $("#ButtonDropDown").click(showDropDown);
  socket.emit('SignSelected', e.options[e.selectedIndex].innerText);
}