import React, { useState } from "react";
import t from "../../../ts/helpers/i18n";
import { useAppDispatch } from "../store/store";
import { NotificationInterface } from "../interfaces/interfaces";
import { Link } from "react-router-dom";
import { deleteNotification, markNotificationAsWatched } from "../store/notifications";


function Notification({ notification, expandable }: { notification: NotificationInterface, expandable: boolean; }) {

    const dispatch = useAppDispatch();

    const [expand, setExpand] = useState(() => false);
    const markAsWatched = () => {
        dispatch(markNotificationAsWatched(notification.id));
    };

    const removeNotification = () => {
        dispatch(deleteNotification(notification.id));
    };

    return <>
        <div className="notification-title">
            <span className="icon icon--notification-line"></span>
            {!expandable ? <Link to="/dashboard/notifications" className="icon-link">{notification.title}</Link> : <button className="icon-link" onClick={() => setExpand((state) => !state)}>{notification.title}</button>}
            <div className="notification-controls">
                {!notification.watched ? <button className="icon-link tooltip" onClick={markAsWatched}>
                    <span className="icon icon--eye-line"></span>
                    <div className="tooltip-text">{t('Mark as watched')}</div>
                </button> : <></>}
                <button className="icon-link tooltip" onClick={removeNotification}>
                    <span className="icon icon--close-line"></span>
                    <div className="tooltip-text">{t('Delete')}</div>
                </button>
            </div>
        </div>
        {expand ? <div className="notification-desc">
            {notification.description}
        </div> : <></>}

    </>;
}

Notification.defaultProps = {
    expandable: true
};

export default Notification;