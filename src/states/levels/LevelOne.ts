import { Spikes } from '../../objects/Spikes';
import { Coin } from '../../objects/Coin';
import { EmptyLevel } from '../../objects/EmptyLevel';
import { Platform } from '../../objects/Platform';
import { Saw } from '../../objects/Saw';
import { Box } from '../../objects/Box';
import { Zombie } from '../../objects/Zombie';
import { ControllablePlayer } from '../../objects/ControllablePlayer';
import { Bullet } from 'phaser';
import { Player } from '../../objects/Player';

export class LevelOne extends EmptyLevel {

  spikes: Spikes;
  deathCoin: Coin;
  platformInvisible1: Platform;
  platformInvisible2: Platform;
  saw: Saw;
  scrollPlats1: Phaser.Group;
  scrollPlats2: Phaser.Group;
  scrollPlats3: Phaser.Group;
  box1: Box;
  showTip: boolean;
  zombie: Zombie | null;

  constructor() {
    super(4200);
  }

  create() {
    this.player = new ControllablePlayer(this.game, 300, 730);
    super.create();
    super.createGround(0, 1600);
    super.createGround(2800, 2400);
    this.game.add.existing(this.player);
    this.collideWithLevel.add(this.player);
    let plat1 = new Platform(this.game, 400, 650);
    this.game.add.existing(plat1);
    this.levelStructure.add(plat1);
    this.spikes = new Spikes(this.game, 550, 728, 5);
    this.game.add.existing(this.spikes);
    let plat2 = new Platform(this.game, 750, 650);
    this.game.add.existing(plat2);
    this.levelStructure.add(plat2);
    let plat3 = new Platform(this.game, 1000, 650);
    this.game.add.existing(plat3);
    this.levelStructure.add(plat3);
    this.platformInvisible1 = new Platform(this.game, 520, 450);
    this.platformInvisible1.alpha = 0;
    this.game.add.existing(this.platformInvisible1);
    this.platformInvisible2 = new Platform(this.game, 1400, 500);
    this.platformInvisible2.alpha = 0;
    this.game.add.existing(this.platformInvisible2);
    this.deathCoin = new Coin(this.game, 1300, 540);
    this.game.add.existing(this.deathCoin);
    this.saw = new Saw(this.game, 1400, 830);
    this.game.add.existing(this.saw);
    this.saw.body.setSize(this.saw.body.width * 5, this.saw.body.height * 5, -this.saw.body.width, -this.saw.body.height);
    this.game.world.bringToTop(this.levelStructure);
    this.scrollPlats1 = this.scrollPlatforms(1800);
    this.scrollPlats2 = this.scrollPlatforms(2200);
    this.scrollPlats3 = this.scrollPlatforms(2600);
    this.levelStructure.add(this.scrollPlats1);
    this.levelStructure.add(this.scrollPlats2);
    this.levelStructure.add(this.scrollPlats3);
    this.box1 = new Box(this.game, 3400, 780, 0.4);
    this.game.add.existing(this.box1);
    this.collideWithLevel.add(this.box1);
    this.showTip = true;
    (<any>this.scrollPlats2).nY = 100;
    this.zombie = null;
  }

  scrollPlatforms(x: number): Phaser.Group {
    let scrollPlats = this.game.add.group();
    let scrollPlat1 = new Platform(this.game, x, 200);
    let scrollPlat2 = new Platform(this.game, x, 500);
    let scrollPlat3 = new Platform(this.game, x, 800);
    scrollPlats.add(scrollPlat1);
    scrollPlats.add(scrollPlat2);
    scrollPlats.add(scrollPlat3);
    this.game.add.existing(scrollPlats);
    scrollPlats.setAll("body.immovable", true);
    return scrollPlats;
  }

  update() {
    this.game.physics.arcade.overlap(this.spikes, this.player, this.player.die, undefined, this.player);
    this.game.physics.arcade.overlap(this.deathCoin, this.player, this.dieAndDestroyCoin, undefined, this);
    this.game.physics.arcade.collide(this.platformInvisible1, this.player, undefined, this.platShow1, this);
    this.game.physics.arcade.collide(this.platformInvisible2, this.player, this.platShow2, undefined, this);
    this.game.physics.arcade.overlap(this.saw, this.player, this.sawBig, undefined, this);
    this.scrollPlats1.children.forEach(child => {
      if (child.y < -50) {
        child.y = this.game.world.height;
      } else if (child.y > this.game.world.height) {
        child.y = -50;
      }
    });
    this.scrollPlats1.children.forEach(child => {
      if (child.y < -50) {
        child.y = this.game.world.height;
      } else if (child.y > this.game.world.height) {
        child.y = -50;
      }
    })
    this.scrollPlats1.children.forEach(child => {
      if (child.y < -50) {
        child.y = this.game.world.height;
      } else if (child.y > this.game.world.height) {
        child.y = -50;
      }
    })
    this.player.bullets.forEach(bullet => {
      this.game.physics.arcade.collide(bullet, this.box1, this.destroyBox, undefined, this);
    });
    if (this.player.x > 2700 && this.showTip) {
      this.showTip = false;
      let tip = this.game.add.text(3300, 700, 'Use espaço para atirar', { font: '20px arial', fill: '#ffffff' });
      this.game.time.events.add(Phaser.Timer.SECOND * 10, tip.destroy, tip);
    }
    this.scrollPlats1.setAll("body.velocity.y", -100);
    this.scrollPlats2.setAll("body.velocity.y", (<any>this.scrollPlats2).nY);
    this.scrollPlats3.setAll("body.velocity.y", -100);
    this.game.physics.arcade.collide(this.player, this.scrollPlats2, this.speedPlatforms, undefined, this);
    this.saw.update();
    super.update();
  }

  destroyBox(bullet: Bullet, box: Box) {
    (<any>bullet).destroyNext = true;
    box.explode();
    this.game.time.events.add(200, box.destroy, box);
    this.zombie = new Zombie(this.game, 3430, 780, -1, 550);
    this.game.add.existing(this.zombie);
    this.zombies.push(this.zombie);
  }

  speedPlatforms(player: Player, plat: Phaser.Sprite) {
    (<any>this.scrollPlats2).nY = 400;
  }

  sawBig(saw: Saw, player: Player) {
    this.game.add.tween(saw.scale).to( { x: 1.3, y: 1.3 }, 100, Phaser.Easing.Linear.None, true);
    this.game.time.events.add(100, player.die, player);
  }

  platShow1(platform: Platform, player: Player) {
    if (player.y <= platform.y) {
      if (platform.alpha == 1) {
        platform.body.gravity.y = player.body.gravity.y
        platform.body.velocity.y = Math.max(0, player.body.velocity.y);
        platform.body.allowGravity = true;
      }
      return false;
    } else if (player.body.velocity.y <= 0) {
      platform.alpha = 1;
      return true;
    }
  }

  platShow2(platform: Platform, player: Player) {
    platform.alpha = 1;
  }

  dieAndDestroyCoin() {
    this.player.die();
    this.deathCoin.destroy();
  }

  render() {
    super.render();
  }

  shutdown() {
    super.shutdown();
  }

}
