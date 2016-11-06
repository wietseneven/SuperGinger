class Menu {
  constructor(THREE, Physijs, scene, camera, container, levelsystem) {
    this._THREE = THREE;
    this._Physijs = Physijs;
    this._scene = scene;
    this._camera = camera;
    this._levelSystem = levelsystem;
    this._container = container;

    this.state = 0;
    this.textGroup = new THREE.Group();

    this.moveDirection = 1;

    this.startGame = this.startGame.bind(this);

  }

  setState(state) {
    this.state = state;
    if (state) {
      this.create();
    }
  }

  startGame() {
    this.removeMenu();
    this.setState(0);
    setTimeout(() => {
      this._levelSystem.newLevel();
    }, 1000);
  }

  loadFont() {
    const THREE = this._THREE;

    var loader = new THREE.FontLoader();
    loader.load('fonts/optimer_bold.typeface.json', (response) => {
      this.font = response;
      this.createText();
      this.createButtons();
    });
  }

  createText() {
    const THREE = this._THREE;
    const Physijs = this._Physijs;
    const scene = this._scene;

    var material = Physijs.createMaterial(
      new THREE.MultiMaterial([
        new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.FlatShading}), // front
        new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.SmoothShading}) // side
      ])
    );

    var redMaterial = Physijs.createMaterial(
      new THREE.MultiMaterial([
        new THREE.MeshPhongMaterial({color: 0xC00D0D, shading: THREE.FlatShading}), // front
        new THREE.MeshPhongMaterial({color: 0xC00D0D, shading: THREE.SmoothShading}) // side
      ])
    );

    const textProps = {
      font: this.font,
      size: "30",
      extrudeMaterial: 1,
      height: 5
    };

    const textGeo = new THREE.TextGeometry("SUPER", textProps);

    const gingerText = new THREE.TextGeometry("GINGER", textProps);

    const superMesh = new Physijs.BoxMesh(textGeo, material);
    superMesh.rotation.y = 0.3490658504;

    const gingerMesh = new Physijs.BoxMesh(gingerText, redMaterial);
    gingerMesh.position.x = 120;
    gingerMesh.position.z = -30;
    gingerMesh.rotation.y = -0.6;

    this.textGroup.add(superMesh);
    this.textGroup.add(gingerMesh);

    this.textGroup.position.y = 40;
    this.textGroup.rotation.y = 0.6;
    scene.add(this.textGroup);
  }

  createButtons() {
    var newDiv = document.createElement("div");
    var newContent = document.createTextNode("START");
    newDiv.style.position = 'absolute';
    newDiv.style.left = 0;
    newDiv.style.right = 0;
    newDiv.style.bottom = '100px';
    newDiv.style.margin = 'auto';
    newDiv.style.backgroundColor = '#FF0000';
    newDiv.style.width = '200px';
    newDiv.style.textAlign = 'center';
    newDiv.style.padding = '10px';
    newDiv.appendChild(newContent); //add the text node to the newly created div.

    newDiv.addEventListener('click', this.startGame);
    this.button = newDiv;
    console.log('hi');

    // add the newly created element and its content into the DOM
    document.body.insertBefore(newDiv, this._container);
  }

  create() {
    this.loadFont();
  }

  removeMenu() {
    const scene = this._scene;
    // this.textGroup.position.y = -1000;
    this.button.remove();
  }

  update() {
    if (this.state == 'showing' && this.textGroup) {
      if (this.moveDirection == 1) {
        this.textGroup.rotation.y += 0.0005;
        if (this.textGroup.rotation.y > 0.7) this.moveDirection = 0;
      } else {
        this.textGroup.rotation.y -= 0.0005;
        if (this.textGroup.rotation.y < 0.5) this.moveDirection = 1;
      }
    } else {
      if (this.textGroup.position.y > -999) {
        this.textGroup.position.y += 3;
      }
    }
  }
}

export default Menu;