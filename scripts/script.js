"use strict";

// API
const api_Key = "api_key=f741ac48cd013b413e892b2a09ccf12c";
const base_Url = "https://api.themoviedb.org/3";
const api_Url = base_Url + "/discover/movie?sort_by=popularity.desc&" + api_Key;
const img_Url = "https://image.tmdb.org/t/p/w500";
const search_Url = base_Url + "/search/movie?" + api_Key;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Function Get Movie
getMovies(api_Url);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      showMovies(data.results);
    });
}

// Function Show Movie

function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
          <img
        src="${img_Url + poster_path}"
        alt="${title}">

      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>

      <div class="overview">

        <h3>Overview</h3>
${overview}
      </div>
    `;

    main.appendChild(movieEl);
  });
}

// Function Get Color

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// Search Event
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(search_Url + "&query=" + searchTerm);
  } else {
    getMovies(api_Url);
  }
});
