import ModBase from "../../base/frontend/base.mjs";
export default class extends ModBase {
  modName = 'Controls';
  version = "0.0.1";
  dependence = {};


  constructor() {
    super();
    utils.callInitAfterImport(this);
    utils.bindAllListeners(this, [
      this.onInit, this.onExit, this.onMouseMove,
      this.onKeyDown, this.onKeyUp,
      this.onFullScreen, this.onMouseDown
    ]);
    this.trackStart = false;
    this.x = 0;
    this.y = 0;
  }

  onInit() { }

  onExit() { }

  onMouseMove(dx, dy) {
    if (!this.trackStart) return;
    this.x += dx;
    this.y += dy;
    console.log(this.x, this.y);
  }

  onMouseDown(e) {
    if (!this.trackStart) return;
    console.log(e);
  }

  onKeyDown(e) {
    if (!this.trackStart) return;
    console.log(e);
  }

  onKeyUp(e) {
    if (!this.trackStart) return;
    console.log(e);
  }

  onFullScreen(flag) {
    this.trackStart = flag;
  }
};
