import React from "react";
import { useSelector } from "react-redux";
import { NOTIFICATIONS_TYPES, StateInterface } from "../interfaces/interfaces";
import NotificationsWrapper from "../shared/NotificationsWrapper";
import t from "../../../ts/helpers/i18n";
export default function NotificationsList() {

    const notifications = useSelector((state: StateInterface) => state.notifications);
    return <div className="main-grid">
        <section className="column-1">
            <NotificationsWrapper type={NOTIFICATIONS_TYPES.ALL}>
                {t('Notifications')}
            </NotificationsWrapper>
        </section>
        <section className="column-2">
            <NotificationsWrapper type={NOTIFICATIONS_TYPES.STARRED}>
                {t('Starred Notifications')}
            </NotificationsWrapper>
        </section>
    </div>;
}