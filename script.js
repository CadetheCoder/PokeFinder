const searchBtn = document.getElementById("search-btn");
const apiUrl = "https://pokeapi.co/api/v2/pokemon"

async function fetchData() {
    
    try{

        const pokemonName = document.getElementById("pokemonName").value.toLowerCase()
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("could not fetch resource")
        }

        const data = await response.json();
        // name
        const pokemonNameElement = document.getElementById("pokemon-name-element");
        pokemonNameElement.textContent = data.name
        // img sprite
        const pokemonSprite = document.getElementById("sprites");
        pokemonSprite.src = data.sprites.front_default
        

    }
    catch(error){
        console.error(error)
    }
}

searchBtn.addEventListener("click", e => {
    e.preventDefault();
    fetchData();
})