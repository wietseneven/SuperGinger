import THREELib from "three-js";
const THREE = THREELib();

class Camera {
  constructor(scene) {
    this.theta = 0;
    this._scene = scene;
    this._camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
  }

  get camera() {
    return this._camera;
  }

  update() {
    var radius = 100;
    this.theta += 0.5;

    this._camera.position.x = radius * Math.sin(THREE.Math.degToRad(this.theta));
    this._camera.position.y = 30;
    this._camera.position.z = radius * Math.cos(THREE.Math.degToRad(this.theta));
    this._camera.lookAt(this._scene.position);

    this._camera.updateMatrixWorld();
  }
}

export default Camera;