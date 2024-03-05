import successIcon from '../../img/success.svg';
import errorIcon from '../../img/error.svg';

export function getToastOptions(message, isFulfilled) {
    const options = {
        title: isFulfilled ? 'OK' : 'Error',
        titleSize: '16px',
        titleLineHeight: '24px',

        message,
        messageSize: '16px',
        messageLineHeight: '24px',
        messageColor: '#fff',

        iconUrl: isFulfilled ? successIcon : errorIcon,

        backgroundColor: isFulfilled ? '#59a10d' : '#EF4040',
        progressBarColor: isFulfilled ? '#326101' : '#B51B1B',

        theme: 'dark',
        position: 'topRight',
        class: 'message',
    };
    return options;
}
