
module.exports = class Character{

    constructor() {
        this.health = 1000;
        this.level = 1;
        this.alive = true;
        this.maxRange = null;
        this.factions = [];
    }

    dealDamage(victim, damageAmount, range = null) {

        if(victim.health === undefined )
            throw new Error('Deal damage to a target without health is not possible');

        var newDamage = this.calculateDamage(victim, damageAmount, range);

        if(newDamage >= victim.health) {
            victim.die();
            return;
        }

        victim.health -= newDamage;
    }

    die() {
        this.health = 0;
        this.alive = false;
    }

    isSelf = character => Object.is(this, character);

    isNotSelf = (character) => !this.isSelf(character);

    isAlive = () => this.alive;

    isDead = () => !this.isAlive();

    isOutOfMaxRange = (range) => range > this.maxRange;

    calculateDamage(victim, damageAmount, range){

        if(this.isSelf(victim) || 
            this.isAlly(victim) ||
            this.isOutOfMaxRange(range)) return 0;

        if(victim.level - this.level >= 5) damageAmount -= damageAmount * 0.5;
        if(this.level - victim.level >= 5) damageAmount += damageAmount * 0.5;

        return damageAmount;
    }

    heal(character, qty){

        if(this.canHeal(character, qty)) character.health += qty;

    }

    canHeal(character, qty) {
        return (this.isSelf(character) || this.isAlly(character)) &&
            character.isAlive() &&
            character.health + qty <= 1000;
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

    isNotAlly = (character) => !this.isAlly(character);
    

}