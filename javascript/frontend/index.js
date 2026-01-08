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

    //Rendera filmer i listan
    // Tar emot en array med film objekt och uppdaterar DOM
    function renderMovieList(movies) {                                   //Funktion som tar emot data inte fetchar själv = återanvändbar
        ul.innerHTML = "";                                               //Tömmer lista innan ny rendering (krav att lista ska alltid ha aktiv data)

        movies.forEach(movie => {                                        //loopar igenom varje film)
            const li = document.createElement("li");

            //texten för filmen
            const text = document.createElement("span");
            text.textContent = `${movie.title} (${movie.year}) - ${movie.category}`;

            //Ta bort knapp
            const deleteBtn= document.createElement("button");
            deleteBtn.textContent ="Ta bort";

            //Klick lyssnare för ta bort
            deleteBtn.addEventListener("click", () => {
                console.log("Ta bort film med id:", movie.id);

                //Tar bort raden visuellt på frontend
                li.remove();
            });

            //Ändra knapp
            const editBtn = document.createElement("button");
            editBtn.textContent = "Ändra";

            editBtn.addEventListener("click", () => {
                //fyll formulär med filmens data
                document.querySelector("#title").value = movie.title;
                document.querySelector("#year").value = movie.year;
                document.querySelector("#category").value = movie.category;

                //spara id osynligt på formuläret (för PUT senare)
                form.dataset.editId = movie.id;

                console.log("redigerar film med id:", movie.id);
            });

            //osynligt id för senare DELETE/UPDATE
            li.dataset.id =movie.id;    
                                            
            //bygger listan
            li.appendChild(text);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);

            //lägger till i listan
            ul.appendChild(li);
        });
    }

    form.addEventListener("submit", (e) => {                             //När användaren klickar på submit i formuläret körs denna funktion
        e.preventDefault();                                              //förhindrar att sidan laddas om eftersom projektet kräver att detta stoppas

        // Hämtar värden från formuläret
        const titleValue = document.querySelector("#title").value;
        const yearValue = document.querySelector("#year").value;         
        const categoryValue = document.querySelector("#category").value; 
       
        //Samlar formulärdata i ett objekt
        const movie = {
            title: titleValue,
            year: yearValue,
            category: categoryValue
        };

        //Ändrar befintlig
        if (form.dataset.editId) {
            const id = form.dataset.editId;

            console.log("Ska uppdatera film med id", id);
            console.log("Uppdaterad data:", movie);

            //Här kommer PUT /resurs/:id senare
            // fetch(`/resurs/${id}`, { method: "PUT", body: JSON.stringify(movie) })

            //Avsluta edit läge
            delete form.dataset.editId;
        }
        //Skapa läge (Ny film)
        else {
            console.log("Ska skapa ny film:");
            console.log("Ny film:", movie);

            //Här kommer POST / resurs senare
            // fetch("/resurs", { method: "POST", body: JSON.stringify(movie) })
        }

        //Rensar formuläret efter submit
        form.reset();
    });

    console.log("frontend JS laddad och redo");                          //Körs när sidan laddas för att bekräfta att JS filen är korrekt länkad - kan tas bort om man vill

     //Fetch GET /resurs (R i CRUD)
     // OBS: FETCH ÄR TILLFÄLLIGT AVSTÄNGD – BACKEND EJ KLAR
     /*
     fetch("http://localhost:3000/resurs")                                //Gör anrop till backend och hämtar alla filmer och loggar svaret i console
        .then(response => response.json())                               
        .then(data => {
            console.log("svar från backend:", data);
            renderMovieList(data);                                       //Ta datan jag fick och visa den på sidan
        })
        .catch(error => {
            console.error("Fel vid fetch", error);
        });*/

    //TESTDATA (OBS!!!TAS BORT när BACKEND ÄR KLAR och avmarker då FETCH som är avstängd ovanför)
            //Simulerar svar från Get/resurs
    const testMovies = [
        { id: 1, title: "Alien", year: 1979, category: "Sci-Fi" },
        { id: 2, title: "The Godfather", year: 1972, category: "Drama" },
        { id: 3, title: "Mad Max", year: 2015, category: "Action" }
        ];
        //Tillfällig rendering för verifiering av frontend
        renderMovieList(testMovies);
});

// ======================================================
// FRONTEND – CHECKLISTA ENLIGT UPPGIFTSKRAV (GIK339)
// ======================================================
//  X = avklarade delar
// ------------------------------------------------------
// 1. GENERELLT
// ------------------------------------------------------
// [x] JavaScript körs efter DOMContentLoaded
// [x] Ingen sidladdning vid formulärsubmit (preventDefault)
// [x] DOM manipuleras dynamiskt (createElement, appendChild)
// [x] fetch() används för kommunikation med backend
// [ ] Alla förändringar ska uppdatera innehåll utan reload (pågående)  (Blir klar när CREATE/UPDATE uppdaterar listan)

// ------------------------------------------------------
// 2. VISA ALLA – READ (R i CRUD)
// ------------------------------------------------------
// [x] Lista skapas via JavaScript (ul/li)
// [x] Listan finns inte hårdkodad i HTML
// [x] Funktion finns för att rendera lista (renderMovieList)
// [ ] GET /resurs kopplas till renderMovieList(data)
// [ ] Varje film ska renderas från backend-data
// [x] id ska lagras osynligt (t.ex. data-id på li)
// [ ] Någon egenskap ska påverka design (CSS-klass)
// [ ] Listan ska uppdateras efter CREATE / UPDATE / DELETE (pågående)
// [ ] (Valfritt) Klick på film för detaljvy
// [x] Knappar för ÄNDRA / TA BORT per film

// ------------------------------------------------------
// 3. UPPDATERA RESURS – UPDATE (U i CRUD)
// ------------------------------------------------------
// [X] Ändra-knapp per film
// [X] Klick fyller formuläret med befintlig data
// [ ] GET /resurs/:id vid behov
// [X] Filmens id sparas osynligt (t.ex. dataset eller localStorage)
// [ ] Submit skickar PUT istället för POST

// ------------------------------------------------------
// 4. TA BORT RESURS – DELETE (D i CRUD)
// ------------------------------------------------------
// [x] Ta bort-knapp per film
// [ ] DELETE /resurs/:id via fetch
// [x] id hämtas från klickad film
// [ ] Meddelande visas efter borttagning
// [x] Listan uppdateras utan sidladdning

// ------------------------------------------------------
// 5. FORMULÄR
// ------------------------------------------------------
// [x] Formulär finns i HTML
// [x] Alla fält utom id finns
// [x] Rätt input-typer används (text, number)
// [ ] (Valfritt) Validering av fält

// ------------------------------------------------------
// 6. SKICKA FORMULÄR – CREATE & UPDATE (C + U i CRUD)
// ------------------------------------------------------
// [x] Submit-eventlyssnare finns
// [x] Formulärdata samlas i objekt
// [ ] POST /resurs via fetch (CREATE)
// [ ] PUT /resurs/:id via fetch (UPDATE)
// [ ] JSON.stringify(movie) används i body
// [ ] Meddelande visas efter svar
// [ ] Listan uppdateras dynamiskt efter svar

// ------------------------------------------------------
// 7. MEDDELANDERUTA / FEEDBACK
// ------------------------------------------------------
// [ ] Meddelanderuta finns (t.ex. Bootstrap modal)
// [ ] Visas vid CREATE
// [ ] Visas vid UPDATE
// [ ] Visas vid DELETE
// [ ] Text kan komma från backend-response
