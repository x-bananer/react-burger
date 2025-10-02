import styles from "./reset-password.module.css";

import {
	PasswordInput,
	Input,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { resetPassword } from "../../services/actions/auth.js";
import { useForm } from "../../hooks/useForm.js";

const ResetPasswordPage = () => {
	const navigate = useNavigate();
	const dispatch: any = useDispatch();

	const { canResetPassword } = useSelector((state: any) => state.auth);

	const [form, onChange] = useForm({ token: "", password: "" });

	const onClickToLogin = () => {
		navigate("/login");
	};

	const onSubmitResetPassword = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		try {
			const res = await dispatch(resetPassword(form));

			if (res?.success) {
				navigate("/login", { replace: true });
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (!canResetPassword) {
			navigate("/forgot-password", { replace: true });
		}
	}, [canResetPassword, navigate]);

	return (
		<div className={styles["reset-password"]}>
			<div className={styles["reset-password__container"]}>
				<form
					className={`${styles["reset-password__form"]} mb-20`}
					onSubmit={onSubmitResetPassword}
				>
					<p className="text text_type_main-medium mb-6">
						Восстановление пароля
					</p>
					<PasswordInput
						onChange={onChange}
						placeholder={"Введите новый пароль"}
						value={form.password}
						name={"password"}
						extraClass="mb-6"
					/>
					{/* @ts-ignore */}
					<Input
						extraClass="mb-6"
						type={"text"}
						placeholder={"Введите код из письма"}
						onChange={onChange}
						value={form.token}
						name={"token"}
					/>
					<Button htmlType="submit" type="primary" size="medium">
						Сохранить
					</Button>
				</form>
				<div className={styles["reset-password__form"]}>
					<div>
						<span className="text text_type_main-default text_color_inactive">
							Вспомнили пароль?
						</span>
						<Button
							htmlType="button"
							type="secondary"
							size="medium"
							extraClass="pl-2 pr-2 pt-2 pb-2"
							onClick={onClickToLogin}
						>
							Войти
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
