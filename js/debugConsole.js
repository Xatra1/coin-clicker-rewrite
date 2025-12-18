// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Browser console and the games built-in debug console

logChoices = ['Stay a while, and listen.',
  'Boo!',
  'I think you may have hit the wrong button.',
  'Looking for bugs?',
  'You\'re not supposed to be here.',
  '<insert random variable here>',
  'Quit hacking in money!',
  'Didn\'t expect to see you here.',
  'Is this thing on?',
  'I\'ve always wondered what it would look like if I wrote a really long message into the debug console so I\'m just gonna keep typing until I feel like I\'ve typed enough which is actually a lot harder than it seems considering I need to figure out what to type anyways how are you enjoying the game? I\'ve worked very hard on it and it honestly kinda sucks but who cares at least you might be having fun! This game was honestly heavily inspired by cookie clicker and that game is really really good (way better than this one) so you should go play that instead unless you want to be so rich there won\'t even be enough money on the planet to match what you have.',
  'Introducing Coin Clicker: Now with less fall damage!',
  'Maybe you could buy a cookie with all the coins you have.',
  'Why not try tha \'pizza\' command?',
  'Legend says a hidden achievement will appear if you somehow obtain infinite coins... But who listens to stuff like that anyway?',
  'Hey you should try running \'wipeSave();\' in the input box, it won\'t hurt anything I promise',
  'Oops, all coins!',
  'This whole random quote feature isn\'t a complete waste of time, I swear.',
  'Magic!',
  'What? I like equal signs.',
  `Imagine having only 0 coins`,
  'Finally! I\'ve been stuck on this island for years!',
  'NOTICE: Due to people trying to steal our coins from the local Coin Clicker Bank, players will now only be receiving 0.01% of their current coins per second. We apologize for the inconvenience.',
  'Could you open a new window? It\'s hot in here!',
  'Get out of my room!',
  'Thank you for playing Coin Clicker.'
],

  man = String.raw`Coin Clicker Debug Console

 clear - Clears the console.
 echo - Outputs the given arguments.
 help - Displays this manual.
 exec - Executes JavaScript code.
 eval - An alias for exec, has the same function.
 pizza - Tells you how many $30 pizzas you could buy with your current amount of coins.
 rmsg - Displays a random message. You can also log a specific message by passing an argument with a value of 1-25, or pass 'all' to log all of them.
 clhis - Clears the command history.
 exit - Hides the debug console. You can press Alt+Y to show the console again after running this command.

 Typing any command into the console that isn't recognized will have the same effect as using the 'exec' or 'eval' commands.
 `;

var debugScreenState = 'closed',
  debug = false,
  forceBuff = false,

  command = [],
  keywords = [],
  commandHistory = [],
  commandHistoryIndex = 1;

commandInput.value = '';

debugConsole += 'Type \'help\' for a list of commands. You can press Alt+Y to get back to the game screen.\n';

for (let i = 0; i < debugLogs.length; i++) console.debug(`%c [Debug] %c${debugLogs[i]}`, 'color: yellow', 'color: inherit');

function randomMsg(argument) {
  let selectedMsg;

  if (!isNaN(parseInt(argument))) {
    selectedMsg = logChoices[argument];
    console.log(`=== %c${selectedMsg}%c ===`, 'color: yellow', 'color: inherit');
    debugConsole += `=== ${selectedMsg} ===\n`;

  } else if (argument == 'all') {
    for (let i = 0; i < logChoices.length; i++) {
      selectedMsg = logChoices[i];
      console.log(`${i}: === %c${selectedMsg}%c ===`, 'color: yellow', 'color: inherit');
      debugConsole += `${i}: === ${selectedMsg} ===\n`;
    }

  } else {
    selectedMsg = logChoices[rng(1, logChoices.length - 1)];
    console.log(`=== %c${selectedMsg}%c ===`, 'color: yellow', 'color: inherit');
    debugConsole += `=== ${selectedMsg} ===\n`;
  }
}

function commandInterpret() {
  commandAssemble();
  switch (cmd) {

    case 'clear':
      debugConsole = 'Console cleared.\n';
      break;

    case 'echo':
      debugConsole += `${keywords}\n`;
      break;

    case 'help':
      debugConsole += man;
      break;

    case 'exec':
    case 'eval':
      try {
        eval(arg);
        debugConsole += 'Command executed.\n';
      } catch (err) { debugConsole += `${err}\n`; }
      break;

    default:
      try {
        eval(commandInput.value);
        debugConsole += 'Command executed.\n';
      } catch (err) { debugConsole += `${err}\n`; }
      break;

    case 'pizza':
      debugConsole += `You could buy ${(Math.floor(stats.clicks / 30)).toLocaleString()} $30 pizzas with your current amount of coins.`;
      break;

    case 'rmsg':
      randomMsg(arg);
      break;

    case 'clhist':
      commandHistory = [];
      break;

    case 'exit':
      document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'd', 'altKey': true }));
      break;

  }

  if (cmd != 'clhis') { commandHistory.push(commandInput.value); commandHistoryIndex = commandHistory.length; }
  command = [];
  keywords = [];
  commandInput.value = '';
}

function commandAssemble() {
  for (let i = 0; i < commandInput.value.length; i++) { if (i < 5) command.push(commandInput.value[i]); else keywords.push(commandInput.value[i]); }

  command = command.toString();
  command = command.replace(/\,/g, '');
  command = command.replace(/\s/g, '');
  keywords = keywords.toString();
  keywords = keywords.replace(/\,/g, '');
}

commandForm.addEventListener("submit", function(event) { event.preventDefault(); commandInterpret(); });
