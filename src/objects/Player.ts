import { Bullet } from "./Bullet";


export abstract class Player extends Phaser.Sprite {

  dead: boolean;
  numFrames: number;
  shootTime: number;
  bullets: Bullet[];

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
    game.time.events.loop(100, this.aumenta, this);
    this.shootTime = 0;
    this.bullets = [];
    this.body.collideWorldBounds = true;
  }

  aumenta() {
    this.numFrames++;
  }

  update() {
    for (let i = this.bullets.length -1; i >= 0; i--) {
      if (!this.bullets[i].alive) {
        this.bullets.splice(i, 1);
      } else if (!this.bullets[i].inCamera) {
        this.bullets[i].destroy();
        this.bullets.splice(i, 1);
      }
    }
    this.body.drag.x = 0;
    this.body.drag.y = 0;
    this.body.velocity.x = 0;
  }

  die() {
    if (this.dead) {
      return;
    }
    this.dead = true;
    this.body.velocity.y = 0;
    this.animations.play('dead');
  }

  jump() {
    this.body.velocity.y = -600;
    this.animations.play('jump');
  }

  doubleJump() {
    this.body.velocity.y = -800;
    this.animations.play('jump');
    this.animations.currentAnim.frame = 0;
  }

  walkRight() {
    this.scale.x = Math.abs(this.scale.x);
    this.body.velocity.x += 300;
    const cname = this.animations.currentAnim.name;
    if ((cname != 'jump' && cname.indexOf('shoot') == -1) || this.animations.currentAnim.isFinished) {
      this.animations.play('run');
    }
  }

  walkLeft() {
    this.scale.x = Math.abs(this.scale.x) * -1;
    this.body.velocity.x -= 300;
    const cname = this.animations.currentAnim.name;
    if ((cname != 'jump' && cname.indexOf('shoot') == -1) || this.animations.currentAnim.isFinished) {
      this.animations.play('run');
    }
  }

  shoot() {
    if (this.shootTime > 0 && this.numFrames - this.shootTime < 5) {
      return;
    }
    this.shootTime = this.numFrames;
    if (this.body.velocity.x == 0) {
      if (this.body.touching.down) {
        this.animations.play('idle_shoot');
      } else {
        this.animations.play('jump_shoot');
      }
    } else {
      this.animations.play('run_shoot');
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

  idle() {
    const cname = this.animations.currentAnim.name;
    if (cname.indexOf('shoot') == -1 || this.animations.currentAnim.isFinished) {
      this.animations.play('idle');
    }
  }

}
