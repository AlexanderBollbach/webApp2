import React from 'react'
import PropTypes from 'prop-types';
import '../styles.css';


export default class Node extends React.Component {

	static contextTypes = {
		getCanvas: PropTypes.func
	}

	componentDidMount() {

		// this.oscillator = this.context.audio.createOscillator()
		// const gainNode = this.context.audio.createGain();
		// this.oscillator.connect(gainNode);
		// gainNode.connect(this.context.audio.destination)
		// gainNode.gain.value = 0.01
		// this.oscillator.type = 'square';
		// console.log(this.props.frequency)
		// this.oscillator.frequency.value = this.props.frequency;
		// this.oscillator.start();
	}

	render() {	
		const canvas = this.context.getCanvas()
		console.log(canvas);
		if (canvas) {
			const ctx = canvas.getContext('2d')
			ctx.fillStyle = "red"
			const x = this.props.details.x * canvas.clientWidth
			const y = this.props.details.y * canvas.clientHeight
			const width = this.props.details.width * canvas.clientWidth
			const height = this.props.details.height * canvas.clientHeight
			// this.oscillator.frequency.value = this.props.details.x * 2000
			ctx.fillRect(x, y, width, height)
		}

		return <div>{this.props.children}</div>
	}
}



