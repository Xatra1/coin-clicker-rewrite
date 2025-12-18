// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Achievement menu stuff

ach = [
  ['Journey Begins', 'Obtain 1 lifetime coin.', 1, false],
  ['A Good Start', 'Obtain 10 thousand lifetime coins.', 10000, false],
  ['Getting There', 'Obtain 100 thousand lifetime coins.', 100000, false],
  ['Millionare', 'Obtain 1 million lifetime coins', 1e+6, false],
  ['Coin Pool', 'Obtain 10 million lifetime coins.', 1e+7, false],
  ['Abundance', 'Obtain 100 million lifetime coins', 1e+8, false],
  ['Billionare', 'Obtain 1 billion lifetime coins.', 1e+9, false],
  ['Excess', 'Obtain 10 billion lifetime coins.', 1e+10, false],
  ['Planet of Coins', 'Obtain 100 billion lifetime coins', 1e+11, false],
  ['Trillionare', 'Obtain 1 trillion lifetime coins.', 1e+12, false],
  ['Pocket Dimension', 'Obtain 10 trillion lifetime coins.', 1e+13, false],
  ['Quadrillionare', 'Obtain 1 quadrillion lifetime coins.', 1e+15, false],
  ['Coin Vortex', 'Obtain 10 quadrillion lifetime coins.', 1e+16, false],
  ['Coin-Shaped Black Hole', 'Obtain 100 quadrillion lifetime coins.', 1e+17, false],
  ['Quintillionare', 'Obtain 1 quintillion lifetime coins.', 1e+18, false],
  ['Click Beyond', 'Obtain 10 quintillion lifetime coins.', 1e+19, false],
  ['Distant Beginning', 'Obtain 100 quintillion lifetime coins.', 1e+20, false],
  ['Sextillionare', 'Obtain 1 sextillion lifetime coins.', 1e+21, false],
  ['Number Overflow', 'Obtain 10 sextillion lifetime coins.', 1e+22, false],
  ['Coin Universe', 'Obtain 100 sextillion lifetime coins.', 1e+23, false],
  ['Septillionare', 'Obtain 1 septillion lifetime coins.', 1e+24, false],
  ['Why are you still here?', 'Obtain 10 septillion lifetime coins.', 1e+25, false],
  ['20 Fingers', 'Obtain 100 septillion lifetime coins.', 1e+26, false],
  ['For The Worthy', 'Obtain 1 octillion lifetime coins.', 1e+27, false],
  ['Breaking Point', 'Obtain far more lifetime coins than you should have.', Number.MAX_VALUE, false],
  ['Cheater', 'Hack in some money using the debug console.', null, false]
];

if (stats.Clicks != stats.TrueClicks && !ach[26][3]) {
  achStr = `Achievement Unlocked: ${ach[26][0]}`;
  if (init.DataLoaded) { sfx4.play(); unlockString.textContent = achStr; unlockString.style.display = 'block'; }
  ach[26][3] = true;
  stats.AchievementsUnlocked++;
  stats.HiddenAchievementsUnlocked++;
  SHT = 500;
}

setInterval(() => {
  if (ach[26][3]) { cheater.style.display = 'block'; cheaterIcon.style.display = 'block'; }
  if (ach[25][3]) { breakpoint.style.display = 'block'; bpIcon.style.display = 'block'; }
}, 1000 / 60)

achievementsButton.addEventListener('click', function() {
  game.style.display = 'none';
  achievementsPanel.style.display = 'block';
  lib.achLabelSwitch(0);
  newAchUnlocked = false;
  achievementsButton.style.borderInlineColor = 'rgb(0, 0, 0)';
  achievementsButton.style.borderBlockColor = 'rgb(0, 0, 0)';
  achievementsButtonIcon.style.color = 'rgb(0, 0, 0)';
});

backToGame.addEventListener('click', function() { sfx.play(); game.style.display = 'block'; achievementsPanel.style.display = 'none'; });
journeyBegins.addEventListener('click', function() { lib.achLabelSwitch(0); });
aGoodStart.addEventListener('click', function() { lib.achLabelSwitch(1); });
gettingThere.addEventListener('click', function() { lib.achLabelSwitch(2); });
millionare.addEventListener('click', function() { lib.achLabelSwitch(3); });
coinPool.addEventListener('click', function() { lib.achLabelSwitch(4); });
abundance.addEventListener('click', function() { lib.achLabelSwitch(5); });
billionare.addEventListener('click', function() { lib.achLabelSwitch(6); });
excess.addEventListener('click', function() { lib.achLabelSwitch(7); });
planetOfClicks.addEventListener('click', function() { lib.achLabelSwitch(8); });
trillionare.addEventListener('click', function() { lib.achLabelSwitch(9); });
pocketDimension.addEventListener('click', function() { lib.achLabelSwitch(10); });
farTooMany.addEventListener('click', function() { lib.achLabelSwitch(11); });
quadrillionare.addEventListener('click', function() { lib.achLabelSwitch(12); });
coinVortex.addEventListener('click', function() { lib.achLabelSwitch(13); });
coinShapedBlackHole.addEventListener('click', function() { lib.achLabelSwitch(14); });
quintillionare.addEventListener('click', function() { lib.achLabelSwitch(15); });
clickBeyond.addEventListener('click', function() { lib.achLabelSwitch(16); });
distantBeginning.addEventListener('click', function() { lib.achLabelSwitch(17); });
sextillionare.addEventListener('click', function() { lib.achLabelSwitch(18); });
numberOverflow.addEventListener('click', function() { lib.achLabelSwitch(19); });
coinUniverse.addEventListener('click', function() { lib.achLabelSwitch(20); });
septillionare.addEventListener('click', function() { lib.achLabelSwitch(21); });
why.addEventListener('click', function() { lib.achLabelSwitch(22); });
twentyFingers.addEventListener('click', function() { lib.achLabelSwitch(23); });
forTheWorthy.addEventListener('click', function() { lib.achLabelSwitch(24); });
breakpoint.addEventListener('click', function() { lib.achLabelSwitch(25); });
cheater.addEventListener('click', function() { lib.achLabelSwitch(26); });
