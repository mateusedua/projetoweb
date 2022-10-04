import {showLoading,hideLoading} from './loading.js';
import {alertSuccess} from './alerts.js';

const submit = document.getElementById("submit");

submit.addEventListener("click",()=>{
    showLoading();
    const email = document.getElementById("email").value;
    firebase.auth().sendPasswordResetEmail(email).then(()=>{
        hideLoading();
        alertSuccess("Email enviado! Caso não encontrar verificar caixa de span!","login.html");
    }).catch(error =>{
        hideLoading();
        getError(error);
    });
})

const inputEmail = document.getElementById("email");

inputEmail.addEventListener("click",()=>{
    const loadings = document.getElementsByClassName("recuperar");
    if(loadings.length){
        loadings[0].remove();
    }
})

function getError(error){
    if(error.code == "auth/user-not-found"){
        const div = document.createElement("div");
        const p = document.createElement("p");

        div.classList.add("recuperar");

        p.innerText = "Email não encontrado.";

        div.appendChild(p);

        document.getElementById("main").appendChild(div);
    }
    
   console.log(error.message);
}
