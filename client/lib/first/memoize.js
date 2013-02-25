var GEN = GEN || {}; 


/**
 * Reference to the global context.  In most cases this will be 'window'.
 */
GEN.global = this;

/**
 * Gets a unique ID for an object. This mutates the object so that further
 * calls with the same object as a parameter returns the same value. The unique
 * ID is guaranteed to be unique across the current session amongst objects that
 * are passed into {@code getUid}. There is no guarantee that the ID is unique
 * or consistent across sessions. It is unsafe to generate unique ID for
 * function prototypes.
 *
 * @param {Object} obj The object to get the unique ID for.
 * @return {number} The unique ID for the object.
 */
GEN.getUid = function(obj) {
  // TODO(arv): Make the type stricter, do not accept null.

  // In Opera window.hasOwnProperty exists but always returns false so we avoid
  // using it. As a consequence the unique ID generated for BaseClass.prototype
  // and SubClass.prototype will be the same.
  return obj[GEN.UID_PROPERTY_] ||
      (obj[GEN.UID_PROPERTY_] = ++GEN.uidCounter_);
};


/**
 * Removes the unique ID from an object. This is useful if the object was
 * previously mutated using {@code GEN.getUid} in which case the mutation is
 * undone.
 * @param {Object} obj The object to remove the unique ID field from.
 */
GEN.removeUid = function(obj) {
  // TODO(arv): Make the type stricter, do not accept null.

  // DOM nodes in IE are not instance of Object and throws exception
  // for delete. Instead we try to use removeAttribute
  if ('removeAttribute' in obj) {
    obj.removeAttribute(GEN.UID_PROPERTY_);
  }
  /** @preserveTry */
  try {
    delete obj[GEN.UID_PROPERTY_];
  } catch (ex) {
  }
};


/**
 * Name for unique ID property. Initialized in a way to help avoid collisions
 * with other closure javascript on the same page.
 * @type {string}
 * @private
 */
GEN.UID_PROPERTY_ = 'closure_uid_' + ((Math.random() * 1e9) >>> 0);


/**
 * Counter for UID.
 * @type {number}
 * @private
 */
GEN.uidCounter_ = 0;

/**
 * Decorator around functions that caches the inner function's return values.
 * @param {Function} f The function to wrap. Its return value may only depend
 *     on its arguments and 'this' context. There may be further restrictions
 *     on the arguments depending on the capabilities of the serializer used.
 * @param {function(number, Object): string=} opt_serializer A function to
 *     serialize f's arguments. It must have the same signature as
 *     GEN.memoize.simpleSerializer. It defaults to that function.
 * @this {Object} The object whose function is being wrapped.
 * @return {!Function} The wrapped function.
 */
GEN.memoize = function(f, opt_serializer) {
  var functionUid = GEN.getUid(f);
  var serializer = opt_serializer || GEN.memoize.geoSerializer;

  return function() {
    if (GEN.memoize.ENABLE_MEMOIZE) {
      // In the strict mode, when this function is called as a global function,
      // the value of 'this' is undefined instead of a global object. See:
      // https://developer.mozilla.org/en/JavaScript/Strict_mode
      //var thisOrGlobal = this || GEN.global;
      var thisOrGlobal = GEN.global;
      // Maps the serialized list of args to the corresponding return value.
      var cache = thisOrGlobal[GEN.memoize.CACHE_PROPERTY_] ||
          (thisOrGlobal[GEN.memoize.CACHE_PROPERTY_] = {});
          
      var cache_use = thisOrGlobal[GEN.memoize.CACHE_USE_PROPERTY_] ||
          (thisOrGlobal[GEN.memoize.CACHE_USE_PROPERTY_] = {});
          
      var key = serializer(functionUid, arguments);
      cache_use[key] = GEN.memoize.USAGE_COUNTER;
      
      return cache.hasOwnProperty(key) ? cache[key] :
          (cache[key] = f.apply(this, arguments));
    } else {
      return f.apply(this, arguments);
    }
  };
};

GEN.memoize.USAGE_COUNTER = 0;
/**
 * @define {boolean} Flag to disable memoization in unit tests.
 */
GEN.memoize.ENABLE_MEMOIZE = true;


/**
 * Clears the memoization cache on the given object.
 * @param {Object} cacheOwner The owner of the cache. This is the {@code this}
 *     context of the memoized function.
 */
GEN.memoize.clearCache = function(cacheOwner) {
  cacheOwner[GEN.memoize.CACHE_PROPERTY_] = {};
  cacheOwner[GEN.memoize.CACHE_USE_PROPERTY_] = {};
};

GEN.memoize.clearUnused = function(period) {
	var thisOrGlobal = GEN.global;
  	
  _.each(_.keys(thisOrGlobal[GEN.memoize.CACHE_USE_PROPERTY_]), function(k){
  		if((thisOrGlobal[GEN.memoize.CACHE_USE_PROPERTY_][k] + period)  < GEN.memoize.USAGE_COUNTER){
  			delete thisOrGlobal[GEN.memoize.CACHE_USE_PROPERTY_][k];
  			delete thisOrGlobal[GEN.memoize.CACHE_PROPERTY_][k];
  		}
  });
};

GEN.memoize.dumpCache = function() {
	var thisOrGlobal = GEN.global;
  	console.log(thisOrGlobal[GEN.memoize.CACHE_PROPERTY_]);
  	console.log(thisOrGlobal[GEN.memoize.CACHE_USE_PROPERTY_]);
};

/**
 * Name of the property used by GEN.memoize as cache.
 * @type {string}
 * @private
 */
GEN.memoize.CACHE_PROPERTY_ = 'closure_memoize_cache_';
GEN.memoize.CACHE_USE_PROPERTY_ = 'closure_memoize_cache_use_';

/**
 * Simple and fast argument serializer function for GEN.memoize.
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
GEN.memoize.simpleSerializer = function(functionUid, args) {
  var context = [functionUid];
  for (var i = args.length - 1; i >= 0; --i) {
    context.push(typeof args[i], args[i]);
  }
  return context.join('\x0B');
};

GEN.memoize.uidSerializer = function(functionUid, args) {
  var context = [functionUid];
  for (var i = args.length - 1; i >= 0; --i) {
  	if(args[i] instanceof Object) {
  		 context.push('Object', GEN.getUid(args[i]));
  	} else {
    	context.push(typeof args[i], args[i]);
   	}
  }
  return context.join('\x0B');
};

//Serialize assuming one "config" object argument, parse second level objects according to UID
GEN.memoize.geoSerializer = function(functionUid, args) {
  //console.log(ddd[0]);
  var context = [functionUid];
  args = _.values(args[0]);
  //console.log(args);
  for (var i = args.length - 1; i >= 0; --i) {
  	if(args[i] instanceof Object) {
  		 context.push('Object', GEN.getUid(args[i]));
  	} else {
    	context.push(typeof args[i], args[i]);
   	}
  }
  return context.join('\x0B');
};

