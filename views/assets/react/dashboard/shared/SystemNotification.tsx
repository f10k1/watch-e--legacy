import React, { RefObject, useEffect, useRef, useState } from "react";
import { SystemNotificationInterface } from "../interfaces/interfaces";

export default function SystemNotification({ notification, close }: { notification: SystemNotificationInterface, close: Function; }) {

    const [timeoutHandler, setTimeoutHandler]: [ReturnType<typeof setTimeout> | undefined, Function] = useState();

    const nodeRef: RefObject<HTMLDivElement> | undefined = useRef(null);

    useEffect(() => {
        timeoutHandler && window.clearTimeout(timeoutHandler);
        const timeout = setTimeout(() => {
            onClose();
        }, 5000);
        setTimeoutHandler(timeout);
    }, [notification]);

    const onClose = async () => {
        const animationPromise = new Promise(resolve => {
            if (nodeRef.current) {
                const animation = nodeRef.current.animate([{ transform: "translate(-50%, 0px)" }, { transform: "translate(-50%, 50px)" }], { duration: 300, iterations: 1, fill: 'forwards' });
                animation.onfinish = resolve;
                return;
            }
            resolve;
        });
        await animationPromise;
        close();
    };

    useEffect(() => {
        if (nodeRef.current) nodeRef.current.animate([{ transform: "translate(-50%, 50px)" }, { transform: "translate(-50%, 0px)" }], { duration: 300, iterations: 1, fill: 'forwards' });

    }, [nodeRef]);

    return <div ref={nodeRef} className={`system-notification ${notification && notification.type}`}>
        {notification.description}
        <button className="close icon-link" onClick={onClose}><span className="icon icon--close-line"></span></button>
    </div >;
}