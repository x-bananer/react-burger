import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./components/app/app.jsx";
// import { Provider } from "react-redux";
// import store from './services/store.js';
import AppWrapper from "./components/app/app-wrapper.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AppWrapper />
  	</StrictMode>
);
