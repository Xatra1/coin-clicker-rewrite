// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// All page element declarations

const spriteLayer = document.getElementById('spriteLayer'),

  // Title Screen

  titleScreen = document.getElementById('titleScreen'),
  sourceNote = document.getElementById('sourceNote'),
  buildString = document.getElementById('buildString'),
  githubLink = document.getElementById('githubLink'),
  skipIntroString = document.getElementById('skipIntroString'),
  updateString = document.getElementById('updateString'),
  betaString = document.getElementById('betaString'),
  startButton = document.getElementById('startButton'),

  smallCoins = [
    document.getElementById('smallCoin0'),
    document.getElementById('smallCoin1'),
    document.getElementById('smallCoin2'),
    document.getElementById('smallCoin3')
  ],

  title = document.getElementById('title'),

  // Game Panel

  gamePanel = document.getElementById('gameScreen'),
  canvas = document.getElementById('borderCanvas'),
  coin = document.getElementById('coin'),
  clickString = document.getElementById('clickString'),
  cpsString = document.getElementById('cpsString'),
  clickValueString = document.getElementById('clickValueString'),
  unlockString = document.getElementById('unlockString'),
  saveButton = document.getElementById('saveButton'),
  savingString = document.getElementById('savingString'),
  saveInfoString = document.getElementById('saveInfo'),
  buffString = document.getElementById('buffLabel'),
  fpsLabel = document.getElementById('fpsLabel'),

  // Shop Panel

  shopPanel = document.getElementById('shopPanel'),

  clickerBuy = document.getElementById('clickerBuy'),
  clickerCpsString = document.getElementById('clickerCpsString'),
  clickerCostString = document.getElementById('clickerCostString'),
  clickerInfo = document.getElementById('clickerInfo'),
  clickersOwnedString = document.getElementById('clickersOwnedString'),

  superClickerGroup = document.getElementById('superClickerContainer'),
  superClickerBuy = document.getElementById('superClickerBuy'),
  superClickerCpsString = document.getElementById('superClickerCpsString'),
  superClickerCostString = document.getElementById('superClickerCostString'),
  superClickersOwnedString = document.getElementById('superClickersOwnedString'),
  superClickerInfo = document.getElementById('superClickerInfo'),

  doublePointerGroup = document.getElementById('doublePointerContainer'),
  doublePointerBuy = document.getElementById('doublePointerBuy'),
  doublePointerCpsString = document.getElementById('doublePointerCpsString'),
  doublePointerCostString = document.getElementById('doublePointerCostString'),
  doublePointersOwnedString = document.getElementById('doublePointersOwnedString'),
  doublePointerInfo = document.getElementById('doublePointerInfo'),

  // Upgrade Shop Panel

  upgradeShopPanel = document.getElementById('upgradeShopPanel'),
  upgradeShopButton = document.getElementById('upgradeButton'),
  upgradeShopReturn = document.getElementById('shopReturnButton'),

  cursorBuy = document.getElementById('cursorBuy'),
  cursorCostString = document.getElementById('cursorCostString'),
  cursorOwnedString = document.getElementById('cursorOwnedString'),

  superCursorGroup = document.getElementById('superCursorContainer'),
  superCursorBuy = document.getElementById('superCursorBuy'),
  superCursorCostString = document.getElementById('superCursorCostString'),
  superCursorOwnedString = document.getElementById('superCursorOwnedString'),

  employeeGroup = document.getElementById('employeeContainer'),
  employeeBuy = document.getElementById('employeeBuy'),
  employeeCostString = document.getElementById('employeeCostString'),
  employeesOwnedString = document.getElementById('employeesOwnedString'),

  godFingerGroup = document.getElementById('godFingerContainer'),
  godFingerBuy = document.getElementById('godFingerBuy'),
  godFingerCostString = document.getElementById('godFingerCostString'),
  godFingerOwnedString = document.getElementById('godFingerOwnedString'),

  clickerFusionGroup = document.getElementById('clickerFusionContainer'),
  clickerFusionBuy = document.getElementById('clickerFusionBuy'),
  clickerFusionCostString = document.getElementById('clickerFusionCostString'),
  clickerFusionOwnedString = document.getElementById('clickerFusionOwnedString'),
  clickerFusionInfo = document.getElementById('clickerFusionInfo'),

  // Stats panel

  statsPanel = document.getElementById('statsPanel'),
  timePlayedString = document.getElementById('timeString'),
  lifetimeClicksString = document.getElementById('lifetimeClicksString'),
  lifetimeManualClicksString = document.getElementById('lifetimeManualClicksString'),
  coinClickCountString = document.getElementById('coinClickCountString'),
  totalClickHelpersString = document.getElementById('totalClickHelpersString'),
  achievementsUnlockedString = document.getElementById('achievementsUnlockedString'),
  rawCpsString = document.getElementById('rawCpsString'),
  rawClickValueString = document.getElementById('rawClickValueString'),
  cpsMultiplierString = document.getElementById('cpsMultiplierString'),
  clickValueMultiplierString = document.getElementById('clickValueMultiplierString'),
  offlineCpsString = document.getElementById('offlineCpsString'),

  // Debug panel

  debugScreen = document.getElementById('debugScreenFlexContainer'),
  debugInputBox = document.getElementById('debugInputBox'),
  debugOutputBox = document.getElementById('debugOutputBox'),
  commandInput = document.getElementById('debugCommandInput'),

  // Achievements

  achievementsButton = document.getElementById('achievementsButton'),
  achievementsButtonIcon = document.getElementById('achievementsButtonIcon'),
  achievementsLabel = document.getElementById('achievementsLabel'),
  achievementsPanel = document.getElementById('achievementsPanel'),
  achievementNameString = document.getElementById('achievementNameString'),
  achievementDescriptionString = document.getElementById('achievementDescriptionString'),
  isAchievementUnlockedString = document.getElementById('isAchievementUnlockedString'),
  secretAchievementHeaderString = document.getElementById('secretAchievementsHeader'),

  achievementButtons =
    [
      journeyBegins = document.getElementById('journeyBegins'),
      aGoodStart = document.getElementById('aGoodStart'),
      gettingThere = document.getElementById('gettingThere'),
      millionare = document.getElementById('millionare'),
      coinPool = document.getElementById('coinPool'),
      abundance = document.getElementById('abundance'),
      billionare = document.getElementById('billionare'),
      excess = document.getElementById('excess'),
      planetOfClicks = document.getElementById('planetOfClicks'),
      trillionare = document.getElementById('trillionare'),
      pocketDimension = document.getElementById('pocketDimension'),
      farTooMany = document.getElementById('farTooMany'),
      quadrillionare = document.getElementById('quadrillionare'),
      coinVortex = document.getElementById('coinVortex'),
      coinShapedBlackHole = document.getElementById('coinShapedBlackHole'),
      quintillionare = document.getElementById('quintillionare'),
      clickBeyond = document.getElementById('clickBeyond'),
      distantBeginning = document.getElementById('distantBeginning'),
      sextillionare = document.getElementById('sextillionare'),
      numberOverflow = document.getElementById('numberOverflow'),
      coinUniverse = document.getElementById('coinUniverse'),
      septillionare = document.getElementById('septillionare'),
      why = document.getElementById('why'),
      twentyFingers = document.getElementById('twentyFingers'),
      forTheWorthy = document.getElementById('forTheWorthy'),
      breakpoint = document.getElementById('breakpoint'),
      cheater = document.getElementById('cheater'),
    ],

  backToGame = document.getElementById('backToGame'),

  forTheWorthyIcon = document.getElementById('forTheWorthyIcon'),
  breakpointIcon = document.getElementById('breakpointIcon'),
  cheaterIcon = document.getElementById('cheaterIcon'),

  // Settings panel

  settingsButton = document.getElementById('settingsButton'),
  settingsLabel = document.getElementById('settingsLabel'),
  settingsPanel = document.getElementById('settingsPanel'),
  volumeInput = document.getElementById('volumeInput'),
  backgroundGradientCenterInput = document.getElementById('backgroundGradientCenterInput'),
  backgroundGradientEdgeInput = document.getElementById('backgroundGradientEdgeInput'),
  graphicsSettingButton = document.getElementById('graphicsSetting'),
  graphicsSettingInfo = document.getElementById('graphicSettingInfo'),
  numberShortenButton = document.getElementById('numberShortenToggle'),
  pauseProductionButton = document.getElementById('cpsPauseToggle'),
  resetBackgroundButton = document.getElementById('resetBackgroundButton'),
  wipeSaveButton = document.getElementById('wipeSaveButton'),
  backToGameSettings = document.getElementById('backToGameSettings');

debugOutputBox.value = '';

// Debug panel (variable)

var debugConsole = document.getElementById('debugOutputBox').value;
