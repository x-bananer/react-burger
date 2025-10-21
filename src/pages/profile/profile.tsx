import styles from "./profile.module.css";

import {
	EmailInput,
	PasswordInput,
	Input,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { NavLink, useOutlet, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from '../../services/types';

import { updateUser, logout } from "../../services/actions/auth.js";

const ProfilePage = () => {
	const outlet = useOutlet();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const { user } = useSelector((state: RootState) => state.auth);

	const [form, onChange, setForm] = useForm({
		name: user?.name || "",
		email: user?.email || "",
		password: "",
	});

	const isUserDataChanged =
		user &&
		(form.name !== user.name ||
			form.email !== user.email ||
			form.password !== "");

	const onCancelChange = () => {
	if (!user) return;
		setForm({ name: user.name, email: user.email, password: "" });
	};

	const onSubmitUserUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateUser(form));
	};

	const onClickLogout = async () => {
		try {
			const res = await dispatch(logout());
			if (res?.success) {
				navigate("/login", { replace: true });
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (user) {
			setForm({ name: user.name, email: user.email, password: "" });
		}
	}, [user]);

	return (
		<div className={styles["profile"]}>
			<div className={styles["profile__container"]}>
				<div className={`${styles["profile__aside"]} mr-15`}>
					<div className={`${styles["profile__nav"]} mb-20`}>
						<NavLink
							to="/profile"
							end
							className={styles["profile__nav-link"]}
						>
							{({ isActive }) => (
								<p
									className={
										isActive
											? "text text_type_main-medium"
											: "text text_type_main-medium text_color_inactive"
									}
								>
									Профиль
								</p>
							)}
						</NavLink>
						<NavLink
							to="/profile/orders"
							end
							className={styles["profile__nav-link"]}
						>
							{({ isActive }) => (
								<p
									className={
										isActive
											? "text text_type_main-medium"
											: "text text_type_main-medium text_color_inactive"
									}
								>
									История заказов
								</p>
							)}
						</NavLink>
						<Button
							onClick={onClickLogout}
							htmlType="button"
							extraClass={styles["profile__nav-button"]}
						>
							Выход
						</Button>
					</div>
					<p
						className={`${styles["profile__caption"]} text text_type_main-default text_color_inactive`}
					>
						В этом разделе вы можете изменить свои персональные
						данные
					</p>
				</div>
				<div className={styles["profile__main"]}>
					{!outlet && (
						<form onSubmit={onSubmitUserUpdate}>
							{/* @ts-ignore */}
							<Input
								extraClass="mb-6"
								type="text"
								placeholder="Имя"
								onChange={onChange}
								value={form.name}
								name="name"
								icon="EditIcon"
								autoComplete="name"
							/>
							<EmailInput
								extraClass="mb-6"
								autoComplete="email"
								onChange={onChange}
								placeholder="Логин"
								value={form.email}
								name="email"
								isIcon
							/>
							<PasswordInput
								onChange={onChange}
								value={form.password}
								name="password"
								icon="EditIcon"
								autoComplete="current-password"
							/>
							{isUserDataChanged && (
								<div className="mt-6">
									<Button
										htmlType="submit"
										type="primary"
										size="medium"
									>
										Сохранить
									</Button>
									<Button
										htmlType="button"
										type="secondary"
										size="medium"
										onClick={onCancelChange}
										extraClass="ml-2"
									>
										Отмена
									</Button>
								</div>
							)}
						</form>
					)}
					{outlet}
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
