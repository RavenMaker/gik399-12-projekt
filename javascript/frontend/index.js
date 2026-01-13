/// Här skapar vi funktionalitet för frontenden i JavaScript.
/// Fetches user data from the API and displays it on the webpage.
/*Bootstrap  */
/*import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; gissar på att bootstap inte ska vara kvar nå mer?*/

// frontend för CRUD
// Väntar på delar av färdig backend för vissa delar (endpoints + databas)





"use strict";                                                            //Aktiverar strict mode, tillåter färre slarvfel och ger tydligare felmeddelanden

document.addEventListener("DOMContentLoaded", () => {

    //Väntar på laddning av HTML dokumentet. All kod som jobbar med HTML måste därför ligga här inne
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

    // === Funktion för knapptext ===
    function updateSubmitButtonText() {
        const button = form.querySelector("button[type='submit']");
        if (form.dataset.editId) {
            button.textContent = "Uppdatera film"; 
            button.className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600";                      //Ändra knapptext vid edit läge
        } else {
            button.textContent = "Lägg till  ny film";
            button.className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600";                       //Standard knapptext
        }
    }

    updateSubmitButtonText();                                            //Anropa funktionen för att sätta initial knapptext


    // == Rendera filmer i listan == 
    // === Tar emot en array med film objekt och uppdaterar DOM
    function renderMovieList(movies) {                                   //Funktion som tar emot data inte fetchar själv = återanvändbar
        ul.innerHTML = "";                                               //Tömmer lista innan ny rendering (krav att lista ska alltid ha aktiv data)

        movies.forEach(movie => {                                        //loopar igenom varje film)
            const li = document.createElement("li");
            li.className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center justify-between"; //lägg till lite styling med tailwind

            //texten för filmen
            const text = document.createElement("span");
            text.textContent = `${movie.title} (${movie.year}) - ${movie.category}`;
            text.className = "font-medium text-lg text-gray-800 mx-4";
            //Ta bort knapp
            const deleteBtn= document.createElement("button");
            deleteBtn.textContent ="Ta bort";
            deleteBtn.className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600";

            //Klick lyssnare för ta bort
            deleteBtn.addEventListener("click", () => {
                fetch(`/movies/${movie.id}`, {
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(() => {
                    fetchMovies();
                });
            });

            //Ändra knapp
            const editBtn = document.createElement("button");
            editBtn.textContent = "Ändra";
            editBtn.className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600";

            editBtn.addEventListener("click", () => {
                //fyll formulär med filmens data
                document.querySelector("#title").value = movie.title;
                document.querySelector("#year").value = movie.year;
                document.querySelector("#category").value = movie.category;

                //spara id osynligt på formuläret (för PUT senare)
                form.dataset.editId = movie.id;
                
                updateSubmitButtonText();                                   //Uppdatera knapptexten när vi går in i edit läge

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

 //Fetch GET /movies (R i CRUD)
    function fetchMovies(){
        fetch("/movies")                                //Gör anrop till backend och hämtar alla filmer och loggar svaret i console
            .then(res => res.json())                               
            .then(data => renderMovieList(data))                                       //Ta datan jag fick och visa den på sidan)
            .catch(error => console.error("Fel vid fetch", error));
    } 

 // === Hantera formulär submit (CREATE + UPDATE) === 
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


        // == UPDATE Ändrar befintlig film ===
        if (form.dataset.editId) {
            const id = form.dataset.editId;

            fetch(`/movies/${id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(movie)
            })

                .then(res => res.json())
                .then(() => {
                    delete form.dataset.editId;
                    form.reset();
                    fetchMovies();
                });
        }

        // == Skapa ny film ==
        else {
            fetch("/movies", { 
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(movie)
            })

            .then(res => res.json())
            .then(() => {
                form.reset();
                fetchMovies();
            });
        }
    });

    console.log("frontend JS laddad och redo");                         //Körs när sidan laddas för att bekräfta att JS filen är korrekt länkad - kan tas bort om man vill

    fetchMovies();
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
// [x] Alla förändringar ska uppdatera innehåll utan reload

// ------------------------------------------------------
// 2. VISA ALLA – READ (R i CRUD)
// ------------------------------------------------------
// [x] Lista skapas via JavaScript (ul/li)
// [x] Listan finns inte hårdkodad i HTML
// [x] Funktion finns för att rendera lista (renderMovieList)
// [x] GET /movies kopplas till renderMovieList(data)
// [x] Varje film ska renderas från backend-data
// [x] id ska lagras osynligt (t.ex. data-id på li)
// [x] Någon egenskap ska påverka design (CSS-klass)
// [x] Listan ska uppdateras efter CREATE / UPDATE / DELETE
// [ ] (Valfritt) Klick på film för detaljvy
// [x] Knappar för ÄNDRA / TA BORT per film

// ------------------------------------------------------
// 3. UPPDATERA RESURS – UPDATE (U i CRUD)
// ------------------------------------------------------
// [X] Ändra-knapp per film
// [X] Klick fyller formuläret med befintlig data
// [ ] GET /movies/:id vid behov
// [X] Filmens id sparas osynligt (t.ex. dataset eller localStorage)
// [x] Submit skickar PUT istället för POST

// ------------------------------------------------------
// 4. TA BORT RESURS – DELETE (D i CRUD)
// ------------------------------------------------------
// [x] Ta bort-knapp per film
// [x] DELETE /movies/:id via fetch
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
// [x] POST /movies via fetch (CREATE)
// [x] PUT /movies/:id via fetch (UPDATE)
// [x] JSON.stringify(movie) används i body
// [ ] Meddelande visas efter svar
// [x] Listan uppdateras dynamiskt efter svar

// ------------------------------------------------------
// 7. MEDDELANDERUTA / FEEDBACK
// ------------------------------------------------------
// [ ] Meddelanderuta finns (t.ex. Bootstrap modal)
// [ ] Visas vid CREATE
// [ ] Visas vid UPDATE
// [ ] Visas vid DELETE
// [ ] Text kan komma från backend-response
