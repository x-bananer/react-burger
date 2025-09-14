import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/actions/auth.js';
import { getIngredients } from '../../services/actions/ingredients.js';

const AppInitializer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Методы при старте приложения')
        dispatch(getIngredients());
        dispatch(getUser());
    }, []);

    return null;
};

export default AppInitializer;