// Pokedex Page 
if(window.location.pathname.includes("pokedex.html")){
    const pokedexDisplay = document.getElementById("pokedex-display");

    async function getAllPokemon() {
        const pokedexRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
        const pokedexData = await pokedexRes.json();

        const promises = pokedexData.results.map(async (pokemon) => {
            const pokemonDetailRes = await fetch(pokemon.url);
            const pokemonDetailData = await pokemonDetailRes.json();

            const name = pokemonDetailData.name;
            const img = pokemonDetailData.sprites.front_default;
            const types = pokemonDetailData.types.map(t => t.type.name).join(" ");
            img.loading = "lazy";

            pokedexDisplay.innerHTML += `
            <a href="/search-results.html?query=${name}">
                <div class="card">
                    <img src="${img}">
                    <p>${name}</p>
                </div>
            </a>`

        })
    }

    getAllPokemon();
}