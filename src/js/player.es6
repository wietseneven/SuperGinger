import THREELib from "three-js";
const THREE = THREELib();

class Player {
  constructor(scene) {
    var geometry = new THREE.SphereBufferGeometry(5, 32, 32);
    var material = new THREE.MeshBasicMaterial({color: 0xC00D0D});
    this.player = new THREE.Mesh(geometry, material);
    this.player.position.y = 20;
    scene.add(this.player);
    // scene.add(object);

    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false
    };

    this.watchKeys();
  }

  watchKeys() {
    window.onkeydown = ((e) => {
      if (e.which == 38) this.keys.up = true;
      if (e.which == 40) this.keys.down = true;
      if (e.which == 37) this.keys.left = true;
      if (e.which == 39) this.keys.right = true;
    });

    window.onkeyup = ((e) => {
      if (e.which == 38) this.keys.up = false;
      if (e.which == 40) this.keys.down = false;
      if (e.which == 37) this.keys.left = false;
      if (e.which == 39) this.keys.right = false;
    });
  }

  get playerObject() {
    return this.player;
  }

  update() {
    if (this.keys.right) {
      this.player.position.x++;
    }

    if (this.keys.left) {
      this.player.position.x--;
    }

    if (this.keys.up) {
      this.player.position.y++;
    }

    if (this.keys.down) {
      this.player.position.y--;
    }
  }
}

export default Player;