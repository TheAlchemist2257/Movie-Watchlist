import movieWatchList from "./data.js"
const watchlistContainer = document.getElementById('watchlist-container')
const storedMovies = JSON.parse(localStorage.getItem("myMovies") || "[]")

if (storedMovies.length) {
    movieWatchList.length = 0
    movieWatchList.push(...storedMovies)
}
console.log(movieWatchList)
watchlistContainer.addEventListener('click', function(e) {
    const remove = e.target.dataset.remove
    
    if(movieWatchList.includes(remove)) {
            const isThere = movieWatchList.indexOf(remove)
            movieWatchList.splice(isThere, 1)
            localStorage.setItem('myMovies', JSON.stringify(movieWatchList))
         
    }    
        
    if(movieWatchList.length === 0) {
            localStorage.removeItem("myMovies")
            watchlistContainer.innerHTML = `
            <div id="container" class="container">
                <p>Your watchlist is looking a little empty...</p>
                <span>
                    <button class="watchlist-btn" id="add-watchlist">
                        <a href="index.html">+</a>
                    </button> Let’s add some movies!
                </span>
            </div>
            `
        } else {
            getWatchList(movieWatchList)
        }
    
    
})

 function getWatchList(watchlist) {

    
    let watchlistMovies = ''
    watchlist.forEach(movie => {
        fetch(`https://www.omdbapi.com/?i=${movie}&apikey=4f3d3494&plot=short`)
        .then(res => res.json())
        .then(data => {
            const image = 'images/images.jpg'
            watchlistMovies += `
                <div class="movie-card">
                    <div class="movie-poster">
                         <img src="${data.Poster} " onerror="this.onerror=null; this.src='${image}'"  alt="${data.Title}">
                    </div>
                    <div class="movie-info">
                       <div class="info-container">
                            <h3>${data.Title}</h3>
                            <span class="rating">
                                <i class="fa-solid fa-star"></i>
                                ${data.imdbRating}
                            </span>
                       </div>
                       <div class="more-info-container">
                            <span class="runtime">${data.Runtime}</span>
                            <span class="genre">${data.Genre}</span>
                            <span class="watchlist-text">
                            <button class="watchlist-btn" data-remove="${data.imdbID}">-</button>
                            Remove</span>
                       </div>
                       <div class="plot">
                            <p>${data.Plot}</p>
                       </div>
                    </div>
                </div>
                `
                if(movieWatchList.length !== 0) {
                    watchlistContainer.innerHTML = watchlistMovies
                }
                
        })
    });
    
        

    
}

getWatchList(movieWatchList)