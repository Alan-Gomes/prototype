export class Spikes extends Phaser.TileSprite {

  constructor(game: Phaser.Game, x: number, y: number, quantity: number) {
    super(game, x, y, 256 * quantity, 256, 'spike');
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.enable = true;
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.body.setSize(256 * quantity - 40, this.height * 0.6, 20, this.height * 0.4);
    this.scale.set(0.4, 0.4);
  }

}
