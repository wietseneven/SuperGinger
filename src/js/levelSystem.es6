class LevelSystem {
  constructor(api, container, player, terrain) {
    this._api = api;
    this._container = container;
    this._player = player;
    this._terrain = terrain;

    this.level = 0;

    this.playing = false;

    this.player = null;

    this.levelScore = 0;
    this.gameScore = 0;

    this.createScoreInfoBox();
  }

  createScoreInfoBox() {
    this.scoreInfoBox = document.createElement("div");
    this.scoreInfoBox.style.position = 'absolute';
    this.scoreInfoBox.style.right = '50px';
    this.scoreInfoBox.style.top = '30px';
    this.scoreInfoBox.style.color = '#FFF';
    this.scoreInfoBox.style.textAlign = 'right';

    // add the newly created element and its content into the DOM
    document.body.insertBefore(this.scoreInfoBox, this._container);
  }

  newLevel() {
    this.level++;
    this.player = this._player;
    this._terrain._clearMap();

    this.gameScore += this.levelScore;

    this._api.get("level", this.level, (level) => {
      if (!level.error) {
        this._terrain.createLevel(level.map);
        this._player.create(level.winningPoint);
        this.playing = true;

        this.startGameTimer();
      } else {
        this.playing = false;
        this._menu.setState('showing');
      }
    });
  }

  startGameTimer() {
    this.levelScore = 0;
    if (gameTimer) clearInterval(gameTimer);
    const gameTimer = setInterval(() => {
      this.levelScore++;
    }, 1000);
  }

  update() {
    console.log(this.gameScore);
    if (this.playing) {

      this.scoreInfoBox.innerHTML = this.gameScore + this.levelScore;

      if (this.player._checkWin()) {
        console.log("YEAH");
        this.playing = false;
        this.newLevel();
      }

    } else {
      // console.log('no more levelss');
    }
  }
}
export default LevelSystem;