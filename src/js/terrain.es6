class Terrain {

  constructor(THREE, Physijs, scene) {
    this._THREE = THREE;
    this._Physijs = Physijs;
    this._scene = scene;

    this.win = {x:0, y: 0, z: 0};

    this.width = 20;
    this.height = 5;

    this._drawMap();

  }

  _map() {
    return [
      [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [9, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    ];
  }

  _drawMap() {
    const THREE = this._THREE;
    const scene = this._scene;
    const Physijs = this._Physijs;

    // Loader
    const textureLoader = new THREE.TextureLoader();

    // Materials
    const groundMaterial = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({map: textureLoader.load('images/rocks.jpg')}),
      .8, // high friction
      .4 // low restitution
    );
    groundMaterial.map.wrapS = groundMaterial.map.wrapT = THREE.RepeatWrapping;
    groundMaterial.map.repeat.set(2.5, 2.5);

    const winningMaterial = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({color: 0x1fcf16})
    );

    let x = 0, y = 0, z = 0;
    const blockGeometry = new THREE.BoxBufferGeometry(this.width, this.height, this.width);

    // loop through grounds
    for (let layer of this._map()) {
      // loop through floors
      for (let row of layer) {
        // loop through rooms
        for (let block of row) {
          if (block) {

            // Different material for the winning block
            let material = groundMaterial;
            if (block == 9) {
              material = winningMaterial;

              // set win coords
              this.win.x = x;
              this.win.y = y;
              this.win.z = z;
            }

            const part = new Physijs.BoxMesh(
              blockGeometry,
              material,
              0);
            part.position.x = x;
            part.position.y = y;
            part.position.z = z;

            part.receiveShadow = true;
            part.castShadow = true;

            scene.add(part);
          }
          x += this.width;
        }
        x = 0;
        z += this.width;
      }
      y += this.height * 2;
      z = 0;
    }
  }

  get terrainObject() {
    return this.terrain;
  }

  get winningPoint() {
    return {
      x: this.win.x,
      y: this.win.y,
      z: this.win.z
    }
  }
}

export default Terrain;