//matrix way, dynamically generated maze
//video drawing
var canvasheight = 600;
var canvaswidth = 600;
//lost in translation literally
var checkall;
var checkallvar = 1;
  //var videothing;
var clicked = [];
var mazesolve = false;
var loaded = "";
document.addEventListener("contextmenu", function(e){
//console.log('right click!');
e.preventDefault();
});

///////////////////////////////////////////////////////

function setup(){
//2d array
	for (var i = 1; i <= 27; i++) {
		clicked[i] = [];
		for (var j = 1; j <= 27; j++) {
			//0 clear
			//1 draw
			//2 out
			clicked[i][j] = 2;
		}
	}
checkall = createButton('fill/unfill');
checkall.parent('buttons');
//checkall.mousePressed(checkedChanged) //old;

//dynamic centering
  var canvas = createCanvas(canvaswidth,canvasheight);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
  //checkall.position(windowWidth/2,windowHeight-10);
  //console.log('canvas pos: '+x+";"+y);
  
//only working on local server
  //videothing = createCapture(VIDEO);
  //videothing.size(320,240);
//bg function	
  thing();
}

///////////////////////////////////////////////////////

function draw(){
if(!mazesolve){
var xoffset = 3;
var yoffset = 3;
var size = 27;
var box = 20;
for(var i = 1;i<=size;i++){
  	for(var j = 1;j<=size;j++){
  		if(clicked[i][j]==1){
  			fill(200);
  	  		rect(xoffset,yoffset,box,box);
  	  		}
  	  	if(clicked[i][j]==0){
  	  		fill(255);
  	  		stroke(255);
  	  		rect(xoffset,yoffset,box,box);
  	  		clicked[i][j]=2;
  	  	}
        if(clicked[i][j]==3){
          fill(100);
          stroke(255);
          rect(xoffset,yoffset,box,box);
        }
  	  	yoffset+=box+2;
  		}
  	yoffset = 3;
  	xoffset += box+2;
	 }
  }
}
if(mazesolve){

}

///////////////////////////////////////////////////////

function mouseDragged(){
//in case box==20 matrix is 27x27
//console.clear();
this.x = floor(mouseX);
this.y = floor(mouseY);
//% trasnform 27 max
this.transx = floor(1+((x/width))*27);
this.transy = floor(1+((y/height))*27);
//filling
if(mouseIsPressed){
if(mouseButton == LEFT){
	if(clicked[this.transx][this.transy]==2){
	clicked[this.transx][this.transy] = 1;
	}else if(clicked[this.transx][this.transy]==0){
	clicked[this.transx][this.transy] = 1;
	}
}
	if(mouseButton == RIGHT){
	clicked[this.transx][this.transy] = 0;
	 }
  if(mouseButton == CENTER){

    clicked[this.transx][this.transy] = 3;
    }
  }
}

///////////////////////////////////////////////////////

function thing(){
//experimental
  background(255, 0, 200);
  //20 === 20x20 rect
  var xoffset = 3;
  var yoffset = 3;
  var box = 20;
  var size = (canvasheight/box)-2;
  //calc not stable
  console.log("size: "+size);
  for(var i = 1;i<size;i++){
  	for(var j = 1;j<size;j++){
  	  stroke(255);
  	  rect(xoffset,yoffset,box,box);
      yoffset+=box+2;
  	}
  	yoffset = 3;
  	xoffset += box+2;
  }
}

///////////////////////////////////////////////////////

function keyTyped(){
if (key === 's'){
  //savemaze
  saveStrings( clicked, 'mazeexample.txt');
  }
if (key === 'f'){
  //loadmaze
  loaded = readTextFile("mazeexample.txt");
  console.log(loaded);
}
if (key === 'c'){
  //clearmaze
  //hardcode27
    for(var i = 1;i<=27;i++){
      for(var j = 1;j<=27;j++){
        if(checkallvar ==1){
    clicked[i][j] = 1;
  }else{
      clicked[i][j] = 0;   
    }}
    }
    if(checkallvar ==1){
      checkallvar = 0;}else{
checkallvar = 1;
    }
  }
if (key === 'k'){
  mazesolve = true;
  //continue to the 
  }
}

///////////////////////////////////////////////////////

function Mazesolver(){

}

///////////////////////////////////////////////////////

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                return (allText);
            }
        }
    }
    rawFile.send(null);
}
