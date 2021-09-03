module.exports = class Fight {

    constructor(playerOne, playerTwo){
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.range = 1;
    }

    damageToPlayerTwo(damage){

        if(this.playerOne.maxRange < this.range) return;
        this.playerOne.dealDamage(this.playerTwo, damage);

    }

    damageToPlayerOne(damage){

        if(this.playerTwo.maxRange < this.range) return;
        this.playerTwo.dealDamage(this.playerOne, damage);
        
    }

}