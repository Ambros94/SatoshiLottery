import chalk from "chalk";
import CoinKey from "coinkey";
const Buffer = require('buffer/').Buffer

const SATOSHI_ADDRESS = "1AC4fMwgY8j9onSbXEWeH6Zan8QGMSdmtA";
// 80'000 BTC = 2'000'000'000
const MT_GOX_HACKER_ADDRESS = "1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF";

let maxPrefix = 0;


/*
  getRandomHex (len)
    len = length of randomly picked letters
*/
function getRandomHex(len) {
  let randomChars = 'ABCDF0123456789';
  let result = '';
  for ( let i = 0; i < len; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

function longestPrefix(source, matches) {
  let longest = 0;
  matches.forEach(match => {
    let i = 0;
    while (i < source.length && source[i] === match[i]) {
      i++;
    }
    if (i > longest) {
      longest = i;
    }
  });
  return longest;
}

function runLotteryWorker(maxPrefixDisplay) {
// Generate Random Private Key Hex
  let privateKeyHex = getRandomHex(64);

  let coinkey = new CoinKey(Buffer.from(privateKeyHex, 'hex'))
  coinkey.compressed = false;


  let prefix = longestPrefix(coinkey.publicAddress, [MT_GOX_HACKER_ADDRESS])

  if(prefix > maxPrefix) {
    maxPrefix = prefix;
    maxPrefixDisplay.innerText = maxPrefix + "";
  }

  const displayAddress = document.getElementById('address');
  const displayMatches = document.getElementById('matches')
  displayAddress.innerText = displayAddress.innerText + "\n" + coinkey.publicAddress ;
  displayMatches.innerText = displayMatches.innerText + "\n" + 'I'.repeat(prefix) ;
  console.log("TRY THIS: ", coinkey.publicAddress)
  // Check if generated public address matches given public address
  if (MT_GOX_HACKER_ADDRESS === coinkey.publicAddress) {
    console.log("OOOOOOOOHFFF, WIN");
    console.log(chalk.green(`OOOOOOOOHFFF, WIN`));
    console.log(chalk.green(coinkey.privateWif));
    console.log(chalk.green(coinkey.privateKey));
    console.log(chalk.green(coinkey.privateExportKey));
    console.log(coinkey);
  }
}


console.log(chalk.green(`Program Started...`));

window.addEventListener("DOMContentLoaded", (event) => {

  const startBtn = document.getElementById("start-btn");
  const stopBtn = document.getElementById("stop-btn");
  const maxPrefixDisplay = document.getElementById("max-prefix");

  let istrying = false;
  
  startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    stopBtn.style.display = 'block';
    istrying = true;
      const intervalId = setInterval(() => {
        if(istrying) {
          runLotteryWorker(maxPrefixDisplay);
          window.scrollTo(0, document.body.scrollHeight);
        } else {
          clearInterval(intervalId)
        }
      }, 50)
  })

  stopBtn.addEventListener('click', () => {
    istrying = false;
    startBtn.disabled = false;
    stopBtn.style.display = 'none';
  })
})