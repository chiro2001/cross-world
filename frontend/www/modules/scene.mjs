import * as THREE from '../vector/threejs/R123/three.module.js';

export class Scene {
  constructor(elem, width = window.innerHeight, height = window.innerHeight) {
    this.render = this.render.bind(this);
    this.startRender = this.startRender.bind(this);
    this.elem = elem;
    this.renderEnable = false;

    // 创建场景对象Scene
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);//设置渲染区域尺寸
    this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    // $(this.elem).html(this.renderer.domElement);
    this.elem.appendChild(this.renderer.domElement);
    this.setSize(width, height);
    this.render();
  }
  
  setupCamera() {

  }

  setSize(width, height) {
    let k = width / height; //窗口宽高比
    let s = 500; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    // this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    this.camera = new THREE.PerspectiveCamera(50, k, 1, 10000);
    this.camera.position.set(200, 500, 200); //设置相机位置
    this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
    this.renderer.setSize(width, height);
  }

  startRender() {
    this.renderEnable = true;
    this.render();
  }

  stopRender() {
    this.renderEnable = false;
  }

  render() {
    stats.begin();
    this.renderer.render(this.scene, this.camera);//执行渲染操作
    // this.mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
    // this.camera.position.set(200, 500, this.pi); //设置相机位置
    // this.pi += this.dpi;
    // if (this.pi > 100 || this.pi < -100) this.dpi = -this.dpi;
    if (this.renderEnable)
      requestAnimationFrame(this.render);//请求再次执行渲染函数render
    stats.end();
  }
};


/**
 * // 创建网格模型
    //创建一个立方体几何对象Geometry
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