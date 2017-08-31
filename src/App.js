
import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Instrument1Container from './Instrument1/Instrument1Container'
import { NavLink } from 'react-router-dom'
import './styles.css'

function Test1() {
	return <div> test 1<br />
	test 1<br />
	test 1<br />
	test 1<br />
	</div>
}

function Nav() {
	
	const container = {
		display: "flex",
		backgroundColor: "black",
		justifyContent: "flex-start",
		alignItems: "center",
	}
	const element = {
		backgroundColor: "rgb(60,50,80)",
		color: "white",
		padding: "5px",
		textDecoration: "none",
		
		margin: "1%",
		height: "75%",
	}
	const active = {
		backgroundColor: "rgb(60,60,120)",
		border: "2px dashed white",
	}
	return (
		<div style={container}>
		<NavLink activeStyle={active} style={element} to="/instrument1">pageA</NavLink>
		<NavLink activeStyle={active} style={element} to="/test1">pageB</NavLink>
		</div>
		)
}



class App extends React.Component {

	render() {
		const appContainerStyle = {
			width: "80%",	
			height: "80vh",
			marginLeft: "auto",
			marginRight: "auto",
			marginTop: "10px",
			display: "grid",
			gridTemplateRows: "1fr 7fr",
		}
		const content = {
			backgroundColor: "purple",
		}

		return (
			<Router>
			<div style={appContainerStyle}>
			<Nav />
			<div style={content}>
			<Route exact path="/instrument1" component={Instrument1Container} />
			<Route exact path="/Test1" component={Test1} />
			</div>
			</div>
			</Router>
			)


	}
}

ReactDom.render(<App />, document.getElementById('root'))

