let questionList = apiMovieData;
var plays = 0;


 function toggleDisplay(){
  document.getElementById("hideall").style = 'display: block';
  document.getElementById("game-card").hidden = true;
  playGame()
}

function getCurrentQuestion(){
  currentQuestion = (questionList[plays]);
  console.log(currentQuestion)
}

  var correctAnswers = 0;
  var incorrectAnswers = 0;
 
  
  function getImdbRating(movieType) {
    correctRating = movieType[1];
    console.log(correctRating)
  }




  function displayQuestion(movieType){
      qspan.innerText = ("What is the IMDB rating for " + movieType[0] + "?")
 
  }



     document.addEventListener('click', (event) => {
      const { target } = event;
      const tr = target.parentNode.parentNode.rowIndex - 1;
        if (target.id === 'nextPop') {
          playGame()
          sliderValue = 0;
          plays++
       } else if (target.id === ('submit')) {
         getValue()
            if(sliderValue == correctRating){
              correctAnswers++
              console.log(correctAnswers)
            } else {
              incorrectAnswers++
              console.log(incorrectAnswers)
            }
       }
      });
    
  
document

var imdbSlid = document.getElementById("imdbslider");


imdbSlid.innerHTML = imdbslider.value;

var sliderOutput = document.getElementById("imdbslider");
sliderOutput.innerHTML = imdbslider.value;

imdbslider.oninput = function() {
  imdbspan.innerHTML = this.value;
  
}


function getValue(){
  sliderValue = imdbslider.value;
  console.log(sliderValue)
}

function playGame(){
  getCurrentQuestion();
  if (plays === apiMovieData.length){
    displayResults();
  } else {
    getImdbRating(currentQuestion);
    displayQuestion(currentQuestion);
  }
}

 incorrectSpan = document.getElementById("incor");
 correctSpan = document.getElementById("corr");
 resultsDiv = document.getElementById("results-div")

function displayResults(){

  incorrectSpan.innerText = incorrectAnswers;
  correctSpan.innerText = correctAnswers;
 resultsDiv.style = 'display: block';
};