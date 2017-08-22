
import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import './styles.css';


import { Link } from 'react-router-dom'

import Renderer from './renderer/Renderer'
import ScratchPad from './scratchPad/ScratchPad'


onload = function() {
	console.log("onload");
}

function Nav() {	
		return (
			<ul className='nav'>
			<li><Link to='/scratchPad'>scratch pad</Link></li>
			<li><Link to='/renderer'>renderer</Link></li>
			<li><Link to='/test'>test</Link></li>
			</ul>
			)
	
}


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
			<Route path='/renderer' component={Renderer} />
			<Route path='/test' component={Test} />
			<Route path="/scratchPad" component={ScratchPad} />
			</div>
			</Router>
			)
	}
}

ReactDom.render(<App />, document.getElementById('root'))

