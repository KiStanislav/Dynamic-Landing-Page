const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
const MIDNIGHT = 0;
const NOON = 12;
const ZERO = '0';
const SIX_HOURS = 6;
const EIGHTEEN_HOURS = 18;
const TWENTY_THREE_HOURS = 23;

function showTime() {
  const today = new Date();
  let hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds(); 
  const amPm = hour >= NOON ? 'PM' : 'AM';

  hour !== MIDNIGHT ?  hour % 12 || NOON : MIDNIGHT; 

  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${amPm}`;
  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? ZERO : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  const today = new Date();
  hour = today.getHours();
  if (hour < NOON && hour >= SIX_HOURS) {
    // Morning
    document.body.style.backgroundImage = "url('img/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
    document.body.style.color = 'rgb(0, 0, 0)'
  } else if (hour < EIGHTEEN_HOURS && hour >= NOON) {
    // Afternoon
    document.body.style.backgroundImage = "url('img/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = 'rgb(0, 0, 0)'
  } else if (hour <= TWENTY_THREE_HOURS && hour >= EIGHTEEN_HOURS) {
    // Evening
    document.body.style.backgroundImage = "url('img/evening.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'rgb(255, 255, 255)';
  } else {
    // Night
    document.body.style.backgroundImage = "url('img/night.jpg')";
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'rgb(255, 255, 255)';
  }
  setTimeout(setBgGreet, 1000);
}

function getNameOrFocus(elem, key) {
  elem.textContent = localStorage.getItem(key) === null ? `[Enter ${key}]` : localStorage.getItem(key);
}

name.addEventListener('input', (event) => localStorage.setItem('name', event.target.innerText));

focus.addEventListener('input', (event) => localStorage.setItem('focus', event.target.innerText));

name.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    name.blur();
  }
});

focus.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    focus.blur();
  }
}); 

// Run
showTime();
setBgGreet();
getNameOrFocus(name, 'name');
getNameOrFocus(focus, 'focus');
