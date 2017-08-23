
import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom'

import Renderer from './renderer/Renderer'
import Nav from './Nav'

class Test extends React.Component {
	constructor() {
		super()
		console.log("constructor")
	}
	render() {
		return <div>test</div>
	}
}

class App extends React.Component {
	render() {
		return (
			<Router>
			<div>
			<Nav />
			<Route path="/test" component={Test} />
			<Route path="/renderer" component={Renderer} />
			</div>
			</Router>
			)
	}
}

ReactDom.render(<App />, document.getElementById('root'))

