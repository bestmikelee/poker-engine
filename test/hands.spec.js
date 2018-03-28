const hands = require('../deck/hands');
const assert = require('chai').assert;
const example = ['Kc', 'Qh', 'Js', 'As', 'Td', '4s', '2c'];

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
        assert.isTrue(hands.isStraight(straightExample));
        assert.isTrue(hands.isStraight(wrapExample));
        assert.isTrue(hands.isStraight(unsortedExample));
        assert.isTrue(hands.isStraight(sevenCardHandExample));
        assert.isFalse(hands.isStraight(nonStraightExample));
    });
});
