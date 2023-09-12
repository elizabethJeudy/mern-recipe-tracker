import { Link } from "react-router-dom";

export const Nav = () => {
	return (
		<div className="nav">
			<Link to="/">Home</Link>
			<Link to="/create-recipe">Create Recipe</Link>
			<Link to="/saved-recipes">Saved Recipes</Link>
			<Link to="/auth">Login/Register</Link>
		</div>
	);
};
