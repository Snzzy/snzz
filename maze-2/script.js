var cols,rows;
var w = 20;
var arraybox = [];
var neighbours = [];
var start = 1;
var current;

function setup(){
createCanvas(600,600);
cols = floor(width/w);
rows = floor(height/w);
frameRate(5);
//BOX
for (var j = 0;j<rows;j++){
	for (var i = 0;i<cols;i++){
		var box = new Box(i,j);
		arraybox.push(box);
		}
	}
//WALKER
current = arraybox[0];
}

function draw(){
	background(255, 204, 221);
	for(var i = 0;i < arraybox.length;i++){
	arraybox[i].show();
	}
current.visited = true;

//if returns stuff its visited step to box
	var next = current.Neighbours();

	if (next){
	next.visited = true;
	current = next;
	}
}
function index(i,j){
	if(i < 0 || j < 0 || i > cols-1 || j > rows-1){
		return-1;
	}
return i+j*cols;
}
function Box(i,j){
	this.i = i;
	this.j = j;
	this.visited = false;

	this.Neighbours = function(){
		var neighbours = [];

//things -2 one block further if that one appears to be visited back one block
		var top = arraybox[index(i,j-1)];
		var top2 = arraybox[index(i,j-2)];

		var right = arraybox[index(i+1,j)];
		var right2 = arraybox[index(i+2,j)];
		
		var bottom = arraybox[index(i, j+1)];
		var bottom2 = arraybox[index(i, j+2)];
		
		var left = arraybox[index(i-1,j)];
		var left2 = arraybox[index(i-2,j)];

//method
		
		if(top && !top.visited){
			neighbours.push(top);
			neighbours.push(right);
			neighbours.push(left);
		}
		
		 if(right && !right.visited){
			neighbours.push(right);
		}
		
		 if(bottom && !bottom.visited){
			neighbours.push(bottom);
		}
		 if(left && !left.visited){
			neighbours.push(left);
		}
		if(neighbours.length > 0){
			var r = floor(random(0,neighbours.length));
			return neighbours[r];
		}else{
			return undefined;
		}
	}

	this.show = function(){
		var x = this.i*w;
		var y = this.j*w;
		stroke(255);
		if(this.visited){
			fill(200);
		}else{
		noFill();
		}
		rect(x,y,w,w);

	}
}
