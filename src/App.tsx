import ingredients from './data/ingredients';
import './app.css';

import AppHeader from './components/appHeader/AppHeader.jsx';
import BurgerIngredients from './components/burgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from './components/burgerConstructor/BurgerConstructor.jsx';

function App() {

  return (
    <div className="app">
      <AppHeader />
      <main className="app__content mt-10 mb-15">
        <BurgerIngredients className="app__content-item" ingredients={ingredients} />
        <BurgerConstructor className="app__content-item" />
      </main>
    </div>
  )
}

export default App
