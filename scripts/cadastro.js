const submit = document.getElementById("submit");
import {alertSuccess} from './alerts.js';
import {showLoading,hideLoading} from './loading.js';

submit.addEventListener("click", () => {
    showLoading();
    const nome = document.getElementById("nome").value;
    const sexo = document.getElementById("sexo").value;
    const data_nascimento = document.getElementById("nascimento").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const confirmar_senha = document.getElementById("confirmar").value;

    const loadings = document.getElementsByTagName("p");

    if (loadings.length) {
        loadings[0].remove();
    }

    const errorEmail = document.getElementsByTagName("p");
    if(errorEmail.length){
        errorEmail[0].remove();
    }

    if (senha.localeCompare(confirmar_senha) != 0) {
        const p = document.createElement("p");
        p.innerText = "Senha não confere!";
        document.getElementById("error-confirmar").appendChild(p);
        hideLoading();
    }

    if(senha.localeCompare(confirmar_senha) == 0){
        firebase.auth().createUserWithEmailAndPassword(email,senha).then(data=>{
            const uid = data.user.uid;

            const users = firebase.firestore().collection("users");

            users.doc(uid).set({
                nome:nome,
                sexo:sexo,
                nascimento:data_nascimento
            })
            hideLoading();
            alertSuccess("Cadastro realizado!","login.html");
        }).catch(error =>{
            getError(error);
            hideLoading();
        })
    }
})

const confirmar_senha_select = document.getElementById("confirmar");
confirmar_senha_select.addEventListener("click", () => {
    const loadings = document.getElementsByTagName("p");
    if (loadings.length) {
        loadings[0].remove();
    }
})

const clickEmail = document.getElementById("email");

clickEmail.addEventListener("click",()=>{
    const errorEmail = document.getElementsByTagName("p");
    if(errorEmail.length){
        errorEmail[0].remove();
    }
})

function getError (error){
    if(error.code == "auth/email-already-in-use"){
        const p = document.createElement("p");
        p.innerText = "Email já está em uso.";
        document.getElementById("error-email").appendChild(p);
    }
}