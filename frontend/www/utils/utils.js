var utils = {
  binder(fNames, self) {
    if (!fNames || !self) return;
    for (let f of fNames) {
      if (!self[f]) continue;
      self[f] = self[f].bind(self);
    }
  },

  bindAllListeners(self, listeners) {
    if (!self || !listeners) return;
    if (!self.eventListeners) self.eventListeners = [];
    for (let f of listeners) {
      if (typeof f != "function") continue;
      let fName = utils.getFunctionName(f);
      self[fName] = self[fName].bind(self);
      self.eventListeners.push(self[fName]);
      // console.log('binded', fName);
    }
  },

  addEventsListener(eventNames, listener) {
    for (let e of eventNames)
      document.addEventListener(e, listener, false);
  },

  versionCheck(target, current) {
    // 不存在就直接返回正确
    if (typeof target === "undefined" && typeof current === "undefined") return true;
    // 如果不是按照字符串比较就直接比较
    if (!(typeof target === "string" && typeof current === "string")) return current >= target;
    if (target[0] === '^') return current >= target.slice(1);
    else if (target[0] === '@') return current === target.slice(1);
    // 默认使用完全匹配版本
    else return current === target;
  },

  callInitAfterImport(self) {
    // console.log('events.startPromiseEvent("onInit")');
    events.startPromiseEvent("onInit");
    self.import().then(() => {
      // console.log('events.finishPromiseEvent("onInit")');
      events.finishPromiseEvent("onInit");
    }).catch(err => console.error(err));
  },

  getFunctionName(f) {
    try {
      return f.name.split(' ').pop() || f.toString().match(/function\s*([^(]*)\(/)[1];
    } catch (err) { return; }
  }
};
if (!window['utils']) window['utils'] = utils;