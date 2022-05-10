// options
let speed = 0.05;
let octave = 4;
let fallOf = 0.5;
let xoffset = 0.05;
let yoffset = 0.05;

// sliders
let ss;
let os;
let fos;
let xs;
let ys;

// button
let rb;
let color;

let dimensions;

let start = 0;

function setup() {
	let container = "canvas-container";
	let cnv;
	if (window.innerWidth < window.innerHeight) {
		cnv = createCanvas(window.innerWidth, window.innerWidth);
	} else {
		cnv = createCanvas(window.innerHeight, window.innerHeight);
	}
	let div = document.querySelector("#" + container);
	div.style.height = height + 2 + "px";
	cnv.parent(container);
	
	// speed
	ss = createSlider(0, 1, speed, 0.0001);
	let sst = createSpan("Speed");
	
	// octave
	os = createSlider(1, 8, octave);
	let ost = createSpan("Octaves");
	
	// fallof
	fos = createSlider(0, 1, fallOf, 0.0001);
	let fost = createSpan("Fallof");
	
	xs = createSlider(-1, 1, xoffset, 0.0001);
	let xst = createSpan("X-offset");
	
	ys = createSlider(-1, 1, yoffset, 0.0001);
	let yst = createSpan("Y-offset");
	
	// reset
	rb = createButton("Reset");
	rb.mousePressed(reset);
	
	// color
	color = createColorPicker("black");
	
	dimensions = createSelect();
	dimensions.option("1D");
	dimensions.option("2D");
	dimensions.option("X-1D/2D");
	dimensions.option("Y-1D/2D");
	
	let elements = [sst, ss, ost, os, fost, fos, xst, xs, yst, ys, rb, dimensions, color];
	for (let i = 0; i < elements.length; i++) {
		elements[i].parent("settings");
		if (i === 10) {
			elements[i].class("col-3 btn btn-primary mt-4");
		} else if (i >= 11) {
			elements[i].class("col-3 form-control mt-4");
		} else if (i % 2 === 0) {
			elements[i].class("col-3 mt-3");
		} else {
			elements[i].class("col-9 custom-range mt-3");
		}
	}
}
function draw() {
	background(150);
	noiseDetail(os.value(), fos.value());
	speed = ss.value();
	if (dimensions.value() === "1D") {
		let xoff = start;
		stroke(color.color());
		strokeWeight(2);
		noFill();
		beginShape();
		for (let x = 0; x < width; x++) {
			let y = noise(xoff) * height;
			vertex(x, y);
			xoff += xs.value();
		}
		endShape();
	} else if (dimensions.value().slice(2) === "1D/2D") {
		let xoff = start;
		let yoff = start; 
		stroke(color.color());
		strokeWeight(2);
		noFill();
		beginShape();
		for (let x = 0; x < width; x++) {
			let y = noise(xoff, yoff) * height;
			vertex(x, y);
			if (dimensions.value()[0] === "X") {
				xoff += xs.value();
			} else {
				yoff += ys.value();
			}
		}
		endShape();
	} else {
		let cells = 50;
		let size = width / cells;
		let xoff = start;
		for (let x = 0; x < cells; x++) {
			let yoff = start;
			for (let y = 0; y < cells; y++) {
				let n = noise(xoff, yoff) * 255;
				let c = color.color();
				c.setAlpha(n);
				fill(c);
				noStroke();
				rect(x * size, y * size, size, size);
				yoff += ys.value();
			}
			xoff += xs.value();
		}
	}
	start += speed;
}
function reset() {
	location.reload();
}