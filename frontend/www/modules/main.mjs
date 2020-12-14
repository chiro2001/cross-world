import { Motions } from "./motions.mjs"
import { World } from "./world.mjs"

export class Main {
  constructor() {
    this.motions = new Motions();
    this.world = new World($("#world"), 200, 200);
    // setTimeout(() => {
    //   this.world.setSize(300, 300);
    // }, 500);
    
  }
};
