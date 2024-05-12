import "./sign-popup.css";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import InputField from "../form/InputField.jsx";
import InfoBox from "../info-box/InfoBox.jsx";
import { signInUser } from "./auth.js";
import { useNavigate } from "react-router-dom";

export default function SignInPopup({ switchToSignUp, moveOtherMethods }) {
	const [hasMessage, setHasMessage] = useState(null);
	const navigate = useNavigate();

	const fields = [
		{
			name: "usermail",
			type: "email",
			placeholder: "example@mail.com",
			label: "Email",
			emptyError: "Enter your active mail",
			patternError: "Email is invalid",
		},
		{
			name: "userpass",
			type: "password",
			placeholder: "Password",
			label: "Password",
			emptyError: "Enter the password",
			patternError: "Password is invalid",
		},
	];

	async function handleSubmit(e) {
		e.preventDefault();

		const userdata = new FormData(e.target);
		const entries = Object.fromEntries(userdata.entries());
		const { usermail, userpass } = entries;

		const result = await signInUser(usermail, userpass);
		if (result?.error)
			setHasMessage({ type: "error", message: result?.error });
		else {
			setHasMessage(null);
			navigate(0);
		}

		// cocolamp@xellanix.com
		// Tes12345;
	}

	return (
		<>
			<h2 className="text-align-center">Sign in to Xellanix</h2>
			{hasMessage && (
				<InfoBox status={hasMessage.type}>{hasMessage.message}</InfoBox>
			)}
			<form
				className="vertical-layout flex-self-init flex-align-center"
				style={{ marginTop: "var(--section-gap-vertical)" }}
				onSubmit={handleSubmit}
			>
				{fields.map((field) => (
					<InputField key={uuidv4()} {...field} />
				))}
				<button
					type="submit"
					className="button accent flex-self-center"
					style={{ marginTop: "var(--section-gap-vertical)" }}
				>
					Sign in
				</button>
			</form>
			<button
				className="button flex-self-init"
				type="button"
				onClick={moveOtherMethods}
			>
				Continue with another way
			</button>
			<div className="separator">or</div>
			<button
				className="button flex-self-init"
				type="button"
				onClick={switchToSignUp}
			>
				Create a new account
			</button>
		</>
	);
}
