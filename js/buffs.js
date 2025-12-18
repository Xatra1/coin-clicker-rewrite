// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Buff calculations and removal

var buffRNG = 0,
  lastBuffRNG = 0,
  buff = 'none',
  clicksAdded = 0;

function buffRNGCalc() {
  try {
    let max = 301,
      min = 0,
      buffTime;

    buffRNG = 0;

    if (forceBuff && buff == 'none') buffRNG = 100;
    else if (!forceBuff && buff == 'none') buffRNG = lib.rng(min, max);

    if ((document.hidden || game.style.display != 'block') && buffRNG == 200) buffRNG = rng(min, max);

    while (buffRNG == lastBuffRNG) buffRNG = rng(min, max);

    if (buff == 'none') {
      switch (buffRNG) {

        case 100:
          if (stats.cps > 0) {
            buffTime = rng(15000, 60000);
            buffString.textContent = `Your CpS has been doubled for ${Math.round(buffTime / 1000)} seconds!`;
            buffString.style.display = 'block';
            stats.rawCps = stats.cps;
            stats.cps = Math.round(stats.cps * 2);
            buff = 'cpsDouble';
            window.setTimeout(buffRemoval, buffTime);
          }
          break;

        case 200:
          if (stats.cps > 0) {
            buffTime = rng(5000, 20000);
            buffStr.textContent = `Your click value has been increased by 777% of your CpS for ${Math.round(buffTime / 1000)} seconds!`;
            buffStr.style.display = 'block';
            stats.rawClickValue = stats.clickValue;
            stats.clickValue += Math.round(stats.cps * 7.77);
            buff = 'cv777%CpS';
            window.setTimeout(buffRemoval, buffTime);
          }
          break;

        case 300:
          if (stats.cps > 0 && stats.clicks > 0) {
            clicksAdded = Math.round(0.3 * stats.cps + 0.1 * stats.clicks);
            stats.clicks += clicksAdded;
            stats.trueClicks += clicksAdded;
            numberFix();
            buffString.style.display = 'block';
            buff = 'bonusClicks';
            window.setTimeout(buffRemoval, 2000);
          }
          break;
      }
    }
    lastBuffRNG = buffRNG;
  } catch (error) { errorHandler(error); }
}

function buffRemoval() {
  try {
    buffStr.style.display = 'none';

    if (buff == 'cpsDouble') {
      stats.cps = stats.rawCps;
      stats.clickValue = stats.rawClickValue;
    }

    else if (buff == 'cv777%CpS') stats.clickValue = stats.rawClickValue;
    else if (buff == 'bonusClicks') clicksAdded = 0;
    buff = 'none';
  } catch (error) { errorHandler(error); }
}

setInterval(() => {
  if (autosavePending && doAutosave) savingString.textContent = 'A buff is active. Autosave postponed.';

  if (buff == 'none' && autosavePending && doAutosave) {
    autosavePending = false;
    manualSave = false;
    saveGame();
  }
}, 1000 / 60);
