
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

$(document).ready(function(){
    $('.day').click(function(){
        // openPopStud();
        this.click = openPopStud2();
    })
})
