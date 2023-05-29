import React, { useEffect } from "react";
import Notification from "./Notification";
import notificationSlice, { useGetNotificationsQuery } from "../store/notifications";
import { useDispatch, useSelector } from "react-redux";
import { StateInterface } from "../interfaces/interfaces";

export default function NotficiationsWrapper() {

    const { data, error, isLoading } = useGetNotificationsQuery('');

    const notifications = useSelector((state: StateInterface) => state.notifications);

    const dispatch = useDispatch();

    useEffect(() => {
        if (data !== undefined) dispatch(notificationSlice.actions.add(data));
    }, [data]);

    return <>
        {notifications && Object.entries(notifications).length ? <ul className="clean">
            {Object.entries(notifications).map(([key, notification]) => {
                return <li key={notification.id} className="notification">
                    <Notification notification={notification} expandable={false}></Notification>
                </li>;
            })}
        </ul> : <></>
        }
    </>;
};