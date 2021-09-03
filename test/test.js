var assert = require('chai').assert;
var Character = require('../src/character.js')

describe('Character', () => {

        it('starts with health 1000, level 1 and alive true', () => {

            var character = new Character();

            assert.equal(character.health, 1000);
            assert.equal(character.level, 1);
            assert.equal(character.alive, true);

        })

        it('has health at 900 after a damage of 100', () => {

            var character = new Character();
            var victim = new Character();

            character.dealDamage(victim, 100);

            assert.equal(victim.health, 900);
        })

        it('has health at 0 and is dead if damage exceed the current health', () => {

            var character = new Character();
            var victim = new Character();

            character.dealDamage(victim, 1001);

            assert.equal(victim.health, 0);
            assert.equal(victim.alive, false);
        })

        it('increases health by 100 after "heal(100)" is called', () => {
            var character = new Character();
            var healed = new Character();

            character.dealDamage(healed, 500);
            healed.heal(100);

            assert.equal(healed.health, 600);

        })

        it('can not increases health if Character is dead', () => {
            var characterA = new Character();
            var characterB  = new Character();

            characterA.dealDamage(characterB, 1001);
            characterB.heal(100);

            assert.equal(characterB.health, 0);

        })

        it('testHealingAbove1000', () => {
            var characterA = new Character();
            var characterB = new Character();

            
            characterA.dealDamage(characterB, 500);
            characterB.heal(600);

            assert.equal(characterB.health, 500);
            
        })

        it('testCharacterDemageItself',()=> {
            var character = new Character();
            character.dealDamage(character, 100);
            assert.equal(character.health, 1000);
        })

        it('redeces damage by 50% if target is 5 or more level above attacker', () => {

            var attacker = new Character()
            var target = new Character();
            target.level = 10;

            attacker.dealDamage(target, 100);

            assert.equal(target.health, 950);
        })

        it('increases damage by 50% if target is 5 or more level below attacker', () => {

            var attacker = new Character()
            var target = new Character();
            attacker.level = 10;

            attacker.dealDamage(target, 100);

            assert.equal(target.health, 850);
        })
});