export class Box extends Phaser.Sprite {

  nscale: number;

  constructor(game: Phaser.Game, x: number, y: number, scale: number) {
    super(game, x, y, 'box');
    this.anchor.set(.5, .5);
    this.scale.set(scale, scale);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.enable = true;
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.body.collideWorldBounds = true;
    this.nscale = scale;
  }

  explode() {
    this.game.add.tween(this).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
    this.game.add.tween(this.scale).to( { x: this.nscale + 0.3, y: this.nscale + 0.3 }, 100, Phaser.Easing.Linear.None, true);
  }

}
