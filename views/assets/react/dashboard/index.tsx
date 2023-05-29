import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SideBar from "./shared/SideBar";
import NotificationsList from "./pages/NotificationsList";
import SystemNotificationWrapper from "./shared/SystemNotificationsWrapper";

export default function App() {

    return <Provider store={store}>
        <BrowserRouter>
            <div className="dashboard-module">
                <SideBar></SideBar>
                <Routes>
                    <Route path="/dashboard">
                        <Route index element={<Home />}></Route>
                        <Route path="notifications" element={<NotificationsList />}></Route>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
        <SystemNotificationWrapper></SystemNotificationWrapper>
    </Provider>;
}