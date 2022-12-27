window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const cxt = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 720;

  class InputHnadler {
    constructor(game) {
      this.game = game;
      window.addEventListener("keydown", (e) => {
        this.game.lastkey = "P" + e.key;
      });
      window.addEventListener("keyup", (e) => {
        this.game.lastkey = "R" + e.key;
      });
    }
  }
  class Owlbear {
    constructor(game) {
      this.game = game;
      this.spriteWidth = 200; // spritesheet width divided by no. of columns
      this.spriteHeight = 200; // spritsheet height divided by no. of rows
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 30;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.x = 200;
      this.y = 200;
      this.speedX = 0;
      this.speedY = 0;
      this.maxSpeed = 2;
      this.image = document.getElementById("owlbear");
      this.fps = 60;
      this.frameInterval = 1000 / this.fps;
      this.frameTimer = 0;
    }
    draw(context) {
      //   context.fillRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    setSpeed(speedX, speedY) {
      this.speedX = speedX;
      this.speedY = speedY;
    }
    update(deltaTime) {
      if (this.game.lastkey == "PArrowLeft") {
        this.setSpeed(-this.maxSpeed, 0);
        this.frameY = 3;
      } else if (this.game.lastkey == "RArrowLeft" && this.speedX < 0) {
        this.setSpeed(0, 0);
        this.frameY = 2;
      } else if (this.game.lastkey == "PArrowRight") {
        this.setSpeed(this.maxSpeed, 0);
        this.frameY = 5;
      } else if (this.game.lastkey == "RArrowRight" && this.speedX > 0) {
        this.setSpeed(0, 0);
        this.frameY = 4;
      } else if (this.game.lastkey == "PArrowUp") {
        this.setSpeed(0, -this.maxSpeed * 0.6);
        this.frameY = 7;
      } else if (this.game.lastkey == "RArrowUp" && this.speedY < 0) {
        this.setSpeed(0, 0);
        this.frameY = 6;
      } else if (this.game.lastkey == "PArrowDown") {
        this.setSpeed(0, this.maxSpeed * 0.6);
        this.frameY = 1;
      } else if (this.game.lastkey == "RArrowDown" && this.speedY > 0) {
        this.setSpeed(0, 0);
        this.frameY = 0;
      }
      this.x += this.speedX;
      this.y += this.speedY;
      // horizontal boundaries
      if (this.x < 0) {
        this.x = 0;
      } else if (this.x > this.game.width - this.width) {
        this.x = this.game.width - this.width;
      }
      // vertical boundaries
      if (this.y < 0 + this.game.topMargin) {
        this.y = this.game.topMargin;
      } else if (this.y > this.game.height - this.height) {
        this.y = this.game.height - this.height;
      }
      // sprite animation
      if (this.frameTimer > this.frameInterval) {
        this.frameX < this.maxFrame ? this.frameX++ : (this.frameX = 0);
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }
    }
  }
  //   class Object {
  //     constructor(game) {
  //       this.game = game;
  //     }
  //     draw(context) {
  //       context.drawImage(this.image, this.x, this.y, this.width, this.height);
  //     }
  //   }
  //   class Bush extends Object() {
  //     constructor(game) {
  //       super(game);
  //       this.game = game;
  //       this.image = document.getElementById("bush");
  //       this.imageWidth = 216;
  //       this.imageHeight = 100;
  //       this.width = this.imageWidth;
  //       this.height = this.imageHeight;
  //       this.x = Math.random() * this.game.width - this.width;
  //       this.y =
  //         this.game.topMargin +
  //         Math.random() * (this.game.height - this.height - this.game.topMargin);
  //     }
  //   }
  //   class Plant extends Object() {
  //     constructor(game) {
  //       super(game);
  //       this.game = game;
  //       this.image = document.getElementById("plant");
  //       this.imageWidth = 212;
  //       this.imageHeight = 118;
  //       this.width = this.imageWidth;
  //       this.height = this.imageHeight;
  //       this.x = Math.random() * this.game.width - this.width;
  //       this.y =
  //         this.game.topMargin +
  //         Math.random() * (this.game.height - this.height - this.game.topMargin);
  //     }
  //   }
  //   class Grass extends Object() {
  //     constructor(game) {
  //       super(game);
  //       this.game = game;
  //       this.image = document.getElementById("grass");
  //       this.imageWidth = 103;
  //       this.imageHeight = 182;
  //       this.width = this.imageWidth;
  //       this.height = this.imageHeight;
  //       this.x = Math.random() * this.game.width - this.width;
  //       this.y =
  //         this.game.topMargin +
  //         Math.random() * (this.game.height - this.height - this.game.topMargin);
  //     }
  //   }
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.topMargin = 200;
      this.lastkey = undefined;
      this.input = new InputHnadler(this);
      this.owlbear = new Owlbear(this);
      this.numberOfPlant = 10;
      this.plants = [];
    }
    render(context, deltaTime) {
      this.owlbear.draw(context);
      this.owlbear.update(deltaTime);
      this.plants.forEach((plant) => plant.draw(context));
    }
    // init() {
    //   for (let i = 0; i < this.numberOfPlant; i++) {
    //     this.plants.push(new Plant(this));
    //   }
    // }
  }
  const game = new Game(canvas.width, canvas.height);
  //   game.init();
  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    game.render(cxt, deltaTime);
    requestAnimationFrame(animate);
  }
  animate(0);
});
