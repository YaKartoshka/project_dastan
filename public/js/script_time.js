
let popUp = document.getElementById("popStud");
let popUpback = document.getElementById("opened");
let popUp2 = document.getElementById("popStud2");
let popUpback2 = document.getElementById("opened2");
let cnt = 0;
let delId = 0;
let clicked_id=0;
function openPopStud() {
    popUp.classList.add("open-popstud");
    popUpback.classList.add("b-popup");
}

function closePopStud() {
    popUp.classList.remove("open-popstud");
    popUpback.classList.remove("b-popup");
}
function openPopStud2(clicked_id) {
    
    popUp2.classList.add("open-popstud2");
    popUpback2.classList.add("b-popup2");
    
   
    
}


function closePopStud2YES() {
    popUp2.classList.remove("open-popstud2");
    popUpback2.classList.remove("b-popup2");
    var cookie_data=document.cookie;
    var fid_data=cookie_data.split("=");
    var fid=fid_data[1];
     const child_card=document.getElementById(clicked_id);
     child_card.parentElement.remove();
     fdb.collection('company').doc(`${fid}`).collection("employers_schedule").doc(`${clicked_id}`).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}
function closePopStud2NO() {
    popUp2.classList.remove("open-popstud2");
    popUpback2.classList.remove("b-popup2");
 
}


$(document).ready(function () {


    var flag = false;
    $("#submit").click(function () {
        flag = true;
    });
    $(".schedule-btn").click(function () {
        value = $(this).text();
        if (value == "Записаться") {
            var save = $(this).parent().find("#circle");
            save.css("color", "red");
            $(this).text("Отменить");
        }
        if (value == "Отменить") {
            var save = $(this).parent().find("#circle");
            save.css("color", "#00B012");
            $(this).text("Записаться");
        }
    });
});
async function addEvent() {

    var cookie_data=document.cookie;
    var fid_data=cookie_data.split("=");
    var fid=fid_data[1];
    const events=document.getElementById("events")
    const employers_sch=fdb.collection('company').doc(`${fid}`).collection('employers_schedule');
    const employers_qS=await employers_sch.get();
    
    var select = document.getElementById('employers');
    var selected_employee = select.options[select.selectedIndex].text;
    let time = document.getElementById('time').value;
    let input = document.getElementById('eventTitleInput').value;
    var newDiv = document.createElement("div");
    var newTime = document.createElement("span");
    var newInput = document.createElement("p");
    var newDel = document.createElement("div");
    var btnClose = document.createElement("button");
    var newLink = document.createElement("a");
    newDiv.classList.add('event')
    newDiv.id = "schedule_id";
    newTime.classList.add('time');
    newInput.classList.add('tEvent');
    btnClose.classList.add('delbtn');
    btnClose.id = 'remove';
    newLink.classList.add('fa-solid')
    newLink.classList.add('fa-circle-xmark')
    newDel.classList.add('delete');
    newDel.setAttribute('onclick', "removeCard(this.id)");
    newLink.href = '#';
    newTime.innerHTML = time;
    newInput.innerHTML = input;
    btnClose.innerHTML = newLink.outerHTML;
    newDel.innerHTML = btnClose.outerHTML;
    newDiv.innerHTML = newTime.outerHTML + newInput.outerHTML + newDel.outerHTML;
    events.insertAdjacentElement('beforeend', newDiv);
    var data={
        time:time,
        service:input,
        full_name:selected_employee
    }
    const new_event=await fdb.collection('company').doc(`${fid}`).collection('employers_schedule').add(data);
    $('.event').on("click", function () {
        delId = ($(this).attr('id'));
        
    })
    $(document).ready(function(){
        $('.fa-circle-xmark').click(function(){
            // openPopStud();
           // this.click = openPopStud2();
        })
    })
}
async function showEvents() {
    //console.log('event')
    var select = document.getElementById('employers');
    var selected_employee = select.options[select.selectedIndex].text;
    var cookie_data=document.cookie;
    var fid_data=cookie_data.split("=");
    var fid=fid_data[1];
    var events=document.getElementById('events');
    const employers_sch=fdb.collection('company').doc(`${fid}`).collection('employers_schedule');
    const employers_qS=await employers_sch.get();
    employers_qS.forEach(doc => {
        if(selected_employee==doc.data().full_name){
            console.log(doc.data().time,doc.data().service,selected_employee)
            let time = doc.data().time;
            let input = doc.data().service;
            var newDiv = document.createElement("div");
            var newTime = document.createElement("span");
            var newInput = document.createElement("p");
            var newDel = document.createElement("div");
            var btnClose = document.createElement("button");
            var newLink = document.createElement("a");
            newDiv.classList.add('event')
            newDiv.id = 'event_id';
            newTime.classList.add('time');
            newInput.classList.add('tEvent');
            btnClose.classList.add('delbtn');
            btnClose.id = 'remove';
            newLink.classList.add('fa-solid')
            newLink.classList.add('fa-circle-xmark')
            newDel.classList.add('delete');
            newDel.id=doc.id;
            newDel.setAttribute('onclick', "removeCard(this.id)");
            newLink.href = '#';
            newTime.innerHTML = time;
            newInput.innerHTML = input;
            btnClose.innerHTML = newLink.outerHTML;
            newDel.innerHTML = btnClose.outerHTML;
            newDiv.innerHTML = newTime.outerHTML + newInput.outerHTML + newDel.outerHTML;
            events.insertAdjacentElement('beforeend', newDiv);
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
    });
   

    


}




function remove(){
    console.log('remove');
    var cards = document.querySelectorAll('.event');
    cards.forEach(card=>{
        card.remove();
    });
}

$(document).ready(function(){
    $('.day').click(function(){
        // openPopStud();
        this.click = openPopStud2();
    })
});

function removeCard(click_id){
   clicked_id=click_id;
   console.log(clicked_id)
    openPopStud2();
    
 
  };

 async function showEmloyersList(){
   
    var cookie_data=document.cookie;
    var fid_data=cookie_data.split("=");
    var fid=fid_data[1];
   
    const selection=document.getElementById('employers');
    const employers_sch=fdb.collection('company').doc(`${fid}`).collection('employers');
    const employers_qS=await employers_sch.get();
    employers_qS.forEach(doc=>{
        
        var newOption = document.createElement("option");
        newOption.value=`${doc.data().name} ${doc.data().surname}`;
        newOption.text=`${doc.data().name} ${doc.data().surname}`;
        newOption.classList.add('option')
        selection.options.add(newOption,0);
    });
  }
  showEmloyersList();