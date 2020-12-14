// 监测玩家的动作
// import {jQuery} from "../vector/jquery/3.5.1/jquery.js"
// var jQuery = require("jquery")(window);

export class Motions {
  constructor(worldElem) {
    // 先绑定一下this
    this.onkeydown = this.onkeydown.bind(this);
    this.onkeyup = this.onkeyup.bind(this);
    this.onmousemove = this.onmousemove.bind(this);
    this.onFullScreen = this.onFullScreen.bind(this);
    this.pointerLockChange = this.pointerLockChange.bind(this);
    this.pointerLockError = this.pointerLockError.bind(this);
    this.fullscreenChange = this.fullscreenChange.bind(this);
    this.enterFullScreen = this.enterFullScreen.bind(this);
    
    if (!worldElem) worldElem = $("#world");
    this.worldElem = worldElem;
    
    document.addEventListener("keydown", this.onkeydown);
    document.addEventListener("keyup", this.onkeyup);
    document.addEventListener("mousemove", this.onmousemove);

    document.addEventListener('fullscreenchange', this.fullscreenChange, false);
    document.addEventListener('mozfullscreenchange', this.fullscreenChange, false);
    document.addEventListener('webkitfullscreenchange', this.fullscreenChange, false);

    document.addEventListener('pointerlockchange', this.pointerLockChange, false);
    document.addEventListener('mozpointerlockchange', this.pointerLockChange, false);
    document.addEventListener('webkitpointerlockchange', this.pointerLockChange, false);

    document.addEventListener('pointerlockerror', this.pointerLockError, false);
    document.addEventListener('mozpointerlockerror', this.pointerLockError, false);
    document.addEventListener('webkitpointerlockerror', this.pointerLockError, false);

    // 设置自己的事件供MOD调用
    this.eventListeners = {};
  }

  // 关于事件：
  // 'on'开头的函数调用事件。
  addEventListener(eventName, listener) {
    if (!eventName.startsWith('on')) {
      console.warn('Only admits events starting with "on".', eventName);
      return;
    }
    if (typeof listener !== "function") {
      console.warn('Listener should be "function".');
      return;
    }
    if (typeof this[eventName] !== "function") {
      console.warn('Unkown event', eventName, '.');
      return;
    }
    if (!this.eventListeners[eventName]) this.eventListeners[eventName] = [];
    this.eventListeners[eventName].push(listener)``;
  }

  pointerLockChange() {
    if (document.mozPointerLockElement === this.worldElem ||
      document.webkitPointerLockElement === this.worldElem ||
      document.pointerLockElement === this.worldElem) {
      console.log("指针锁定成功了。");
      document.getElementById("logger2").innerText = "指针锁定成功了。";
    } else {
      console.log("指针锁定已丢失。", document.mozPointerLockElement, document.webkitPointerLockElement, document.pointerLockElement);
      document.getElementById("logger2").innerText = "指针锁定已丢失。";
    }
  }

  pointerLockError() {
    console.log("锁定指针时出错。");
  }

  fullscreenChange() {
    if (document.webkitFullscreenElement === this.worldElem ||
      document.mozFullscreenElement === this.worldElem ||
      document.mozFullScreenElement === this.worldElem) { // 较旧的 API 大写 'S'.
      // 元素进入全屏模式了，现在我们可以请求指针锁定。
      this.worldElem.requestPointerLock = this.worldElem.requestPointerLock ||
        this.worldElem.mozRequestPointerLock ||
        this.worldElem.webkitRequestPointerLock;
      this.worldElem.requestPointerLock();

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

  onkeydown(event) {
    console.log('down', event);
  }

  onkeyup(event) {
    console.log('up', event)
  }

  onmousemove(event) {
    let movementX = event.movementX ||
      event.mozMovementX ||
      event.webkitMovementX ||
      0;
    let movementY = event.movementY ||
      event.mozMovementY ||
      event.webkitMovementY ||
      0;
  }

  onFullScreen() {

  }

  on_mouse
};
