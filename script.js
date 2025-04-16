const apiUrl = "https://pokeapi.co/api/v2/pokemon"
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-container");
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
const searchMenu = document.querySelector(".search-menu");
const offScreenSearchMenu = document.querySelector(".off-screen-search-menu");

// Hamburger Menu
hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active"); 
});

// Form 
form.addEventListener("submit", e => {
    e.preventDefault();
})

// Search Input & Query
searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter"){
        const query = searchInput.value.trim();

        if(query){
            const encodedQuery = encodeURIComponent(query);
            window.location.href = `search-results.html?query=${encodedQuery}`;
        }
    }
})

// Search Results
if(window.location.pathname.includes("search-results.html")){

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");

    async function fetchPokemonData(){
        
        try{
            const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${query}`);

            if(!pokemonRes.ok || !speciesRes.ok){
                console.error("could not fetch resource")
            }

            const pokemonData = await pokemonRes.json();
            const speciesData = await speciesRes.json();

            const searchResultsDisplay = document.getElementById("search-results-display");
            searchResultsDisplay.innerHTML = `
                <h1 id="search-results-header">${pokemonData.name} #${pokemonData.id}</h1>
                <div id="left-column-box">
                    <div id="search-results-img-box">
                        <img src="${pokemonData.sprites.front_default}">
                    </div>
                    <div>
                    <canvas id="myChart"></canvas>
                    </div>
                </div>
                <div id="desc-box">
                    <h3>Description</h3>
                    <p>${speciesData.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text}</p>
                    <h3>Types</h3>
                    <div id="types-box">
                    </div>
                    <h3>Physical Attributes</h3>
                    <span class="attributes">Height: ${pokemonData.height}</span>
                    <span class="attributes">Weight: ${pokemonData.weight}</span>
                </div>
            `;

            const typesBox = document.getElementById("types-box");
            const searchTypes = pokemonData.types.map(t => t.type.name);

            searchTypes.forEach(type => {
                const searchTypeSpan = document.createElement("span");
                searchTypeSpan.className = `search-results-type-span ${type}`;
                searchTypeSpan.textContent = type;
                typesBox.appendChild(searchTypeSpan)
            });

            const ctx = document.getElementById('myChart');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Hp', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
                    datasets: [{
                        label: 'Stats',
                        data: pokemonData.stats.map(stat => stat.base_stat),
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.8)",  // HP - Red
                            "rgba(255, 159, 64, 0.8)",  // Attack - Orange
                            "rgba(255, 205, 86, 0.8)",  // Defense - Yellow
                            "rgba(75, 192, 192, 0.8)",  // Special Attack - Teal
                            "rgba(54, 162, 235, 0.8)",  // Special Defense - Blue
                            "rgba(153, 102, 255, 0.8)"  // Speed - Purple
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    indexAxis: 'y',
                    plugins: {
                        legend: { display: false } 
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { display: false },
                            ticks: { color: "black", font: { weight: 'bold' } },
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: "black" }
                        },
                    }
                }
            });
        }
        catch(error){
            console.error(error);
        }
    }
    fetchPokemonData();
}

// Random Page 
const randomLinks = document.querySelectorAll(".random");
const randomNumber = Math.floor(Math.random() * 1025) + 1;
randomLinks.forEach(link => {
    link.href = `/search-results.html?query=${randomNumber}`;
});

// Pokedex Page 
if(window.location.pathname.includes("pokedex.html")){
    const pokedexDisplay = document.getElementById("pokedex-display");

    async function getAllPokemon() {
        const pokedexRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
        const pokedexData = await pokedexRes.json();

        const fragment = document.createDocumentFragment();

        const promises = pokedexData.results.map(async (pokemon) => {
            const pokemonDetailRes = await fetch(pokemon.url);
            const pokemonDetailData = await pokemonDetailRes.json();

            const name = pokemonDetailData.name;
            const img = pokemonDetailData.sprites.front_default;
            const types = pokemonDetailData.types.map(t => t.type.name);
            img.loading = "lazy";

            const card = document.createElement("div");
            card.className = "card";

            card.addEventListener("click", () => {
                window.location.href = `/search-results.html?query=${name}`
            });

            const cardImg = document.createElement("img");
            cardImg.src = img;

            const cardName = document.createElement("p");
            cardName.textContent = name;

            const typeContainer = document.createElement("div");
            typeContainer.className = "type-container"
            types.forEach(type => {
                const typeSpan = document.createElement("span");
                typeSpan.className = `type ${type}`;
                typeSpan.textContent = type;
                typeContainer.appendChild(typeSpan);
            });

            card.appendChild(cardImg);
            card.appendChild(cardName);
            card.appendChild(typeContainer);
            pokedexDisplay.appendChild(card);

        })

        await Promise.all(promises);
        pokedexDisplay.appendChild(fragment);
    }

    getAllPokemon();
}


