import { app } from "./firebase.js";
import {
	getDatabase,
	ref,
	set,
	get,
	child,
	remove,
	update,
} from "firebase/database";

async function postRequest(path = "", value = {}) {
	const db = getDatabase(app);
	try {
		await set(ref(db, path), value);
		return {
			status: { type: "success", message: `Data saved: ${path}` },
		};
	} catch (err) {
		return {
			status: { type: "error", message: new Error(err).message },
		};
	}
}

async function getRequest(path = "") {
	const dbRef = ref(getDatabase());

	try {
		const raw = await get(child(dbRef, path));
		if (raw.exists()) {
			const value = raw.val();
			return value;
		} else {
			return { error: new Error("No data available").message };
		}
	} catch (error) {
		return { error: new Error(error).message };
	}
}

function updateRequest(path = "", newValue) {
	const db = getDatabase(app);
	update(ref(db, path), newValue);
}

function deleteRequest(path = "") {
	const db = getDatabase(app);
	remove(ref(db, path));
}

export async function writeUserData(userId, userData) {
	return await postRequest(`users/${userId}`, userData);
}

export async function readUserData(userId, ...path) {
	return await getRequest(`users/${userId}/${path.join("/")}`);
}

export async function compareUserData(data, userId, ...path) {
	const d = await readUserData(userId, ...path);
	if (d.error) return { error: d.error };
	else return d === data;
}

export async function toSHA256(val = "") {
	const h = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder("utf-8").encode(val)
	);

	let hexes = [],
		view = new DataView(h);
	for (let i = 0; i < view.byteLength; i += 4) {
		hexes.push(("00000000" + view.getUint32(i).toString(16)).slice(-8));
	}

	return hexes.join("");
}
