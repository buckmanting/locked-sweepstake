let teams = require('./teams.json').teams;
let participants = require('./participants.json').participants;

let draws = [];
let numberOfDraws = 10;

let draw = () => {
    console.log('drawing teams');
    let teamsWithIds = [];
    let participantsWithIds = [];

    teams.forEach(team => {
        teamsWithIds.push({
            name: team,
            id: uuidV4()
        })
    });

    participants.forEach(participant => {
        participantsWithIds.push({
            name: participant,
            id: uuidV4()
        })
    });

    teamsWithIds.sort(compare);
    participantsWithIds.sort(compare);

    return assignTeams(teamsWithIds, participantsWithIds);
};

function assignTeams(teamsWithIds, participantsWithIds) {
    console.log('assigning teams to players');
    let teamsIndex = 0;
    let participantsIndex = 0;

    let draw = {}

    do {
        let currDraw = {};
        let currentParticipant = participantsWithIds[participantsIndex];

        if (!draw[currentParticipant.name]) {
            draw[currentParticipant.name] = {};
        }

        if (!draw[currentParticipant.name].teams) {
            draw[currentParticipant.name].teams = [];
        }

        draw[currentParticipant.name].teams.push(teamsWithIds[teamsIndex].name);

        // if end of participantsWithIds, go back to the start
        if (participantsIndex === participantsWithIds.length - 1) {
            participantsIndex = 0;
            teamsIndex++;
        } else {
            // otherwise, add one to each index
            participantsIndex++;
            teamsIndex++;
        }
    } while (teamsIndex < teamsWithIds.length - 1);

    return draw;
};

function uuidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

function compare(a, b) {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
};

// Do the draws
for (let i = 0; i < numberOfDraws; i++) {
    draws.push(draw());
    if (i > 0 && i < numberOfDraws - 1) {
        console.log('next draw...');
    }
}


var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('please enter the draw you want and press enter... ', function (answer) {
    console.log(`you have chose draw ${answer}`);
    console.log('that means you get the following draw');

    Object.keys(draws[answer - 1]).forEach(key => {
        console.log(`name: ${key}`);
        let participantTeams = draws[answer - 1][key].teams;
        console.log(`teams: ${participantTeams}`);
    });

    rl.close();
});
