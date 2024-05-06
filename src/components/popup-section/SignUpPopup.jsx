import "./sign-popup.css";

import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import InputField from "../form/InputField.jsx";

export default function SignUpPopup({ switchToSignIn }) {
	const confirmRef = useRef();

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

	function handleSubmit(e) {
		e.preventDefault();

		const userdata = new FormData(e.target);
		console.log(Object.fromEntries(userdata.entries()));
	}

	return (
		<>
			<h2 className="text-align-center">Sign up to Xellanix</h2>
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
