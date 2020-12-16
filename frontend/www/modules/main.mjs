import { Motions } from "./motions.mjs";
import { Scene } from "./scene.mjs";
import { Mods } from "./mods.mjs";
import { events } from "./events.mjs";

export class Main {
  constructor() {
    this.motions = new Motions();
    // this.scene = new Scene($("#world"), 200, 200);
    this.scene = new Scene(document.querySelector("#world"), 200, 200);
    this.mods = new Mods();
    utils.binder(['onFullScreen', 'onInit'], this);
    events.addEventListener("onFullScreen", this.onFullScreen);
    $("#btn-enter").click(() => {
      this.motions.enterFullScreen();
    });
    $("#btn-render-start").click(() => { this.scene.startRender(); });
    $("#btn-render-stop").click(() => { this.scene.stopRender(); });
    this.mods.fetch("/mods/entry/frontend/entry.mjs");

    events.addEventListener("onInit", this.onInit);
    events.addPromiseEventListener("onInit", () => {
      console.log('started onInit()');
    })
  }

  onInit() {
    this.scene.startRender();
  }

  onFullScreen(flag) {
    console.log('onFullScreen', flag);
    if (flag) {
      setTimeout(() => {
        this.scene.setSize($(this.scene.elem).width(), $(this.scene.elem).height());
        // console.log("done", this.motions.eventListeners);
      }, 300);
    } else {
      this.scene.setSize(200, 200);
    }
  }
};
