// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Any event listener that does not fit in any of the current JS files is put here
"use strict";

startButton.addEventListener('click', () => {
  loadAudio();
  sfxClick.play();

  titleScreen.style.display = 'none';
  gamePanel.style.display = 'block';
  shopPanel.style.display = 'block';
  statsPanel.style.display = 'block';

  gameStarted = true;
  startCreatingCoinSprites = true;

  randomMessage();

  document.getElementById("borderCanvas").style.display = 'block';
  canvasDraw();
});

coin.addEventListener('mouseup', event => {
  sfxClick.play();

  if (!settings.performanceMode) {
    const coinSprite = document.createElement('img');
    coinSprite.src = './img/coin.png';
    coinSprite.id = 'coinSprite';
    coinSprite.className = 'hasAnimation fixed coinSprites';
    coinSprite.style.top = `${(100 * event.clientY / innerHeight) - 1}vh`;
    coinSprite.style.left = `${(100 * event.clientX / innerWidth) - 1.2}vw`;
    gamePanel.appendChild(coinSprite);
    setTimeout(() => {
      gamePanel.removeChild(coinSprite);
    }, 500);
  }

  stats.clicks += stats.clickValue;
  stats.trueClicks += stats.clickValue
  stats.lifetimeClicks += stats.clickValue;
  stats.lifetimeManualClicks += stats.clickValue;
  stats.coinClickCount++;
});

window.addEventListener('resize', () => {
  if (titleScreen.style.display === 'none') canvasDraw();
});

document.addEventListener('keydown', event => {
  switch (event.key) {
    // Ctrl-S - Save
    case 's':
      if (event.ctrlKey) {
        event.preventDefault();
        manualSave = true;
        saveGame();
        // S - Toggle settings
      } else {
        if (debugScreen.style.display !== 'flex' && gameStarted) {
          if (gamePanel.style.display === 'block')
            settingsButton.click();
          else backToGameSettings.click();
        }
      }
      break;

    // Alt-D - Open debug console
    case 'd':
      if (event.altKey && gameStarted
        && settingsPanel.style.display === 'none'
        && achievementsPanel.style.display === 'none'
      ) {
        event.preventDefault();
        if (gamePanel.style.display === 'none') {
          debugScreen.style.display = 'none';
          gamePanel.style.display = 'block';
          updateStars();
        } else {
          debugScreen.style.display = 'flex';
          gamePanel.style.display = 'none';
        }
      }

      // Ctrl-Alt-D - Turn on debug mode (unlocks all shop items)
      if (!gameStarted && event.ctrlKey && event.altKey) {
        console.log('Debug mode enabled.');
        debug = true;
        doAutosave = false;
        startButton.click();
      }
      break;

    // Space - Start game
    case ' ':
      if (!gameStarted) startButton.click();
      break;

    // Shift-F - FPS counter toggle
    case 'F':
      if (fpsLabel.style.display === 'none')
        fpsLabel.style.display = 'block';
      else fpsLabel.style.display = 'none';
      break;

    // A - Achievements screen toggle
    case 'a':
      if (debugScreen.style.display !== 'flex' && gameStarted) {
        if (gamePanel.style.display === 'block')
          achievementsButton.click();
        else backToGame.click();
        updateStars();
      }
      break;

    // U - Upgrade shop toggle
    case 'u':
      if (debugScreen.style.display !== 'flex' && gameStarted) {
        if (shopPanel.style.display === 'block')
          upgradeShopButton.click();
        else upgradeShopReturn.click();
      }
      break;

    // Up/Down - Move through command history
    case 'ArrowUp':
      if (commandHistory[commandHistoryIndex - 1] !== undefined)
        commandHistoryIndex--;
      commandInput.value = commandHistory[commandHistoryIndex];
      if (commandHistory[commandHistoryIndex] === undefined) commandInput.value = '';
      break;

    case 'ArrowDown':
      if (commandHistory[commandHistoryIndex] !== undefined)
        commandHistoryIndex++;
      commandInput.value = commandHistory[commandHistoryIndex];
      if (commandHistory[commandHistoryIndex] === undefined) commandInput.value = '';
      break;
  }
});

document.addEventListener('mousemove', event => {
  let left = event.clientX,
    top = event.clientY;

  const infoLabels = [achievementsLabel, settingsLabel];

  infoLabels.forEach(label => {
    label.style.left = `${left - label.getBoundingClientRect().width / 2}px`;
    label.style.top = `${top}px`;
  })
});

betaString.addEventListener('animationend', () => { startCreatingCoinSprites = true });
