const Pokemon = require('./exports/selectPkmn.js');
const Trainer = require('./exports/userTrainer.js');

const Red = new Trainer('Red');
const Pikachu = new Pokemon('Pikachu');
const Snorlax = new Pokemon('Snorlax');
const Squirtle = new Pokemon('Squirtle');

Red.curPkmn = Pikachu;
Red.pkmnList.push(Snorlax, Squirtle);
console.log(Red);
Red.curPkmn.hp = 0;
Red.pkmnList[0].hp = 0;
Red.pkmnList[1].hp = 0;
// Red.pkmnList[2].hp = 0;

// let result = true;
// Red.pkmnList.forEach( pkmn => {
//     // pkmn.hp = 0;
//     console.log(`${pkmn.name} : ${pkmn.hp} hp`);
    
//     if (pkmn.hp <= 0) {
//         console.log('hp');
//         // result = false;
//         // return;
//     } else {
//         result = false;
//         return;
//     }
// });
// console.log(result);

// array.every(function(element) {
    // return element === first;
// });

// console.log(
//     Red.pkmnList.every( val => val.hp === 0 ),
// );

// if (Red.pkmnList.every( pkmn => pkmn.hp <= 0 ) &&
//     Red.curPkmn.hp <= 0) {
//     console.log('OVER');
// } else {
//     console.log('LIVE');
// }