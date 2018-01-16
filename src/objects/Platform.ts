export class ExtendedPlatform extends Phaser.Sprite {

  gfc: Phaser.TileSprite;
  gfr: Phaser.Sprite;

  constructor(game: Phaser.Game, x: number, y: number, width: number) {
    super(game, x, y, 'platforml');
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.enable = true;
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.body.setSize(this.width * 2 + width * 2, this.height * 0.5, 0, 0);

    this.gfc = game.make.tileSprite(this.width, 0, width * 2, this.height, 'platformc', 0);
    game.physics.enable(this.gfc, Phaser.Physics.ARCADE);
    this.gfc.body.enable = true;
    this.gfc.body.allowGravity = false;
    this.gfc.body.immovable = true;
    this.addChild(this.gfc);

    this.gfr = game.make.sprite(this.width + width * 2, 0, 'platformr');
    game.physics.enable(this.gfr, Phaser.Physics.ARCADE);
    this.gfr.body.enable = true;
    this.gfr.body.allowGravity = false;
    this.gfr.body.immovable = true;
    this.addChild(this.gfr);
    this.scale.setTo(0.5, 0.5);
  }

}

export class Platform extends Phaser.Sprite {

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'platform');
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.enable = true;
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.body.setSize(this.width, this.height * 0.5, 0, 0);
    this.scale.setTo(0.5, 0.5);
  }

}
