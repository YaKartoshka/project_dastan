
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
}

async function showDayEvents(month,day){
    let events=document.getElementById('events');
    console.log(events)
    const events_sch=fdb.collection('employers_schedule');
    const events_qS=await events_sch.get();
    events_qS.forEach(doc => {
        
        let time = doc.data().time;
        let input = doc.data().service;
        var newDiv = document.createElement("div");
        var newTime = document.createElement("div");
        var newTitle = document.createElement("div");
        var newDel = document.createElement("div");
        var btnClose = document.createElement("button");
        var newLink = document.createElement("a");
        newDiv.classList.add('event')
        newDiv.id = 'event_id';
        newTime.classList.add('time');
        
        btnClose.classList.add('delbtn');
        btnClose.id = 'remove';
        newLink.classList.add('fa-solid')
        newLink.classList.add('fa-circle-xmark')
        newDel.classList.add('delete');
        newDel.id=doc.id;
        //newDel.setAttribute('onclick', "removeCard(this.id)");
        newLink.href = '#';
        newTime.innerHTML = time;
        newInput.innerHTML = input;
        btnClose.innerHTML = newLink.outerHTML;
        newDel.innerHTML = btnClose.outerHTML;
        newDiv.innerHTML = newTime.outerHTML + newInput.outerHTML + newDel.outerHTML;
        events.insertAdjacentElement('afterbegin', newDiv);
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

