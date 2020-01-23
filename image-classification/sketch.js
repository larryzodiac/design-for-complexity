/*
	PLaying with ml5js + p5 manager
*/

// console.log('ml5 version:', ml5.version);

let video
let mobilenet;
let guess = '';

function setup() {
	createCanvas(windowWidth, windowHeight);
	video = createCapture(VIDEO);
	video.hide();
	mobilenet = ml5.imageClassifier('MobileNet', modelLoaded);
}

function draw() {
	background(0);
	image(video, 0, 0);
	fill(255);
	textSize(32);
	text(guess, 10, height - 100);
}

/*
	My Functions
*/

// When the model is loaded
function modelLoaded() {
  // console.log('Model Loaded!');
	mobilenet.predict(video, gotResults);
}

// Make a prediction with a selected image
function gotResults(error, results) {
	if (error) {
		console.error(error);
	} else {
		// console.log(results);
		guess = results[0].label;
		mobilenet.predict(video, gotResults);
	}
}
