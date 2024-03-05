import { form, delayElem, fulfilElem } from './modules/2-refs.js';
import { getMessage, showMessage } from './modules/messages.js';

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();
    const delay = delayElem.value;
    const isFulfilled = fulfilElem.checked;

    const promise = createPromise(delay, isFulfilled);

    promise
        .then(message => {
            showMessage(message, true);
        })
        .catch(message => {
            showMessage(message, false);
        });

    e.target.reset();
}

function createPromise(delay, isActive) {
    const message = getMessage(delay, isActive);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            isActive ? resolve(message) : reject(message);
        }, delay);
    });
}
