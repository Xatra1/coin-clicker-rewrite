// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Achievement menu stuff

const achievements =
  [
    { name: 'Journey Begins', description: 'Obtain 1 lifetime coin.', coinRequirement: 1, unlocked: false },
    { name: 'A Good Start', description: 'Obtain 10 thousand lifetime coins.', coinRequirement: 10000, unlocked: false },
    { name: 'Getting There', description: 'Obtain 100 thousand lifetime coins', coinRequirement: 100000, unlocked: false },
    { name: 'Millionaire', description: 'Obtain 1 million lifetime coins', coinRequirement: 1e+6, unlocked: false },
    { name: 'Coin Pool', description: 'Obtain 10 million lifetime coins.', coinRequirement: 1e+7, unlocked: false },
    { name: 'Abundance', description: 'Obtain 100 million lifetime coins.', coinRequirement: 1e+8, unlocked: false },
    { name: 'Billionaire', description: 'Obtain 1 billion lifetime coins.', coinRequirement: 1e+9, unlocked: false },
    { name: 'Excess', description: 'Obtain 10 billion lifetime coins.', coinRequirement: 1e+10, unlocked: false },
    { name: 'Planet of Coins', description: 'Obtain 100 billion lifetime coins.', coinRequirement: 1e+11, unlocked: false },
    { name: 'Trillionaire', description: 'Obtain 1 trillion lifetime coins.', coinRequirement: 1e+12, unlocked: false },
    { name: 'Pocket Dimension', description: 'Obtain 10 trillion lifetime coins.', coinRequirement: 1e+13, unlocked: false },
    { name: 'Pocket Universe', description: 'Obtain 100 trillion lifetime coins.', coinRequirement: 1e+14, unlocked: false },
    { name: 'Quadrillionaire', description: 'Obtain 1 quadrillion lifetime coins.', coinRequirement: 1e+15, unlocked: false },
    { name: 'Coin Vortex', description: 'Obtain 10 quadrillion lifetime coins.', coinRequirement: 1e+16, unlocked: false },
    { name: 'Coin-Shaped Black Hole', description: 'Obtain 100 quadrillion lifetime coins.', coinRequirement: 1e+17, unlocked: false },
    { name: 'Quintillionaire', description: 'Obtain 1 quintillion lifetime coins.', coinRequirement: 1e+18, unlocked: false },
    { name: 'Click Beyond', description: 'Obtain 10 quintillion lifetime coins.', coinRequirement: 1e+19, unlocked: false },
    { name: 'Distant Beginning', description: 'Obtain 100 quintillion lifetime coins.', coinRequirement: 1e+20, unlocked: false },
    { name: 'Sextillionaire', description: 'Obtain 1 sextillion lifetime coins.', coinRequirement: 1e+21, unlocked: false },
    { name: 'Number Overflow', description: 'Obtain 10 sextillion lifetime coins.', coinRequirement: 1e+22, unlocked: false },
    { name: 'Coin Universe', description: 'Obtain 100 sextillion lifetime coins.', coinRequirement: 1e+23, unlocked: false },
    { name: 'Septillionaire', description: 'Obtain 1 septillion lifetime coins.', coinRequirement: 1e+24, unlocked: false },
    { name: 'Why are you still here?', description: 'Obtain 10 septillion lifetime coins.', coinRequirement: 1e+25, unlocked: false },
    { name: '20 Fingers', description: 'Obtain 100 septillion lifetime coins.', coinRequirement: 1e+26, unlocked: false },
    { name: 'For The Worthy', description: 'Obtain 1 octillion lifetime coins.', coinRequirement: 1e+27, unlocked: false },
    { name: 'Breaking Point', description: 'Obtain far more lifetime coins than you should have.', coinRequirement: Number.MAX_VALUE, unlocked: false },
    { name: 'Cheater', description: 'Hack in some money using the debug console.', coinRequirement: null, unlocked: false }
  ];

var newAchievementUnlocked = false;

if (stats.clicks != stats.trueClicks && !achievements[26].unlocked) {
  if (init.DataLoaded) {
    sfx4.play();
    unlockString.textContent = `Achievement Unlocked: ${achievements[26].name}`;
    unlockString.style.display = 'block';
  }
  achievements[26].unlocked = true;
  stats.achievementsUnlocked++;
  stats.hiddenAchievementsUnlocked++;
  labelHideTimeout = 500;
}

function loadAchievementStrings(index) {
  sfx.play();
  achievementNameString.textContent = ach[index].name;
  achievementDescriptionString.textContent = ach[index].description;
  achUnlockString.textContent = ach[index].unlocked ? 'Unlocked.' : 'Not unlocked.';
}

setInterval(() => {
  if (achievements[26].unlocked) {
    cheater.style.display = 'block';
    cheaterIcon.style.display = 'block';
  }

  if (achievements[25].unlocked) {
    breakpoint.style.display = 'block';
    breakpointIcon.style.display = 'block';
  }

  for (let i = 0; i < achievements.length; i++) {
    if (stats.lifetimeClicks >= achievements[i].coinRequirement && achievements[i].coinRequirement != null && !ach[i].unlocked) {
      if (dataLoaded && i > 1 && i < 24) sfx3.play();
      achievements[i].unlocked = true;
      stats.achievementsUnlocked++;
      if (dataLoaded) {
        unlockString.textContent = `Achievement Unlocked: ${achievements[i].name}`;
        newAchievementUnlocked = true;
      }
      setTimeout(() => {
        unlockString.style.display = 'block';
      }, 1);
      labelHideTimeout = 500;
    }
  }
}, 1000 / 60)

achievementsButton.addEventListener('click', () => {
  game.style.display = 'none';
  achievementsPanel.style.display = 'block';
  loadAchievementStrings(0);
  newAchievementUnlocked = false;
  achievementsButton.style.borderInlineColor = 'rgb(0, 0, 0)';
  achievementsButton.style.borderBlockColor = 'rgb(0, 0, 0)';
  achievementsButtonIcon.style.color = 'rgb(0, 0, 0)';
});

backToGame.addEventListener('click', () => {
  sfx.play();
  game.style.display = 'block';
  achievementsPanel.style.display = 'none';
});

// NOTE: Highly experimental. Not sure if this will work
for (let i = 0; i < achievementButtons.length; i++) {
  achievementButtons[i].addEventListener('click', () => {
    loadAchievementStrings(i);
  });
}

/* journeyBegins.addEventListener('click', function() { loadAchievementStrings(0); });
aGoodStart.addEventListener('click', function() { loadAchievementStrings(1); });
gettingThere.addEventListener('click', function() { loadAchievementStrings(2); });
millionare.addEventListener('click', function() { loadAchievementStrings(3); });
coinPool.addEventListener('click', function() { loadAchievementStrings(4); });
abundance.addEventListener('click', function() { loadAchievementStrings(5); });
billionare.addEventListener('click', function() { loadAchievementStrings(6); });
excess.addEventListener('click', function() { loadAchievementStrings(7); });
planetOfClicks.addEventListener('click', function() { loadAchievementStrings(8); });
trillionare.addEventListener('click', function() { loadAchievementStrings(9); });
pocketDimension.addEventListener('click', function() { loadAchievementStrings(10); });
farTooMany.addEventListener('click', function() { loadAchievementStrings(11); });
quadrillionare.addEventListener('click', function() { loadAchievementStrings(12); });
coinVortex.addEventListener('click', function() { loadAchievementStrings(13); });
coinShapedBlackHole.addEventListener('click', function() { loadAchievementStrings(14); });
quintillionare.addEventListener('click', function() { loadAchievementStrings(15); });
clickBeyond.addEventListener('click', function() { loadAchievementStrings(16); });
distantBeginning.addEventListener('click', function() { loadAchievementStrings(17); });
sextillionare.addEventListener('click', function() { loadAchievementStrings(18); });
numberOverflow.addEventListener('click', function() { loadAchievementStrings(19); });
coinUniverse.addEventListener('click', function() { loadAchievementStrings(20); });
septillionare.addEventListener('click', function() { loadAchievementStrings(21); });
why.addEventListener('click', function() { loadAchievementStrings(22); });
twentyFingers.addEventListener('click', function() { loadAchievementStrings(23); });
forTheWorthy.addEventListener('click', function() { loadAchievementStrings(24); });
breakpoint.addEventListener('click', function() { loadAchievementStrings(25); });
cheater.addEventListener('click', function() { loadAchievementStrings(26); }); */
