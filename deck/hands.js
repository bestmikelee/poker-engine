const helper = require('./helper');
const ranks = [
    'strfl',
    'quad',
    'boat',
    'flush',
    'str',
    'trips',
    '2pair',
    'pair',
    'hc'
];

function strength(cards) {
    // best 5 card hand
    const ranks = getRanksAsObj(cards);
    const cardFreqObj = {};
    const uniqRanks = Object.keys(ranks);
    const sortedRanks = sortRanks(uniqRanks);
    sortedRanks.forEach(r => {
        cardFreqObj[ranks[r]] = cardFreqObj[ranks[r]]
            ? cardFreqObj[ranks[r]].push(r)
            : [r];
    });
    // in a seven card game holding two trips is possible, but this needs to be a full house
    const boolStraight = isStraight(ranks);
    const suit = isFlush(cards);

    if (suit && boolStraight) {
        const flushCards = cards
            .filter(c => c.indexOf(suit) > -1)
            .map(c => c[0]);
        const sortedFlush = sortRanks(flushCards);
        const isStraightFlush = isStraight(sortedFlush);
        if (isStraightFlush) {
            return {
                strength: 'strfl',
                top: isStraightFlush.map(r => {
                    return `${r}${suit}`;
                })
            };
        }
    }
    if (cardFreqObj[4]) {
        return {
            strength: 'quad',
            top: cardFreqObj[4][0],
            kicker: cardFreqObj[1][0]
        };
    }
    if (cardFreqObj[3] && cardFreqObj[3].length > 1) {
        return {
            strength: 'boat',
            top: cardFreqObj[3][0],
            bottom: cardFreqObj[3][1]
        };
    }
    if (cardFreqObj[3] && cardFreqObj[2]) {
        return {
            strength: 'boat',
            top: cardFreqObj[3][0],
            bottom: cardFreqObj[2][0]
        };
    }
    if (suit) {
        const flushCards = cards
            .filter(c => c.indexOf(suit) > -1)
            .map(c => c[0]);
        const sortedFlush = sortRanks(flushCards);
        return {
            strength: 'flush',
            top: sortedFlush.map(c => `${c}${suit}`)
        };
    }
    if (boolStraight) {
        return {
            strength: 'str',
            top: boolStraight
        };
    }
    if (cardFreqObj[3]) {
        return {
            strength: 'trips',
            top: cardFreqObj[3][0],
            kickers: cardFreqObj[1].slice(0, 1)
        };
    }
    if (cardFreqObj[2] && cardFreqObj[2].length > 1) {
        return {
            strength: '2pair',
            top: cardFreqObj[2][0],
            bottom: cardFreqObj[2][1],
            kicker: cardFreqObj[1][0]
        };
    }
    if (cardFreqObj[2]) {
        return {
            strength: 'pair',
            top: cardFreqObj[2][0],
            kickers: cardFreqObj[1].slice(0, 2)
        };
    }
    return {
        strength: 'hc',
        kickers: cardFreqObj[1].slice(0, 4)
    };
}

function isStraight(uniqRanks) {
    const rankOrder = helper.rankOrder;
    const sortedRanks = sortRanks(uniqRanks);
    if (sortedRanks.length >= 5) {
        for (let i = 0; i + 4 <= sortedRanks.length; i++) {
            const r = sortedRanks[i];
            const orderIndex = rankOrder.indexOf(r);
            if (
                r === '5' &&
                i + 4 === sortedRanks.length &&
                sortedRanks[0] === 'A'
            ) {
                return sortedRanks.slice(i, i + 3).push('A');
            }
            if (sortedRanks[i + 4] === rankOrder[orderIndex + 4]) {
                return sortedRanks.slice(i, i + 4);
            }
        }
    }
    return false;
}

function sortRanks(uniqRanks) {
    // descending order (e.g. A,K,Q,J ...)
    return uniqRanks.sort((a, b) => {
        if (helper.rankOrder.indexOf(a) > helper.rankOrder.indexOf(b)) {
            return 1;
        }
        return -1;
    });
}

function isFlush(cards) {
    const suitCount = {};
    if (cards.length > 4) {
        const suits = getSuits(cards);
        for (let i = 0; i < suits.length; i++) {
            const s = suits[i];
            suitCount[s] = suitCount[s] ? ++suitCount[s] : 1;
            if (suitCount[s] > 4) {
                return s;
            }
        }
    }
    return false;
}

function getSuits(cards) {
    return cards.map(card => card[1]);
}

function getRanksAsObj(cards) {
    const rankObj = {};
    cards.forEach(card => {
        rankObj[card[0]] = rankObj[card[0]] ? ++rankObj[card[0]] : 1;
    });
    return rankObj;
}

module.exports = {
    sortRanks,
    isFlush,
    isStraight,
    strength,
    getSuits,
    getRanksAsObj
};
