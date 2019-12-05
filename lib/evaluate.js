const top = require('./top');

function set(args, context) {
    let value;
    
    for (let k = 0, l = args.length; k < l; k += 2) {
        const name = args[k].name();
        value = evaluate(args[k + 1], context);
        context.set(name, value);
    }
    
    return value;
}

set.special = true;

top.set('set', set);

function evaluate(value, context) {
    if (!context)
        context = top;
    
    if (value && value.evaluate && typeof value.evaluate === 'function')
        return value.evaluate(context);
    
    return value;
}

module.exports = evaluate;

