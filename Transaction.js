import {HasHash} from "./HasHash.js";

class Transaction {

    // public
    transactionId = '';
    timestamp = Date.now();

    // private
    #feePercent = 0.6;

    constructor(sender, recipient, founds = 0.0, description = 'Generic') {
        this.sender = sender;
        this.recipient = recipient;
        this.founds = Number(founds);
        this.description = description;
        // this.transactionId = this.calculateHash();
    }

    displayTransaction() {
        return `Transaction from ${this.sender} to ${this.recipient} for ${this.founds}`;
    }

    get netTotal() {
        return Transaction.#precisionRound(
            this.founds * this.#feePercent, 2
        )
    }

    static #precisionRound(number, precision) {
        const factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }
}

Object.assign(
    Transaction.prototype,
    HasHash([]),
    // HasSignature(['sender', 'recipient', 'funds']),
    // HasValidation()
)

const trans = new Transaction("jacoszek", "szumlas", 10, "desc");
console.log(trans.calculateHash());