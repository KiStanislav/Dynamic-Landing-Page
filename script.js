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

const DAY = {
  MORNING: 'MORNING',
  AFTERNOON: 'AFTERNOON',
  EVENING: 'EVENING',
  NIGHT: 'NIGHT'
}

const SETTINGS = {
  [DAY.MORNING]: {
    bgImage: "url('img/morning.jpg')",
    text: 'Good morning, ',
    color: 'rgb(0, 0, 0)'
  },
  [DAY.AFTERNOON]: {
    bgImage: "url('img/afternoon.jpg')",
    text: 'Good Afternoon, ',
    color: 'rgb(0, 0, 0)'
  },
  [DAY.EVENING]: {
    bgImage: "url('img/evening.jpg')",
    text: 'Good Evening, ',
    color: 'rgb(220, 220, 220)'
  },
  [DAY.NIGHT]: {
    bgImage: "url('img/night.jpg')",
    text: 'Good Night, ',
    color: 'rgb(200, 200, 200)'
  } 
};

function applySettings(key) {
  const values = SETTINGS[key];
  document.body.style.backgroundImage = values.bgImage;
  greeting.textContent = values.text;
  document.body.style.color = values.color;
}

function getCurrentSetting(hour) {
  if (hour < NOON && hour >= SIX_HOURS) {
    return DAY.MORNING;
  } else if (hour < EIGHTEEN_HOURS && hour >= NOON) {
    return DAY.AFTERNOON;
  } else if (hour <= TWENTY_THREE_HOURS && hour >= EIGHTEEN_HOURS) {
    return DAY.EVENING;
  } else {
    return DAY.NIGHT;
  }
};

function setBgGreet() {
  const today = new Date();
  hour = today.getHours();
  const currentSetting = getCurrentSetting(hour);
  applySettings(currentSetting);
  setTimeout(setBgGreet, 1000);
}

function setNameOrFocus(elem, key) {
  elem.textContent = localStorage.getItem(key) === null ? `[Enter ${key}]` : localStorage.getItem(key);
}

const setValueToLs = (key) => (event) => localStorage.setItem(key, event.target.innerText);

name.addEventListener('input', setValueToLs('name'));
focus.addEventListener('input', setValueToLs('focus'));

const blurField = (key) => (event) => {
  if (event.key === 'Enter') key.blur();
}

name.addEventListener('keypress', blurField(name));
focus.addEventListener('keypress', blurField(focus));

// Run
showTime();
setBgGreet();
setNameOrFocus(name, 'name');
setNameOrFocus(focus, 'focus');
