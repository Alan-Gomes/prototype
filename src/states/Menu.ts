export class MenuState extends Phaser.State {

  create() {
    let nameLabel = this.game.add.text(80, 80, 'Time shifter', {font: '50px arial', fill: '#ffffff'});
    let startLabel = this.game.add.text(80, this.game.world.height - 80, 'Pressione "espaço" para começar', {font: '25px arial', fill: '#ffffff'});
    let spacekey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacekey.onDown.addOnce(this.start, this);
  }

  start() {
    this.game.state.start('levelone', true, false, 4);
  }

}
