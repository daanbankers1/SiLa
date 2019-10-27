window.onload = init;
function init(){
setTimeout(addButtonValues,2000);
setInterval(checkDropDown, 20);


}
var langArray = [];

function addButtonValues(){
$('.id_100 option').each(function(){
   
  var img = $(this).attr("data-thumbnail");
  var text = this.innerText;
  var value = $(this).val();
  var item = '<li><img src="'+ img +'" alt="" value="'+value+'"/><span>'+ text +'</span></li>';
  langArray.push(item);
})
$('#a').html(langArray);
//Set the button value to the first el of the array
$('.btn-select').html(langArray[0]);
$('.btn-select').attr('value', 'VS');


console.log('test');
        var value = "none";
        var text = 'No Sign';
        var img = 'none';
        var item = '<li><img src="'+ img +'" alt="" /><span>'+ text +'</span></li>';
        $('.btn-select').attr('value', value);
        $('.btn-select').html(item);
}

//change button stuff on click
$('#a li').click(function(){
    console.log('CLicked')
$('.id_100 option').removeAttr('selected')

    console.log(this.innerText)
  $('.id_100 option[value='+$(this).find('img').attr('value')+']').attr('selected','selected');
   var img = $(this).find('img').attr("src");
   var value = $(this).find('img').attr('value');
   var text = this.innerText;
   var item = '<li><img src="'+ img +'" alt="" /><span>'+ text +'</span></li>';
  $('.btn-select').html(item);
  $('.btn-select').attr('value', value);
  $(".b").toggle();
  
  //console.log(value);
});



$(".btn-select").click(function(){
        $(".b").toggle();
    });

//check local storage for the lang
var sessionLang = localStorage.getItem('lang');
if (sessionLang){
  //find an item with value of sessionLang
  var langIndex = langArray.indexOf(sessionLang);
  $('.btn-select').html(langArray[langIndex]);
  $('.btn-select').attr('value', sessionLang);
} else {
   var langIndex = langArray.indexOf('ch');
  console.log(langIndex);
  $('.btn-select').html(langArray[langIndex]);
  //$('.btn-select').attr('value', 'en');
}
var e = document.getElementById("selection");
function checkDropDown(){

        var value = e.options[e.selectedIndex].value;
        var text = e.options[e.selectedIndex].innerText;
        var img = e.options[e.selectedIndex].getAttribute('data-thumbnail');
        var item = '<li><img src="'+ img +'" alt="" /><span>'+ text +'</span></li>';
        $('.btn-select').attr('value', value);
        $('.btn-select').html(item);
    
    

}

// $('.id_100').change(function(){
//     // var img = $(this).attr("data-thumbnail");
//     console.log('value changed')
    
//     var value = e.options[e.selectedIndex].value;
//     console.log(value)
//     var text = e.options[e.selectedIndex].innerText;
//     console.log(text)
//     var img = e.options[e.selectedIndex].getAttribute('data-thumbnail');
//     console.log(img)
//     var item = '<li><img src="'+ img +'" alt="" /><span>'+ text +'</span></li>';
//     $('.btn-select').attr('value', value);
//     $('.btn-select').html(item);
//     // console.log(e);
// })