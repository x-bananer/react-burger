import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import type { RootState } from "../../services/types";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { wsConnectionStart, wsConnectionClosed } from "../../services/actions/ws";
import { getWsMessages } from "../../services/selectors";

import styles from "./feed.module.css";

import FeedList from "../../components/feed/feed-list/feed-list";
import FeedStat from "../../components/feed/feed-stat/feed-stat";

const FeedPage = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state: RootState) => getWsMessages(state));

	console.log(messages)

    useEffect(() => {
        dispatch(wsConnectionStart("wss://norma.education-services.ru/orders/all"));
        return () => {
            dispatch(wsConnectionClosed());
        };
    }, [dispatch]);

    return (
        <DndProvider backend={HTML5Backend}>
            <section className={styles.feed}>
                <FeedList className={styles["feed__item"]} />
				<FeedStat className={styles["feed__item"]} />
            </section>
        </DndProvider>
    );
};

export default FeedPage;
