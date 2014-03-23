
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  }
  else if (typeof exports === 'object') {
    module.exports = factory();
  }
  else {
    global.bind = factory();
  }
}(this, function() {

  function bind(fn, thisArg) {

    var slice, target, args, bound;

    // Shortcut to the slice Array method.
    slice = Array.prototype.slice;

    // The target (original) function, which will be bound.
    target = fn;

    // Use the native bind method if available.
    if ( Function.prototype.bind ) {
      return Function.prototype.bind.apply( target, slice.call(arguments, 1) );
    }

    // As well as function context, we can bind arguments, which come after
    // thisArg, hence we get all arguments after the first two.
    args = slice.call(arguments, 2);

    // Abort if not called on a function.
    if (typeof fn !== 'function') {
      throw new TypeError('bind must be called on a function');
    }

    // Create the bound function.
    bound = function() {

      // If we simply call bound(), then `fn` is the global object. This means
      // the original function should be called with the bound `fn` value and
      // arguments. Arguments we pass to bound() are appended to any original,
      // bound arguments.
      //
      // This is like target.call(thisArg, n boundArgs, n args)
      if ( !(fn instanceof bound) ) {
        return target.apply( thisArg, args.concat( slice.call(arguments) ) );
      }

      // Otherwise, we’re calling `new bound()` since `fn instanceof bound`.
      // In that case, `fn` should not be passed, but only the arguments. So:
      // we create an empty function of which the prototype is the target
      // function’s prototype.
      var Empty = function() {};
      Empty.prototype = target.prototype;

      // Then, we create a new instance of the empty function whose constructor
      // is `target` (which mimics `new target` without executing `target`’s
      // code).
      var self = new Empty();

      // (Clean up dangling references.)
      Empty.prototype = null;

      // We call the target function with the `fn` value of the instance, with
      // bound arguments and new arguments concatenated. This way, the
      // constructor (target) is executed on the instance.
      //
      // This is like target(n boundArgs, n args)
      var result = target.apply( self, args.concat( slice.call(arguments) ) );

      // Finally, return the result if it’s an object (the specs say `new xxx`
      // should return an object), otherwise return the instance (like we would
      // with `new target`).
      if ( Object(result) === result ) return result;
      return self;
    };

    // Return the bound function.
    return bound;
  }

  return bind;
}));
