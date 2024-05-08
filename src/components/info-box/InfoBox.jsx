import React from "react";
import {
	IconQuestionMark,
	IconExclamationMark,
	IconCheck,
	IconX,
} from "@tabler/icons-react";

/**
 *
 * @param {string} status information, warning, success, error
 * @returns
 */
export default function InfoBox({ status = "information", children }) {
	const statusId =
		status === "error"
			? 3
			: status === "success"
			? 2
			: status === "warning"
			? 1
			: 0;

	return (
		<div
			className={`info-box ${status}`}
			style={{
				backgroundColor:
					statusId === 1
						? "var(--warning-background-color)"
						: statusId === 2
						? "var(--success-background-color)"
						: statusId === 3
						? "var(--error-background-color)"
						: "var(--information-background-color)",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				gap: "8px",
				borderRadius: "var(--button-border-radius)",
				padding: "16px",
				alignSelf: "stretch",
			}}
		>
			<div
				className="info-box-icon"
				style={{
					backgroundColor:
						statusId === 1
							? "var(--warning-color)"
							: statusId === 2
							? "var(--success-color)"
							: statusId === 3
							? "var(--error-color)"
							: "var(--information-color)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "var(--secondary-background-color)",
					width: "24px",
					height: "24px",
					borderRadius: "32px",
				}}
			>
				{statusId === 0 && <IconQuestionMark size={14} stroke={2.5} />}
				{statusId === 1 && (
					<IconExclamationMark size={14} stroke={2.5} />
				)}
				{statusId === 2 && <IconCheck size={14} stroke={2.5} />}
				{statusId === 3 && <IconX size={14} stroke={2.5} />}
			</div>
			{children}
		</div>
	);
}
