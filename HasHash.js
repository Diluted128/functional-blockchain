import * as crypto from "node:crypto";
import {curry, pipe} from "ramda";

const DEFAULT_ALGO_SHA256 = 'SHA256';
const DEFAULT_ENCODING_HEX = 'hex';

export const HasHash = (
    keys,
    options = {
        algorithm: DEFAULT_ALGO_SHA256,
        encoding: DEFAULT_ENCODING_HEX
    }) => ({
    calculateHash() {
        return pipe(
            selectAttributesToHash,
            assemble,
            curry(computeCipher(options))
        )(this)
    }
});

const selectAttributesToHash = (obj) => [obj.sender, obj.recipient, obj.founds];
const assemble = (...pieces) => {
    return pieces.map(JSON.stringify).join('');
}
const computeCipher = (options, data)  => {
    return crypto.createHash(options.algorithm)
        .update(data)
        .digest();
}
