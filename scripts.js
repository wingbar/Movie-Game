let myLibrary = [];
let apiMovieData = [];


function Movie(title, happy, imdb, tom, meta){
    this.title = title;
    this.happy = happy;
    this.imdb = imdb;
    this.tom = tom;
    this.meta = meta;
  }



if (localStorage.getItem('movies') === null) {
  myLibrary = [];
} else {
  const moviesFromStorage = JSON.parse(localStorage.getItem('movies'));
  myLibrary = moviesFromStorage;
}



$(document).ready(() => {
  $('#next-button').on('click', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});


function movieSelected(id){
  localStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = localStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com?i='+movieId)
    .then((response) => {
      console.log(response);
      let movie = response.data;
    });}


let watchCounter = 0;
let dislikeCounter = 0;
let likeCounter = 0;

function displayMovieInfo() {
  const moviesWatched = document.querySelector('#movies-seen');
  const moviesLiked = document.querySelector('#movies-liked');
  const moviesDisliked = document.querySelector('#movies-disliked');

  const likesTotal = document.querySelectorAll('.checkmark').length;
  const dislikesTotal = document.querySelectorAll('.crossmark').length;

  moviesWatched.textContent = myLibrary.length;
  moviesLiked.textContent = (likesTotal);
  moviesDisliked.textContent = (dislikesTotal);
}


function displayMovies() {
  // local storage saving
  localStorage.setItem('movies', JSON.stringify(myLibrary));
  localStorage.setItem('movies', JSON.stringify(myLibrary));

  displayMovieInfo();
  
  const movieList = document.querySelector('#table-body');
  movieList.textContent = '';
  for (let i = 0; i < myLibrary.length; i += 1) {
    const movieRow = document.createElement('tr');
    movieRow.classList.add('movie-info');
    movieList.appendChild(movieRow);

    const movieTitle = document.createElement('td');
    movieTitle.textContent = myLibrary[i].title;
    movieRow.appendChild(movieTitle);

    const movieStatus = document.createElement('td');
    const happySymbol = document.createElement('holder');

    if (myLibrary[i].happy === true) {
      happySymbol.classList.add('sym', 'checkmark');
      var myImage = new Image(50,50);
      myImage.src = 'images/check.png';
      myImage.classList.add('green')
      happySymbol.appendChild(myImage);

    } else if(myLibrary[i].happy === false){
      happySymbol.classList.add('sym', 'crossmark');
      var myRedImage = new Image(50,50);
      myRedImage.classList.add('red')
      myRedImage.src = 'images/x.png';
      happySymbol.appendChild(myRedImage);
    }
    movieStatus.appendChild(happySymbol);
    movieRow.appendChild(movieStatus);

    const movieDelete = document.createElement('td');
    movieDelete.classList.add('lastTd')
    const deleteSymbol = document.createElement('i');

    if (myLibrary[i].happy === true) {
    deleteSymbol.classList.add('sym', 'ex', 'greenSym');
    deleteSymbol.innerText = 'x'
    } else {
      deleteSymbol.classList.add('sym', 'ex', 'redSym');
      deleteSymbol.innerText = 'x'
    }
    movieDelete.appendChild(deleteSymbol);
    movieRow.appendChild(movieDelete);
  }
}


var data;
function getData(q){
$.get("https://www.omdbapi.com/?t="+q+"&apikey=ba1f4581", function(rawdata){
var rawstring =JSON.stringify(rawdata);
data =JSON.parse(rawstring);
console.log(data);
var titleFetch = data.Title;
var imdbRatingFetch = data.imdbRating; 

movieData = [titleFetch, imdbRatingFetch];
console.log(movieData)
apiMovieData.push(movieData); 
});}



function addMovie(title, happy) {
  getData(title)
  const newMovie = new Movie(title, happy);
  myLibrary.push(newMovie);
  displayMovies();
}

function checkForm(event) {
  const form = document.querySelector('form');
  const titleInput = document.querySelector('#title');

  const radioInputFirst = document.querySelector('input[id="radio-first"]');
  const radioInputSecond = document.querySelector('input[id="radio-second"]');

  if (titleInput.value !== '' ) {
    if (radioInputFirst.checked) {
      addMovie(titleInput.value, true);
      likeCounter++;
    } else if (radioInputSecond.checked) {
      dislikeCounter++;
      addMovie(titleInput.value, false);
    }
    form.reset();
    document.getElementById("movies-liked").checked = true;
  }
}

// Movie removal
function manipModal() {
  const modal = document.querySelector('#modal');
  modal.style.display = 'block';
  modal.addEventListener('click', (event) => {
    const { target } = event;
    if (target.classList.contains('close')) {
      modal.style.display = 'none';
    } else if (target.classList.contains('confirm-removal')) {
      myLibrary = [];
      apiMovieData = [];
      modal.style.display = 'none';
     dislikeCounter = 0;
     likeCounter = 0;
    }
  });
}

function listenClicks() {
  document.addEventListener('click', (event) => {
    const { target } = event;
    const tr = target.parentNode.parentNode.rowIndex - 1;
    if (target.id === 'add-movie') {
      checkForm(event);
      
    } else if (target.id === 'delete-all-btn') {
      manipModal();
    } else if (target.classList.contains('ex')) {
      myLibrary.splice(tr, 1);
        if(target.classList.contains('greenSym')){
        likeCounter--
        } else {
          dislikeCounter--
        }
    } else if (target.classList.contains('checkmark')) {

         $(this).removeClass('checkmark');
         $(this).addClass('crossmark');

      (myLibrary.happy)
    } else if (target.classList.contains('crossmark')) {
      $(this).removeClass('crossmark');
      $(this).addClass('checkmark');
      myLibrary.happy = true
      console.log(myLibrary.happy)
    } else if (target.classList.contains('button_next')){
      var finalStorage = JSON.stringify([movieData]);
      var write = require('fs');
      write.writeFile('package.json', finalStorage);
    }
    displayMovies();
  });
} 


document.getElementById("content-checkbox")
   .addEventListener("change", function() {
       if(this.checked){
       document.getElementById("secondary-inputs").hidden = false;
       } else {
        document.getElementById("secondary-inputs").hidden = true;
       }
      });
      



function switchGame(){
    document.getElementById("hideable").style = 'display: none';
    
    document.getElementById("movies-list").style = 'display: none';
    document.getElementById("library-content").hidden = true;
    document.getElementById('gameWrapper').style = 'display: block';
    $.getScript("gamescript.js")
}


displayMovies();
listenClicks();
displayMovieInfo();