/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/ban-types */
class EventBus {
    e: any = {}
    constructor() {
  
    }
    on(name: string, callback: Function, ctx?: any) {
      const e = this.e || (this.e = {});
  
      (e[name] || (e[name] = [])).push({
        fn: callback,
        ctx: ctx
      });
  
      return this;
    }
    once(name: string, callback: Function, ctx?: any) {
      const self = this;
      function listener() {
        self.off(name, listener);
        callback.apply(ctx, arguments);
      }
  
      listener._ = callback
      return this.on(name, listener, ctx);
    }
    emit(name: string, ...args: any[]) {
      const data = args;
      const evtArr = ((this.e || (this.e = {}))[name] || []).slice();
      let i = 0;
      const len = evtArr.length;
  
      for (i; i < len; i++) {
        evtArr[i].fn.apply(evtArr[i].ctx, data);
      }
  
      return this;
    }
    off(name: string, callback?: Function) {
      const e = this.e || (this.e = {});
      const evts = e[name];
      const liveEvents = [];
  
      if (evts && callback) {
        for (let i = 0, len = evts.length; i < len; i++) {
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
  
 
  
  export {EventBus}
  export default EventBus