import "./styles.css";

import React from "react";
import ReactDom from "react-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";

// my UI
// import Stage from "./Stage";
// import Nav from "./Nav";
// import Panel from "./UIComponents/Panel";
// import EntityPicker from "./UIComponents/EntityPicker";


// redux
import { Provider } from "react-redux";
import store from './redux/index'

import App from './components/App'

ReactDom.render(
	<Provider store={store}>
	<App />
	</Provider>,
	document.getElementById("root")
);
