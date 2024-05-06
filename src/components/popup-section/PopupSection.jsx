import "./popup-section.css";
import icon from "../../assets/icon.svg";

import { useEffect, useRef, useState } from "react";
import { IconX } from "@tabler/icons-react";

export default function PopupSection({ setIsPopupOpened, children }) {
	const [defaultHeight, setDefaultHeight] = useState(null);
	const [totalHeight, setTotalHeight] = useState(null);

	const observedDiv = useRef(null);

	useEffect(() => {
		if (!observedDiv.current) {
			return;
		}

		const resizeObserver = new ResizeObserver(([entry]) => {
			const ph = entry.target.parentElement.parentElement.offsetHeight;
			const clippedHeight = entry.target.parentElement.offsetHeight;
			const contentHeight = entry.target.scrollHeight;

			const usedHeight = ph - clippedHeight;
			const current = (defaultHeight ?? usedHeight) + contentHeight;

			setTotalHeight(current);
			setDefaultHeight(usedHeight);
		});

		resizeObserver.observe(observedDiv.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, [observedDiv.current]);

	function closeAnyPopup(e) {
		e.target.disabled = true;
		document.querySelector("#popup")?.classList.add("out");

		setTimeout(() => {
			setIsPopupOpened(false);
		}, 300);
	}

	return (
		<div
			id="popup"
			className="popup vertical-layout"
			style={{ height: totalHeight ?? "auto" }}
		>
			<div className="horizontal-layout">
				<div className="icon-landscape">
					<img src={icon} alt="Xellanix Icon" />
					<div>Xellanix</div>
				</div>
				<div
					className="default-close-button flex-align-middle flex-align-center"
					onClick={closeAnyPopup}
				>
					<IconX stroke={2.5} />
				</div>
			</div>
			<div id="popup-container" data-lenis-prevent>
				<div
					ref={observedDiv}
					className="vertical-layout flex-align-center popup-content"
				>
					{children}
				</div>
			</div>
		</div>
	);
}
