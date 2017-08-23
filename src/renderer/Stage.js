
import React from 'react'
import PropTypes from 'prop-types';
import Node from './Node'
import '../styles.css';

import World from './World'

export default class Stage extends React.Component {

	static contextTypes = {
		getCanvas: PropTypes.func,

	}

	constructor(props) {
		super(props)
		this.tick = this.tick.bind(this);
		this.world = new World(6)

		this.state = {
			nodes: [],
		}
	}

	componentDidMount() {
		if (this.timer == null) {
			var timerFunction = (function() { this.tick() }).bind(this)
			this.timer = setInterval(timerFunction, 10);	
		}
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	tick() {
		const newNodes = this.world.getNodes()
		this.setState({nodes: newNodes})
	}

	render() {
		this.clearCanvas()

		return (
			<div>
			{true && this.state.nodes.map((node,idx) => <Node details={node} key={idx} frequency={node.frequency} /> ) }
			</div>
			)
	}

	clearCanvas() {
		const canvas = this.context.getCanvas();

		if (canvas) {
			// console.log(canvas.test);
			const ctx = canvas.getContext('2d')

			const width = canvas.clientWidth
			const height = canvas.clientHeight
			
			ctx.clearRect(0,0,width,height)

			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;
		}
	}
}

