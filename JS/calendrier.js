function creerMoisCalendrier(mois, annee){
    let calendrier = [];

    const nbJours = new Date(annee, mois, 0).getDate();

    for(let i = 0; i < nbJours; i++){
        calendrier.push(new Date(annee, mois-1, i + 1));
    }

    return calendrier;
}

function ajouterJourCalendrier(jour, permanences){
    const jourDiv = document.createElement('div');
    jourDiv.className='jour';

    const numeroJour = document.createElement('span');
    numeroJour.textContent = jour;
    jourDiv.appendChild(numeroJour);

    for (let perm of permanences) {
    const p = document.createElement('p');
    p.className = 'perm';
    p.textContent = perm.matiere;
    
    const salle = document.createElement('span');
    salle.textContent = perm.salle;
    
    const heure = document.createElement('span');
    heure.textContent = perm.heureDebut + ' - ' + perm.heureFin;
    
    p.appendChild(document.createElement('br'));
    p.appendChild(salle);
    p.appendChild(document.createElement('br'));
    p.appendChild(heure);
    
    jourDiv.appendChild(p);
    }
    const calendrierContenu = document.getElementById('contenu_calendier');
    calendrierContenu.appendChild(jourDiv);
}

async function fetchJSON(path) {
    // Tiré du TP sur le Chatbot, modifié en fonction des besoins du calendrier
    return fetch(path) 
        .then(response => {           
            if (!response.ok) {                 
                throw new Error('Network response was not ok'); 
            }
            return response.json();
        }) 
        .then(data => {  
            if (Object.keys(data).length === 0 && data.constructor === Object) { 
                throw new Error('Empty JSON or malformed JSON'); 
            } 
            return data.data;
        }) 
        .catch(error => { 
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}


function permanencesDuJour(date, data){
    let permanences = [];
    let jour = date.getDate();
    let mois = date.getMonth() +1;
    for(let permanence of data){
        if(permanence.mois === mois && permanence.jour === jour){
            permanences.push(permanence);
        }
    }
    console.log(permanences);
    return permanences;
}


function remplirCalendrier(mois,annee, data){
    const jours=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
    let datePremierJour = new Date(annee,mois-1,1);
    let nomPremierJour = jours[datePremierJour.getDay()];
    console.log(datePremierJour);
    let positionPremierJour = (datePremierJour.getDay() +6) % 7;
    let calendrier = creerMoisCalendrier(mois,annee);
    
    let calendrierContenu = document.getElementById('contenu_calendier');
    calendrierContenu.innerHTML=''; // réinitialisation quand on change de mois
    for(let i=0;i<positionPremierJour;i++){ //on ajoute les jours vides au début
        ajouterJourCalendrier('---', []);
    }
    
    // Ajouter les jours du mois
    for(let date of calendrier){
        let permanencesJour = permanencesDuJour(date, data);
        
        ajouterJourCalendrier(date.getDate(), permanencesJour);
    }
    const nbJours = calendrier.length;
    const joursRestants = 7- positionPremierJour- nbJours%7; // nombre de cases à remplir à le fin du mois

    for(let i=0;i<joursRestants;i++){
        ajouterJourCalendrier('---', []);
    }
    
}



const input = document.getElementById('selecteurMois');
input.addEventListener('change', () => {
    fetchJSON('../DATA/permanences/permanences.json')
    .then(data => {
        const input = document.getElementById('selecteurMois');
        input.addEventListener('change', () => {
            const valeur = input.value.split('-');
            const annee = parseInt(valeur[0]);
            const mois = parseInt(valeur[1]);
            remplirCalendrier(mois, annee, data);
        });
    });
});


fetchJSON('../DATA/permanences/permanences.json')
    .then(data => {
        const input = document.getElementById('selecteurMois');
        input.addEventListener('change', () => {
            const [annee, mois] = input.value.split('-').map(Number);
            remplirCalendrier(mois, annee, data);
        });
        input.dispatchEvent(new Event('change')); // ← déclenche l'event au chargement
    });