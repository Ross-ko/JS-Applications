import { logout } from './data/users.js';
import { page } from './lib.js';
import { updateNav } from './util.js';
import { showAddMotorcycle } from './views/add.js';
import { showDashboard } from './views/dashboard.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHomeView } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showSearch } from './views/search.js';

updateNav();

page('/', showHomeView);
page('/register', showRegister);
page('/login', showLogin);
page('/dashboard', showDashboard);
page('/dashboard/:id', showDetails);
page('/add', showAddMotorcycle);
page('/edit/:id', showEdit);
page('/search', showSearch);

page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    logout();
    updateNav();
    page.redirect('/');
});