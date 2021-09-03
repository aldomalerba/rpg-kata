const Character = require("./character");

module.exports = class MeleeFighter extends Character {

    constructor(){
        super();
        this.maxRange = 2;
    }

}