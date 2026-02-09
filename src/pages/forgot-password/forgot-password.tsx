import styles from "./forgot-password.module.css";

import React from "react";
import {
	EmailInput,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../services/types";
import { useForm } from "../../hooks/useForm";

import { forgotPassword } from "../../services/actions/auth";

const ForgotPasswordPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const [form, onChange] = useForm({ email: "" });

	const onClickToLogin = () => {
		navigate("/login");
	};

	const onSubmitResetPassword = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		try {
			const res = await dispatch(forgotPassword(form));

			if (res?.success) {
				navigate("/reset-password", { replace: true });
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className={styles["forgot-password"]}>
			<div className={styles["forgot-password__container"]}>
				<form
					className={`${styles["forgot-password__form"]} mb-20`}
					onSubmit={onSubmitResetPassword}
				>
					<p className="text text_type_main-medium mb-6">
						Восстановление пароля
					</p>
					<EmailInput
						extraClass="mb-6"
						placeholder="Укажите e-mail"
						autoComplete="email"
						onChange={onChange}
						value={form.email}
						name={"email"}
						isIcon={false}
					/>
					<Button htmlType="submit" type="primary" size="medium">
						Восстановить
					</Button>
				</form>
				<div className={styles["forgot-password__form"]}>
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

export default ForgotPasswordPage;
