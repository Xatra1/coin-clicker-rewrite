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

    if ((document.hidden || game.style.display != 'block') && buffRNG == 200) buffRNG = lib.rng(min, max);

    while (buffRNG == lastBuffRNG) buffRNG = lib.rng(min, max);

    if (buff == 'none') {
      switch (buffRNG) {

        case 100:
          if (stats.ClicksPS > 0) {
            buffTime = lib.rng(15000, 60000);
            buffStr.textContent = `Your CpS has been doubled for ${Math.round(buffTime / 1000)} seconds!`;
            buffStr.style.display = 'block';
            stats.RawClicksPS = stats.ClicksPS;
            stats.ClicksPS = Math.round(stats.ClicksPS * 2);
            buff = 'cpsDouble';
            window.setTimeout(buffRemoval, buffTime);
          }
          break;

        case 200:
          if (stats.ClicksPS > 0) {
            buffTime = lib.rng(5000, 20000);
            buffStr.textContent = `Your click value has been increased by 777% of your CpS for ${Math.round(buffTime / 1000)} seconds!`;
            buffStr.style.display = 'block'; stats.RawClickVal = stats.ClickValue; stats.ClickValue += Math.round(stats.ClicksPS * 7.77);
            buff = 'cv777%CpS';
            window.setTimeout(buffRemoval, buffTime);
          }
          break;

        case 300:
          if (stats.ClicksPS > 0 && stats.Clicks > 0) {
            clicksAdded = Math.round(0.3 * stats.ClicksPS + 0.1 * stats.Clicks);
            stats.Clicks += clicksAdded;
            stats.TrueClicks += clicksAdded;
            numberFix();
            buffStr.style.display = 'block';
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
      stats.ClicksPS = stats.RawClicksPS;
      stats.ClickValue = stats.RawClickVal;
    }

    else if (buff == 'cv777%CpS') stats.ClickValue = stats.RawClickVal;
    else if (buff == 'bonusClicks') clicksAdded = 0;
    buff = 'none';
  } catch (error) { errorHandler(error); }
}

setInterval(() => {
  if (autosavePending && !debugAutoplay && doAutosave) savingString.textContent = 'A buff is active. Autosave postponed.';
  if (buff == 'none' && autosavePending && doAutosave) { autosavePending = false; manualSave = false; saveGame(); }
}, 1000 / 60);
