const fs = require('fs');
const path = require('path');

const tsvFilePath = path.resolve(__dirname, '..', 'source', 'ras_scores.tsv')
const playersFilePath = path.resolve(__dirname, '..', 'source', 'players.js')

function readTSVFile(filePath) {
    const contents = fs.readFileSync(filePath, 'utf8');
    return contents.split('\n').map(line => line.split('\t'));
}

// Function to read and parse the JavaScript file
function readPlayersFile(filePath) {
    const playersModule = require(filePath);
    return playersModule;
}

// Function to write the updated players array to a file
function writeUpdatedPlayers(filePath, players) {
    const content = `const prospects = [${JSON.stringify(players, null, 2)}];`;
    fs.writeFileSync(filePath, content, 'utf8');
}

// Main function to update players with RAS scores
function updatePlayersWithRAS() {
    const tsvData = readTSVFile(tsvFilePath);
    const players = readPlayersFile(playersFilePath);

    tsvData.forEach((line, index) => {
        if (index > 0) {
            const name = line[0];
            const RAS = line[4];

            players.forEach(player => {
                if (player.name == name) {
                    player.RAS == "" ? player.RAS = 'N/A' : player.RAS = RAS;
                    // console.log(player.name, RAS)
                }
            })
        }
    });

    writeUpdatedPlayers(playersFilePath, players);
}

// Run the update function
updatePlayersWithRAS();