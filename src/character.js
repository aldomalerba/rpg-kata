
module.exports = class Character {

    constructor() {
        this.health = 1000;
        this.level = 1;
        this.alive = true;
        this.maxRange = null;
        this.factions = [];
    }

    dealDamage(victim, qty) {

        if(Object.is(this, victim) || this.isAlly(victim)) return;

        var newDamage = this.getDamage(victim, qty);

        if(victim.health <= newDamage) {
            victim.health = 0;
            victim.alive = false;
            return;
        }

        victim.health -= newDamage;
    }

    getDamage(victim, qty){

        if(victim.level - this.level >= 5) qty -= qty * 0.5;
        if(this.level - victim.level >= 5) qty += qty * 0.5;

        return qty;
    }

    heal(qty){

        if(!this.alive) return;
        if(this.health + qty > 1000) return;

        this.health += qty;
    }

    joinFaction = (factionName) => this.factions.push(factionName);
    
    leaveFaction = (factionName) => {
        this.factions = this.factions.filter( faction => faction !== factionName);
    }

    isAlly(character){

        var allies = false;
        
        for(var factionName of this.factions) {

            var findedFaction = character.factions.find(faction => faction == factionName);

            if(findedFaction){
                allies = true;
                break;
            }
        }

        return allies;
    }

    healAlly = (ally, qty) => ally.heal(qty);
    

}