export default class {
  modName = 'Base';
  version = "0.0.1";
  dependence = {};

  constructor() {
    utils.binder(["importCheck"], this);
  }

  async import() {
    for (let modName in this.dependence) {
      let modDependence = this.dependence[modName];
      if (!modDependence || !modDependence.url) continue;
      let ModModule = await import(modDependence.url);
      let mod = null;
      if (typeof ModModule.default === "function")
        mod = await new ModModule.default();
      else mod = ModModule.default;
      if (!mod) {
        console.warn("Import error when importing", modDependence);
        continue;
      }
      window[modDependence.loadName] = mod;
      console.log('Imported', modDependence.loadName);
      main.mods.load(mod);
    }
    this.importCheck();
  }

  importCheck() {
    let res = (() => {
      if (!this.dependence) return;
      for (let modName in this.dependence) {
        let modDependence = this.dependence[modName];
        if (!modDependence) return "Dependence not found!";
        if (!window[modDependence.loadName]) return "Dependence did not load!";
        let mod = window[modDependence.loadName];
        if (!utils.versionCheck(modDependence.version, mod.version)) return `Version ${mod.version} does not meet ${modDependence.version}.`;
      }
    })();
    if (res) throw `Error when check import of ${this.modName}: ${res}`;
  }

  onInit() { }

  onExit() { }
};

// export const version = '0.0.1';