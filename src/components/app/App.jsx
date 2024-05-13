import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SmoothScroll from "../smooth-scroll/SmoothScroll.jsx";
import Home from "../../pages/Home.jsx";
import NotFound from "../../pages/NotFound.jsx";

export default function App() {
	return (
		<SmoothScroll>
			<MotionConfig
				transition={{
					type: "spring",
					bounce: 0,
					staggerChildren: 0.15,
				}}
			>
				<LazyMotion features={domAnimation}>
					<Router>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Router>
				</LazyMotion>
			</MotionConfig>
		</SmoothScroll>
	);
}
