import {createBrowserRouter, createRoutesFromElements, Route, Routes} from "react-router-dom";
import {routers} from "./router.config";
import React from "react";
import Login from "../pages/Login/Login";
import Error404 from "../pages/errors/Error404";
import RequireAuth from "../pages/Login/RequireAuth";
import {ErrorBoundary} from "../pages/errors/ErrorBoundary";

const routing = (
    <>
        <Route path="/" errorElement={<ErrorBoundary/>} element={
            <RequireAuth>
                {routers.at(0)?.element}
            </RequireAuth>}>
            {
                routers.at(0)?.children?.map((route, index) => {
                    if (route.children) {
                        return (
                            <Routes key={index}>
                                {
                                    route.children.map((subRoute, subIndex) => (
                                        <Route key={index + '-' + subIndex}
                                               path={route.path + subRoute.path}
                                               element={route.element}
                                               errorElement={<ErrorBoundary/>}
                                        />

                                    ))
                                }
                            </Routes>
                        )
                    } else {
                        return (
                            <Route key={index} path={route.path} element={route.element}/>
                        )
                    }
                })
            }
        </Route>
        <Route key={"login1"} path={"/login"} errorElement={<ErrorBoundary/>} element={<Login/>}/>
        <Route path={'*'} element={<Error404/>}/>
    </>
)

export const router = createBrowserRouter(
    createRoutesFromElements(routing)
)