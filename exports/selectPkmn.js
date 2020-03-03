let util = require('./util.js');

class SelectPkmn {
    constructor (name) {
        switch (name) {
            case 'Bulbasaur':
                this.name = name;
                this.type = 'grass';
                // this.att = '🍃';
                this.hp = 20;
                this.atk = 5;
                this.lvl = 1;
                break;
            case 'Squirtle':
                this.name = name;
                this.type = 'water';
                // this.att = '🌊';
                this.hp = 20;
                this.atk = 5;
                this.lvl = 1;
                break;
            case 'Charmander':
                this.name = name;
                this.type = 'fire';
                // this.att = '🔥';
                this.hp = 20;
                this.atk = 5;
                this.lvl = 1;
                break;
            case 'Pikachu':
                this.name = name;
                this.type = 'electric';
                // this.att = '⚡';
                this.hp = 25;
                this.atk = 6;
                this.lvl = 1;
                break;
            case 'Ditto':
                this.name = name;
                this.type = 'normal';
                // this.att = '💀';
                this.hp = 15;
                this.atk = 4;
                this.lvl = 1;
                break;    
            case 'Snorlax':
                this.name = name;
                this.type = 'normal';
                // this.att = '💀';
                this.hp = 30;
                this.atk = 20;
                this.lvl = 1;
                break;        
            default:
                console.log('oh no...');
                break;
        }
    }

    showPkmn () {
        return {
            name: this.name,
            type: this.type,
            // name: this.att,
            hp: this.hp,
            atk: this.atk,
            lvl: this.lvl,
        };
    }

    // strong vs weak
    atkPkmn (pkmn) {
        const strongConditions = 
            this.type === 'grass' && pkmn.type === 'water' ||
            this.type === 'fire' && pkmn.type === 'grass'||
            this.type === 'water' && pkmn.type === 'fire';

        const weakCondition =
            this.type === 'grass' && pkmn.type === 'normal' ||
            this.type === 'fire' && pkmn.type === 'normal'||
            this.type === 'water' && pkmn.type === 'normal';
        
        // console.log(weakCondition, strongConditions);
        // strongConditions ?
        // util.superEffective(pkmn, this) :
        // util.getTackled(pkmn, this);

        if (strongConditions) {
            // console.log('strong');
            util.superEffective(pkmn, this);            
        } else if (weakCondition) {
            // console.log('weak');
            util.noneEffective(pkmn, this);            
        } else {
            // console.log('basic');
            util.getTackled(pkmn, this);
        }
    }
}
module.exports = SelectPkmn;

/* 
- p1 : SelectPkmn/this
- p2 : pkmn
*/

// const Charmender = new SelectPkmn('Charmander');
// const Squirtle = new SelectPkmn('Squirtle');
// const Bulbasaur = new SelectPkmn('Bulbasaur');

// const Pikachu = new SelectPkmn('Pikachu');
// const Ditto = new SelectPkmn('Ditto');
// const Snorlax = new SelectPkmn('Snorlax');

// Pikachu.atkPkmn(Ditto);
// Ditto.atkPkmn(Pikachu);
// console.log( Pikachu.showPkmn() );

// Charmender.atkPkmn(Bulbasaur);
// Squirtle.atkPkmn(Charmender);
// Bulbasaur.atkPkmn(Squirtle);