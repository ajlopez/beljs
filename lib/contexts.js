
function Context(parent) {
    const values = {};
    
    this.get = function (name) {
        const result = values[name];
        
        if (result === undefined)
            return parent ? parent.get(name) : null;
        else
            return result;
    }
    
    this.set = function (name, value) { values[name] = value; };
    
    this.setGlobal = function (name, value) {
        if (parent)
            parent.setGlobal(name, value);
        
        this.set(name, value);
    }
}

function createContext(parent) {
    return new Context(parent);
}

module.exports = {
    context: createContext
};

