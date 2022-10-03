

let popUp = document.getElementById("popStud");
let popUpback = document.getElementById("opened");

function openPopStud() {
    popUp.classList.add("open-popstud");
    popUpback.classList.add("b-popup");
}

function closePopStud() {
    popUp.classList.remove("open-popstud");
    popUpback.classList.remove("b-popup");
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
showEmployers();
async function showEmployers() {
    
    var cookie_data=document.cookie;
    var fid_data=cookie_data.split("=");
    var fid=fid_data[1];
    let employers=fdb.collection('company').doc(`${fid}`).collection('employers');

    let employers_qS=await employers.get();
    employers_qS.forEach(doc => {
    let name = doc.data().name
    let surname = doc.data().surname
    let patronymic = doc.data().patronymic // отчество в карточках не отображается
    let quality = doc.data().quality
    let addinfo = doc.data().info
    var newDiv = document.createElement("div");
    var newImg = document.createElement("div");
    var newName = document.createElement("div");
    var nname = document.createElement("div");
    var ssurname = document.createElement("div");
    var newQuality = document.createElement("div");
    var newAddInfo = document.createElement("p");
    var btnMore = document.createElement("button");
    var newLink = document.createElement("a");
    var Img = document.createElement("img");

    Img.src = '/public/images/user.svg';
    newDiv.classList.add('box');
    newImg.classList.add('image');
    nname.classList.add('name_job');
    ssurname.classList.add('name_job');
    newName.classList.add('name');
    newQuality.classList.add('name_job');
    btnMore.classList.add('btns');
    newLink.classList.add('button');
    newLink.href = '#';
    newImg.innerHTML = Img.outerHTML;
    nname.innerHTML = name;
    ssurname.innerHTML = surname;
    newName.innerHTML = nname.outerHTML + ssurname.outerHTML;
    newQuality.innerHTML = quality;
    newAddInfo.innerHTML = addinfo;
    newLink.innerHTML = 'Подробнее';
    btnMore.innerHTML = newLink.outerHTML;

    newDiv.innerHTML = newImg.outerHTML + newName.outerHTML + newQuality.outerHTML + newAddInfo.outerHTML + btnMore.outerHTML;
    
    field.insertAdjacentElement('afterbegin', newDiv);
    });
}

function addEmployee() {
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value
    let patronymic = document.getElementById('patronymic').value // отчество в карточках не отображается
    let quality = document.getElementById('quality').value
    let addinfo = document.getElementById('addinfo').value
    var newDiv = document.createElement("div");
    var newImg = document.createElement("div");
    var newName = document.createElement("div");
    var nname = document.createElement("div");
    var ssurname = document.createElement("div");
    var newQuality = document.createElement("div");
    var newAddInfo = document.createElement("p");
    var btnMore = document.createElement("button");
    var newLink = document.createElement("a");
    var Img = document.createElement("img");

    Img.src = '/public/images/user.svg';
    newDiv.classList.add('box');
    newImg.classList.add('image');
    nname.classList.add('name_job');
    ssurname.classList.add('name_job');
    newName.classList.add('name');
    newQuality.classList.add('name_job');
    btnMore.classList.add('btns');
    newLink.classList.add('button');
    newLink.href = '#';
    newImg.innerHTML = Img.outerHTML;
    nname.innerHTML = name;
    ssurname.innerHTML = surname;
    newName.innerHTML = nname.outerHTML + ssurname.outerHTML;
    newQuality.innerHTML = quality;
    newAddInfo.innerHTML = addinfo;
    newLink.innerHTML = 'Подробнее';
    btnMore.innerHTML = newLink.outerHTML;

    newDiv.innerHTML = newImg.outerHTML + newName.outerHTML + newQuality.outerHTML + newAddInfo.outerHTML + btnMore.outerHTML;
    
    field.insertAdjacentElement('afterbegin', newDiv);

    // field.insertAdjacentHTML('afterbegin', '<div class="box"><div class="image"><img src="./img/user.svg" alt=""></div><div class="name_job">Kristina Bellis</div><div class="name_job">Парикмахер</div><p> Lorem ipsum dolor sitamet, stphen hawkin so adipisicing elit. Ratione disuja doloremque reiciendinemo.</p><div class="btns"><a href="#" class="button">Подробнее</a</div></div>');
}
