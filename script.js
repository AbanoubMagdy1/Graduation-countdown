const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');

Notification.requestPermission()

function transformDateToSeconds(date) {
    return Math.floor(date.getTime() / 1000);
}

function padToTwo(number) {
    return number.toString().padStart(2, '0');
}

const graduationDate = new Date('December 23 2023 12:00:00');
const graduationDateSeconds = transformDateToSeconds(graduationDate);

function countdown() {
    const now = transformDateToSeconds(new Date());
    let difference = graduationDateSeconds - now;

    const daysLeft = Math.floor(difference / 86400);
    difference -= daysLeft * 86400;
    days.textContent = padToTwo(daysLeft);

    const hoursLeft = Math.floor(difference / 3600) % 24;
    difference -= hoursLeft * 3600;
    hours.textContent = padToTwo(hoursLeft);

    const minutesLeft = Math.floor(difference / 60) % 60;
    difference -= minutesLeft * 60;
    minutes.textContent = padToTwo(minutesLeft);

    const secondsLeft = difference % 60;
    seconds.textContent = padToTwo(secondsLeft);

    if(secondsLeft == 0){
        new Notification(`${daysLeft} يوم`, {
            body: `فاضلك ${daysLeft} وتتخرج يا جميل`,
            icon: './icon.svg'
        })
    }
}

setInterval(countdown, 1000);
