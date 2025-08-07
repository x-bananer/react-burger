import { v4 as uuidv4 } from 'uuid';

import styles from './app.module.css';

import Modal from '../modal/modal.jsx';
import ErrorBoundary from '../error/error-boundary.jsx';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

import { useState, useEffect } from 'react';

function App() {
	const API_BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const [ingredients, setIngredients] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleOpenModal = () => {
		setIsModalVisible(true);
	}

	const handleCloseModal = () => {
		setIsModalVisible(false);
	}

	const handleSelectIngredient = (ingredient) => {
		setSelectedIngredients(prev => {
			const isBun = ingredient.type === 'bun';

			const updated = isBun
				? [...prev.filter(i => i.type !== 'bun')]
				: [...prev];

			const alreadySelectedBun = isBun && prev.find(i => i.type === 'bun')?._id === ingredient._id;

			if (alreadySelectedBun) {
				return prev;
			} else {
				return [...updated, { ...ingredient, uid: uuidv4() }];
			}
		});
	};

	const handleDeleteIngredient = (ingredientUid) => {
		setSelectedIngredients(prev =>
			prev.filter(ingredient => ingredient.uid !== ingredientUid)
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

				<button onClick={handleOpenModal}>Открыть модальное окно</button>
				{isModalVisible &&
					<Modal title="Детали ингредиента" onClose={handleCloseModal}>
						<p>Спасибо за внимание!</p>
					</Modal>
				}
			</ErrorBoundary>
		</div>
	)
}

export default App