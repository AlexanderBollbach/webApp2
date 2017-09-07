import Entity from './Entity'

export default class EntityManager {

	constructor() {
		this.entities = []
		this.currentID = 0
		this.selectedEntity = null;
	}

	add(x,y,size) {
		const e = new Entity()
		e.position.x = x
		e.position.y = y
		e.size = size
		e.id = this.currentID
		this.currentID += 1
		this.entities.push(e)

		this.select(e)
	}

	find(x,y) {
		var foundEntity
		this.entities.forEach(entity => {
			const d = dist(entity.position.x, entity.position.y, x, y);
			if (d < entity.size) { foundEntity = entity }
		})
		if (foundEntity) { 
			return foundEntity 
		}
	}

	select(entity) {
		this.entities.forEach(entity => (entity.isSelected = false))
		entity.isSelected = true
		this.selectedEntity = entity
	}


	selectByID(id) {
		this.select(this.entities[id])
	}
}



function diff (num1, num2) {
	if (num1 > num2) {
		return (num1 - num2);
	} else {
		return (num2 - num1);
	}
};


function dist (x1, y1, x2, y2) {
	var deltaX = diff(x1, x2)
	var deltaY = diff(y1, y2)
	var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
	return (dist);
};