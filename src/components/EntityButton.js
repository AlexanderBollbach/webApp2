import React from 'react'

export default class EntityButton extends React.Component {
	
	constructor() {
		super()
		this.clicked = this.clicked.bind(this)
	}

	clicked() { 
		this.props.clicked(this.props.id) 
	}

	componentDidMount() {
		
	}

	render() {

		console.log(this.props.selected)
		
		const s = {
			backgroundColor: "#4CAF50",
			border: "none",
			color: this.props.selected ? "blue" : "white",
			height: "50px",
			// width: "150px",
			padding: "2%",
			textAlign: "center",
			textDecoration: "none",
			display: "inline-block",
			fontSize: "10px",
		}
		return (
			<div style={s} onClick={this.clicked}>Entity: {this.props.id}</div>
			)
	}
}