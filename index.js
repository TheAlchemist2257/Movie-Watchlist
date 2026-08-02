
import movieWatchList from "./data.js"

const searchBtn = document.getElementById('search-btn')
const movieInput = document.getElementById('movie-input')
const mainContainer = document.getElementById('main-container')
const storedMovies = JSON.parse(localStorage.getItem("myMovies") || "[]")

if (storedMovies.length) {
    movieWatchList.length = 0
    movieWatchList.push(...storedMovies)
}

mainContainer.addEventListener('click', function(e) {
    const title = e.target.dataset.title
    
        if(title && !movieWatchList.includes(title))   {
             movieWatchList.push(title)
            localStorage.setItem("myMovies", JSON.stringify(movieWatchList))
            e.target.textContent = "✓"
            e.target.disabled = true
        }
       
    
})


searchBtn.addEventListener('click', function() {
    let movieList = ""
    fetch(`https://www.omdbapi.com/?s=${(movieInput.value)}&apikey=4f3d3494`)
    .then(res => res.json())
    .then(data => {
        if(data.Response === 'False') {
            mainContainer.innerHTML = `
                <div class="container">
                    <p class="error-msg">Unable to find what you’re looking for. Please try another search.</p>
                <div>   
            `
        } else {
           data.Search.map(movie => {
            console.log( movie.imdbID)
            fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=4f3d3494&plot=short`)
            .then(res => res.json())
            .then(movieData => {
                const image = 'images/images.jpg'
                console.log(movieData.Poster)
                movieList += `
                <div class="movie-card">
                    <div class="movie-poster">
                            <img src="${movieData.Poster}" onerror="this.onerror=null; this.src='${image}'" alt="${movieData.Title}">
                    </div>
                    <div class="movie-info">
                       <div class="info-container">
                            <h3>${movieData.Title}</h3>
                            <span class="rating">
                                <i class="fa-solid fa-star"></i>
                                ${movieData.imdbRating}
                            </span>
                       </div>
                       <div class="more-info-container">
                            <span class="runtime">${movieData.Runtime}</span>
                            <span class="genre">${movieData.Genre}</span>
                            <span class="watchlist-text">
                            <button class="watchlist-btn" data-title="${movieData.imdbID}">+</button>
                            Watchlist</span>
                       </div>
                       <div class="plot">
                            <p>${movieData.Plot}</p>
                       </div>
                    </div>
                </div>
                `
                document.getElementById("container").style.display = 'none'
                mainContainer.innerHTML = movieList
            })  
             
        })
        }
       
       
    })
})

function escapeHtml(str) {
    const div = document.createElement('div')
    div.textContent = str
    return div.innerHTML
}