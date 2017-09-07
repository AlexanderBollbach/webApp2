import React from "react";
import EntityButton from "./UIComponents/EntityButton";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { addEntity, selectEntityAction, deleteEntity } from "../redux/index";

import { selectedEntitySelector } from '../redux/index'

const TopPanel = props => {
	const s = {
		display: "grid",
		gridGap: "5%",
		padding: "1%",
		gridTemplateColumns: "1fr 1fr 1fr 1fr",
		backgroundColor: "rgb(10,20,30)"
	};
	const s1 = {
		width: "100%",
	}
	return (
		<div style={s}>
			<button style={s1} onClick={() => props.action1()}>add</button>
			<button style={s1} onClick={() => props.action2()}>select</button>
			<button style={s1} onClick={() => props.action3()}>delete</button>
			<button style={s1} onClick={() => props.action4()}>action4</button>
		</div>
	);
};

class EntitiesMenu extends React.Component {
	
	getMainEntityDiv() {
		const renderEntities = () => {
			return this.props.themBoys.map((entity, idx) => {
				var selected = false
				if (this.props.selectedEntity) {
					selected = entity.id === this.props.selectedEntity.id

				} 
				console.log("render one entity")
				console.log(this.props.selectedEntity)
				return renderEntity(selected, entity.id);
			});
		};
		const renderEntity = (selected, id) => {
			return (
				<EntityButton
					selected={selected}
					key={id}
					id={id}
					clicked={id => {
						this.props.actions.selectEntityAction(id);
					}}
				/>
			);
		};

		const s = {
			display: "flex",
			// padding: "2%",
			flexWrap: "wrap",
			overflow: "scroll",
			width: "100%"
			// height: "100%",
		};

		if (!this.props.themBoys || this.props.themBoys.length == 0) {
			return <div style={s}> --- </div>;
		} else {
			return <div style={s}>{renderEntities()}</div>;
		}
	}

	render() {

		console.log("EntitiesMenu.render")
		console.log(this.props)

		const style = {
			overflow: "scroll",
			display: "grid",
			gridGap: "5%",
			gridTemplateRows: "1fr 7fr",
			padding: "2%"
		};

		return (
			<div style={style}>
				<TopPanel
					action1={() => this.props.actions.addEntity()}
					action2={() => this.props.actions.selectEntity(0)}
					action3={() => this.props.actions.deleteEntity()}
					action4={() => this.props.actions.addEntity()}
				/>
				{this.getMainEntityDiv()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		themBoys: state.entities,
		selectedEntity: selectedEntitySelector(state)
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ addEntity, selectEntityAction, deleteEntity }, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesMenu);
