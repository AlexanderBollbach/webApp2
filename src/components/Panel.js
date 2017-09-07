import React from "react";
import Slider from "./UIComponents/Slider";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateVolume, updateFrequency, updateSize } from "../redux/index";
import { selectedEntitySelector } from "../redux/index";

const Panel = ({
	selectedEntity,
	updateVolume,
	updateFrequency,
	updateSize
}) => {
	console.log("Panel render");

	const container = {
		display: "grid",
		backgroundColor: "rgb(60,60,120)"
	};
	const element = {
		backgroundColor: "rgb(60,40,100)",
		padding: "10px",
		color: "white",
		textAlign: "center"
	};

	if (selectedEntity) {
		return (
			<div style={container}>
				<div style={element}>Entity: {selectedEntity.id}</div>
				<Slider
					valueChanged={newValue =>
						updateFrequency(selectedEntity.id, newValue)}
					initialValue={selectedEntity.frequency}
					title="frequency"
				/>
				<Slider
					valueChanged={newValue =>
						updateVolume(selectedEntity.id, newValue)}
					initialValue={selectedEntity.volume}
					title="volume"
				/>
				<Slider
					valueChanged={newValue =>
						updateSize(selectedEntity.id, newValue)}
					initialValue={selectedEntity.size}
					title="size"
				/>
			</div>
		);
	} else {
		return (
			<div style={container}>
				<div style={element}>---</div>
			</div>
		);
	}
};

export default connect(
	state => ({
		selectedEntity: selectedEntitySelector(state)
	}),
	dispatch =>
		bindActionCreators(
			{
				updateFrequency,
				updateVolume,
				updateSize
			},
			dispatch
		)
)(Panel);
