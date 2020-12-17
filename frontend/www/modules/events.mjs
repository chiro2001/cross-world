// 事件系统

export class Events {
  constructor() {
    utils.binder([
      'addEventListener', 'removeEventListener', 'removeEventListenerAll',
      'listCall', 'eventCall', 'addPromiseEventListener',
      'startPromiseEvent', 'finishPromiseEvent'
    ], this);

    // 设置自己的事件供MOD调用
    this.eventListeners = {};
    this.promiseEvents = {};
  }

  // 关于事件：
  // 'on'开头的函数调用事件。
  addEventListener(eventName, listener) {
    if (!eventName.startsWith('on')) {
      console.warn('Only admits events starting with "on".', eventName);
      return false;
    }
    if (typeof listener != "function") {
      console.warn('Listener should be "function".');
      return false;
    }
    // if (typeof this[eventName] !== "function") {
    //   console.warn('Unkown event', eventName, '.');
    //   return;
    // }
    if (!this.eventListeners[eventName]) this.eventListeners[eventName] = [];
    this.eventListeners[eventName].push(listener);
    return true;
  }

  removeEventListener(eventName, listener) {
    if (!this.eventListeners[eventName]) return;
    for (let i = 0; i < this.eventListeners.length; i++) {
      // if (listener.toString() === this.eventListeners[eventName][i].toString())
      if (listener === this.eventListeners[eventName][i])
        // TODO: check it
        this.eventListeners[eventName].splice(i, 1);
      break;
    }
  }

  removeEventListenerAll(eventName) {
    if (!eventName) this.eventListeners = {};
    if (!this.eventListeners[eventName]) return;
    this.eventListeners[eventName] = [];
  }

  listCall(listFunction, args) {
    if (!listFunction) return;
    if (!args) args = [];
    for (let f of listFunction) {
      try {
        (function () {
          f(...args);
        })();
      } catch (err) { console.error(err); }
    }
  }

  eventCall(eventName, args) {
    if (!eventName) return;
    this.listCall(this.eventListeners[eventName], args);
  }

  addPromiseEventListener(eventName, listener) {
    if (!this.addEventListener(eventName, listener)) return;
    this.promiseEvents[eventName] = -1;
  }

  startPromiseEvent(eventName) {
    if (typeof this.promiseEvents[eventName] != "number") return false;
    if (this.promiseEvents[eventName] < 0) this.promiseEvents[eventName] = 0;
    this.promiseEvents[eventName]++;
  }

  finishPromiseEvent(eventName, args) {
    if (typeof this.promiseEvents[eventName] != "number") return false;
    this.promiseEvents[eventName]--;
    if (this.promiseEvents[eventName] <= 0) {
      delete this.promiseEvents[eventName];
      this.eventCall(eventName, args);
    }
  }
};


if (!events)
  var events = new Events();
window['events'] = events;
export { events };