// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Visible UI e.g. screen updates, background particle effects etc.

const display = {
  clicks: 0,
  clickValue: 1,
  rawClickValue: 1,
  cps: 0,
  rawClicksPS: 0,
  lifetimeClicks: 0,
  lifetimeManualClicks: 0,
  coinClickCount: 0,
  clickerCPS: 0,
  clickerCost: 0,
  superClickerCPS: 0,
  superClickerCost: 0,
  doublePointerCPS: 0,
  doublePointerCost: 0,
  employeeCost: 0,
  playtime: 0
},
  screenHeight = window.innerHeight,
  screenWidth = window.innerWidth;

var achStr = 'none',
  gpAchIndex = 0,
  newAchUnlocked = false,

  increase = true,
  red = 0,
  green = 0,

  startBgCreate = false,
  createCoinBg = false,
  prompting = false,
  bgUpdInterval = 250,
  bgMax = 100,

  updInterval,

  leftBorderX = 0,
  rightBorderX = 0,

  // This is only used here, no point in putting it next to the stuff in shops.js
  costArray = [Math.abs(shop.ClickerCost), Math.abs(shop.SuperClickerCost), Math.abs(shop.DoublePointerCost), Math.abs(uShop.CursorCost), Math.abs(uShop.SuperCursorCost), Math.abs(uShop.EmployeeCost), Math.abs(uShop.GodFingerCost)];

loadGame();
graphicsMode == 'Quality' ? updInterval = 1000 / 60 : updInterval = 1000 / 30;

document.body.style.backgroundImage = 'radial-gradient(rgb(250, 224, 65), rgb(249, 160, 40))';

fpsLabel.style.display = 'none';
achievementsPanel.style.display = 'none';
settingsPanel.style.display = 'none';
upgradeShopPanel.style.display = 'none';

function updateScreen() {
  try {
    if (buff == 'none' && init.GameStarted) {
      stats.RawClicksPS = stats.ClicksPS;
      stats.RawClickVal = stats.ClickValue;
      document.title = `${textArray[0]} coins | Coin Clicker v${buildNumber}`;
    }
    else if (init.GameStarted) document.title = `A buff is active! | Coin Clicker v${buildNumber}`;
    else document.title = `Coin Clicker Beta v${buildNumber}`;

    if (!document.hidden) {

      intArray = [display.Clicks, display.ClickValue, display.ClicksPS, display.LifetimeClicks, display.LifetimeManualClicks, display.CoinClickCount, stats.TotalClickHelpers, display.ClickerCPS, display.ClickerCost, shop.ClickersOwned, display.SuperClickerCPS, display.SuperClickerCost, shop.SuperClickersOwned, display.DoublePointerCPS, display.DoublePointerCost, shop.DoublePointersOwned, display.EmployeeCost, uShop.EmployeesOwned, display.RawClickVal, display.RawClicksPS, shop.ClickerCPSWorth, shop.SuperClickerCPSWorth, shop.DoublePointerCPSWorth, stats.AchievementsUnlocked, clicksAdded, stats.TrueClicks, stats.OfflineClicksPSPercen * 100, uShop.CursorCost, uShop.SuperCursorCost, uShop.GodFingerCost];

      numberFix();

      document.getElementById('debugconsole').value = debugConsole;

      clickString.textContent = `Coins: ${textArray[0]}`;
      cpsString.textContent = `Coins per Second: ${textArray[2]}`;
      clickValueString.textContent = `Click Value: ${textArray[1]}`;
      clickerCPSString.textContent = `CpS: +${textArray[7]}`;
      clickerCostString.textContent = `Cost: ${textArray[8]}`;
      clickersOwnedString.textContent = `Owned: ${textArray[9]}`;

      if (shop.ClickersOwned != 0) clickerInfo.textContent = `Your ${textArray[9]} clicker(s) account for ${textArray[20]} (${Math.round(intArray[20] / stats.RawClicksPS * 100)}%) raw CpS.`;
      if (shop.SuperClickerCPSWorth != 0) superClickerInfo.textContent = `Your ${textArray[12]} super clicker(s) account for  ${textArray[21]} (${Math.round(intArray[21] / stats.RawClicksPS * 100)}%) raw CpS.`;
      if (shop.DoublePointerCPSWorth != 0) doublePointerInfo.textContent = `Your ${textArray[15]} double pointer(s) account for ${textArray[22]} (${Math.round(intArray[22] / stats.RawClicksPS * 100)}%) raw CpS.`;

      const upgVarArr = [uShop.CursorOwned, uShop.SuperCursorOwned, uShop.GodFingerOwned, uShop.ClickerFusionOwned],
        upgStrArr = [cursorOwnedString, superCursorOwnedString, godFingerOwnedString, clickerFusionOwnedString],
        upgCosArr = [textArray[27], textArray[28], textArray[29], 'None. Requires 150 clickers.'],
        upgCosStrArr = [cursorCostString, superCursorCostString, godFingerCostString, clickerFusionCostString];

      for (var i in upgVarArr) { if (upgVarArr[i]) { upgStrArr[i].textContent = 'Owned.'; upgCosStrArr[i].textContent = 'Cost: Bought.'; } else { upgStrArr[i].textContent = 'Not owned.'; upgCosStrArr[i].textContent = `Cost: ${upgCosArr[i]}`; } }
      employeeCostString.textContent = `Cost: ${textArray[16]}`;
      employeesOwnedString.textContent = `Owned: ${textArray[17]}`;

      const reqSingle = [1000, 60000, 3600000],
        units = ['second', 'minute', 'hour'],
        req = [2000, 120000, 5400000],
        unitsPlural = ['seconds', 'minutes', 'hours'];

      for (let i = 0; i < req.length; i++) {
        if (stats.Playtime >= req[i]) {
          display.Playtime = (Math.floor(stats.Playtime / reqSingle[i])).toLocaleString();
          timePlayedString.textContent = `You have played for ${display.Playtime} ${unitsPlural[i]}.`;
        } else if (stats.Playtime >= reqSingle[i] && stats.Playtime < req[i]) {
          display.Playtime = (Math.floor(stats.Playtime / reqSingle[i])).toLocaleString();
          timePlayedString.textContent = `You have played for ${display.Playtime} ${units[i]}.`
        }
      }

      stats.LifetimeClicks == 1 ? lifetimeClicksString.textContent = `You have obtained a total of ${textArray[3]} coin.` : lifetimeClicksString.textContent = `You have obtained a total of ${textArray[3]} coins.`;
      stats.LifetimeManualClicks == 1 ? lifetimeManualClicksString.textContent = `You have gotten ${textArray[4]} coin from clicking.` : lifetimeManualClicksString.textContent = `You have gotten ${textArray[4]} coins from clicking.`;
      stats.CoinClickCount == 1 ? coinClickCountString.textContent = `You have clicked the coin ${textArray[5]} time.` : coinClickCountString.textContent = `You have clicked the coin ${textArray[5]} times.`;
      stats.TotalClickHelpers == 1 ? totalClickHelpersString.textContent = `You have bought ${textArray[6]} item.` : totalClickHelpersString.textContent = `You have bought ${textArray[6]} items.`;

      achievementsUnlockedString.textContent = `You have unlocked ${textArray[23]} (${Math.round(intArray[23] / 25 * 100)}%) out of 25 achievements.`;
      rawCPSString.textContent = `Your raw coins per second is ${textArray[19]}.`;
      rawCVString.textContent = `Your raw click value is ${textArray[18]}.`;
      offlineCPSString.textContent = `Your employees gather ${textArray[26].toFixed(1)}% of your coins per second while offline.`;

      if (buff == 'bonusClicks') buffStr.textContent = `You got ${textArray[24]} bonus coins!`;

      if (shop.ClickersOwned >= 25 && !shop.SuperClickerUnlocked) {
        if (init.DataLoaded) { sfx2.play(); unlockString.style.display = 'block'; unlockString.textContent = 'Super Clicker unlocked!'; }
        superClickerGroup.style.display = 'block';
        superClickerImg.style.display = 'block';
        shop.SuperClickerUnlocked = true
        SHT = 500;
      } else if (shop.SuperClickerUnlocked) {
        superClickerGroup.style.display = 'block';
        superClickerCPSString.textContent = `CpS: +${textArray[10]}`;
        superClickerCostString.textContent = `Cost: ${textArray[11]}`;
        superClickersOwnedString.textContent = `Owned: ${textArray[12]}`;
      }

      if (shop.ClickersOwned >= 50 && shop.SuperClickersOwned >= 10 && !shop.DoublePointerUnlocked) {
        if (init.DataLoaded) { sfx2.play(); unlockString.style.display = 'block'; unlockString.textContent = 'Double Pointer unlocked!'; }
        doublePointerGroup.style.display = 'block';
        doublePointerImg.style.display = 'block';
        shop.DoublePointerUnlocked = true
        SHT = 500;
      } else if (shop.DoublePointerUnlocked) {
        doublePointerGroup.style.display = 'block';
        doublePointerCPSString.textContent = `CpS: +${textArray[13]}`;
        doublePointerCostString.textContent = `Cost: ${textArray[14]}`;
        doublePointersOwnedString.textContent = `Owned: ${textArray[15]}`;
      }

      if (uShop.CursorOwned && init.DataLoaded) uShop.CursorCost = 'Owned.';
      if (uShop.CursorOwned && !uShop.SuperCursorUnlocked) {
        if (init.DataLoaded) { sfx2.play(); unlockString.style.display = 'block'; unlockString.textContent = 'Super Cursor unlocked!'; }
        superCursorGroup.style.display = 'block';
        uShop.SuperCursorUnlocked = true
        SHT = 500;
      } else if (uShop.SuperCursorUnlocked) { superCursorGroup.style.display = 'block'; uShop.CursorCost = 'Owned.'; }

      if (uShop.CursorOwned && uShop.SuperCursorOwned && !uShop.EmployeeUnlocked && uShop.GodFingerUnlocked) {
        if (init.DataLoaded) { sfx2.play(); unlockString.style.display = 'block'; unlockString.textContent = 'Employee unlocked!'; }
        employeeGroup.style.display = 'block';
        uShop.EmployeeUnlocked = true
        SHT = 500;
      } else if (uShop.EmployeeUnlocked) { employeeGroup.style.display = 'block'; uShop.SuperCursorCost = 'Owned.'; }

      if (shop.ClickersOwned >= 75 && shop.SuperClickersOwned >= 20 && shop.DoublePointersOwned >= 3 && uShop.EmployeeUnlocked && !uShop.GodFingerUnlocked) {
        if (init.DataLoaded) { sfx2.play(); unlockString.style.display = 'block'; unlockString.textContent = 'God Finger unlocked!'; }
        godFingerGroup.style.display = 'block';
        uShop.GodFingerUnlocked = true
        SHT = 500;
      } else if (uShop.GodFingerUnlocked) godFingerGroup.style.display = 'block';

      if (shop.ClickersOwned >= 150 && !uShop.ClickerFusionUnlocked) {
        if (init.DataLoaded) { sfx4.play(); unlockString.style.display = 'block'; unlockString.textContent = 'Clicker Fusion unlocked!'; }
        clickerFusionGroup.style.display = 'block';
        uShop.ClickerFusionUnlocked = true
        SHT = 500;
      } else if (uShop.ClickerFusionUnlocked) clickerFusionGroup.style.display = 'block';

      // Achievement unlock check
      for (let i = 0; i < ach.length; i++) {
        if (stats.LifetimeClicks >= ach[i][2] && ach[i][2] != null && !ach[i][3]) {
          if (init.DataLoaded && i > 1 && i < 24) sfx3.play();
          ach[i][3] = true;
          stats.AchievementsUnlocked++;
          if (init.DataLoaded) {
            unlockString.textContent = `Achievement Unlocked: ${ach[i][0]}`;
            newAchUnlocked = true;
          }
          setTimeout(function() { unlockString.style.display = 'block'; }, 1);
          SHT = 500;
        }
      }

      let diffArr = [stats.Clicks - display.Clicks, stats.ClickValue - display.ClickValue, stats.RawClickVal - display.RawClickVal, stats.ClicksPS - display.ClicksPS, stats.RawClicksPS - display.RawClicksPS, stats.LifetimeClicks - display.LifetimeClicks, stats.LifetimeManualClicks - display.LifetimeManualClicks, stats.CoinClickCount - display.CoinClickCount, shop.ClickerCPS - display.ClickerCPS, shop.ClickerCost - display.ClickerCost, shop.SuperClickerCPS - display.SuperClickerCPS, shop.SuperClickerCost - display.SuperClickerCost, shop.DoublePointerCPS - display.DoublePointerCPS, shop.DoublePointerCost - display.DoublePointerCost, uShop.EmployeeCost - display.EmployeeCost];

      for (let i = 0; i < diffArr.length; i++) diffArr[i] = Math.abs(diffArr[i]);

      if (display.Clicks < stats.Clicks) display.Clicks += Math.ceil(diffArr[0] / 15); else if (display.Clicks > stats.Clicks) display.Clicks -= Math.ceil(diffArr[0] / 15);
      if (display.ClickValue < stats.ClickValue) display.ClickValue += Math.ceil(diffArr[1] / 15); else if (display.ClickValue > stats.ClickValue) display.ClickValue -= Math.ceil(diffArr[1] / 15);
      if (display.RawClickVal < stats.RawClickVal) display.RawClickVal += Math.ceil(diffArr[2] / 15); else if (display.RawClickVal > stats.RawClickVal) display.RawClickVal -= Math.ceil(diffArr[2] / 15);
      if (display.ClicksPS < stats.ClicksPS) display.ClicksPS += Math.ceil(diffArr[3] / 15); else if (display.ClicksPS > stats.ClicksPS) display.ClicksPS -= Math.ceil(diffArr[3] / 15);
      if (display.RawClicksPS < stats.RawClicksPS) display.RawClicksPS += Math.ceil(diffArr[4] / 15); else if (display.RawClicksPS > stats.RawClicksPS) display.RawClicksPS -= Math.ceil(diffArr[4] / 15);
      if (display.LifetimeClicks < stats.LifetimeClicks) display.LifetimeClicks += Math.ceil(diffArr[5] / 15); else if (display.LifetimeClicks > stats.LifetimeClicks) display.LifetimeClicks -= Math.ceil(diffArr[5] / 15);
      if (display.LifetimeManualClicks < stats.LifetimeManualClicks) display.LifetimeManualClicks += Math.ceil(diffArr[6] / 15); else if (display.LifetimeManualClicks > stats.LifetimeManualClicks) display.LifetimeManualClicks -= Math.ceil(diffArr[6] / 15);
      if (display.CoinClickCount < stats.CoinClickCount) display.CoinClickCount += Math.ceil(diffArr[7] / 15); else if (display.CoinClickCount > stats.CoinClickCount) display.CoinClickCount -= Math.ceil(diffArr[7] / 15);
      if (display.ClickerCPS < shop.ClickerCPS) display.ClickerCPS += Math.ceil(diffArr[8] / 15); else if (display.ClickerCPS > shop.ClickerCPS) display.ClickerCPS -= Math.ceil(diffArr[8] / 15);
      if (display.ClickerCost < shop.ClickerCost) display.ClickerCost += Math.ceil(diffArr[9] / 15); else if (display.ClickerCost > shop.ClickerCost) display.ClickerCost -= Math.ceil(diffArr[9] / 15);
      if (display.SuperClickerCPS < shop.SuperClickerCPS) display.SuperClickerCPS += Math.ceil(diffArr[10] / 15); else if (display.SuperClickerCPS > shop.SuperClickerCPS) display.SuperClickerCPS -= Math.ceil(diffArr[10] / 15);
      if (display.SuperClickerCost < shop.SuperClickerCost) display.SuperClickerCost += Math.ceil(diffArr[11] / 15); else if (display.SuperClickerCost > shop.SuperClickerCost) display.SuperClickerCost -= Math.ceil(diffArr[11] / 15);
      if (display.DoublePointerCPS < shop.DoublePointerCPS) display.DoublePointerCPS += Math.ceil(diffArr[12] / 15); else if (display.DoublePointerCPS > shop.DoublePointerCPS) display.DoublePointerCPS -= Math.ceil(diffArr[12] / 15);
      if (display.DoublePointerCost < shop.DoublePointerCost) display.DoublePointerCost += Math.ceil(diffArr[13] / 15); else if (display.DoublePointerCost > shop.DoublePointerCost) display.DoublePointerCost -= Math.ceil(diffArr[13] / 15);
      if (display.EmployeeCost < uShop.EmployeeCost) display.EmployeeCost += Math.ceil(diffArr[14] / 15); else if (display.EmployeeCost > uShop.EmployeeCost) display.EmployeeCost -= Math.ceil(diffArr[14] / 15);

    } else $('.bg').remove();

    setTimeout(updateScreen, updInterval);
  } catch (error) { errorHandler(error); }
}

function numberFix() {
  // TODO: implement a toggle of some sort for exponent formatting
  if (!numberShorten) {
    for (let i = 0; i < intArray.length; i++) {
      intArray[i] = Math.abs(intArray[i]);

      if (isNaN(intArray[i])) intArray[i] = 0;

      if (Number.prototype.toLocaleString() != undefined) intArray[i] >= 1000000000000000 ? textArray[i] = ((intArray[i]).toExponential(3)).toLocaleString() : textArray[i] = intArray[i].toLocaleString();

      else { // toLocaleString is unsupported
        if (intArray[i] < 1000000000000000) {
          textArray[i] = intArray[i].toString();
          let pattern = /(-?\d+)(\d{3})/;
          while (pattern.test(textArray[i])) textArray[i] = textArray[i].replace(pattern, '$1,$2');
        } else textArray[i] = intArray[i].toExponential(3);
      }

    }
  } else {
    const req = [
      1000,
      1e+6,
      1e+9,
      1e+12,
      1e+15,
      1e+18,
      1e+21,
      1e+24,
      1e+27,
      1e+30,
      1e+33,
      1e+36,
      1e+39,
      1e+42,
      1e+45,
      1e+48,
      1e+51,
      1e+54,
      1e+57,
      1e+60,
      1e+63,
      1e+66,
      1e+69,
      1e+72,
      1e+75,
      1e+78,
      1e+81,
      1e+84,
      1e+87,
      1e+90,
      1e+93,
      1e+96,
      1e+99
    ],
      units = [
        'thousand',
        'million',
        'billion',
        'trillion',
        'quadrillion',
        'quintillion',
        'sextillion',
        'septillion',
        'octillion',
        'nonillion',
        'decillion',
        'undecillion',
        'duodecillion',
        'tredecillion',
        'quattuordecillion',
        'quindecillion',
        'sexdecillion',
        'septemdecillion',
        'octodecillion',
        'novemdecillion',
        'vigintillion',
        'unvigintillion',
        'duovigintiillion',
        'trevigintillion',
        'quattuorvigintiillion',
        'quinvigintiillion',
        'sexvigintiillion',
        'septvigintiillion',
        'octovigintillion',
        'nonvigintillion',
        'trigintillion',
        'untrigintillion',
        'duotrigintillion'
      ];

    for (let i in req) {
      for (let ii in intArray) {
        if (intArray[ii] >= req[i]) textArray[ii] = (Math.round((intArray[ii] / req[i]) * Math.pow(10, 3)) / Math.pow(10, 3)).toFixed(3) + ' ' + units[i];
        else if (intArray[ii] < 1000) textArray[ii] = intArray[ii];
      }
    }

    for (let i = 0; i < intArray.length; i++) {
      if (intArray[i] >= 9.99999e+101) var ii = i;
      if (ii != undefined) {
        if (Number.prototype.toLocaleString() != undefined) textArray[ii] = ((intArray[ii]).toExponential(3)).toLocaleString();
        else textArray[ii] = intArray[ii].toExponential(3);
      }
    }
  }
}

function createBgElem() {
  try {
    if (startBgCreate && ach[3][3]) {
      if (graphicsMode == 'Quality') {

        bg = document.createElement('img');
        bg.src = './img/bgdollar.png';
        bg.id = 'bg';
        bg.className = 'bg fixed';
        bg.style.left = `${lib.rng(1, screenWidth)}px`;
        document.body.appendChild(bg);

        if (ach[9][3]) {
          if (graphicsMode == 'Quality') {
            bg = document.createElement('img');
            bg.src = './img/coin.png';
            bg.id = 'bg';
            bg.className = 'bg hasanim fixed';
            bg.style.left = `${lib.rng(1, screenWidth)}px`;
            document.body.appendChild(bg);
          }
        }

        if (ach[24][3]) {
          bgMax = 275;
          if (graphicsMode == 'Quality') {
            bg = document.createElement('i');
            bg.id = 'bg';
            bg.className = 'fa-solid fa-star ach fixed hasanim bg';
            // Create dynamic red stars instead of green if Cheater is unlocked
            !ach[26][3] ? bg.style.color = `rgb(0, ${green}, 0)` : bg.style.color = `rgb(${red}, 0, 0)`;
            bg.style.left = `${lib.rng(1, screenWidth)}px`;
            bg.style.fontSize = '1.7vw';
            document.body.appendChild(bg);
          }
        }
      }

    } setTimeout(createBgElem, bgUpdInterval);
  } catch (error) { errorHandler(error) }
}

function rgChange() {
  try {
    if (increase) { red += 5; green += 5; } else { red -= 5; green -= 5; }

    if (green == 200) increase = !increase;
    else if (green == 0) increase = !increase;

    if (newAchUnlocked) {
      achievementsButton.style.borderInlineColor = `rgb(${red}, 0, 0)`;
      achievementsButton.style.borderBlockColor = `rgb(${red}, 0, 0)`;
      achievementsButtonIcon.style.color = `rgb(${red}, 0, 0)`;
    }

    forTheWorthy.style.borderInlineColor = `rgb(0, ${green}, 0)`;
    forTheWorthy.style.borderBlockColor = `rgb(0, ${green}, 0)`;
    ftwIcon.style.color = `rgb(0, ${green}, 0)`;

    breakpoint.style.borderInlineColor = `rgb(0, ${green}, 0)`;
    breakpoint.style.borderBlockColor = `rgb(0, ${green}, 0)`;
    bpIcon.style.color = `rgb(0, ${green}, 0)`;

    cheater.style.borderInlineColor = `rgb(${red}, 0, 0)`;
    cheater.style.borderBlockColor = `rgb(${red}, 0, 0)`;
    cheaterIcon.style.color = `rgb(${red}, 0, 0)`;

    costArray = [Math.abs(shop.ClickerCost), Math.abs(shop.SuperClickerCost), Math.abs(shop.DoublePointerCost), Math.abs(uShop.CursorCost), Math.abs(uShop.SuperCursorCost), Math.abs(uShop.EmployeeCost), Math.abs(uShop.GodFingerCost)];

    for (let i = 0; i < costArray.length - 1; i++) stats.Clicks >= costArray[i] ? costStringArr[i].style.color = `rgb(0, ${green}, 0)` : costStringArr[i].style.color = 'rgb(0, 0, 0)';
  } catch (error) { errorHandler(error); }
}

setTimeout(createBgElem, bgUpdInterval);
setTimeout(updateScreen, updInterval);
setInterval(rgChange, 25);

setInterval(() => {
  if (ach[6][3]) { bgUpdInterval = 100; bgMax = 105; }
  if (ach[9][3]) { bgUpdInterval = 50; createCoinBg = true; bgMax = 210; }
}, 1000 / 60);
