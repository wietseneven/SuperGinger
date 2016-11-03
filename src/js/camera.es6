import THREELib from "three-js";
const THREE = THREELib();

class Camera {
  constructor() {
    return new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
  }
}

export default Camera;