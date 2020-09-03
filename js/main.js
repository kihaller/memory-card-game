/* -------------
Global Variables
------------- */
const grid = document.getElementById("grid-container");
const cards = document.getElementsByClassName("memory-cards");
const overlay = document.getElementById("overlay");
const score = document.getElementById("score");
const tries = document.getElementById("tries-counter");
const resetButton = document.getElementById("btn-reset");
let counter = 0;
let animals = [
  "Bear",
  "Bunny",
  "Frog",
  "Hippo",
  "Lion",
  "Mouse",
  "Panda",
  "Tiger",
  "Zebra",
];
animals = [...animals, ...animals];
let matchedCards = [];
let flippedCards = [];

/* -----------------
Function Definitions
----------------- */

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

//Define what happens when page is loaded

function createCard(animal) {
  const memoryCard = document.createElement("div");
  memoryCard.classList.add("memory-cards");
  memoryCard.id = animal;
  memoryCard.innerHTML = `
  <div class="flip-card-inner"> 
    <div class="flip-card-front">
      <img src="images/background.svg" />
   </div>
   <div class="flip-card-back">
    <img src="images/${animal}.svg" />
  </div>
 </div>
 
  `;

  grid.appendChild(memoryCard);

  return memoryCard;
}

function flipCard(card) {
  card.disabled = true;
  let innerDiv = card.getElementsByClassName("flip-card-inner")[0];
  innerDiv.classList.add("flip");
}

function flipCardBack(card) {
  card.disabled = false;
  let innerDiv = card.getElementsByClassName("flip-card-inner")[0];
  innerDiv.classList.remove("flip");
}

function compareCards(flippedCards) {
  if (flippedCards[0].id === flippedCards[1].id) {
    //let them open if they match and add them to array of matched cards
    matchedCards.push(flippedCards[0]);
    matchedCards.push(flippedCards[1]);
    //close them if they do not match and enable them again
  } else {
    // Pause a little to allow the user to look at the cards
    setTimeout(() => {
      flipCardBack(flippedCards[0]);
      flipCardBack(flippedCards[1]);
    }, 1500);
  }
}

function isFinished() {
  overlay.classList.add("overlay");
  score.innerHTML = counter;
}

function reset() {
  overlay.classList.remove("overlay");
  matchedCards = [];
  flippedCards = [];
  counter = 0;
  tries.innerHTML = "";
  for (card of cards) {
    flipCardBack(card);
  }
}

// This is the main orchestrator --> defines what needs to be done when card is flipped
function onCardClick(card) {
  if (!card.disabled) {
    //flip the card
    flipCard(card);

    // Add to stack of flipped cards
    flippedCards.push(card);

    //when two cards are open, compare them
    if (flippedCards.length === 2) {
      counter++;
      tries.innerHTML = counter;
      compareCards(flippedCards);
      flippedCards = [];
    }

    // Are all cards matched?
    if (matchedCards.length === 18) {
      //Game is done, show overlay
      setTimeout(isFinished, 1500);
    }
  }
}

/* ------------
Execute on load
------------ */
shuffle(animals);
animals.map((animal) => createCard(animal));

// Define what happens when user clicks on card:
for (let card of cards) {
  card.addEventListener("click", () => onCardClick(card));
}

// reset game
resetButton.addEventListener("click", () => reset());
