import { useState, useRef } from "react";
import { isAvailable } from "../../shared.jsx";

export default function InputField(props) {
	const { refer, label, name, emptyError, patternError, ...fieldProps } =
		props;
	const [error, setError] = useState(null);

	const errorRef = useRef();

	function handleInvalid(e) {
		checkValidity(e);
	}

	function handleChange(e) {
		checkValidity(e);
	}

	function checkValidity(e) {
		const target = e.target;
		const name = target.name;
		const value = target.value;

		// value not available
		if (!isAvailable(value)) {
			setError(emptyError);
			console.log(`invalid ${name}: ${value} (${emptyError})`);
		} else setError(patternError);
	}

	return (
		<div className="vertical-layout" style={{ gap: "8px" }}>
			<label htmlFor={name}>{label}</label>
			<input
				ref={refer}
				name={name}
				id={name}
				{...fieldProps}
				required
				onInvalid={handleInvalid}
				onChange={handleChange}
			/>

			{isAvailable(error) && (
				<span ref={errorRef} style={{ color: "var(--error-color)" }}>
					{error}
				</span>
			)}
		</div>
	);
}
