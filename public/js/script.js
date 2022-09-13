let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
    clicked = date;
    

    daySquare.id = 'currentDay';
    // const eventForDay = events.find(e => e.date === clicked);
    // //find if there already exist event for this day

    // if (eventForDay) {
    //     document.getElementById('eventText').innerText = eventForDay.title;
    //     deleteEventModal.style.display = 'block'
    // } else{
    //     newEventModal.style.display = 'block'; 
    // }

    // backDrop.style.display = 'block';

}
async function showEmployer() {
    var select = document.getElementById('employers');
    var text = select.options[select.selectedIndex].text;
    const employers_sch=fdb.collection('employers_schedule');
    const employers_qS=await employers_sch.get();
    employers_qS.forEach(doc => {
        if(text==doc.data().full_name){
            console.log(doc.data().appointment_time.toDate().getDate(), doc.data().appointment_time.toDate().getHours(), doc.data().appointment_time.toDate().getMinutes())
            
        }
    })
}
showEmployer();
function load() {
    const dt = new Date();
    // create object

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
        //to display right month
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    // using date objecct for month we get index value, like array
    const year = dt.getFullYear();
    // get information with help of methods

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // by using getDate we get specific number
    // by writing 0 in days we get last day of current month but we acces the next, and so can calculate days

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',

    });
    // gives us time format like Friday, 6/1/2022
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText =
        `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;
    //show current month in string and year in the top of calendar

    calendar.innerHTML = '';
    //clear previous calendar for new one 

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${i - paddingDays}/${month + 1}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays
            //number of current day in the square

            const eventForDay = events.find(e => e.date === dayString);

            if (i - paddingDays === day && nav === 0) {
                //nav === 0 to highlite choosed day only in current month
                daySquare.id = 'currentDay';
            }

            if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);

            }

            daySquare.addEventListener('click', () => openModal());
        } else {
            daySquare.classList.add('padding');
        }
        calendar.appendChild(daySquare);
    }

}

function closeModal() {
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load();
}

function saveEvent() {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value,
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    } else {
        eventTitleInput.classList.add('error');
    }
}

function deleteEvent() {
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);

    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();