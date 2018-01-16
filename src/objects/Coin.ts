export class Coin extends Phaser.Sprite {

  collected: boolean;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'coin');
    this.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7], 15, true);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.enable = true;
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.anchor.setTo(.5, .5);
    this.animations.play('spin');
    this.collected = false;
  }

}
