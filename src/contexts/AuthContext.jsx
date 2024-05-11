import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase.js";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrentUser({ ...user });
				setUserLoggedIn(true);
			} else {
				setCurrentUser(null);
				setUserLoggedIn(false);
			}

			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		userLoggedIn,
		loading,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
