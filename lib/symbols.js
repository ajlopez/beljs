
function Symbol(name) {
    this.name = function () { return name; };
    this.toString = function () { return name; };
}

function createSymbol(name) {
    return new Symbol(name);
}

module.exports = {
    symbol: createSymbol
};