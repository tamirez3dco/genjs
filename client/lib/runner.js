GEN.Runner = {};

GEN.Runner.init = function () {
    GEN.Geometry.initGlobal();
    GEN.memoize.USAGE_COUNTER = 0;
    Function.prototype.myCall = function() {
        var params = [];
        var argsArray = Array.prototype.slice.call(arguments);
        var tokenIndex = argsArray[0];
        for(var i=1; i<argsArray.length; i++) {
            params.push('argsArray['+i+']');
        }
        params = params.join(',');
        var callStr = 'this('+params+');';
        var res = eval(callStr);

        if (_.isUndefined(GEN.Runner.tracedTokens[tokenIndex])) {
            GEN.Runner.tracedTokens[tokenIndex] = [res];
        } else {
            GEN.Runner.tracedTokens[tokenIndex].push(res);
        }

        return res;
    }
};

GEN.Runner.run = function (code, tokens) {
    console.log('GEN.Runner.run');
    GEN.Runner.tracedTokens = {};
    var wrappedCode = GEN.Runner.wrap(tokens);
    console.log(wrappedCode);

    try {
        var fn = new Function(wrappedCode);
        fn();
    } catch(err) {
        console.log(err);
    }
    console.log(GEN.Runner.tracedTokens);

    var renderableTokens = GEN.Runner.encodeRenderables(GEN.Runner.tracedTokens);

    if (GEN.Geometry.MEMOIZE) {
        GEN.memoize.clearUnused(5);
        GEN.memoize.USAGE_COUNTER += 1;
    }
    return renderableTokens;
};

GEN.Runner.wrap = function(tokens) {
    var wrappedCode="";

    var index=0;
    while(index<tokens.length){
        var token=tokens[index];
        if(token.type=='function.invocation'){
            var wrappedFuncName = token.value + '.myCall('+index+',';
            wrappedCode += wrappedFuncName;
            index+=2;
        } else {
            wrappedCode += token.value;
            index+=1;
        }
    }

    return wrappedCode;
};


GEN.Runner.encodeRenderables = function (blocks) {
    var blocksIds = _.keys(blocks);
    var renderableBlocks = {};

    _.each(blocksIds, function (id) {
        renderableBlocks[id] = [];
        var values = blocks[id];
        if (_.isArray(values) && values.length == 1 && _.isArray(values[0])) {
            values = values[0];
        }
        _.each(values, function (val) {
            if (val == null)
                return;
            if (val.toRenderable) {
                var geometry = val.toRenderable();
                var encoded = geometry.encode(5, val.RENDER_TYPE);
                renderableBlocks[id].push(encoded);
            }
        });
    });
    return renderableBlocks;
};
