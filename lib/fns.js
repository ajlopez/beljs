
const contexts = require('./contexts');
const evaluate = require('./evaluate');

function Fn(names, body, context) {
    const argnames = [];
    
    while (names != null) {
        argnames.push(names.head().name());
        names = names.tail();
    }
    
    const nargnames = argnames.length;
    
    this.evaluate = function (args) { 
        const newcontext = contexts.context(context);
        
        for (let k = 0; k < nargnames; k++)
            newcontext.set(argnames[k], args[k++]);
        
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

