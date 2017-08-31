import React from 'react'
import Slider from './Slider'

export default class Panel extends React.Component {

	constructor(props) {
		super(props)
		this.prop1Changed = this.prop1Changed.bind(this)
		this.prop2Changed = this.prop2Changed.bind(this)
		this.prop3Changed = this.prop3Changed.bind(this)
	}

	prop1Changed(newValue) {
		this.props.node.setFrequency(newValue)
	}
	prop2Changed(newValue) {
		this.props.node.setVolume(newValue)
	}
	prop3Changed(newValue) {
		this.props.node.setSize(newValue)
	}

	render() {
		const container = {
			display: "grid",
			backgroundColor: "rgb(60,60,120)",
		}
		const element = {
			backgroundColor: "rgb(60,40,100)",
			padding: "10px",
			color: "white",
			textAlign: "center",
		}
		return (
			<div style={container}> 
			<div style={element}>Node: {this.props.node.id}</div>
			<Slider valueChanged={this.prop1Changed} initialValue={this.props.node.getFrequency() } title="frequency" />
			<Slider valueChanged={this.prop2Changed} initialValue={this.props.node.getVolume() } title="volume" />
			<Slider valueChanged={this.prop3Changed} initialValue={this.props.node.getSize() } title="size" />
			<button onClick={ () => { this.props.deleteNode(this.props.node) } }>delete</button>
			</div>
			)
	}
}