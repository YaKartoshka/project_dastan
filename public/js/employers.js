let popUp = document.getElementById("popStud");
let popUpback = document.getElementById("opened");
let field=document.getElementById('field')
var counter=1;
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

async function showEmployers() {
    

    var fid=getCookie('fid')
    
    let employers=fdb.collection('company').doc(`${fid}`).collection('employers');
    
    let employers_qS=await employers.get();
    employers_qS.forEach(doc => {
        console.log
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
        if(doc.data().profile_image==null || doc.data().profile_image==undefined){
            Img.src = '/public/images/user.svg';
        }else{
            Img.src = doc.data().profile_image;
        }
        
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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

showEmployers();


function addEmployee() {
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value
    let patronymic = document.getElementById('patronymic').value // отчество в карточках не отображается
    let quality = document.getElementById('quality').value
    let addinfo = document.getElementById('addinfo').value
    let profile_image=document.querySelector('.user_img').src;
    var isValid=true;
    $(".imp_input").each(function() {
    var element = $(this);
    if (element.val() == "") {
        isValid = false;
    }
    });
    console.log(isValid)
    if(isValid==false){

    }else{
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

        Img.src = profile_image;
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
        counter=1;
        closePopStud()
    }   
    
    // field.insertAdjacentHTML('afterbegin', '<div class="box"><div class="image"><img src="./img/user.svg" alt=""></div><div class="name_job">Kristina Bellis</div><div class="name_job">Парикмахер</div><p> Lorem ipsum dolor sitamet, stphen hawkin so adipisicing elit. Ratione disuja doloremque reiciendinemo.</p><div class="btns"><a href="#" class="button">Подробнее</a</div></div>');
}

function addItem(){
    console.log(document.getElementById('docpicker').value)
    var exact_div = document.getElementById('services')
    var inpName = document.createElement("input")
    var buttonDel = document.createElement("button")
    var inpDiv = document.createElement("div")
    var x_i = document.createElement("i")
    var inpPrice = document.createElement("input")
    var inpTime = document.createElement("input")
    var inpDiv2 = document.createElement("div")
    var divobshii = document.createElement("div")
    inpDiv2.classList.add("inpDiv")
    divobshii.classList.add("inpDiv")
    inpTime.classList.add("input-field-r")
    inpTime.classList.add("imp_input")
    inpTime.setAttribute('name',`s_time${counter}`)
    inpTime.setAttribute('type','text')
    inpTime.required=true;
    inpPrice.classList.add("input-field-l");
    inpPrice.classList.add("imp_input")
    inpPrice.placeholder = "Стоимость"
    inpPrice.setAttribute('name',`s_price${counter}`)
    inpPrice.setAttribute('type','text')
    inpPrice.required=true;
    x_i.classList.add("fa-sharp")
    x_i.classList.add("fa-solid")
    x_i.classList.add("fa-xmark")
    buttonDel.innerHTML = x_i.outerHTML
    buttonDel.classList.add("btn_del")
    inpName.classList.add("input-field")
    inpName.classList.add("imp_input")
    inpName.placeholder = "Название"
    inpName.setAttribute('name',`s_name${counter}`)
    inpName.setAttribute('type','text')
    inpName.required=true;

    inpTime.placeholder = "Время"
    inpDiv2.innerHTML = inpPrice.outerHTML + inpTime.outerHTML
    inpDiv.innerHTML = inpName.outerHTML + inpDiv2.outerHTML
    divobshii.innerHTML = inpDiv.outerHTML + buttonDel.outerHTML
    //exact_div.innerHTML += divobshii.outerHTML
     exact_div.insertAdjacentElement('beforeend',divobshii)
    $(".btn_del").click(function () {
        $(this).parent().remove()
    });
    counter++;
}

function readURL(input)
{
    if(input.files && input.files[0]){
        var reader= new FileReader();
        reader.onload=function(e)
        {
            var fileurl=e.target.result;
            $('.user_img').attr('src',fileurl);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$(".image_upload").on('change',function(){
readURL(this);
});
$(".photo").on('click',function(){
$(".image_upload").click();
});
/***AVATAR SCRIPT***/