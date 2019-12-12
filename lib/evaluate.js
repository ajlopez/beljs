const top = require('./top');

function dofn (args, context) {
    return args[args.length - 1];
}

function set(args, context) {
    let value;
    
    for (let k = 0, l = args.length; k < l; k += 2) {
        const name = args[k].name();
        value = evaluate(args[k + 1], context);
        context.setGlobal(name, value);
    }
    
    return value;
}

set.special = true;

top.set('set', set);
top.set('do', dofn);

function plus(args, context) {
    let result = 0;
    
    for (let k = 0, l = args.length; k < l; k++)
        result += args[k];
    
    return result;
}

function minus(args, context) {
    let result = 0;
    
    for (let k = 0, l = args.length; k < l; k++)
        if (k)
            result -= args[k];
        else
            result = args[k];
    
    return result;
}

function multiply(args, context) {
    let result = 1;
    
    for (let k = 0, l = args.length; k < l; k++)
        result *= args[k];
    
    return result;
}

top.set('+', plus);
top.set('-', minus);
top.set('*', multiply);

function evaluate(value, context) {
    if (!context)
        context = top;
    
    if (value && value.evaluate && typeof value.evaluate === 'function')
        return value.evaluate(context);
    
    return value;
}

module.exports = evaluate;

