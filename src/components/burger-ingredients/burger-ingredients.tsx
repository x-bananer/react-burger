import styles from "./burger-ingredients.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsSection from "./burger-ingredients-section/burger-ingredients-section";

import type { FC } from "react";
import { useState, useMemo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

interface BurgerIngredientsProps {
	className?: string;
}

const BurgerIngredients: FC<BurgerIngredientsProps> = ({ className }) => {
	const {
		items: ingredients,
		isLoading,
		isError,
	} = useSelector((state: any) => state.ingredients);

	const [activeTab, setActiveTab] = useState("Булки");

	const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({
		Булки: null,
		Соусы: null,
		Начинки: null,
	});
	const isProgrammaticScroll = useRef<boolean>(false);

	const buns = useMemo(
		() => ingredients.filter((i: any) => i.type === "bun"),
		[ingredients]
	);
	const sauces = useMemo(
		() => ingredients.filter((i: any) => i.type === "sauce"),
		[ingredients]
	);
	const maines = useMemo(
		() => ingredients.filter((i: any) => i.type === "main"),
		[ingredients]
	);

	useEffect(() => {
		const rootEl = document.querySelector(
			"#burger-ingredients-scroll-container"
		);

		const observer = new IntersectionObserver(
			(entries) => {
				if (!rootEl || isProgrammaticScroll.current) return;

				const rootTop = rootEl.getBoundingClientRect().top;

				const visible = entries.filter((e) => e.isIntersecting);
				if (visible.length === 0) return;

				const closest = visible
					.slice()
					.sort(
						(a, b) =>
							Math.abs(
								a.target.getBoundingClientRect().top - rootTop
							) -
							Math.abs(
								b.target.getBoundingClientRect().top - rootTop
							)
					)[0];

				const section = Object.entries(sectionsRef.current).find(
					([, el]) => el === closest.target
				);
				if (section) {
					setActiveTab(section[0]);
				}
			},
			{
				root: rootEl,
				rootMargin: "0px 0px -85% 0px",
				threshold: 0.01,
			}
		);

		Object.values(sectionsRef.current).forEach((section) => {
			if (section) observer.observe(section);
		});

		return () => {
			observer.disconnect();
		};
	}, []);

	const handleTabClick = (tab: string): void => {
		setActiveTab(tab);
		const section = sectionsRef.current[tab];
		if (!section) return;
		isProgrammaticScroll.current = true;
		section.scrollIntoView({ behavior: "smooth", block: "start" });

		setTimeout(() => {
			isProgrammaticScroll.current = false;
		}, 400);
	};

	return (
		<div className={className}>
			<h1 className="text text_type_main-large">Соберите бургер</h1>

			{isLoading && (
				<p className="text text_type_main-default text_color_inactive mt-10">
					Загружаем ингредиенты...
				</p>
			)}

			{isError && (
				<p className="text text_type_main-default text_color_inactive mt-10">
					Ошибка загрузки ингредиентов, попробуйте перезагрузить
					страницу
				</p>
			)}

			{!isLoading && !isError && (
				<>
					<div
						className={`${styles["burger-ingredients__tabs"]} mt-5`}
					>
						<Tab
							value="Булки"
							active={activeTab === "Булки"}
							onClick={handleTabClick}
						>
							Булки
						</Tab>
						<Tab
							value="Соусы"
							active={activeTab === "Соусы"}
							onClick={handleTabClick}
						>
							Соусы
						</Tab>
						<Tab
							value="Начинки"
							active={activeTab === "Начинки"}
							onClick={handleTabClick}
						>
							Начинки
						</Tab>
					</div>
					<div className={styles["burger-ingredients__scroll-wrap"]}>
						<div
							id="burger-ingredients-scroll-container"
							className={styles["burger-ingredients__scroll"]}
						>
							<div
								ref={(el) => {
									sectionsRef.current["Булки"] = el;
								}}
							>
								<BurgerIngredientsSection
									extraClass="pt-10"
									title="Булки"
									ingredients={buns}
								/>
							</div>
							<div
								ref={(el) => {
									sectionsRef.current["Соусы"] = el;
								}}
							>
								<BurgerIngredientsSection
									extraClass="pt-10"
									title="Соусы"
									ingredients={sauces}
								/>
							</div>
							<div
								ref={(el) => {
									sectionsRef.current["Начинки"] = el;
								}}
							>
								<BurgerIngredientsSection
									extraClass="pt-10"
									title="Начинки"
									ingredients={maines}
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default BurgerIngredients;
