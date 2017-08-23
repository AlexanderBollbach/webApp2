export default class World {

	constructor(numberOfNodes) {

		this.nodes = []
		this.gain = 0.4

		Array(numberOfNodes).fill().map((_, i) => {

			this.nodes.push(
			{
				id: i,
				x: 0.0, 
				y: 0.0,
				width: 0.05,
				height: 0.2, 
				direction: { 
					x: 0.01, 
					y: 0.01 
				} ,
				frequency: 440,
				volume: 0.5
				
			})
		})
	}	

	 getNodes() {
		this.nodes.forEach(node => {

			if (node.x > (1.0 - node.width)) {
				node.direction.x = (Math.random() * -1) * 0.01
			} else if (node.x < 0.0) {
				node.direction.x = (Math.random() * 1) * 0.03
			}

			if (node.y > (1.0 - node.height)) {
				node.direction.y = (Math.random() * -1) * 0.01
			} else if (node.y < 0.0) {
				node.direction.y = (Math.random() * 1) * 0.1
			}

			node.frequency = (node.x * 1000) + 500
			node.volume = node.y * this.gain

			node.x += node.direction.x
			node.y += node.direction.y
		})

		const newNodes = this.nodes.slice()
		return newNodes
	}
}