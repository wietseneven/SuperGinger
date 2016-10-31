import THREELib from "three-js";
const THREE = THREELib();

class Test {
  constructor() {
    this.mouse = new THREE.Vector2();
    this.theta = 0;
    this.INTERSECTED = null;

    this.onWindowResize = this.onWindowResize.bind(this);
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    this.animate = this.animate.bind(this);
  }

  init() {
    this.container = document.createElement( 'div' );
    document.body.appendChild( this.container );
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    this.scene = new THREE.Scene();
    this.light = new THREE.DirectionalLight( 0xffffff, 1 );
    this.light.position.set( 1, 1, 1 ).normalize();
    this.scene.add( this.light );
    var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
    for ( var i = 0; i < 2000; i ++ ) {
      var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
      object.position.x = Math.random() * 800 - 400;
      object.position.y = Math.random() * 800 - 400;
      object.position.z = Math.random() * 800 - 400;
      object.rotation.x = Math.random() * 2 * Math.PI;
      object.rotation.y = Math.random() * 2 * Math.PI;
      object.rotation.z = Math.random() * 2 * Math.PI;
      object.scale.x = Math.random() + 0.5;
      object.scale.y = Math.random() + 0.5;
      object.scale.z = Math.random() + 0.5;
      this.scene.add( object );
    }
    this.raycaster = new THREE.Raycaster();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor( 0xf0f0f0 );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.sortObjects = false;
    this.container.appendChild(this.renderer.domElement);
    document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
    //
    window.addEventListener( 'resize', this.onWindowResize, false );
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  onDocumentMouseMove( event ) {
    event.preventDefault();
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  animate() {
    requestAnimationFrame( this.animate );
    this.render();
  }

  render() {
    var radius = 100;
    this.theta += 0.1;
    this.camera.position.x = radius * Math.sin( THREE.Math.degToRad( this.theta ) );
    this.camera.position.y = radius * Math.sin( THREE.Math.degToRad( this.theta ) );
    this.camera.position.z = radius * Math.cos( THREE.Math.degToRad( this.theta ) );
    this.camera.lookAt( this.scene.position );
    this.camera.updateMatrixWorld();
    // find intersections
    this.raycaster.setFromCamera( this.mouse, this.camera );
    var intersects = this.raycaster.intersectObjects( this.scene.children );
    if ( intersects.length > 0 ) {
      if ( this.INTERSECTED != intersects[ 0 ].object ) {
        if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
        this.INTERSECTED = intersects[ 0 ].object;
        this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
        this.INTERSECTED.material.emissive.setHex( 0xff0000 );
      }
    } else {
      if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
      this.INTERSECTED = null;
    }
    this.renderer.render( this.scene, this.camera );
  }
}

document.addEventListener("DOMContentLoaded", function() {
  let t = new Test();
  t.init();
  t.animate();
});