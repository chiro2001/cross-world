// import { events } from "./events.mjs";
import { events } from "./events.mjs";
import ModBase from "/mods/base/frontend/base.mjs";

export class Mods {
  constructor() {
    utils.binder(['find', 'load', 'unload', 'loadModEventListeners'], this);

    this.loaded = {};
  }

  find(modName) {
    for (let n in this.loaded)
      if (modName === this.loaded[n].modName) return this.loaded[n];
    return undefined;
  }

  // 检测Mod格式
  checkMod(mod) {
    if (!(mod instanceof ModBase)) {
      // console.error("Err Mod format! (Not ModBase.)");
      return false;
    }
    return true;
  }

  loadModEventListeners(mod) {
    for (let listener of mod.eventListeners) {
      let functionName = utils.getFunctionName(listener);
      if (!functionName) continue;
      events.addEventListener(functionName, listener);
      // console.log(`EventAdd: ${mod.modName}::${functionName}`);
    }
  }

  load(mod) {
    // 检查是否是新版本
    let exist = this.find(mod.modName);
    if (exist) {
      // TODO: 替换前需要做检查...检查合法性
      if (utils.versionCheck('^' + exist.version, mod.version)) {
        console.warn(`Mod ${mod.modName}'s version(${mod.version}) is lower than now(${exist.version})! Aborting load.`);
        return;
      }
      // 先卸载
      this.unload(mod.modName);
    }
    if (!this.checkMod(mod)) throw `Error Mod format: ${mod.modName}`;
    // 装载各种东西
    if (!mod.eventListeners) mod.eventListeners = utils.getAllListeners(mod);
    // console.log('mod.eventListeners', mod.eventListeners);
    this.loaded[mod.modName] = mod;
    // 装载事件
    this.loadModEventListeners(mod);
    console.log('MOD loaded:', mod.modName);
    return mod;
  }

  unload(modName) {
    if (!this.find(modName)) return;
    // TODO: 逐一卸载各种东西。
    delete this.loaded[modName];
  }

  async fetch(url) {
    const ModModule = await import(url);
    let mod = null;
    if (typeof ModModule.default === "function")
      mod = await new ModModule.default();
    else mod = ModModule.default;
    console.log('MOD fetched:', mod.modName);
    if (!this.load(mod)) return;
    return mod;
  }
};