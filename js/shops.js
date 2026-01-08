// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Shop items, costs, and buy handling
"use strict";

// Unlock requirements are assigned later
var shops = {

  normalShop: {

    clicker: {
      unlocked: true,
      cps: 5,
      cost: 25,
      costScale: 5,
      amountOwned: 0,
      cpsWorth: 0,
      name: "Clicker",
    },

    superClicker: {
      unlocked: false,
      cps: 125000,
      cost: 10e+6,
      costScale: 100,
      amountOwned: 0,
      cpsWorth: 0,
      name: "Super Clicker",
    },

    doublePointer: {
      unlocked: false,
      cps: 75e+10,
      cost: 1e+14,
      costScale: 75,
      amountOwned: 0,
      cpsWorth: 0,
      name: "Double Pointer",
    },

  },

  upgradeShop: {

    cursor: {
      cpsMultiplier: 1.00,
      cost: 1e+9,
      owned: false,
      name: "Cursor"
    },

    superCursor: {
      unlocked: false,
      cpsMultiplier: 1.50,
      cost: 1.5e+12,
      owned: false,
      name: "Super Cursor",
    },

    employee: {
      unlocked: false,
      cpsMultiplier: 0.0005,
      cost: 5e+15,
      amountOwned: 0,
      name: "Employee",
    },

    godFinger: {
      unlocked: false,
      clickValueMultiplier: 0.1,
      cost: 1e+32,
      owned: false,
      name: "God Finger",
    },

    clickerFusion: {
      unlocked: false,
      owned: false,
      name: "Clicker Fusion",
    }

  },

},

  shopItems = {};

// if save data is present, shopItems needs to be reinitialized to update the
// nested object references.
// NOTE: this variable is only used for optimizations, any item modifications
// should be made to 'shop' directly.
function initializeShopItems() {
  shopItems = {
    clicker: {
      item: shops.normalShop.clicker,
      group: null
    },

    superClicker: {
      item: shops.normalShop.superClicker,
      group: superClickerGroup
    },

    doublePointer: {
      item: shops.normalShop.doublePointer,
      group: doublePointerGroup
    },

    cursor: {
      item: shops.upgradeShop.cursor,
      group: null
    },

    superCursor: {
      item: shops.upgradeShop.superCursor,
      group: superCursorGroup
    },

    employee: {
      item: shops.upgradeShop.employee,
      group: employeeGroup
    },

    godFinger: {
      item: shops.upgradeShop.godFinger,
      group: godFingerGroup
    },

    clickerFusion: {
      item: shops.upgradeShop.clickerFusion,
      group: clickerFusionGroup
    }
  }

  Object.freeze(shopItems);
}

function baseShopBuy(item, multiplier) {
  if (stats.clicks >= item.cost) {
    sfxShopBuy.play();

    stats.clicks = stats.trueClicks -= item.cost;
    item.cost += item.amountOwned + (item.costScale * stats.cps) + rng(100, 150);
    item.costScale++;

    item.amountOwned++;
    item.cpsWorth += item.cps;

    stats.rawClickValue += Math.round(item.amountOwned + 0.02 * stats.rawCps);
    stats.rawCps += item.cps;

    recalcCpsAndClickValue();

    item.cps += Math.round(multiplier * stats.cps);

    stats.totalClickHelpers++;
  }
}

function upgradeShopBuy(item) {
  switch (item) {
    case shops.upgradeShop.employee:
      if (stats.clicks >= item.cost) {
        sfxShopBuy.play();

        stats.clicks = stats.trueClicks -= item.cost;
        item.amountOwned++;

        stats.cpsMultiplier += item.cpsMultiplier;
        item.cost += Math.round(item.cost * (item.amountOwned * 2));

        stats.offlineCpsPercent += 0.00005;
        stats.totalClickHelpers++;

        offlineCpsString.style.display = 'block';
      }
      break;

    case shops.upgradeShop.godFinger:
      if (stats.clicks >= item.cost) {
        sfxShopBuy.play();

        stats.clicks = stats.trueClicks -= item.cost;
        item.owned = true;

        stats.clickValueMultiplier += item.clickValueMultiplier;

        item.cost = 'Owned.';
        stats.totalClickHelpers++;
      }
      break;

    case shops.upgradeShop.clickerFusion:
      if (shops.normalShop.clicker.amountOwned >= 150 && !item.owned) {
        sfxShopBuy.play();

        item.owned = true;

        stats.cpsMultiplier += shops.normalShop.clicker.amountOwned * 0.01;

        item.cost = 'Owned.';
        stats.totalClickHelpers++;
      }
      break;

    default:
      if (stats.clicks >= item.cost && !item.owned) {
        sfxShopBuy.play();

        stats.clicks = stats.trueClicks -= item.cost;
        item.owned = true;

        for (const property in shopItems) {
          if (Object.hasOwn(shopItems, property)) {
            if (shopItems[property].item.cpsWorth !== null)
              shopItems[property].item.cpsWorth += Math.round(shopItems[property].item.cpsWorth * item.cpsMultiplier);
          }
        }

        stats.cpsMultiplier += item.cpsMultiplier;

        recalcCpsAndClickValue();

        item.cost = 'Owned.';
        stats.totalClickHelpers++;
      }
      break;
  }
}

clickerBuy.addEventListener('click', function() {
  sfxClick.play();
  baseShopBuy(shops.normalShop.clicker, 0.15);
});

superClickerBuy.addEventListener('click', function() {
  sfxClick.play();
  baseShopBuy(shops.normalShop.superClicker, 0.60);
});

doublePointerBuy.addEventListener('click', function() {
  sfxClick.play();
  baseShopBuy(shops.normalShop.doublePointer, 1);
});

upgradeShopButton.addEventListener('click', function() {
  sfxClick.play();

  shopPanel.style.display = 'none';
  upgradeShopPanel.style.display = 'block';
});

cursorBuy.addEventListener('click', function() {
  sfxClick.play();
  upgradeShopBuy(shops.upgradeShop.cursor);
});

superCursorBuy.addEventListener('click', function() {
  sfxClick.play();
  upgradeShopBuy(shops.upgradeShop.superCursor);
});

employeeBuy.addEventListener('click', function() {
  sfxClick.play();
  upgradeShopBuy(shops.upgradeShop.employee);
});

godFingerBuy.addEventListener('click', function() {
  sfxClick.play();
  upgradeShopBuy(shops.upgradeShop.godFinger);
});

clickerFusionBuy.addEventListener('click', function() {
  sfxClick.play();
  upgradeShopBuy(shops.upgradeShop.clickerFusion);
});

upgradeShopReturn.addEventListener('click', function() {
  sfxClick.play();

  shopPanel.style.display = 'block';
  upgradeShopPanel.style.display = 'none';
});

function unlockedItemsCheck() {
  if (debug) {
    for (const property in shopItems) {
      if (Object.hasOwn(shopItems, property)) {
        shopItems[property].item.unlockRequirement = true;
      }
    }
  } else {
    shops.normalShop.superClicker.unlockRequirement = shops.normalShop.clicker.amountOwned >= 25

    shops.normalShop.doublePointer.unlockRequirement = shops.normalShop.clicker.amountOwned >= 45
      && shops.normalShop.superClicker.amountOwned >= 10

    shops.upgradeShop.superCursor.unlockRequirement = shops.upgradeShop.cursor.owned

    shops.upgradeShop.employee.unlockRequirement = shops.upgradeShop.cursor.owned
      && shops.upgradeShop.superCursor.owned;

    shops.upgradeShop.godFinger.unlockRequirement = shops.normalShop.clicker.amountOwned >= 65
      && shops.normalShop.superClicker.amountOwned >= 30
      && shops.normalShop.doublePointer.amountOwned >= 20
      && shops.upgradeShop.employee.amountOwned >= 15;

    shops.upgradeShop.clickerFusion.unlockRequirement = shops.normalShop.clicker.amountOwned >= 150;
  }

  for (const property in shopItems) {
    if (Object.hasOwn(shopItems, property)) {
      if (shopItems[property].item.unlockRequirement && !shopItems[property].item.unlocked) {

        if (dataLoaded) {
          sfxShopUnlock.play();
          unlockString.style.display = 'block';
          unlockString.textContent = `${shopItems[property].item.name} unlocked!`;
        }

        if (shopItems[property].group !== null)
          shopItems[property].group.style.display = 'block';
        shopItems[property].item.unlocked = true;

        labelHideTimer = 200;

      } else if (shopItems[property].item.unlocked)
        if (shopItems[property].group !== null) shopItems[property].group.style.display = 'block';
    }
  }
}

setInterval(unlockedItemsCheck, 1000 / 60);
