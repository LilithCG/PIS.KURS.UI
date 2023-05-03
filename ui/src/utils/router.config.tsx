import App from "../App";
import React from "react";
import {
    ApartmentOutlined, AppstoreOutlined,
    BookOutlined, DatabaseOutlined, FileDoneOutlined,
    HomeOutlined, TeamOutlined,
    UploadOutlined
} from "@ant-design/icons";
import {MainPage} from "../pages/main/MainPage";
import {UserTable} from "../pages/User/UserTable";
import {UserProfile} from "../pages/User/UserProfile";
import {Roles} from "./access/Roles";
import {Kpi} from "../pages/Kpi/Kpi";
import {ReportTable} from "../pages/Reports/ReportTable";
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
                label: "Задачи",
                element: <MainPage/>,
                path: '/main',
                icon: <AppstoreOutlined />,
            },
            {
                label: "Отчёты",
                element: <ReportTable/>,
                path: '/reports',
                icon: <BookOutlined />,
            },
            {
                label: "KPI",
                element: <Kpi/>,
                path: '/kpi',
                icon: <FileDoneOutlined />,
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