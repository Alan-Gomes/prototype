declare var window: any;
declare var require: any;

window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')
import { BootState } from './states/Boot';
import { LoadState } from './states/Load';
import { MenuState } from './states/Menu';
import { LivesState } from './states/Lives';
import { LevelOne } from './states/levels/LevelOne';

class TimeShifter extends Phaser.Game {

  constructor() {
    super(800, 600, Phaser.AUTO, 'gameDiv');
    this.state.add('boot', BootState);
    this.state.add('load', LoadState);
    this.state.add('menu', MenuState);
    this.state.add('lives', LivesState);
    this.state.add('levelone', LevelOne);

    this.state.start('boot');
  }

}

window.onload = function() {
  new TimeShifter();
}
