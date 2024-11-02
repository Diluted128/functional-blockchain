import {compose, filter, flatten, map, not, pipe, prop, reduce} from "ramda";

const R = require('ramda');
import {Money} from "./Money.js";

class Wallet {
    constructor(publicKey, privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    get address() {
        return this.publicKey;
    }

    balance(ledger) {
        const computeBalanceForAddress = this.computeBalance(this.address);
        return computeBalanceForAddress()
    }

    computeBalance = (address) =>
        R.pipe(
            Array.from,
            filter(
                pipe(prop('isGenesis'), not)
            ),
            flatten(prop('data')),
            map(this.balanceOf(address)),
            reduce(Money.sum, Money.zero()),
            Money.round
        )

    balanceOf(address, transaction) {
        return Money.sum(
            transaction.recipient === address ? transaction.founds : Money.zero(),
                transaction.sender === address ? transaction.founds.asNegative() : Money.zero()
        )
    }
}