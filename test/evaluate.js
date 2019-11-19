
const bel = require('..');
const contexts = require('../lib/contexts');
const symbols = require('../lib/symbols');
const lists = require('../lib/lists');

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

exports['evaluate list with primitive function'] = function (test) {
    const add = symbols.symbol('add');
    const context = contexts.context();
    
    context.set('add', function (args) { return args[0] + args[1] });
    
    const list = lists.list([ add, 1, 41 ]);
    
    test.strictEqual(bel.evaluate(list, context), 42);
}

