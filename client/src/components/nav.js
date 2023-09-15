import { Link, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Nav = () => {
	// cookies checks if logged in or not
	const [cookies, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();

	const logout = () => {
		setCookies("access_token", "");
		window.localStorage.removeItem("userID");
		navigate("/auth");
	};

	return (
		<div className="nav">
			<Link to="/">Home</Link>
			<Link to="/create-recipe">Create Recipe</Link>
			<Link to="/saved-recipes">Saved Recipes</Link>
			{!cookies.access_token ? (
				<Link to="/auth">Login/Register</Link>
			) : (
				<button onClick={logout}>Logout</button>
			)}
		</div>
	);
};
