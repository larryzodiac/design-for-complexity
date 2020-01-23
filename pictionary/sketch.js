/*
	PLaying with SketchRNN.
	https://github.com/ml5js/ml5-library/blob/master/src/SketchRNN/models.js
	https://learn.ml5js.org/docs/#/reference/sketchrnn
*/

// console.log('ml5 version:', ml5.version);

let canvas;
let classifier;
let label;
let confidence;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	// Initialize the Image Classifier method with MobileNet
	classifier = ml5.imageClassifier('DoodleNet', () => console.log('Model Loaded!'));
}

function draw() {

}
