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

function next_scroll(id,id_progress){
    const element = document.getElementById(id);
    const scrolling = element.offsetWidth*0.5;
    element.scrollBy({top:0, left:scrolling, behavior:"smooth"});

    const progress = document.getElementById(id_progress);
    const curr = progress.getElementsByClassName("progress_current")[0];
    const next = curr.nextElementSibling;
    if(next != null){
        curr.className = "progress";
        next.className = "progress_current";
    }
}

function prev_scroll(id,id_progress){
    const element = document.getElementById(id);
    const scrolling = -element.offsetWidth*0.5;
    element.scrollBy({top:0, left:scrolling, behavior:"smooth"});

    const progress = document.getElementById(id_progress);
    const curr = progress.getElementsByClassName("progress_current")[0];
    const prev = curr.previousElementSibling;
    if(prev != null){
        curr.className = "progress";
        prev.className = "progress_current";
    }
}

function resizing(){
    const width = document.getElementById("carousel_1").offsetWidth;
    const progress_parent = document.getElementById("carousel_1_progress");
    const n = (5*480)/(width*0.5);
    var progress_child = document.createElement('p');
    progress_child.className = "progress";
    console.log(n, width);
    var i = 2;
    while(n>i) {
        progress_child_n = progress_child.cloneNode(true);
        progress_parent.appendChild(progress_child_n);
        i = i + 1;
        console.log(i);
    }
}

window.addEventListener("load", resizing);