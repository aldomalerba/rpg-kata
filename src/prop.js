module.exports = class Prop {
    constructor(health){
        this.health = health;
        this.destroyed = false;
    }

    die() {
        this.health = 0;
        this.destroyed = true;
    }
}