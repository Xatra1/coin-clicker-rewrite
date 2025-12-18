// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// General functions and number formatting

// NOTE: remove
function errorHandler(err) {
  error.className = 'err';
  errorStack.className = 'err';
  error.textContent = `${err}`;
  errorStack.textContent = `${err.stack}`;
  error.style.top = '-0.3vh';
  errorStack.style.top = '3vh';
  document.body.appendChild(error);
  document.body.appendChild(errorStack);
}

var gameStarted = false,
  dataLoaded = false,
  buildNumber = 6.0,
  times = [];
  fps,

  intArray = [],
  textArray = [];

updateString.textContent = `rewrite`;
buildString.textContent = `build ${buildNumber}`;

function rng(min, max) {
  return Math.floor((Math.random() * (max - min) + min));
}

function achLabelSwitch(index) {
  sfx.play();
  achNameStr.textContent = ach[index][0];
  achDescStr.textContent = ach[index][1];
  achUnlockStr.textContent = ach[index][3] ? 'Unlocked.' : 'Not unlocked.';
}

function getFps() {
  window.requestAnimationFrame(() => {
    let now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) times.shift();
    times.push(now);
    fps = times.length;
    fpsLabel.textContent = `FPS: ${fps}`;
    lib.getFps();
  });
}

function collides(element1, element2) {
  try {
    rect1 = element1.getBoundingClientRect();
    rect2 = element2.getBoundingClientRect();
    if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y) return true;
    else return false;
  } catch (err) {
    errorHandler(err);
  }
}

getFps();

let loadEvent = new Event("loadEvemt");
document.body.dispatchEvent(loadEvent);
