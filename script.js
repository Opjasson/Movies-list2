// Using fetch
// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function () {
//     const inputKeyword = document.querySelector(".input-keyword");
//     fetch(
//         "http://www.omdbapi.com/?i=tt3896198&apikey=520bb745&s=" +
//             inputKeyword.value
//     )
//         .then((response) => response.json())
//         .then((response) => {
//             const movies = response.Search;
//             let cards = "";
//             movies.forEach((m) => (cards += showCards(m)));

//             const movieContainer = document.querySelector(".movie-container");
//             movieContainer.innerHTML = cards;

//             // Ketika tombol detail di klik
//             const modalDetailButton = document.querySelectorAll(
//                 ".modal-detail-button"
//             );
//             modalDetailButton.forEach((btn) => {
//                 btn.addEventListener("click", function () {
//                     const imdbid = this.dataset.imdbid;
//                     fetch("http://www.omdbapi.com/?apikey=520bb745&i=" + imdbid)
//                         .then((response) => response.json())
//                         .then((m) => {
//                             console.log(m);

//                             const movieDetail = showMovieDetail(m);
//                             const modalBody = document.querySelector('.modal-body');
//                             modalBody.innerHTML = movieDetail;
//                         });
//                 });
//             });
//         });
// });

// async dan await

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {

    try{
        const inputKeyword = document.querySelector(".input-keyword");
    
        const movies = await getMovies(inputKeyword.value);
        console.log(movies)
        updateUI(movies);

    }catch (err){
        alert(err)
    }
});

// Ketika tombol detail diklik
// event binding
document.addEventListener("click", async function (e) {
    if (e.target.classList.contains("modal-detail-button")) {
        
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateUIDetail(movieDetail);
    }
});

function getMovieDetail(imdbid) {
    return fetch("http://www.omdbapi.com/?apikey=520bb745&i=" + imdbid)
            .then(response => response.json())
            .then(m => m)
};

function updateUIDetail(m) {
    const movieDetail = showMovieDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}

function getMovies(keyword) {
    return fetch(
        "http://www.omdbapi.com/?apikey=520bb745&s=" + keyword
    )
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then(response => {
            if( response.Response === "False"){
                console.log(response)
                throw new Error(response.Error)
            }
            return response.Search
        });
}

function updateUI(movies) {
    let cards = "";
    movies.forEach(m => cards += showCards(m));

    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}

function showCards(m) {
    return ` <div class="col-md-4 my-5">
                    <div class="card"">
                    <img src="${m.Poster}" class="card-img-top" alt="">
                        <div class="card-body">
                          <h5 class="card-title">${m.Title}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                          <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
                            data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                        </div>
                      </div>
                </div>`;
}

function showMovieDetail(m) {
    return `
                            
                                <div class="row">
                                    <div class="col-md-3">
                                        <img src="${m.Poster}" class="img-fluid" alt="" />
                                    </div>
                                        <div class="col-md">
                                            <ul class="list-group">
                                                <li class="list-group-item">
                                                    <h4>${m.Title} (${m.Year})</h4>
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>Director : </strong> ${m.Director}
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>Actors : </strong> ${m.Actors}
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>Writer : </strong> ${m.Writer}
                                                </li>
                                                <li class="list-group-item">
                                                    <strong>Plot : </strong> ${m.Plot}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                            </div>`;
}
