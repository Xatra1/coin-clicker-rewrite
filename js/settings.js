// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Settings menu events and toggles
"use strict";

// TODO: implement a toggle for number shortening

var settings = {
  volume: 1.0,
  backgroundGradientCenter: backgroundGradientCenterInput.value,
  backgroundGradientEdge: backgroundGradientEdgeInput.value,
  performanceMode: false,
  numberShorten: true,
  pauseProduction: false,
}

backgroundGradientCenterInput.value = '250, 224, 65';
backgroundGradientEdgeInput.value = '249, 160, 40';
volumeInput.value = settings.volume * 100;

backgroundGradientCenterInput.addEventListener('change', () => {
  document.body.style.backgroundImage = `radial-gradient(rgb(${settings.backgroundGradientCenter = backgroundGradientCenterInput.value}), rgb(${settings.backgroundGradientEdge = backgroundGradientEdgeInput.value})`;
});

backgroundGradientEdgeInput.addEventListener('change', () => {
  document.body.style.backgroundImage = `radial-gradient(rgb(${settings.backgroundGradientCenter = backgroundGradientCenterInput.value}), rgb(${settings.backgroundGradientEdge = backgroundGradientEdgeInput.value})`;
});

settingsButton.addEventListener('click', () => {
  if (achievementsPanel.style.display === 'none') {
    sfxClick.play();
    settingsPanel.style.display = 'block';
    gamePanel.style.display = 'none';
  }
});

volumeInput.addEventListener('change', () => {
  if (volumeInput.value >= 0 && volumeInput.value <= 100 && readyToSave) {
    settings.volume = volumeInput.value / 100;
    for (let i = 0; i < sounds.length; i++) sounds[i].volume = volume;
  } else volumeInput.value = settings.volume * 100;
});

graphicsSettingButton.addEventListener('click', () => {
  sfxClick.play();
  settings.performanceMode = !settings.performanceMode;
  graphicsSettingButton.textContent = settings.performanceMode ? 'Off' : 'On';
});

numberShortenButton.addEventListener('click', () => {
  sfxClick.play();
  settings.numberShorten = !settings.numberShorten;
  numberShortenButton.textContent = settings.numberShorten ? 'Units' : 'Commas';
})

pauseProductionButton.addEventListener('click', () => {
  sfxClick.play();
  settings.pauseProduction = !settings.pauseProduction;
  pauseProductionButton.textContent = settings.pauseProduction ? 'On' : 'Off';
})

resetBackgroundButton.addEventListener('click', function() {
  let prompt = confirm('This will save the game. Continue?');
  if (prompt) {
    backgroundGradientCenterInput.value = '250, 224, 65';
    backgroundGradientEdgeInput.value = '249, 160, 40';
    document.body.style.backgroundImage = 'radial-gradient(rgb(250, 224, 65), rgb(249, 160, 40))';
    saveGame();
  }
});

backToGameSettings.addEventListener('click', () => {
  if (achievementsPanel.style.display === 'none') {
    sfxClick.play();
    gamePanel.style.display = 'block';
    settingsPanel.style.display = 'none';
    updateStars();
  }
});
