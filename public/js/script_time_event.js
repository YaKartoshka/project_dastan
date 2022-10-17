
let popUp = document.getElementById("popStud");
let popUpback = document.getElementById("opened");
let popUp2 = document.getElementById("popStud2");
let popUpback2 = document.getElementById("opened2");
let cnt = 0;
let delId = 0;


function openPopStud() {
    popUp.classList.add("open-popstud");
    popUpback.classList.add("b-popup");
}

function closePopStud() {
    popUp.classList.remove("open-popstud");
    popUpback.classList.remove("b-popup");
}
function openPopStud2(clicked) {
    popUp2.classList.add("open-popstud2");
    popUpback2.classList.add("b-popup2");
    var month=document.getElementById('monthDisplay').innerHTML;
    var day=clicked.innerHTML;
   
     showDayEvents(month,day);
}

function closePopStud2() {
    popUp2.classList.remove("open-popstud2");
    popUpback2.classList.remove("b-popup2");
    remove()
}

async function showDayEvents(month,day){
    var fullDate=$('#monthDisplay').text();
    var fid=getCookie('fid')
    let events_list=document.getElementById('events');
    var chosen_month=fullDate.split(" ");
    
    chosen_month=getMonth(chosen_month[0]);
    const events_sch=fdb.collection('company').doc(`${fid}`).collection('employers_schedule');
    const events_qS=await events_sch.get();
     events_qS.forEach(doc => {
        var docDate=doc.data().date;
        var full_date=docDate.split("/");
        var docDay=full_date[0];
        var docMonth=full_date[1];
        console.log(docDay,day);
        if(docDay==day  && docMonth==chosen_month){
        
            var time = doc.data().time;
            var service = doc.data().service;
            var employer=doc.data().employer_name;
            var newDiv = document.createElement("div");
            var newTime = document.createElement("div");
            var newEName=document.createElement("div");
            var newTitle=document.createElement("div");
            var newDel = document.createElement("div");
            var btnClose = document.createElement("button");
            var newLink = document.createElement("a");
            newDiv.classList.add('event')
            newDiv.id = 'event_id';
            newTime.classList.add('time');
            newEName.classList.add('emloyerName')
            newTitle.classList.add('eventTitle')
            btnClose.classList.add('delbtn');
            btnClose.id = 'remove';
            newLink.classList.add('fa-solid')
            newLink.classList.add('fa-circle-xmark')
            newDel.classList.add('delete');
            //newDel.setAttribute('onclick', "removeCard(this.id)");
            newLink.href = '#';
            newTime.innerHTML = time;
            newEName.innerHTML = employer;
            newTitle.innerHTML= service
            btnClose.innerHTML = newLink.outerHTML;
            newDel.innerHTML = btnClose.outerHTML;
            newDiv.innerHTML =  newTime.outerHTML+ newTitle.outerHTML + newEName.outerHTML + newDel.outerHTML;
            
            events_list.insertAdjacentElement('afterbegin', newDiv);
            console.log(6);
            $('.event').on("click", function () {
                delId = ($(this).attr('id'));
                
            })
            $(document).ready(function(){
                $('.fa-circle-xmark').click(function(){
                    // openPopStud();
                    //this.click = openPopStud2();
                })
             })
        }
       /* <div id="3" class="event">
        <div class="time">12:00</div>
        <div class="employerName">Мадина Ки</div>
        <div class="eventTitle">Маникюр, Санжар</div>
        <div class="delete">
            <button  class="" onclick="openPopStud()" >
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
        </div>
         </div>  */
    
    

    });
}

function getMonth(month){
    console.log(month)
    var months = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
    month = months.indexOf(month)+1;
    return month;
}   

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

$('.event').on("click", function () {
    delId = ($(this).attr('id'));
    
})
$(document).ready(function () {


    var flag = false;
    $("#submit").click(function () {
        flag = true;
    });


});
function remove(){
    var description = document.getElementById(delId);
    description.remove();
}
function addEventCard(){
    $(document).ready(function(){
        $('.day').click(function(){
            // openPopStud();
            
            this.click = openPopStud2(this);
        })
    })
}
addEventCard();

function remove(){
    console.log('remove');
    var cards = document.querySelectorAll('.event');
    cards.forEach(card=>{
        card.remove();
    });
}