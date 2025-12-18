// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Shop items, costs, and buy handling

class baseShop {
  constructor() {
    this.ClickerCPS = 5;
    this.ClickerCost = 25;
    this.ClickerScale = 5;
    this.ClickersOwned = 0;
    this.ClickerCPSWorth = 0;
    this.SuperClickerUnlocked = false;
    this.SuperClickerCPS = 7500;
    this.SuperClickerCost = 3000000;
    this.SuperClickerScale = 25;
    this.SuperClickersOwned = 0;
    this.SuperClickerCPSWorth = 0;
    this.DoublePointerUnlocked = false;
    this.DoublePointerCPS = 50000000;
    this.DoublePointerScale = 75;
    this.DoublePointerCost = 5000000000;
    this.DoublePointersOwned = 0;
    this.DoublePointerCPSWorth = 0;
    this.DoAutobuy = false;
  }
};

class baseUpgShop {
  constructor() {
    this.CursorCPS = 1.00;
    this.CursorCost = 1000000000;
    this.CursorOwned = false;
    this.SuperCursorUnlocked = false;
    this.SuperCursorCPS = 1.50;
    this.SuperCursorCost = 150000000000;
    this.SuperCursorOwned = false;
    this.EmployeeUnlocked = false;
    this.EmployeeCPS = 0.05;
    this.EmployeeCost = 250000000000;
    this.EmployeesOwned = 0;
    this.GodFingerUnlocked = false;
    this.GodFingerCV = 0.35;
    this.GodFingerCost = 5000000000000;
    this.GodFingerOwned = false;
    this.ClickerFusionCost = '';
    this.ClickerFusionUnlocked = false;
    this.ClickerFusionOwned = false;
  }
};

var shop = new baseShop(),
  uShop = new baseUpgShop();

clickerBuy.addEventListener('click', function() {
  sfx.play();
  if (stats.Clicks >= shop.ClickerCost) {
    sfx5.play();
    sfx5 = new Audio();
    sfx5.src = './snd/shopbuy.mp3';

    stats.Clicks -= shop.ClickerCost;
    stats.TrueClicks -= shop.ClickerCost;
    shop.ClickersOwned++;
    shop.ClickerCPSWorth += shop.ClickerCPS;

    if (buff == 'cpsDouble') {
      stats.ClicksPS += (shop.ClickerCPS * 2);
      stats.RawClicksPS += shop.ClickerCPS;

      shop.ClickerCPS += Math.abs(Math.round(shop.ClickersOwned * 2 + Math.abs(0.03 * stats.RawClicksPS) + lib.rng(3, 15)));

      shop.ClickerCost += Math.round(shop.ClickersOwned + (shop.ClickerScale * stats.RawClicksPS) + shop.ClickersOwned * 3 + lib.rng(100, 200));

    } else {
      stats.ClicksPS += shop.ClickerCPS;
      shop.ClickerCPS += Math.abs(Math.round(shop.ClickersOwned * 2 + Math.abs((0.03 * stats.ClicksPS)) + lib.rng(3, 15)));
      shop.ClickerCost += Math.round(shop.ClickersOwned + (shop.ClickerScale * stats.ClicksPS) + shop.ClickersOwned * 3 + lib.rng(100, 200));
    }

    buff != 'none' ? stats.RawClickVal += Math.round(shop.ClickersOwned * 0.5 + 0.10 * stats.RawClicksPS) : stats.ClickValue += Math.round(shop.ClickersOwned * 0.5 + 0.10 * stats.RawClicksPS);

    if (shop.ClickersOwned == 1) {
      clickerImg.style.animation = 'clickermov 2s forwards';
      setTimeout(function() {
        clickerImg.style.transform = 'translate3d(35.5vw, 7.2vw, 0) rotate(172deg)';
        clickerImg.style.animation = 'clickerclick 0.5s 0.5s infinite ease-in alternate';
      }, 3000);
    }

    stats.TotalClickHelpers++;
    shop.ClickerScale++;
  }
});

superClickerBuy.addEventListener('click', function() {
  sfx.play();
  if (stats.Clicks >= shop.SuperClickerCost) {
    sfx5.play();
    sfx5 = new Audio();
    sfx5.src = './snd/shopbuy.mp3';

    stats.Clicks -= shop.SuperClickerCost;
    stats.TrueClicks -= shop.SuperClickerCost;
    shop.SuperClickersOwned++;
    shop.SuperClickerCPSWorth += shop.SuperClickerCPS;

    if (buff == 'cpsDouble') {
      stats.ClicksPS += (shop.SuperClickerCPS * 2);
      stats.RawClicksPS += shop.SuperClickerCPS;

      shop.SuperClickerCPS += Math.abs(Math.round(shop.SuperClickersOwned * 15 + (0.2 * stats.RawClicksPS)));

      shop.SuperClickerCost += Math.round((shop.SuperClickerScale * stats.RawClicksPS) + shop.SuperClickersOwned * 4 + lib.rng(10000, 30000));

    } else {
      stats.ClicksPS += shop.SuperClickerCPS;
      shop.SuperClickerCPS += Math.abs(Math.round(shop.SuperClickersOwned * 15 + (0.2 * stats.ClicksPS)));
      shop.SuperClickerCost += Math.round((shop.SuperClickerScale * stats.ClicksPS) + shop.SuperClickersOwned * 4 + lib.rng(10000, 30000));
    }

    buff != 'none' ? stats.RawClickVal += Math.round(shop.SuperClickersOwned * 2 + 0.01 * stats.RawClicksPS) : stats.ClickValue += Math.round(shop.SuperClickersOwned * 2 + 0.01 * stats.RawClicksPS);

    if (shop.SuperClickersOwned == 1) {
      superClickerImg.style.animation = 'superclickermov 2s forwards';
      setTimeout(function() {
        superClickerImg.style.transform = 'translate3d(44.5vw, 2vw, 0) rotate(175deg)';
        superClickerImg.style.animation = 'superclickerclick 0.5s 0.5s infinite ease-in alternate';
      }, 3000);
    }

    stats.TotalClickHelpers++;
    shop.SuperClickerScale += 5;
  }
});

doublePointerBuy.addEventListener('click', function() {
  sfx.play();
  if (stats.Clicks >= shop.DoublePointerCost) {
    sfx5.play();
    sfx5 = new Audio();
    sfx5.src = './snd/shopbuy.mp3';

    stats.Clicks -= shop.DoublePointerCost;
    stats.TrueClicks -= shop.DoublePointerCost;
    shop.DoublePointersOwned++;
    shop.DoublePointerCPSWorth += shop.DoublePointerCPS;

    if (buff == 'cpsDouble') {
      stats.ClicksPS += (shop.DoublePointerCPS * 2);
      stats.RawClicksPS += shop.DoublePointerCPS;

      shop.DoublePointerCPS += Math.abs(Math.round(shop.DoublePointersOwned * 5 + (0.4 * stats.RawClicksPS) + lib.rng(1000, 3000)));

      shop.DoublePointerCost += Math.round(shop.DoublePointersOwned + (shop.DoublePointerScale * stats.RawClicksPS) + shop.DoublePointersOwned * 5 + lib.rng(250000, 500000));

    } else {
      stats.ClicksPS += shop.DoublePointerCPS;
      shop.DoublePointerCPS += Math.abs(Math.round(shop.DoublePointersOwned * 5 + (0.4 * stats.ClicksPS) + lib.rng(1000, 3000)));
      shop.DoublePointerCost += Math.round(shop.DoublePointersOwned + (shop.DoublePointerScale * stats.ClicksPS) + shop.DoublePointersOwned * 5 + lib.rng(500000, 1000000));
    }

    buff != 'none' ? stats.RawClickVal += Math.round(shop.DoublePointersOwned * 3 + 0.03 * stats.RawClicksPS) : stats.ClickValue += Math.round(shop.DoublePointersOwned * 3 + 0.03 * stats.RawClicksPS);

    if (shop.DoublePointersOwned == 1) {
      doublePointerImg.style.animation = 'doublepointermov 2s forwards';
      setTimeout(function() {
        doublePointerImg.style.transform = 'translate3d(40.2vw, 6.9vw, 0) rotate(90deg)';
        doublePointerImg.style.animation = 'doublepointerclick 0.5s 0.5s infinite ease-in alternate';
      }, 3000);
    }

    shop.DoublePointerScale += 10;
    stats.TotalClickHelpers++;
  }
});

upgradeButton.addEventListener('click', function() {
  sfx.play();
  sfx5 = new Audio();
  sfx5.src = './snd/shopbuy.mp3';
  shopPanel.style.display = 'none';
  upgradeShopPanel.style.display = 'block';

  if (shop.ClickersOwned == 0) clickerImg.style.display = 'none';
  if (shop.SuperClickersOwned == 0) superClickerImg.style.display = 'none';
  if (shop.DoublePointersOwned == 0) doublePointerImg.style.display = 'none';

  if (uShop.CursorOwned) cursorImg.style.display = 'block';
  if (uShop.SuperCursorUnlocked) superCursorImg.style.display = 'block';
  if (uShop.EmployeeUnlocked) employeeImg.style.display = 'block';
  if (uShop.GodFingerUnlocked) godFingerImg.style.display = 'block';
  if (uShop.ClickerFusionUnlocked) clickerFusionImg.style.display = 'block';
});

upgradeRTS.addEventListener('click', function() {
  sfx.play();
  shopPanel.style.display = 'block';
  upgradeShopPanel.style.display = 'none';
  clickerImg.style.display = 'block';

  if (shop.SuperClickerUnlocked) superClickerImg.style.display = 'block';
  if (shop.DoublePointerUnlocked) doublePointerImg.style.display = 'block';

  if (!uShop.CursorOwned) cursorImg.style.display = 'none';
  if (!uShop.SuperCursorOwned) superCursorImg.style.display = 'none';
  if (uShop.EmployeesOwned < 1) employeeImg.style.display = 'none';
  if (!uShop.GodFingerOwned) godFingerImg.style.display = 'none';
  if (!uShop.ClickerFusionOwned) clickerFusionImg.style.display = 'none';
});

cursorBuy.addEventListener('click', function() {
  sfx.play();
  if (stats.Clicks >= uShop.CursorCost && !uShop.CursorOwned) {
    sfx5.play();
    sfx5 = new Audio();
    sfx5.src = './snd/shopbuy.mp3';

    stats.Clicks -= uShop.CursorCost;
    stats.TrueClicks -= uShop.CursorCost;
    uShop.CursorOwned = !uShop.CursorOwned;

    shop.ClickerCPSWorth += Math.round(shop.ClickersOwned * uShop.CursorCPS);
    shop.SuperClickerCPSWorth += Math.round(shop.SuperClickerCPSWorth * uShop.CursorCPS);
    shop.DoublePointerCPSWorth += Math.round(shop.DoublePointerCPSWorth * uShop.CursorCPS);

    if (buff == 'cpsDouble') { stats.ClicksPS += Math.round(stats.RawClicksPS * (uShop.CursorCPS * 2)); stats.RawClicksPS += Math.round(stats.ClicksPS * uShop.CursorCPS); } else stats.ClicksPS += Math.round(stats.ClicksPS * uShop.CursorCPS);
    if (buff != 'none') stats.RawClickVal += Math.round(0.08 * stats.RawClicksPS); else stats.ClickValue += Math.round(0.08 * stats.RawClicksPS);

    uShop.CursorCost = 'Owned.';
    stats.TotalClickHelpers++;

    cursorImg.parentNode.removeChild(cursorImg);
    statsPanel.appendChild(cursorImg);
    if (uShop.CursorOwned) cursorImg.style.animationPlayState = 'running';
  }
});

superCursorBuy.addEventListener('click', function() {
  sfx.play();
  if (stats.Clicks >= uShop.SuperCursorCost && !uShop.SuperCursorOwned) {
    sfx5.play();
    sfx5 = new Audio();
    sfx5.src = './snd/shopbuy.mp3';

    stats.Clicks -= uShop.SuperCursorCost;
    stats.TrueClicks -= uShop.SuperCursorCost;
    uShop.SuperCursorOwned = !uShop.SuperCursorOwned; //True

    shop.ClickersOwned += Math.round(shop.ClickersOwned * uShop.SuperCursorCPS);
    shop.SuperClickerCPSWorth += Math.round(shop.SuperClickerCPSWorth * uShop.SuperCursorCPS);
    shop.DoublePointerCPSWorth += Math.round(shop.DoublePointerCPSWorth * uShop.SuperCursorCPS);

    if (buff == 'cpsDouble') { stats.ClicksPS += Math.round(stats.RawClicksPS * (uShop.SuperCursorCPS * 2)); stats.RawClicksPS += Math.round(stats.ClicksPS * uShop.SuperCursorCPS); } else stats.ClicksPS += Math.round(stats.ClicksPS * uShop.SuperCursorCPS);
    if (buff != 'none') stats.RawClickVal += Math.round(0.09 * stats.RawClicksPS); else stats.ClickValue += Math.round(0.09 * stats.RawClicksPS);

    uShop.SuperCursorCost = 'Owned.';
    stats.TotalClickHelpers++;

    superCursorImg.parentNode.removeChild(superCursorImg);
    statsPanel.appendChild(superCursorImg);
    superCursorImg.style.animationPlayState = 'running';
  }
});

employeeBuy.addEventListener('click', function() {
  sfx.play();
  if (stats.Clicks >= uShop.EmployeeCost) {
    sfx5.play();
    sfx5 = new Audio();
    sfx5.src = './snd/shopbuy.mp3';

    stats.Clicks -= uShop.EmployeeCost;
    stats.TrueClicks -= uShop.EmployeeCost;
    uShop.EmployeesOwned++;

    if (buff == 'cpsDouble') { stats.ClicksPS += Math.round(stats.RawClicksPS * (uShop.EmployeeCPS * 2)); stats.RawClicksPS += Math.round(stats.ClicksPS * uShop.EmployeeCPS); } else stats.ClicksPS += Math.round(stats.ClicksPS * uShop.EmployeeCPS);

    uShop.EmployeeCost += ((uShop.EmployeesOwned * 2) * uShop.EmployeeCost) + 75 * stats.ClicksPS;
    uShop.EmployeeCPS *= 2;

    stats.OfflineClicksPSPercen += 0.001;
    stats.TotalClickHelpers++;

    if (uShop.EmployeesOwned == 1) {
      employeeImg.parentNode.removeChild(employeeImg);
      game.appendChild(employeeImg);
      employeeImg.style.animationPlayState = 'running';
      setTimeout(function() { employeeImg.style.transform = 'translate3d(39.8vw, -5vw, 0)'; employeeImg.style.animation = 'employeerock 2s linear infinite alternate'; }, 3000);
    }

    offlineCPSString.style.display = 'block';
  }
});

godFingerBuy.addEventListener('click', function() {
  sfx.play();
  if (stats.Clicks >= uShop.GodFingerCost && !uShop.GodFingerOwned) {
    sfx5.play();
    sfx5 = new Audio();
    sfx5.src = './snd/shopbuy.mp3';

    stats.Clicks -= uShop.GodFingerCost;
    stats.TrueClicks -= uShop.GodFingerCost;
    uShop.GodFingerOwned = !uShop.GodFingerOwned; //True

    if (buff != 'none') stats.RawClickVal += Math.round(uShop.GodFingerCV * stats.RawClickVal); else stats.ClickValue += Math.round(uShop.GodFingerCV * stats.ClickValue);

    uShop.GodFingerCost = 'Owned.';
    stats.TotalClickHelpers++;

    godFingerImg.parentNode.removeChild(godFingerImg);
    statsPanel.appendChild(godFingerImg);
    godFingerImg.style.animationPlayState = 'running';
  }
});

clickerFusionBuy.addEventListener('click', function() {
  sfx.play();
  if (shop.ClickersOwned >= 150 && !uShop.ClickerFusionOwned) {
    sfx5.play();
    sfx5 = new Audio();
    sfx5.src = './snd/shopbuy.mp3';

    uShop.ClickerFusionOwned = !uShop.ClickerFusionOwned; //True
    shop.ClickerCPSWorth += Math.round(shop.ClickersOwned * 1.5);

    if (buff == 'cpsDouble') { stats.ClicksPS += Math.round((shop.ClickersOwned * 1.5) * 2); stats.RawCPS += Math.round(shop.ClickersOwned * 1.5); } else stats.ClicksPS += Math.round(shop.ClickersOwned * 1.5);

    uShop.ClickerFusionCost = 'Owned';
    stats.TotalClickHelpers++;

    clickerFusionImg.parentNode.removeChild(clickerFusionImg);
    statsPanel.appendChild(clickerFusionImg);
    clickerFusionImg.style.animationPlayState = 'running';
  }
});
