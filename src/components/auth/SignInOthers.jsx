import "./sign-popup.css";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import InfoBox from "../info-box/InfoBox.jsx";
import { signInGitHub, signInGoogle } from "./auth.js";
import { useNavigate } from "react-router-dom";

const methods = [
	{
		provider: "Google",
		icon: "/brand-icons/google.svg",
		action: signInGoogle,
	},
	{
		provider: "GitHub",
		icon: "/brand-icons/github.svg",
		action: signInGitHub,
	},
];

export default function SignInOthers() {
	const [hasMessage, setHasMessage] = useState(null);
	const navigate = useNavigate();

	return (
		<>
			<h2 className="text-align-center">Sign in to Xellanix</h2>
			{hasMessage && (
				<InfoBox status={hasMessage.type}>{hasMessage.message}</InfoBox>
			)}
			{methods.map(({ provider, icon, action }) => (
				<button
					key={uuidv4()}
					className="button flex-self-init"
					type="button"
					onClick={async (e) => {
						e.preventDefault();

						const result = await action();
						if (result?.error)
							setHasMessage({
								type: "error",
								message: result?.error,
							});
						else {
							setHasMessage(null);
							navigate(0, { replace: true });
						}
					}}
				>
					<div
						style={{
							backgroundImage: `url(${icon})`,
							width: "24px",
							height: "24px",
							backgroundRepeat: "no-repeat",
							backgroundSize: "contain",
							backgroundPosition: "center",
						}}
					></div>
					<span>Sign in with {provider}</span>
				</button>
			))}
		</>
	);
}
