import * as THREE from '../vector/threejs/R123/three.module.js';

export class Scene {
  constructor(elem, width = window.innerHeight, height = window.innerHeight) {
    this.render = this.render.bind(this);
    this.startRender = this.startRender.bind(this);
    this.elem = elem;
    this.renderEnable = false;
    this.cameraRoll = new THREE.Vector2(0, 0);
    this.cameraPosition = new THREE.Vector3(0, 0, 0);
    this.cameraPositionA = new THREE.Vector3(0, 0, 0);
    this.cameraRollLength = 1;

    // 创建场景对象Scene
    this.scene = new THREE.Scene();

    // let geometry = new THREE.BoxGeometry(1, 1, 1);
    // let material = new THREE.MeshLambertMaterial({
    //   color: 0x0000ff
    // }); //材质对象Material
    // this.mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    this.mesh = new THREE.Mesh(
      new THREE.SphereBufferGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xFFFF00, wireframe: true })
    );
    this.mesh.position.set(0, 0, 0);
    this.scene.add(this.mesh); //网格模型添加到场景中
    this.mesh2 = new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.01, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x00FFFF, wireframe: false })
    );
    this.mesh2.position.set(0, 0, 0);
    this.scene.add(this.mesh2); //网格模型添加到场景中
    var axesHelper = new THREE.AxesHelper(50000);
    this.scene.add(axesHelper);
    //点光源
    let point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    this.scene.add(point); //点光源添加到场景中
    //环境光
    let ambient = new THREE.AmbientLight(0x444444);
    this.scene.add(ambient);


    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);//设置渲染区域尺寸
    // this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    this.renderer.setClearColor(0x0, 1); //设置背景颜色
    // $(this.elem).html(this.renderer.domElement);
    this.elem.appendChild(this.renderer.domElement);
    this.setSize(width, height);
    this.render();
  }

  setupCamera() {

  }

  setSize(width, height) {
    let k = width / height; //窗口宽高比
    //创建相机对象
    // this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    if (!this.camera)
      this.camera = new THREE.PerspectiveCamera(50, k, 0.01, 10000);
    else {
      this.camera.aspect = k;
      this.camera.updateProjectionMatrix();
    }
    this.renderer.setSize(width, height);
  }

  startRender() {
    this.renderEnable = true;
    this.render();
  }

  stopRender() {
    this.renderEnable = false;
  }

  getLookDirection() {
    return new THREE.Vector3().setFromSphericalCoords(1, -this.cameraRoll.y, -this.cameraRoll.x).add(this.camera.position);
  }

  actionCameraMove(pressed, a = 0.3, sensitivity = 0.02) {
    // let lookDirection = new THREE.Vector3().setFromSphericalCoords(1, -this.cameraRoll.y, -this.cameraRoll.x);
    let lookDirection = new THREE.Vector3().setFromSphericalCoords(1, -Math.PI / 2, -this.cameraRoll.x);
    let lookDirectionL = new THREE.Vector3().setFromSphericalCoords(1, -Math.PI / 2, -this.cameraRoll.x + Math.PI / 2);
    // console.log(lookDirection, lookDirectionL);
    lookDirection.setY(0);
    lookDirectionL.setY(0);
    // lookDirection.multiplyScalar(1 / (Math.sqrt(lookDirection.x * lookDirection.x + lookDirection.z * lookDirection.z) + 0.0000001));
    // lookDirectionL.multiplyScalar(1 / (Math.sqrt(lookDirectionL.x * lookDirectionL.x + lookDirectionL.z * lookDirectionL.z) + 0.0000001));
    if (pressed.space) this.cameraPositionA.y += a * sensitivity;
    if (pressed.shift) this.cameraPositionA.y -= a * sensitivity;
    // if (pressed.w) this.cameraPositionA.add(lookDirection.multiplyScalar(sensitivity));
    // if (pressed.s) this.cameraPositionA.add(lookDirection.multiplyScalar(-sensitivity));
    if (pressed.w) this.cameraPositionA.add(lookDirection.multiplyScalar(sensitivity));
    if (pressed.s) this.cameraPositionA.add(lookDirection.multiplyScalar(-sensitivity));
    if (pressed.a) this.cameraPositionA.add(lookDirectionL.multiplyScalar(sensitivity));
    if (pressed.d) this.cameraPositionA.add(lookDirectionL.multiplyScalar(-sensitivity));
  }

  render() {
    stats.begin();
    events.eventCall("onRender");
    this.renderer.render(this.scene, this.camera);//执行渲染操作

    // this.mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
    // this.camera.rotateZ(0.001);
    // this.camera.position.set(200, 500, this.pi); //设置相机位置
    // this.pi += this.dpi;
    // if (this.pi > 100 || this.pi < -100) this.dpi = -this.dpi;
    // this.camera.center();
    // let lookAtPosition = new THREE.Vector3(0, 0, 0).setScalar(this.camera.position);
    // lookAtPosition.z = lookAtPosition.z + this.cameraRollLength * Math.cos(this.cameraRoll.z);
    // lookAtPosition.y = lookAtPosition.y + this.cameraRollLength * Math.sin(this.cameraRoll.y);
    // this.camera.rotateX(-this.cameraRoll.y / 1000);
    // this.camera.rotateY(-this.cameraRoll.x / 1000);

    // this.cameraRoll.set(0, 0);
    // this.camera.rotation.y = -this.cameraRoll.x;

    // this.camera.up.set(this.cameraPosition.x, this.cameraPosition.y + 1, this.cameraPosition.z);

    // this.camera.rotation.y = -this.cameraRoll.x;
    // this.camera.rotation.x = -this.cameraRoll.y;
    // this.mesh2.position.set(
    //   -Math.cos(-this.cameraRoll.y) * Math.cos(-this.cameraRoll.x),
    //   -Math.sin(-this.cameraRoll.y),
    //   -Math.sin(-this.cameraRoll.x));
    this.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);

    let lookDirection = this.getLookDirection();
    this.mesh2.position.copy(lookDirection);
    // new THREE.Vector3().copy();
    this.camera.lookAt(lookDirection);

    // this.camera.lookAt(new THREE.Vector3().set(
    //   this.cameraPosition.x - Math.cos(-this.cameraRoll.y) * Math.cos(-this.cameraRoll.x),
    //   this.cameraPosition.y - Math.sin(-this.cameraRoll.y),
    //   this.cameraPosition.z - Math.sin(-this.cameraRoll.x)));
    // this.camera.up.set(this.cameraPosition.x, this.cameraPosition.y + 1, this.cameraPosition.z);
    // this.cameraPosition.x += this.cameraPositionA.x;
    // this.cameraPosition.y += this.cameraPositionA.y;
    // this.cameraPosition.z += this.cameraPositionA.z;
    this.cameraPosition.add(this.cameraPositionA);
    let da = 0.9;
    // if (this.cameraPositionA.x >= da) this.cameraPositionA.x -= da;
    // else if (this.cameraPositionA.x <= -da) this.cameraPositionA.x += da;
    // else if (this.cameraPositionA.x >= -da && this.cameraPositionA.x <= da) this.cameraPositionA.x = 0;
    // if (this.cameraPositionA.y >= da) this.cameraPositionA.y -= da;
    // else if (this.cameraPositionA.y <= -da) this.cameraPositionA.y += da;
    // else if (this.cameraPositionA.y >= -da && this.cameraPositionA.y <= da) this.cameraPositionA.y = 0;
    // if (this.cameraPositionA.z >= da) this.cameraPositionA.z -= da;
    // else if (this.cameraPositionA.z <= -da) this.cameraPositionA.z += da;
    // else if (this.cameraPositionA.z >= -da && this.cameraPositionA.z <= da) this.cameraPositionA.z = 0;

    this.cameraPositionA.multiplyScalar(da);
    if (this.renderEnable)
      // this.camera.lookAt(this.scene.position);
      // console.log(this.camera.position);
      requestAnimationFrame(this.render);//请求再次执行渲染函数render
    stats.end();
  }
};


/**
 * // 创建网格模型
    ///创建一个立方体几何对象Geometry
    let geometry = new THREE.BoxGeometry(100, 100, 100);
    let material = new THREE.MeshLambertMaterial({
      color: 0x0000ff
    }); //材质对象Material
    this.mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    this.scene.add(this.mesh); //网格模型添加到场景中
    var geometry2 = new THREE.SphereGeometry(60, 40, 50); //创建一个球体几何对象
    var material2 = new THREE.MeshLambertMaterial({
      color: 0x66ccff
    }); //材质对象Material
    this.mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象Mesh
    this.scene.add(this.mesh2); //网格模型添加到场景中

    //点光源
    let point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    this.scene.add(point); //点光源添加到场景中
    //环境光
    let ambient = new THREE.AmbientLight(0x444444);
    this.scene.add(ambient);
    // console.log(scene)
    // console.log(scene.children)
    this.camera = null;
    // let k = width / height; //窗口宽高比
    // let s = 500; //三维场景显示范围控制系数，系数越大，显示的范围越大
    // //创建相机对象
    // this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    // this.camera.position.set(200, 500, 200); //设置相机位置
    // this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);//设置渲染区域尺寸
    this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    // document.body.appendChild(this.renderer.domElement); //body元素中插入canvas对象
    $(this.elem).html(this.renderer.domElement);
    this.setSize(width, height);
    //执行渲染操作   指定场景、相机作为参数
    // renderer.render(scene, camera);
    // // 渲染函数
    // function render() {
    //   renderer.render(scene, camera);//执行渲染操作
    //   mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
    // }
    // //间隔20ms周期性调用函数fun,20ms也就是刷新频率是50FPS(1s/20ms)，每秒渲染50次
    // setInterval("render()", 20);
    this.pi = 0;
    this.dpi = 1;
 */