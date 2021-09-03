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
            var victim = new Character();

            character.demage(victim, 100);

            assert.equal(victim.health, 900);
        })

        it('testDemageExeedsHealth', () => {

            var character = new Character();
            var victim = new Character();

            character.demage(victim, 1001);

            assert.equal(victim.health, 0);
            assert.equal(victim.alive, false);
        })

        it('testHealCharacter', () => {
            var character = new Character();
            var healed = new Character();

            character.demage(healed, 500);
            character.heal(healed, 100);

            assert.equal(healed.health, 600);

        })

        it('testHealToDeadCharacter', () => {
            var characterA = new Character();
            var characterB  = new Character();

            characterA.demage(characterB, 1001);
            characterA.heal(characterB, 100);

            assert.equal(characterB.health, 0);

        })

        it('testHealingAbove1000', () => {
            var characterA = new Character();
            var characterB = new Character();

            
            characterA.demage(characterB, 500);
            characterA.heal(characterB, 600);

            assert.equal(characterB.health, 500);
            
        })
});