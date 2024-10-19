const faceColor = document.getElementById('face-color');
const borderColor = document.getElementById('border-color');
const lineColor = document.getElementById('line-color');
const largeHandColor = document.getElementById('large-hand-color');
const secondHandColor = document.getElementById('second-hand-color');
const canvas = document.getElementById('canvas');

function clock() {
	const now = new Date();
	const ctx = canvas.getContext('2d');

	// Setup Canvas
	ctx.save(); // save the default state
	ctx.clearRect(0, 0, 500, 500);
	ctx.translate(250, 250); // put the cursor in the middle (0, 0)
	ctx.rotate(-Math.PI / 2); // rotate clock by 90deg

	// Set default styles
	ctx.strokeStyle = '#000000';
	ctx.fillStyle = '#f4f4f4';
	ctx.lineWidth = 5;
	ctx.lineCap = 'round';

	// Draw Clock face
	ctx.save();

	ctx.beginPath();
	ctx.fillStyle = faceColor.value;
	ctx.strokeStyle = borderColor.value;
	ctx.lineWidth = 14;
	ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
	ctx.stroke();
	ctx.fill();

	ctx.restore();

	// Draw Hour marks

	ctx.save();
    ctx.strokeStyle = lineColor.value;

	for (let i = 0; i < 12; i++) {
		ctx.beginPath();
		ctx.rotate(Math.PI / 6);
		ctx.moveTo(100, 0);
		ctx.lineTo(120, 0);
		ctx.stroke();
	}

	ctx.restore();

	// Draw Minute marks

	ctx.save();
	ctx.lineWidth = 4;
    ctx.strokeStyle = lineColor.value;

	for (let i = 0; i < 60; i++) {
		if (i % 5 !== 0) {
			ctx.beginPath();
			ctx.moveTo(117, 0);
			ctx.lineTo(120, 0);
			ctx.stroke();
		}
		ctx.rotate(Math.PI / 30);
	}

	ctx.restore();

	// Current time

	const hr = now.getHours() % 12;
	const min = now.getMinutes();
	const sec = now.getSeconds();

	// Draw Hour hand

	ctx.save();

	ctx.rotate(
		(Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
	);
	ctx.strokeStyle = largeHandColor.value;
	ctx.lineWidth = 14;
	ctx.beginPath();
	ctx.moveTo(-20, 0);
	ctx.lineTo(50, 0);
	ctx.stroke();

	ctx.restore();

	// Draw Minute hand

	ctx.save();

	ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
	ctx.strokeStyle = largeHandColor.value;
	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.moveTo(-28, 0);
	ctx.lineTo(80, 0);
	ctx.stroke();

	ctx.restore();

	// Draw Second hand

	ctx.save();

	ctx.rotate((Math.PI / 30) * sec);
	ctx.strokeStyle = secondHandColor.value;
	ctx.lineWidth = 6;
	ctx.beginPath();
	ctx.moveTo(-30, 0);
	ctx.lineTo(100, 0);
	ctx.stroke();

	ctx.fillStyle = '#FF7F50';
	ctx.beginPath();
	ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
	ctx.fill();

	ctx.restore();

	ctx.restore(); // restore default state

	requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

document.getElementById('save-btn').addEventListener('click', ()=>{
    const dataURL = canvas.toDataURL('image/png')
    const link = document.createElement('a')

    link.download = 'clock.png'
    link.href = dataURL
    link.click()
})