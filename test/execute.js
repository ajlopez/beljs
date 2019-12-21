
const bel = require('..');
const top = require('../lib/top');

exports['execute function definition and apply it'] = function (test) {
    test.equal(bel.execute('(def add (x y) (+ x y)) (add 1 41)'), 42);
};

exports['execute set from inner context'] = function (test) {
    test.equal(bel.execute('(def setanswer (x) (set answer x)) (setanswer 42)', top), 42);
    test.equal(top.get('answer'), 42);    
};

exports['execute function defined in another function'] = function (test) {
    test.equal(bel.execute('(def defadd (x) (def add (y) (+ x y))) (defadd 2) (add 40)', top), 42);
};

