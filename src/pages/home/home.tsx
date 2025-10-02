import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

import styles from './home.module.css';

const HomePage = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients
                className={styles['home__item']}
            />
            <BurgerConstructor
                className={`${styles['home__item']} mt-15`}
            />
        </DndProvider>
    );
}

export default HomePage;