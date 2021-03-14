// DOM Elements
const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
const SHOW_AM_PM = true;
const MIDNIGHT = 0;
const NOON = 12;
const ZERO = '0';
const SIX_HOURS = 6;
const EIGHTEEN_HOURS = 18;
const TWENTY_THREE_HOURS = 23;

// Show Time
function showTime() {
  const today = new Date();
  let hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds(); 

  // Set AM or PM
  const amPm = hour >= NOON ? 'PM' : 'AM';

  // 12hr Format
  hour !== MIDNIGHT ?  hour % 12 || NOON : MIDNIGHT; 

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${SHOW_AM_PM ? amPm : ''}`;
  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? ZERO : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  const today = new Date();
  hour = today.getHours();
  if (hour < NOON && hour >= SIX_HOURS) {
    // Morning
    document.body.style.backgroundImage = "url('../img/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
    document.body.style.color = 'rgb(0, 0, 0)'
  } else if (hour < EIGHTEEN_HOURS && hour >= NOON) {
    // Afternoon
    document.body.style.backgroundImage = "url('../img/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = 'rgb(0, 0, 0)'
  } else if (hour <= TWENTY_THREE_HOURS && hour >= EIGHTEEN_HOURS) {
    // Evening
    document.body.style.backgroundImage = "url('../img/evening.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'rgb(255, 255, 255)';
  } else {
    // Night
    document.body.style.backgroundImage = "url('../img/night.jpg')";
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'rgb(255, 255, 255)';
  }
  setTimeout(setBgGreet, 1000);
}

// Get Name
function getName() {
  name.textContent = localStorage.getItem('name') === null ? '[Enter Name]' : localStorage.getItem('name');
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.key === 'Enter') {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  localStorage.getItem('focus') === null ? focus.textContent = '[Enter Focus]' : focus.textContent = localStorage.getItem('focus');
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.key === 'Enter') {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();
