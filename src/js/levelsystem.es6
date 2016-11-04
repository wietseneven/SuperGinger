class LevelSystem {
  constructor(api, player, terrain) {
    this._api = api;
    this._player = player;
    this._terrain = terrain;

    this.level = 0;

    this.playing = false;

    this.player = null;
  }

  newLevel() {
    this.level++;
    this.player = this._player;
    this._terrain._clearMap();

    this._api.get("level", this.level, (level) => {
      if (!level.error) {
        this._terrain.createLevel(level.map);
        this._player.create(level.winningPoint);
        this.playing = true;
      } else {
        this.playing = false;
      }
    });
  }

  update() {
    if (this.playing) {

      if (this.player._checkWin()) {
        console.log("YEAH");
        this.playing = false;
        this.newLevel();
      }

    }
  }
}
export default LevelSystem;