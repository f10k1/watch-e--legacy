import React, { useEffect } from "react";
import generateCharts from '../../../ts/functions/chart';
import t from '../../../ts/helpers/i18n';
import NotificationsWrapper from "../shared/NotificationsWrapper";
import { NOTIFICATIONS_TYPES } from "../interfaces/interfaces";

export default function Home() {
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
            <NotificationsWrapper type={NOTIFICATIONS_TYPES.UNWATCHED}>
                {t('Notifications')}
            </NotificationsWrapper>
            <div className="cameras sub-section">
                <span className="title">{t('Your cameras')}</span>
            </div>
        </section >
    </div >;
}