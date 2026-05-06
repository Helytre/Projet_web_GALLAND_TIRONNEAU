

function remplirCalendrier(mois,annee){
    const jours=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
    let datePremierJour = new Date(annee,mois-1,1);
    let nomPremierJour = jours[datePremierJour.getDay()];
    console.log(datePremierJour);
    let positionPremierJour = (datePremierJour.getDay() +6) % 7;
    let calendrier = creerMoisCalendrier(mois,annee);
    
    let calendrierContenu = document.getElementById('contenu_calendier');
    for(let i=0;i<positionPremierJour;i++){ //on ajoute les jours vides au début
        const jourVide = document.createElement('div');
        jourVide.className='jour';
        jourVide.textContent="---";
        calendrierContenu.appendChild(jourVide);
    }
    
    // Ajouter les vrais jours du mois
    for(let date of calendrier){
        const jourDiv = document.createElement('div');
        jourDiv.className='jour';
        jourDiv.textContent = date.getDate();
        console.log(date);
        calendrierContenu.appendChild(jourDiv);
    }
    
}


function creerMoisCalendrier(mois, annee){
    let calendrier = [];

    const nbJours = new Date(annee, mois, 0).getDate();

    for(let i = 0; i < nbJours; i++){
        calendrier.push(new Date(annee, mois-1, i + 1));
    }

    return calendrier;
}


remplirCalendrier(4,2026);
