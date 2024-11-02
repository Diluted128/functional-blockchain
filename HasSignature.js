
const DEFAULT_ENCODING_HEX = 'hex';
const DEFAULT_SIGN_ALGO = 'RSA-SHA256';

const HasSignature = (
    keys,
    options = {
        algorithm: DEFAULT_SIGN_ALGO,
        encoding: DEFAULT_ENCODING_HEX
    }) => ({

    generateSignature(privateKey) {
        return `This is ${privateKey} signature`;
    },

    verifySignature(publicKey, signature) {
        return true;
    }
})