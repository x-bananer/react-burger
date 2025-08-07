import { v4 as uuidv4 } from 'uuid';

import styles from './app.module.css';

import Modal from '../modal/modal.jsx';
import ErrorBoundary from '../error/error-boundary.jsx';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';

import { useState, useEffect } from 'react';

function App() {
	const API_BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

	const [ingredients, setIngredients] = useState([]);
	const [selectedIngredients, setSelectedIngredients] = useState([]);

	const [modal, setModal] = useState(null);

	const handleClickIngredient = (ingredient) => {
		setModal({ type: 'ingredient', data: ingredient });
	};

	const handleClickOrder = (orderData) => {
		setModal({ type: 'order', data: orderData });
	};

	const handleCloseModal = () => {
		setModal(null);
	};

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

				// TODO Временно вручную добавленные выбранные игредиенты
				const bun = data.data.find(item => item.type === 'bun');
				const other = data.data.filter(item => item.type !== 'bun');
				const selectedIngredientsWithUid = [
					...(bun ? [{ ...bun, uid: uuidv4() }] : []),
					...other.map(item => ({ ...item, uid: uuidv4() }))
				];
				setSelectedIngredients(selectedIngredientsWithUid);
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
				<main className={`${styles['app__content']} mt-10 mb-10`}>
					<BurgerIngredients
						className={styles['app__content-item']}
						ingredients={ingredients}
						selectedIngredients={selectedIngredients}
						onClickIngredient={handleClickIngredient}
					/>
					<BurgerConstructor
						className={`${styles['app__content-item']} mt-15`}
						selectedIngredients={selectedIngredients}
						onDeleteIngredient={handleDeleteIngredient}
						onClickOrder={handleClickOrder}
					/>
				</main>
				{modal &&
					<Modal onClose={handleCloseModal}>
						{modal.type === 'ingredient' &&
							<IngredientDetails ingredient={modal.data} />
						}
						{modal.type === 'order' &&
							<OrderDetails order={modal.data} />
						}
					</Modal>
				}
			</ErrorBoundary>
		</div>
	)
}

export default App