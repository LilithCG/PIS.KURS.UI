import React from "react";
import {SearchUnit} from "../../components/SearchUnit";
import {Tag} from "antd";

export interface IUserTableState {
    key: string | number,
    id: string | number,
    login: string,
    email: string,
    fio: string,
    roles: string[]
}

export const userColumns = [
    {
        title: 'ФИО',
        dataIndex: 'fio',
        key: 'fio',
        sorter: (a: IUserTableState, b: IUserTableState) => String(a.fio).localeCompare(String(b.fio)),
        ...SearchUnit('fio')
    },
    {
        title: 'Логин',
        dataIndex: 'login',
        key: 'login',
        sorter: (a: IUserTableState, b: IUserTableState) => String(a.login).localeCompare(String(b.login)),
        ...SearchUnit('login')
    },
    {
        title: 'Почта',
        dataIndex: 'email',
        key: 'email',
        sorter: (a: IUserTableState, b: IUserTableState) => String(a.email).localeCompare(String(b.email)),
        ...SearchUnit('email')
    },
    {
        title: 'Роли',
        dataIndex: 'roles',
        key: 'roles',
        sorter: (a: IUserTableState, b: IUserTableState) => String(a.roles).localeCompare(String(b.roles)),
        render: (roles: string[]) => {
            return (
                <>
                    {roles.map((role) => (
                        <Tag color={'green'} key={role}>
                            {role}
                        </Tag>
                    ))}
                </>
            )
        }
    },
]
