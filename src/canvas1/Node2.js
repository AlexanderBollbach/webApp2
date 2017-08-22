
import React from 'react'

export default class Node2 extends React.Component {


	constructor(props) {
		super(props)


		this.state = {
			context: props.context,
			x: props.x,
			y: props.y
		}
	}


	render() {

		var ctx = this.state.context

		ctx.fillStyle = 'rgb(1,0,0)'

		ctx.fillRect(
			this.state.x * ctx.canvas.clientWidth, 
			this.state.y * ctx.canvas.clientHeight, 
			ctx.canvas.clientWidth / 10, 
			ctx.canvas.clientHeight / 10
			);


		return <div />
	}
}