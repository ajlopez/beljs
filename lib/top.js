
const contexts = require('./contexts');
const top = contexts.context();

const symbols = require('./symbols');
let lists; // TODO review lazy loading

const symbol = symbols.symbol('symbol');
const pair = symbols.symbol('pair');

// TODO recognize chars, streams, numbers? boolean?
function type(args, context) {
    const arg = args[0];
    
    if (!lists)
        lists = require('./lists');
    
    if (lists.isList(arg))
        return pair;
    
    if (symbols.isSymbol(arg))
        return symbol;
    
    return null;
}

top.set('type', type);

module.exports = top;

