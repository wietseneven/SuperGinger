import THREELib from "three-js";
const THREE = THREELib();

import Scene from "./scene.es6";
import Camera from "./camera.es6";
import Terrain from "./terrain.es6";
import Player from "./player.es6";

import Render from "./render.es6";

class SuperGinger {
  constructor() {
    this.onWindowResize = this.onWindowResize.bind(this);
    this.animate = this.animate.bind(this);
  }

  init() {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);

    // setup default scene with camera and lighting
    this.scene = new Scene();
    this.terrain = new Terrain(this.scene);
    this.player = new Player(this.scene);

    this.camera = new Camera(this.scene, this.player.playerObject());

    const updatables = [
      this.camera,
      this.player
    ];

    // setup renderer
    this.render = new Render(this.container, this.scene, this.camera.camera, updatables);

    // watch for resizes, to keep screen filled
    window.addEventListener('resize', this.onWindowResize, false);
  }

  onWindowResize() {
    this.camera.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.camera.updateProjectionMatrix();
    this.render.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.render.render();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let superGinger = new SuperGinger();
  superGinger.init();
  superGinger.animate();
});