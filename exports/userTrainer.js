// let Pokemon = require('./selectPkmn.js');

class UserTrainer {
    constructor(name) {
        this.name = name;
        this.curPkmn;
        this.pkmnList = [];
    }

    showPkmnList () {
        return this.pkmnList;
    }
    showCurPkmn () {
        return {
            current: this.curPkmn,
            list: this.pkmnList
        }
    }

    initPkmn () {
        this.curPkmn = this.pkmnList[0];
        this.pkmnList.splice(0, 1);
    }

    setPkmn (select) {
        this.pkmnList.forEach((poke, idx) => {
            if (poke.name === select) {
                this.curPkmn = poke;
                this.pkmnList.splice(idx, 1);

                // console.log({
                //     current: this.curPkmn,
                //     list: this.pkmnList
                // });
            }
        });
    }
    switchPkmn (select) {
        this.pkmnList.forEach((poke, idx) => {
            if (poke.name === select) {
                const pkmnSwitch = this.pkmnList[idx];
                this.pkmnList[idx] = this.curPkmn;
                this.curPkmn = pkmnSwitch;

                // console.log({
                //     current: this.curPkmn,
                //     list: this.pkmnList
                // });
            }
        });
    }
}
module.exports = UserTrainer;

/* 
- p : this : Trainer
- list : pkmns : Trainer.pkmnList
- idx : poke : pkmnList[idx]
*/

/*
- switch two index number order
- store > overwrite > update
*/


// let Piccolo = new AddedTrainer('Hackerman');
// console.log(Piccolo);
// console.log( Piccolo.showPkmnList() );
// console.log( Piccolo.showCurrPkmn() );
// Piccolo.setPkmn('Bulbasaur');
// Piccolo.switchPkmn('Squirtle');

// console.log(Piccolo.readyForBattle());