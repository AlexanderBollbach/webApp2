import React from 'react'
import PropTypes from 'prop-types';
import '../styles.css';

global.test = function() { // TODO: for debugging global stuff like audio for now..
	console.log("global func works?")
}

export default class Node extends React.Component {

	constructor() {
		super()
		this.frequency = 400
		this.volume = 0.5

	}

	static contextTypes = {
		getCanvas: PropTypes.func,
		getAudioContext: PropTypes.func,
	}


	componentWillUnMount() {
		this.scriptNode.disconnect();
	}


	componentDidMount() {

		console.log("cdm in node")

		const audioCtx = this.context.getAudioContext()

		var phase = 0
		
		this.scriptNode = audioCtx.createScriptProcessor(512, 1, 1);

		this.scriptNode.onaudioprocess = (e) => {

			const phaseIncrement = 2 * Math.PI * this.frequency / audioCtx.sampleRate

			var buffer = e.outputBuffer.getChannelData(0);

			for (var i = 0; i < buffer.length; i++) {

				phase = phase + phaseIncrement
				
				var thisSample = Math.sin(phase) * this.volume
				buffer[i] = thisSample

				if (phase >= (2 * Math.PI)) {
					phase = phase - (2 * Math.PI)
				}
			}
		}

		if (audioCtx) {
			this.scriptNode.connect(audioCtx.destination)
		}
	}

	render() {	

		const canvas = this.context.getCanvas()
		const audioCtx = this.context.getAudioContext()

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

		
		this.frequency = this.props.details.frequency
		this.volume = this.props.details.volume

		return <div>{this.props.children}</div>
	}
}



