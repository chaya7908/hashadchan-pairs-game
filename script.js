const WAIT_BEFORE_START_HIGHLIGHTS = 2000;
const WAIT_BETWEEN_PROP_CHECK = 600;
const WAIT_AFTER_HIGHLIGHTS = 2000;
const RESET_AFTER_SUCCESS_MATCH = 5000;
const RESET_AFTER_WRONG_MATCH = 3000;
const GAME_TIMER_MINUTES = 7;

// ------------------------- COLORS -----------------------------------
const originalColors = [
  // '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFA1', '#FFB833', '#FF3333', '#33FFD7', '#FF33D4',
  // '#5733FF', '#57FF33', '#FF5733', '#3333FF', '#FF33FF', '#33FF33', '#FF3333', '#33FFFF', '#FF7F50', '#FF1493'
  '#ffd500'
];
let colors = [...originalColors];

function getColor() {
  if (colors.length === 0) {
    colors = [...originalColors]; // Reset colors array
  }
  return colors.pop(); // Pop and return a color
}


let firstChoosenCard = null;
let canClick = true;

const bruchAnimationsStack = [];

// ------------------------- BUILD GAME BOARD -------------------------
function initializeGame() {
  const maleSection = document.querySelector('.section.male');
  const femaleSection = document.querySelector('.section.female');

  shuffleArray(maleCandidates).forEach(male => maleSection.appendChild(createCard(male, 'MALE')));
  shuffleArray(femaleCandidates).forEach(female => femaleSection.appendChild(createCard(female, 'FEMALE')));

  initTimer();
  genereateBrushAnimations();
}

function initTimer() {
  // Initial time in seconds (5 minutes)
  let timeInSeconds = GAME_TIMER_MINUTES * 60;

  // Function to update timer display with animation
  function updateTimerDisplay(minutes, seconds) {
    const minuteElem = document.getElementById('minutes');
    const secondElem = document.getElementById('seconds');

    // Update minutes and seconds with animations
    applyAnimation(minuteElem, minutes.toString().padStart(2, '0'));
    applyAnimation(secondElem, seconds.toString().padStart(2, '0'));
  }

  function applyAnimation(element, newValue) {
    // Store current value
    const currentValue = element.textContent;

    // If the value has changed, apply animation
    if (currentValue !== newValue) {
      // Add the 'old' class for current value
      element.classList.add('old');

      // Wait for the animation to complete, then update the value
      setTimeout(() => {
        element.textContent = newValue;
        // Remove the 'old' class and add the 'new' class
        element.classList.remove('old');
        element.classList.add('new');

        // Remove the 'new' class after animation completes
        setTimeout(() => {
          element.classList.remove('new');
        }, 300); // Duration of animation
      }, 300); // Duration of 'old' animation
    }
  }

  // Update the timer every second
  const timerInterval = setInterval(() => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    updateTimerDisplay(minutes, seconds);

    // Decrement the time
    timeInSeconds--;

    // Stop the timer when it reaches 0
    if (timeInSeconds < 0) {
      clearInterval(timerInterval);
      updateTimerDisplay(0, 0); // Ensure it shows 00:00 at the end
      gameOver();
    }
  }, 1000);
}

function createCard(candidate, type) {
  const lookingForType = type === 'MALE' ? 'FEMALE' : 'MALE';

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.id = candidate.id;
  card.dataset.type = type;

  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');

  // card front
  const cardFront = document.createElement('div');
  cardFront.classList.add('card-front');
  const imgUrl = candidate.imageUrl || `${type}_PROFILE_${Math.floor(Math.random() * 15) + 1}`
  cardFront.innerHTML = `
    <div class="image-container">
        <img style="--random-delay: ${Math.random() * 4}s" class="swing" src="https://hashadchan.co.il/${imgUrl}.svg"/>
    </div>
    <div class="emoji-container">
        <div class="emoji emoji--yay">
          <div class="emoji__face">
            <div class="emoji__eyebrows"></div>
            <div class="emoji__mouth"></div>
          </div>
        </div>
    </div>
    `;

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');

  let propertiesHTML = '<div class="title">מי אני?</div>';
  let lookingForHTML = `<div class="title">מה אני ${type === 'MALE' ? 'מחפש' : 'מחפשת'}:</div>`;

  for (const prop of SUPPORTED_PROPS) {
    // create property HTML
    const value = candidate.properties[prop];
    if (value !== undefined) {
      const translatedValue = TRANSLATION[`${type}_${value}`] || TRANSLATION[value] || value;
      propertiesHTML += `<div class='property property-${prop}'><span class='key'>${TRANSLATION[prop] || prop}:</span><span class='value'>${translatedValue}<span></div>`;
    }

    // create looking for HTML
    const lookingForValue = candidate.lookingFor[prop];
    if (lookingForValue !== undefined) {
      let lookingForValueString = TRANSLATION[lookingForValue] || lookingForValue;
      // age
      if (lookingForValue.min) {
        lookingForValueString = `${lookingForValue.max} - ${lookingForValue.min}`;
      } else if (Array.isArray(lookingForValue)) {
        lookingForValueString = lookingForValue.map(v => {
          return TRANSLATION[`${lookingForType}_${v}`] || TRANSLATION[v] || v;
        }).join(' \\ ');
      }
      lookingForHTML += `<div class='property looking-for-${prop}'><span class='key'>${TRANSLATION[prop] || prop}:</span><span class='value'>${lookingForValueString}<span></div>`;
    }
  }

  cardBack.innerHTML = `<div class='card-details'>
    <div class='name' style="--anim-duration: 4s">${candidate.firstName} ${candidate.lastName}</div>
    <div class='properties'>${propertiesHTML}</div>
    <div class='looking-for'>${lookingForHTML}</div>
  </div>`;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  card.addEventListener('click', () => {
    onCardClicked(card);
  });

  return card;
}

// ------------------------- GAME EVENTS -------------------------------
function onCardClicked(card) {
  // return if card is not clickable
  if (!canClick ||
    card.classList.contains('flipped') ||
    card.classList.contains('matched') ||
    (firstChoosenCard && firstChoosenCard.dataset.type === card.dataset.type)
  ) return;


  // add placeholder to save place
  const placeholder = document.createElement('div');
  placeholder.classList.add('placeholder');
  placeholder.style.width = card.offsetWidth + 'px';
  placeholder.style.height = card.offsetHeight + 'px';
  card.parentNode.insertBefore(placeholder, card);

  // add active calsses
  card.classList.toggle('active');
  card.classList.toggle('flipped');

  
  // handle click event
  if (firstChoosenCard) {
    canClick = false;
    checkMatch(firstChoosenCard, card);
    onCardOpened(card, 1);
  } else {
    firstChoosenCard = card;
    onCardOpened(card, 2);
  }
}

function onSucessMatch(firstCard, secondCard) {
  blink([firstCard, secondCard], 'yellow');
  successMatchAnimation();

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
  }, RESET_AFTER_SUCCESS_MATCH / 4 * 3);

  setTimeout(() => {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    stopBlink([firstCard, secondCard])
    bgColorForMatch([firstCard, secondCard])
    resetMatchState(firstCard, secondCard);
  }, RESET_AFTER_SUCCESS_MATCH);
}

function onFailureMatch(firstCard, secondCard) {
  blink([firstCard, secondCard], 'red');
  wrongMatchAnimation();

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');

    stopBlink([firstCard, secondCard])
    resetMatchState(firstCard, secondCard);
    resetHighlights();
  }, RESET_AFTER_WRONG_MATCH);
}

function resetMatchState(firstCard, secondCard) {
  // Reset click control
  canClick = true;
  firstChoosenCard = null;
  firstCard.classList.remove('active');
  secondCard.classList.remove('active');

  document.querySelectorAll('.placeholder').forEach(placeholder => {
    placeholder.parentNode.removeChild(placeholder);
  });
  resetMatchAnimation();
}

async function gameOver() {
  const gameBoard = document.querySelector('.game-over-container');
  gameBoard.style.display = 'block';
  const text = document.querySelector('.text-2');
  await delay(500);
  animateBrush(text, 'red', 3, false);
  setInterval(() => {
    animateBrush(text, 'red', 3, false);
  }, 4000);
}

// ------------------------- LOGIC ------------------------------------
function propertyMatch(prop, lookingFor) {
  if (Array.isArray(lookingFor)) {
    return lookingFor.includes(prop);
  }

  if (lookingFor.min) {
    return prop >= lookingFor.min && prop <= lookingFor.max;
  }

  else return prop === lookingFor
}

async function checkMatch(firstCard, secondCard) {
  const firstCandidate = firstCard.dataset.type === 'MALE' ? maleCandidates[firstCard.dataset.id - 1] : femaleCandidates[firstCard.dataset.id - 1];
  const secondCandidate = secondCard.dataset.type === 'FEMALE' ? femaleCandidates[secondCard.dataset.id - 1] : maleCandidates[secondCard.dataset.id - 1];

  if (firstCandidate && secondCandidate) {
    await delay(WAIT_BEFORE_START_HIGHLIGHTS);

    const match = await highlightMatches(firstCard, secondCard);
    await delay(WAIT_AFTER_HIGHLIGHTS);
    (match ? onSucessMatch : onFailureMatch)(firstCard, secondCard);
  }
}

async function highlightMatches(card1, card2) {
  const [maleCard, femaleCard] = card1.dataset.type === 'MALE' ? [card1, card2] : [card2, card1];
  let counter = 1;

  async function highlight(firstCard, secondCard) {
    const firstCandidate = firstCard.dataset.type === 'MALE' ? maleCandidates[firstCard.dataset.id - 1] : femaleCandidates[firstCard.dataset.id - 1];
    const secondCandidate = secondCard.dataset.type === 'FEMALE' ? femaleCandidates[secondCard.dataset.id - 1] : maleCandidates[secondCard.dataset.id - 1];

    for (const prop of SUPPORTED_PROPS) {
      const lookingForValue = firstCandidate.lookingFor[prop];
      const lookingForElement = firstCard.querySelector(`.looking-for-${prop}`);
      const propertyElement = secondCard.querySelector(`.property-${prop}`);

      const isMatch = propertyMatch(secondCandidate.properties[prop], lookingForValue);

      if (propertyElement) {
        if (isMatch) {
          animateBrush(lookingForElement, 'yellow');
          await delay(500);
          animateBrush(propertyElement, 'yellow');
          await delay(WAIT_BETWEEN_PROP_CHECK);
        } else {
          animateBrush(lookingForElement, 'red');
          await delay(500);
          animateBrush(propertyElement, 'red');
          await delay(WAIT_BETWEEN_PROP_CHECK);
        }
      }

      if (!isMatch) return false;
    }
    
    return true;
  }

  const match1 = await highlight(maleCard, femaleCard);
  const match2 = match1 && await highlight(femaleCard, maleCard);

  return match1 && match2;
}

function resetHighlights() {
  document.querySelectorAll('.property').forEach(element => {
    element.classList.remove('zoom-once');
    element.classList.remove('brush-highlight');
  });
}

// ------------------------ ACTIONS -----------------------------------
function blink(elements, color) {
  // Get the value of the CSS variable
  const colorVar = getComputedStyle(document.body).getPropertyValue(`--color-${color}`);

  elements.forEach(e => {
    e.style.setProperty('--blink-color', colorVar);
    e.classList.add('blink-bg-color');
  });
}

function stopBlink(elements) {
  elements.forEach(e => e.classList.remove('blink-bg-color'));
}

function bgColorForMatch(elements) {
  const color = getColor();
  elements.forEach(e => e.style.backgroundColor = color);
}

function successMatchAnimation() {
  document.getElementById('match-animation').classList.add('rotate-zoom')
}

function wrongMatchAnimation() {
  document.getElementById('match-animation').classList.add('die-animation')
}

function resetMatchAnimation() {
  document.getElementById('match-animation').classList.remove('die-animation')
  document.getElementById('match-animation').classList.remove('rotate-zoom')
}

function onCardOpened(card, cardNumber) {
  setTimeout(() => {
    const nameElement = card.querySelector('.name');
    animateBrush(nameElement, 'natural', 1, false);
  }, 500);
}

function playGameSound(type, pauseBg = false) {
  // if (pauseBg) {
  //   gameBgSound.pause();
  // } else {
  //   gameBgSound.volume = 0.1;
  // }

  let path = '';
  let volume = 1;
  switch (type) {
    case 'check':
      volume = 0.7;
      path = './sounds/check2.mp3';
      break;
    case 'wrong':
      path = './sounds/wrong.mp3';
      break;
    case 'flip':
      path = './sounds/tada.mp3';
      break;
    case 'feedback':
      path = './sounds/claps.mp3';
      break;
    default:
      break;
  }
  var audio = new Audio(path);
  audio.volume = volume;
  audio.play();
  audio.onended = () => {
    // console.log('gameBgSound.volume = 0.5;')
    // gameBgSound.volume = 0.5;
    // gameBgSound.play();
  }
};

initializeGame();

// ------------------------ ANIMATIONS -----------------------------------

function animateBrush(element, color, duration =1 ,playSound = true) {
  const id = getAnimationBrushId();

  element.style.setProperty('--clip-path', `url(#clip-indefinite-${id})`);
  
  element.classList.add('zoom-once');
  element.classList.add('brush-highlight');
  element.classList.add(`highlight-${color}`);
  
  const anim = document.getElementById(`anim-${id}`);
  anim.beginElement();
  
  if (playSound) {
    playGameSound('check');
  }
}

// ------------------------ UTILS -----------------------------------
function shuffleArray(array) {
  if (getQueryParams().has('DEV')) return array;

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return params;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateRandomId() {
  return 'id-' + Math.random().toString(36).substring(2, 15);
}


function genereateBrushAnimations() {
  for (let i = 0; i < 10; i++) {
    genereateBrushAnimation();
  }
}

function genereateBrushAnimation() {
  const id = generateRandomId();
  const svgString = BRUSH_SVG.replaceAll('{{id}}', id);
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
  const svgElement = svgDoc.documentElement;
  document.body.appendChild(svgElement);
  bruchAnimationsStack.unshift(id);
}

function getAnimationBrushId() {
  console.log(bruchAnimationsStack)
  const id = bruchAnimationsStack.pop();
  genereateBrushAnimation();
  return id;
}