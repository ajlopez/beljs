
const contexts = require('./contexts');
const evaluate = require('./evaluate');

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

