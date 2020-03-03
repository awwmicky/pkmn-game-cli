const inquirer = require('inquirer');
const Pokemon = require('./selectPkmn.js');
const Trainer = require('./userTrainer.js');
// const util = require('./util.js');

/* ----------------------------------- */

// pkmnOpts = () => {
//     const wildPkmnList = [
//         'Bulbasaur', 'Charmander', 'Squirtle',
//         'Pikachu', 'Ditto', 'Snorlax'
//     ];

//     const randPkmn = wildPkmnList[
//         Math.floor(Math.random() * wildPkmnList.length)
//     ];

//     return randPkmn;
// };

// rivalFigther = () => {
//     const RivalTrainer = new Trainer('RED');
//     RivalTrainer.curPkmn = new Pokemon(pkmnOpts());
    
//     console.log(
//         `The OG ${RivalTrainer.name} appeared. Battle!`
//         + '\n' +
//         `${RivalTrainer.name} chose ${RivalTrainer.curPkmn.name}`
//     );
//     return RivalTrainer;
// };

wildPkmnFight = () => {
    const WildPkmn = new Pokemon(pkmnOpts());
    
    console.log(`A wild ${WildPkmn.name} appeared. Battle!`);
    return WildPkmn;
};

/* ----------------------------------- */

checkBattleStat = (player, opponent) => {
    if (opponent instanceof Trainer) {
        opponent.curPkmn.atkPkmn(player.curPkmn);
        
        if (
            player.curPkmn.hp <= 0 && 
            player.pkmnList.every( pkmn => pkmn.hp <= 0 )
        ) {
            console.log('--IT IS OVER--');
            console.log(
                `The OG ${opponent.name} took pity & left...`
                + '\n'
            );
        } else if (player.curPkmn.hp <= 0) {
            console.log(
                `--Your ${player.curPkmn.name} Fainted--`
            );

            battleMode(player, opponent);
        } else {
            console.log('--STILL ALIVE--');
            console.log('Your move now' + '\n');
            
            battleMode(player, opponent);
        }
    } else if (opponent instanceof Pokemon) {
        opponent.atkPkmn(player.curPkmn);

        if (
            player.curPkmn.hp <= 0 && 
            player.pkmnList.every( pkmn => pkmn.hp <= 0 )
        ) {
            console.log('--IT IS OVER--');
            console.log(
                `The wild ${opponent.name} got bored & left...`
                + '\n'
            );
        } else if (player.curPkmn.hp <= 0) {
            console.log(
                `--Your ${player.curPkmn.name} Fainted--`
            );
            
            battleMode(player, opponent);
        } else {
            console.log('--STILL ALIVE--');
            console.log('Your move now' + '\n');
            
            battleMode(player, opponent);
        }   
    }
};

attackOpp = (player, opponent) => {
    if (opponent instanceof Trainer) {
        player.curPkmn.atkPkmn(opponent.curPkmn);

        // (opponent.curPkmn.hp > 0) ?
        // checkBattleStat(player, opponent) :
        // endOfGame(player);

        if (opponent.curPkmn.hp > 0) {
            checkBattleStat(player, opponent); 
        } else {
            console.log(
                `--${opponent.name}'s ${opponent.curPkmn.name} Fainted--`
                + '\n'
            );
            
            endOfGame(player);
        }
    } else if (opponent instanceof Pokemon) {
        player.curPkmn.atkPkmn(opponent);

        // (opponent.hp > 0) ?
        // checkBattleStat(player, opponent) :
        // endOfGame(player);

        if (opponent.hp > 0) {
            checkBattleStat(player, opponent);
        } else {
            console.log(
                `--The wild ${opponent.name} Fainted--`
                + '\n'
            );
            
            endOfGame(player);
        }   
    }
};

switchPkmn = (player, opponent) => {
    inquirer
    .prompt({
        type: 'list',
        name: 'pkmnChoice',
        message: 'Choose your Pokemon:',
        choices: player.pkmnList // pkmn name
    })
    .then( res => {
        // console.log(res);
        console.log(`You chose ${res.pkmnChoice}` + '\n');
        // player.switchPkmn(res.pkmnChoice);
        
        if (player.curPkmn.hp <= 0) {
            player.switchPkmn(res.pkmnChoice);
            battleMode(player, opponent);            
        } else {
            player.switchPkmn(res.pkmnChoice);          
            checkBattleStat(player, opponent);
        }
    });
};

checkPkmnStat = (player, opponent) => {
    if (opponent instanceof Trainer) {
        console.log({
            you: player.curPkmn.showPkmn(),
            rival: opponent.curPkmn.showPkmn()
        });
    } else if (opponent instanceof Pokemon) {
        console.log({
            you: player.curPkmn.showPkmn(),
            wild: opponent.showPkmn()
        });
    }

    battleMode(player, opponent);
};


module.exports = {
    // pkmnOpts: pkmnOpts,
    // rivalFigther: rivalFigther,
    // wildPkmnFight: wildPkmnFight,

    checkBattleStat: checkBattleStat,
    attackOpp: attackOpp,
    switchPkmn: switchPkmn,
    checkPkmnStat: checkPkmnStat
};