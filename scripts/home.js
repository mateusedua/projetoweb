import { logout } from '../scripts/logout.js';
import { showLoading, hideLoading } from './loading.js';

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        findVacinas(user.uid);
    } else {
        window.location.href = "inicial.html";
    }
})

function findVacinas(uid){
    showLoading();
    firebase.firestore()
    .collection('vacina')
    .where('uid','==',uid)
    .get()
    .then(vacinas =>{
        hideLoading();
        const transaction = vacinas.docs.map(doc => ({
            ...doc.data(),
            id: doc._delegate._key.path.segments[6]
        }));
        addLista(transaction);
    })
}

const inputLogout = document.getElementById("button-logout");

inputLogout.addEventListener("click", () => {
    logout();
})

const bootonheader = document.getElementById("button-header");

bootonheader.addEventListener("click",()=>{
    window.location.href = "home.html";
})

const buttonfooter = document.getElementById("button-footer");

buttonfooter.addEventListener("click", () => {
    showLoading();
    window.location.href = "nova-vacina.html";
    hideLoading();
});

function addLista(transaction) {
    const lista = document.getElementById("lista");

   transaction.forEach(transaction => {
        var dataVacinaFormat = new Date(transaction.data_vacina);
        var dataProximaFormat = new Date(transaction.data_proxima);

        const li = document.createElement("li");

        li.addEventListener("click",()=>{
            window.location.href="alterar-vacina.html?id="+transaction.id;
        })

        const divVacina = document.createElement("div");
        const spanVacina = document.createElement("span");
        const divDose = document.createElement("div");
        const divDoseInterna = document.createElement("div");
        const spanDose = document.createElement("span");
        const divDataVacina = document.createElement("div");
        const spanDataVacina = document.createElement("span");
        const divComprovante = document.createElement("div");
        const imgComprovante = document.createElement("img");
        const divProximaDose = document.createElement("div");
        const divProximaDoseInterna = document.createElement("div");
        const spanProximaDose = document.createElement("span");

        divVacina.classList.add("dose","first");

        divVacina.appendChild(spanVacina);
        spanVacina.innerText = transaction.vacina;
        spanVacina.style.color = "#3F92C5";
        spanVacina.style.fontSize = "25px"

        divDose.classList.add("dose");
        
        divDoseInterna.classList.add("dose-interna");
        spanDose.innerText = transaction.dose;

        divDose.appendChild(divDoseInterna);
        divDoseInterna.appendChild(spanDose);

        divDataVacina.classList.add("dose");
        spanDataVacina.innerText = dataVacinaFormat.toLocaleDateString('pt-br');
        spanDataVacina.style.color= "#8B8B8B";
        divDataVacina.appendChild(spanDataVacina);

        divComprovante.classList.add("dose");

        imgComprovante.src = transaction.comprovante;
        imgComprovante.width=200;
        imgComprovante.height=120;
        divComprovante.appendChild(imgComprovante);

        if(transaction.data_proxima){
            spanProximaDose.innerText = "Próxima dose em: " + dataProximaFormat.toLocaleDateString('pt-br');
        }else{
            spanProximaDose.innerText = "Não há próxima dose";
        }
        
        divProximaDoseInterna.classList.add("interna-proxima")
        
        divProximaDoseInterna.appendChild(spanProximaDose);

        divProximaDose.appendChild(divProximaDoseInterna);


        li.appendChild(divVacina);
        li.appendChild(divDose);
        li.appendChild(divDataVacina);
        li.appendChild(divComprovante);
        li.appendChild(divProximaDose);

        lista.appendChild(li);
   });
}


const pesquisar = document.getElementById("pesquisar");

pesquisar.oninput = () =>{
    const li = document.querySelectorAll("li");
    
    const digitado = pesquisar.value.toLowerCase();

    Array.from(li).forEach((li)=>{
        const valorElemento = li.getElementsByClassName("first");

        const elemento = valorElemento[0].textContent.toLocaleLowerCase();

          if(elemento.includes(digitado)){
              li.style.display = "block";
          }else{
              li.style.display = "none";
          }
    })
}