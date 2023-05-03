import React from "react";
import {Button, Card, Table} from "antd";
import {IUserTableState, userColumns} from "./UsersColumns";

export const UserTable = () => {
    return (
        <div style={{padding: 20}}>
            <Card title={"Пользователи"} extra={<Button type={'primary'}>Создать</Button>}>
                <Table
                    columns={userColumns}
                />
            </Card>
        </div>
    )
}