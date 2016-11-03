import THREELib from "three-js";
const THREE = THREELib();

class Render {

  constructor(container, scene, camera, updateables) {
    this.container = container;
    this.updateables = updateables;

    // this.mouse = new THREE.Vector2();
    this.theta = 0;
    this.INTERSECTED = null;

    this._scene = scene;
    this._camera = camera;

    this.raycaster = new THREE.Raycaster();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0xf0f0f0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.sortObjects = false;

    this.container.appendChild(this.renderer.domElement);

    // document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    this.render = this.render.bind(this);
    // this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
  }
  render() {

    for (let updateable of this.updateables) {
      updateable.update();
    }

    // find intersections
    // this.raycaster.setFromCamera(this.mouse, this._camera);
    // var intersects = this.raycaster.intersectObjects(this._scene.children);
    // if (intersects.length > 0) {
    //   if (this.INTERSECTED != intersects[0].object) {
    //     if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
    //     this.INTERSECTED = intersects[0].object;
    //     this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
    //     this.INTERSECTED.material.emissive.setHex(0xff0000);
    //   }
    // } else {
    //   if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
    //   this.INTERSECTED = null;
    // }
    this.renderer.render(this._scene, this._camera);
  }

  // onDocumentMouseMove(event) {
  //   event.preventDefault();
  //   this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  //   this.mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
  // }
}

export default Render;