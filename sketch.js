let baseUrlPictures = 'https://oscaraccorsi.github.io/pictures/';

let x = [];
let y = [];

let X = [];
let Y = [];
let count = 1;
let choice = [orizontal, vertical];
let chosen;
let fr = 3;



let inc=20;
//let dist=20;

let img;
let palette = [];
let palettes = [];

let marginX, marginY;
let dist = [15, 20, 25, 30, 40, 50];
 
let dst;
let frCnt;

let oneCol;

let coeffX, coeffY;
let sec, min, h, day;   

function preload() {
  palettes[0] = loadImage(baseUrlPictures + 'schneider.jpg');
  palettes[1] = loadImage(baseUrlPictures + 'schneider01.jpg');
  palettes[2] = loadImage(baseUrlPictures + 'schneider01.png');
  palettes[3] = loadImage(baseUrlPictures + 'schneider02.jpg');
  palettes[4] = loadImage(baseUrlPictures + 'schneider03.jpg');
  palettes[5] = loadImage(baseUrlPictures + 'schneider04.jpg');
  palettes[6] = loadImage(baseUrlPictures + 'schneider05.jpg');
  palettes[7] = loadImage(baseUrlPictures + 'schneider06.jpg'); 
  palettes[8] = loadImage(baseUrlPictures + 'schneider07.jpg'); 
  palettes[9] = loadImage(baseUrlPictures + 'schneider08.jpg'); 
  palettes[10] = loadImage(baseUrlPictures + 'schneider09.png'); 
  palettes[11] = loadImage(baseUrlPictures + 'schneider10.png');
  palettes[12] = loadImage(baseUrlPictures + 'schneider11.png');
  palettes[13] = loadImage(baseUrlPictures + 'schneiderMio.png');
  palettes[14] = loadImage(baseUrlPictures + 'schneider12.jpg');  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  background(10); 
  frameRate(fr);
  rectMode(CENTER);
  h = hour()%12;
  
  min = minute();
  count = round(min/10);
  dst = dist[count];
  
  img = palettes[h];
  console.log(h, dst);   
  


//------------------------------------------------palette 
  img.resize(200, 0);
  img.loadPixels();
  
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2]; 
    let alpha = round(random(200));
    let c = color(r, g, b);
    palette.push(c);    
  }
  oneCol = random(palette);
  
//------------------------------------------------arrays
  marginX = width/10;
  marginY = height/10;
  coeffX = width/dst;
  coeffY = height/dst;
  for (let i = marginX; i < width-marginX; i += (width-marginX*2)/coeffX) {
    for (let u = marginY; u < height-marginY; u += (height-marginY*2)/coeffY) {
      x.push(i);
      y.push(u);
      fill(oneCol);
      //noStroke();
      square(i, u, 2 );  
    }
  }
  for (let i = 0; i < x.length+2; i++) {
    X[i] = random(x);
    Y[i] = random(y);
  }
  
}
function draw() { 
  let frameSec = fr;
  let frameMin = fr*60;
  let time = (frameMin*4)+(frameSec+33);
  
  
  stroke(random(palette));
  chosenPattern();
  noStroke();
  fill(random(palette));
  square(X[count-1], Y[count-1], 7);
  count++;
  if (count == x.length) {
    count = 1;
  }
  
  if (frameCount >= time) {
    for (let i = marginX; i < width-marginX; i += (width-marginX*2)/coeffX) {
      for (let u = marginY; u < height-marginY; u += (height-marginY*2)/coeffY) {
        x.pop(i);
        y.pop(u); 
      }
    }
    setup(); 
    frameCount = 0;
  }  
}
function chosenPattern() {
  let choose = random(choice);
  choose();
}
function vertical() {
  line(X[count-1], Y[count-1], X[count-1], Y[count]);
}
function orizontal() {
  line(X[count-1], Y[count-1], X[count], Y[count-1]);
}

function keyPressed() {
  clear();
  setup();
}