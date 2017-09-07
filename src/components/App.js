import React from "react";
import EntitiesMenu from "./EntitiesMenu";
import Panel from './Panel'

export default class App extends React.Component {
	render() {
		const centerWrapping = {
			width: "100%",
			height: "100vh",
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		};
		const mainUI = {
			backgroundColor: "rgb(100,120,60)",
			width: "50%",
			height: "50%",
			display: "grid",
			gridTemplateColumns: "1fr 1fr"
		};
		


		return (
			<div style={centerWrapping}>
				<div style={mainUI}>
					<EntitiesMenu />
					<Panel />
				</div>
			</div>
		);
	}
}


