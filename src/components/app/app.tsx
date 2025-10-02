import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header.js';
import IngredientDetails from '../ingredient-details/ingredient-details.js';
import Modal from '../modal/modal.js';

import HomePage from '../../pages/home/home';
import LoginPage from '../../pages/login/login.js';
import RegisterPage from '../../pages/register/register.js';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password.js';
import ResetPasswordPage from '../../pages/reset-password/reset-password.js';
import ProfilePage from '../../pages/profile/profile.js';
import ErrorPage from '../../pages/error.js';
import IngredientPage from '../../pages/ingredient/ingredient.js';
import OrdersPage from '../../pages/profile/orders/orders.js'

import ProtectedRoute from '../../routes/protected-route.js';

const App = () => {
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