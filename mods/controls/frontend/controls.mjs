import ModBase from "../../base/frontend/base.mjs";
import * as THREE from "../../../frontend/www/vector/threejs/R123/three.module.js";
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
      this.onFullScreen, this.onMouseDown,
      this.onRender
    ]);
    this.trackStart = false;
    this.x = 0;
    this.y = 0;
    this.a = 0.3;
    this.sensitivity = 0.02;
    this.pressed = {
      w: false, s: false, a: false, d: false,
      shift: false, space: false
    }
  }

  onInit() { }

  onExit() { }

  onMouseMove(dx, dy) {
    if (!this.trackStart) return;
    this.x += dx / (Math.PI * 300);
    this.y += dy / (Math.PI * 300);
    if (this.y <= THREE.MathUtils.degToRad(0)) this.y = THREE.MathUtils.degToRad(0);
    if (this.y >= THREE.MathUtils.degToRad(180)) this.y = THREE.MathUtils.degToRad(180);
    // console.log(this.x, this.y);
    main.scene.cameraRoll.set(this.x, this.y);
    // main.scene.cameraRoll.set(dx, dy);
  }

  onMouseDown(e) {
    if (!this.trackStart) return;
    console.log(e);
  }

  onKeyDown(e) {
    if (e.code === 'KeyF') {
      if (!this.trackStart) $("#btn-enter").click();
    }
    if (!this.trackStart) return;
    console.log(e);
    if (e.code === 'KeyW') this.pressed.w = true;
    else if (e.code === 'KeyS') this.pressed.s = true;
    else if (e.code === 'KeyA') this.pressed.a = true;
    else if (e.code === 'KeyD') this.pressed.d = true;
    else if (e.code === 'Space') this.pressed.space = true;
    else if (e.key === 'Shift') this.pressed.shift = true;
    console.log(this.pressed);
  }

  onKeyUp(e) {
    if (!this.trackStart) return;
    // console.log(e);
    if (e.code === 'KeyW') this.pressed.w = false;
    else if (e.code === 'KeyS') this.pressed.s = false;
    else if (e.code === 'KeyA') this.pressed.a = false;
    else if (e.code === 'KeyD') this.pressed.d = false;
    else if (e.code === 'Space') this.pressed.space = false;
    else if (e.key === 'Shift') this.pressed.shift = false;
    console.log(this.pressed);
  }

  onFullScreen(flag) {
    this.trackStart = flag;
    this.x = 0;
    this.y = 0;
  }

  onRender() {
    if (!this.trackStart) return;
    // console.log('onRender', this.pressed);
    // if (this.pressed.w) main.scene.cameraPositionA.z -= Math.cos(this.x) * this.sensitivity,
    //   main.scene.cameraPositionA.x += Math.sin(this.x) * this.sensitivity;
    // if (this.pressed.s) main.scene.cameraPositionA.z += Math.cos(this.x) * this.sensitivity,
    //   main.scene.cameraPositionA.x -= Math.sin(this.x) * this.sensitivity;
    // if (this.pressed.d) main.scene.cameraPositionA.z -= Math.sin(this.x) * this.sensitivity,
    //   main.scene.cameraPositionA.x += Math.cos(this.x) * this.sensitivity;
    // if (this.pressed.a) main.scene.cameraPositionA.z += Math.sin(this.x) * this.sensitivity,
    //   main.scene.cameraPositionA.x -= Math.cos(this.x) * this.sensitivity;

    // if (this.pressed.d) main.scene.cameraPositionA.z -= Math.cos(this.x) * this.sensitivity,
    //   main.scene.cameraPositionA.x += Math.sin(this.x) * this.sensitivity;
    // if (this.pressed.a) main.scene.cameraPositionA.z += Math.cos(this.x) * this.sensitivity,
    //   main.scene.cameraPositionA.x -= Math.sin(this.x) * this.sensitivity;

    // if (this.pressed.s) main.scene.cameraPositionA.z -= Math.sin(this.x) * this.sensitivity,
    //   main.scene.cameraPositionA.x += Math.cos(this.x) * this.sensitivity;
    // if (this.pressed.w) main.scene.cameraPositionA.z += Math.sin(this.x) * this.sensitivity,
    //   main.scene.cameraPositionA.x -= Math.cos(this.x) * this.sensitivity;

    // if (this.pressed.a) main.scene.cameraPositionA.z -= Math.sin(this.x + Math.PI / 2) * this.sensitivity,
    //   main.scene.cameraPositionA.x += Math.cos(this.x + Math.PI / 2) * this.sensitivity;
    // if (this.pressed.d) main.scene.cameraPositionA.z += Math.sin(this.x + Math.PI / 2) * this.sensitivity,
    //   main.scene.cameraPositionA.x -= Math.cos(this.x + Math.PI / 2) * this.sensitivity;

    // if (this.pressed.space) main.scene.cameraPositionA.y += this.a * this.sensitivity;
    // if (this.pressed.shift) main.scene.cameraPositionA.y -= this.a * this.sensitivity;

    main.scene.actionCameraMove(this.pressed, this.a, this.sensitivity);

  }
};
