import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import type { FC } from 'react';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import HomePage from '../../pages/home/home';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import ErrorPage from '../../pages/error';
import IngredientPage from '../../pages/ingredient/ingredient';
import OrdersPage from '../../pages/profile/orders/orders';

import ProtectedRoute from '../../routes/protected-route';

const App: FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const state = location.state;

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={`${styles['app__content']} mt-10 mb-10`}>
				<Routes location={state?.background || location}>
					<Route path='/' element={<HomePage />} />

					<Route path='/login' element={<ProtectedRoute onlyUnAuth element={<LoginPage />} />} />
					<Route path='/register' element={<ProtectedRoute onlyUnAuth element={<RegisterPage />} />} />
					<Route path='/forgot-password' element={<ProtectedRoute onlyUnAuth element={<ForgotPasswordPage />} />} />
					<Route path='/reset-password' element={<ProtectedRoute onlyUnAuth element={<ResetPasswordPage />} />} />

					<Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />}>
						<Route path="orders" element={<OrdersPage />} />
					</Route>

					<Route path='/ingredients/:id' element={<IngredientPage />} />
					<Route path='*' element={<ErrorPage />} />
				</Routes>

				{state?.background && (
					<Routes>
						<Route
							path='/ingredients/:id'
							element={
								<Modal onClose={() => navigate(-1)}>
									<IngredientDetails />
								</Modal>
							}
						/>
					</Routes>
				)}
			</main>
		</div>
	);
};

export default App;