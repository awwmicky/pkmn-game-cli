/* 
= Pseudo Code =
- select option
    - journey | quit
- input name
    - username
- current pkmn & enemy pkmn
    - current atk enemy
    - enemy damage decrease
    - 
*/
/* 
- is this how you pass objects in fn(param)?
- when pokemon reaches over '0', remain hp as '0',
- switch pokemon immediately 
*/
/* -------------------------------------------------------------------------- */
const inquirer = require('inquirer');
const Pokemon = require('./exports/selectPkmn.js');
const Trainer = require('./exports/addedTrainer.js');


availablePkmn = (player) => {
    if (player.curPkmn.hp <= 0) {
        return ["switch pokemon"];
    } else {
        return [
            `attack (with ${player.curPkmn.name})`, 
            'Switch Pokemon'
        ];
    }
};

// initializing Trainer
battleMode = (player, attacker) => {
    inquirer
    .prompt({
        type: 'list',
        name: 'battleChoice',
        message: 'What would you like to do?',
        choices: availablePkmn(player)
    })
    .then( res => {
        // console.log(res);
        if (res.battleChoice === 'Switch Pokemon') {
            inquirer
            .prompt({
                type: 'list',
                name: 'pkmnChoice',
                message: 'Choose your Pokemon:',
                choices: player.pkmnList // name
            })
            .then( res => {
                console.log(res);
                player.switchPkmn(res.pkmnChoice);
                attacker.atkPkmn(player.curPkmn);
                battleMode(player, attacker);
            });
        } else {
            player.curPkmn.atkPkmn(attacker);
            if (attacker.hp > 0) {
                attacker.atkPkmn(player.curPkmn);
                battleMode(player, attacker);
            } else {
                console.log(
                    `Enemy ${attacker.name} got bored & left...`
                );
                mainMenu();
            }
        }
    });
};

/*  
- array of wild pkmn
- select random pkmn
*/
ambushPkmn = player => {
    const WildPkmnList = [
        new Pokemon('Charmander'), 
        new Pokemon('Squirtle'),
        new Pokemon('Bulbasaur')
    ];
    // console.log(wildPkmnList);
    const RandWP = WildPkmnList[
        Math.floor(Math.random() * WildPkmnList.length)
    ];

    console.log(`You're being attacked by a wild ${RandWP.name}`);
    battleMode(player, RandWP);
};
// ambushPkmn();

startGame = () => {
    inquirer
    .prompt({
        type: 'input',
        name: 'playerName',
        message: 'What is your name traveller?'
    })
    .then( res => {
        // console.log(res);
        const CurrentTrainer = new Trainer(res.playerName);
        console.log(CurrentTrainer);

        CurrentTrainer.readyForBattle();
        ambushPkmn(CurrentTrainer);
        // choosePkmn();
    });
};

mainMenu = () => {
    inquirer
    .prompt({
        type: 'list',
        name: 'menuChoice',
        message: 'What would you like to do?',
        choices: ['Adventure', 'Quit']
    })
    .then( res => {
        switch (res.menuChoice) {
            case 'Adventure':
                startGame();
                break;
            case 'Quit':
                process.exit();
                break;
            default:
                console.log('try again...');
                break;
        }
    })
    .catch( err => {
        console.log(err);
    });
};
mainMenu();