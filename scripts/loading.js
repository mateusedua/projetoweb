 export function showLoading(){

    const divPrimari = document.createElement("div");
    const divSecund = document.createElement("div");

    divPrimari.classList.add("loading-div");
    divSecund.classList.add("loading")

    const p = document.createElement("p");
    p.innerText = "Carregando...";

    divPrimari.appendChild(divSecund);
    divPrimari.appendChild(p);

    document.getElementById("main").appendChild(divPrimari);
}

export function hideLoading(){
    const loadings = document.getElementsByClassName("loading-div");
    if(loadings.length){
        loadings[0].remove();
    }
}
