
const bel = require('..');
const contexts = require('../lib/contexts');
const top = require('../lib/top');
const symbols = require('../lib/symbols');
const lists = require('../lib/lists');
const parser = require('../lib/parser');
const fns = require('../lib/fns');

function evaluate(test, text, expected, context) {
    const expression = parser.parse('expression', text);
    
    const result = bel.evaluate(expression, context);
    
    if (result !== null && lists.isList(result))
        test.strictEqual(lists.toString(result), expected);
    else
        test.strictEqual(result, expected);
}

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

exports['evaluate xar symbol'] = function (test) {
    const value = lists.list([2, 1]);
    const xar = symbols.symbol('xar');
    const x = symbols.symbol('x');
    
    const context = contexts.context(top);
    context.set('x', value);
    
    const list = lists.list([ xar, 42, x ]);
    
    const result = bel.evaluate(list, context);
    
    test.ok(result);
    test.ok(lists.isList(result));
    test.equal(lists.toString(result), '(42 1)');
}

exports['evaluate list primitive function'] = function (test) {
    evaluate(test, '(list)', null);
    evaluate(test, "(list 1 42)", '(1 42)');
    evaluate(test, "(list 'a)", '(a)');
    evaluate(test, "(list 'a 'b)", '(a b)');
}

exports['evaluate fn apply'] = function (test) {
    evaluate(test, '((fn (x y) (join x y)) 42 1)', '(42 . 1)');
}

exports['evaluate set one name and value'] = function (test) {
    evaluate(test, '(set answer 42)', 42);
    evaluate(test, 'answer', 42);
}

exports['evaluate set one name and list value'] = function (test) {
    evaluate(test, '(set answer (join 42 1))', '(42 . 1)');
    evaluate(test, 'answer', '(42 . 1)');
}

exports['evaluate set two names and values'] = function (test) {
    evaluate(test, '(set one 1 answer 42)', 42);
    evaluate(test, 'one', 1);
    evaluate(test, 'answer', 42);
}

exports['evaluate empty list as nil'] = function (test) {
    evaluate(test, '()', null);
}

exports['evaluate set two names and values in a function'] = function (test) {
    evaluate(test, '((fn (x y) (set one x answer y)) 1 42)', 42);
    evaluate(test, 'one', 1);
    evaluate(test, 'answer', 42);
}

exports['evaluate set two names and values in a function without parameters'] = function (test) {
    evaluate(test, '((fn () (set one 1 answer 42)))', 42);
    evaluate(test, 'one', 1);
    evaluate(test, 'answer', 42);
}

exports['define function and apply it'] = function (test) {
    const expression = parser.parse('expression', '(def cons (x y) (join x y))');  
    bel.evaluate(expression);
    
    evaluate(test, '(cons 42 1 )', '(42 . 1)');
}

exports['evaluate do'] = function (test) {
    evaluate(test, '(do 1 2 3 42)', 42);
    evaluate(test, '(do 1 2 3 (join 42 1))', '(42 . 1)');
}

exports['evaluate +'] = function (test) {
    evaluate(test, '(+ 40 2)', 42);
    evaluate(test, '(+)', 0);
    evaluate(test, '(+ 2)', 2);
    evaluate(test, '(+ 2 (+ 20 20))', 42);
}

exports['evaluate -'] = function (test) {
    evaluate(test, '(- 44 2)', 42);
    evaluate(test, '(-)', 0);
    evaluate(test, '(- 2)', 2);
    evaluate(test, '(- (+ 22 22) 2)', 42);
}

exports['evaluate *'] = function (test) {
    evaluate(test, '(* 21 2)', 42);
    evaluate(test, '(*)', 1);
    evaluate(test, '(* 2)', 2);
    evaluate(test, '(* (+ 10 11) 2)', 42);
}

