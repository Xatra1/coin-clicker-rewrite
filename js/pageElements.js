var debugConsole = document.getElementById('debugConsole').textContent;

const error = document.createElement('p'),
  errorStack = document.createElement('p'),

  // Title Screen

  titleScreen = document.getElementById('titleScreen'),
  sourceNote = document.getElementById('sourceNote'),
  buildString = document.getElementById('buildString'),
  githubLink = document.getElementById('githubLink'),
  skipIntroString = document.getElementById('skipIntroString'),
  updateString = document.getElementById('updateString'),
  betaString = document.getElementById('betaString'),
  startButton = document.getElementById('startButton'),
  smallCoin1 = document.getElementById('smallCoin1'),
  smallCoin2 = document.getElementById('smallCoin2'),
  smallCoin3 = document.getElementById('smallCoin3'),
  smallCoin4 = document.getElementById('smallCoin4'),
  titleScreenClicker = document.getElementById('titleScreenClicker'),
  title = document.getElementById('title'),

  // Game Panel

  gamePanel = document.getElementById('gameScreen'),
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
  autoBuyString = document.getElementById('autoBuyString'),

  clickerBuy = document.getElementById('clickerBuy'),
  clickerCPSString = document.getElementById('clickerCpsString'),
  clickerCostString = document.getElementById('clickerCostString'),
  clickerInfo = document.getElementById('clickerInfo'),
  clickersOwnedString = document.getElementById('clickersOwnedString'),
  clickerImage = document.getElementById('clickerImage'),

  superClickerGroup = document.getElementById('superClicker'),
  superClickerBuy = document.getElementById('superClickerBuy'),
  superClickerCPSString = document.getElementById('superClickerCpsString'),
  superClickerCostString = document.getElementById('superclickercoststring'),
  superClickersOwnedString = document.getElementById('superClickersOwnedString'),
  superClickerInfo = document.getElementById('superClickerInfo'),
  superClickerImage = document.getElementById('superClickerImage'),

  doublePointerGroup = document.getElementById('doublePointer'),
  doublePointerBuy = document.getElementById('doublePointerBuy'),
  doublePointerCPSString = document.getElementById('doublePointerCpsString'),
  doublePointerCostString = document.getElementById('doublePointerCostString'),
  doublePointersOwnedString = document.getElementById('doublePointersOwnedString'),
  doublePointerInfo = document.getElementById('doublePointerinfo'),
  doublePointerImage = document.getElementById('doublePointerImage'),

  // Upgrade Shop Panel

  upgradeShopPanel = document.getElementById('upgradeShopPanel'),
  upgradeButton = document.getElementById('upgradeButton'),
  upgradeShopReturn = document.getElementById('shopReturnButton'),

  cursorBuy = document.getElementById('cursorBuy'),
  cursorCostString = document.getElementById('cursorCostString'),
  cursorOwnedString = document.getElementById('cursorOwnedString'),
  cursorImage = document.getElementById('cursorImage'),

  superCursorGroup = document.getElementById('superCursor'),
  superCursorBuy = document.getElementById('superCursorBuy'),
  superCursorCostString = document.getElementById('superCursorCostString'),
  superCursorOwnedString = document.getElementById('superCursorOwnedString'),
  superCursorImage = document.getElementById('superCursorImage'),

  employeeGroup = document.getElementById('employee'),
  employeeBuy = document.getElementById('employeeBuy'),
  employeeCostString = document.getElementById('employeeCostString'),
  employeesOwnedString = document.getElementById('employeesOwnedString'),
  employeeImage = document.getElementById('employeeImage'),

  godFingerGroup = document.getElementById('godFinger'),
  godFingerBuy = document.getElementById('godFingerBuy'),
  godFingerCostString = document.getElementById('godFingerCostString'),
  godFingerOwnedString = document.getElementById('godFingerOwnedString'),
  godFingerImage = document.getElementById('godFingerImage'),

  clickerFusionGroup = document.getElementById('clickerFusion'),
  clickerFusionBuy = document.getElementById('clickerFusionBuy'),
  clickerFusionCostString = document.getElementById('clickerFusionCostString'),
  clickerFusionOwnedString = document.getElementById('clickerFusionOwnedString'),
  clickerFusionInfo = document.getElementById('clickerFusionInfo'),
  clickerFusionImage = document.getElementById('clickerFusionImage'),

  // Stats panel

  statsPanel = document.getElementById('statsPanel'),
  timePlayedString = document.getElementById('timeString'),
  lifetimeClicksString = document.getElementById('lifetimeClicksString'),
  lifetimeManualClicksString = document.getElementById('lifetimeManualClicksString'),
  coinClickCountString = document.getElementById('coinClickCountString'),
  totalClickHelpersString = document.getElementById('totalClickHelpersString'),
  achievementsUnlockedString = document.getElementById('achievementsUnlockedString'),
  rawCPSString = document.getElementById('rawCpsString'),
  rawClickValueString = document.getElementById('rawClickValueString'),
  offlineCPSString = document.getElementById('offlineCpsString'),

  // Debug panel

  debugScreen = document.getElementById('debugScreen'),
  cmdForm = document.getElementById('debugConsoleInput'),
  commandInput = document.getElementById('debugCommamdInput'),

  // Achievements

  achievementsButton = document.getElementById('achievementsButton'),
  achievementsButtonIcon = document.getElementById('achievementsButtonIcon'),
  achievementsLabel = document.getElementById('achievementsLabel'),
  achievementsPanel = document.getElementById('achievementsScreen'),
  achievementNameString = document.getElementById('achievementNameString'),
  achievementDescriptionString = document.getElementById('achievementDescriptionString'),
  achievementUnlockString = document.getElementById('achievementUnlockedString'),

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

  backToGame = document.getElementById('backToGame'),

  ftwIcon = document.getElementById('forTheWorthyIcon'),
  bpIcon = document.getElementById('breakpointIcon'),
  cheaterIcon = document.getElementById('cheaterIcon'),

  // Settings panel

  settingsButton = document.getElementById('settingsButton'),
  settingsLabel = document.getElementById('settingsLabel'),
  settingsPanel = document.getElementById('settingsScreen'),
  volumeInput = document.getElementById('volumeInput'),
  autoBuyBtn = document.getElementById('autoBuySetting'),
  backgroundGradientCenterInput = document.getElementById('backgroundGradientCenterInput'),
  backgroundGradientEdgeInput = document.getElementById('backgroundGradientEdgeInput'),
  graphicsSettingButton = document.getElementById('graphicsSetting'),
  graphicsSettingInfo = document.getElementById('graphicSettingInfo'),
  resetBackgroundButton = document.getElementById('resetBackgroundButton'),
  wipeSaveButton = document.getElementById('wipeSaveButton'),
  backToGameSettings = document.getElementById('backToGameSettings');

  // Sound effects

var sfxClick = document.getElementById('sfxClick'),
  sfxShopBuy = document.getElementById('sfxShopBuy'),
  sfxCoinWhoosh = document.getElementById('sfxCoinWhoosh'),
  sfxShopUnlock = document.getElementById('sfxShopUnlock'),
  sfxAchievementUnlock = document.getElementById('sfxAchievementUnlock'),
  sfxSpecialAchievementUnlock = document.getElementById('sfxSpecialAchievementUnlock'),
  sfxTitleWhoosh = document.getElementById('sfxTitleWhoosh'),
  sfxTitleWhoosh2 = document.getElementById('sfxTitleWhoosh2');
