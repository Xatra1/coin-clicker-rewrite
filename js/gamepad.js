// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Gamepad support

var buttonPressed = false,
  gamepad,
  gamepadAchievementIndex = 0;

window.addEventListener('gamepadconnected', function(event) {
  event.gamepad.vibrationActuator.playEffect('dual-rumble',
    {
      startDelay: 0,
      duration: 100,
      weakMagnitude: 1.0,
      strongMagnitude: 1.0
    });

  setTimeout(function() {
    event.gamepad.vibrationActuator.playEffect('dual-rumble',
      {
        startDelay: 0,
        duration: 100,
        weakMagnitude: 1.0,
        strongMagnitude: 1.0
      });
  }, 500);

  globalThis.gamepad = event.gamepad;
  this.setInterval(function() { gamepad = navigator.getGamepads()[0]; }, 1);

  unlockString.textContent = `Gamepad connected: ${event.gamepad.id}`;
  labelHideTimeout = 500;
});

// Controls:
//
// Cross (on title screen) - Starts game
// Cross/Circle - Clicks coin
// Square - Toggles visibility of upgrade shop
// Triangle - Saves game
// Share - Toggles visibility of achievements panel
// Options - Toggles visibility of settings panel
// L1 - Buys a clicker/cursor (when upgrade shop is visible)
// R1 - Buys a super clicker/super cursor (when upgrade shop is visible)
// L2 - Buys a double pointer/employee (when upgrade shop is visible)
// R2 - Buys a god finger
// R3 - Refreshes page
// Up - Wipe save
// Left (when achievements screen is visible) - Moves backwards through the achievements list
// Left (when upgrade shop is visible) - Buys clicker fusion
// Right (when achievements screen is visible) - Moves forwards through the achievements list
setInterval(() => {
  if (gamepad) {
    buttonsPressed = [
      gamepad.buttons[0].pressed, // Cross
      gamepad.buttons[1].pressed, // Circle
      gamepad.buttons[2].pressed, // Square
      gamepad.buttons[3].pressed, // Triangle
      gamepad.buttons[4].pressed, // L1
      gamepad.buttons[5].pressed, // R1
      gamepad.buttons[6].pressed, // L2
      gamepad.buttons[7].pressed, // R2
      gamepad.buttons[8].pressed, // Share
      gamepad.buttons[9].pressed, // Options
      //gamepad.buttons[10].pressed, // L3
      gamepad.buttons[11].pressed, // R3
      gamepad.buttons[12].pressed, // Up
      gamepad.buttons[13].pressed, // Down
      gamepad.buttons[14].pressed, // Left
      gamepad.buttons[15].pressed // Right
    ]

    for (let i = 0; i < buttonsPressed.length; i++) {
      if (!buttonsPressed[i]) buttonsPressed = false;
    }

    if (buttonsPressed[0] && !init.GameStarted) startButton.click();

    if ((buttonsPressed[0] || buttonsPressed[1]) && gameStarted && !buttonPressed) {
      buttonPressed = true;
      coin.click();
    }

    if (buttonsPressed[2] && gameStarted && !buttonPressed) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble',
        {
          startDelay: 0,
          duration: 50,
          weakMagnitude: 1.0,
          strongMagnitude: 1.0
        });
      if (shopPanel.style.display == 'block') upgradeButton.click();
      else if (upgradeShopPanel.style.display == 'block') upgradeShopReturn.click();
    }

    if (buttonsPressed[3] && gameStarted && !buttonPressed) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble',
        {
          startDelay: 0,
          duration: 50,
          weakMagnitude: 1.0,
          strongMagnitude: 1.0
        });
      manualSave = true;
      saveGame();
    }

    if (buttonsPressed[8] && init.GameStarted && !buttonPressed) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble',
        {
          startDelay: 0,
          duration: 50,
          weakMagnitude: 1.0,
          strongMagnitude: 1.0
        });
      if (gamePanel.style.display == 'block') achievementsButton.click();
      else if (achievementsPanel.style.display == 'block') backToGame.click();
    }

    if (buttonsPressed[9] && gameStarted && !buttonPressed) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble',
        {
          startDelay: 0,
          duration: 50,
          weakMagnitude: 1.0,
          strongMagnitude: 1.0
        });
      if (game.style.display == 'block') settingsButton.click();
      else if (settingsPanel.style.display == 'block') backToGameSettings.click();
    }

    if (buttonsPressed[4] && gameStarted && !buttonPressed) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble',
        {
          startDelay: 0,
          duration: 50,
          weakMagnitude: 1.0,
          strongMagnitude: 1.0
        });
      if (upgradeShopPanel.style.display == 'none') clickerBuy.click();
      else cursorBuy.click();
    }

    if (buttonsPressed[5] && init.GameStarted && !buttonPressed && (shop.SuperClickerUnlocked || upgradeShop.SuperCursorUnlocked)) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble',
        {
          startDelay: 0,
          duration: 50,
          weakMagnitude: 1.0,
          strongMagnitude: 1.0
        });
      if (upgradeShopPanel.style.display == 'none') superClickerBuy.click();
      else superCursorBuy.click();
    }

    if (buttonsPressed[6] && gameStarted && !buttonPressed && (shop.DoublePointerUnlocked || upgradeShop.EmployeeUnlocked)) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble',
        {
          startDelay: 0,
          duration: 50,
          weakMagnitude: 1.0,
          strongMagnitude: 1.0

        });
      if (upgradeShopPanel.style.display == 'none') doublePointerBuy.click();
      else employeeBuy.click();
    }

    if (buttonsPressed[7] && gameStarted && !buttonPressed && upgradeShop.GodFingerUnlocked) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble',
        {
          startDelay: 0,
          duration: 50,
          weakMagnitude: 1.0,
          strongMagnitude: 1.0

        });
      if (upgradeShopPanel.style.display == 'block') godFingerBuy.click();
    }

    if (buttonsPressed[11]) location.reload();

    if (buttonsPressed[12]) wipeSave(true);

    if (buttonPressed[14] && gameStarted && !buttonPressed && achievementsPanel.style.display == 'block') {
      buttonPressed = true;
      if (gamepadAchievementIndex > 0) gamepadAchievementIndex--;
      loadAchievementStrings(gamepadAchievementIndex);
    } else if (buttonsPressed[14] && gameStarted && !buttonPressed && upgradeShopPanel.style.display == 'block' && uShop.ClickerFusionUnlocked) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble',
        {
          startDelay: 0,
          duration: 50,
          weakMagnitude: 1.0,
          strongMagnitude: 1.0
        });
      clickerFusionBuy.click();
    }

    if (buttonPressed[15] && gameStarted && !buttonPressed && achievementsPanel.style.display == 'block') {
      buttonPressed = true;
      if (gamepadAchievementIndex < 24) gamepadAchievementIndex++;
      loadAchievementStrings(gamepadAchievementIndex);
    }
  }
}, 1000 / 60)
