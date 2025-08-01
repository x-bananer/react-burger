import ingredients from './utils/data.js';
import './app.css';

import { useState } from 'react';

import AppHeader from './components/appHeader/AppHeader.jsx';
import BurgerIngredients from './components/burgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from './components/burgerConstructor/BurgerConstructor.jsx';

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
    <div className="app">
      <AppHeader />
      <main className="app__content mt-10 mb-15">
        <BurgerIngredients className="app__content-item" ingredients={ingredients} selectedIngredients={selectedIngredients} onSelectIngredient={handleSelectIngredient} />
        <BurgerConstructor className="app__content-item mt-15" selectedIngredients={selectedIngredients} onDeleteIngredient={handleDeleteIngredient} />
      </main>
    </div>
  )
}

export default App
