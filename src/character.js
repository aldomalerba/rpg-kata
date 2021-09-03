
module.exports = class Character {

    constructor() {
        this.health = 1000;
        this.level = 1;
        this.alive = true;
    }

    dealDamage(victim, qty) {

        if(Object.is(this, victim)) return;

        var newDamage = this.getDamage(victim, qty);

        victim.damage(newDamage);
    }

    getDamage(victim, qty){

        if(victim.level - this.level >= 5) qty -= qty * 0.5;
        if(this.level - victim.level >= 5) qty += qty * 0.5;

        return qty;
    }

    damage(qty){
        if(this.health <= qty) {
            this.health = 0;
            this.alive = false;
            return;
        }

        this.health -= qty;
    }

    heal(qty){

        if(!this.alive) return;
        if(this.health + qty > 1000) return;

        this.health += qty;
    }

}