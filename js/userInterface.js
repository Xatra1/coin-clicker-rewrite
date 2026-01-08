// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Visible UI e.g. screen updates, background sprite effects etc.
"use strict";

const display = {
  clicks: 0,
  clickValue: 1,
  rawClickValue: 1,
  cps: 0,
  rawCps: 0,
  lifetimeClicks: 0,
  lifetimeManualClicks: 0,
  coinClickCount: 0,
  clickerCps: 0,
  clickerCost: 0,
  superClickerCps: 0,
  superClickerCost: 0,
  doublePointerCps: 0,
  doublePointerCost: 0,
  employeeCost: 0,
  playtime: 0
},

  ctx = canvas.getContext("2d");

var increase = true,
  red = 0,
  green = 0,

  startCreatingCoinSprites = false,
  backgroundSpriteUpdateInterval = 75,
  backgroundSpriteMax = 75,

  updateInterval,

  leftBorderX = 0,
  rightBorderX = 0,

  times = [],
  fps,

  labelHideTimer = 1,
  labelSwitch = false,

  formattedStrings = {};

fpsLabel.style.display = 'none';
achievementsPanel.style.display = 'none';
settingsPanel.style.display = 'none';
upgradeShopPanel.style.display = 'none';

function getFps() {
  window.requestAnimationFrame(() => {
    let now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) times.shift();
    times.push(now);
    fps = times.length;
    fpsLabel.textContent = `FPS: ${fps}`;
    getFps();
  });
}

getFps();

function updateScreen() {
  formattedStrings = {
    clicks: { integer: display.clicks, text: null },
    clickValue: { integer: display.clickValue, text: null },
    rawClickValue: { integer: display.rawClickValue, text: null },
    cps: { integer: display.cps, text: null },
    rawCps: { integer: display.rawCps, text: null },
    lifetimeClicks: { integer: display.lifetimeClicks, text: null },
    lifetimeManualClicks: { integer: display.lifetimeManualClicks, text: null },
    coinClickCount: { integer: display.coinClickCount, text: null },
    totalClickHelpers: { integer: stats.totalClickHelpers, text: null },
    clickerCps: { integer: display.clickerCps, text: null },
    clickerCost: { integer: display.clickerCost, text: null },
    clickersOwned: { integer: shops.normalShop.clicker.amountOwned, text: null },
    clickerCpsWorth: { integer: shops.normalShop.clicker.cpsWorth, text: null },
    superClickerCps: { integer: display.superClickerCps, text: null },
    superClickerCost: { integer: display.superClickerCost, text: null },
    superClickersOwned: { integer: shops.normalShop.superClicker.amountOwned, text: null },
    superClickerCpsWorth: { integer: shops.normalShop.superClicker.cpsWorth, text: null },
    doublePointerCps: { integer: display.doublePointerCps, text: null },
    doublePointerCost: { integer: display.doublePointerCost, text: null },
    doublePointersOwned: { integer: shops.normalShop.doublePointer.amountOwned, text: null },
    doublePointerCpsWorth: { integer: shops.normalShop.doublePointer.cpsWorth, text: null },
    employeeCost: { integer: display.employeeCost, text: null },
    employeesOwned: { integer: shops.upgradeShop.employee.amountOwned, text: null },
    cursorCost: { integer: shops.upgradeShop.cursor.cost, text: null },
    superCursorCost: { integer: shops.upgradeShop.superCursor.cost, text: null },
    godFingerCost: { integer: shops.upgradeShop.godFinger.cost, text: null },
    clicksAdded: { integer: clicksAdded, text: null },
    offlineCoins: { integer: offlineCoins, text: null }
  };

  numberFormat();

  if (buff === 'none' && gameStarted)
    document.title = `${formattedStrings.clicks.text} coins | Coin Clicker v${buildNumber}`;
  else if (gameStarted) document.title = `A buff is active! | Coin Clicker v${buildNumber}`;
  else document.title = `Coin Clicker v${buildNumber}`;

  if (!document.hidden) {

    clickString.textContent = `Coins: ${formattedStrings.clicks.text}`;
    cpsString.textContent = `Coins per Second: ${formattedStrings.cps.text}`;
    clickValueString.textContent = `Click Value: ${formattedStrings.clickValue.text}`;

    const regularShopValueStrings = [
      [clickerCpsString, `CpS: +${formattedStrings.clickerCps.text}`],
      [clickerCostString, `Cost: ${formattedStrings.clickerCost.text}`],
      [clickersOwnedString, `Owned: ${formattedStrings.clickersOwned.text}`],

      [superClickerCpsString, `CpS: +${formattedStrings.superClickerCps.text}`],
      [superClickerCostString, `Cost: ${formattedStrings.superClickerCost.text}`],
      [superClickersOwnedString, `Owned: ${formattedStrings.superClickersOwned.text}`],

      [doublePointerCpsString, `CpS: +${formattedStrings.doublePointerCps.text}`],
      [doublePointerCostString, `Cost: ${formattedStrings.doublePointerCost.text}`],
      [doublePointersOwnedString, `Owned: ${formattedStrings.doublePointersOwned.text}`]
    ]

    for (let i = 0; i < regularShopValueStrings.length; i++)
      regularShopValueStrings[i][0].textContent = regularShopValueStrings[i][1];

    const regularShopInfoStuff = [
      [shops.normalShop.clicker, clickerInfo, "clickers(s)", formattedStrings.clickersOwned.text, formattedStrings.clickerCpsWorth.text, formattedStrings.clickerCpsWorth.integer],
      [shops.normalShop.superClicker, superClickerInfo, "super clickers(s)", formattedStrings.superClickersOwned.text, formattedStrings.superClickerCpsWorth.text, formattedStrings.superClickerCpsWorth.integer],
      [shops.normalShop.doublePointer, doublePointerInfo, "double pointer(s)", formattedStrings.doublePointersOwned.text, formattedStrings.doublePointerCpsWorth.text, formattedStrings.doublePointerCpsWorth.integer]
    ]

    function updateInfoStrings(array) {
      if (array[0].amountOwned !== 0)
        array[1].textContent = `Your ${array[3]} ${array[2]} account for ${array[4]} (${Math.round((array[5] / stats.rawCps) * 100)}%) of your raw CpS.`;
    }

    for (let i = 0; i < regularShopInfoStuff.length; i++) updateInfoStrings(regularShopInfoStuff[i]);

    const upgradeInfo = [
      [shops.upgradeShop.cursor.owned, cursorOwnedString, cursorCostString, formattedStrings.cursorCost.text],
      [shops.upgradeShop.superCursor.owned, superCursorOwnedString, superCursorCostString, formattedStrings.superCursorCost.text],
      [shops.upgradeShop.godFinger.owned, godFingerOwnedString, godFingerCostString, formattedStrings.godFingerCost.text,],
      [shops.upgradeShop.clickerFusion.owned, clickerFusionOwnedString, clickerFusionCostString, '150 clickers']
    ]

    for (let i in upgradeInfo) {
      if (upgradeInfo[i][0]) {
        upgradeInfo[i][1].textContent = 'Owned.';
        upgradeInfo[i][2].textContent = 'Cost: Bought.';
      } else {
        upgradeInfo[i][1].textContent = 'Not owned.';
        upgradeInfo[i][2].textContent = `Cost: ${upgradeInfo[i][3]}`;
      }
    }

    employeeCostString.textContent = `Cost: ${formattedStrings.employeeCost.text}`;
    employeesOwnedString.textContent = `Owned: ${formattedStrings.employeesOwned.text}`;

    const times = [1000, 60000, 3.6e+6],
      timesPlural = [2000, 120000, 5.4e+6],
      timeUnits = ['second', 'minute', 'hour'],
      timeUnitsPlural = ['seconds', 'minutes', 'hours'];

    for (let i = 0; i < times.length; i++) {
      if (stats.playtime >= timesPlural[i]) {
        display.playtime = ((stats.playtime / times[i]).toFixed(1)).toLocaleString();
        timePlayedString.textContent = `You have played for ${display.playtime} ${timeUnitsPlural[i]}.`;
      } else if (stats.playtime >= times[i] && stats.playtime < timesPlural[i]) {
        display.playtime = ((stats.playtime / times[i]).toFixed(1)).toLocaleString();
        timePlayedString.textContent = `You have played for ${display.playtime} ${timeUnits[i]}.`;
      }
    }

    stats.lifetimeClicks === 1
      ? lifetimeClicksString.textContent = `You have obtained a total of ${formattedStrings.lifetimeClicks.text} coin.`
      : lifetimeClicksString.textContent = `You have obtained a total of ${formattedStrings.lifetimeClicks.text} coins.`;

    stats.lifetimeManualClicks === 1
      ? lifetimeManualClicksString.textContent = `You have obtained ${formattedStrings.lifetimeManualClicks.text} coin from clicking.`
      : lifetimeManualClicksString.textContent = `You have obtained ${formattedStrings.lifetimeManualClicks.text} coins from clicking.`;

    stats.coinClickCount === 1
      ? coinClickCountString.textContent = `You have clicked the coin ${formattedStrings.coinClickCount.text} time.`
      : coinClickCountString.textContent = `You have clicked the coin ${formattedStrings.coinClickCount.text} times.`;

    stats.totalClickHelpers === 1
      ? totalClickHelpersString.textContent = `You have bought ${formattedStrings.totalClickHelpers.text} item.`
      : totalClickHelpersString.textContent = `You have bought ${formattedStrings.totalClickHelpers.text} items.`;

    achievementsUnlockedString.textContent = `You have unlocked ${stats.achievementsUnlocked} (${Math.round(stats.achievementsUnlocked / 25 * 100)}%) out of 25 achievements.`;

    rawCpsString.textContent = `Your raw coins per second is ${formattedStrings.rawCps.text}.`;
    rawClickValueString.textContent = `Your raw click value is ${formattedStrings.rawClickValue.text}.`;

    cpsMultiplierString.textContent = `Your coins per second stat is boosted by ${(stats.cpsMultiplier * 100).toFixed(2)}%.`

    clickValueMultiplierString.textContent = `Your click value stat is boosted by ${(stats.clickValueMultiplier * 100).toFixed(1)}%.`;

    stats.offlineCpsPercent.toString().slice(-1) === '5'
      ? offlineCpsString.textContent = `Your employees gather ${(stats.offlineCpsPercent * 100).toFixed(3)}% of your coins per second while offline.`
      : offlineCpsString.textContent = `Your employees gather ${(stats.offlineCpsPercent * 100).toFixed(2)}% of your coins per second while offline.`;

    if (buff === 'bonusClicks') buffLabel.textContent = `You got ${formattedStrings.clicksAdded.text} bonus coins!`;

    const displayArray = [
      [stats.clicks, display.clicks],
      [stats.clickValue, display.clickValue],
      [stats.rawClickValue, display.rawClickValue],
      [stats.cps, display.cps],
      [stats.rawCps, display.rawCps],
      [stats.lifetimeClicks, display.lifetimeClicks],
      [stats.lifetimeManualClicks, display.lifetimeManualClicks],
      [stats.coinClickCount, display.coinClickCount],
      [shops.normalShop.clicker.cps, display.clickerCps],
      [shops.normalShop.clicker.cost, display.clickerCost],
      [shops.normalShop.superClicker.cps, display.superClickerCps],
      [shops.normalShop.superClicker.cost, display.superClickerCost],
      [shops.normalShop.doublePointer.cps, display.doublePointerCps],
      [shops.normalShop.doublePointer.cost, display.doublePointerCost],
      [shops.upgradeShop.employee.cost, display.employeeCost],
    ];


    for (let i = 0; i < displayArray.length; i++) {
      for (let ii = 0; ii < displayArray[i].length; ii++)
        displayArray[i][ii] = Math.abs(displayArray[i][ii]);

      if (displayArray[i][1] < displayArray[i][0]) {
        if (!((displayArray[i][0] - displayArray[i][1]) % 15) == 0) displayArray[i][1]++;
        displayArray[i][1] += Math.abs(Math.ceil((displayArray[i][0] - displayArray[i][1]) / 15));
      } else if (displayArray[i][1] > displayArray[i][0]) {
        if (!((displayArray[i][0] - displayArray[i][1]) % 15) == 0) displayArray[i][1]--;
        displayArray[i][1] -= Math.abs(Math.ceil((displayArray[i][0] - displayArray[i][1]) / 15));
      }

      Object.keys(display).forEach((key, index) => {
        if (index < displayArray.length) {
          display[key] = displayArray[index][1];
        }
      });
    }

    debugOutputBox.value = debugConsole;
  } else {
    // When the tab is hidden CSS animations cannot play, but the background
    // sprites still get created anyway. We remove them so they don't build
    // up at the top of the page.
    const backgroundSprites = document.querySelectorAll('.backgroundElements');
    for (let i = 0; i < backgroundSprites.length; i++)
      backgroundSprites[i].parentNode.removeChild(backgroundSprites[i]);
  }
}

function numberFormat() {
  if (!settings.numberShorten) {
    for (const property in formattedStrings) {
      if (Object.hasOwn(formattedStrings, property)) {
        formattedStrings[property].integer = Math.abs(formattedStrings[property].integer);

        if (isNaN(formattedStrings[property].integer)) formattedStrings[property].integer = 0;

        if (formattedStrings[property].integer < 1e+15) {
          formattedStrings[property].text = formattedStrings[property].integer.toString();
          let pattern = /(-?\d+)(\d{3})/;
          while (pattern.test(formattedStrings[property].text))
            formattedStrings[property].text = formattedStrings[property].text.replace(pattern, '$1,$2');
        } else formattedStrings[property].text = formattedStrings[property].integer.toExponential(3);
      }
    }
  } else {
    const units = [
      [1000, 'thousand'],
      [1e+6, 'million'],
      [1e+9, 'billion'],
      [1e+12, 'trillion'],
      [1e+15, 'quadrillion'],
      [1e+18, 'quintillion'],
      [1e+21, 'sextillion'],
      [1e+24, 'septillion'],
      [1e+27, 'octillion'],
      [1e+30, 'nonillion'],
      [1e+33, 'decillion'],
      [1e+36, 'undecillion'],
      [1e+39, 'duodecillion'],
      [1e+42, 'tredecillion'],
      [1e+45, 'quattuordecillion'],
      [1e+48, 'quindecillion'],
      [1e+51, 'sexdecillion'],
      [1e+54, 'septemdecillion'],
      [1e+57, 'octodecillion'],
      [1e+60, 'novemdecillion'],
      [1e+63, 'vigintillion'],
      [1e+66, 'unvigintillion'],
      [1e+69, 'duovigintiillion'],
      [1e+72, 'trevigintillion'],
      [1e+75, 'quattuorvigintiillion'],
      [1e+78, 'quinvigintiillion'],
      [1e+81, 'sexvigintiillion'],
      [1e+84, 'septvigintiillion'],
      [1e+87, 'octovigintillion'],
      [1e+90, 'nonvigintillion'],
      [1e+93, 'trigintillion'],
      [1e+96, 'untrigintillion'],
      [1e+99, 'duotrigintillion']
    ];
    for (let i = 0; i < units.length; i++) {
      for (const property in formattedStrings) {
        if (Object.hasOwn(formattedStrings, property)) {
          if (formattedStrings[property].integer >= units[i][0])
            formattedStrings[property].text = (Math.round((formattedStrings[property].integer / units[i][0]) * Math.pow(10, 3)) / Math.pow(10, 3)).toFixed(3) + ' ' + units[i][1];
          else if (formattedStrings[property].integer < 1000) formattedStrings[property].text = formattedStrings[property].integer;

          if (formattedStrings[property].integer >= 9.99999e+101)
            formattedStrings[property].text = formattedStrings[property].integer.toExponential(3);
        }
      }
    }
  }
}

function createBackgroundSprites() {

  function createSprite(src) {
    let sprite = document.createElement('img');
    sprite.src = src;
    sprite.id = 'backgroundElement';
    sprite.className = 'backgroundElements';
    sprite.style.left = `${rng(1, innerWidth) * 100 / innerWidth}vw`;
    spriteLayer.appendChild(sprite);
    setTimeout(() => {
      // updateScreen() may have already removed the node if the tab was
      // inactive
      if (sprite.parentNode) sprite.parentNode.removeChild(sprite);
    }, 4000);
  }

  if (startCreatingCoinSprites
    && achievements[3].unlocked
    && spriteLayer.childElementCount < backgroundSpriteMax
    && !settings.performanceMode
  ) {
    createSprite('./img/backgroundDollar.png');

    if (achievements[12].unlocked) createSprite('./img/coin.png');

    if (achievements[24].unlocked) {
      let sprite = document.createElement('i');
      sprite.id = 'backgroundElement';
      sprite.className = 'fa-solid fa-star achievements backgroundElements';

      !achievements[26].unlocked
        ? sprite.style.color = `rgb(0, ${green}, 0)`
        : sprite.style.color = `rgb(${red}, 0, 0)`;

      sprite.style.left = `${rng(1, innerWidth)}px`;
      sprite.style.fontSize = '1.7vw';
      spriteLayer.appendChild(sprite);
      setTimeout(() => {
        if (sprite.parentNode) sprite.parentNode.removeChild(sprite);
      }, 4000);
    }
  }
  setTimeout(createBackgroundSprites, backgroundSpriteUpdateInterval);
}

function updateBackgroundSpriteLimit() {
  if (achievements[6].unlocked) {
    backgroundSpriteUpdateInterval = 35;
    backgroundSpriteMax = 100;
  }

  if (achievements[9].unlocked) {
    backgroundSpriteUpdateInterval = 30;
    backgroundSpriteMax = 125;
  }

  if (achievements[12].unlocked) {
    // additional coin sprites get created when this achievement is unlocked,
    // so having this lower would cause large gaps when the sprite limit is
    // reached.
    backgroundSpriteUpdateInterval = 50;
    backgroundSpriteMax = 150;
  }

  if (achievements[15].unlocked) {
    backgroundSpriteUpdateInterval = 43;
    backgroundSpriteMax = 175;
  }

  if (achievements[18].unlocked) {
    backgroundSpriteUpdateInterval = 38;
    backgroundSpriteMax = 200;
  }

  if (achievements[21].unlocked) {
    backgroundSpriteUpdateInterval = 25;
    backgroundSpriteMax = 300;
  }

  if (achievements[24].unlocked)
    backgroundSpriteMax = 400;

}

function colorShift() {
  const costArray = [
    [clickerCostString, shops.normalShop.clicker.cost],
    [superClickerCostString, shops.normalShop.superClicker.cost],
    [doublePointerCostString, shops.normalShop.doublePointer.cost],
    [cursorCostString, shops.upgradeShop.cursor.cost],
    [superCursorCostString, shops.upgradeShop.superCursor.cost],
    [employeeCostString, shops.upgradeShop.employee.cost],
    [godFingerCostString, shops.upgradeShop.godFinger.cost]
  ];

  if (increase) {
    red += 5;
    green += 5;
  } else {
    red -= 5;
    green -= 5;
  }

  if (green === 200 || green === 0) increase = !increase;

  if (newAchievementUnlocked) {
    achievementsButton.style.borderInlineColor = `rgb(${red}, 0, 0)`;
    achievementsButton.style.borderBlockColor = `rgb(${red}, 0, 0)`;
    achievementsButtonIcon.style.color = `rgb(${red}, 0, 0)`;
  }

  forTheWorthy.style.borderInlineColor = `rgb(0, ${green}, 0)`;
  forTheWorthy.style.borderBlockColor = `rgb(0, ${green}, 0)`;
  forTheWorthyIcon.style.color = `rgb(0, ${green}, 0)`;

  breakpoint.style.borderInlineColor = `rgb(0, ${green}, 0)`;
  breakpoint.style.borderBlockColor = `rgb(0, ${green}, 0)`;
  breakpointIcon.style.color = `rgb(0, ${green}, 0)`;

  cheater.style.borderInlineColor = `rgb(${red}, 0, 0)`;
  cheater.style.borderBlockColor = `rgb(${red}, 0, 0)`;
  cheaterIcon.style.color = `rgb(${red}, 0, 0)`;

  for (let i = 0; i < costArray.length; i++)
    stats.clicks >= costArray[i][1]
      ? costArray[i][0].style.color = `rgb(0, ${green}, 0)`
      : costArray[i][0].style.color = 'rgb(0, 0, 0)';
}

function canvasDraw() {
  const dpr = window.devicePixelRatio,
    rect = canvas.getBoundingClientRect();

  if (canvas.width !== innerWidth && canvas.height !== innerHeight) {
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
  }

  let width = canvas.width,
    height = canvas.height;

  leftBorderX = width * 0.25;
  rightBorderX = width * 0.75;

  ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(leftBorderX, 0);
  ctx.lineTo(leftBorderX, height);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(rightBorderX, 0);
  ctx.lineTo(rightBorderX, height);
  ctx.stroke();
}

function labelTimerHandler() {
  labelHideTimer--;
  if (labelHideTimer === 0) {
    savingString.style.display = 'none';
    unlockString.style.display = 'none';

    labelSwitch = !labelSwitch;
    if (labelSwitch) saveInfoString.textContent = `Last Saved: ${lastSavedTime}`;
    else {
      if (doAutosave)
        saveInfoString.textContent = 'Game autosaves every minute; You can also press Ctrl+S to save.';
      else saveInfoString.textContent = 'Autosave is disabled.';
    }

    labelHideTimer = 200;
  }
}

setTimeout(createBackgroundSprites, backgroundSpriteUpdateInterval);
setInterval(colorShift, 25);
setInterval(updateScreen, 1000 / 60);
setInterval(updateBackgroundSpriteLimit, 1000 / 60);
setInterval(labelTimerHandler, 1000 / 60);
