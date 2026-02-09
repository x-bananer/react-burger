import styles from "./burger-ingredients-section.module.css";

import Modal from "../../modal/modal.js";
import IngredientDetails from "../../ingredient-details/ingredient-details.js";
import BurgerIngredientsCard from "../burger-ingredients-card/burger-ingredients-card.js";

import { useNavigate, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../services/types";
import { addDetails } from "../../../services/actions/ingredient";
import type { TIngredient } from "../../../services/types/ingredient";
import type { FC } from "react";

interface BurgerIngredientsSectionProps {
	extraClass?: string;
	title: string;
	ingredients: TIngredient[];
}

const BurgerIngredientsSection: FC<BurgerIngredientsSectionProps> = ({
	extraClass = "",
	title,
	ingredients,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const location = useLocation();

	const { items: selectedIngredients = [] } = useSelector(
		(state: RootState) => state.burderConstructor
	);

	const counts = useMemo(() => {
		const map = new Map();
		selectedIngredients.forEach((item: TIngredient) => {
			const currentCount = map.get(item._id) || 0;
			map.set(item._id, currentCount + 1);
		});
		return map;
	}, [selectedIngredients]);

	const getIngredientCount = (ingredient: TIngredient) => {
		if (ingredient.type === "bun" && counts.get(ingredient._id)) {
			return 2;
		}
		return counts.get(ingredient._id) || 0;
	};

	const [isModalVisible] = useState(false);
	const { details: selectedIngredient } = useSelector(
		(state: RootState) => state.ingredient
	);

	const handleIngredientClick = (ingredient: TIngredient) => {
		dispatch(addDetails(ingredient));
		navigate(`/ingredients/${ingredient._id}`, {
			state: { background: location },
		});
	};

	const handleCloseModal = () => {
		navigate(-1);
	};

	return (
		<>
			<section
				className={`${styles["burger-ingredients-section"]} ${extraClass}`}
			>
				<h2 className="text text_type_main-medium">{title}</h2>
				<ul
					className={`${styles["burger-ingredients-section__grid"]} mt-6`}
				>
					{ingredients.map((ingredient, index) => (
						<BurgerIngredientsCard
							key={`${ingredient._id}_${index}`}
							ingredient={ingredient}
							onClick={handleIngredientClick}
							count={getIngredientCount(ingredient)}
						/>
					))}
				</ul>
			</section>
			{isModalVisible && selectedIngredient && (
				<Modal onClose={handleCloseModal}>
					<IngredientDetails ingredient={selectedIngredient} />
				</Modal>
			)}
		</>
	);
};

export default BurgerIngredientsSection;
