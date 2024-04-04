import { logout } from './data/users.js';
import { page } from './lib.js';
import { updateNav } from './util.js';
import { showAddChar } from './views/add.js';
import { showDashboard } from './views/dashboard.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHomeView } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';

updateNav();

page('/', showHomeView);
page('/login', showLogin);
page('/register', showRegister);
page('/dashboard', showDashboard);
page('/dashboard/:id', showDetails);
page('/add', showAddChar);
page('/edit/:id', showEdit);

page.start();

document.querySelector('#logoutBtn').addEventListener('click', async () => {
    logout();
    updateNav();
    page.redirect('/');
});