import {logout} from '../scripts/logout.js';
const inputLogout = document.getElementById("button-logout");

inputLogout.addEventListener("click",()=>{
    logout();
})

