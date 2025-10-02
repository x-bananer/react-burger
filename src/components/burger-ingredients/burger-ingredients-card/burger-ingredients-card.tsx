import type { FC } from "react";
import { useDrag } from "react-dnd";
import type { DragSourceMonitor } from "react-dnd";

import {
	CurrencyIcon,
	Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients-card.module.css";

import type { TIngredient } from "../../../services/actions/constructor";

type TBurgerIngredientsCardProps = {
	ingredient: TIngredient;
	onClick: (ingredient: TIngredient) => void;
	count?: number;
};

const BurgerIngredientsCard: FC<TBurgerIngredientsCardProps> = ({
	ingredient,
	onClick,
	count = 0,
}) => {
	const [{ isDragging }, dragRef] = useDrag<
		TIngredient,
		unknown,
		{ isDragging: boolean }
	>({
		type: "ingredient",
		item: ingredient,
		collect: (monitor: DragSourceMonitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		<li
			ref={dragRef as unknown as React.Ref<HTMLLIElement>}
			style={{ opacity: isDragging ? 0.5 : 1 }}
			className={styles["burger-ingredients-card"]}
			onClick={() => onClick(ingredient)}
		>
			{count > 0 && (
				<Counter count={count} size="default" extraClass="m-1" />
			)}
			<img
				className={styles["burger-ingredients-card__image"]}
				alt={ingredient.name}
				src={ingredient.image}
			/>
			<p
				className={`${styles["burger-ingredients-card__sup-title"]} text text_type_digits-default mt-1`}
			>
				<span className="mr-2">{ingredient.price}</span>
				<CurrencyIcon type="primary" />
			</p>
			<h3
				className={`${styles["burger-ingredients-card__title"]} text text_type_main-default mt-2`}
			>
				{ingredient.name}
			</h3>
		</li>
	);
};

export default BurgerIngredientsCard;
