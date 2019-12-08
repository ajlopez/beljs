
const contexts = require('./contexts');
const evaluate = require('./evaluate');
const top = require('./top');

function fn(args, context) {
    return createFn(args[0], args[1], context);
};

fn.special = true;
top.set('fn', fn);

function def(args, context) {
    const fn = createFn(args[1], args[2], context);
    
    context.setGlobal(args[0].name(), fn);
    
    return fn;
};

def.special = true;
top.set('def', def);

function Fn(names, body, context) {
    this.evaluate = function (args) { 
        const newcontext = contexts.context(context);
        let as = names;
        let k = 0;
        
        while (as != null) {
            newcontext.set(as.head().name(), args[k++]);
            as = as.tail();
        }
        
        return evaluate(body, newcontext);
    };
}

function createFn(args, body, context) {
    return new Fn(args, body, context);
}

module.exports = {
    fn: createFn,
    isFn: function (value) { return value instanceof Fn; }
};

