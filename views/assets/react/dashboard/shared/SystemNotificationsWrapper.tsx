import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateInterface, SystemNotificationInterface } from "../interfaces/interfaces";
import SystemNotification from "./SystemNotification";
import systemSlice from "../store/system";

export default function SystemNotificationWrapper() {

    const notifications = useSelector((state: StateInterface) => state.system.notificationQueue);
    const dispatch = useDispatch();

    const [currentNotification, setCurrentNotification]: [SystemNotificationInterface | null, Function] = useState(() => notifications[0] ?? null);

    const onClose = useCallback(() => {
        dispatch(systemSlice.actions.remove());
        setCurrentNotification(null);
    }, []);

    useEffect(() => {
        if (!currentNotification && notifications.length) {
            setCurrentNotification(notifications[0]);
        }
    }, [notifications, currentNotification]);

    return <>
        {currentNotification && <SystemNotification notification={currentNotification} close={onClose}></SystemNotification>}
    </>;

}