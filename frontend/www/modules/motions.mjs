// 监测玩家的动作
import { events } from "./events.mjs";

export class Motions {
  constructor(worldElem) {
    utils.binder([
      'onKeyDown', 'onKeyUp', 'onMouseMove', 'onFullScreen', 'pointerLockChange',
      'pointerLockError', 'fullscreenChange', 'enterFullScreen', 'onMouseDown',
      'onTouchMove', 'onTouchStart', 'onTouchEnd'
    ], this);

    if (!worldElem) worldElem = document.querySelector("#world");
    this.worldElem = worldElem;

    this.stateFullScreen = false;
    this.statePointLock = false;

    this.pressedKeys = {};
    this.lastTouches = undefined;

    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchstart', this.onTouchStart);
    document.addEventListener('touchend', this.onTouchEnd);
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

  onTouchStart(event) {
    events.eventCall("onTouchStart", [event]);
  }

  onTouchMove(event) {
    // event.preventDefault();
    function copyTouches(touches) {
      let copy = [];
      for (let t of touches) {
        let c = {};
        for (let n in t)
          if ((n.endsWith('X') || n.endsWith('Y')))
            c[n] = t[n];
        copy.push(c);
      }
      return copy;
    }
    let touchCopy = copyTouches(event.targetTouches);
    if (!this.lastTouches) this.lastTouches = touchCopy;
    if (this.lastTouches.length != touchCopy.length) {
      this.lastTouches = touchCopy;
      return;
    }
    // 深度拷贝
    let delta = copyTouches(event.targetTouches);
    // console.log("!", delta[0].pageX, delta[0].pageY);
    // console.log("?", this.lastTouches[0].pageX, this.lastTouches[0].pageY);
    for (let i = 0; i < delta.length; i++) {
      for (let name in delta[i]) {
        delta[i][name] -= this.lastTouches[i][name];
      }
    }
    console.log(delta.length, delta[0].pageX, delta[0].pageY);
    
    this.lastTouches = touchCopy;
    events.eventCall("onTouchMove", [delta]);
  }

  onTouchEnd(event) {
    this.lastTouches = undefined;
    events.eventCall("onTouchEnd", [event]);
  }

  onFullScreen() {
    events.eventCall("onFullScreen", [this.stateFullScreen]);
  }

  onPointerLock() {
    events.eventCall("onPointerLock", [this.statePointLock]);
  }
};
