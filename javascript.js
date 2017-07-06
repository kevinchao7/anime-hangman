// Variables to grab html elements
var hangTries = document.getElementById('hangTries');
var hangElement = document.getElementById('hangWord');
var hangPic = document.getElementById('hangPicture');
var winsElement = document.getElementById('wins');
var guessElement = document.getElementById('lettersGuessed');

// Links to images
var picArray = ["https://static.comicvine.com/uploads/original/11113/111130700/3694823-0344551340-36742.jpg", "https://art-s.nflximg.net/ec9bc/4bf2bf91cde41c879e26e438751cdf4df7aec9bc.jpg", "https://d2kmm3vx031a1h.cloudfront.net/HmWDsHkfTFyShq7GqbE1_b01.png", "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-447823.jpg", "http://assets1.ignimgs.com/2017/03/01/nierautomata-1280-1-1488398963732_1280w.jpg", "http://geekandsundry.com/wp-content/uploads/2016/03/JPEG-Promo-15.jpg", "https://s3.amazonaws.com/media.tdl/16908_berserk_animereviewf.jpg", "http://static.zerochan.net/Steins%3BGate.full.1097371.jpg", "https://art-s.nflximg.net/65c04/e1055fc3a12751cfc2f48162df3be0c014365c04.jpg", "http://assets1.ignimgs.com/2017/03/23/deathnote-1280-1490294885083_1280w.jpg", "http://blog.honeyfeed.fm/wp-content/uploads/2015/01/onepiece-wallpaper-20160724205402-560x380.jpg", "http://cdn.mmohuts.com/wp-content/uploads/2016/11/dragonball-z-online-features.png"];

// Word Selction
var hangWords = ["attack on titan", "sword art online", "one punch man", "gantz", "nier automata", "full metal alchemist", "berserk", "steins gate", "naruto", "death note", "one piece", "dragon ball z"];



// Amount of tries left
var maxTries = 15;
var tries = maxTries;

// Win counter
var wins = 0;


// Default tries left element
hangTries.innerHTML = "You have " + tries + " tries left.";

// Generates random number between 0 and length of array
var numArray = [];
var randomNumber;
genRandom();

// Arrays
var hangArray = hangWords[randomNumber].split('');
var answerArray = new Array(hangArray.length);
var arrLength = hangArray.length;
var guessArray = new Array();

// Initialize game
removeSpaces();
updateAnswer();

// function to update Picture
function updatePic(){
  hangPic.innerHTML = "<img src=" + picArray[randomNumber] + ">";
}

// fucntion to generate random number
function genRandom(){
  if (numArray.length >= hangWords.length - 1){
    numArray = [];
  }

  randomNumber = Math.floor((Math.random() * hangWords.length));

  var count = 0;
  while (numArray.indexOf(randomNumber) !== -1 && count < 100){
    randomNumber = Math.floor((Math.random() * hangWords.length));
    console.log("Im in a while loop.");
    count++;
  }

  numArray.push(randomNumber);
}

// function for updating the answer
function updateAnswer(){
  hangElement.innerHTML = "";

  for(var i = 0; i < arrLength; i++){
    if (answerArray[i] === undefined && hangWords[randomNumber].split('')[i] !== " ")
      hangElement.innerHTML = hangElement.innerHTML + " _ ";
    else if (hangArray[i] === undefined)
      hangElement.innerHTML = hangElement.innerHTML + " &nbsp " ;
    else
      hangElement.innerHTML = hangElement.innerHTML + " " + answerArray[i] + " ";
  }

  guessElement.innerHTML = "Letters guessed: ";

  for (var i = 0; i < guessArray.length; i++){
    if (i === 0)
      guessElement.innerHTML = guessElement.innerHTML + guessArray[i];
    else
      guessElement.innerHTML = guessElement.innerHTML + ", " + guessArray[i];
  }


}

// function to remove spaces and replace with undefined in hangWord
function removeSpaces(){
  for (var i = 0; i < arrLength; i++){
    if (hangArray[i] == " ")
      hangArray[i] = undefined;
  }
}

// function to reset
function resetGame(){
  updatePic();
  tries = maxTries;
  genRandom();
  hangArray = hangWords[randomNumber].split('');
  arrLength = hangArray.length;
  removeSpaces();
  guessArray = [];
  answerArray =[];
  answerArray.length = arrLength;
  winsElement.innerHTML = "Wins: " + wins;
  updateAnswer();
}

// Function invoked when key is pressed
document.onkeypress = function(evt) {
  var key = evt.key.toLowerCase();
  if(tries > 0 && /^[a-zA-Z]$/g.test(key)){ //checks if tries are greater than zero and if the key pressed is a-z.

    // Checks if you guessed wrong and decrements your tries.
    if(hangArray.indexOf(key) === -1 && guessArray.indexOf(key) === -1 && answerArray.indexOf(key) === -1 && hangWords[randomNumber] !== answerArray.join('')){
      tries--;
      guessArray.push(key);
    }

    for (var i = 0; i < hangArray.length; i++){
      if (hangArray[i] === key){
        hangArray[i] = "";
        answerArray[i] = key
      }
    }
    updateAnswer();


    // reset if Win!
    if (hangWords[randomNumber].replace(/\s/g, '') === answerArray.join('')){
      wins++;
      resetGame();
    }
    else if (tries === 0){
      wins = 0;
      resetGame();
    }

    hangTries.innerHTML = "You have " + tries + " tries left.";

  }
};
