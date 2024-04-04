import { updateNav } from '../util.js';

export function displayErrorMessage(message) {
    const msgSpan = document.querySelector('#errorBox .msg');
    msgSpan.textContent = message;
    const errorBox = document.getElementById('errorBox');
    errorBox.style.display = 'block';
    setTimeout(function() {
        errorBox.style.display = 'none';
    }, 3000);
}