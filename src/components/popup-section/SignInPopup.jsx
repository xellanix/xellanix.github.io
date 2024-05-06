import "./sign-popup.css";

import { v4 as uuidv4 } from "uuid";
import InputField from "../form/InputField.jsx";

export default function SignInPopup({ switchToSignUp }) {
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

	function handleSubmit(e) {
		e.preventDefault();

		const userdata = new FormData(e.target);
		console.log(Object.fromEntries(userdata.entries()));
	}

	return (
		<>
			<h2 className="text-align-center">Sign in to Xellanix</h2>
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
