class EventBus {
  e: any = {}
  constructor() {

  }
  on(name: string, callback: Function, ctx?: any) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  }
  once(name: string, callback: Function, ctx?: any) {
    var self = this;
    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  }
  emit(name: string, ...args: any[]) {
    var data = args;
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  }
  off(name: string, callback?: Function) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }
    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
}

let eventEmit = new EventBus()

export { eventEmit, EventBus }
export default eventEmit