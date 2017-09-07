import { createStore, combineReducers } from "redux";

export const ADD_ENTITY = "ADD_ENTITY";


export const VOL = "VOL";
export const FREQ = "FREQ";
export const SIZE = "SIZE";

export const SEL_ENTITY = "SEL_ENTITY";
export const DEL_ENTITY = "DEL_ENTITY";
export const INCR_VOL = "INCR_VOL";

export function addEntity() {
	return {
		type: ADD_ENTITY
	};
}
export function selectEntityAction(id) {
	return {
		type: SEL_ENTITY,
		id: id
	};
}
export function deleteEntity(id) {
	return {
		type: DEL_ENTITY,
		id: id
	};
}


export function updateVolume(id, newValue) {
	return {
		type: VOL
		, id
		, newValue
		, 
	}
}
export function updateSize(id, newValue) {
	return {
		type: SIZE
		, id
		, newValue
		, 
	}
}
export function updateFrequency(id, newValue) {
	console.log("updatefreq")
	return {
		type: FREQ
		, id
		, newValue
		, 
	}
}



function rootReducer(state, action) {

	console.log("rootReducer called")
	console.log(action);
	console.log("old state") ; console.log(state)

	var newState = state;

	if (action.type == ADD_ENTITY) {
		const newEntities = state.entities.concat({ 
			id: genID(),
			size: 0.1,
			frequency: 0.3,
			volume: 0.4,
		});
		newState = Object.assign({}, state, {entities: newEntities});		
	}

	if (action.type == SEL_ENTITY) {	
		const newEntities = [...state.entities]
		const newSelectedEntity = findEntity(newEntities, action.id)
		newState = { entities: newEntities, selectedEntityID: newSelectedEntity.id } 
	}

	if (action.type == VOL) {
		
		const newEntities = updateItemInArray(state.entities, action.id, entity => {
			return updateObject(entity, {volume : action.newValue});
		});
		newState = Object.assign({}, state, {entities: newEntities});		
	}
	if (action.type == FREQ) {
		
		const newEntities = updateItemInArray(state.entities, action.id, entity => {
			return updateObject(entity, {frequency : action.newValue});
		});
		newState = Object.assign({}, state, {entities: newEntities});		
	}
	if (action.type == SIZE) {
		
		const newEntities = updateItemInArray(state.entities, action.id, entity => {
			return updateObject(entity, {size : action.newValue});
		});
		newState = Object.assign({}, state, {entities: newEntities});		
	}
	
	console.log("newstate") ; console.log(newState)
	return newState
}




export const selectedEntitySelector = (state) => {
	const { selectedEntityID, entities } = state
	console.log("found selected entity")
	const foundSelectedEntity = entities.find(e=>e.id===selectedEntityID)
	console.log(foundSelectedEntity)
	return foundSelectedEntity
}

export default createStore(rootReducer, {
	entities:[], 
	selectedEntityID: 0,
});









// UTILITIES


var genID = (function() {
	var idGenerator = 0;
	return function() {
		idGenerator += 1;
		return idGenerator;
	};
})();


function updateItemInArray(array, itemId, updateItemCallback) {
	const updatedItems = array.map(item => {
		if(item.id !== itemId) {
            // Since we only want to update one item, preserve all others as they are now
            return item;
        }

        // Use the provided callback to create an updated item
        const updatedItem = updateItemCallback(item);
        return updatedItem;
    });

	return updatedItems;
}

function updateObject(oldObject, newValues) {
    // Encapsulate the idea of passing a new object as the first parameter
    // to Object.assign to ensure we correctly copy data instead of mutating
    return Object.assign({}, oldObject, newValues);
}

function findEntity(entities, id) {
	return entities.filter(e => (e.id === id))[0]
}




// function updateObject(oldObject, newValues) {
// 	return Object.assign({}, oldObject, newValues);
// }

// function createReducer(initialState, handlers) {
// 	return function reducer(state = initialState, action) {
// 		if (handlers.hasOwnProperty(action.type)) {
// 			console.log(action)
// 			console.log(state)
// 			const newState = handlers[action.type](state, action)
// 			console.log('newState ') ; console.log(newState)

// 			return newState;
// 		} else {
// 			return state;
// 		}
// 	};
// }

// const addEntityReducer = function(entityState, action) {

// 	const newEntities = entityState.allEntities.concat({
// 		id: genID()
// 	});

// 	const newState = updateObject(entityState, { allEntities: newEntities });
// 	return newState;
// };

// const selectEntityReducer = function(entityState, action) {
// 	console.log(entityState)
// 	// const selectedEntity = entityState.allEntities.filter(e => (e.id == action.id))[0]
// 	// const newStateForSelectEntity = updateObject(entityState, {selectedEntity: selectedEntity});
// 	return {allEntities:[], selectedEntity:{id:3}};
// };

// const entitiesReducer = createReducer(
// {
// 	allEntities: [],
// 	selectedEntity: {id: 3}
// },
// {
// 	ADD_ENTITY: addEntityReducer,
// 	SEL_ENTITY: selectEntityReducer
// }
// );

// const reducers = combineReducers({
// 	entities: entitiesReducer
// });