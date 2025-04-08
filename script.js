const apiUrl = "https://pokeapi.co/api/v2/pokemon"
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-container");
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

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

    async function fetchData() {
        try {
            const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${query}`;
            const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${query}`;
    
            // Fetch both URLs simultaneously
            const [pokemonResponse, speciesResponse] = await Promise.all([
                fetch(pokemonUrl),
                fetch(speciesUrl)
            ]);
    
            if (!pokemonResponse.ok || !speciesResponse.ok) {
                throw new Error("Could not fetch resource");
            }
    
            const pokemonData = await pokemonResponse.json();
            const speciesData = await speciesResponse.json();
    
            updateUI(pokemonData, speciesData);
    
        } catch (error) {
            console.error(error);
        }
    }
    
    // Function to update UI with the data
    function updateUI(pokemonData, speciesData) {
        const searchResultsDisplay = document.getElementById("search-results-display");
    
        searchResultsDisplay.innerHTML = `
            <p id="search-results-header">${pokemonData.name} #${pokemonData.id}</p>
            <div id="search-results-img-box">
                <img src="${pokemonData.sprites.front_default}">
            </div>
    
            <div id="desc-box">
                <p>${speciesData.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text}</p>
                <div id="height-box">

                    <p>Height: ${pokemonData.height}</p>
                    <p>Weight: ${pokemonData.weight}</p>

                    <div id="types-box">

                        <p></p>
                        <p id="types"></p>

                    </div>

                </div>
            </div>

             <div>
                <canvas id="myChart"></canvas>
            </div>

           
        `;

        const pokemonTypesElement = document.getElementById("types");
        if(pokemonData.types[0] && pokemonData.types[1]){
            pokemonTypesElement.textContent = `Types: ${pokemonData.types[0].type.name}, ${pokemonData.types[1].type.name}`
        } 
        else{
           pokemonTypesElement.textContent = `${pokemonData.types[0].type.name}`
        }
    
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
    
    // Call the function
    fetchData();
    
}

// Random Page 
const random = document.getElementById("random");
const randomNumber = Math.floor(Math.random() * 1025) + 1;
random.href = `/search-results.html?query=${randomNumber}`;

if(window.location.pathname.includes("pokedex.html")){
    const pokedexDisplay = document.getElementById("pokedex-display");

    async function fetchPokedexData(){

        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

            if(!response.ok){
                throw new Error("Could not fetch resource");
            }

            const data = await response.json();
            
        }
        catch(error){
            console.error(error);
        }
    }

}




