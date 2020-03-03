const Pokemon = require('./selectPkmn.js');
const Trainer = require('./userTrainer.js');
// const menu = require('./menu.js');

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
// }

// wildPkmnFight = () => {
//     const WildPkmn = new Pokemon(pkmnOpts());
    
//     console.log(`A wild ${WildPkmn.name} appeared. Battle!`);
//     return WildPkmn;
// }

/* ----------------------------------- */


getTackled = (attacked, attacker) => {
    attacked.hp -= attacker.atk;
    
    console.log(
        `${attacker.name} used tackle!`
        + '\n' +
        `${attacked.name} was attacked by ${attacker.name}`
        + '\n'
    );
    console.log(
        `${attacked.name} → HP: ${attacked.hp}`
        + '\n' +
        `${attacker.name} → HP: ${attacker.hp}`
        + '\n'
    );
};

noneEffective = (attacked, attacker) => {
    attacked.hp += 2;
    getTackled(attacked, attacker);
    console.log(`It was none effective...` + '\n');
};

superEffective = (attacked, attacker) => {
    attacked.hp -= 5;
    getTackled(attacked, attacker);
    console.log(`It was super effective!!` + '\n');
};

module.exports = {
    // pkmnOpts: pkmnOpts,
    // rivalFigther: rivalFigther,
    // wildPkmnFight: wildPkmnFight,
    
    getTackled: getTackled,
    noneEffective: noneEffective,
    superEffective: superEffective
};

/* 
- p1 : attacker
- p2 : attacked
*/
