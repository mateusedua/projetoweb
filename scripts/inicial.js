firebase.auth().onAuthStateChanged((user)=>{
    if(user){
    window.location.href="home.html"
    }
})

function onLogin (){
    window.location.href="login.html";
}

function onCadastrar(){
    window.location.href="cadastro.html";
}


