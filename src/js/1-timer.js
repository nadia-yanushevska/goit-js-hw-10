// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import { section } from './modules/1-refs.js';
import {
    convertMs,
    disableElem,
    enableElem,
    showTimer,
} from './modules/1-helpers.js';
import { showMessage } from './modules/messages.js';

let selectedDate;

// Create DatePicker
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
            showMessage('Illegal operation', false);
            disableElem(startBtn);
        }
    },
};

flatpickr(datePickerElem, datePickerOptions);

// Add and handle startBtn listener
const startBtn = section.querySelector('[data-start]');
disableElem(startBtn);

startBtn.addEventListener('click', onStart);

function onStart(e) {
    disableElem(startBtn);

    // Check that selected date is in the future
    if (selectedDate < Date.now()) {
        showMessage('Illegal operation', false);
        return;
    }

    disableElem(datePickerElem);

    // Interval for countdown
    const intervalId = setInterval(() => {
        const countdown = selectedDate - Date.now();
        showTimer(convertMs(countdown));

        if (countdown < 1000) {
            clearInterval(intervalId);
            enableElem(datePickerElem);
            showMessage('Congratilations!', true);
        }
    }, 1000);
}
