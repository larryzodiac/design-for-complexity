/*
	23.01.2020
	Pictionary
	https://github.com/ml5js/ml5-library/blob/master/src/SketchRNN/models.js
	https://learn.ml5js.org/docs/#/reference/sketchrnn
*/

// console.log('ml5 version:', ml5.version);

let canvas;
let classifier;
let bot
let label;
let confidence;
let timer;

function preload() {
	// Initialize the Image Classifier method with MobileNet
	classifier = ml5.imageClassifier('DoodleNet', () => console.log('Model Loaded!'));
}

function setup() {
	// Create the canvas
	// Model was trained in 280x280... it has trouble with anything bigger.
	// canvas = createCanvas(windowWidth, windowHeight);
	canvas = createCanvas(280, 280);
	canvas.position(windowWidth/2 - 150, windowHeight/2 - 150);
	canvas.addClass('canvas');
	canvas.mouseReleased(classifyCanvas);
	// Create the button
	let button = createButton('Start Again');
  button.position(windowWidth - 200, 0);
  button.mousePressed(() => {
		background(255);
		timer = createElement('h1', 'Timer ⟶ 60');
		timer.position(windowWidth - 300, 100);
		let timeLeft = 60
		let countDown = window.setInterval(function(){
			// Show user the timer
			timer.html('Timer ⟶ ' + timeLeft);
      timeLeft -= 1;
      if(timeLeft < 0) {
        clearInterval(countDown);
				timer.html('Finished!');
      }
		}, 1000);
	});
	background(255);
	// Create the bot look ヽ(^。^)丿
	let move = true;
	bot = createElement('h2', 'ヽ(^。^)丿');
	bot.position(60, 20);
	window.setInterval(function(){
		const b = move ? '(ノ^_^)ノ' : 'ヽ(^。^)丿'
  	bot.html(b);
		move = !move;
	}, 5000);
	// Create the label for the bot
	label = createElement("h2", "Draw me something!");
	label.addClass('label');
	label.position(250, 15);
}

function draw() {
  strokeWeight(15);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function classifyCanvas() {
  classifier.classify(canvas, (error, results) => {
		// Display error in the console
	  if (error) {
	    console.error(error);
	  }
	  // The results are in an array ordered by confidence.
	  // console.log(results);
	  // Show the first label and confidence
		// console.log(results[0].label);
		// console.log(results[0].confidence);
		let confidence = results[0].confidence;
		if (confidence >= 0 && confidence <= 0.30) {
			label.html("I'm guessing... " + results[0].label + "?");
		} else if (confidence > 0.30 & confidence <= 0.70) {
			label.html('I think I see ' + results[0].label + "?");
		} else {
			bot.html('┌( ಠ_ಠ)┘ ');
			label.html('I definitely see... ' + results[0].label + '!');
		}
	});
}
