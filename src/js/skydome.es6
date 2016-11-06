class Skydome {
  constructor(THREE, scene) {
    var skyGeo = new THREE.SphereGeometry(2000, 25, 25);

    const textureLoader = new THREE.TextureLoader();
    var material = new THREE.MeshLambertMaterial({map: textureLoader.load("images/skydome.jpg")});
    var sky = new THREE.Mesh(skyGeo, material);
    sky.material.side = THREE.BackSide;
    sky.position.x = 100;
    sky.rotation.y = 3.1415926536;
    scene.add(sky);
  }
}

export default Skydome;