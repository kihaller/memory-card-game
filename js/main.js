/*Global Variables*/
const grid = document.getElementById("grid-container");
const cards = document.getElementsByClassName("memory-cards");

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

// TODO: Define what happens when page is loaded

function createCard(animal) {
  const memoryCard = document.createElement("div");
  memoryCard.classList.add("memory-cards");
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
shuffle(animals);
animals.map((animal) => createCard(animal));

function flipCard(card) {
  let innerDiv = card.getElementsByClassName("flip-card-inner")[0];
  innerDiv.classList.add("flip");
}

// Define what happens when user clicks on card:
for (let card of cards) {
  card.addEventListener("click", () => {
    // Evaluate current state?

    // Are all cards flipped?
    // --> Game is done
    // Score is how many tries were needed. The lower, the better

    // How many cards are currently flipped?
    // If 0 or 1 -> flip card
    // Else -> Check whether cards are the same
    // If so -> leave them and "deactivate"
    // if not the same -> turn both around again

    flipCard(card);
  });
}
