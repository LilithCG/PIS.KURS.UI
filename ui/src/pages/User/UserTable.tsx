import React, {useEffect, useState} from "react";
import {Button, Card, Form, Input, Modal, Select, Space, Table} from "antd";
import {IUserTableState, userColumns} from "./UsersColumns";
import {query} from "../../utils/GraphQlQuery";

export const UserTable = () => {
    const [users, setUsers] = useState<IUserTableState[]>();
    const [visible, setVisible] = useState<boolean>(false)
    const [updater, setUpdater] = useState(true);
    const update = () => setUpdater(!updater);

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
    }, [updater])

    return (
        <div style={{padding: 20}}>
            <Card title={"Пользователи"} extra={<Button type={'primary'}  onClick={() => setVisible(true)}>Создать пользователя</Button>}>
                <Table
                    columns={userColumns}
                    dataSource={users}
                />
            </Card>
            <Modal
                open={visible}
                title={"Создание пользователя"}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <div style={{height: "30px"}}></div>
                <Form
                    name="createUser"
                    labelCol={{span: 8}}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{remember: true}}
                    onFinish={(values) => {
                        let otchestvo = (values.otchestvo) ? `"${values.otchestvo}"` : null

                        query(`mutation{
                          createUser(input: {user: {
                            name: "${values.name}"
                            surname: "${values.surname}"
                            otchestvo: ${otchestvo}
                            contract: "${12345}"
                            roleId: "${values.role}"
                            login: "${values.login}"
                            password: "${values.password}"
                          }}) {
                            user{
                              id
                            }
                          }
                        }`).then(() => {
                            setVisible(false)
                            update()
                        })
                    }
                    }
                    autoComplete="off"
                >
                    <Form.Item
                        label="Фамилия"
                        name="surname"
                        rules={[{required: true, message: 'Введите фамилию!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Имя"
                        name="name"
                        rules={[{required: true, message: 'Введите имя!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Отчество"
                        name="otchestvo"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Логин"
                        name="login"
                        rules={[{required: true, message: 'Введите логин!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{required: true, message: 'Введите пароль!'}]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Роль"
                        name="role"
                        rules={[{required: true, message: 'Выберите роль!'}]}
                    >
                        <Select
                            defaultValue="1"
                            options={[
                                { value: '1', label: 'Работник' },
                                { value: '2', label: 'Менеджер' },
                                { value: '3', label: 'Администратор' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Space direction={"horizontal"}>
                            <Button type={"primary"} htmlType="submit">
                                Создать
                            </Button>
                            <Button onClick={() => setVisible(false)}>
                                Отмена
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    )
}