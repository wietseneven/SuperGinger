import THREELib from "three-js";
const THREE = THREELib();

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.light = new THREE.DirectionalLight( 0xffffff, 1 );
    this.light.position.set( 1, 1, 1 ).normalize();
    this.scene.add( this.light );
    return this.scene;
  }
}

export default Scene;