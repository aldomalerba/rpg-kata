var assert = require('chai').assert;
var Character = require('../src/character.js')
describe('Character', () => {

        it('testCharacterInitialization', () => {

            var character = new Character();

            assert.equal(character.health, 1000);
            assert.equal(character.level, 1);
            assert.equal(character.alive, true);

        })

        it('testDealDemageToCharacter', () => {

            var dealer = new Character();
            var victim = new Character();
            
            dealer.dealDemage();
        })
});