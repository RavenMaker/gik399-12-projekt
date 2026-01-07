/// Här skapar vi funktionalitet för frontenden i JavaScript.
/// Fetches user data from the API and displays it on the webpage.
/*Bootstrap  */
/*import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; gissar på att bootstap inte ska vara kvar nå mer?*/



// frontend för CRUD
// Väntar på färdig backend (endpoints + databas)

"use strict";                                                            //Aktiverar strict mode, tillåter färre slarvfel och ger tydligare felmeddelanden

document.addEventListener("DOMContentLoaded", () => {                    //Väntar på laddning av HTML dokumentet. All kod som jobbar med HTML måste därför ligga här inne
    const form = document.querySelector("#movieForm");                   // Letar upp elementet i HTML <form id="movieForm"> 
    const list = document.querySelector("#movieList");                   // Letar upp elementet i HTML <div id="movieList"></div>

    if (!form || !list) {                                                //kontrollerar om form eller list saknas
        console.warn("Fromulär eller lista saknas i HTML")               
        return;
    }

form.addEventListener("submit", (e) => {                                 //När användaren klickar på submit i formuläret körs denna funktion
    e.preventDefault();                                                  //förhindrar att sidan laddas om eftersom projektet kräver att detta stoppas
    //Här ska POST via fetch ske när backend är klar
    console.log("submit klickad - backend ej kopplad ännu");             //bekräftar att submit lyssnaren fungerar och att JS är korrekt kopplat till HMTL
});

//Här ska Get via fetch ske när backend är klar
fetch("http://localhost:3000/resurs")
console.log("frontend JS laddad och redo");                              //Körs när sidan laddas för atrt se att JS filen är korrekt länkad
});
