// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import { getToastOptions } from './modules/izitoast-options.js';

let selectedDate;

const section = document.querySelector('[js-section]');

const daysElem = section.querySelector('[data-days]');
const hoursElem = section.querySelector('[data-hours]');
const minutesElem = section.querySelector('[data-minutes]');
const secondsElem = section.querySelector('[data-seconds]');

const startBtn = section.querySelector('[data-start]');
disableElem(startBtn);

startBtn.addEventListener('click', onStart);

const datePickerElem = section.querySelector('#datetime-picker');
const datePickerOptions = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] > Date.now()) {
            selectedDate = selectedDates[0];
            enableElem(startBtn);
        } else {
            iziToast.error(getToastOptions('Illegal operation', false));
            disableElem(startBtn);
        }
    },
};

flatpickr(datePickerElem, datePickerOptions);

function onStart(e) {
    disableElem(startBtn);

    if (selectedDate < Date.now()) {
        iziToast.error(getToastOptions('Illegal operation', false));
        return;
    }

    disableElem(datePickerElem);

    const intervalId = setInterval(() => {
        const timer = selectedDate - Date.now();
        showTimer(convertMs(timer));

        if (timer < 1000) {
            clearInterval(intervalId);
            enableElem(datePickerElem);
            iziToast.show(getToastOptions('Congratilations!', true));
        }
    }, 1000);
}

function showTimer(obj) {
    daysElem.textContent = addLeadingZero(obj.days);
    hoursElem.textContent = addLeadingZero(obj.hours);
    minutesElem.textContent = addLeadingZero(obj.minutes);
    secondsElem.textContent = addLeadingZero(obj.seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function disableElem(elem) {
    elem.disabled = true;
    elem.style.cursor = 'default';
}
function enableElem(elem) {
    elem.disabled = false;
    elem.style.cursor = 'pointer';
}

function convertMs(ms) {
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
