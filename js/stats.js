// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Stats calculations

class baseStats {
  constructor() {
    this.clicks = 0;
    this.trueClicks = 0;
    this.clickValue = 1;
    this.rawClickValue = 1;
    this.cps = 0;
    this.rawCps = 0;
    this.Playtime = 0;
    this.lifetimeClicks = 0;
    this.lifetimeManualClicks = 0;
    this.coinClickCount = 0;
    this.totalClickHelpers = 0;
    this.achievementsUnlocked = 0;
    this.hiddenAchievementsUnlocked = 0;
    this.offlineCpsPercent = 0;
  }
};

var stats = new baseStats();

function cpsClick() {
  try {
    stats.clicks += stats.cps * 0.10;
    stats.trueClicks += stats.cps * 0.10;
    stats.lifetimeClicks += stats.cps * 0.10;
    stats.clicks = Math.round(stats.clicks);
    stats.trueClicks = Math.round(stats.trueClicks);
    stats.lifetimeClicks = Math.round(stats.lifetimeClicks);
  } catch (error) { errorHandler(error); }
}

setInterval(cpsClick, 100);

setInterval(function() {
  if (ach[0][3]) stats.playtime += 1000;
  buffRNGCalc();
}, 1000);
