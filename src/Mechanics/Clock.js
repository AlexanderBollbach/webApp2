export default class Clock {
	constructor(updateFunction) {
		this.counter = 0

		this.updateFunction = updateFunction

		this.update = this.update.bind(this)
		this.update()
	}

	update() {
		
		this.timer = requestAnimationFrame(this.update)
		this.counter += 1

		if (this.counter % 2 == 0) {
			this.updateFunction(this.counter)
		}
	}
}