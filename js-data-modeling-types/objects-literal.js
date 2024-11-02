"use strict"

// creating a prototype for objectsLiteral
const objectsLiteral = {
    sender: "luis@tjoj.com",
    recipient: "luke@tjoj.com"
}

// The Object.create() static method creates a new object, using an
// existing object as the prototype of the newly created object.
const moneyTransaction = Object.create(objectsLiteral);
moneyTransaction.founds = 0.0;
moneyTransaction.addFounds = function (founds = 0) {
    this.founds += Number
}
moneyTransaction.addFounds(10.0)

Object.getPrototypeOf(moneyTransaction) == objectsLiteral // true
console.log(moneyTransaction.__proto__) // objectsLiteral proto

// or do by descriptor
const moneyTransactionWithProperties = Object.create(objectsLiteral, {
    founds: {
        value: 0.0,
        // can be viewed or used in Object.assign
        enumerable: true,
        // reassign value
        writable: true,
        // can be deleted
        configurable: false

    }
})

const hashTransaction = Object.create(objectsLiteral)
hashTransaction.calculateHash = function calculateHash() {
    const data = [this.sender, this.recipient].join('');
    let hash = 0, i = 0
    while (i < data.length) {
        hash = ( (hash << 5) - hash + data.charCodeAt(i++)) << 0
    }
    return hash**2;
}