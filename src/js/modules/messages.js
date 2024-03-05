// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import { getToastOptions } from './izitoast-options.js';

export function getMessage(delay, isActive) {
    let message = isActive ? `Fulfilled` : `Rejected`;
    message += ` promise in ${+delay}ms`;
    return message;
}
export function showMessage(message, isFulfilled) {
    iziToast.show(getToastOptions(message, isFulfilled));
}
