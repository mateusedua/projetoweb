import {showLoading,hideLoading} from '../scripts/loading.js';

export function logout(){
    showLoading();
    firebase.auth().signOut().then(()=>{
        hideLoading();
        window.location.href = "inicial.html"
    }).catch(error =>{
        console.log(error);
    })
}