
const gepars = require('gepars');
const geast = require('geast');

const lexers = require('./lexers');

const pdef = gepars.definition();

// constants
pdef.define('integer', 'integer:', function (value) { return geast.constant(parseInt(value)); });
pdef.define('string', 'string:', function (value) { return geast.constant(value); });
pdef.define('literal', 'name:t', function (value) { return geast.constant(true); });
pdef.define('literal', 'name:nil', function (value) { return geast.constant(null); });

function parseNode(type, text) {
    const lexer = lexers.lexer(text);   
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);
}

module.exports = {
    parse: parseNode
}

