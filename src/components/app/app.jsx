import styles from './app.module.css';

import ErrorBoundary from '../error/error-boundary.jsx';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

import { useState, useEffect } from 'react';

function App() {
	const API_BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const [ingredients, setIngredients] = useState([]);

	const handleSelectIngredient = (ingredient) => {
		if (ingredient.type === 'bun') {
			const selectedBun = selectedIngredients.find(item => item.type === 'bun');

			if (selectedBun) {
				if (selectedBun._id === ingredient._id) return;

				setSelectedIngredients(prev =>
					[...prev.filter(item => item.type !== 'bun'), ingredient]
				);
			} else {
				setSelectedIngredients(prev => [...prev, ingredient]);
			}
		} else {
			setSelectedIngredients(prev => [...prev, ingredient]);
		}
	};

	const handleDeleteIngredient = (indexToRemove) => {
		setSelectedIngredients(prev =>
			prev.filter((_, i) => i !== indexToRemove)
		);
	};

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const res = await fetch(API_BASE_URL);

				if (!res.ok) {
					throw new Error(res);
				}

				const data = await res.json();
				setIngredients(data.data);
			} catch (err) {
				console.error('Ошибка при получении ингредиентов:', err);
				alert(`Ошибка при получении ингредиентов: ${err}`)
			}
		};

		fetchIngredients();
	}, []);

	return (
		<div className={styles.app}>
			<ErrorBoundary>
				<AppHeader />
				<main className={`${styles['app__content']} mt-10 mb-15`}>
					<BurgerIngredients className={styles['app__content-item']} ingredients={ingredients} selectedIngredients={selectedIngredients} onSelectIngredient={handleSelectIngredient} />
					<BurgerConstructor className={`${styles['app__content-item']} mt-15`} selectedIngredients={selectedIngredients} onDeleteIngredient={handleDeleteIngredient} />
				</main>
			</ErrorBoundary>
		</div>
	)
}

export default App