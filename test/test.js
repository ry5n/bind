
var bind = require('../index.js');

describe('bind(fn, obj)', function() {
  it('should bind the function to the given object', function() {
    var foo = { name: 'Foo' };

    function getName() { return this.name; }

    var fn = bind(getName, foo);
    fn().should.equal('Foo');
  });
});

describe('bind(fn, obj)', function() {
  it('should still bind when not using the native method', function() {
    var foo = { name: 'Foo' };

    function getName() { return this.name; }

    Function.prototype.bind = false;

    var fn = bind(getName, foo);
    fn().should.equal('Foo');
  });
});

describe('bind(fn, obj, ...)', function() {
  it('should curry the remaining arguments', function() {
    function add(a, b) { return a + b; }

    bind(add, null)(1, 2).should.equal(3);
    bind(add, null, 1)(2).should.equal(3);
    bind(add, null, 1, 2)().should.equal(3);

    Function.prototype.bind = false;

    bind(add, null)(1, 2).should.equal(3);
    bind(add, null, 1)(2).should.equal(3);
    bind(add, null, 1, 2)().should.equal(3);
  });

  it('should keep the arguments in order', function() {
    function add(a, b) { return a + b; }

    bind(add, null)('1', '2').should.equal('12');
    bind(add, null, '1')('2').should.equal('12');
    bind(add, null, '1', '2')().should.equal('12');

    Function.prototype.bind = false;

    bind(add, null)('1', '2').should.equal('12');
    bind(add, null, '1')('2').should.equal('12');
    bind(add, null, '1', '2')().should.equal('12');
  });
});
