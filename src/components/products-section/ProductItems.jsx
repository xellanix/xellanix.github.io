import mastertools from "../../assets/product-icon/mastertools.svg";
import imagemerger from "../../assets/product-icon/imagemerger.svg";
import xellanix_lib from "../../assets/product-icon/xellanix-lib.svg";

export default function GetProductItems() {
	return [
		{
			title: "MasterTools",
			description:
				"An application with a set of unique and creative features, made with intention and love.",
			learnLink: "https://github.com/xellanix/mastertools",
			icon: mastertools,
		},
		{
			title: "Image Merger",
			description:
				"Merge multiple images from files or clipboard, including screenshots, into a new file.",
			learnLink: "https://github.com/xellanix/imagemerger",
			icon: imagemerger,
		},
		{
			title: "Xellanix Library",
			description:
				"A C++ library for regular use, made by xellanix (currently in under development).",
			learnLink: "https://github.com/xellanix/xellanix-lib",
			icon: xellanix_lib,
		},
	];
}
