import React from "react";
import { NavLink } from 'react-router-dom'

export default function Nav() {
	const container = {
		display: "flex",
		backgroundColor: "black",
		justifyContent: "flex-start",
		alignItems: "center"
	};
	const element = {
		backgroundColor: "rgb(60,50,80)",
		color: "white",
		padding: "5px",
		textDecoration: "none",

		margin: "1%",
		height: "75%"
	};
	const active = {
		backgroundColor: "rgb(60,60,120)",
		border: "2px dashed white"
	};
	return (
		<div style={container}>
			<NavLink activeStyle={active} style={element} to="/panel">
				Panel
			</NavLink>
			<NavLink activeStyle={active} style={element} to="/picker">
				Picker
			</NavLink>
			
		</div>
	);
}