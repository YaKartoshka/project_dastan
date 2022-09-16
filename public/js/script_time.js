
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
function openPopStud2() {
    popUp2.classList.add("open-popstud2");
    popUpback2.classList.add("b-popup2");
}

function closePopStud2() {
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
function addEvent() {
    
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
    newLink.href = '#';
    newTime.innerHTML = time;
    newInput.innerHTML = input;
    btnClose.innerHTML = newLink.outerHTML;
    newDel.innerHTML = btnClose.outerHTML;
    newDiv.innerHTML = newTime.outerHTML + newInput.outerHTML + newDel.outerHTML;
    field.insertAdjacentElement('beforeend', newDiv);

    $('.event').on("click", function () {
        delId = ($(this).attr('id'));
        
    })
    $(document).ready(function(){
        $('.fa-circle-xmark').click(function(){
            // openPopStud();
            this.click = openPopStud2();
        })
    })
}
async function showEvents() {
    console.log('event')
    var select = document.getElementById('employers');
    var selected_employee = select.options[select.selectedIndex].text;
    console.log(selected_employee);
    const employers_sch=fdb.collection('employers_schedule');
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
            newDiv.id = doc.id;
            newTime.classList.add('time');
            newInput.classList.add('tEvent');
            btnClose.classList.add('delbtn');
            btnClose.id = 'remove';
            newLink.classList.add('fa-solid')
            newLink.classList.add('fa-circle-xmark')
            newDel.classList.add('delete');
            newLink.href = '#';
            newTime.innerHTML = time;
            newInput.innerHTML = input;
            btnClose.innerHTML = newLink.outerHTML;
            newDel.innerHTML = btnClose.outerHTML;
            newDiv.innerHTML = newTime.outerHTML + newInput.outerHTML + newDel.outerHTML;
            field.insertAdjacentElement('beforeend', newDiv);
       // }
        }
    });

    


}


showEvents();
async function remove(){
    
    const employers_sch=fdb.collection('employers_schedule');
    const employers_qS=await employers_sch.get();
   
    var description =document.querySelectorAll('.event');
   
     Array.from(description).forEach(
      async  (desc, index, array)=> {
         deleteCard(desc, index)
        }
    );
    
  
    function deleteCard(desc, index) {
        description[index].remove();
        console.log(index)
    }
    
    
}



