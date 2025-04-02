const apiUrl = "https://pokeapi.co/api/v2/pokemon"
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-container");

 // Home Page
 if(window.location.pathname.includes("index.html")){

    async function fetchData() {

        try{
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
    
            if(!response.ok){
                throw new Error("could not fetch resource")
            }
    
            const data = await response.json();
    
            console.log(data)
    
            const galleryDisplay = document.getElementById("gallery-display");
    
            galleryDisplay.innerHTML = data.results.map( d => 
                `<p>${d.name}</p>`
            ).join("");

            console.log(galleryDisplay)
    
        }
        catch(error){
            console.error(error)
        }
    }

} 

form.addEventListener("submit", e => {
    e.preventDefault();
})

searchInput.addEventListener("keydown", () => {
    searchInput.value.trim();
})

