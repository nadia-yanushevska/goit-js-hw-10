// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('[js-form]');
const delayElem = form.querySelector('[js-delay]');
const fulfilElem = form.querySelector('[js-fulfil]');

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

function getMessage(delay, isActive) {
    let message = isActive ? `✅ Fulfilled` : `❌ Rejected`;
    message += ` promise in ${+delay}ms`;
    return message;
}

function showMessage(message, isFulfilled) {
    console.log(message);

    iziToast.show(getToastOptions(message, isFulfilled));
}

function getToastOptions(message, isFulfilled) {
    const options = {
        title: isFulfilled ? 'OK' : 'Error',
        titleSize: '16px',
        titleLineHeight: '24px',

        message: message.slice(2),
        messageSize: '16px',
        messageLineHeight: '24px',
        messageColor: '#fff',

        icon: 'icon icon-success',
        // iconUrl: `<use href="/img/sprite.svg#icon-success"></use>`,
        iconColor: '#fff',

        backgroundColor: isFulfilled ? '#59a10d' : '#EF4040',
        progressBarColor: isFulfilled ? '#326101' : '#B51B1B',

        theme: 'dark',
        position: 'topRight',
        class: 'message',
    };
    return options;
}
