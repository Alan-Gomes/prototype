import { Bullet } from "./Bullet";

export enum State {
  IDLE = 1,
  JUMPING = 2,
  DOUBLE_JUMPING = 4,
  DEAD = 8,
  WALKING_RIGHT = 16,
  WALKING_LEFT = 32,
  SHOOTING = 64
}

export abstract class Player extends Phaser.Sprite {

  dead: boolean;
  numFrames: number;
  shootTime: number;
  bullets: Bullet[];
  state: any;
  oldState: any;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'player');
    this.dead = false;
    this.scale.setTo(0.6, 0.6);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.enable = true;
    this.body.setSize(100, 136, 30, 19);
    this.animations.add('dead', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 15, false);
    this.animations.add('idle', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 15, true);
    this.animations.add('jump', [19, 20, 21, 22, 23, 24, 25, 26, 27, 28], 15, false);
    this.animations.add('jump_shoot', [30, 31, 32, 33, 34], 15, false);
    this.animations.add('run', [35, 36, 37, 38, 39, 40, 41, 42], 15, true);
    this.animations.add('run_shoot', [43, 44, 45, 46, 47, 48, 49, 50, 51], 15, false);
    this.animations.add('idle_shoot', [52, 53, 54, 55], 15, false);
    this.animations.play('idle');
    this.anchor.setTo(.5, .5);
    this.numFrames = 0;
    this.shootTime = 0;
    this.bullets = [];
    game.time.events.loop(1, this.aumenta, this);
    this.body.collideWorldBounds = true;
  }

  aumenta() {
    this.numFrames++;
  }

  update() {
    this.numFrames++;
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      if (!this.bullets[i].alive) {
        this.bullets.splice(i, 1);
      } else if (!this.bullets[i].inCamera) {
        this.bullets[i].destroy();
        this.bullets.splice(i, 1);
      }
    }
    this.body.velocity.x = 0;
    this.body.drag.x = 0;
    this.body.drag.y = 0;
    if (this.hasState(State.DEAD)) {
      this.dead = true;
      this.body.velocity.y = 0;
      this.animations.play('dead');
      return;
    }
    if (this.hasState(State.IDLE)) {
      this.queueAnimation('idle');
    }
    if (this.hasState(State.JUMPING)) {
      this.body.velocity.y = -600;
      this.animations.play('jump');
    }
    if (this.hasState(State.DOUBLE_JUMPING)) {
      this.body.velocity.y = -800;
      this.animations.play('jump');
      this.animations.currentAnim.frame = 0;
    }
    if (this.hasState(State.WALKING_RIGHT)) {
      this.scale.x = Math.abs(this.scale.x);
      this.body.velocity.x += 300;
    }
    if (this.hasState(State.WALKING_LEFT)) {
      this.scale.x = Math.abs(this.scale.x) * -1;
      this.body.velocity.x -= 300;
    }
    if (this.hasState(State.WALKING_LEFT) || this.hasState(State.WALKING_RIGHT)) {
      if ((
        !this.hasState(State.JUMPING) &&
        !this.hasState(State.DOUBLE_JUMPING) &&
        !this.hasState(State.SHOOTING)
      ) || this.animations.currentAnim.isFinished) {
        this.queueAnimation('run');
      }
    }
    if (this.hasState(State.SHOOTING)) {
      if (this.shootTime === 0 || this.numFrames - this.shootTime >= 5) {
        this.shootTime = this.numFrames;
        if (!this.hasState(State.WALKING_LEFT) && !this.hasState(State.WALKING_RIGHT)) {
          if (this.body.touching.down) {
            this.queueAnimation('idle_shoot');
          } else {
            this.queueAnimation('jump_shoot');
          }
        } else {
          this.queueAnimation('run_shoot');
        }
        let bullet;
        if (this.scale.x < 0) {
          bullet = new Bullet(this.game, this.x - this.body.width, this.y, -1);
        } else {
          bullet = new Bullet(this.game, this.x + this.body.width, this.y, 1);
        }
        this.game.add.existing(bullet);
        this.bullets.push(bullet);
      }
    }
  }

  private queueAnimation(name: string): void {
    if (this.animations.currentAnim.loop) {
      this.animations.play(name);
    } else {
      const current = this.animations.currentAnim;
      current.onComplete.addOnce(() => {
        if (current === this.animations.currentAnim) {
          this.animations.play(name);
        }
      })
    };
  }

  die() {
    this.state = State.DEAD;
  }

  hasState(state: State) {
    return (this.state & state) === state;
  }

}
