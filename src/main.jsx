import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import "./styles/index.css";
import "./styles/flex-align.css";
import "./styles/text-align.css";
import "./styles/styles.css";
import "./styles/media-styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>
);
