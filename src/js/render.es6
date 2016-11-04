import THREELib from "three-js";
const THREE = THREELib();

class Render {

  constructor(container, scene, camera, updateables) {
    this.container = container;
    this.updateables = updateables;

    // this.mouse = new THREE.Vector2();
    this.theta = 0;

    this._scene = scene;
    this._camera = camera;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0xf0f0f0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.sortObjects = false;

    // enable shadows
    this.renderer.shadowMap.enabled = true;

    this.container.appendChild(this.renderer.domElement);

    // document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    this.render = this.render.bind(this);
    // this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
  }
  render() {

    for (let updateable of this.updateables) {
      updateable.update();
    }

    this._scene.simulate();
    this.renderer.render(this._scene, this._camera);
  }

}

export default Render;