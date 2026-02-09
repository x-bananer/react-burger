import styles from "./feed-item.module.css";

import type { FC } from "react";

interface FeedItemProps {
	className?: string;
}

const FeedItem: FC<FeedItemProps> = ({ className }) => {
	return (
        <div className={`${styles['feed-item']} ${className ?? ''}`}>
			<div className="feed-item__header">
				<div className="feed-item__header-main">

				</div>
				<div className="feed-item__header-aside">

				</div>
			</div>
			<div className="feed-item__content">
				
			</div>
			<div className="feed-item__footer">
				<div className="feed-item__footer-main">

				</div>
				<div className="feed-item__footer-aside">
					
				</div>
			</div>
		</div>
    );
};

export default FeedItem;