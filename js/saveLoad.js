// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Saving, loading, and save removal
"use strict";

var lastSavedTime = 'Never',
  manualSave = false,
  readyToSave = true,
  doAutosave = true,
  saveData = {},
  dataLoaded = false,
  offlineCoins = 0;

loadGame();

function saveGame() {
  if (readyToSave) {
    readyToSave = false;

    savingString.textContent = 'Saving...';
    savingString.style.display = 'block';

    let saveTime = Math.floor(new Date().getTime() / 1000);

    lastSavedTime = new Date().toString();

    const achievementUnlockStates = [];
    for (let i = 0; i < achievements.length; i++)
      achievementUnlockStates.push(achievements[i].unlocked)

    saveData = {
      stats,
      shops,
      settings,

      achievementsUnlocked: achievementUnlockStates,
      commandHistory,

      lastSavedTime
    }

    localStorage.setItem('saveData', JSON.stringify(saveData));
    localStorage.setItem('lastPlayed', JSON.stringify(saveTime));

    readyToSave = true;

    if (manualSave) {
      savingString.textContent = 'Game saved.';
      manualSave = false;
    } else savingString.textContent = 'Game autosaved.';

    labelHideTimer = 200;
  }
}

// if the target has new values, using Object.assign() to assign the
// corresponding object to it will overwrite any new values in the target. this
// prevents that by only assigning source objects that already exist in the
// target
function deepMerge(target, source) {
  for (const property in source) {
    if (Object.hasOwn(source, property)) {
      if (source[property] instanceof Object && property in target && target[property] instanceof Object)
        target[property] = Object.assign(target[property], source[property])
      else target[property] = source[property];
    }
  }
  return target;
}

function loadGame() {
  if (localStorage.getItem('saveData', saveData)) {
    let data = localStorage.getItem('saveData', saveData),
      loadData = JSON.parse(data);

    stats = deepMerge(stats, loadData.stats);

    recalcCpsAndClickValue();

    if (stats.offlineCpsPercent > 0) {
      offlineCpsString.style.display = 'block';

      let loadTimestamp = new Date().getTime() / 1000,
        saveTimestamp = JSON.parse(localStorage.getItem('lastPlayed')),
        timestampDifference = loadTimestamp - saveTimestamp;

      offlineCoins = Math.ceil((stats.cps * stats.offlineCpsPercent) * timestampDifference);
      console.log(timestampDifference);

      stats.clicks += offlineCoins;
      stats.lifetimeClicks += offlineCoins;
      stats.trueClicks += offlineCoins;

      saveTimestamp = Math.floor(new Date().getTime() / 1000);
      localStorage.setItem('lastPlayed', saveTimestamp);

      unlockString.style.display = 'block';

      updateScreen();

      offlineCoins === 1
        ? unlockString.textContent = `Your employees produced ${formattedStrings.offlineCoins.text} coin while you were away.`
        : unlockString.textContent = `Your employees produced ${formattedStrings.offlineCoins.text} coins while you were away.`;

      labelHideTimer = 200;
    }

    shops.normalShop = deepMerge(shops.normalShop, loadData.shops.normalShop);
    shops.upgradeShop = deepMerge(shops.upgradeShop, loadData.shops.upgradeShop);

    initializeShopItems();

    for (let i = 0; i < achievements.length; i++)
      achievements[i].unlocked = loadData.achievementsUnlocked[i];

    if (stats.hiddenAchievementsUnlocked !== 0)
      secretAchievementHeaderString.style.display = 'block';

    if (achievements[25].unlocked) {
      breakpoint.style.display = 'inline';
      breakpointIcon.style.display = 'inline';
    }

    if (achievements[26].unlocked) {
      cheater.style.display = 'inline';
      cheaterIcon.style.display = 'inline';
    }

    commandHistory = loadData.commandHistory;

    settings = deepMerge(settings, loadData.settings)

    volumeInput.value = settings.volume * 100;

    if (loadData.settings.backgroundGradientEdge !== '') backgroundGradientEdgeInput.value = loadData.settings.backgroundGradientEdge;
    if (loadData.settings.backgroundGradientCenter !== '') backgroundGradientCenterInput.value = loadData.settings.backgroundGradientCenter;
    document.body.style.backgroundImage = `radial-gradient(rgb(${backgroundGradientCenterInput.value}), rgb(${backgroundGradientEdgeInput.value})`;

    graphicsSettingButton.textContent = settings.performanceMode ? 'Off' : 'On';
    numberShortenButton.textContent = settings.numberShorten ? 'Units' : 'Commas';
    pauseProductionButton.textContent = settings.pauseProduction ? 'On' : 'Off';

    lastSavedTime = loadData.lastSavedTime;
  } else initializeShopItems();
  dataLoaded = true;
}

function wipeSave() {
  let prompt = confirm('This will cause the page to refresh. Continue?');
  if (prompt) {
    localStorage.removeItem('saveData');
    location.reload();
  }
}

function autosave() {
  if (gameStarted && achievements[0].unlocked && doAutosave) {
    manualSave = false;
    saveGame();
  }
}

setInterval(autosave, 60000);

saveButton.addEventListener('click', function() {
  sfxClick.play();
  manualSave = true;
  saveGame();
});

wipeSaveButton.addEventListener('click', function() {
  sfxClick.play();
  wipeSave();
});
