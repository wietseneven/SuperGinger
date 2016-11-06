class Menu {
  constructor(THREE, Physijs, scene, api, camera, container, levelsystem) {
    this._THREE = THREE;
    this._Physijs = Physijs;
    this._scene = scene;
    this._api = api;
    this._camera = camera;
    this._levelSystem = levelsystem;
    this._container = container;

    this.state = 0;
    this.textGroup = new THREE.Group();

    this.moveDirection = 1;

    this.startGame = this.startGame.bind(this);
    this.showHighscores = this.showHighscores.bind(this);

    this.create();

  }

  setState(state) {
    this.state = state;
    if (state) this._camera.lookAt(this._scene);
  }

  startGame() {
    this.removeMenu();
    this.setState(0);
    setTimeout(() => {
      this._levelSystem.reset();
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
    var button = document.createElement("div");
    button.style.position = 'absolute';
    button.style.left = '-275px';
    button.style.right = '0';
    button.style.bottom = '100px';
    button.style.margin = 'auto';
    button.style.backgroundColor = '#FF0000';
    button.style.width = '200px';
    button.style.textAlign = 'center';
    button.style.padding = '10px';
    button.style.cursor = 'pointer';
    button.innerHTML = 'START' //add the text node to the newly created div.

    button.addEventListener('click', this.startGame);
    this.button = button;

    var highscoreButton = document.createElement("div");
    highscoreButton.style.position = 'absolute';
    highscoreButton.style.left = '0';
    highscoreButton.style.right = '-275px';
    highscoreButton.style.bottom = '100px';
    highscoreButton.style.margin = 'auto';
    highscoreButton.style.backgroundColor = '#FF0000';
    highscoreButton.style.width = '200px';
    highscoreButton.style.textAlign = 'center';
    highscoreButton.style.padding = '10px';
    highscoreButton.style.cursor = 'pointer';
    highscoreButton.innerHTML = 'GET HIGHSCORES';

    highscoreButton.addEventListener('click', this.showHighscores);
    this.highscoreButtutton = highscoreButton;

    // add the newly created element and its content into the DOM
    document.body.insertBefore(button, this._container);
    document.body.insertBefore(highscoreButton, this._container);
  }

  showHighscores() {
    const api = this._api;
    api.get("getHighscores", "", (scores) => {
      let highscores = "Highscores. The lower, the better. \n";
      for (let score of scores.highscores) {
        highscores += score.score + " by " + score.name + "\n";
      }
      alert(highscores);
    });
  }

  create() {
    if (this.font) {
      this.createText();
      this.createButtons();
    } else {
      this.loadFont();
    }
  }

  removeMenu() {
    const scene = this._scene;
    // this.textGroup.position.y = -1000;
  }

  update() {
    if (this.state == 'showing' && this.textGroup) {
      if (this.textGroup.position.y > 40) {
        let buttonBottomDistance = Number(this.button.style.bottom.replace("px", ""));
        if (buttonBottomDistance < 100) {
          buttonBottomDistance += 3;
          this.button.style.bottom = buttonBottomDistance + 'px';
          this.highscoreButtutton.style.bottom = buttonBottomDistance + 'px';
        }
        this.textGroup.position.y -= 3;
      }
      if (this.moveDirection == 1) {
        this.textGroup.rotation.y += 0.0005;
        if (this.textGroup.rotation.y > 0.7) this.moveDirection = 0;
      } else {
        this.textGroup.rotation.y -= 0.0005;
        if (this.textGroup.rotation.y < 0.5) this.moveDirection = 1;
      }
    } else {
      if (this.textGroup.position.y < 400) {
        this.textGroup.position.y += 3;
      }
      let buttonBottomDistance = Number(this.button.style.bottom.replace("px", ""));
      if (buttonBottomDistance > -50) {
        buttonBottomDistance -= 3;
        this.button.style.bottom = buttonBottomDistance + 'px';
        this.highscoreButtutton.style.bottom = buttonBottomDistance + 'px';
      }
    }
  }
}

export default Menu;