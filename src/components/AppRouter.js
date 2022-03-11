import React from 'react';
import {Route, Switch, Redirect, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../routes";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/const";

const AppRouter = () => {
    const user = false;
    return <Routes>
        {user
            ? (
                privateRoutes.map(({path, Element, toPath}) =>
                    <Route key={path} path={path} element={
                        <Element to={toPath ? toPath : ''}/>}
                    />)

            )
            : (
                publicRoutes.map(({path, Element, toPath}) =>
                    <Route key={path} path={path} element={
                        <Element to={toPath ? toPath : ''}/>}
                    />))}
    </Routes>
};

export default AppRouter;