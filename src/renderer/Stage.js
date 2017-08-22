
import React from 'react'
import PropTypes from 'prop-types';
import Node from './Node'
import '../styles.css';

export default class Stage extends React.Component {

	static contextTypes = {
		getCanvas: PropTypes.func
	}

	constructor(props) {
		super(props)
		this.state = initialNodes()
		this.tick = this.tick.bind(this);
	}

	componentDidMount() {
		if (this.timer == null) {
			var timerFunction = function() { this.tick() }.bind(this)
			this.timer = setInterval(timerFunction, 500);	
		}
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	tick() {
		const newNodes = updateNodeAttributes(this.state.nodes.slice())
		this.setState({nodes: newNodes})
	}

	render() {

		const canvas = this.context.getCanvas();

		if (canvas) {
			const ctx = canvas.getContext('2d')

			const width = canvas.clientWidth
			const height = canvas.clientHeight
			
			ctx.clearRect(0,0,width,height)

			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;
		}

		return (
			<div>
			{true && this.state.nodes.map((node,idx) => <Node details={node} key={idx} frequency={node.frequency} /> ) }
			</div>
			)
	}
}









// HELPERS

function updateNodeAttributes(nodes) {


	nodes.forEach(node => {

		if (node.x > (1.0 - node.width)) {
			node.direction.x = (Math.random() * -1) * 0.1
		} else if (node.x < 0.0) {
			node.direction.x = (Math.random() * 1) * 0.1
		}

		if (node.y > (1.0 - node.height)) {
			node.direction.y = (Math.random() * -1) * 0.005
		} else if (node.y < 0.0) {
			node.direction.y = (Math.random() * 1) * 0.005
		}

		node.x += node.direction.x
		node.y += node.direction.y
	})

	return nodes

}


function initialNodes() {
	var nodes = {
		nodes: [
		{
			x: 0.0, 
			y: 0.0,
			width: 0.05,
			height: 0.2, 
			direction: { 
				x: 0.01, 
				y: 0.01 
			} ,
			frequency: 440
		},



		]
	}
	return nodes;
}