const contexts = require('./contexts');
const top = require('./top');
const symbols = require('./symbols');
let fns; // lazy required

function sym(args, context) {
    return symbols.symbol(args[0]);
}

function nom(args, context) {
    return args[0].name();
}

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

function dyn(args, context) {
    const name = args[0].name();
    const value = evaluate(args[1], context);
    const newcontext = contexts.context(context);
    
    newcontext.set(name, value);
    
    return evaluate(args[2], newcontext);
}

dyn.special = true;

function apply(args, context) {
    if (!fns)
        fns = require('./fns');
    
    const fn = args[0];
    let fnargs = [];
    
    for (let k = 1, l = args.length; k < l; k++) {
        const arg = args[k];
        
        if (Array.isArray(arg))
            fnargs = fnargs.concat(arg);
        else
            fnargs.push(arg);
    }

    // TODO unify code from Pair.evaluate
    if (fns.isFn(fn))
        return fn.evaluate(fnargs);
    
    return fn(fnargs, context);
}

top.set('set', set);
top.set('dyn', dyn);
top.set('do', dofn);
top.set('apply', apply);
top.set('sym', sym);
top.set('nom', nom);

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

function divide(args, context) {
    let result = 1;
    
    for (let k = 0, l = args.length; k < l; k++)
        if (k)
            result /= args[k];
        else
            result = args[k];
    
    return result;
}

top.set('+', plus);
top.set('-', minus);
top.set('*', multiply);
top.set('/', divide);

function evaluate(value, context) {
    if (!context)
        context = top;
    
    if (value && value.evaluate && typeof value.evaluate === 'function')
        return value.evaluate(context);
    
    return value;
}

module.exports = evaluate;

