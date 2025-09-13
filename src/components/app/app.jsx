import { BrowserRouter, Routes, Route } from 'react-router-dom';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header.jsx';

import HomePage from '../../pages/home/home.jsx';
import LoginPage from '../../pages/login/login.jsx';
import RegisterPage from '../../pages/register/register.jsx';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password.jsx';
import ResetPasswordPage from '../../pages/reset-password/reset-password.jsx';
import ErrorPage from '../../pages/error';

const App = () => {
	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={`${styles['app__content']} mt-10 mb-10`}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/login' element={<LoginPage />}></Route>
						<Route path='/register' element={<RegisterPage />}></Route>
						<Route path='/forgot-password' element={<ForgotPasswordPage />}></Route>
						<Route path='/reset-password' element={<ResetPasswordPage />}></Route>
						<Route path='*' element={<ErrorPage />} />
					</Routes>
				</BrowserRouter>
			</main>
		</div>
	)
}

export default App