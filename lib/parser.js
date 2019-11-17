
const gepars = require('gepars');

const lexers = require('./lexers');
const symbols = require('./symbols');

const pdef = gepars.definition();

// constants
pdef.define('integer', 'integer:', function (value) { return parseInt(value); });
pdef.define('string', 'string:', function (value) { return value; });
pdef.define('literal', 'name:t', function (value) { return true; });
pdef.define('literal', 'name:nil', function (value) { return null; });
pdef.define('symbol', 'name:', function (value) { return symbols.symbol(value); });

function parseNode(type, text) {
    const lexer = lexers.lexer(text);   
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);
}

module.exports = {
    parse: parseNode
}

