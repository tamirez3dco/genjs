/**
 * Decorator around functions that caches the inner function's return values.
 * @param {Function} f The function to wrap. Its return value may only depend
 *     on its arguments and 'this' context. There may be further restrictions
 *     on the arguments depending on the capabilities of the serializer used.
 * @param {function(number, Object): string=} opt_serializer A function to
 *     serialize f's arguments. It must have the same signature as
 *     goog.memoize.simpleSerializer. It defaults to that function.
 * @this {Object} The object whose function is being wrapped.
 * @return {!Function} The wrapped function.
 */
goog.memoize = function(f, opt_serializer) {
  var functionUid = goog.getUid(f);
  var serializer = opt_serializer || goog.memoize.geoSerializer;

  return function() {
    if (goog.memoize.ENABLE_MEMOIZE) {
      // In the strict mode, when this function is called as a global function,
      // the value of 'this' is undefined instead of a global object. See:
      // https://developer.mozilla.org/en/JavaScript/Strict_mode
      //var thisOrGlobal = this || goog.global;
      var thisOrGlobal = goog.global;
      // Maps the serialized list of args to the corresponding return value.
      var cache = thisOrGlobal[goog.memoize.CACHE_PROPERTY_] ||
          (thisOrGlobal[goog.memoize.CACHE_PROPERTY_] = {});
          
      var cache_use = thisOrGlobal[goog.memoize.CACHE_USE_PROPERTY_] ||
          (thisOrGlobal[goog.memoize.CACHE_USE_PROPERTY_] = {});
          
      var key = serializer(functionUid, arguments);
      cache_use[key] = goog.memoize.USAGE_COUNTER;
      
      return cache.hasOwnProperty(key) ? cache[key] :
          (cache[key] = f.apply(this, arguments));
    } else {
      return f.apply(this, arguments);
    }
  };
};

goog.memoize.USAGE_COUNTER = 0;
/**
 * @define {boolean} Flag to disable memoization in unit tests.
 */
goog.memoize.ENABLE_MEMOIZE = true;


/**
 * Clears the memoization cache on the given object.
 * @param {Object} cacheOwner The owner of the cache. This is the {@code this}
 *     context of the memoized function.
 */
goog.memoize.clearCache = function(cacheOwner) {
  cacheOwner[goog.memoize.CACHE_PROPERTY_] = {};
  cacheOwner[goog.memoize.CACHE_USE_PROPERTY_] = {};
};

goog.memoize.clearUnused = function(period) {
	var thisOrGlobal = goog.global;
  	
  _.each(_.keys(thisOrGlobal[goog.memoize.CACHE_USE_PROPERTY_]), function(k){
  		if((thisOrGlobal[goog.memoize.CACHE_USE_PROPERTY_][k] + period)  < goog.memoize.USAGE_COUNTER){
  			delete thisOrGlobal[goog.memoize.CACHE_USE_PROPERTY_][k];
  			delete thisOrGlobal[goog.memoize.CACHE_PROPERTY_][k];
  		}
  });
};

goog.memoize.dumpCache = function() {
	var thisOrGlobal = goog.global;
  	console.log(thisOrGlobal[goog.memoize.CACHE_PROPERTY_]);
  	console.log(thisOrGlobal[goog.memoize.CACHE_USE_PROPERTY_]);
};

/**
 * Name of the property used by goog.memoize as cache.
 * @type {string}
 * @private
 */
goog.memoize.CACHE_PROPERTY_ = 'closure_memoize_cache_';
goog.memoize.CACHE_USE_PROPERTY_ = 'closure_memoize_cache_use_';

/**
 * Simple and fast argument serializer function for goog.memoize.
 * Supports string, number, boolean, null and undefined arguments. Doesn't
 * support \x0B characters in the strings.
 * @param {number} functionUid Unique identifier of the function whose result
 *     is cached.
 * @param {Object} args The arguments that the function to memoize is called
 *     with. Note: it is an array-like object, because supports indexing and
 *     has the length property.
 * @return {string} The list of arguments with type information concatenated
 *     with the functionUid argument, serialized as \x0B-separated string.
 */
goog.memoize.simpleSerializer = function(functionUid, args) {
  var context = [functionUid];
  for (var i = args.length - 1; i >= 0; --i) {
    context.push(typeof args[i], args[i]);
  }
  return context.join('\x0B');
};

goog.memoize.uidSerializer = function(functionUid, args) {
  var context = [functionUid];
  for (var i = args.length - 1; i >= 0; --i) {
  	if(args[i] instanceof Object) {
  		 context.push('Object', goog.getUid(args[i]));
  	} else {
    	context.push(typeof args[i], args[i]);
   	}
  }
  return context.join('\x0B');
};

//Serialize assuming one "config" object argument, parse second level objects according to UID
goog.memoize.geoSerializer = function(functionUid, args) {
  //console.log(ddd[0]);
  var context = [functionUid];
  args = _.values(args[0]);
  //console.log(args);
  for (var i = args.length - 1; i >= 0; --i) {
  	if(args[i] instanceof Object) {
  		 context.push('Object', goog.getUid(args[i]));
  	} else {
    	context.push(typeof args[i], args[i]);
   	}
  }
  return context.join('\x0B');
};

