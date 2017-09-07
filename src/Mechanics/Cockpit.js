
import Entity from './Entity'
import EntityManager from './EntityManager'
import Clock from './Clock'
import GraphicsEngine from './GraphicsEngine'
import BehaviorEngine from './BehaviorEngine'

export default class Cockpit {

	constructor(entityManager) {

		this.entityManager = entityManager

		this.graphicsEngine = new GraphicsEngine()
		this.behaviorEngine = new BehaviorEngine()
		
		this.clock = new Clock((time) => {
			this.behaviorEngine.update(this.entityManager.entities)
			this.graphicsEngine.render(this.entityManager.entities)
		})	
	}

	updateCanvas(canvas) {
		this.canvas = canvas
		this.context = this.canvas && this.canvas.getContext('2d')
		this.graphicsEngine.context = this.context
	}
}




