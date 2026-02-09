import styles from "./feed-list.module.css";

import type { FC } from "react";

interface FeedListProps {
	className?: string;
}

const FeedList: FC<FeedListProps> = ({ className }) => {
    const isLoading = false;
    const isError = false;


	return (
        <div className={className}>
			<h1 className="text text_type_main-large">Лента заказов</h1>

			{isLoading && (
				<p className="text text_type_main-default text_color_inactive mt-10">
					Загружаем заказы...
				</p>
			)}

			{isError && (
				<p className="text text_type_main-default text_color_inactive mt-10">
					Ошибка загрузки заказов, попробуйте перезагрузить
					страницу
				</p>
			)}

			{!isLoading && !isError && (
				<>
					<div className={styles["feed-list__scroll-wrap"]}>
						<div
							className={styles["feed-list__scroll"]}
						>
							
						</div>
					</div>
				</>
			)}
		</div>
    );
};

export default FeedList;