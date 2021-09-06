var assert = require('chai').assert;
var Character = require('../src/character.js')
var MeleeFighter = require('../src/melee-fighter.js');
var RangedFighter = require('../src/ranged-fighter.js');
var Tree = require('../src/tree.js');

describe('Character', () => {

        it('starts with health 1000, level 1 and alive true, belong to no factions', () => {

            var character = new Character();

            assert.equal(character.health, 1000);
            assert.equal(character.level, 1);
            assert.equal(character.alive, true);
            assert.lengthOf(character.factions, 0);

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

            assert.isTrue(victim.isDead());

        })


        it('increases health by 100 after heal is called', () => {
            var character = new Character();
            var victim = new Character();

            character.dealDamage(victim, 500);
            victim.heal(victim,100);

            assert.equal(victim.health, 600);

        })

        it('can not increases health if Character is dead', () => {
            var characterA = new Character();
            var characterB  = new Character();

            characterA.dealDamage(characterB, 1001);
            characterB.heal(characterB, 100);

            assert.equal(characterB.health, 0);

        })

        it('can increases health only to hisself', () => {

            var characterA = new Character();
            var characterB = new Character();

            characterA.health = 500;

            characterB.heal(characterA, 100);
            
            assert.equal(characterA.health, 500);
        });

        it('can not raise health above 1000', () => {
            var characterA = new Character();
            var characterB = new Character();

            
            characterA.dealDamage(characterB, 500);
            characterB.heal(600);

            assert.equal(characterB.health, 500);
            
        })

        it('can not deal damage to hisself',()=> {
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

        it('has an attack max range', ()=>{
            var character = new Character();
            assert.isDefined(character.maxRange);
        })

        describe('Melee Fighters', () => {

            it('has max Range of 2', ()=>{
                var melee = new MeleeFighter();
                assert.equal(melee.maxRange, 2);
            })
        })

        describe('Ranged Fighters', () => {

            it('has max Range of 20', ()=>{
                var melee = new RangedFighter();
                assert.equal(melee.maxRange, 20);
            })
        })

        it('can not deal damage to the target if it is out of range', ()=>{

            var playerOne = new RangedFighter();
            var playerTwo = new MeleeFighter();
            const range = 20;
            const damageAmount = 100;

            playerOne.dealDamage(playerTwo, damageAmount, range);
            playerTwo.dealDamage(playerOne, damageAmount, range);

            assert.equal(playerTwo.health, 900);
            assert.equal(playerOne.health, 1000);
        })

        it('can join and leave a faction called factionA', ()=>{

            var playerOne = new Character();
            playerOne.joinFaction('factionA');

            assert.deepEqual(playerOne.factions, ['factionA']);

            playerOne.leaveFaction('factionA');

            assert.deepEqual(playerOne.factions, []);
        })

        it('can check if another character is his ally',() => {
            var playerOne = new Character();
            var playerTwo = new Character();

            playerOne.joinFaction('factionA');
            playerTwo.joinFaction('factionA');

            assert.isTrue(playerOne.isAlly(playerTwo));
        })

        it('can not deal damage to the target if they are allies', ()=>{

            var playerOne = new Character();
            var playerTwo = new Character();

            playerOne.joinFaction('factionA');
            playerTwo.joinFaction('factionA');

            playerOne.dealDamage(playerTwo, 100);

            assert.equal(playerTwo.health, 1000);

        })

        it('can heal his ally', ()=>{

            var playerOne = new Character();
            var playerTwo = new Character();
            var playerThree = new Character();

            playerOne.joinFaction('factionA');
            playerTwo.joinFaction('factionA');

            playerThree.dealDamage(playerTwo, 100);
            playerOne.heal(playerTwo, 100);

            assert.equal(playerTwo.health, 1000);

        })

        it('it can not deal damage to target without health', () => {
            var playerOne = new Character();
            var tree = new Tree();
            tree.destroyed = true;
            var message = '';

            try{
                playerOne.dealDamage(tree, 50);
            }catch(err){
                message = err.message;
            }

            assert.equal(message, 'Deal damage to a target without health is not possible');

        })

        it('it can not heal non-character things', () => {
            var character = new Character();
            var target = {
                health: 500
            };

            character.heal(target, 100);
            assert.equal(target.health, 500);
        })

});

describe('Non-Character Things', () => {

    it('is destroyed when health is 0', () => {

        var character = new Character();
        var tree = new Tree();
        character.dealDamage(tree,2500);

        assert.equal(tree.health, 0);
        assert.equal(tree.destroyed, true);

    })
})