export class Saw extends Phaser.Sprite {

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'saw');
    this.anchor.setTo(.5, .5);
    this.scale.set(0.4, 0.4);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.enable = true;
    this.body.immovable = true;
    this.body.allowGravity = false;
  }

  update() {
    this.angle += 2;
  }

}
