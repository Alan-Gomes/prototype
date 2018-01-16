import { Player } from './Player';
import { Coin } from './Coin';
import { Zombie } from './Zombie';
import { Bullet } from 'phaser';

export abstract class EmptyLevel extends Phaser.State {

  lvlWidth: number;
  player: Player;
  collideWithLevel: Phaser.Group;
  levelStructure: Phaser.Group;
  coins: Coin[];
  points: number;
  zombies: Zombie[];
  lives: number;

  constructor(width: number) {
    super();
    this.lvlWidth = width;
    this.coins = [];
    this.zombies = [];
    this.points = 0;
  }

  init(lives: number) {
    this.lives = lives;
  }

  create() {
    this.game.world.setBounds(0, 0, this.lvlWidth, 900);
    for (let i = 1; i <= 8; i++) {
      let bg;
      if (i % 2 == 0) {
        bg = this.game.add.tileSprite(128 * (i - 1), 0, 256, 256, 'bgtile1');
      } else {
        bg = this.game.add.tileSprite(128 * (i - 1), 0, 256, 256, 'bgtile2');
      }
      bg.scale.set(0.5, 0.5);
      bg.fixedToCamera = true;
      for (let j = 1; j <= 8; j++) {
        let bg2;
        if ((i % 2 != 0 && j % 2 == 0) || (i % 2 == 0 && j % 2 != 0)) {
          bg2 = this.game.add.tileSprite(128 * (i - 1), 128 * j, 256, 256, 'bgtile3');
        } else {
          bg2 = this.game.add.tileSprite(128 * (i - 1), 128 * j, 256, 256, 'bgtile4');
        }
        bg2.scale.set(0.5, 0.5);
        bg2.fixedToCamera = true;
      }
    }
    this.collideWithLevel = this.game.add.group();
    this.levelStructure = this.game.add.group();
    this.game.physics.arcade.checkCollision.down = false;
    this.game.physics.arcade.checkCollision.up = false;
  }

  createGround(x: number, width: number) : Phaser.TileSprite {
    let ground = this.game.add.tileSprite(x, 830, width, 256, 'ground');
    this.game.physics.enable(ground, Phaser.Physics.ARCADE);
    ground.body.allowGravity = false;
    ground.body.immovable = true;
    ground.body.enable = true;
    this.levelStructure.add(ground);
    return ground;
  }

  update() {
    this.game.world.children.forEach((children: any) => {
      if (children.destroyNext) {
        children.destroy(true);
      }
    });
    if (this.player.dead) {
      if (this.player.animations.currentAnim.isFinished) {
        this.game.state.start('lives', true, false, this.game.state.current, this.lives - 1);
        return;
      }
    }
    this.player.bullets.forEach(bullet => {
      this.game.physics.arcade.collide(this.levelStructure, bullet, () => {
        (<any>bullet).destroyNext = true;
      });
    });
    this.game.physics.arcade.collide(this.collideWithLevel, this.collideWithLevel);
    this.game.physics.arcade.collide(this.levelStructure, this.collideWithLevel);
    for (let i = this.coins.length - 1; i >= 0; i--) {
      let coin = this.coins[i];
      if (!coin.collected) {
        this.game.physics.arcade.overlap(this.player, coin, this.onPickCoin);
      } else {
        this.coins.splice(i, 1);
        this.points++;
      }
    }
    for (let i = this.zombies.length - 1; i >= 0; i--) {
      let zombie = this.zombies[i];
      if (zombie.dead) {
        this.zombies.splice(i, 1);
        continue;
      }
      zombie.update();
      this.game.physics.arcade.overlap(this.player, zombie, this.onZombieCollide);
      this.player.bullets.forEach(bullet => {
        this.game.physics.arcade.overlap(zombie, bullet, this.onKillZombie);
      });
    }
    this.player.update();
    if (this.player.y > this.world.height) {
      this.player.die();
    } else if (this.player.y < -30) {
      this.player.die();
    }
  }

  onKillZombie(zombie: Zombie, bullet: Bullet) {
    zombie.hit();
    (<any>bullet).destroyNext = true;
  }

  onZombieCollide(player: Player, zombie: Zombie) {
    player.die();
  }

  onPickCoin(player: Player, coin: Coin) {
    coin.collected = true;
    (<any>coin).destroyNext = true;
  }

  render() {

  }

  shutdown() {
    this.points = 0;
    this.coins = [];
    this.zombies = [];
  }

}
