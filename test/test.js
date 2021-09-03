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

            var character = new Character();
            
            character.demage(100);

            assert.equal(character.health, 900);
        })

        it('testDemageExeedsHealth', () => {

            var character = new Character();

            character.demage(1001);

            assert.equal(character.health, 0);
            assert.equal(character.alive, false);
        })

        it('testHealCharacter', () => {
            var character = new Character();

            character.demage(500);
            character.heal(100);

            assert.equal(character.health, 600);

        })

        it('testHealToDeadCharacter', () => {
            var character = new Character();

            character.demage(1001);
            character.heal(100);

            assert.equal(character.health, 0);

        })

        it('testHealingAbove1000', () => {
            var character = new Character();

            character.demage(500);
            character.heal(600);

            assert.equal(character.health, 500);

        })
});