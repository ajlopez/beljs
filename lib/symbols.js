
function Symbol(name) {
    this.name = function () { return name; };
    this.toString = function () { return name; };
}

function createSymbol(name) {
    if (typeof name !== 'string')
        throw new Error('symbol name should be an string');
    
    return new Symbol(name);
}

function isSymbol(value) {
    return value instanceof Symbol;
}

module.exports = {
    symbol: createSymbol,
    isSymbol: isSymbol
};

