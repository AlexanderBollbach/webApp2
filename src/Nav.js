import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav() {
	
	const container = {
		display: "flex",
		marginBottom: "25px",
		padding: "10px"
	}

	const element = {
		backgroundColor: "red",
		spacing: "20px",
		marginLeft: "10px",
	}

	const active = {
		backgroundColor: "purple",
	}

	return (
		<div style={container}>
		<NavLink activeStyle={active} style={element} to="/test">test</NavLink>
		<NavLink activeStyle={active}  style={element} to="/renderer">renderer</NavLink>
		</div>
		)
}

