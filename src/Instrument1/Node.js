export default class Node {
	
	constructor(id, size, audioContext) {

		this.volume = 1
		this.gain = 0.0;
		this.id = id
		this.frequency = 400
		this.closest = 0
		this.phase = 0
		this.isSelected = false;
		this.isDragging = false;
		
		this.x = Math.random()
		this.y = Math.random()
		this.size = size;
		this.isTouching = false;
		this.direction = {
			x: -0.008,
			y: -0.008, 
		}

		// this.scriptNode = audioContext.createScriptProcessor(512, 1, 1);
		
		// this.scriptNode.onaudioprocess = (e) => {
		// 	const phaseIncrement = 2 * Math.PI * this.frequency / audioContext.sampleRate
		// 	var buffer = e.outputBuffer.getChannelData(0);

		// 	for (var i = 0; i < buffer.length; i++) {
		// 		this.phase = this.phase + phaseIncrement

		// 		var thisSample = Math.sin(this.phase) * this.volume * this.gain * Math.sqrt(1 - this.closest)

		// 		buffer[i] = thisSample
		// 		if (this.phase >= (2 * Math.PI)) {
		// 			this.phase = this.phase - (2 * Math.PI)
		// 		}
		// 	}
		// }
		
		// this.scriptNode.connect(audioContext.destination)
	}

	// takes values in [0-1] range
	setFrequency(value) {
		this.frequency = value * 10000
	}

	setVolume(value) {
		this.volume = value / 10.0
	}

	setSize(value) {
		this.size = value
	}

	// returns values in range [0-1]

	getFrequency() {
		return this.frequency / 10000
	}

	getVolume() {
		return this.volume * 10
	}

	getSize() {
		return this.size;
	}
}