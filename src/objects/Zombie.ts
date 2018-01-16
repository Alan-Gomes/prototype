export class Zombie extends Phaser.Sprite {

  hitsToDie: number;
  hits: number;
  sourceX: number;
  walkDistance: number;
  direction: number;
  dead: boolean;

  constructor(game: Phaser.Game, x: number, y: number, hitsToDie: number, walkDistance: number) {
    super(game, x, y, 'zombie');
    this.hitsToDie = hitsToDie;
    this.hits = 0;
    this.scale.set(0.7, 0.7);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.enable = true;
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.body.collideWorldBounds = true;
    this.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7], 15, false);
    this.animations.add('hurt', [28, 27, 26, 25, 24, 23, 22, 21, 20], 60, false);
    this.animations.add('dead', [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 15, false);
    this.animations.add('idle', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34], 15, true);
    this.animations.add('walk', [35, 26, 37, 38, 39, 40, 41, 42, 43, 44], 15, true);
    this.animations.play('idle');
    this.anchor.setTo(.5, .5);
    this.sourceX = x;
    this.walkDistance = walkDistance;
    this.direction = -1;
    this.dead = false;
  }

  update() {
    this.body.velocity.x = 0;
    if (this.dead) {
      return;
    }
    if (this.animations.currentAnim.loop || this.animations.currentAnim.isFinished) {
      if (this.direction == -1) {
        if (this.x < this.sourceX - this.walkDistance) {
          this.direction *= -1;
        }
      } else if (this.direction == 1) {
        if (this.x > this.sourceX + this.walkDistance) {
          this.direction *= -1;
        }
      }
      this.animations.play('walk');
      this.scale.x = Math.abs(this.scale.x) * this.direction;
      this.body.velocity.x = 50 * this.direction;
    }
  }

  hit() {
    if (this.dead) {
      return;
    }
    this.hits++;
    if (this.hits == this.hitsToDie) {
      this.dead = true;
      this.y += 8;
      this.animations.play('dead');
      this.game.time.events.add(Phaser.Timer.SECOND, this.fadeOut, this);
    } else {
      this.animations.play('hurt');
    }
  }

  fadeOut() {
    this.game.add.tween(this).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    this.game.time.events.add(Phaser.Timer.SECOND, this.destroy, this);
  }

}
