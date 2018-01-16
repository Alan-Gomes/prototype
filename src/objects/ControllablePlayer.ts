import { Player } from './Player';

export class ControllablePlayer extends Player {

  jumpButton: Phaser.Key;
  aKey: Phaser.Key;
  dKey: Phaser.Key;
  shootButton: Phaser.Key;
  canDoubleJump: boolean;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);
    this.canDoubleJump = false;
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.shootButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game.camera.follow(this, Phaser.Camera.FOLLOW_PLATFORMER);
  }

  update() {
    super.update();
    if (this.dead) {
      return;
    }
    if (this.jumpButton.isDown && this.jumpButton.repeats == 0 && (this.body.touching.down || this.canDoubleJump)) {
      if (this.body.touching.down) {
        this.canDoubleJump = true;
        this.jump();
      } else {
        this.canDoubleJump = false;
        this.doubleJump();
      }
    } else if (this.dKey.isDown) {
      this.walkRight();
    } else if (this.aKey.isDown) {
      this.walkLeft();
    } else if (this.body.touching.down) {
      this.idle();
    }
    if (this.shootButton.isDown) {
      this.shoot();
    }
  }

}
