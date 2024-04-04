import { register } from '../data/users.js';
import { html, page, render } from '../lib.js';
import { createSubmitHandler, updateNav } from '../util.js';

const registerView = (onRegister) => html`
  <section id="register">

    <div class="form">
        <img class="border" src="./images/border.png" alt="">
        <h2>Register</h2>
        <form class="register-form" @submit=${onRegister}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
        <img class="border" src="./images/border.png" alt="">
    </div>

  </section>
`;

export function showRegister() {
    render(registerView(createSubmitHandler(onRegister)));
}

async function onRegister(info, form){
    if(!info['email'] || !info['password']) {
        return alert('All fields are required!');
    }
    if(info['password'] != info['re-password']){
        return alert('Passwords don\'t match!');
    }

    await register(info['email'], info['password']);
    updateNav();
    page.redirect('/');
}