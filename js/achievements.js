// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Achievement menu stuff
"use strict";

const achievements =
  [
    { name: 'Journey Begins', description: 'Obtain 1 lifetime coin. This achievement does not count towards your CpS boost.', coinRequirement: 1, unlocked: false },
    { name: 'A Good Start', description: 'Obtain 10 thousand lifetime coins.', coinRequirement: 10000, unlocked: false },
    { name: 'Getting There', description: 'Obtain 100 thousand lifetime coins.', coinRequirement: 100000, unlocked: false },
    { name: 'Millionaire', description: 'Obtain 1 million lifetime coins.', coinRequirement: 1e+6, unlocked: false },
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
    { name: 'Breaking Point', description: 'Obtain far more lifetime coins than you should have. This achievement does not count towards your CpS boost.', coinRequirement: Number.POSITIVE_INFINITY, unlocked: false },
    { name: 'Cheater', description: 'Hack in some money using the browser console. This "achievement" does not count towards your CpS boost.', coinRequirement: null, unlocked: false }
  ],

  pulsingAchievements = [
    [achievementsButton, achievementsButtonIcon],
    [forTheWorthy, forTheWorthyIcon],
    [breakpoint, breakpointIcon],
    [cheater, cheaterIcon]
  ]

var newAchievementUnlocked = false;

function loadAchievementStrings(index) {
  sfxClick.play();
  achievementNameString.textContent = achievements[index].name;
  achievementDescriptionString.textContent = achievements[index].description;
  isAchievementUnlockedString.textContent = achievements[index].unlocked ? 'Unlocked.' : 'Not unlocked.';
}

function achievementUnlockCheck() {
  if (stats.clicks !== stats.trueClicks && !achievements[26].unlocked) {
    if (dataLoaded) {
      sfxSpecialAchievementUnlock.play();
      unlockString.textContent = `Achievement Unlocked: ${achievements[26].name}`;
      unlockString.style.display = 'block';
    }
    labelHideTimer = 200;
    achievements[26].unlocked = true;
    stats.achievementsUnlocked++;
  }

  if (achievements[25].unlocked || achievements[26].unlocked) {
    secretAchievementHeaderString.style.display = 'block';
  }

  if (achievements[25].unlocked) {
    breakpoint.style.display = 'inline';
    breakpointIcon.style.display = 'inline';
  }

  if (achievements[26].unlocked) {
    cheater.style.display = 'inline';
    cheaterIcon.style.display = 'inline';
  }

  for (let i = 0; i < achievements.length; i++) {
    if (stats.lifetimeClicks >= achievements[i].coinRequirement
      && achievements[i].coinRequirement !== null
      && !achievements[i].unlocked
    ) {
      if (i !== 0 && i !== 25) {
        stats.cpsMultiplier += 0.01;
        recalcCpsAndClickValue();
      }

      achievements[i].unlocked = true;
      stats.achievementsUnlocked++;

      if (dataLoaded) {
        if (gameStarted) sfxAchievementUnlock.play();
        unlockString.textContent = `Achievement Unlocked: ${achievements[i].name}`;
        newAchievementUnlocked = true;
      }

      unlockString.style.display = 'block';
      labelHideTimer = 200;
    }
  }
}

function updateStars() {
  for (let i = 0; i < pulsingAchievements.length; i++) {
    let top = pulsingAchievements[i][0].getBoundingClientRect().top,
      left = pulsingAchievements[i][0].getBoundingClientRect().left;

    if (getComputedStyle(pulsingAchievements[i][0]).transform === 'none') {
      pulsingAchievements[i][1].style.top = `${top * 100 / innerHeight}vh`;
      pulsingAchievements[i][1].style.left = `${left * 100 / innerWidth}vw`;
    }
  }
}

setInterval(updateStars, 1000 / 60);
setInterval(achievementUnlockCheck, 1000 / 60);

achievementsButton.addEventListener('click', () => {
  if (settingsPanel.style.display === 'none') {
    sfxClick.play();
    gamePanel.style.display = 'none';
    achievementsPanel.style.display = 'block';
    updateStars();
    loadAchievementStrings(0);
    newAchievementUnlocked = false;
    achievementsButton.style.borderInlineColor = 'rgb(0, 0, 0)';
    achievementsButton.style.borderBlockColor = 'rgb(0, 0, 0)';
    achievementsButtonIcon.style.color = 'rgb(0, 0, 0)';
  }
});

for (let i = 0; i < achievementButtons.length; i++) {
  achievementButtons[i].addEventListener('click', () => {
    loadAchievementStrings(i);
  });
}

for (let i = 0; i < pulsingAchievements.length; i++) {
  pulsingAchievements[i][0].addEventListener('mouseover', () => {
    pulsingAchievements[i][1].style.transform = 'scale(1.05)';
  });

  pulsingAchievements[i][0].addEventListener('mouseleave', () => {
    pulsingAchievements[i][1].style.transform = 'scale(1.0)';
  });
}

backToGame.addEventListener('click', () => {
  if (settingsPanel.style.display === 'none') {
    sfxClick.play();
    gamePanel.style.display = 'block';
    achievementsPanel.style.display = 'none';
  }
});
