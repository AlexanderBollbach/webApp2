
import Node from './Node'
import React from 'react'
import ReactDom from 'react-dom';

import Panel from './Panel'
import NodePicker from './NodePicker'



export default class World {

	updateCanvasSize() {
		this.canvas.width = this.canvas.clientWidth
		this.canvas.height = this.canvas.clientWidth
	}

	setupDomStructure(hostElement) {

		this.containerDiv = document.createElement('div');

		hostElement.appendChild(this.containerDiv)

		this.containerDiv.style.height = "100%"
		this.containerDiv.style.padding = "1%"
		this.containerDiv.style.backgroundColor = "rgb(60,50,80)"
		this.containerDiv.style.display = "grid"
		this.containerDiv.style.gridTemplateColumns = "1fr 1fr 1fr"
		this.containerDiv.style.gridGap = "2%"

		this.canvasContainer = document.createElement('div')
		this.canvasContainer.style.backgroundColor = 'black'
		this.canvasContainer.style.gridColumnStart = "1"
		this.canvasContainer.style.gridColumnEnd = "2"

		this.controls1Container = document.createElement('div')
		this.controls1Container.style.backgroundColor = "rgb(10,60,12)",
		this.controls1Container.style.gridColumnStart = "2"

		this.controls2Container = document.createElement('div')
		this.controls2Container.style.backgroundColor = "rgb(60,70,100)"
		this.controls2Container.style.gridColumnStart = "3"

		this.canvas = document.createElement('canvas');
		// this.canvas.style.height = "100%"
		// this.canvas.style.width = "100%"
		this.canvasContainer.appendChild(this.canvas)
		this.canvas.style.display = "block"
		this.canvas.style.backgroundColor = "white"
		
		this.containerDiv.appendChild(this.canvasContainer);
		this.containerDiv.appendChild(this.controls1Container)
		this.containerDiv.appendChild(this.controls2Container)
	}

	constructor(hostElement, numberOfNodes, size) {

		this.SPEED = 0.01
		this.selectedNode = null;
		this.isDragging = false;
		this.nodes = []
		// this.gain = 0.0
		
		// this.audioContext = new AudioContext()
		
		this.setupDomStructure(hostElement)
		
		this.ctx = this.canvas.getContext('2d')
		

		this.updateCanvasSize = this.updateCanvasSize.bind(this)
		this.update = this.update.bind(this)
		this.animationID = requestAnimationFrame(this.update)
		this.deleteNode = this.deleteNode.bind(this)

		// configure Nodes
		Array(numberOfNodes).fill().map((_, i) => {
			const newNode = new Node(i, this.audioContext)
			newNode.size = size
			this.nodes.push(newNode)
		})


		this.updateCanvasSize()

		window.onresize = (e) => {
			this.updateCanvasSize()
		}
		

		this.canvas.onmousedown = (e) => {
			this.nodes.forEach(n => (n.isSelected = false))
			this.selectedNode = null;

			const x = e.offsetX / this.canvas.width 
			const y = e.offsetY / this.canvas.height
			const n = this.findNodeAtPoint(x, y)

			if (n) {
				this.isDragging = true
				this.selectNode(n)
			}
		}
		this.canvas.onmousemove = (e) => {
			const x = e.offsetX / this.canvas.width 
			const y = e.offsetY / this.canvas.height
			// move node manually
			if (this.isDragging && this.selectedNode) {
				this.selectedNode.x = x
				this.selectedNode.y = y
			}
		} 
		this.canvas.onmouseup = (e) => {
			if (this.selectedNode) {
				this.selectedNode.isDragging = false	
			}		
			this.isDragging = false
		}


		// NODE PICKER PANEL		
		ReactDom.render(<NodePicker selectNodeWithId={
			(id) => {
				console.log(this)
				this.selectNode(this.nodes[id]) 
			}
		} nodes={this.nodes} />, this.controls2Container)

		this.selectNode(this.nodes[0])
	}



	deleteNode(n) {
		console.log(this)
		// console.log(this.nodes.indexOf(n))
	}



	selectNode(node) {
		this.nodes.forEach(node => (node.isSelected = false))
		this.selectedNode = node
		node.isSelected = true
		ReactDom.render(<Panel node={node} deleteNode={this.deleteNode} />, this.controls1Container)
	}

	findNodeAtPoint(x,y) {
		var selectedNode
		this.nodes.forEach(node => {
			const d = dist(node.x, node.y, x, y);
			if (d < node.size) { selectedNode = node }
		})
		if (selectedNode) { return selectedNode }
	}



update() {
	this.clearCanvas()
	this.updateNodes()
	this.renderNodes()
	this.animationID = requestAnimationFrame(this.update);
}

clearCanvas() {
	if (!this.ctx) {  return  }
		const width = this.canvas.width
	const height = this.canvas.height
	this.ctx.clearRect(0,0,width,height)
}

renderNodes() {
	if (!this.ctx) { return }
		for (var i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i]
			const x = node.x * this.canvas.width
			const y = node.y * this.canvas.height
			const size = node.size * this.canvas.width
			this.ctx.beginPath();
			this.ctx.arc(x, y, size, 0, 2 * Math.PI, false);
			
			if (node.isSelected) {
				this.ctx.strokeStyle = 'black'
				this.ctx.lineWidth = 15
			} else {
				this.ctx.lineWidth = 5
				this.ctx.strokeStyle = 'black'
			}
			
			this.ctx.fillStyle = node.isTouching ? 'red' : "green"
			this.ctx.stroke()
			this.ctx.fill()
			this.ctx.closePath()
		}
}

updateNodes() {

	const aspectRatio =  this.canvas.height / this.canvas.width

	this.nodes.forEach(node => {	
		node.isTouching = false
	});

	var f = (side, node) => {
		console.log(side)
		console.log("x: " + node.x)
		console.log("y: " + node.y)
	}

	this.nodes.forEach(node => {

				// RIGHT
				if (node.x > (1.0 - node.size)) {
					if (node.isDragging) f("right", node)
						node.direction.x = (Math.random() * -1) * this.SPEED
				}
				// LEFT
				if (node.x - node.size < 0.0) {
					if (node.isDragging) f("left", node)
						node.direction.x = (Math.random() * 1) * this.SPEED
				}
				// bottom
				if (node.y + node.size > 1.0) {
					if (node.isDragging) f("bottom", node)
						node.direction.y = (Math.random() * -1) * this.SPEED
				}
				// TOP SIDE
				if (node.y - node.size < 0.0) {
					if (node.isDragging) f("top", node)
						node.direction.y = (Math.random() * 1) * this.SPEED
				}


				if (!(node == this.selectNode && this.isDragging)) {
					node.x += node.direction.x
					node.y += node.direction.y
				}
			});	



	this.nodes.forEach(thisNode => {	
		var isTouching = false
		this.nodes.forEach(otherNode => {
			if (thisNode == otherNode) return;
			const d = dist(otherNode.x, otherNode.y, thisNode.x, thisNode.y);
			if (d < thisNode.size + otherNode.size) { 
				isTouching = true;
				// move away from touching node
				thisNode.x += (otherNode.x > thisNode.x) ? -this.SPEED : this.SPEED
				thisNode.y += (otherNode.y > thisNode.y) ? -this.SPEED : this.SPEED
			}
		});
		thisNode.isTouching = isTouching
	});	
}




destroy() {
	cancelAnimationFrame(this.animationID);

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