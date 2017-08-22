import React from 'react'
import PropTypes from 'prop-types';
import '../styles.css';
import Stage from './Stage'
import Utils from '../Helpers/utils'

export default class Renderer extends React.Component {

	constructor() {
		super()
		this.getCanvas = this.getCanvas.bind(this)
	}

	getCanvas() {
		return this.canvas;
	}

	static childContextTypes = {
		getCanvas: PropTypes.func
	}

	getChildContext() {
		console.log("getChildContext")
		console.log(this.getCanvas)
		return {
			getCanvas: this.getCanvas
		};
	}

	render() {	
		return (
			<div className="CanvasHolder" key={0}>
			
			<canvas key={0} className="MainCanvas" 

			ref= { 
				canvas => { 
					this.canvas =  canvas
					}
				}

			 />

			<Stage />
			</div>
			)
	}
}