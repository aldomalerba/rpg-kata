
module.exports = class Character {

    constructor() {
        this.health = 1000;
        this.level = 1;
        this.alive = true;
    }

    demage(victim, qty) {
        if(victim.health <= qty) {
            victim.health = 0;
            victim.alive = false;
            return;
        }
        victim.health -= qty;
    }

    heal(character, qty){
        if(!character.alive) return;
        if(character.health + qty > 1000) return;

        character.health += qty;
    }

}