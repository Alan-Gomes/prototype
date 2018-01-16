export class LivesState extends Phaser.State {

  lives: number;
  nextState: string;

  init(nextState: string, lives: number) {
    this.lives = lives;
    this.nextState = nextState;
  }

  create() {
    let vidas = this.game.add.text(0, 0, 'x ' + this.lives, {font: '50px arial', fill: '#ffffff', boundsAlignH: "center", boundsAlignV: "middle"});
    vidas.setTextBounds(100, 0, 700, 600);
    let head = this.game.make.sprite(-vidas.height, 0, 'head');
    head.height = vidas.height * 0.8;
    head.width = vidas.height * 0.8;
    vidas.addChild(head);
    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.startGame, this);
  }

  startGame() {
    this.game.state.start(this.nextState, true, false, this.lives);
  }

}
