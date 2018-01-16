export class BootState extends Phaser.State {
  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.time.desiredFps = 60;
    this.game.state.start('load');
    this.game.physics.arcade.gravity.y = 2000;
  }
}
