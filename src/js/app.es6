import THREELib from "three-js";
const THREE = THREELib();

const Physijs = require('physijs-browserify')(THREE);
Physijs.scripts.worker = '/libs/physijs-browserify/libs/physi-worker.js';
Physijs.scripts.ammo = '/libs/physijs-browserify/libs/ammo.js';

import Scene from "./scene.es6";
import Camera from "./camera.es6";
import Menu from "./menu.es6";
import Terrain from "./terrain.es6";
import Skydome from "./skydome.es6";
import Player from "./player.es6";

import Render from "./render.es6";

import Api from "./api.es6";
import LevelSystem from "./levelsystem.es6";

class SuperGinger {
  constructor() {
    this.onWindowResize = this.onWindowResize.bind(this);
    this.animate = this.animate.bind(this);
  }

  init() {
    this.container = document.createElement('div');
    this.container.id = 'SuperGinger';
    document.body.appendChild(this.container);

    // setup default scene with camera and lighting
    this.scene = new Scene(THREE, Physijs);
    this.terrain = new Terrain(THREE, Physijs, this.scene);
    this.skydome = new Skydome(THREE, this.scene);
    this.camera = new Camera(this.scene);
    this.player = new Player(THREE, Physijs, this.scene, this.camera.camera);

    this.api = new Api();
    this.levelSystem = new LevelSystem(this.api, this.player, this.terrain);

    this.menu = new Menu(THREE, Physijs, this.scene, this.camera.camera, this.container, this.levelSystem);
    this.levelSystem._menu = this.menu;

    // the updatables are the components that should run an update
    const updatables = [
      this.menu,
      this.camera,
      this.player,
      this.levelSystem
    ];

    // setup renderer
    this.render = new Render(this.container, this.scene, this.camera.camera, updatables);

    // watch for resizes, to keep screen filled
    window.addEventListener('resize', this.onWindowResize, false);

    this.menu.setState('showing');
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