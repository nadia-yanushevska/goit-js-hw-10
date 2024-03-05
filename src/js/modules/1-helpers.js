import { daysElem, hoursElem, minutesElem, secondsElem } from './1-refs.js';

export function disableElem(elem) {
    elem.disabled = true;
    elem.style.cursor = 'default';
}
export function enableElem(elem) {
    elem.disabled = false;
    elem.style.cursor = 'pointer';
}

export function showTimer(obj) {
    daysElem.textContent = addLeadingZero(obj.days);
    hoursElem.textContent = addLeadingZero(obj.hours);
    minutesElem.textContent = addLeadingZero(obj.minutes);
    secondsElem.textContent = addLeadingZero(obj.seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

export function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
