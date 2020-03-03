const inquirer = require('inquirer');
const Pokemon = require('./exports/selectPkmn.js');
const Trainer = require('./exports/userTrainer.js');
const menu = require('./exports/menu.js');
const misc = require('./exports/misc.js');
const util = require('./exports/util.js');
/*  */

/*  */
endOfGame = (player) => {
    console.log('--SWEET VICTORY--');
    console.log(
        `Well okay then ${player.name}!`
        + '\n' +
        `You are not a gutterrat after all. You got moxy kid.`
        + '\n' +
        `But you are now on the Most Wanted list for ` +
        `Treason to Faint Pokemons...It's a felony, you know.`
        + '\n' +
        `Skiddadle now before I make you...`
        + '\n' + 
        `Now go! Go I say! Todaloo!!`
        + '\n'
    );

    inquirer
    .prompt({
        type: 'list',
        name: 'farwellNote',
        message: 'What would you like to do now?',
        choices: ['Travel', 'Leave']
    })
    .then( res => {
        (res.farwellNote === 'Travel') ?
        console.log(
            `${player.name} takes the first few steps,` + 
            `trips, falls, faints...game over...`
        ) :
        console.log('Good choice. Bye-bye now.');
    })
    .catch( err => {
        console.log(err);
    });
};

battleChoices = (player) => {
    if (player.curPkmn.hp <= 0) {
        return ['Switch Pokemon', 'Run Away'];
    } else {
        return [
            `Attack (with ${player.curPkmn.name})`, 
            'Switch Pokemon',
            'Check Status',
            'Run Away'
        ];
    }
};

battleMode = (player, opponent) => {
    inquirer
    .prompt({
        type: 'list',
        name: 'battleOption',
        message: 'Select Battle Options:',
        choices: battleChoices(player)
    })
    .then( res => {
        const battleOpt = res.battleOption.split(' ')[0];
        // console.log(res, battleOpt);
        // console.log(player, opponent);

        switch (battleOpt) {
            case 'Attack':
                console.log('Your Pokemon Attacks' + '\n');
                menu.attackOpp(player, opponent);
                break;
            case 'Switch':
                console.log('Switching Pokemon');
                menu.switchPkmn(player, opponent);
                break;
            case 'Check':
                console.log('Checking Stats');
                menu.checkPkmnStat(player, opponent);
                break;
            case 'Run':
                console.log(
                    'Bye-bye scardy cat...'
                    + '\n' +
                    'Try Again Later'
                );
                break;
            default:
                console.log('oh no...');
                break;
        }
    });
};

chooseBattle = (player) => {
    inquirer
    .prompt({
        type: 'list',
        name: 'adventureOptions',
        message: 'How would you like to start your adventure?',
        choices: ['A quick lesson', 'Into the wild']
    })
    .then( res => {
        let Opponent;
        switch (res.adventureOptions) {
            case 'A quick lesson':
                console.log('~~okay new weary youngling~~');
                Opponent = misc.rivalFigther();
                console.log(Opponent);
                battleMode(player, Opponent);
                break;
            case 'Into the wild':
                console.log('...okay dead beat scoundrel...');
                Opponent = misc.wildPkmnFighter();
                console.log(Opponent);
                battleMode(player, Opponent);
                break;
            default:
                console.log('NOPE...');
                break;
        }
    });
};

choosePkmn = (player) => {
    inquirer
    .prompt({
        type: 'list',
        name: 'pkmnChoice',
        message: 'Select your Pokemon:',
        choices: [
            'Bulbasaur', 'Charmander', 
            'Squirtle', '-RANDOM-'
        ]
    })
    .then( res => {
        // console.log(res);
        const ChosenPkmn =
            (res.pkmnChoice === '-RANDOM-') ?
            new Pokemon(misc.pkmnOpts()) :
            new Pokemon(res.pkmnChoice);

        // console.log(ChosenPkmn);
        console.log(`Hey look, you chose ${ChosenPkmn.name}!`);
        
        if (!player.curPkmn) {
            player.curPkmn = ChosenPkmn;
            // console.log(player);
            console.log('--¡¡Another One!!--');
            choosePkmn(player);
        } else {
            player.pkmnList.push(ChosenPkmn);
            // console.log(player);
            console.log('--¡Time for a battle!--');
            chooseBattle(player);
        }
    });
};
// choosePkmn();

startGame = () => {
    inquirer
    .prompt({
        type: 'input',
        name: 'playerName',
        message: 'What is your name traveller?',
        validate: ans => {
            // console.log(ans);
            let name = ans.trim();
            let regExp = /^[A-Z a-z]+$/;
            
            return ( name.match(regExp) ) ?
            true : "A PROPER NAME...Whippersnapper!";
        }
    })
    .then( res => {
        // console.log(res);
        const username = res.playerName.toUpperCase();

        const CurrentTrainer = new Trainer(username);
        // console.log(CurrentTrainer);
        console.log('--GREETINGS--');
        console.log(
            `Oh! Hello ${username}! Snazzy meeting you here.`
            + '\n' +
            `It's your conscience. I'll be your narrator.`
            + '\n' +
            `So it seems you like POKEMON, hmmm?!`
            + '\n' +
            `Well, Let's make it happen, shall we. Look!`
            + '\n' +
            `Time for you to get some balls!`
            + '\n' +
            `Pokeballs, that is.`
            + '\n'
        );
        choosePkmn(CurrentTrainer);
    });
};
// startGame();

mainMenu = () => {
    inquirer
    .prompt({
        type: 'list',
        name: 'menuOption',
        message: 'What would you like to do?',
        choices: ['Adventure', 'Quit']
    })
    .then( res => {
        (res.menuOption === 'Adventure') ?
        startGame() : process.exit();
    })
    .catch( err => {
        console.log(err);
    });
};
mainMenu();