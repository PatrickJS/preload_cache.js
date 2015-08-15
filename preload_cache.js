var PreloadCache = (function () {
    function PreloadCache() {
        this.refs = {};
    }
    PreloadCache.prototype.getRef = function (key) {
        var ref = this.refs[key];
        if (ref && ref.promise) {
            return ref.promise;
        }
    };
    PreloadCache.prototype.setRef = function (ref) {
        var reject, resolve;
        var promise = new Promise(function (res, rej) {
            reject = rej;
            resolve = res;
        });
        var dfd = {
            reject: reject,
            resolve: resolve,
            promise: promise
        };
        return this.refs[ref] = dfd;
    };
    PreloadCache.prototype.createRefs = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        args.forEach(function (ref) { return _this.setRef(ref); });
    };
    PreloadCache.prototype.complete = function (key, value) {
        var ref = this.refs[key];
        if (ref && ref.resolve) {
            this.refs[key].resolve(value);
        }
    };
    return PreloadCache;
})();
exports.PreloadCache = PreloadCache;
//# sourceMappingURL=preload_cache.js.map