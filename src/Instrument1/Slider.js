import React from 'react'

export default class Slider extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			value: props.initialValue * 100
		}
		this.sliderChanged = this.sliderChanged.bind(this)
	}

	sliderChanged(e) {
		const newValue = parseInt(e.target.value)
		this.setState({ 
			value: newValue
		});
		this.props.valueChanged(newValue / 100)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			value: nextProps.initialValue * 100
		})
	}
	render() {
		const containerStyle = {
			display: "grid",
			gridTemplateRows: "2fr 3fr",
			textAlign: "center",
		}
		const titleStyle = {
			backgroundColor: "rgb(50,10,50)",
			color: "white",
			textAlign: "center",
		}
		const sliderStyle = {
			backgroundColor: "rgb(10,60,120)",
		}
		return (
			<div style={containerStyle}>
			<div style={titleStyle}>{this.props.title}</div>
			<div style={sliderStyle}>
			<input 
			type="range" 
			min={0}
			max={100}
			value={this.state.value} 
			onChange={this.sliderChanged} />
			</div>
			</div>
			)
	}
}