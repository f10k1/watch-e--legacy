import React from "react";
import { useSelector } from "react-redux";
import { StateInterface } from "../interfaces/interfaces";
import Notification from "../shared/notification";
export default function NotificationsList() {

    const notifications = useSelector((state: StateInterface) => state.notifications);
    return <div className="main-grid">
        <section className="column-1">
            <ul className="clean notifications sub-section">
                {Object.entries(notifications).map(([key, notification]) => {
                    return <li key={notification.id} className="notification">
                        <Notification notification={notification}></Notification>
                    </li>;
                })}
            </ul>
        </section>
    </div>;
}