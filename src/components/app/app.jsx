import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './app.module.css';

import ErrorBoundary from '../error/error-boundary.jsx';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

function App() {
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