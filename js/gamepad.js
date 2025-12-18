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
  this.setInterval(function() {
    gamepad = navigator.getGamepads()[0];
  }, 1);

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
    cross = gamepad.buttons[0].pressed;
    circle = gamepad.buttons[1].pressed;
    square = gamepad.buttons[2].pressed;
    triangle = gamepad.buttons[3].pressed;
    l1 = gamepad.buttons[4].pressed;
    r1 = gamepad.buttons[5].pressed;
    l2 = gamepad.buttons[6].pressed;
    r2 = gamepad.buttons[7].pressed;
    share = gamepad.buttons[8].pressed;
    options = gamepad.buttons[9].pressed;
    l3 = gamepad.buttons[10].pressed;
    r3 = gamepad.buttons[11].pressed;
    dpadUp = gamepad.buttons[12].pressed;
    dpadDown = gamepad.buttons[13].pressed;
    dpadLeft = gamepad.buttons[14].pressed;
    dpadRight = gamepad.buttons[15].pressed;

    if (!cross && !circle && !square && !triangle && !l1 && !r1 && !l2 && !r2 && !share && !options && !l3 && !r3 && !dpadUp && !dpadDown && !dpadLeft && !dpadRight) buttonPressed = false;

    if (cross && !init.GameStarted) startButton.click();

    if ((circle || cross) && init.GameStarted && !buttonPressed) { buttonPressed = true; coin.click(); }

    if (square && init.GameStarted && !buttonPressed) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble', { startDelay: 0, duration: 50, weakMagnitude: 1.0, strongMagnitude: 1.0 });
      if (shopPanel.style.display == 'block') upgradeButton.click();
      else if (upgradeShopPanel.style.display == 'block') upgradeRTS.click();
    }

    if (triangle && init.GameStarted && !buttonPressed) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble', { startDelay: 0, duration: 50, weakMagnitude: 1.0, strongMagnitude: 1.0 });
      manualSave = true;
      saveGame();
    }

    if (share && init.GameStarted && !buttonPressed) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble', { startDelay: 0, duration: 50, weakMagnitude: 1.0, strongMagnitude: 1.0 });
      if (game.style.display == 'block') achievementsButton.click();
      else if (achievementsPanel.style.display == 'block') backToGame.click();
    }

    if (options && init.GameStarted && !buttonPressed) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble', { startDelay: 0, duration: 50, weakMagnitude: 1.0, strongMagnitude: 1.0 });
      if (game.style.display == 'block') settingsButton.click();
      else if (settingsPanel.style.display == 'block') backToGame2.click();
    }

    if (l1 && init.GameStarted && !buttonPressed) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble', { startDelay: 0, duration: 50, weakMagnitude: 1.0, strongMagnitude: 1.0 });
      if (upgradeShopPanel.style.display == 'none') clickerBuy.click();
      else cursorBuy.click();
    }

    if (r1 && init.GameStarted && !buttonPressed && (shop.SuperClickerUnlocked || uShop.SuperCursorUnlocked)) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble', { startDelay: 0, duration: 50, weakMagnitude: 1.0, strongMagnitude: 1.0 });
      if (upgradeShopPanel.style.display == 'none') superClickerBuy.click();
      else superCursorBuy.click();
    }

    if (l2 && init.GameStarted && !buttonPressed && (shop.DoublePointerUnlocked || uShop.EmployeeUnlocked)) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble', { startDelay: 0, duration: 50, weakMagnitude: 1.0, strongMagnitude: 1.0 });
      if (upgradeShopPanel.style.display == 'none') doublePointerBuy.click();
      else employeeBuy.click();
    }

    if (r2 && init.GameStarted && !buttonPressed && uShop.GodFingerUnlocked) { buttonPressed = true; gamepad.vibrationActuator.playEffect('dual-rumble', { startDelay: 0, duration: 50, weakMagnitude: 1.0, strongMagnitude: 1.0 }); if (upgradeShopPanel.style.display == 'block') godFingerBuy.click(); }

    if (r3) location.reload();

    if (dpadUp) { let gamepadActive = true; wipeSave(gamepadActive); }

    if (dpadLeft && init.GameStarted && !buttonPressed && achievementsPanel.style.display == 'block') {
      buttonPressed = true;
      if (gpAchIndex > 0) gpAchIndex--;
      lib.achLabelSwitch(gpAchIndex);
    } else if (dpadLeft && init.GameStarted && !buttonPressed && upgradeShopPanel.style.display == 'block' && uShop.ClickerFusionUnlocked) {
      buttonPressed = true;
      gamepad.vibrationActuator.playEffect('dual-rumble', { startDelay: 0, duration: 50, weakMagnitude: 1.0, strongMagnitude: 1.0 });
      clickerFusionBuy.click();
    }

    if (dpadRight && init.GameStarted && !buttonPressed && achievementsPanel.style.display == 'block') { buttonPressed = true; if (gpAchIndex < 24) gpAchIndex++; lib.achLabelSwitch(gpAchIndex); }
  }
}, 1000 / 60)
