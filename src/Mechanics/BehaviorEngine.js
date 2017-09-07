export default class BehaviorEngine {

	constructor() {
		

		this.SPEED = 0.01
	}
	
	update(entities) {


		
		if (entities.length == 0) {
			
			return
		}




		

		entities.forEach(entity => {
			entity.isTouching = false
		})

		entities.forEach(entity => {


				// RIGHT
				if (entity.position.x > (1.0 - entity.size)) {

					entity.direction.x = (Math.random() * -1) * this.SPEED
				}
				// LEFT
				if (entity.position.x - entity.size < 0.0) {

					entity.direction.x = (Math.random() * 1) * this.SPEED
				}
				//	 bottom
				if (entity.position.y + entity.size > 1.0) {

					entity.direction.y = (Math.random() * -1) * this.SPEED
				}
				// TOP SIDE
				if (entity.position.y - entity.size < 0.0) {

					entity.direction.y = (Math.random() * 1) * this.SPEED
				}
			})

		entities.forEach(entity => {
			entity.position.x += entity.direction.x
			entity.position.y += entity.direction.y
		})
	}

	



	// 	this.nodeManager.nodes.forEach(thisNode => {	
	// 		var isTouching = false
	// 		this.nodeManager.nodes.forEach(otherNode => {
	// 			if (thisNode == otherNode) return;
	// 			const d = dist(otherNode.x, otherNode.y, thisNode.x, thisNode.y);
	// 			if (d < thisNode.size + otherNode.size) { 
	// 				isTouching = true;
	// 			// move away from touching node
	// 			if (!(thisNode == this.selectedNode && this.isDragging) && thisNode.size < otherNode.size) {
	// 				thisNode.x += (otherNode.x > thisNode.x) ? -this.SPEED : this.SPEED
	// 				thisNode.y += (otherNode.y > thisNode.y) ? -this.SPEED : this.SPEED
	// 			}
	// 		}
	// 	});
	// 		thisNode.isTouching = isTouching
	// 	});	
	// }

}