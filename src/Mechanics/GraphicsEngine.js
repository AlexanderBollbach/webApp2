export default class GraphicsEngine {

	constructor() {
		
		this.context = null
	}

	render(entities) {

		if (!this.context) {
			return
		}

		// console.log(this.context)
		
		const width = this.context.canvas.width
		const height = this.context.canvas.height
		this.context.clearRect(0, 0, width, height)



		var renderEntity = function(entity) {

			if (!this.context) {
				return
			}

			const x = entity.position.x * this.context.canvas.width
			const y = entity.position.y * this.context.canvas.height

			const size = entity.size * this.context.canvas.width

			this.context.beginPath();


			if (entity.isSelected) {
				this.context.strokeStyle = 'black'
				this.context.lineWidth = 10
			} else {
				this.context.lineWidth = 1
				this.context.strokeStyle = 'black'
			}

			this.context.arc(x, y, size, 0, 2 * Math.PI, false);	



			this.context.fillStyle = entity.isTouching ? 'red' : "green"
			this.context.stroke()
			this.context.fill()
			this.context.closePath()
		}.bind(this)


		entities.map(e => {
			renderEntity(e)
		})
	}
	
}

