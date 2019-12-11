
const gepars = require('gepars');

const lexers = require('./lexers');
const symbols = require('./symbols');
const lists = require('./lists');

const quote = symbols.symbol('quote');

const pdef = gepars.definition();

// expressions
pdef.define('expression', 'literal');
pdef.define('expression', 'integer');
pdef.define('expression', 'string');
pdef.define('expression', 'symbol');
pdef.define('expression', 'list');

pdef.define('integer', 'integer:', function (value) { return parseInt(value); });
pdef.define('string', 'string:', function (value) { return value; });
pdef.define('literal', 'name:t', function (value) { return true; });
pdef.define('literal', 'name:nil', function (value) { return null; });
pdef.define('symbol', 'name:', function (value) { return symbols.symbol(value); });
pdef.define('symbol', 'operator:+', function (value) { return symbols.symbol(value); });
pdef.define('symbol', 'operator:-', function (value) { return symbols.symbol(value); });
pdef.define('list', [ 'delimiter:(', 'expressionlist', 'delimiter:)' ], function (values) { return lists.list(values[1]); });
pdef.define('list', [ 'delimiter:(', 'expressionlist', 'delimiter:.', 'expression', 'delimiter:)' ], function (values) { return lists.list(values[1], values[3]); });
pdef.define('list', [ "operator:'", 'expression' ], function (values) { return lists.list([ quote, values[1] ]); });
pdef.define('expressionlist', [ '!', 'delimiter:)' ], function (values) { return []; });
pdef.define('expressionlist', [ 'expression', '!', 'delimiter:.' ], function (values) { return [values[0]]; });
pdef.define('expressionlist', [ 'expression', 'expressionlist' ], function (values) { values[1].unshift(values[0]); return values[1]; });

function parseNode(type, text) {
    const lexer = lexers.lexer(text);   
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);
}

module.exports = {
    parse: parseNode
}

