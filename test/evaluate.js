
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

exports['evaluate list with primitive function and list'] = function (test) {
    const add = symbols.symbol('add');
    const context = contexts.context();
    
    context.set('add', function (args) { return args[0] + args[1] });
    
    const list = lists.list([ add, 1, lists.list([ add, 40, 1 ]) ]);
    
    test.strictEqual(bel.evaluate(list, context), 42);
}

exports['evaluate join in top context'] = function (test) {
    const join = symbols.symbol('join');
    
    const list = lists.list([ join, 1, 42 ]);
    
    const result = bel.evaluate(list);
    
    test.ok(lists.isList(result));
    test.strictEqual(lists.toString(result), '(1 . 42)');
}

exports['evaluate join in top context with one argument'] = function (test) {
    const join = symbols.symbol('join');
    
    const list = lists.list([ join, 42 ]);
    
    const result = bel.evaluate(list);
    
    test.ok(lists.isList(result));
    test.strictEqual(lists.toString(result), '(42)');
}

exports['evaluate quoted symbol using top context'] = function (test) {
    const quote = symbols.symbol('quote');
    const foo = symbols.symbol('foo');
    
    const list = lists.list([ quote, foo ]);
    
    const result = bel.evaluate(list);
    
    test.ok(symbols.isSymbol(result));
    test.strictEqual(result.name(), 'foo');
}

exports['evaluate car symbol using top context'] = function (test) {
    const car = symbols.symbol('car');
    const quote = symbols.symbol('quote');
    
    const list = lists.list([ car, lists.list([ quote, lists.list([42, 1]) ]) ]);
    
    test.equal(bel.evaluate(list), 42);
}

exports['evaluate car symbol over nil'] = function (test) {
    const car = symbols.symbol('car');
    
    const list = lists.list([ car, null ]);
    
    test.equal(bel.evaluate(list), null);
}

exports['evaluate cdr symbol using top context'] = function (test) {
    const cdr = symbols.symbol('cdr');
    const quote = symbols.symbol('quote');
    
    const list = lists.list([ cdr, lists.list([ quote, lists.pair(1, 42) ]) ]);
    
    test.equal(bel.evaluate(list), 42);
}

exports['evaluate cdr symbol over nil'] = function (test) {
    const cdr = symbols.symbol('cdr');
    
    const list = lists.list([ cdr, null ]);
    
    test.equal(bel.evaluate(list), null);
}

