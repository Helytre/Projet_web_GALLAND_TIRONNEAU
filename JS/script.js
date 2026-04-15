function afficherCategorie(id) {
    var element = document.getElementById(id);
    var contenu = element.getElementsByClassName("contenu")[0];
    var h2 = element.querySelector("h2");
    console.log(contenu);
    if (contenu.style.opacity==="0" || contenu.style.opacity==="") {
        contenu.style.maxHeight = "5000px";
        contenu.style.opacity = "1";
        h2.innerHTML = h2.innerHTML.replace("▼", "▲");
    } else {
        contenu.style.maxHeight = "0";
        contenu.style.opacity = "0";
        h2.innerHTML = h2.innerHTML.replace("▲", "▼");
    }
}