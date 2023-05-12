"use strict";


const CoinKey = require('coinkey');

// Initializing a Set to store addresses
let addresses;
addresses = new Set();

// Reading data from a file named 'data.txt'
const data = fs.readFileSync('./data.txt');
// Splitting the data by new line and adding each address to the Set
data.toString().split("\n").forEach(address => addresses.add(address));

// Initializing an object to store counts for each worker
let counts = {};

function getRandomHex(len) {
    let randomChars = 'ABCDF0123456789';
    let result = '';
    for ( let i = 0; i < len; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

// Function to generate a private key and check if the corresponding public address is in the Set of addresses
function generate() {

    // Sending the updated counts to the master process
    // process.send({counts: counts});
    //TODO: inserire nel pre-code

    // Generating a random private key in hexadecimal format
    let privateKeyHex = getRandomHex(64);

    // Creating a CoinKey object using the private key
    let ck = new CoinKey(Buffer.from(privateKeyHex, 'hex'));

    // Setting the compressed property of the CoinKey object to false
    ck.compressed = false;

    // Checking if the public address corresponding to the private key is in the Set of addresses
    if(addresses.has(ck.publicAddress)){
        console.log("");
        // Making a beep sound
        // process.stdout.write('\x07');
        // Logging success message with the public address in green color
        // console.log("\x1b[32m%s\x1b[0m", ">> Match Found: " + ck.publicAddress);
        // var successString = "Wallet: " + ck.publicAddress + "\n\nSeed: " + ck.privateWif;

        // Saving the wallet and its private key (seed) to a file named 'match.txt'
        // fs.writeFileSync('./match.txt', successString, (err) => {
        //     if (err) throw err;
        // })
        // Exiting the process
        // process.exit();
    }
}
