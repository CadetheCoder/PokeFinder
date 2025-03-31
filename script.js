const apiUrl = "https://pokeapi.co/api/v2/pokemon"
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-container");

form.addEventListener("submit", e => {
    e.preventDefault();
})

searchInput.addEventListener("keydown", () => {
    searchInput.value.trim();
})

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
        pokemonNameElement.textContent = data.name;
        
        // img sprite
        const pokemonSprite = document.getElementById("sprites");
        pokemonSprite.src = data.sprites.front_default;

        // height
        const pokemonHeightElement = document.getElementById("height");
        pokemonHeightElement.textContent = `Height: ${data.height}`;

        // weight
        const pokemonWeightElement = document.getElementById("weight");
        pokemonWeightElement.textContent = `Weight: ${data.weight}`;

        // types
        const pokemonTypesElement = document.getElementById("types");
        if(data.types[0] && data.types[1]){
            pokemonTypesElement.textContent = `Types: ${data.types[0].type.name}, ${data.types[1].type.name}`
        } 
        else{
           pokemonTypesElement.textContent = `Type: ${data.types[0].type.name}`
        }

        // abilites
        const pokemonAbilitiesElement = document.getElementById("abilities");
        if(data.abilities[0] && data.abilities[1]){
            pokemonAbilitiesElement.textContent = `Abilties: ${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}`
        }
        else {
            pokemonAbilitiesElement.textContent = `Abiltiy: ${data.abilities[0].ability.name}`
        }

         //hp 
        const pokemonHpElement = document.getElementById("hp");
        pokemonHpElement.textContent = `Hp: ${data.stats[0].base_stat}`;

        // attack 
        const pokemonAttackElement = document.getElementById("attack");
        pokemonAttackElement.textContent = `Attack: ${data.stats[1].base_stat}`;

        // defense 
        const pokemonDefenseElement = document.getElementById("defense");
        pokemonDefenseElement.textContent = `Defense: ${data.stats[2].base_stat}`;

        // special attack
        const pokemonSpecialAttackElement = document.getElementById("special-attack");
        pokemonSpecialAttackElement.textContent = `Special Attack: ${data.stats[3].base_stat}`;

        // special defense
        const pokemonSpecialDefenseElement = document.getElementById("special-defense");
        pokemonSpecialDefenseElement.textContent = `Special Defense: ${data.stats[4].base_stat}`;

        // speed
        const pokemonSpeedElement = document.getElementById("speed");
        pokemonSpeedElement.textContent = `Speed: ${data.stats[5].base_stat}`;

    }
    catch(error){
        console.error(error)
    }
}

