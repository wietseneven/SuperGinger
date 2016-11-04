class Scene {
  constructor(THREE, Physijs) {
    this.scene = new Physijs.Scene();
    this.light = new THREE.DirectionalLight( 0xffffff, 1 );
    this.light.position.set( -1, 1, -1 ).normalize();
    this.light.castShadow = true;

    this.scene.setGravity(new THREE.Vector3( 0, -60, 0 ));
    this.scene.add( this.light );
    return this.scene;
  }
}

export default Scene;