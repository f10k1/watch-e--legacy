import React, { useEffect, useMemo } from "react";
import generateCharts from '../../../ts/functions/chart';
import t from '../../../ts/helpers/i18n';
import { useSelector, useDispatch } from "react-redux";
import { notificationSlice, useGetNotificationsQuery } from "../store/notifications";
import { NotificationInterface, StateInterface } from "../interfaces/interfaces";
import Notification from "../shared/notification";

export default function Home() {

    const { data: notificationsData, error: notificationsError, isLoading: notificationsLoading } = useGetNotificationsQuery('');

    const notifications = useSelector((state: StateInterface) => state.notifications);

    const dispatch = useDispatch();

    useEffect(() => {
        if (notificationsData !== undefined) dispatch(notificationSlice.actions.add(notificationsData));
    }, [notificationsData]);

    useEffect(() => {
        generateCharts('bar', '#chart', 'ajax/chart/notification/hour', { maintainAspectRatio: false }, t('Notifications by hour'));
        generateCharts('doughnut', '#chart2', 'ajax/chart/notification/hour', { maintainAspectRatio: false }, t('Notifications by hour'));
        generateCharts('pie', '#chart3', 'ajax/chart/notification/hour', { maintainAspectRatio: false }, t('Notifications by hour'));
    }, []);

    return <div className="main-grid">
        <section className="column-1">
            <div id="chart" className="sub-section">
                <canvas></canvas>
            </div>
            <div className="sub-section">
                <span className="title">{t('Files')}</span>
            </div>
            <div className="row">
                <div id="chart2" className="column sub-section">
                    <canvas></canvas>
                </div>
                <div id="chart3" className="column sub-section">
                    <canvas></canvas>
                </div>
            </div>
            <div className="sub-section">
                <span className="title">{t('Preview')}</span>
            </div>
        </section>
        <section className="column-2">
            <div className="notifications sub-section">
                <span className="title">{t('Notifications')}</span>
                <div>
                    {notifications && Object.entries(notifications).length ?
                        <ul className="clean">
                            {Object.entries((notifications as NotificationInterface[])).map(([key, notification]) => {
                                return <li key={notification.id} className="notification">
                                    <Notification notification={notification} expandable={false}></Notification>
                                </li>;
                            })}
                        </ul>
                        : <span>{t('No new notifications')}</span>}
                </div>
            </div>
            <div className="cameras sub-section">
                <span className="title">{t('Your cameras')}</span>
            </div>
        </section>
    </div>;
}