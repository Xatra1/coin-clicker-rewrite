// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// General functions
"use strict";

var gameStarted = false,
  buildNumber = 7.0;

updateString.textContent = `rewrite`;
buildString.textContent = `version ${buildNumber}b`;

function rng(min, max) {
  return Math.floor((Math.random() * (max - min) + min));
}
