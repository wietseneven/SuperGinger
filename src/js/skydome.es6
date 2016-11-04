class Skydome {
  constructor(THREE, scene) {
    var skyGeo = new THREE.SphereGeometry(2000, 25, 25);

    const textureLoader = new THREE.TextureLoader();
    var material = new THREE.MeshLambertMaterial({map: textureLoader.load("images/stage.jpg")});
    var sky = new THREE.Mesh(skyGeo, material);
    sky.material.side = THREE.BackSide;
    sky.position.x = 100;
    scene.add(sky);
  }
}

export default Skydome;