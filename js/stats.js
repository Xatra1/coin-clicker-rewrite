// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Stats calculations
"use strict";

var stats = {
  clicks: 0,
  trueClicks: 0,
  clickValue: 1,
  clickValueMultiplier: 0,
  rawClickValue: 1,
  cps: 0,
  cpsMultiplier: 0,
  rawCps: 0,
  playtime: 0,
  lifetimeClicks: 0,
  lifetimeManualClicks: 0,
  coinClickCount: 0,
  totalClickHelpers: 0,
  achievementsUnlocked: 0,
  hiddenAchievementsUnlocked: 0,
  offlineCpsPercent: 0,
};

function cpsClick() {
  if (!settings.pauseProduction) {
    stats.clicks += Math.round(stats.cps * 0.10);
    stats.trueClicks += Math.round(stats.cps * 0.10);
    stats.lifetimeClicks += Math.round(stats.cps * 0.10);
  }
}

function updatePlaytimeAndRNG() {
  if (achievements[0].unlocked) stats.playtime += 1000;
  buffRNGCalculation();
}

function recalcCpsAndClickValue() {
  stats.cps = stats.rawCps;
  stats.clickValue = stats.rawClickValue;

  if (buff === 'cpsDouble' && stats.cps !== stats.rawCps * 2)
    stats.cps = stats.rawCps * 2;

  if (buff === 'cv777%Cps' && stats.clickValue !== (stats.rawClickValue * Math.round(stats.cps * 777)))
    stats.clickValue = stats.rawClickValue * Math.round(stats.cps * 777);

  stats.cps += Math.round(stats.cps * stats.cpsMultiplier);
  stats.clickValue += Math.round(stats.clickValue * stats.clickValueMultiplier);
}

setInterval(cpsClick, 100);
setInterval(updatePlaytimeAndRNG, 1000);
