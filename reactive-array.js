ReactiveArray = function (arr) {
  this._data = [];
  this._keyDeps = {};
  this._arrayDep = new Tracker.Dependency;

  arr = arr || [];
  this.set('length', arr.length);
  for (var i in arr)
    this.set(i, arr[i]);
};

ReactiveArray.prototype.get = function (i) {
  this._ensureKey(i);
  this._keyDeps[i].depend();
  return this._data[i];
};

ReactiveArray.prototype.set = function (i, x) {
  this._ensureKey(i);

  var oldValue = this._data[i];
  var oldLength = this._data.length;

  this._data[i] = x;
  if (oldValue !== this._data[i]) {
    this._keyDeps[i].changed();
    this._arrayDep.changed();
  }

  if (oldLength !== this._data.length) {
    this._keyDeps.length.changed();
    this._arrayDep.changed();
  }
};

ReactiveArray.prototype.length = function () {
  this._keyDeps.length.depend();
  return this._data.length;
};

ReactiveArray.prototype.push = function (x) {
  this.set(this._data.length, x);
};

ReactiveArray.prototype.pop = function () {
  var r = this._data.pop();
  this._keyDeps.length.changed();
  this._arrayDep.changed();
  this._keyDeps[this._data.length].changed();
  delete this._keyDeps[this._data.length];
  return r;
};

ReactiveArray.prototype.toArray = function () {
  this._arrayDep.depend();
  var clone = [];
  for (var i in this._data) {
    clone.push(this._data[i]);
  }
  return clone;
};

ReactiveArray.prototype.toString = function () {
  this._arrayDep.depend();
  return this._data.toString();
};

ReactiveArray.prototype._ensureKey = function (key) {
  if (!(key in this._keyDeps))
    this._keyDeps[key] = new Tracker.Dependency;
};

