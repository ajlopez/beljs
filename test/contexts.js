
const contexts = require('../lib/contexts');

exports['get unknown variable'] = function (test) {
    const context = contexts.context();
    
    test.strictEqual(context.get('foo'), null);
};

exports['set and get variable'] = function (test) {
    const context = contexts.context();
    
    context.set('answer', 42);
    
    test.equal(context.get('answer'), 42);
};

exports['set variable in parent and get variable in child context'] = function (test) {
    const parent = contexts.context();
    const context = contexts.context(parent);
    
    parent.set('answer', 42);
    
    test.equal(context.get('answer'), 42);
};

