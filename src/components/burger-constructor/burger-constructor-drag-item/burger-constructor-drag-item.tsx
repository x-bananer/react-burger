import styles from "./burger-constructor-drag-item.module.css";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
	DragIcon,
	ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import {
	moveIngredient,
	removeIngredient,
} from "../../../services/actions/constructor";

interface BurgerConstructorDragItemProps {
	ingredient: {
		uid: string;
		_id: string;
		name: string;
		price: number;
		image: string;
		type: string;
	};
	index: number;
	extraClass?: string;
}

interface DragItem {
	uid: string;
	index: number;
}

const BurgerConstructorDragItem: React.FC<BurgerConstructorDragItemProps> = ({
	extraClass,
	ingredient,
	index,
}) => {
	const ref = useRef(null);
	const dispatch = useDispatch();

	const [, drop] = useDrop<DragItem>({
		accept: "filling",
		hover(item) {
			if (!ref.current) return;
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) return;

			dispatch(moveIngredient(dragIndex, hoverIndex));
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: "filling",
		item: { uid: ingredient.uid, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));

	const onDeleteIngredient = () => {
		dispatch(removeIngredient(ingredient.uid));
	};

	return (
		<div
			ref={ref}
			style={{ opacity: isDragging ? 0.3 : 1 }}
			className={styles["burger-constructor-drag-item"]}
		>
			<DragIcon type="primary" className="mr-2" />
			<ConstructorElement
				extraClass={extraClass}
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={onDeleteIngredient}
			/>
		</div>
	);
};

export default BurgerConstructorDragItem;
