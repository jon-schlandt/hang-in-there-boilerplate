// Query Selectors
var imageEl = document.querySelector(".poster-img");
var titleEl = document.querySelector(".poster-title");
var quoteEl = document.querySelector(".poster-quote");

var mainSection = document.querySelector(".main-poster");
var makePosterSection = document.querySelector(".poster-form");
var savedPostersSection = document.querySelector(".saved-posters");
var savedPostersGrid = document.querySelector(".saved-posters-grid");

var savePosterButton = document.querySelector(".save-poster");
var randomizePosterButton = document.querySelector(".show-random");
var showFormButton = document.querySelector(".show-form");
var showSavedPostersButton = document.querySelector(".show-saved");
var takeMeBackButton = document.querySelector(".show-main");
var backToMainButton = document.querySelector(".back-to-main");
var makePosterButton = document.querySelector(".make-poster");

var posterImageUrl = document.querySelector("#poster-image-url");
var posterTitle = document.querySelector("#poster-title");
var posterQuote = document.querySelector("#poster-quote");

// Data
var images = [
  "./assets/bees.jpg",
  "./assets/bridge.jpg",
  "./assets/butterfly.jpg",
  "./assets/cliff.jpg",
  "./assets/elephant.jpg",
  "./assets/flock.jpg",
  "./assets/fox.jpg",
  "./assets/frog.jpg",
  "./assets/horse.jpg",
  "./assets/lion.jpg",
  "./assets/mountain.jpg",
  "./assets/pier.jpg",
  "./assets/puffins.jpg",
  "./assets/pug.jpg",
  "./assets/runner.jpg",
  "./assets/squirrel.jpg",
  "./assets/tiger.jpg",
  "./assets/turtle.jpg"
];
var titles = [
  "determination",
  "success",
  "inspiration",
  "perspiration",
  "grit",
  "empathy",
  "feelings",
  "hope",
  "believe",
  "try",
  "conviction",
  "accomplishment",
  "achievement",
  "ambition",
  "clarity",
  "challenge",
  "commitment",
  "confidence",
  "action",
  "courage",
  "focus",
  "breathe",
  "gratitude",
  "imagination",
  "kindness",
  "mindfulness",
  "knowledge",
  "opportunity",
  "passion",
  "patience",
  "practice",
  "smile",
  "trust",
  "understanding",
  "wisdom"
];
var quotes = [
  "Don’t downgrade your dream just to fit your reality, upgrade your conviction to match your destiny.",
  "You are braver than you believe, stronger than you seem and smarter than you think.",
  "You are confined only by the walls you build yourself.",
  "The one who has confidence gains the confidence of others.",
  "Act as if what you do makes a difference. It does.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Never bend your head. Always hold it high. Look the world straight in the eye.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "Believe you can and you're halfway there.",
  "When you have a dream, you've got to grab it and never let go.",
  "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
  "No matter what you're going through, there's a light at the end of the tunnel.",
  "It is our attitude at the beginning of a difficult task which, more than anything else, will affect its successful outcome.",
  "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  "Just don't give up trying to do what you really want to do. Where there is love and inspiration, I don't think you can go wrong.",
  'Limit your "always" and your "nevers."',
  "You are never too old to set another goal or to dream a new dream.",
  "Try to be a rainbow in someone else's cloud.",
  "You do not find the happy life. You make it.",
  "Inspiration comes from within yourself. One has to be positive. When you're positive, good things happen.",
  "Sometimes you will never know the value of a moment, until it becomes a memory.",
  "The most wasted of days is one without laughter.",
  "You must do the things you think you cannot do.",
  "It isn't where you came from. It's where you're going that counts.",
  "It is never too late to be what you might have been.",
  "Happiness often sneaks in through a door you didn't know you left open.",
  "We must be willing to let go of the life we planned so as to have the life that is waiting for us.",
  "Never limit yourself because of others’ limited imagination; never limit others because of your own limited imagination.",
  "Be the change that you wish to see in the world.",
  "Let us make our future now, and let us make our dreams tomorrow's reality.",
  "You don't always need a plan. Sometimes you just need to breathe, trust, let go, and see what happens.",
  "If I cannot do great things, I can do small things in a great way.",
  "Don't wait. The time will never be just right.",
  "With the right kind of coaching and determination you can accomplish anything.",
  "If you have good thoughts they will shine out of your face like sunbeams and you will always look lovely.",
  "No matter what people tell you, words and ideas can change the world.",
  "Each person must live their life as a model for others.",
  "A champion is defined not by their wins but by how they can recover when they fall."
];
var savedPosters = [];

// Event Listeners
window.addEventListener("load", sendMainPoster);
randomizePosterButton.addEventListener("click", sendMainPoster);

showFormButton.addEventListener("click", function() { 
  navToSection(mainSection, makePosterSection);
 });
showSavedPostersButton.addEventListener("click", function() { 
  navToSection(mainSection, savedPostersSection); 
});
takeMeBackButton.addEventListener("click", function() { 
  navToSection(makePosterSection, mainSection); 
});
backToMainButton.addEventListener("click", function() { 
  navToSection(savedPostersSection, mainSection); 
});
makePosterButton.addEventListener("click", makePoster);
savePosterButton.addEventListener("click", savePoster);


// Event Handlers/Helper Functions
function sendMainPoster() {
   var poster = randomizePoster();

   imageEl.src = poster.imageURL;
   titleEl.innerText = poster.title;
   quoteEl.innerText = poster.quote;
}

function makePoster(event){
    event.preventDefault();
    var poster = new Poster(posterImageUrl.value, posterTitle.value, posterQuote.value);

    if(!poster.imageURL){
      window.alert("Please provide an image.");
      throw "No data provided in image field";
    }
    if(!poster.title){
      window.alert("Please provide a title.");
      throw "No data provided in title field";
    }
    if(!poster.quote){
      window.alert("Please provide a quote.");
      throw "No data provided in quote field";
    }
    
    imageEl.src = poster.imageURL;
    images.push(poster.imageURL);
    titleEl.innerText = poster.title;
    titles.push(poster.title);
    quoteEl.innerText = poster.quote;
    quotes.push(poster.quote)

    navToSection(makePosterSection, mainSection);
}

function savePoster() {
  var poster = new Poster(imageEl.src, titleEl.innerText, quoteEl.innerText);
  var isPresent = checkPresence(poster);

  if (!isPresent) {
    savedPosters.push(poster);
    sendMiniPoster(poster);
  }
}

function sendMiniPoster(poster) {
  var savedPoster;
  var randomID = Math.floor(Math.random() * 1000);

  savedPostersGrid.innerHTML += `<div ondblclick="removePoster(document.getElementById(${randomID}))"` +
  `class ="mini-poster" id=${randomID}></div>`;
  savedPoster = document.getElementById(randomID);
  savedPoster.innerHTML = `<img src="${poster.imageURL}" alt="nothin' to see here">` +
  `<h2 class="poster-title">${poster.title}</h2><h4 class="poster-quote">${poster.quote}</h4>`;
}

function checkPresence(poster) {
  var posterKey = `${poster.imageURL}${poster.title}${poster.quote}`;
  var savedPosterKey;
  var isPresent = false;
  
  for (var i = 0; i < savedPosters.length; i++) {
    savedPosterKey = `${savedPosters[i].imageURL}${savedPosters[i].title}${savedPosters[i].quote}`;

    if (posterKey === savedPosterKey) {
      isPresent = true;
    }
  }

  return isPresent;
}

function removePoster(poster) {
  poster.remove();
}

function randomizePoster() {
  return new Poster(
    getRandomElement(images), 
    getRandomElement(titles), 
    getRandomElement(quotes));
}

function getRandomElement(array) {
  return array[getRandomIndex(array)];
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function navToSection(origin, destination) {
  origin.classList.toggle("hidden");
  destination.classList.toggle("hidden");
}