const apiUrl = "https://pokeapi.co/api/v2/pokemon"
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-container");

// Form 
form.addEventListener("submit", e => {
    e.preventDefault();
})

 // Home Page
 if(window.location.pathname.includes("index.html")){

    async function fetchGalleryData() {

        try{
            const galleryResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
            if(!galleryResponse.ok){
                throw new Error("could not fetch resource")
            }
            const data = await galleryResponse.json();
            const galleryDisplay = document.getElementById("gallery-display");
            galleryDisplay.innerHTML = data.results.map( d => 
                `<a href="/search-results.html?query=${encodeURIComponent(d.name)}" id="gallery-link">
                <h3>${d.name}</h3>
                </a>`
            ).join("");
        }
        catch(error){
            console.error(error)
        }
    }

    fetchGalleryData()

} 

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
    
        try{
            
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    
            if(!response.ok){
                throw new Error("could not fetch resource")
            }
    
            const data = await response.json();

            const searchResultsDisplay = document.getElementById("search-results-display");

            searchResultsDisplay.innerHTML =`
            <h3>${data.name} #${data.id}</h3>
            <div id="search-results-img-box">
                <img src="${data.sprites.front_default}">
            </div>
            
            <div>
                <canvas id="myChart"></canvas>
            </div>

            <div></div>
            `
            const ctx = document.getElementById('myChart');

            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: ['Hp', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
                datasets: [{
                  label: 'Stats',
                  data: [`${data.stats[0].base_stat}`,
                         `${data.stats[1].base_stat}`,
                         `${data.stats[2].base_stat}`,
                         `${data.stats[3].base_stat}`,
                         `${data.stats[4].base_stat}`,
                         `${data.stats[5].base_stat}`,
                        ],
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
                    grid: {display: false},
                    ticks: { color: "black", font: { weight: 'bold' } },
                  },
                  x: {
                    grid: {display: false},
                    ticks: { color: "black"}
                  },
                }
              }
            });
            
        }
        catch(error){
            console.error(error);
        }
    }

    fetchData()
}

    



