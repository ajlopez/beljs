
const parser = require('../lib/parser');
const symbols = require('../lib/symbols');
const lists = require('../lib/lists');

function parse(test, type, text, expected) {
    const result = parser.parse(type, text);
    
    if (symbols.isSymbol(result) && symbols.isSymbol(expected))
        test.strictEqual(result.name(), expected.name());
    else if (lists.isList(result) && lists.isList(expected))
        test.strictEqual(lists.toString(result), lists.toString(expected));
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

exports['parse simple expressions'] = function (test) {
    parse(test, 'expression', '42', 42);
    parse(test, 'expression', '"foo"', "foo");
    parse(test, 'expression', 't', true);
    parse(test, 'expression', 'nil', null);
    parse(test, 'expression', 'foo', symbols.symbol('foo'));
};

exports['parse list'] = function (test) {
    parse(test, 'list', '(foo bar 42)', lists.list([ symbols.symbol('foo'), symbols.symbol('bar'), 42 ]));  
};

