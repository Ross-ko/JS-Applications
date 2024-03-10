document.querySelector("a[id='home']").classList.add("active");
document.querySelector('#logout').addEventListener('click', onLogout)

const userNav = document.querySelector('#user');
const guestNav = document.querySelector('#guest')

let userData = JSON.parse(sessionStorage.getItem("userData"));
const logoutURL = 'http://localhost:3030/users/logout';



updateNav();

function updateNav(){
    if (userData) {
        document.querySelector("nav p span").textContent = userData.email;
        userNav.style.display = 'inline-block';
        guestNav.style.display = 'none'
      } else {
        document.querySelector("nav p span").textContent = "guest";
        userNav.style.display = 'none';
        guestNav.style.display = 'inline-block'
      }
}

async function onLogout(event) {
    let options = {
        method: 'get',
        headers: {
            'X-Authorization': userData.accessToken
        }
    }

    await fetch(logoutURL, options)
    sessionStorage.clear();
    userData = null;
    updateNav();
}