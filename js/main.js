let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

function init() {
	handleResize();

	// Set up event listeners.
	window.addEventListener('resize', handleResize);
	// Kick off the update loop
	window.requestAnimationFrame(everyFrame);
}

// TODO: Handle framerate/game updating in separate loops (e.g. https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing)
function everyFrame() {
	update();
	render();
	requestAnimationFrame(everyFrame);
}

function update() {
}

function render() {
}

function handleResize(evt) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	render();
}

init();