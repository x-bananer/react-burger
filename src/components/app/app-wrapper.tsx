import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../../services/store";

import AppInitializer from "./app-initializer";
import App from "./app";

const AppWrapper = () => (
	<Provider store={store}>
		<BrowserRouter>
			<AppInitializer />
			<App />
		</BrowserRouter>
	</Provider>
);

export default AppWrapper;
