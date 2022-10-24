// store canvas from html
const canvas = document.getElementById('canvas0');
// give canvas 2d properties
const ctx = canvas.getContext('2d');
// set initial width and height of canvas
const CANVAS_WIDTH = canvas.width = 800;
// initial height
const CANVAS_HEIGHT = canvas.height = 700;
// setting initial speed
let gameSpeed = 5;

// setting background layers to background images
const backgroundLayer1 = new Image();
backgroundLayer1.src = '/img/layer-1.png'
const backgroundLayer2 = new Image();
backgroundLayer2.src = '/img/layer-2.png'
const backgroundLayer3 = new Image();
backgroundLayer3.src = '/img/layer-3.png'
const backgroundLayer4 = new Image();
backgroundLayer4.src = '/img/layer-4.png'
const backgroundLayer5 = new Image();
backgroundLayer5.src = '/img/layer-5.png'
// run once window has loaded
window.addEventListener('load', function() {
  // set slide to gameSpeed set on line 9
  const slider = document.getElementById('slider');
  slider.value = gameSpeed;
  // display game speed on html page
  const showGameSpeed = document.getElementById('showGameSpeed');
  showGameSpeed.innerHTML = gameSpeed;
  // when the user changes slide position update game speed
  slider.addEventListener('change', function(x){
    gameSpeed = x.target.value;
    showGameSpeed.innerHTML = x.target.value;
  })
  // class for building each layer object and setting its speed
  class Layer {
    constructor(image, speedModifier) {
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 700;
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = gameSpeed * this.speedModifier;
    }
    // update speed and frame rate
    update() {
      this.speed = gameSpeed * this.speedModifier;
      if(this.x <= -this.width) {
        this.x = 0;
      }
      this.x = this.x - this.speed;
    }
    // set image location
    draw() { // two images are drawn, the second 'moved over' the width of the image
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
  };
  // create objects using the class on line 36
  // passing in image from 12 - 21 and and the
  // number to be multipied by gameSpeed
  // these are the constants that will be multipied by
  // the relative gameSpeed that is set by user
  const layer1 = new Layer(backgroundLayer1, 0.2);
  const layer2 = new Layer(backgroundLayer2, 0.4);
  const layer3 = new Layer(backgroundLayer3, 0.6);
  const layer4 = new Layer(backgroundLayer4, 0.8);
  const layer5 = new Layer(backgroundLayer5, 1);
  // putting all the layers into an array
  // so it can be accessed by the forEach, line 78
  const gameObjects = [layer1, layer2, layer3, layer4, layer5];

  function animate() {
    // this clears the previous image on screen so it doesn't 'smear' across the page
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    gameObjects.forEach(object => {
      // for each item in the array update and draw their current location
      // every time this runs
      object.update();
      object.draw();
    })
    // recursively call animate
    requestAnimationFrame(animate);
  };
  // start
  animate();
});
