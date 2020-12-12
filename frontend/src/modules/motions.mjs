// 监测玩家的动作
import $ from "jquery"

export default class {
  constructor() {
    // 先绑定一下this
    this.on_key_down = this.on_key_down.bind(this);
    $(document).keydown(this.on_key_down);
  }

  on_key_down(event) {
    console.log(event);
  }
};
