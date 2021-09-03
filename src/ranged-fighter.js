const Character = require("./character");

module.exports = class RangedFighter extends Character {

    constructor(){
        super();
        this.maxRange = 20;
    }

}