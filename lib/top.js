
const contexts = require('./contexts');
const evaluate = require('./evaluate');
const fns = require('./fns');

const symbols = require('./symbols');
const lists = require('./lists');

const symbol = symbols.symbol('symbol');
const pair = symbols.symbol('pair');

const top = contexts.context();

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

function iffn(args, context) {
    for (let k = 0, l = args.length; k < l; k += 2)
        if (k == l - 1)
            return evaluate(args[k], context);
        else if (evaluate(args[k], context))
            return evaluate(args[k + 1], context);
        
    return null;
}

iffn.special = true;

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

function lit(args, context, form) {
    return form;
}

lit.special = true;

function apply(args, context) {
    if (!fns)
        fns = require('./fns');
    
    const fn = args[0];
    let fnargs = [];
    
    for (let k = 1, l = args.length; k < l; k++) {
        const arg = args[k];
        
        if (lists.isList(arg))
            fnargs = fnargs.concat(lists.expand(arg));
        else
            fnargs.push(arg);
    }

    // TODO unify code from Pair.evaluate
    if (fns.isFn(fn))
        return fn.evaluate(fnargs);
    
    return fn(fnargs, context);
}

function quote(args) {
    return args[0];
}

quote.special = true;

top.set('join', function (args) { return lists.pair(args[0], args[1]); });
top.set('car', function (args) { if (args[0] === null) return null; return args[0].head(); });
top.set('cdr', function (args) { if (args[0] === null) return null; return args[0].tail(); });
top.set('xar', function (args) { args[1].head(args[0]); return args[1]; });
top.set('xdr', function (args) { args[1].tail(args[0]); return args[1]; });
top.set('list', function (args) { return lists.list(args); });
top.set('quote', quote);
top.set('apply', apply);
top.set('lit', lit);

top.set('set', set);
top.set('dyn', dyn);
top.set('do', dofn);
top.set('apply', apply);
top.set('sym', sym);
top.set('nom', nom);
top.set('if', iffn);

top.set('+', plus);
top.set('-', minus);
top.set('*', multiply);
top.set('/', divide);


// TODO recognize chars, streams, numbers? boolean?
function type(args, context) {
    const arg = args[0];
    
    if (!lists)
        lists = require('./lists');
    
    if (lists.isList(arg))
        return pair;
    
    if (symbols.isSymbol(arg))
        return symbol;
    
    return null;
}

top.set('type', type);

function fn(args, context) {
    return fns.fn(args[0], args[1], context);
};

fn.special = true;
top.set('fn', fn);

function def(args, context) {
    const fn = fns.fn(args[1], args[2], context);
    
    context.setGlobal(args[0].name(), fn);
    
    return fn;
};

def.special = true;
top.set('def', def);


module.exports = top;

