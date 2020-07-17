// Store DOM elements in variables
let playForm = document.querySelector('#play-form');
let playButton = document.querySelector('#play-button');
let gameScreen = document.querySelector('#game-screen');
let submitAnswer = document.querySelector('#submit-answer');
let gameText = document.querySelector('#game-text');
let gameSubText = document.querySelector('#game-subtext');

// Global variable necessary to set and check answer
let bubbleNumber;

// Necessary sleep function for delaying code execution
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Running when submit button is pressed
submitAnswer.onclick = function () {
  answer = document.querySelector('#answer').value;
  checkAnswer(answer);
  return false;
};

// Check answer after submit button is pressed
function checkAnswer(answer) {
  if (answer === '') {
    return alert('Please type your answer');
  } else if (parseInt(answer) === bubbleNumber) {
    gameText.innerHTML = 'Correct!';
    gameText.style.color = 'var(--success)';
    gameSubText.innerHTML = 'Care to play again?';
  } else {
    gameText.innerHTML = 'Wrong!';
    gameText.style.color = 'var(--danger)';
    gameSubText.innerHTML = `It was ${bubbleNumber}.`;
  }
  playButton.removeAttribute('disabled');
  submitAnswer.setAttribute('disabled', '');
}

// Running when play button is pressed
playForm.onsubmit = function () {
  let difficultySetting = document.querySelector('#inlineFormCustomSelect')
    .value;
  gameText.innerHTML = '';
  gameText.style.color = '';
  gameSubText.innerHTML = '';
  playButton.setAttribute('disabled', '');
  submitAnswer.setAttribute('disabled', '');
  playGame(difficultySetting);
  return false;
};

// Game is running
async function playGame(difficultySetting) {
  bubbleNumber = Math.floor(Math.random() * 41 + 10);
  for (let i = 0; i < bubbleNumber; i++) {
    let bubble = document.createElement('div');
    generatePosition(bubble);
    generateColor(bubble);
    gameScreen.appendChild(bubble);
    animation(bubble);
    await sleep(getFrequency(difficultySetting));
  }
  await sleep(1500);
  submitAnswer.removeAttribute('disabled');
  gameText.innerHTML = 'How many?';
  gameSubText.innerHTML = 'Did you miss any?';
}

// Animate bubble appearing and disappearing
async function animation(bubble) {
  await sleep(500);
  bubble.style.transform = 'scale(1)';
  await sleep(500);
  bubble.style.transform = 'scale(0)';
  await sleep(500);
  bubble.remove();
}

// Generate random position of the bubble within the game screen
function generatePosition(bubble) {
  let xPosition = Math.floor(Math.random() * 765);
  let yPosition = Math.floor(Math.random() * 565);
  bubble.style.left = `${xPosition}px`;
  bubble.style.top = `${yPosition}px`;
}

// Generate random color of the bubble
function generateColor(bubble) {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  bubble.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

// Set delay between bubbles appearing depending on difficulty
function getFrequency(difficultySetting) {
  if (difficultySetting === '1') {
    return 700;
  } else if (difficultySetting === '3') {
    return 250;
  } else {
    return 400;
  }
}
