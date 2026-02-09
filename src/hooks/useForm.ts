import { useState } from "react";

export const useForm = (
	initialValues: any
): [any, (e: React.ChangeEvent<HTMLInputElement>) => void, any] => {
	const [values, setValues] = useState(initialValues);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return [values, handleChange, setValues];
};
