class Terrain {

  constructor(THREE, Physijs, scene) {
    this._THREE = THREE;
    this._Physijs = Physijs;
    this._scene = scene;

    this.win = {x: 0, y: 0, z: 0};

    this.width = 20;
    this.height = 5;

    this.map = [];
    this.objects = [];
  }

  createLevel(levelData) {
    this.map = levelData;
    this._drawMap();
  }

  _drawMap() {
    const THREE = this._THREE;
    const scene = this._scene;
    const Physijs = this._Physijs;

    // Loader
    const groundMaterial = Physijs.createMaterial(
      new THREE.MeshPhongMaterial({
        color: 0x333333,
        shininess: 40,
        emissive: 0x111111,
        specular: 0xeeeeee
      })
    );
    const winningMaterial = Physijs.createMaterial(
      new THREE.MeshLambertMaterial({color: 0x1fcf16})
    );

    let x = 0, y = 0, z = 0, index = 0;
    const blockGeometry = new THREE.BoxBufferGeometry(this.width, this.height, this.width);

    // loop through grounds
    for (let layer of this.map) {
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

            this.objects.push(part);
            scene.add(part);
          }
          x += this.width;
          index++;
        }
        x = 0;
        z += this.width;
      }
      y += this.height * 2;
      z = 0;
    }
  }

  _clearMap() {
    const scene = this._scene;

    if (this.objects.length > 1) {
      for (let object of this.objects) {
        scene.remove(object);
      }
    }
    this.objects = [];
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