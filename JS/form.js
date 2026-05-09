function envoyer(){
    const cgu = document.getElementById('cgu');
    if(!cgu.checked){
        alert("Il faut accepter les conditions d'utilisation ! (Nous savons que vous ne les lirez pas de toute façon)")
    }
    else{
        window.location.href = "formulaire_envoye.html";
    }
}