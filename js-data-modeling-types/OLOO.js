
const Transaction = {

    // Encapsulates any private state
    init(sender, recipient, founds = 0.0) {
        // private field
        const _feePercent = 0.6;

        this.sender = sender;
        this.recipient = recipient;
        this.founds = founds;

        this.netTotal = function () {
            return _precisionRound(this.founds * _feePercent, 2)
        }

        // private method
        function _precisionRound(number, precision) {
            const factor = Math.pow(10, precision);
            return Math.round(number * factor) / factor;
        }

        return this;
    },

    // public method
    displayTransaction() {
        return `Transaction from ${this.sender} to ${this.recipient} for ${this.founds}`;
    }
}

const HashTransaction = Object.create(Transaction)

HashTransaction.init = function HashTransaction(sender, recipient, founds) {
    // calls init where HashTransaction's this is used
    Transaction.init.call(this, sender, recipient, founds)

    // new field
    this.transactionId = this.calculateHash();

    return this;
}

HashTransaction.calculateHash = function calculateHash() {
    const data = [this.sender, this.recipient].join('');
    let hash = 0, i = 0
    while (i < data.length) {
        hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0
    }
    return hash ** 2;
}

const one = Object.create(HashTransaction).init("test",'test','test');
