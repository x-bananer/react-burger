import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/actions/auth';
import { getIngredients } from '../../services/actions/ingredients';
import type { AppDispatch } from '../../services/types';

const AppInitializer = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(getUser());
    }, []);

    return null;
};

export default AppInitializer;