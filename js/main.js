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
		let yAmt = 2 * y / canvas.height;
		let gap = 1 - Math.sqrt(1 - (yAmt - 1) * (yAmt - 1));
		let started = false;
		for (let x = 0.5 * gap * canvas.width; x < (1 - 0.5 * gap) * canvas.width; x ++) {
			let sineVal = (x / 5 + ms / 100);
			let sineAmt = Math.sin((x - y) / 300 + ms / 500);
			sineAmt = 0.5 + 0.5 * sineAmt;
			sineAmt = easeInOut(sineAmt, 1.5);
			if (started) {
				context.lineTo(x, y + 0.4 * lineGap * sineAmt * Math.sin(sineVal));
			}
			else {
				context.moveTo(x, y + 0.4 * lineGap * sineAmt * Math.sin(sineVal));
				started = true;
			}
		}
	}
	context.stroke();
}

function easeInOut(t, amt) {
	let tPow = Math.pow(t, amt);
	return tPow / (tPow + Math.pow(1 - t, amt));
}

function handleResize(evt) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	render();
}

init();