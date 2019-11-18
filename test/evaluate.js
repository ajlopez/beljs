
const bel = require('..');
const contexts = require('../lib/contexts');
const symbols = require('../lib/symbols');

exports['evaluate constants'] = function (test) {
    test.equal(bel.evaluate(42), 42);
    test.equal(bel.evaluate(false), false);
    test.equal(bel.evaluate(true), true);
    test.equal(bel.evaluate("foo"), "foo");
}

exports['evaluate symbols'] = function (test) {
    const answer = symbols.symbol('answer');
    const foo = symbols.symbol('foo');
    const context = contexts.context();
    
    context.set('answer', 42);
    
    test.strictEqual(bel.evaluate(foo, context), null);
    test.strictEqual(bel.evaluate(answer, context), 42);
}

