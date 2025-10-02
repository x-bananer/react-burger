import { useState, useMemo } from "react";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";

import {
	ConstructorElement,
	Button,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import BurderConstructorDragItem from "./burger-constructor-drag-item/burger-constructor-drag-item";

import {
	addIngredient,
	clearConstructor,
} from "../../services/actions/constructor";
import type { TIngredient } from "../../services/actions/constructor";
import { createOrder, clearOrder } from "../../services/actions/order";

import styles from "./burger-constructor.module.css";

interface BurgerConstructorProps {
	className?: string;
}

const BurgerConstructor: FC<BurgerConstructorProps> = ({ className = "" }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { isLoggedIn } = useSelector((state: any) => state.auth);

	const dispatch: any = useDispatch();
	const navigate = useNavigate();
	const { items: selectedIngredients = [] } = useSelector(
		(state: any): { items: TIngredient[] } => state.burderConstructor
	);
	const { isLoading } = useSelector((state: any) => state.order);

	const [, dropRef] = useDrop<TIngredient>({
		accept: "ingredient",
		drop: (ingredient: TIngredient) => {
			dispatch(addIngredient(ingredient));
		},
	});

	const bun = selectedIngredients.find((item) => item.type === "bun");
	const fillings = selectedIngredients.filter((item) => item.type !== "bun");

	const total = useMemo(() => {
		if (!bun) {
			return fillings.reduce(
				(sum, ingredient) => sum + ingredient.price,
				0
			);
		}
		return (
			bun.price * 2 +
			fillings.reduce((sum, ingredient) => sum + ingredient.price, 0)
		);
	}, [bun, fillings]);

	const onClickOrder = async () => {
		const selectedIngredientIds = [
			bun?._id,
			...fillings.map((i) => i._id),
			bun?._id,
		].filter(Boolean) as string[];

		if (!isLoggedIn) {
			navigate("/login");
			return;
		}

		try {
			const res = await dispatch(createOrder(selectedIngredientIds));
			if (res?.success) {
				setIsModalVisible(true);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleCloseModal = () => {
		dispatch(clearOrder());
		dispatch(clearConstructor());
		setIsModalVisible(false);
	};

	return (
		<>
			<div
				ref={dropRef as unknown as React.Ref<HTMLDivElement>}
				className={`${styles["burger-constructor"]} ${className}`}
			>
				{selectedIngredients.length === 0 && (
					<p
						className={`${styles["burger-constructor__stub"]} text text_type_main-medium mt-10 text_color_inactive`}
					>
						Перенесите сюда любимые ингредиенты,
						<br />
						чтобы собрать бургер для заказа
					</p>
				)}

				{bun && (
					<ConstructorElement
						extraClass={`mb-4 ${styles["burger-constructor__item"]} ${styles["burger-constructor__item--offset"]}`}
						type="top"
						isLocked
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				)}

				{fillings.length > 0 && (
					<div className={styles["burger-constructor__scroll-wrap"]}>
						<div className={styles["burger-constructor__scroll"]}>
							{fillings.map((ingredient, index) => (
								<BurderConstructorDragItem
									key={ingredient.uid || ingredient._id}
									ingredient={ingredient as any}
									index={index}
									extraClass={`${
										styles["burger-constructor__item"]
									} ${
										index < fillings.length - 1
											? "mb-4"
											: ""
									}`}
								/>
							))}
						</div>
					</div>
				)}

				{bun && (
					<ConstructorElement
						extraClass={`${styles["burger-constructor__item"]} mt-4 ${styles["burger-constructor__item--offset"]}`}
						type="bottom"
						isLocked
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				)}

				{total > 0 && (
					<div
						className={`${styles["burger-constructor__footer"]} mt-10`}
					>
						<span className="text text_type_main-large mr-4">
							{total}
						</span>
						<CurrencyIcon type="primary" />

						<Button
							extraClass="ml-10"
							type="primary"
							size="large"
							htmlType="button"
							onClick={onClickOrder}
							disabled={isLoading}
						>
							{isLoading
								? "Оформляем заказ..."
								: "Оформить заказ"}
						</Button>
					</div>
				)}
			</div>
			{isModalVisible && (
				<Modal onClose={handleCloseModal}>
					<OrderDetails />
				</Modal>
			)}
		</>
	);
};

export default BurgerConstructor;
