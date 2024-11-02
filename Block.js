class Block {
    #blockchain;

    constructor(index, previousHash, data = []) {
        this.index = index;
        this.data = data;
        this.previousHash = previousHash;
        this.timestamp = Date.now();
        this.hash = this.calculateHash();
    }

    set blockchain(b) {
        this.#blockchain = b;
        return this;
    }

    isGenesis() {
        return this.previousHash === '0'.repeat(64);
    }
}

Object.assign(
    Block.prototype,
    HasHash(['index', 'timestamp', 'previousHash', 'data']),
    HasValidation()
)