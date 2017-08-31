import React from 'react'

class NodeButton extends React.Component {
	
	constructor() {
		super()
		this.tapped = this.tapped.bind(this)
	}

	tapped() { this.props.tappedWithId(this.id) }

	componentDidMount() {
		this.id = this.props.id
	}

	render() {
		const s = {
			backgroundColor: "#4CAF50",
			border: "none",
			color: "white",
			height: "50px",
			// width: "150px",
			padding: "2%",
			textAlign: "center",
			textDecoration: "none",
			display: "inline-block",
			fontSize: "10px",
		}
		return (
			<button style={s} onClick={this.tapped}>Node</button>
			)
	}
}

export default class NodePicker extends React.Component {
	
	constructor() {
		super()
		this.clickedNode = this.clickedNode.bind(this)
	}

	clickedNode(id) { this.props.selectNodeWithId(id) }

	render() {
		const s = {
			display: "grid",
			gridTemplateColumns: "1fr 1fr 1fr 1fr",
			gridTemplateRows: "1fr 1fr 1fr 1fr",
			gridGap: "20px",
			padding: "5%",
			overflow: "hidden",
		}
		const nodes = this.props.nodes.map((node,idx) => {
			return (
				<NodeButton key={idx} id={idx} 
				tappedWithId= { 
					(id) => { this.clickedNode(id) } 
				} />
				)
		})
		return (<div style={s}>{nodes}</div>)
	}
}
