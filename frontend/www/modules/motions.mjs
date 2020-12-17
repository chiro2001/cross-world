// 监测玩家的动作
import { events } from "./events.mjs";

export class Motions {
  constructor(worldElem) {
    utils.binder([
      'onKeyDown', 'onKeyUp', 'onMouseMove', 'onFullScreen', 'pointerLockChange', 
      'pointerLockError', 'fullscreenChange', 'enterFullScreen', 'onMouseDown'
    ], this);
    
    if (!worldElem) worldElem = document.querySelector("#world");
    this.worldElem = worldElem;

    this.stateFullScreen = false;
    this.statePointLock = false;

    this.pressedKeys = {};

    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
    document.addEventListener("mousemove", this.onMouseMove);
    $(document).mousedown(this.onMouseDown);

    utils.addEventsListener([
      'fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange'
    ], this.fullscreenChange);
    utils.addEventsListener([
      'pointerlockchange', 'mozpointerlockchange', 'webkitpointerlockchange'
    ], this.pointerLockChange);
    utils.addEventsListener([
      'pointerlockerror', 'mozpointerlockerror', 'webkitpointerlockerror'
    ], this.pointerLockError);
  }

  pointerLockChange() {
    if (document.mozPointerLockElement === this.worldElem ||
      document.webkitPointerLockElement === this.worldElem ||
      document.pointerLockElement === this.worldElem) {
      console.log("指针锁定成功了。");
      this.statePointLock = true;
    } else {
      console.log("指针锁定已丢失。");
      this.statePointLock = true;
    }
    this.onPointerLock();
  }

  pointerLockError() {
    console.log("锁定指针时出错。");
  }

  fullscreenChange() {
    if (document.webkitFullscreenElement === this.worldElem ||
      document.mozFullscreenElement === this.worldElem ||
      document.mozFullScreenElement === this.worldElem) { // 较旧的 API 大写 'S'.
      this.stateFullScreen = true;
      // 元素进入全屏模式了，现在我们可以请求指针锁定。
      this.worldElem.requestPointerLock = this.worldElem.requestPointerLock ||
        this.worldElem.mozRequestPointerLock ||
        this.worldElem.webkitRequestPointerLock;
      this.worldElem.requestPointerLock();
      this.onFullScreen();
    } else {
      this.stateFullScreen = false;
      this.onFullScreen();
    }
  }

  enterFullScreen() {
    this.worldElem.requestFullscreen = this.worldElem.requestFullscreen ||
      this.worldElem.mozRequestFullscreen ||
      this.worldElem.mozRequestFullScreen || // 较旧的 API 把 ‘S’ 大写
      this.worldElem.webkitRequestFullscreen;
    this.worldElem.requestFullscreen();
  }

  onKeyDown(event) {
    if (this.pressedKeys[event.code]) return;
    // console.log('down', event);
    this.pressedKeys[event.code] = event.code;
    events.eventCall("onKeyDown", [event]);
  }

  onKeyUp(event) {
    // console.log('up', event)
    if (this.pressedKeys[event.code]) delete this.pressedKeys[event.code];
    events.eventCall("onKeyUp", [event]);
  }

  onMouseMove(event) {
    let movementX = event.movementX ||
      event.mozMovementX ||
      event.webkitMovementX ||
      0;
    let movementY = event.movementY ||
      event.mozMovementY ||
      event.webkitMovementY ||
      0;
    events.eventCall("onMouseMove", [movementX, movementY]);
  }

  onMouseDown(event) {
    events.eventCall("onMouseDown", [event]);
  }

  onFullScreen() {
    events.eventCall("onFullScreen", [this.stateFullScreen]);
  }

  onPointerLock() {
    events.eventCall("onPointerLock", [this.statePointLock]);
  }
};
