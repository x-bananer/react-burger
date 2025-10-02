import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/actions/auth';
import { getIngredients } from '../../services/actions/ingredients';

const AppInitializer = () => {
    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(getUser());
    }, []);

    return null;
};

export default AppInitializer;