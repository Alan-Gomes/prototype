export class LoadState extends Phaser.State {

  preload() {
    let loadingLabel = this.game.add.text(80, 150, 'Carregando...', {font: '30px Courier', fill: '#ffffff'});
    this.game.load.atlasJSONHash('player', 'sprites/player.png', 'sprites/player.json');
    this.game.load.atlasJSONHash('coin', 'sprites/coin.png', 'sprites/coin.json');
    this.game.load.atlasJSONHash('bullet', 'sprites/bullet.png', 'sprites/bullet.json');
    this.game.load.atlasJSONHash('zombie', 'sprites/zombie.png', 'sprites/zombie.json');
    this.game.load.image("ground", "sprites/ground.png");
    this.game.load.image("platforml", "sprites/platforml.png");
    this.game.load.image("platformc", "sprites/platformc.png");
    this.game.load.image("platformr", "sprites/platformr.png");
    this.game.load.image("platform", "sprites/platform.png");
    this.game.load.image("spike", "sprites/spike.png");
    for (let i = 1; i <= 6; i++) {
      this.game.load.image("bgtile" + i, "sprites/bgtile" + i + ".png");
    }
    this.game.load.image("saw", "sprites/saw.png");
    this.game.load.image("box", "sprites/box.png");
    this.game.load.image("head", "sprites/head.png");
  }

  create() {
    this.game.state.start('menu');
  }

}
