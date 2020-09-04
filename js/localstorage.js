/* -------------
Global Variables
------------- */
let localStorageName = "highscore";
let highScore;
const overlayMessage = document.getElementById("overlay-message");
const highScoreOverlay = document.getElementById("highscore-overlay");
const highScoreCounter = document.getElementById("highscore-counter");
const resetButton = document.getElementById("btn-reset");

//Check local storage
export function loadHighScoreFromStorage() {
  if (localStorage.getItem(localStorageName) == null) {
    highScore = 1000;
  } else {
    highScore = localStorage.getItem(localStorageName);
    highScoreCounter.innerHTML = highScore;
  }
}

//display messages on overlay based on whether hogh score was broken by player or not
export function checkHighScore(counter) {
  if (counter < highScore) {
    // Save highScore in local storage
    localStorage.setItem(localStorageName, counter);

    overlayMessage.innerHTML = "Congratulations! You've won 🎉";
    highScoreOverlay.innerHTML = counter;
  } else {
    overlayMessage.innerHTML = "Congratulations! You made it &#127937;";
    const loseMessage = document.createElement("h3");
    loseMessage.innerHTML = "Unfortunately, you did not break the highscore 😞";
    overlay.insertBefore(loseMessage, resetButton);
    highScoreOverlay.innerHTML = highScore;
  }
}
