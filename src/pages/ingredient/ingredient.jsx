import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

import styles from './ingredient.module.css';

const IngredientPage = () => {
    const { id } = useParams();
    const ingredient = useSelector(state =>
        state.ingredients.items.find(i => i._id === id)
    );

    if (!ingredient) return <p>Ингредиент не найден</p>;

    return (
        <div className={`${styles['ingredient']} mt-20`}>
            <IngredientDetails ingredient={ingredient} isPage />
        </div>
    );
};

export default IngredientPage;