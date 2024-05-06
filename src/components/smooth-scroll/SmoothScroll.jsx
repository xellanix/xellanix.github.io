import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ useRoot = true, children }) {
	return (
		<ReactLenis
			root={useRoot}
			options={{ wheelMultiplier: 1.5, lerp: 0.3 }}
		>
			{children}
		</ReactLenis>
	);
}
