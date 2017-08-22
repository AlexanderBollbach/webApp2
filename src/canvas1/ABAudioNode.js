import React from 'react'

class ABAudioNode extends React.Component {
	

	constructor(props) {
		super(props)

		this.context = new AudioContext()
		console.log(this.context);

		var osc = this.context.createOscillator();

		var gain = this.context.createGain()

		gain.gain.value = this.props.volume

		osc.connect(gain)
		osc.frequency.value = this.props.frequency
		gain.connect(this.context.destination)

		osc.start(this.context.currentTime);
		
	}


	componentDidMount() {
		

	}


	render() {
		return <div />
	}
}

export default ABAudioNode