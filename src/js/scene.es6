class Scene {
  constructor(THREE, Physijs) {
    this.scene = new Physijs.Scene();
    this.light = new THREE.DirectionalLight( 0xffffff, 1 );
    this.light.position.set( -1, 1, -1 ).normalize();
    this.light.castShadow = true;
    this.light.shadow.mapSize.width = 1024;
    this.light.shadow.mapSize.height = 1024;
    this.light.shadow.camera.near = 250;
    this.light.shadow.camera.far = 750;
    this.light.shadow.camera.fov = 30;

    var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    light.position.set( 0.5, 1, 0.75 );
    this.scene.add( light );

    this.scene.setGravity(new THREE.Vector3( 0, -60, 0 ));
    this.scene.add( this.light );
    return this.scene;
  }
}

export default Scene;