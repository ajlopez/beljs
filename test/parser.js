
const parser = require('../lib/parser');

function parse(test, type, text, expected) {
    test.deepEqual(parser.parse(type, text), expected);
}

exports['parse constants'] = function (test) {
    parse(test, 'integer', '42', 42);
    parse(test, 'string', '"foo"', "foo");
    parse(test, 'literal', 't', true);
    parse(test, 'literal', 'nil', null);
};

