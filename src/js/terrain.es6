import THREELib from "three-js";
const THREE = THREELib();

class terrain {

  constructor(scene) {
    var geometry = new THREE.BoxBufferGeometry(300, 20, 20);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0x61e32e}));
    object.position.x = 0;
    object.position.y = 0;
    scene.add(object);

    // for (var i = 0; i < 200; i++) {
    //   var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff}));
    //   object.position.x = Math.random() * 800 - 400;
    //   object.position.y = Math.random() * 800 - 400;
    //   object.position.z = Math.random() * 800 - 400;
    //   object.rotation.x = Math.random() * 2 * Math.PI;
    //   object.rotation.y = Math.random() * 2 * Math.PI;
    //   object.rotation.z = Math.random() * 2 * Math.PI;
    //   object.scale.x = Math.random() + 0.5;
    //   object.scale.y = Math.random() + 0.5;
    //   object.scale.z = Math.random() + 0.5;
    //   scene.add(object);
    // }
  }
}

export default terrain;