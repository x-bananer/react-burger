import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppWrapper from "./components/app/app-wrapper";

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<AppWrapper />
	</StrictMode>
);
