import React from "react";
export interface ITaskTableState {
    key: string | number,
    id: string | number,
    name: string,
    description: string,

}

export const tasksColumns = [
    {
        title: 'ИД',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Описание',
        dataIndex: 'description',
        key: 'description',
    },
]
