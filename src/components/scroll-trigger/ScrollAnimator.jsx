import { useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

export default function ScrollAnimator({
	offset = ["", ""],
	spring = false,
	springOptions,
}) {
	const animRef = useRef();
	const { scrollYProgress } = useScroll({
		target: animRef,
		offset: offset,
	});

	return [
		animRef,
		spring ? useSpring(scrollYProgress, springOptions) : scrollYProgress,
	];
}

export function showFromX(from) {
	return {
		hidden: {
			opacity: 0,
			x: from,
		},
		show: {
			opacity: 1,
			x: 0,
		},
	};
}

export function showFromY(from) {
	return {
		hidden: {
			opacity: 0,
			y: from,
		},
		show: {
			opacity: 1,
			y: 0,
		},
	};
}
