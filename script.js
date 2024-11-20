const WAIT_BEFORE_CHECK_MATCH_INDICATION = 10000;
const RESET_AFTER_SUCCESS_MATCH = 5000;
const RESET_AFTER_WRONG_MATCH = 4000;
const GAME_TIMER_MINUTES = 2;

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


// ------------------------- BUILD GAME BOARD -------------------------
function initializeGame() {
  const maleSection = document.querySelector('.section.male');
  const femaleSection = document.querySelector('.section.female');

  maleCandidates.forEach(male => maleSection.appendChild(createCard(male, 'MALE')));
  femaleCandidates.forEach(female => femaleSection.appendChild(createCard(female, 'FEMALE')));

  initTimer();
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

  // Dynamically create properties HTML
  let propertiesHTML = '<div class="title">מי אני?</div>';
  for (const [key, value] of Object.entries(candidate.properties)) {
    if (value !== undefined) {
      const translatedValue = TRANSLATION[`${type}_${value}`] || TRANSLATION[value] || value;
      propertiesHTML += `<div class='property'><span class='key'>${TRANSLATION[key] || key}:</span><span class='value'>${translatedValue}<span></div>`;
    }
  }

  // Dynamically create looking for HTML
  let lookingForHTML = `<div class="title">מה אני ${type === 'MALE' ? 'מחפש' : 'מחפשת'}:</div>`;
  for (const [key, value] of Object.entries(candidate.lookingFor)) {
    if (value !== undefined) {
      let valueString = TRANSLATION[value] || value;
      // age
      if (value.min) {
        valueString = `${value.max} - ${value.min}`;
      } else if (Array.isArray(value)) {
        valueString = value.map(v => {
          return TRANSLATION[`${lookingForType}_${v}`] || TRANSLATION[v] || v;
        }).join(', ');
      }
      lookingForHTML += `<div class='property'><span class='key'>${TRANSLATION[key] || key}:</span><span class='value'>${valueString}<span></div>`;
    }
  }

  cardBack.innerHTML = `<div class='card-details'><div class='properties'>${propertiesHTML}</div><div class='looking-for'>${lookingForHTML}</div></div>`;

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
  } else {
    firstChoosenCard = card;
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

// ------------------------- LOGIC ------------------------------------
function propertiesMatch(properties, lookingFor) {
  return Object.keys(lookingFor).every(key => {
    if (Array.isArray(lookingFor[key])) {
      return lookingFor[key].includes(properties[key]);
    }

    if (lookingFor[key].min) {
      return properties[key] >= lookingFor[key].min && properties[key] <= lookingFor[key].max;
    }
    
    else return properties[key] === lookingFor[key]
  });
}

function checkMatch(firstCard, secondCard) {
  const firstCandidate = firstCard.dataset.type === 'MALE' ? maleCandidates[firstCard.dataset.id - 1] : femaleCandidates[firstCard.dataset.id - 1];
  const secondCandidate = secondCard.dataset.type === 'FEMALE' ? femaleCandidates[secondCard.dataset.id - 1] : maleCandidates[secondCard.dataset.id - 1];

  if (firstCandidate && secondCandidate) {
    const match = propertiesMatch(firstCandidate.properties, secondCandidate.lookingFor) && propertiesMatch(secondCandidate.properties, firstCandidate.lookingFor);

    setTimeout(() => {
      (match ? onSucessMatch : onFailureMatch)(firstCard, secondCard)
    }, WAIT_BEFORE_CHECK_MATCH_INDICATION);
  }
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


initializeGame();