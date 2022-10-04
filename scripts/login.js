import {showLoading,hideLoading} from './loading.js';
const submit = document.getElementById("submit")

submit.addEventListener('click',()=>{
    showLoading();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

   firebase.auth().signInWithEmailAndPassword(email, password)
  .then(response => {
    hideLoading();
    window.location.href="home.html";
  }).catch((error) => {
    hideLoading();
    getErrorLogin(error);
  });

})

const inputEmail = document.getElementById("email");

inputEmail.addEventListener("click",()=>{
  const loadings = document.getElementsByTagName("p");
  if(loadings.length){
      loadings[0].remove();
  }
})

const inputPass = document.getElementById("password");

inputPass.addEventListener("click",()=>{
  const loadings = document.getElementsByTagName("p");
  if(loadings.length){
      loadings[0].remove();
  }
})

//Esqueceu senha
const clicou = document.getElementById("recuparacao");

clicou.addEventListener('click',()=>{
    window.location.href="esqueceu-senha.html";
});

function getErrorLogin(error){
  if(error.code){
    const p = document.createElement("p");
    p.innerText = "E-mail e/ou senha inválidos.";

    document.getElementById("error-login").appendChild(p);
  }
}
