import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import Modal from '../modal/modal.jsx';

import HomePage from '../../pages/home/home.jsx';
import LoginPage from '../../pages/login/login.jsx';
import RegisterPage from '../../pages/register/register.jsx';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password.jsx';
import ResetPasswordPage from '../../pages/reset-password/reset-password.jsx';
import ProfilePage from '../../pages/profile/profile.jsx';
import ErrorPage from '../../pages/error';
import IngredientPage from '../../pages/ingredient/ingredient.jsx';
import OrdersPage from '../../pages/profile/orders/orders.jsx'

import ProtectedRoute from '../../routes/protected-route.jsx';

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

					<Route path='/login' element={<ProtectedRoute onlyUnAuth={true} element={<LoginPage />} />} />
					<Route path='/register' element={<ProtectedRoute onlyUnAuth={true} element={<RegisterPage />} />} />
					<Route path='/forgot-password' element={<ProtectedRoute onlyUnAuth={true} element={<ForgotPasswordPage />} />} />
					<Route path='/reset-password' element={<ProtectedRoute onlyUnAuth={true} element={<ResetPasswordPage />} />} />

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