import App from "../App";
import React from "react";
import {
    ApartmentOutlined,
    BookOutlined, DatabaseOutlined,
    HomeOutlined, TeamOutlined,
    UploadOutlined
} from "@ant-design/icons";
import {MainPage} from "../pages/main/MainPage";
import {UserTable} from "../pages/User/UserTable";
import {UserProfile} from "../pages/User/UserProfile";
import {Roles} from "./access/Roles";
interface RouteItem {
    label?: React.ReactNode,
    icon?: React.ReactNode,
    element: any,
    path: string,
    authority?: string[],
    children?: RouteItem[]
}

export const routers: RouteItem[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {
                label: "Главная",
                element: <MainPage/>,
                path: '/main',
                icon: <HomeOutlined />,
            },
            {
                label: "Пользователи",
                element: <UserTable/>,
                authority: [
                    Roles.ADMIN.name
                ],
                path: '/users',
                icon: <TeamOutlined />
            },
            {
                element: <UserProfile/>,
                path: '/userProfile',
            },
        ]
    }
]