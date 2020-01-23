/*
	23.01.2020
	Pictionary
	https://github.com/ml5js/ml5-library/blob/master/src/SketchRNN/models.js
	https://learn.ml5js.org/docs/#/reference/sketchrnn
*/

// console.log('ml5 version:', ml5.version);

const id = 'canvas'
let canvas, canvas_width, canvas_height;

let classifier;
let label;
let confidence;

function setup() {
	canvas_width = document.getElementById(id).offsetWidth;
	canvas_height = document.getElementById(id).offsetHeight;
  canvas = createCanvas(canvas_width, canvas_height);
  canvas.parent(id);
	// Initialize the Image Classifier method with MobileNet
	classifier = ml5.imageClassifier('DoodleNet', () => console.log('Model Loaded!'));
}

function draw() {
	fill(0)
	ellipse(10,10,10,10);
}
