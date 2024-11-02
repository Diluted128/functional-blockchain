import {compose} from "./utils/functional-utils.js";

const BTC = '₿';

// immutable object
// new object return, no shared state
export const Money = (currency, amount) => {
    return compose(
        // object cannot be extended
        Object.seal,
        // object attributes cannot be changed, added or removed
        Object.freeze
    )(Object.assign(Object.create(null), {
        amount: amount,
        currency: currency,
        equals: other => currency === other.currency && amount === other.amount,
        round: (precision = 2) => Money(currency, precisionRound(amount, precision)),
        plus: m => Money(currency, amount + m.amount), // called when m1 + m2
        minus: m => Money(currency, amount - m.amount), // called when m1 - m2
        times: m => Money(currency, amount * m.amount), // called when m1 * m2
        compareTo: other => amount - other.amount,
        asNegative: () => Money(currency, amount * -1),
        valueOf: () => precisionRound(amount, 2),
        toString: () => `${currency}${amount}` // called when console.log(m1)
    }));
}

Money.zero = (currency = BTC) => Money(currency, 0);

// Static helper functions
Money.sum = (m1, m2) => m1.plus(m2);
Money.subtract = (m1, m2) => m1.minus(m2);
Money.multiply = (m1, m2) => m1.times(m2);

function precisionRound(number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}
