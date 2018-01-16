export class Bullet extends Phaser.Sprite {

  direction: number;

  constructor(game: Phaser.Game, x: number, y: number, direction: number) {
    super(game, x, y, 'bullet');
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.animations.add('bullet', [0, 1, 2, 3, 4], 15, true);
    this.animations.play('bullet');
    this.body.enable = true;
    this.body.allowGravity = false;
    this.anchor.setTo(.5, .5);
    this.direction = direction;
    this.scale.x = Math.abs(this.scale.x) * direction;
  }

  update() {
    this.body.velocity.x = 500 * this.direction;
  }

}
