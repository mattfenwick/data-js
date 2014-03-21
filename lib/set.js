'use strict';

var Dict = require('./dict.js').Dict;


function Set(elems) {
    var my_dict = this._dict = new Dict({});
    elems.map(function(e) {
        my_dict.set(e, 1);
    });
}

Set.prototype.has = function(key) {
    return this._dict.has(key);
};

Set.prototype.add = function(key) {
    this._dict.set(key, 1);
};

Set.prototype.remove = function(key) {
    this._dict.remove(key);
};

Set.prototype.size = function() {
    return this._dict.size();
};

Set.prototype.toArray = function() {
    return this._dict.toArray().map(function(pair) {return pair[0];});
};

Set.prototype.filter = function(predicate) {
    var new_keys = this._dict.keys().filter(predicate);
    return new Set(new_keys);
};

Set.prototype.toJSON = function() {
    return {'type': 'Set', 'elements': this.toArray()};
};


module.exports = {
    'Set':  Set
};

