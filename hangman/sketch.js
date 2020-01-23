/*
	PLaying with poseNet to make a hangman game.
	https://github.com/ml5js/ml5-examples/blob/development/p5js/PoseNet/PoseNet_webcam/sketch.js
	https://www.youtube.com/playlist?list=PLRqwX-V7Uu6YPSwT06y_AEYTqIwbeam3y
*/

// console.log('ml5 version:', ml5.version);

let video
let poseNet;
let poses = [];

// let pose
// let skeleton;

function setup() {
	createCanvas(windowWidth, windowHeight);
	video = createCapture(VIDEO);
	poseNet = ml5.poseNet(video, () => console.log('Pose Loaded!'));
	// An event listener that returns the results when a pose is detected.
	poseNet.on('pose', (results) => poses = results);
	// Hide the video element, and just show the canvas
	video.hide();
}

function draw() {
	translate(video.width, 0);
	scale(-1, 1);
	image(video, 0, 0);
	// if (pose) {
	// 	for (let i = 0; i < pose.keypoints.length; i++) {
	// 		let x = pose.keypoints[i].position.x;
	// 		let y = pose.keypoints[i].position.y;
	// 		fill(0,0,255);
	// 		ellipse(x, y, 16, 16);
	// 	}
	// 	for (let i = 0; i < skeleton.length; i++) {
	// 		let a = skeleton[i][0]
	// 		let b = skeleton[i][1]
	// 		strokeWeight(2);
	// 		stroke(255);
	// 		line(a.position.x, a.position.y, b.position.x, b.position.y);
	// 	}
	// }
	drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
