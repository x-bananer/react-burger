import { BrowserRouter, Routes, Route } from 'react-router-dom';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header.jsx';

import HomePage from '../../pages/home/home.jsx';
import LoginPage from '../../pages/login/login.jsx';
import RegisterPage from '../../pages/register/register.jsx';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password.jsx';
import ResetPasswordPage from '../../pages/reset-password/reset-password.jsx';
import ProfilePage from '../../pages/profile/profile.jsx';
import ErrorPage from '../../pages/error';

const App = () => {
	return (
		<BrowserRouter>
			<div className={styles.app}>
				<AppHeader />
				<main className={`${styles['app__content']} mt-10 mb-10`}>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/register' element={<RegisterPage />} />
						<Route path='/forgot-password' element={<ForgotPasswordPage />} />
						<Route path='/reset-password' element={<ResetPasswordPage />} />
						<Route path='*' element={<ErrorPage />} />
						<Route path='/profile' element={<ProfilePage />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	)
}

export default App