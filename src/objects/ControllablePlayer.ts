import { Player, State } from './Player';

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
    if (this.dead || this.hasState(State.DEAD)) {
      super.update();
      return;
    }
    if (this.jumpButton.isDown && this.jumpButton.repeats == 0 && (this.body.touching.down || this.canDoubleJump)) {
      if (this.body.touching.down) {
        this.canDoubleJump = true;
        this.state = State.JUMPING;
      } else {
        this.canDoubleJump = false;
        this.state = State.DOUBLE_JUMPING;
      }
    } else if (this.dKey.isDown) {
      this.state = State.WALKING_RIGHT;
    } else if (this.aKey.isDown) {
      this.state = State.WALKING_LEFT;
    } else {
      this.state = State.IDLE;
    }
    if (this.shootButton.isDown && this.canShoot()) {
      this.state = this.state | State.SHOOTING;
    }
    super.update();
  }

  private canShoot(): boolean {
    const { name, loop } = this.animations.currentAnim;
    return name.indexOf('shoot') === -1 || loop;
  }

}
