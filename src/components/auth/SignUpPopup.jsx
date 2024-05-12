import "./sign-popup.css";

import { v4 as uuidv4 } from "uuid";
import { useRef, useState } from "react";
import InputField from "../form/InputField.jsx";
import InfoBox from "../info-box/InfoBox.jsx";
import { signUpUser } from "./auth.js";
import { useNavigate } from "react-router-dom";

export default function SignUpPopup({ switchToSignIn }) {
	const confirmRef = useRef();
	const [hasMessage, setHasMessage] = useState(null);
	const navigate = useNavigate();

	const fields = [
		{
			name: "username",
			type: "text",
			placeholder: "Coco Lamp",
			label: "Name",
			emptyError: "Enter your name",
			patternError: "",
		},
		{
			name: "usermail",
			type: "email",
			placeholder: "example@mail.com",
			label: "Email Address",
			emptyError: "Enter your email",
			patternError: "Email is invalid",
		},
		{
			name: "userpass",
			type: "password",
			placeholder: "Password",
			label: "Password",
			pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^da-zA-Z]).{8,}$",
			emptyError: "Enter a password",
			patternError:
				"Password should be at least 8 digits with at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.",
			onBlur: (e) => {
				confirmRef.current.pattern = e.target.value;
			},
		},
		{
			refer: confirmRef,
			name: "userpassconfirm",
			type: "password",
			placeholder: "Confirm Password",
			label: "Confirm Password",
			emptyError: "Enter a password",
			patternError: "Password don't match",
		},
	];

	async function handleSubmit(e) {
		e.preventDefault();

		const userdata = new FormData(e.target);
		const entries = Object.fromEntries(userdata.entries());
		const { usermail, userpassconfirm, ...rest } = entries;

		const result = await signUpUser(username, usermail, userpass);
		if (result?.error)
			setHasMessage({ type: "error", message: result?.error });
		else {
			setHasMessage(null);
			navigate(0);
		}
	}

	return (
		<>
			<h2 className="text-align-center">Sign up to Xellanix</h2>
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
					Create this account
				</button>
			</form>
			<div className="separator">or</div>
			<button
				className="button flex-self-init"
				type="button"
				onClick={switchToSignIn}
			>
				Sign in
			</button>
		</>
	);
}
