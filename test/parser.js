
const parser = require('../lib/parser');
const symbols = require('../lib/symbols');

function parse(test, type, text, expected) {
    const result = parser.parse(type, text);
    
    if (symbols.isSymbol(result) && symbols.isSymbol(expected))
        test.strictEqual(result.name(), expected.name());
    else
        test.deepEqual(result, expected);
}

exports['parse constants'] = function (test) {
    parse(test, 'integer', '42', 42);
    parse(test, 'string', '"foo"', "foo");
    parse(test, 'literal', 't', true);
    parse(test, 'literal', 'nil', null);
};

exports['parse symbol'] = function (test) {
    parse(test, 'symbol', 'foo', symbols.symbol('foo'));
};

