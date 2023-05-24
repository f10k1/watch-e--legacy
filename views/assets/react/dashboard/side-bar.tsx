import React, { useState } from "react";
import t from '../../ts/helpers/i18n';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { stateType } from "./store";

export default function SideBar() {

    const notifications = useSelector((state: stateType) => state.notifications);

    return <aside>
        <Link to="/dashboard" className="logo icon-link">
            <span className="icon--camera-lens-fill"></span>
            {t('Watch-E')}
        </Link>

        <ul className="clean">
            <li>
                <Link to="/dashboard/charts" className="icon-link"><span className="icon--pie-chart-line"></span>{t('Charts')}</Link>
            </li>
            <li>
                <Link to="/dashboard/cameras" className="icon-link"><span className="icon--camera-line"></span>{t('Cameras')}</Link>
            </li>
            <li>
                <Link to="/dashboard/notifications" className="icon-link"><span className="icon--notification-line"></span>{t('Notifications')}<span className="tooltip">{notifications.length}</span></Link>
            </li>
            <li>
                <Link to="/dashboard/files" className="icon-link"><span className="icon--film-line"></span>{t('Files')}</Link>
            </li>
            <li>
                <Link to="/dashboard/preview" className="icon-link"><span className="icon--video-line"></span>{t('Preview')}</Link>
            </li>
        </ul>
        <hr />
        <ul className="clean">
            <li>
                <Link to="/dashboard/settings" className="icon-link"> <span className="icon--settings-line"></span>{t('Settings')}</Link>
            </li>
            <li>
                <a href="/user/logout" className="icon-link"><span className="icon--logout-box-r-line"></span>{t('Logout')}</a>
            </li>
        </ul>
    </aside>;
}