let baseUrlPictures = 'https://oscaraccorsi.github.io/pictures/';
let logo;

let x = [];
let y = [];

let X = [];
let Y = [];
let count = 1;
let choice = [orizontal, vertical];
let chosen;

let fr;
let frArray = [1, 2, 3, 5, 8, 13, 21, 34];

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
let dist = [15, 20, 35, 55, 90, 145];
 
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
  fr = random(frArray);
  frameRate(fr);
  rectMode(CENTER);
  
  
  min = minute();
  count = round(min/10);
  dst = dist[count];
  counter = round(random(0, 3));
  console.log(baseUrlPictures + pictureList[h]);
    
  


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
  console.log(h, dst, count, fr, counter); 
}
function draw() { 
  let frameSec = fr;
  let frameMin = fr*60;
  let time = (frameMin*counter)+(frameSec+33);
  
  if (frameCount >= time) {
    reloadPage();
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

function reloadPage() {
   window.location.reload();
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
