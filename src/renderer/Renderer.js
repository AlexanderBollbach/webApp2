import React from 'react'
import PropTypes from 'prop-types';
import '../styles.css';
import Stage from './Stage'
import Utils from '../Helpers/utils'

export default class Renderer extends React.Component {

	constructor() {
		super()
		this.getCanvas = this.getCanvas.bind(this)
		this.getAudioContext = this.getAudioContext.bind(this)
		this.audioContext = new AudioContext();
	}

	getCanvas() {
		return this.canvas;
	}

	getAudioContext() {
		return this.audioContext
	}

	static childContextTypes = {
		getCanvas: PropTypes.func,
		getAudioContext: PropTypes.func,
	}

	getChildContext() {
		return {
			getCanvas: this.getCanvas,
			getAudioContext: this.getAudioContext,
		};
	}


	refCB = (ref) => {
		this.canvas = ref
	}

	render() {	
		return (
			<div className="CanvasHolder" key={0}>
			<canvas key={0} className="MainCanvas" ref= { this.refCB } />
				<Stage />
				</div>
			)
	}
}