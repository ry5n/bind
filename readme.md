# bind

Function binding utility; uses native Function.prototype.bind if available.

## Installation

Install by downloading source, or with [Bower](http://bower.io):

```
bower install --save ry5n/bind
```

The component is provided as a UMD package. Require it in your project using
AMD, Common JS or as a browser global at `window.bind`.


## API

 - [bind(fn, obj)](#bindobj-fn)
 - [bind(fn, obj, ...)](#bindobj-fn-)

<a name="bindobj-fn"></a>
### bind(fn, obj)

Should bind the function to the given object.

```js
var foo = { name: 'Foo' };

function getName() {
  return this.getName;
}

var fn = bind(getName, foo);
fn().should.equal('Foo');
```

<a name="bindobj-fn-"></a>
### bind(fn, obj, ...)

Should curry the remaining arguments.

```js
function add(a, b) {
  return a + b;
}

bind(add, null)(1, 2).should.equal(3);
bind(add, null, 1)(2).should.equal(3);
bind(add, null, 1, 2)().should.equal(3);
```


## License

MIT
