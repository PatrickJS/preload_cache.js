export class PreloadCache {
  refs: Object = {};
  constructor() {

  }

  getRef(key: string) {
    let ref = this.refs[key];
    if (ref && ref.promise) {
      return ref.promise;
    }
  }

  setRef(ref: string) {
    var reject, resolve;
    var promise = new Promise(function(res, rej) {
      reject = rej;
      resolve = res;
    });
    var dfd = {
      reject: reject,
      resolve: resolve,
      promise: promise
    };
    return this.refs[ref] = dfd;
  }

  createRefs(...args: Array<string>) {
    args.forEach(ref => this.setRef(ref));
  }

  complete(key, value) {
    let ref = this.refs[key];
    if (ref && ref.resolve) {
      this.refs[key].resolve(value);
    }
  }

}
