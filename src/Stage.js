import React from "react";

import CockPit from "./Mechanics/Cockpit";
import EntityManager from "./Mechanics/EntityManager";

export default class Stage extends React.Component {
	constructor() {
		super();

		this.entityManager = new EntityManager();
		this.cockPit = new CockPit(this.entityManager);

		window.onresize = () => {
			this.resizeCanvas();
		};

		this.state = {
			entities: null,
			selectedEntity: null
		};

		this.isDragging = false;
		this.selectEntityByID = this.selectEntityByID.bind(this);
	}

	resizeCanvas() {
		if (this.canvas) {
			this.canvas.width = this.canvas.clientWidth;
			this.canvas.height = this.canvas.clientWidth;
		}
	}

	refCB = ref => {
		this.canvas = ref;
		this.resizeCanvas();
		this.cockPit.updateCanvas(this.canvas);
	};

	componentDidMount() {
		this.resizeCanvas();

		this.canvas.onmousedown = e => {
			e.preventDefault();
			const x = e.offsetX / this.canvas.width;
			const y = e.offsetY / this.canvas.height;

			const foundEntity = this.entityManager.find(x, y);
			if (foundEntity) {
				this.entityManager.select(foundEntity);
			} else {
				this.entityManager.add(x, y, 0.03);
			}

			this.isDragging = true;

			this.updateUI();
		};

		this.canvas.onmousemove = e => {
			const x = e.offsetX / this.canvas.width;
			const y = e.offsetY / this.canvas.height;
			if (this.isDragging && this.entityManager.selectedEntity) {
				this.entityManager.selectedEntity.position.x = x;
				this.entityManager.selectedEntity.position.y = y;
			}
		};

		this.canvas.onmouseup = e => {
			this.isDragging = false;
		};
	}

	selectEntityByID(id) {
		this.entityManager.selectByID(id);
		this.updateUI();
	}

	updateUI() {
		this.setState({
			entities: this.entityManager.entities,
			selectedEntity: this.entityManager.selectedEntity
		});
	}

	render() {
		const canvasContainerStyle = {
			backgroundColor: "rgb(30,20,60)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		};
		const canvasStyle = {
			display: "block",
			// maxWidth: "90%",
			// minWidth: "80%",
			// maxHeight: "80%",
			backgroundColor: "white"
		};

		var selectedEntityID;

		if (this.entityManager.selectedEntity) {
			selectedEntityID = this.entityManager.selectedEntity.id;
		} else {
			selectedEntityID = 0;
		}

		return (
			<div style={canvasContainerStyle}>
				<canvas style={canvasStyle} ref={this.refCB} />
			</div>
		);
	}
}
