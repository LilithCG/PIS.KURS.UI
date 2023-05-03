import React from "react";
export interface IUserTableState {
    key: string | number,
    id: string | number,
    login: string,
    mail: string,
    fio: string,
    phone: string
}

export const userColumns = [
    {
        title: 'ФИО',
        dataIndex: 'fio',
        key: 'fio',
    },
    {
        title: 'Логин',
        dataIndex: 'login',
        key: 'login',
    },
    {
        title: 'Почта',
        dataIndex: 'mail',
        key: 'mail',
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
    },
]
