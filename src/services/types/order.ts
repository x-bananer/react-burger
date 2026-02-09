export type TOrder = {
	_id: string;
	number: number;
	status: string;
	price: number;
	name: string;
	ingredients: {
		_id: string;
		name: string;
		type: string;
		proteins: number;
		fat: number;
		carbohydrates: number;
		calories: number;
		price: number;
		image: string;
		image_mobile: string;
		image_large: string;
		__v?: number;
		uid?: string;
	}[];
	owner: {
		name: string;
		email: string;
		createdAt: string;
		updatedAt: string;
	};
	createdAt: string;
	updatedAt: string;
};

export type TOrderState = {
	order: TOrder | null;
	isLoading: boolean;
	isError: boolean;
}
