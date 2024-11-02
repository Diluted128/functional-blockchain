// Capitalized name to denote a "class"
// The constructor function create an empty prototype for the new objects
function PrototypeChain(sender, recipient, founds) {
    this.sender = sender;
    this.recipient = recipient;
    this.founds = founds;
}


// When this function would be defined in the PrototypeChain function
// then all new objects would have a copy instead of the same reference
PrototypeChain.prototype.displayTransaction = function displayTransaction() {
    return `Transaction from ${this.sender} to ${this.recipient}`;
}


function HashTransaction(sender, recipient) {
    // check if the new keyword was used beforehand
    if (!new.target) {
        return new HashTransaction(sender, recipient);
    }

    // calls a parent constructor to init any parent properties
    // into this object's context
    PrototypeChain.call(this, sender, recipient);
}


// The new keyword won't associate parent prototype to the new object
// so we need to do that by Object.create
HashTransaction.prototype = Object.create(PrototypeChain.prototype);


// Hash transaction should be created from the HashTransaction constructor
// instead the PrototypeChain constructor would be used
HashTransaction.prototype.constructor = HashTransaction;


HashTransaction.prototype.calculateHash = function calculateHash() {
    const data = [this.sender, this.recipient].join('');
    let hash = 0, i = 0
    while (i < data.length) {
        hash = ( (hash << 5) - hash + data.charCodeAt(i++)) << 0
    }
    return hash**2;
}


// new keyword sets this to the new created object
const hashTran1 = new HashTransaction('luis@tjoj.com', 'luke@tjoj.com');
const hashTran2 = new HashTransaction('luis@tjoj.com', 'luke@tjoj.com');


PrototypeChain.prototype.isPrototypeOf(hashTran1); // true


hashTran1.calculateHash === hashTran2.calculateHash // true
hashTran1.displayTransaction === hashTran2.displayTransaction // true