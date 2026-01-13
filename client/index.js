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
    ul.className = "movie-list-ul";
    list.innerHTML = ""; 
    list.appendChild(ul); 

    // === Funktion för knapptext ===
    function updateSubmitButtonText() {
        const button = form.querySelector("button[type='submit']");
        if (form.dataset.editId && button.textContent==="Lägg till  ny film") {                                      //Kollar om vi är i edit läge
            button.textContent = "Uppdatera film"; 
            button.className="btn-update";                      //Ändra knapptext vid edit läge
        } else {
            button.textContent = "Lägg till  ny film";
            button.className="btn-add";                       //Standard knapptext
        }
    }

    updateSubmitButtonText();                                            //Anropa funktionen för att sätta initial knapptext


    // == Rendera filmer i listan == 
    // === Tar emot en array med film objekt och uppdaterar DOM
    function renderMovieList(movies) {                                   //Funktion som tar emot data inte fetchar själv = återanvändbar
        ul.innerHTML = "";                                               //Tömmer lista innan ny rendering (krav att lista ska alltid ha aktiv data)

        movies.forEach(movie => {                                        //loopar igenom varje film)
            const li = document.createElement("li");
            li.className="movie-item";

            //texten för filmen
            const text = document.createElement("span");
            text.textContent = `${movie.title} (${movie.year}) - ${movie.category}`;
            text.className = "movie-text";
            //Ta bort knapp
            const deleteBtn= document.createElement("button");
            deleteBtn.textContent ="Ta bort";
            deleteBtn.className="btn-remove";

            //Klick lyssnare för ta bort
            deleteBtn.addEventListener("click", () => {
                fetch(`/movies/${movie.id}`, {
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(() => {
                    fetchMovies();
                    ResonsPopUp("Film borttagen!");
                });
            });

            //Ändra knapp
            const editBtn = document.createElement("button");
            editBtn.textContent = "Ändra";
            editBtn.className="btn-change";

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
            const actions = document.createElement('div');
            actions.className = 'movie-actions';
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);

            li.appendChild(text);
            li.appendChild(actions);

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
                    ResonsPopUp("Film uppdaterad!");
                });
        }else {
            fetch("/movies", { 
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(movie)
            })

            .then(res => res.json())
            .then(() => {
                form.reset();
                fetchMovies();
                ResonsPopUp("Ny film tillagd!");
            });
        }
        updateSubmitButtonText(); 
    });

    console.log("frontend JS laddad och redo");                         //Körs när sidan laddas för att bekräfta att JS filen är korrekt länkad - kan tas bort om man vill

    fetchMovies();

    // === Funtion för status popup ===
    function ResonsPopUp(txt) {
        document.getElementById("respons-PopUp").innerHTML = "Status: "+txt;
        setTimeout(() => {
            document.getElementById("respons-PopUp").innerHTML = "Status:";
        }, 5000);
    }   
});

