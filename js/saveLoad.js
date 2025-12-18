// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Saving, loading, and save removal

const saveData = [],
  shopData = [];

var autosavePending = false,
  lastSavedTime = 'Never',
  textSwitch = false,
  manualSave = false,
  readyToSave = true,
  doAutosave = true,
  achCheck = true,
  labelHideTimeout;

function saveGame(force) {
  try {
    if (readyToSave && init.GameStarted) {
      if (buff != 'none' && !force) { savingString.textContent = 'You cannot save when a buff is occurring.'; savingString.style.display = 'block'; labelHideTimeout = 500; } else {
        readyToSave = false;

        savingString.textContent = 'Saving...';
        savingString.style.display = 'block';

        let saveTime = Math.floor((new Date()).getTime() / 1000),

          varsToPush = [buildInfo.BuildNum, debugAutoplay, stats.Clicks, stats.ClickValue, stats.ClicksPS, stats.LifetimeClicks, stats.LifetimeManualClicks, stats.CoinClickCount, stats.TotalClickHelpers, stats.Playtime, volume, shop.DoAutobuy, keyEntered, lastSavedTime, stats.TrueClicks, bgGradCenterInput.value, bgGradEdgeInput.value, graphicsMode, saveTime, stats.OfflineClicksPSPercen, cmdHist],
          shopVars = [uShop.CursorOwned, shop.ClickerCPS, shop.ClickersOwned, shop.ClickerCost, shop.ClickersOwned];

        lastSavedTime = new Date();
        lastSavedTime = lastSavedTime.toString();
        lastSavedTime = new Date(`${lastSavedTime} UTC`);
        lastSavedTime = lastSavedTime.toString();

        if (shop.SuperClickerUnlocked) {
          shopVars.push(shop.SuperClickerCPS);
          shopVars.push(shop.SuperClickerCPSWorth);
          shopVars.push(shop.SuperClickerCost);
          shopVars.push(shop.SuperClickersOwned);
        } else for (let i = 0; i < 4; i++) shopVars.push(undefined);

        if (shop.DoublePointerUnlocked) {
          shopVars.push(shop.DoublePointerCPS);
          shopVars.push(shop.DoublePointerCPSWorth);
          shopVars.push(shop.DoublePointerCost);
          shopVars.push(shop.DoublePointersOwned);
        } else for (let i = 0; i < 4; i++) shopVars.push(undefined);

        if (uShop.CursorOwned) { shopVars.push(uShop.SuperCursorUnlocked); shopVars.push(uShop.SuperCursorOwned); } else for (let i = 0; i < 2; i++) shopVars.push(undefined);

        if (shop.ClickersOwned >= 125 && shop.SuperClickersOwned >= 10 && shop.DoublePointersOwned >= 3) { shopVars.push(uShop.GodFingerUnlocked); shopVars.push(uShop.GodFingerOwned); } else for (let i = 0; i < 2; i++) shopVars.push(undefined);

        if (uShop.SuperCursorOwned) {
          shopVars.push(uShop.EmployeeUnlocked);
          shopVars.push(uShop.EmployeeCost);
          shopVars.push(uShop.EmployeesOwned);
        } else for (let i = 0; i < 3; i++) shopVars.push(undefined);

        if (shop.ClickersOwned >= 150) { shopVars.push(uShop.ClickerFusionUnlocked); shopVars.push(uShop.ClickerFusionOwned); } else for (let i = 0; i < 2; i++) shopVars.push(undefined);

        for (let i = 0; i < varsToPush.length; i++) { if (!isFinite(varsToPush[i]) && !isNaN(varsToPush[i])) varsToPush[i] = Number.MAX_VALUE; saveData.push(varsToPush[i]); }

        localStorage.setItem('saveData', JSON.stringify(saveData));

        for (let i = 0; i < shopVars.length; i++) shopData.push(shopVars[i]);
        localStorage.setItem('shopData', JSON.stringify(shopData));

        while (saveData.length > 0) saveData.pop();
        while (shopData.length > 0) shopData.pop();

        if (manualSave) { savingString.textContent = 'Game saved.'; manualSave = !manualSave; /*False*/ } else savingString.textContent = 'Game autosaved.';

        labelHideTimeout = 500;
      }
    }
  } catch (error) { errorHandler(error) }
}

function loadGame() {
  try {
    if (localStorage.getItem('saveData', saveData)) {
      let data = localStorage.getItem('saveData', saveData),
        loadData = JSON.parse(data);

      if (achCheck) {
        stats.LifetimeClicks = loadData[5];

        if (loadData[15]) bgGradCenterInput.value = loadData[15];
        if (loadData[16]) bgGradEdgeInput.value = loadData[16];
        if (loadData[15] && loadData[16]) document.body.style.backgroundImage = `radial-gradient(rgb(${bgGradCenterInput.value}), rgb(${bgGradEdgeInput.value})`;
        if (loadData[17]) graphicsMode = loadData[17];

        if (!loadData[1]) {
          let data2 = localStorage.getItem('shopData', shopData),
            shopDat = JSON.parse(data2);
          uShop.CursorOwned = shopDat[0];
          shop.ClickerCPS = shopDat[1];
          shop.ClickersOwned = shopDat[2];
          shop.ClickerCost = shopDat[3];
          shop.ClickersOwned = shopDat[4];

          if (shop.ClickersOwned >= 25) {
            shop.SuperClickerCPS = shopDat[5];
            shop.SuperClickerCPSWorth = shopDat[6];
            shop.SuperClickerCost = shopDat[7];
            shop.SuperClickersOwned = shopDat[8];
          }

          if (shop.ClickersOwned >= 50 && shop.SuperClickersOwned >= 3) {
            shop.DoublePointerCPS = shopDat[9];
            shop.DoublePointerCPSWorth = shopDat[10];
            shop.DoublePointerCost = shopDat[11];
            shop.DoublePointersOwned = shopDat[12];
          }

          if (uShop.CursorOwned) { uShop.SuperCursorUnlocked = shopDat[13]; uShop.SuperCursorOwned = shopDat[14]; }

          if (uShop.SuperCursorOwned) {
            uShop.EmployeeUnlocked = shopDat[17];
            uShop.EmployeeCost = shopDat[18];
            uShop.EmployeesOwned = shopDat[19];
          }

          if (shop.ClickersOwned >= 125 && shop.SuperClickersOwned >= 10 && shop.DoublePointersOwned >= 3) { uShop.GodFingerUnlocked = shopDat[15]; uShop.GodFingerOwned = shopDat[16]; }
          if (shopDat[16]) uShop.GodFingerCost = 'Owned.';

          if (shop.ClickersOwned >= 150) { uShop.ClickerFusionUnlocked = shopDat[20]; uShop.ClickerFusionOwned = shopDat[21]; }
        }
        graphicsBtn.textContent = graphicsMode;
      } else if (!achCheck && loadData[0] >= 4.41) {
        if (!loadData[1]) {
          // Stats
          stats.Clicks = loadData[2];
          stats.ClickValue = loadData[3];
          stats.ClicksPS = loadData[4];
          stats.LifetimeClicks = loadData[5];
          stats.LifetimeManualClicks = loadData[6];
          stats.CoinClickCount = loadData[7];
          stats.TotalClickHelpers = loadData[8];
          stats.Playtime = loadData[9];

          volume = loadData[10];
          shop.DoAutobuy = loadData[11];
          keyEntered = loadData[12];

          if (loadData[13]) lastSavedTime = loadData[13];
          if (loadData[14]) stats.TrueClicks = loadData[14];
          if (loadData[19]) stats.OfflineClicksPSPercen = loadData[19]; else stats.OfflineClicksPSPercen = uShop.EmployeesOwned / 10;
          if (loadData[18] && stats.ClicksPS > 0 && stats.OfflineClicksPSPercen > 0) {

            let loadTimestamp = Math.floor((new Date()).getTime() / 1000),
              saveTimestamp = loadData[18],
              timestampDifference = loadTimestamp - saveTimestamp,
              offlineCpS = Math.ceil((stats.ClicksPS * stats.OfflineClicksPSPercen) * timestampDifference);

            stats.Clicks += offlineCpS;
            stats.LifetimeClicks += offlineCpS;
            stats.TrueClicks += offlineCpS;

            if (offlineCpS >= 100000000000000) offlineCpS = ((offlineCpS).toExponential(3)).toLocaleString(); else offlineCpS = offlineCpS.toLocaleString();

            unlockString.style.display = 'block';
            if (offlineCpS == 1) unlockString.textContent = `Your employees produced ${offlineCpS} coin while you were away.`; else unlockString.textContent = `Your employees produced ${offlineCpS} coins while you were away.`;

            labelHideTimeout = 500;
          }

          if (loadData[20]) cmdHist = loadData[20];

          if (shop.ClickersOwned >= 1 && graphicsMode == 'Quality') {
            clickerImg.style.animation = 'clickermov 2s forwards';
            setTimeout(function() {
              clickerImg.style.transform = 'translate3d(35.5vw, 7.2vw, 0) rotate(172deg)';
              clickerImg.style.animation = 'clickerclick 0.5s 0.5s infinite ease-in alternate';
            }, 3000);
          }

          if (shop.SuperClickersOwned >= 1 && graphicsMode == 'Quality') {
            superClickerImg.style.animation = 'superclickermov 2s forwards';
            setTimeout(function() {
              superClickerImg.style.transform = 'translate3d(44.5vw, 2vw, 0) rotate(175deg)';
              superClickerImg.style.animation = 'superclickerclick 0.5s 0.5s infinite ease-in alternate';
            }, 3000);
          }

          if (shop.DoublePointersOwned >= 1 && graphicsMode == 'Quality') {
            doublePointerImg.style.animation = 'doublepointermov 2s forwards';
            setTimeout(function() {
              doublePointerImg.style.transform = 'translate3d(40.2vw, 6.9vw, 0) rotate(90deg)';
              doublePointerImg.style.animation = 'doublepointerclick 0.5s 0.5s infinite ease-in alternate';
            }, 3000);
          }

          if (uShop.CursorOwned && graphicsMode == 'Quality') {
            cursorImg.style.display = 'block';
            cursorImg.parentNode.removeChild(cursorImg);
            statsPanel.appendChild(cursorImg);
            cursorImg.style.animationPlayState = 'running';
          }

          if (uShop.SuperCursorOwned && graphicsMode == 'Quality') {
            superCursorImg.style.display = 'block';
            superCursorImg.parentNode.removeChild(superCursorImg);
            statsPanel.appendChild(superCursorImg);
            superCursorImg.style.animationPlayState = 'running';
          }

          if (uShop.EmployeesOwned >= 1 && graphicsMode == 'Quality') {
            offlineCPSString.style.display = 'block';
            employeeImg.style.display = 'block';
            employeeImg.parentNode.removeChild(employeeImg);
            game.appendChild(employeeImg);
            employeeImg.style.animationPlayState = 'running';
            setTimeout(function() {
              employeeImg.style.transform = 'translate3d(39.8vw, -5vw, 0)';
              employeeImg.style.animation = 'employeerock 2s linear infinite alternate';
            }, 3000);
          }

          if (uShop.GodFingerOwned && graphicsMode == 'Quality') {
            godFingerImg.style.display = 'block';
            godFingerImg.parentNode.removeChild(godFingerImg);
            statsPanel.appendChild(godFingerImg);
            godFingerImg.style.animationPlayState = 'running';
          }

          if (uShop.ClickerFusionOwned && graphicsMode == 'Quality') {
            clickerFusionImg.style.display = 'block';
            clickerFusionImg.parentNode.removeChild(clickerFusionImg);
            statsPanel.appendChild(clickerFusionImg);
            clickerFusionImg.style.animationPlayState = 'running';
          }

          if (stats.Clicks != stats.TrueClicks) stats.HiddenAchievementsUnlocked++;

          setTimeout(function() { init.DataLoaded = true; }, 150);

        } else { localStorage.removeItem('saveData', saveData); if (!achCheck) init.DataLoaded = true; }
      } else { localStorage.removeItem('saveData', saveData); if (!achCheck) init.DataLoaded = true; }
    } else if (!achCheck) init.DataLoaded = true;
  } catch (error) { errorHandler(error); }
}

function wipeSave(gamepadActive) {
  if (readyToSave || debugAutoplay) {
    if (!gamepadActive) {
      let prompt = confirm('This is completely irreversible! Are you sure you wish to continue?');
      if (prompt) {
        let toHide = [offlineCPSString, superClickerGroup, doublePointerGroup, superCursorGroup, employeeGroup, godFingerGroup, clickerFusionGroup, cheater, cheaterIcon, breakpoint, bpIcon, superClickerImg, doublePointerImg, cursorImg, superCursorImg, employeeImg, godFingerImg, clickerFusionImg],
          toTransform = [clickerImg, superClickerImg, doublePointerImg, cursorImg, superCursorImg, employeeImg, godFingerImg, clickerFusionImg],

          readyToSave = false;
        localStorage.removeItem('saveData');
        localStorage.removeItem('shopData');

        stats = new baseStats();
        shop = new baseShop();
        uShop = new baseUpgShop();
        graphicsMode = 'Quality';

        for (let i in ach) ach[i][3] = false;
        for (let i in toHide) toHide[i].style.display = 'none';
        for (let i in toTransform) { toTransform[i].style.animation = ''; toTransform[i].style.transform = ''; }

        clickerInfo.textContent = 'You have no clickers.';
        superClickerInfo.textContent = 'You have no super clickers.';
        doublePointerInfo.textContent = 'You have no double pointers.';
        timePlayedString.textContent = 'You have played for 0 seconds.';

        bgGradCenterInput.value = '250, 224, 65';
        bgGradEdgeInput.value = '249, 160, 40';
        document.body.style.backgroundImage = `radial-gradient(rgb(${bgGradCenterInput.value}), rgb(${bgGradEdgeInput.value})`;
      }
    }

  } else if (gamepadActive) {
    localStorage.removeItem('saveData');
    localStorage.removeItem('shopData');
    readyToSave = !readyToSave;
    unlockString.textContent = 'Save removed. Press R3 to confirm. You can save again to reverse this if this was a mistake.';
    labelHideTimeout = 500;
  } else if (!readyToSave) readyToSave = true;
}

setInterval(function() {
  if (doAutosave && buff == 'none' && init.GameStarted && ach[0][3]) {
    manualSave = false;
    saveGame();
  } else if (buff != 'none')
    autosavePending = true

}, 60000);

setInterval(() => {
  labelHideTimeout--;
  if (labelHideTimeout == 0) {
    savingString.textContent = '';
    unlockString.textContent = '';
    if (!debugAutoplay) readyToSave = true;
    labelHideTimeout = 500;
  }
}, 1000 / 60);

saveButton.addEventListener('click', function() { sfx.play(); manualSave = true; saveGame(); }); // Click
saveButton.addEventListener('mouseover', function() { savingString.style.top = '4vw'; }); // Hover
saveButton.addEventListener('mouseleave', function() { savingString.style.top = '2.6vw'; }); // Hover leave
wipeSaveButton.addEventListener('click', function() { sfx.play(); wipeSave(); }); // Wipe save
