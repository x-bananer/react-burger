import ingredients from '../../utils/data.js';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

import { useState } from 'react';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

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

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles['app__content']} mt-10 mb-15`}>
        <BurgerIngredients className={styles['app__content-item']} ingredients={ingredients} selectedIngredients={selectedIngredients} onSelectIngredient={handleSelectIngredient} />
        <BurgerConstructor className={`${styles['app__content-item']} mt-15`} selectedIngredients={selectedIngredients} onDeleteIngredient={handleDeleteIngredient} />
      </main>
    </div>
  )
}

export default App
