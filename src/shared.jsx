export function isAvailable(value = "") {
	if (typeof value === "string" && value.length === 0) return false;
	else if (value === null) return false;
	else return true;
}

export function substringTo(str = "", subTo = "") {
	if (!isAvailable(str)) return null;

	const lastIndex = str.indexOf(subTo);
	if (lastIndex !== -1) {
		return str.substring(0, lastIndex);
	} else {
		return str;
	}
}

export function toCapitalizeEachWord(
	str = "",
	separator = " ",
	joinDelimiter = " "
) {
	return str
		.split(separator)
		.map((word) => {
			return word[0].toUpperCase() + word.substring(1).toLowerCase();
		})
		.join(joinDelimiter);
}

export function Splitter(string = "", { type = "char" }) {
	if (type === "char") {
		const result = string.split("");
		const length = result.length;

		return [result, length];
	} else if (type === "word") {
		const result = string.split("");
		const length = result.length;

		return [result, length];
	} else return [[string], 1];
}
