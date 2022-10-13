import { logout } from '../scripts/logout.js';
import { showLoading, hideLoading } from './loading.js';
import {alertSucessVacina} from './alerts.js';

let imageSelecionada;
let selecionado;
let uid;

var storage = firebase.storage(); 
var storageRef = storage.ref();

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        uid = user.uid;
    }else{
        window.location.href="inicial.html";
    }
})


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

    dose.forEach(dosevalue =>{
        dosevalue.addEventListener("change",()=>{
           selecionado  = document.querySelector("input[name='dose']:checked");
        });
    })

const submit = document.getElementById("submit");

submit.addEventListener("click",()=>{
    showLoading();
    const datavacina = document.getElementById("data-vascinacao").value;
    const vacina = document.getElementById("vacina").value;
    const dataproxima = document.getElementById("proxima-vacina").value;


    const upload = storageRef.child("comprovante").child(imageSelecionada.name).put(imageSelecionada);

    upload.then((snapshot)=>{
        upload.snapshot.ref.getDownloadURL().then((url)=>{
            const vacinaset = firebase.firestore().collection("vacina");

            vacinaset.add({
                comprovante:url,
                data_proxima:dataproxima,
                data_vacina:datavacina,
                dose:selecionado.value,
                id_vacina:Math.floor(Date.now() * Math.random()).toString(36),
                uid:uid,
                vacina:vacina
            })

            hideLoading();
            alertSucessVacina("Vacina Cadastrada");
        })
    }).catch(error=>{
        hideLoading();
        console.log(error);
    })
})