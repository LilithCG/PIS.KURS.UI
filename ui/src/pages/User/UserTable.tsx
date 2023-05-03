import React, {useEffect, useState} from "react";
import {Button, Card, Table} from "antd";
import {IUserTableState, userColumns} from "./UsersColumns";
import {query} from "../../utils/GraphQlQuery";

export const UserTable = () => {
    const [users, setUsers] = useState<IUserTableState[]>();

    useEffect(() => {
        query(`{
          allUsers{
            nodes{
              id
              name
              surname
              otchestvo
              login
              mail
              phone
            }
          }
        }`, 3).then((x: any[]) => {
            const allUsers: IUserTableState[] = x.map((it: any) => ({
                key: it.id,
                id: it.id,
                login: it.login,
                mail: it.mail,
                fio: it.surname + " " + it.name + " " + it.otchestvo,
                phone: it.phone
            } as IUserTableState))
            setUsers(allUsers)
        })
    }, [])

    return (
        <div style={{padding: 20}}>
            <Card title={"Пользователи"} extra={<Button type={'primary'}>Создать</Button>}>
                <Table
                    columns={userColumns}
                    dataSource={users}
                />
            </Card>
        </div>
    )
}