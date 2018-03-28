const hands = require('../deck/hands');
const assert = require('chai').assert;
const example = ['Kc', 'Qh', 'Js', 'As', 'Td', '4s', '2c'];

const strengthExamples = {
    strfl: ['Kc', 'Qc', 'Jc', 'Ac', 'Tc', '4s', '2c'],
    quad: ['Kc', 'Kh', 'Ks', 'Kd', 'Td', '4s', '2c'],
    boat: ['Kc', 'Kh', 'Ks', 'As', 'Ad', '4s', '2c'],
    flush: ['Kc', 'Qh', 'Jc', 'Ac', 'Td', '4c', '2c'],
    str: ['Kc', 'Qh', 'Js', 'As', 'Td', '4s', '2c'],
    trips: ['Kc', 'Kh', 'Ks', 'As', 'Td', '4s', '2c'],
    '2pair': ['Kc', 'Kh', 'Js', 'Jd', 'Td', '4s', '2c'],
    pair: ['Kc', 'Kh', 'Js', 'As', 'Td', '4s', '2c'],
    hc: ['Kc', '8h', 'Js', 'As', 'Td', '4s', '2c']
};

describe('Hand Functions', () => {
    it('should sort ranks in descending order', () => {
        const sortRankExample = ['K', '2', 'Q', '5', '8'];
        const sortedRanks = hands.sortRanks(sortRankExample);
        assert.sameOrderedMembers(sortedRanks, ['K', 'Q', '8', '5', '2']);
    });

    it('should identify straights', () => {
        const straightExample = ['8', '7', '6', '5', '4'];
        const wrapExample = ['A', '5', '4', '3', '2'];
        const unsortedExample = ['3', '4', '2', '5', '6'];
        const sevenCardHandExample = ['A', 'Q', 'J', 'T', '9', '8', '2'];
        const nonStraightExample = ['A', 'J', 'T', '7', '5'];
        assert.sameOrderedMembers(hands.isStraight(straightExample), [
            '8',
            '7',
            '6',
            '5',
            '4'
        ]);
        assert.sameOrderedMembers(hands.isStraight(wrapExample), [
            '5',
            '4',
            '3',
            '2',
            'A'
        ]);
        assert.sameOrderedMembers(hands.isStraight(unsortedExample), [
            '6',
            '5',
            '4',
            '3',
            '2'
        ]);
        assert.sameOrderedMembers(hands.isStraight(sevenCardHandExample), [
            'Q',
            'J',
            'T',
            '9',
            '8'
        ]);
        assert.isFalse(hands.isStraight(nonStraightExample));
    });

    it('should identify hand strengths', () => {
        const strengths = Object.keys(strengthExamples);
        strengths.forEach(strength => {
            const handStrength = hands.strength(strengthExamples[strength]);
            assert.equal(handStrength.strength, strength);
        });
    });
});
