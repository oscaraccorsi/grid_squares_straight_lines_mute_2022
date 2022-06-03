let baseUrlPictures = 'https://oscaraccorsi.github.io/pictures/';
let logo;

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
let pictureList = ['schneider.jpg', 
                   'schneider01.jpg', 
                   'schneider01.png', 
                   'schneider02.jpg',
                   'schneider03.jpg', 
                   'schneider04.jpg', 
                   'schneider05.jpg',  
                   'schneider06.jpg', 
                   'schneider07.jpg', 
                   'schneider08.jpg', 
                   'schneider09.png', 
                   'schneider10.png'];

let marginX, marginY;
let dist = [15, 20, 25, 30, 40, 50];
 
let dst;
let frCnt;

let oneCol;

let coeffX, coeffY;
let sec, min, h, day;   

function preload() {
  h = hour()%12;
  img = loadImage(baseUrlPictures + pictureList[h]);
  logo = loadImage(baseUrlPictures + 'good one white.png');  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  background(10); 
  frameRate(fr);
  rectMode(CENTER);
  
  
  min = minute();
  count = round(min/10);
  dst = dist[count];
  
  
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
  
  for (let i = marginX; 
       i < width-marginX; 
       i += (width-marginX*2)/coeffX) {
    
    for (let u = marginY; 
         u < height-marginY; 
         u += (height-marginY*2)/coeffY) {
      
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
  
  if (frameCount >= time) {
    h = hour()%12;
    setup(); 
    frameCount = 0;
  }
  
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
  h = hour()%12;
  setup();
}

function mousePressed() {
  imageMode(CENTER);
  let xLogo = windowWidth-40;
  logo.resize(40, 0);
  image(logo, xLogo, windowHeight-25);
  tint(200);
  imageMode(CORNER);
  save();  
}
