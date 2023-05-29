import React, { ReactNode, useEffect } from "react";
import Notification from "./Notification";
import notificationSlice, { useGetNotificationsQuery } from "../store/notifications";
import { useDispatch, useSelector } from "react-redux";
import { StateInterface, NOTIFICATIONS_TYPES } from "../interfaces/interfaces";

export default function NotficiationsWrapper({ children, type }: { children: ReactNode, type: NOTIFICATIONS_TYPES; }) {

    const { data, error, isLoading } = useGetNotificationsQuery('');

    const notifications = useSelector((state: StateInterface) => {
        return state.notifications;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (data !== undefined) dispatch(notificationSlice.actions.add(data));
    }, [data]);

    return <div className="notifications sub-section">
        <span className="title">{children}</span>
        {notifications && Object.entries(notifications).length ? <ul className="clean">
            {Object.entries(notifications).map(([key, notification]) => {
                return <li key={notification.id} className="notification">
                    <Notification notification={notification} expandable={false}></Notification>
                </li>;
            })}
        </ul> : <></>
        }
    </div>;
};