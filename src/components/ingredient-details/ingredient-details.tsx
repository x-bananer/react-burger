import type { FC } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./ingredient-details.module.css";

import type { TIngredient } from "../../services/types/ingredient";

interface IngredientDetailsProps {
	ingredient?: TIngredient;
	isPage?: boolean;
}

const IngredientDetails: FC<IngredientDetailsProps> = ({
	ingredient: propIngredient,
	isPage,
}) => {
	const { id } = useParams();
	const ingredient =
		propIngredient ||
		useSelector((state: any) =>
			state.ingredients.items.find((i: any) => i._id === id)
		);

	if (!ingredient) return <p>Ингредиент не найден</p>;

	return (
		<div className={styles["ingredient-details"]}>
			<div
				className={`${styles["ingredient-details__header"]} ${
					isPage ? styles["ingredient-details__header--center"] : ""
				}`}
			>
				<h1 className="text text_type_main-large">
					Детали ингредиента
				</h1>
			</div>
			<div className={styles["ingredient-details__content-wrap"]}>
				<div className={styles["ingredient-details__content"]}>
					<img
						className={styles["ingredient-details__image"]}
						src={ingredient.image_large}
						alt={ingredient.name}
					/>
					<p className="text text_type_main-medium mt-4 mb-8">
						{ingredient.name}
					</p>
					<div className={styles["ingredient-details__grid"]}>
						<div>
							<p className="text text_type_main-default text_color_inactive mb-2">
								Калории,ккал
							</p>
							<p className="text text_type_digits-default text_color_inactive">
								{ingredient.calories}
							</p>
						</div>
						<div>
							<p className="text text_type_main-default text_color_inactive mb-2">
								Белки,г
							</p>
							<p className="text text_type_digits-default text_color_inactive">
								{ingredient.proteins}
							</p>
						</div>
						<div>
							<p className="text text_type_main-default text_color_inactive mb-2">
								Жиры,г
							</p>
							<p className="text text_type_digits-default text_color_inactive">
								{ingredient.fat}
							</p>
						</div>
						<div>
							<p className="text text_type_main-default text_color_inactive mb-2">
								Углеводы,г
							</p>
							<p className="text text_type_digits-default text_color_inactive">
								{ingredient.carbohydrates}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IngredientDetails;
