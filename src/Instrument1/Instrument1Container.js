import React from 'react'
import World from './World'

export default class Instrument1Container extends React.Component {
	refCB = (ref) => { 
		if (this.world == null) {
			this.world = new World(ref, 2, 0.033) 	
		}
	}
	componentWillUnmount() {
		this.world.destroy()
	}
	render() {	
		const style = {
			backgroundColor: "blue",
			width: "100%",
			height: "100%",			
		}
		return <div style={style} ref={this.refCB} />
	}
}



