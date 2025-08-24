import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './app.module.css';

import ErrorBoundary from '../error/error-boundary.jsx';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

import { useState, useEffect } from 'react';

function App() {
	// const API_BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

	// const [ingredients, setIngredients] = useState([]);
	// const [selectedIngredients, setSelectedIngredients] = useState([]);

	// TODO Старый функционал добавления ингредиента в список выбранных ингредиентов
	// const handleSelectIngredient = (ingredient) => {
	// 	setSelectedIngredients(prev => {
	// 		const isBun = ingredient.type === 'bun';

	// 		const updated = isBun
	// 			? [...prev.filter(i => i.type !== 'bun')]
	// 			: [...prev];

	// 		const alreadySelectedBun = isBun && prev.find(i => i.type === 'bun')?._id === ingredient._id;

	// 		if (alreadySelectedBun) {
	// 			return prev;
	// 		} else {
	// 			return [...updated, { ...ingredient, uid: uuidv4() }];
	// 		}
	// 	});
	// };



	// useEffect(() => {
	// 	const fetchIngredients = async () => {
	// 		try {
	// 			const res = await fetch(API_BASE_URL);

	// 			if (!res.ok) {
	// 				throw new Error(res);
	// 			}

	// 			const data = await res.json();
	// 			setIngredients(data.data);

	// 			// TODO Временно вручную добавленные выбранные игредиенты
	// 			const bun = data.data.find(item => item.type === 'bun');
	// 			const other = data.data.filter(item => item.type !== 'bun');
	// 			const selectedIngredientsWithUid = [
	// 				...(bun ? [{ ...bun, uid: uuidv4() }] : []),
	// 				...other.map(item => ({ ...item, uid: uuidv4() }))
	// 			];
	// 			setSelectedIngredients(selectedIngredientsWithUid);
	// 		} catch (err) {
	// 			console.error('Ошибка при получении ингредиентов:', err);
	// 			alert(`Ошибка при получении ингредиентов: ${err}`)
	// 		}
	// 	};

	// 	fetchIngredients();
	// }, []);

	return (
		<div className={styles.app}>
			<ErrorBoundary>
				<AppHeader />
				<main className={`${styles['app__content']} mt-10 mb-10`}>
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients
							className={styles['app__content-item']}
						/>
						<BurgerConstructor
							className={`${styles['app__content-item']} mt-15`}
						/>
					</DndProvider>
				</main>
			</ErrorBoundary>
		</div>
	)
}

export default App