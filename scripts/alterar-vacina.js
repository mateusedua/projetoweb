import { logout } from '../scripts/logout.js';
import { showLoading, hideLoading } from './loading.js';
import {alertSucessVacina} from './alerts.js';

let imageSelecionada;
let selecionado;
let uid;

var storage = firebase.storage();
var storageRef = storage.ref();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid;
    } else {
        window.location.href = "inicial.html";
    }
})

const id = getID();

findVacina(id);

function getID() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function findVacina(id) {
    showLoading();

    firebase.firestore()
        .collection("vacina")
        .doc(id)
        .get()
        .then(doc => {
            hideLoading()
            carregar(doc.data());
        })
}


function carregar(transaction) {
    const datavacina = document.getElementById("data-vascinacao");
    const dose = document.querySelector(`input[value="${transaction.dose}"]`);
    const vacina = document.getElementById("vacina");
    const dataproxima = document.getElementById("proxima-vacina");
    const img = document.getElementById("file_upload");

    img.src = transaction.comprovante;

    dose.checked = true;

    datavacina.value = transaction.data_vacina;
    vacina.value = transaction.vacina;
    dataproxima.value = transaction.data_proxima;
}

const inputLogout = document.getElementById("button-logout");

inputLogout.addEventListener("click", () => {
    logout();
})

const vacinas = document.getElementById("minhas-vacina");

vacinas.addEventListener("click", () => {
    showLoading();
    window.location.href = "home.html";
    hideLoading();
});

const comprovante = document.getElementById("comprovante");

comprovante.addEventListener("change", (event) => {

    const input = event.target;

    if (input.files && input.files[0]) {

        imageSelecionada = input.files[0];

        const reader = new FileReader();

        reader.onload = (e) => {
            $('#file_upload').attr('src', e.target.result)
        }

        reader.readAsDataURL(input.files[0])
    }
})

const dose = document.querySelectorAll("input[name='dose']");

dose.forEach(dosevalue => {
    dosevalue.addEventListener("change", () => {
        selecionado = document.querySelector("input[name='dose']:checked");
    });
})

const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
    showLoading();
    const datavacina = document.getElementById("data-vascinacao").value;
    const vacina = document.getElementById("vacina").value;
    const dataproxima = document.getElementById("proxima-vacina").value;
    const imagem = document.getElementById("file_upload");


    if(imageSelecionada){
        const upload = storageRef.child("comprovante").child(imageSelecionada.name).put(imageSelecionada);

        upload.then((snapshot) => {
            upload.snapshot.ref.getDownloadURL().then((url) => {
                const vacinaset = firebase.firestore().collection("vacina");
    
                vacinaset
                    .doc(getID())
                    .update({
                        comprovante: url,
                        data_proxima: dataproxima,
                        data_vacina: datavacina,
                        dose: selecionado.value,
                        vacina: vacina
                    })
    
                hideLoading();
                alertSucessVacina("Vacina Atualizada");
            })
        }).catch(error => {
            hideLoading();
            console.log(error);
        })        
    }else if(selecionado){
        const vacinaset = firebase.firestore().collection("vacina");
    
        vacinaset
            .doc(getID())
            .update({
                comprovante: imagem.src,
                data_proxima: dataproxima,
                data_vacina: datavacina,
                dose:selecionado.value,
                vacina: vacina
            })
            hideLoading();
            alertSucessVacina("Vacina Atualizada");
    }else{
        const vacinaset = firebase.firestore().collection("vacina");
    
        vacinaset
            .doc(getID())
            .update({
                comprovante: imagem.src,
                data_proxima: dataproxima,
                data_vacina: datavacina,
                vacina: vacina
            })
            hideLoading();
            alertSucessVacina("Vacina Atualizada");
    }

})

const excluir = document.getElementById("excluir");

excluir.addEventListener("click",()=>{
    const divAlert = document.createElement("div");
    const divBody = document.createElement("div");
    const divMessage = document.createElement("div");
    const divButton = document.createElement("div");
    const spanMessage = document.createElement("span");
    const inputSim = document.createElement("input");
    const inputNao = document.createElement("input");

    divAlert.classList.add("alert");
    divBody.classList.add("alert-body");
    divMessage.classList.add("message");
    divButton.classList.add("alert-button");

    inputSim.id = "sim";
    inputNao.id = "nao";

    inputSim.type = "button";
    inputNao.type = "button";
    
    inputSim.value = "SIM";
    inputNao.value = "CANCELAR";

    spanMessage.innerText = "Tem certeza que deseja remover essa vacina?"
    divMessage.appendChild(spanMessage);

    divButton.appendChild(inputSim);
    divButton.appendChild(inputNao);

    divBody.appendChild(divMessage);
    divBody.appendChild(divButton);

    divAlert.appendChild(divBody);

    document.getElementById("main").appendChild(divAlert);

    const cancelar = document.getElementById("nao");

    cancelar.addEventListener("click",()=>{
        divAlert.style.display = "none";
    })

    const excluirSim = document.getElementById("sim");

    excluirSim.addEventListener("click",()=>{
        firebase.firestore()
        .collection("vacina")
        .doc(getID())
        .delete()
        .then(()=>{
            window.location.href = "home.html"
        })
    })
})