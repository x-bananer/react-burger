import styles from "./feed-stat.module.css";
import { useSelector } from "react-redux";
import type { FC } from "react";
import type { RootState } from "../../../services/types";

interface FeedStatProps {
	className?: string;
}

const FeedStat: FC<FeedStatProps> = ({ className }) => {
	const data = useSelector((state: RootState) => state.ws.messages);
	const orders = data?.orders || [];
	const total = data?.total || 0;
	const totalToday = data?.totalToday || 0;

	const doneOrders = orders.filter(o => o.status === "done");
	const pendingOrders = orders.filter(o => o.status === "pending");

	const splitColumns = (arr: typeof orders) => {
		const cols = [];
		for (let i = 0; i < arr.length; i += 10) {
			cols.push(arr.slice(i, i + 10));
		}
		return cols;
	};

	const doneColumns = splitColumns(doneOrders);
	const pendingColumns = splitColumns(pendingOrders);

	return (
	    <div className={`${styles["feed-stat"]} ${className}`}>
	        <div className={styles["feed-stat__row"]}>
	            <div>
	                <h3>Готово:</h3>
	                <div className={styles["feed-stat__columns"]}>
	                    {doneColumns.map((col, i) => (
	                        <ul key={i} className={styles["feed-stat__list"]}>
	                            {col.map(order => (
	                                <li key={order._id} className={styles["feed-stat__item"]}>
	                                    {order.number}
	                                </li>
	                            ))}
	                        </ul>
	                    ))}
	                </div>
	            </div>

	            <div>
	                <h3>В работе:</h3>
	                <div className={styles["feed-stat__columns"]}>
	                    {pendingColumns.map((col, i) => (
	                        <ul key={i} className={styles["feed-stat__list"]}>
	                            {col.map(order => (
	                                <li key={order._id} className={styles["feed-stat__item"]}>
	                                    {order.number}
	                                </li>
	                            ))}
	                        </ul>
	                    ))}
	                </div>
	            </div>
	        </div>

	        <div>
	            <h3>Выполнено за всё время:</h3>
	            <p className="text text_type_digits-large">{total}</p>
	        </div>

	        <div>
	            <h3>Выполнено за сегодня:</h3>
	            <p className="text text_type_digits-large">{totalToday}</p>
	        </div>
	    </div>
	);
};

export default FeedStat;