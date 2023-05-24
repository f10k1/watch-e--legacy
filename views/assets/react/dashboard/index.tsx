import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./side-bar";
import Home from "./home";
import { Provider } from "react-redux";
import store from "./store";

export default function Dashboard() {
    return <Provider store={store}>
        <BrowserRouter>
            <div className="dashboard-module">
                <SideBar></SideBar>
                <Routes>
                    <Route path="/dashboard">
                        <Route index element={<Home />}></Route>
                    </Route>
                </Routes>
            </div>

        </BrowserRouter>
    </Provider>;
}