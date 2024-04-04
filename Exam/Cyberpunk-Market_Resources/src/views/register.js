import { displayErrorMessage } from '../data/errMsg.js';
import { register } from '../data/users.js';
import { html, page, render } from '../lib.js';
import { createSubmitHandler, updateNav } from '../util.js';

const registerTemplate = (onRegister) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form class="register-form" @submit=${onRegister}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>
`;

export function showRegister() {
    render(registerTemplate(createSubmitHandler(onRegister)));
}

async function onRegister(data, form){

    const email = data['email'];
    const password = data['password'];
    const rePass = data['re-password'];

    if(!email || !password || password != rePass) {
        throw displayErrorMessage('Passwords don\'t match!');
    }

    await register(email, password);
    updateNav();
    page.redirect('/');
}