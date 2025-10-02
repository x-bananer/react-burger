import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

import styles from "./ingredient.module.css";

const IngredientPage = () => {
	const { id } = useParams<{ id: string }>();
	const ingredient = useSelector((state: any) =>
		state.ingredients.items.find((i: any) => i._id === id)
	);

	if (!ingredient) return <p>Ингредиент не найден</p>;

	return (
		<div className={`${styles["ingredient"]} mt-20`}>
			<IngredientDetails ingredient={ingredient} isPage />
		</div>
	);
};

export default IngredientPage;
