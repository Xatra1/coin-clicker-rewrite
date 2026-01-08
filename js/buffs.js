// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Buff calculations and removal
"use strict";

var buffRNG = 0,
  lastBuffRNG = 0,
  buff = 'none',
  clicksAdded = 0,
  forceBuff = false;

function buffRNGCalculation() {
  let max = 500,
    min = 0,
    buffTime;

  buffRNG = 0;

  if (forceBuff && buff === 'none') buffRNG = 100;
  else if (!forceBuff && buff === 'none') buffRNG = rng(min, max);

  if (
    (document.hidden || gamePanel.style.display !== 'block')
    && buffRNG === 100 || buffRNG === 200
  ) buffRNG = rng(min, max);

  while (buffRNG === lastBuffRNG) buffRNG = rng(min, max);

  if (buff === 'none') {
    switch (buffRNG) {

      case 100:
        if (stats.cps > 0) {
          buffTime = rng(15000, 60000);
          buffString.textContent = `Your coins per second has been doubled for ${Math.round(buffTime / 1000)} seconds!`;
          buffString.style.display = 'block';
          buff = 'cpsDouble';
          recalcCpsAndClickValue();
          labelHideTimer = 200;
          setTimeout(buffRemoval, buffTime);
        }
        break;

      case 200:
        if (stats.cps > 0) {
          buffTime = rng(5000, 10000);
          buffString.textContent = `Your click value has been increased by 777% of your CpS for ${Math.round(buffTime / 1000)} seconds!`;
          buffString.style.display = 'block';
          buff = 'cv777%CpS';
          recalcCpsAndClickValue();
          setTimeout(buffRemoval, buffTime);
        }
        break;

      case 300:
        if (stats.cps > 0 && stats.clicks > 0) {
          clicksAdded = Math.round(0.3 * stats.cps + 0.1 * stats.clicks);
          stats.clicks += clicksAdded;
          stats.trueClicks += clicksAdded;
          stats.lifetimeClicks += clicksAdded;
          numberFormat();
          buffString.style.display = 'block';
          buff = 'bonusClicks';
          setTimeout(buffRemoval, 2000);
        }
        break;
    }
  }
  lastBuffRNG = buffRNG;
}

function buffRemoval() {
  buffString.style.display = 'none';

  if (buff === 'cpsDouble') stats.cps = Math.round(stats.cps / 2);
  else if (buff === 'cv777%CpS') stats.clickValue = Math.round(stats.rawClickValue);
  else if (buff === 'bonusClicks') clicksAdded = 0;
  buff = 'none';
}
