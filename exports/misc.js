const Pokemon = require('./selectPkmn.js');
const Trainer = require('./userTrainer.js');
// const menu = require('./menu.js');

/* ----------------------------------- */

pkmnOpts = () => {
    const wildPkmnList = [
        'Bulbasaur', 'Charmander', 'Squirtle',
        'Pikachu', 'Ditto', 'Snorlax'
    ];

    const randPkmn = wildPkmnList[
        Math.floor(Math.random() * wildPkmnList.length)
    ];

    return randPkmn;
};

rivalFigther = () => {
    const RivalTrainer = new Trainer('RED');
    RivalTrainer.curPkmn = new Pokemon(pkmnOpts());
    
    console.log(
        `The OG ${RivalTrainer.name} appeared. Battle!`
        + '\n' +
        `${RivalTrainer.name} chose ${RivalTrainer.curPkmn.name}`
    );
    return RivalTrainer;
};

wildPkmnFighter = () => {
    const WildPkmn = new Pokemon(pkmnOpts());
    
    console.log(`A wild ${WildPkmn.name} appeared. Battle!`);
    return WildPkmn;
};


module.exports = {
    pkmnOpts: pkmnOpts,
    rivalFigther: rivalFigther,
    wildPkmnFighter: wildPkmnFighter
};