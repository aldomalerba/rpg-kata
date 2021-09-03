
module.exports = class Character {

    constructor() {
        this.health = 1000;
        this.level = 1;
        this.alive = true;
    }

    demage(demage) {
        if(this.health <= demage) {
            this.health = 0;
            this.alive = false;
            return;
        }
        this.health -= demage;
    }

    heal(heal){
        
        if(!this.alive) return;
        if(this.health + heal > 1000) return;

        this.health += heal;;
    }
}