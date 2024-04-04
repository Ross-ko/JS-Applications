import { logout } from './data/users.js';
import { page } from './lib.js';
import { updateNav } from './util.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showMarket } from './views/market.js';
import { showRegister } from './views/register.js';
import { showSell } from './views/sell.js';


updateNav();

page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/market', showMarket);
page('/sell', showSell);
page('/market/:id', showDetails);
page('/edit/:id', showEdit);

page.start();

document.getElementById('logoutNavBtn').addEventListener('click', async () => {
    logout();
    updateNav();
    page.redirect('/');
});