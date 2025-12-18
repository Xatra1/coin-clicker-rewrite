// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Any event listener that does not fit in any of the current JS files is put here

startButton.addEventListener('click', () => {
  sfx.play();

  titleScreen.style.display = 'none';
  game.style.display = 'block';
  shopPanel.style.display = 'block';
  statsPanel.style.display = 'block';

  init.GameStarted = !init.GameStarted;
  startBgCreate = true;
  achCheck = false;

  loadGame();
  randomMsg();

  if (debug) {
    shop.SuperClickerUnlocked = true;
    shop.DoublePointerUnlocked = true;
    uShop.SuperCursorUnlocked = true;
    uShop.EmployeeUnlocked = true;
    uShop.GodFingerUnlocked = true;
    uShop.ClickerFusionUnlocked = true;
  }

  $('.borders').css('display', 'block');
  leftBorderX = document.getElementById('leftborder').getBoundingClientRect().left;
  rightBorderX = document.getElementById('rightborder').getBoundingClientRect().left;
});

coin.addEventListener('click', (event) => {
  try {
    // Play and recreate click sfx, to allow for overlapping
    sfx.play();
    sfx = new Audio();
    sfx.src = './snd/click.mp3';

    // Mute the volume if debug autoplay is enabled.
    if (!debugAutoplay) sfx.volume = volume; else sfx.volume = 0;

    // Create a coin particle when clicking the coin and append it to the game panel
    if (!debugAutoplay && graphicsMode == 'Quality' && event.clientX != 0) {
      coinParticle = document.createElement('img');
      coinParticle.src = './img/coin.png';
      coinParticle.id = 'coinparticle';
      coinParticle.className = 'coinparticle hasanim fixed';
      coinParticle.style.top = `${event.clientY - 10}px`;
      coinParticle.style.left = `${event.clientX - 17}px`;
      coinParticle.style.opacity = '100%';
      coinParticle.style.animation = 'coinpartmov 0.5s ease-in forwards';
      game.appendChild(coinParticle);
    }

    // Update necessary states or throw an error if negative values are encountered.
    if (Math.sign(stats.Clicks) != -1 && Math.sign(stats.LifetimeClicks) != -1 && Math.sign(stats.ClickValue) != -1 && Math.sign(stats.CoinClickCount) != -1) {
      stats.Clicks += stats.ClickValue;
      stats.TrueClicks += stats.ClickValue
      stats.LifetimeClicks += stats.ClickValue;
      stats.LifetimeManualClicks += stats.ClickValue;
      stats.CoinClickCount++;
    } else { debugConsole += `${stats.Clicks}, ${stats.TrueClicks}, ${stats.LifetimeClicks}, ${stats.ClickValue}, ${stats.CoinClickCount}\n`; throw new Error('Non-absolute values in stats class.'); }

  } catch (error) { errorHandler(error); }
});



// Remove background particles that could slow down the reload process, and save the game
// If the game cannot be saved, prompt
window.addEventListener('beforeunload', function(event) {
  event.stopImmediatePropagation();
  $('.bg').remove();
  $('.coinparticle').remove();
  if (buff == 'none' && (doAutosave || debug)) {
    saveGame();
  } else if (navigator.userAgent.indexOf('Electron') < 0) event.preventDefault();
  else {
    savingString.textContent = 'Cannot refresh when a buff is active.';
    event.preventDefault();
  }
});

// Add intro animations over time to the title screen to prevent the title screen from behaving strangely if a prompt is displayed
document.addEventListener('loadevt', function() {
  try {
    //Hide loading screen
    loadingScreen.style.display = 'none';
    hiddenWhileLoading.style.display = 'block';

    // Pause all animations, and start the coin and intro string animation
    $('.hasanim').css('-webkit-animation-play-state', 'paused');
    $('.coins').css('-webkit-animation-play-state', 'running');
    $('#skipintrostring').css('-webkit-animation-play-state', 'running');

    setTimeout(function() {
      if (!init.GameStarted) sfx6.play();

      // Coin animations
      smallCoin3.style.animation = 'smallCoinMove3 1.5s 0.5s forwards';
      smallCoin4.style.animation = 'smallCoinMove4 1.5s 0.5s forwards';
      sfx6 = new Audio();
      sfx6.src = './snd/coinwhoosh.mp3';
      setTimeout(function() { if (!init.GameStarted) sfx6.play(); }, 500);
      smallCoin1.style.animation = 'smallCoinMove1 1.5s 0.8s forwards';
      smallCoin2.style.animation = 'smallCoinMove2 1.5s 0.8s forwards';

      setTimeout(function() {
        setTimeout(function() {
          if (!init.GameStarted) sfx7.play();

          // Title string and cosmetic clicker icon
          if (!prompting) {
            $('#title').css('-webkit-animation-play-state', 'running');
            $('#tsclicker').css('-webkit-animation-play-state', 'running');
          }
          // Hide the skip intro string
          skipIntroString.style.animation = 'btmstringmov 1s ease-in forwards';

          setTimeout(function() {
            if (!init.GameStarted) sfx7point1.play();
            // Beta text string
            if (!prompting) $('#betastring').css('-webkit-animation-play-state', 'running');

            setTimeout(function() {
              if (!init.GameStarted) sfx7.play();
              // Update name string
              if (!prompting) $('#updatestring').css('-webkit-animation-play-state', 'running');

              setTimeout(function() {
                // Spinning coins
                smallCoin3.style.rotate = '270deg';
                smallCoin4.style.rotate = '270deg';
                smallCoin1.style.animation = 'smallCoinSpin1 10s linear infinite';
                smallCoin2.style.animation = 'smallCoinSpin2 10s linear infinite';
                smallCoin3.style.animation = 'smallCoinSpin3 10s linear infinite';
                smallCoin4.style.animation = 'smallCoinSpin4 10s linear infinite';

                setTimeout(function() {
                  // Start button
                  if (!prompting) $('#startbutton').css('-webkit-animation-play-state', 'running');

                  setTimeout(function() {
                    if (!prompting) {
                      // Bottom information strings (build info, browser and client strings, etc)
                      $('.btmstr').css('-webkit-animation-play-state', 'running');
                    }
                  }, 1600); //8.4s
                }, 1800); //6.8s
              }, 900); //5.0s
            }, 400); //4.1s
          }, 500); //3.7s
        }, 300); //3.2s
      }, 1200); //2.9s
    }, 1700); //1.7s
  } catch (error) { errorHandler(error); }
});

document.addEventListener('keydown', function(event) {
  try {
    // Ctrl-S to save
    if ((event.key == 's' || event.key == 'S') && event.ctrlKey && debugScreenState == 'closed' && !debugAutoplay) {
      event.preventDefault();
      manualSave = true;
      saveGame();

      // Alt-D to toggle the debug screen
    } else if ((event.key == 'd' || event.key == 'D') && event.altKey) {
      event.preventDefault();

      // Open the debug screen
      if (init.GameStarted && debugScreenState == 'closed' && game.style.display == 'block') {
        debugScreen.style.display = 'block'
        debugScreenState = 'open';
        game.style.display = 'none';

        // Close the debug screen
      } else if (init.GameStarted && debugScreenState == 'open' && game.style.display == 'none') {
        debugScreen.style.display = 'none';
        debugScreenState = 'closed';
        game.style.display = 'block';
      }
      // Allow the starting animation to be skipped with the space bar
    } else if (event.key == ' ' && titleScreen.style.display == 'block') startButton.click();

    // Ctrl-Alt-D to enable debug mode
    else if ((event.key == 'd' || event.key == 'D') && event.ctrlKey && event.altKey && titleScreen.style.display == 'block') {
      event.preventDefault();
      debug = !debug; //True
      doAutosave = !doAutosave; //False
      startButton.click();

      // Ctrl-Alt-A to enable debug autoplay
    } else if ((event.key == 'a' || event.key == 'A') && event.ctrlKey && event.altKey && titleScreen.style.display == 'block') {
      event.preventDefault();
      prompting = !prompting; //True
      let prompt = confirm('Debug autoplay is purely for testing and your save will be wiped upon the next page load if you use it. Are you sure? (Pressing cancel will not affect your save.)');
      if (prompt) {
        debugAutoplay = !debugAutoplay; //True
        startButton.click();
      } else prompting = !prompting //False

      // Ctrl-Alt-D to enable both debug mode and debug autoplay
    } else if ((event.key == 'b' || event.key == 'B') && event.ctrlKey && event.altKey && titleScreen.style.display == 'block') {
      event.preventDefault();
      debug = !debug; //True
      doAutosave = !doAutosave; //False
      prompting = !prompting; //True
      let prompt = confirm('Debug autoplay is purely for testing and your save will be wiped upon the next page load if you use it. Are you sure? (Pressing cancel will just enable debug mode, not debug autoplay.)');
      if (prompt) debugAutoplay = !debugAutoplay; /*True*/ else prompting = !prompting; /*False*/
      startButton.click();

      // Shift-F to toggle the FPS counter
    } else if ((event.key == 'f' || event.key == 'F') && event.shiftKey && fpsLabel.style.display == 'none') fpsLabel.style.display = 'block';
    else if ((event.key == 'f' || event.key == 'F') && event.shiftKey && fpsLabel.style.display == 'block') fpsLabel.style.display = 'none';
    // A to toggle the achievements screen
    else if ((event.key == 'a' || event.key == 'A') && game.style.display == 'block') achievementsButton.click();
    else if ((event.key == 'a' || event.key == 'A') && achievementsPanel.style.display == 'block') backToGame.click();
    // S to toggle the settings screen
    else if ((event.key == 's' || event.key == 'S') && game.style.display == 'block') settingsButton.click();
    else if ((event.key == 's' || event.key == 'S') && settingsPanel.style.display == 'block') backToGame2.click();
    // U to toggle the upgrade shop
    else if ((event.key == 'u' || event.key == 'U') && shopPanel.style.display == 'block' && debugKeyInputScreen.style.display != 'block' && debugScreen.style.display != 'block') upgradeButton.click();
    else if ((event.key == 'u' || event.key == 'U') && shopPanel.style.display == 'none' && debugKeyInputScreen.style.display != 'block' && debugScreen.style.display != 'block') upgradeRTS.click();
    // B to toggle autobuy
    else if ((event.key == 'b' || event.key == 'B') && init.GameStarted && event.target != commandInput) autoBuyBtn.click();

    // Arrow keys to shift through the debug command history
    else if (event.key == 'ArrowUp') {
      if (cmdHist[cmdHistInx - 1] != undefined) cmdHistInx--;
      commandInput.value = cmdHist[cmdHistInx];
      if (cmdHist[cmdHistInx] == undefined) commandInput.value = '';

    } else if (event.key == 'ArrowDown') {
      if (cmdHist[cmdHistInx + 1] != undefined) cmdHistInx++;
      commandInput.value = cmdHist[cmdHistInx];
      if (cmdHist[cmdHistInx] == undefined) commandInput.value = '';
    }

  } catch (error) { errorHandler(error); }
});

// Space to click the coin
document.addEventListener('keyup', function(event) { if (event.key == ' ' && game.style.display == 'block') coin.click(); });

// Shift the position of info labels so they follow the cursor
document.addEventListener('mousemove', function(event) {
  let left = event.clientX,
    top = event.clientY;

  clickerInfo.style.left = `${leftBorderX}px`;
  clickerInfo.style.top = `${top - 35}px`;

  superClickerInfo.style.top = `${top - 35}px`;
  superClickerInfo.style.left = `${leftBorderX}px`;

  doublePointerInfo.style.left = `${leftBorderX}px`;
  doublePointerInfo.style.top = `${top - 35}px`;

  achievementsLabel.style.left = `${left - achievementsLabel.getBoundingClientRect().width / 2}px`;
  achievementsLabel.style.top = `${top}px`;

  settingsLabel.style.left = `${left - settingsLabel.getBoundingClientRect().width / 2}px`;
  settingsLabel.style.top = `${top}px`;
});

betaString.addEventListener('animationend', function() { startBgCreate = true });
