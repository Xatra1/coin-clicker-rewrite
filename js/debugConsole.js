// Spoilers ahead!
//
// This project is licensed under the GNU General Public License v2.
// For more info, see docs/COPYING

// Browser console and the games built-in debug console
"use strict";

const logChoices = ['Stay a while, and listen.',
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
  'Oops, all coins!',
  'This whole random quote feature isn\'t a complete waste of time, I swear.',
  'Magic!',
  'What? I like equal signs.',
  `Imagine having only 0 coins`,
  'Finally! I\'ve been stuck on this island for years!',
  'NOTICE: Due to people trying to steal our coins from the local Coin Clicker Bank, players will now only be receiving 0.01% of their current coins per second. We apologize for the inconvenience.',
  'Could you open a new browser window? It\'s hot in here!',
  'Get out of my room!',
  'Thank you for playing Coin Clicker.'
],

  man = `Coin Clicker Debug Console

clear - Clears the console.

echo - Outputs the given arguments.

help - Displays this manual.

pizza - Tells you how many $30 pizzas you could buy with your current amount of coins.

rmsg - Displays a random message. You can also choose a specific message by passing an argument with a value of 1-25, or pass 'all' to log all of them.

clhis - Clears the command history.

exit - Hides the debug console. You can press Alt+D to show the console again after running this command.

Tip: You can access your command history using the up and down arrow keys. This list is saved with your stats.
`;

var debug = false,

  commandHistory = [],
  commandHistoryIndex = 1,
  command = [],
  keywords = [];

commandInput.textContent = '';

debugConsole += 'Type \'help\' for a list of commands. You can press Alt+D to get back to the game screen.\n';

function randomMessage(argument) {
  let selectedMessage;

  if (!isNaN(parseInt(argument))) {
    selectedMessage = logChoices[argument];
    console.log(`=== %c${selectedMessage}%c ===`, 'color: yellow', 'color: inherit');
    debugConsole += `=== ${selectedMessage} ===\n`;

  } else if (argument === 'all') {
    for (let i = 0; i < logChoices.length; i++) {
      selectedMessage = logChoices[i];
      console.log(`${i}: === %c${selectedMessage}%c ===`, 'color: yellow', 'color: inherit');
      debugConsole += `${i}: === ${selectedMessage} ===\n`;
    }

  } else {
    selectedMessage = logChoices[rng(1, logChoices.length - 1)];
    console.log(`=== %c${selectedMessage}%c ===`, 'color: yellow', 'color: inherit');
    debugConsole += `=== ${selectedMessage} ===\n`;
  }
}

function commandInterpret() {
  commandAssemble();
  switch (command) {

    case '':
      break;

    case 'clear':
      debugConsole = 'Console cleared.\n';
      break;

    case 'echo':
      debugConsole += `${keywords}\n`;
      break;

    case 'help':
      debugConsole += man;
      break;

    case 'pizza':
      debugConsole += `You could buy ${(Math.floor(stats.clicks / 30)).toLocaleString()} $30 pizzas with your current amount of coins.\n`;
      break;

    case 'rmsg':
      randomMessage(keywords);
      break;

    case 'clhis':
      commandHistory = [];
      debugConsole += 'Command history cleared.\n'
      break;

    case 'exit':
      document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'd', 'altKey': true }));
      break;

    default:
      debugConsole += `Unknown command. Try 'help' for a list of commands.\n`;
  }

  if (command !== 'clhis') {
    commandHistory.push(commandInput.value);
    commandHistoryIndex = commandHistory.length;
  }
  command = [];
  keywords = [];
  commandInput.value = '';
}

function commandAssemble() {
  for (let i = 0; i < commandInput.value.length; i++) {
    if (i < 5) command.push(commandInput.value[i]);
    else keywords.push(commandInput.value[i]);
  }

  command = command.toString();
  command = command.replace(/\,/g, '');
  command = command.replace(/\s/g, '');
  keywords = keywords.toString();
  keywords = keywords.replace(/\,/g, '');
}

debugInputBox.addEventListener("submit", (event) => {
  event.preventDefault();
  commandInterpret();
});
