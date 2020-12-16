import ModBase from "../../base/frontend/base.mjs";
class Entry extends ModBase {
  modName = 'Entry';
  version = "0.0.1";
  dependence = {
    Controls: {
      version: "^0.0.0",
      url: "../../controls/frontend/controls.mjs",
      loadName: "controls"
    }
  };


  constructor() {
    super();
    utils.callInitAfterImport(this);
    utils.bindAllListeners(this, [this.onInit, this.onExit]);
    
    this.x = 0;
    this.y = 0;
  }

  onInit() {
    console.log("Entry::onInit");
  }

  onExit() {
    console.log("Entry::onExit");
  }
};

export default new Entry();