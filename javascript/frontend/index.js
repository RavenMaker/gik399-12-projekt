/// Här skapar vi funktionalitet för frontenden i JavaScript.
/// Fetches user data from the API and displays it on the webpage.
/*Bootstrap  */
/*import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; gissar på att bootstap inte ska vara kvar nå mer?*/



// frontend för CRUD
// Väntar på delar av färdig backend för vissa delar (endpoints + databas)

"use strict";                                                            //Aktiverar strict mode, tillåter färre slarvfel och ger tydligare felmeddelanden

document.addEventListener("DOMContentLoaded", () => {                    //Väntar på laddning av HTML dokumentet. All kod som jobbar med HTML måste därför ligga här inne
    const form = document.querySelector("#movieForm");                   // Letar upp elementet i HTML <form id="movieForm"> 
    const list = document.querySelector("#movieList");                   // Letar upp elementet i HTML <div id="movieList"></div>

    if (!form || !list) {                                                //kontrollerar om formulär eller lista saknas
        console.warn("Fromulär eller lista saknas i HTML")               
        return;
    }

    //skapa lista via JS
    const ul = document.createElement("ul");                             //Skapar dynamisk lista
    ul.id = "movieListUl";

    list.innerHTML = "";
    list.appendChild(ul);



    // ATT FIXA!!! När backend returnerar data (array av filmer)
    // ska listan renderas här med den bortkommenderade koden data.forEach....)
    //OBS!!! detta ska raderas senare när backend fungerar
    const li = document.createElement("li");                             //Visar visuellt att listan skapats korrekt, är endast ett test och ska tas bort senare
    li.textContent = "Testfilm (listan skapas via JS)";
    ul.appendChild(li);
    //OBS!!! detta ska raderas senare när backend fungerar
    /* Ska ersättas av detta ish senare:
    data.forEach(movie => {
        const li = document.createElement("li");
        li.textContent = `${movie.title} (${movie.year}) – ${movie.category}`;
        ul.appendChild(li);
    });*/



    form.addEventListener("submit", (e) => {                             //När användaren klickar på submit i formuläret körs denna funktion
    e.preventDefault();                                                  //förhindrar att sidan laddas om eftersom projektet kräver att detta stoppas

    //Här ska POST via fetch ske när backend är klar
    console.log("submit klickad - backend ej kopplad ännu");             //bekräftar att submit lyssnaren fungerar och att JS är korrekt kopplat till HMTL
    });

    console.log("frontend JS laddad och redo");                          //Körs när sidan laddas för att bekräfta att JS filen är korrekt länkad - kan tas bort om man vill

     //Fetch GET /resurs (R i CRUD – smått påbörjad)
     //Visar ännu inte data i lista, uppdaterar inte DOM, hanterar inte listan visuellt
    fetch("http://localhost:3000/resurs")                                //Gör anrop till backend och hämtar alla filmer och loggar svaret i console
        .then(response => response.json())                               
        .then(data => {
            console.log("svar från backend:", data);
        })
        .catch(error => {
            console.error("Fel vid fetch", error);
        });
});
