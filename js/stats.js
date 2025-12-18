// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Stats calculations

class baseStats {
  constructor() {
    this.Clicks = 0;
    this.TrueClicks = 0;
    this.ClickValue = 1;
    this.RawClickVal = 1;
    this.ClicksPS = 0;
    this.RawClicksPS = 0;
    this.Playtime = 0;
    this.LifetimeClicks = 0;
    this.LifetimeManualClicks = 0;
    this.CoinClickCount = 0;
    this.TotalClickHelpers = 0;
    this.AchievementsUnlocked = 0;
    this.HiddenAchievementsUnlocked = 0;
    this.OfflineClicksPSPercen = 0;
  }
};

var stats = new baseStats();

function cpsClick() {
  try {
    stats.Clicks += stats.ClicksPS * 0.10;
    stats.TrueClicks += stats.ClicksPS * 0.10;
    stats.LifetimeClicks += stats.ClicksPS * 0.10;
    stats.Clicks = Math.round(stats.Clicks);
    stats.TrueClicks = Math.round(stats.TrueClicks);
    stats.LifetimeClicks = Math.round(stats.LifetimeClicks);
  } catch (error) { errorHandler(error); }
}

setInterval(cpsClick, 100);
setInterval(function() { if (ach[0][3]) stats.Playtime += 1000; buffRNGCalc(); }, 1000);
