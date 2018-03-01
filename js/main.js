let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

function init() {
	handleResize();

	// Set up event listeners.
	window.addEventListener('resize', handleResize);
	// Kick off the update loop
	window.requestAnimationFrame(everyFrame);
}

function everyFrame() {
	update();
	render();
	requestAnimationFrame(everyFrame);
}

function update() {
}

function render() {
	const lineGap = 20;
	let ms = Date.now();

	// Clear last frame
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw lines
	context.beginPath();
	context.strokeStyle = 'blue';
	context.lineWidth = 2;
	for (let y = 0.5 * lineGap; y < canvas.height + lineGap; y += lineGap) {
		context.moveTo(0, y)
		for (let x = 0; x < canvas.width + 30; x += 1) {
			let sineVal = (x / 5 + ms / 100);
			let sineAmt = Math.sin((x - y) / 300 + ms / 500);
			sineAmt = 0.5 + 0.5 * sineAmt;
			sineAmt = easeInOut(sineAmt);
			context.lineTo(x, y + 0.4 * lineGap * sineAmt * Math.sin(sineVal));
		}
	}
	context.stroke();
}

function easeInOut(t) {
	let tSq = t * t;
	return tSq / (2 * tSq - 2 * t + 1);
}

function handleResize(evt) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	render();
}

init();