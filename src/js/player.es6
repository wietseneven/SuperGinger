class Player {
  constructor(THREE, Physijs, scene, camera) {
    this._THREE = THREE;
    this._Physijs = Physijs;
    this._scene = scene;
    this._camera = camera;

    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false
    };

    this.watchKeys();
  }

  create(winningPoint) {
    const THREE = this._THREE;
    const Physijs = this._Physijs;

    this.winningPoint = {
      x: winningPoint.x * 20,
      y: winningPoint.y * 5,
      z: winningPoint.z * 20
    };

    var geometry = new THREE.SphereBufferGeometry(6, 32, 32);
    var material = Physijs.createMaterial(
      new THREE.MeshPhongMaterial({
        color: 0xff0000,
        shininess: 100.0,
        emissive: 0x111111,
        specular: 0xbbbbbb
      }),
      // new THREE.MeshLambertMaterial({ color: 0xff0000 }),
      9.9,
      1.5
    );
    this.player = new Physijs.SphereMesh(
      geometry,
      material,
      1000);
    // this.player.receiveShadow = true;
    this.player.castShadow = true;
    this.player.position.y = 40;

    this._scene.add(this.player);
  }

  watchKeys() {
    window.onkeydown = ((e) => {
      if (e.which == 38) this.keys.up = true;
      if (e.which == 40) this.keys.down = true;
      if (e.which == 37) this.keys.left = true;
      if (e.which == 39) this.keys.right = true;
      if (e.which == 32) this.keys.space = true;
    });

    window.onkeyup = ((e) => {
      if (e.which == 38) this.keys.up = false;
      if (e.which == 40) this.keys.down = false;
      if (e.which == 37) this.keys.left = false;
      if (e.which == 39) this.keys.right = false;
      if (e.which == 32) this.keys.space = false;
    });
  }

  get playerObject() {
    return this.player;
  }

  _doMove() {
    const k = this.keys,
          speed = 80;

    let xVel = 0, yVel = -40, zVel = 0;

    if (k.right) xVel =  speed;
    if (k.left)  xVel = -speed;
    if (k.up)    zVel = -speed;
    if (k.down)  zVel =  speed;
    if (k.space) yVel =  speed;

    this.player.setLinearVelocity({z: zVel, y: yVel, x: xVel });
  }

  _checkWin() {
    const p = this.player;
    if (p.position.x > this.winningPoint.x - 10 &&
      p.position.x < this.winningPoint.x + 10 &&
      p.position.y > this.winningPoint.y - 10 &&
      p.position.y < this.winningPoint.y + 10 &&
      p.position.z > this.winningPoint.z - 10 &&
      p.position.z < this.winningPoint.z + 10) {
      return true;
    }
    // console.log(this.winningPoint);
  }

  _checkDead() {
    if (this.player.position.y < 0) return true;
  }

  _die() {
    const p = this.player;
    p.__dirtyPosition = true;
    p.position.x = 0;
    p.position.y = 40;
    p.position.z = 0;
  }

  _won() {
    // console.log('You did it!');
  }

  update() {

    if (this.player) {
      if (this._checkDead()) this._die();
      if (this._checkWin()) {
        this._won();
      } else {
        this._doMove();
      }
      this._camera.lookAt(this.player.position);
    }

  }
}

export default Player;