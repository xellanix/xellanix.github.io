import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	updateProfile,
	GithubAuthProvider,
	/* sendPasswordResetEmail,
	updatePassword,
    sendEmailVerification */
} from "firebase/auth";
import { auth } from "../../firebase.js";

export async function signUpUser(displayName, email, pass) {
	try {
		const result = await createUserWithEmailAndPassword(auth, email, pass);

		await updateProfile(result.user, { displayName: displayName });

		return result;
	} catch (error) {
		return { error: new Error(error.code).message };
	}
}

export async function signInUser(email, pass) {
	try {
		const result = await signInWithEmailAndPassword(auth, email, pass);
		return result;
	} catch (error) {
		return { error: new Error(error.code).message };
	}
}

export async function signInGoogle() {
	try {
		const provider = new GoogleAuthProvider();
		provider.addScope("profile");
		provider.addScope("email");
		const result = await signInWithPopup(auth, provider);

		return result;
	} catch (error) {
		return { error: new Error(error.code).message };
	}
}

export async function signInGitHub() {
	try {
		const provider = new GithubAuthProvider();
		provider.addScope("repo");
		const result = await signInWithPopup(auth, provider);

		return result;
	} catch (error) {
		return { error: new Error(error.code).message };
	}
}

export async function signOut() {
	try {
		const result = await auth.signOut();
		return result;
	} catch (error) {
		return { error: new Error(error.code).message };
	}
}

/* export async function userPassReset(email) {
	return await sendPasswordResetEmail(auth, email);
}

export async function userPassChange(pass) {
	return await updatePassword(auth.currentUser, pass);
}

export async function sendEmailVerification() {
	return await sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`
    });
} */
