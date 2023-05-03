import React, {useEffect, useState} from "react";
import {Button, Card, Form, Input, Modal, Space, Table} from "antd";
import {query} from "../../utils/GraphQlQuery";
import {ITaskTableState, tasksColumns} from "./TasksColumn";

export const MainPage = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [tasks, setTasks] = useState<ITaskTableState[]>()
    const [updater, setUpdater] = useState(true);
    const update = () => setUpdater(!updater);

    useEffect(() => {
        query(`{
          allTasks{
            nodes{
              id
              name
              description
            }
          }
        }`, 3).then((x: any[]) => {
            const allTasks: ITaskTableState[] = x.map((it: any) => ({
                key: it.id,
                id: it.id,
                name: it.name,
                description: it.description
            } as ITaskTableState))
            setTasks(allTasks)
        })
    }, [updater])

    return (
        <div style={{padding: 20}}>
            <Card title={"Задачи"}
                  extra={<Button type={'primary'} onClick={() => setVisible(true)}>Создать задачу</Button>}>
                <Table
                    columns={tasksColumns}
                    dataSource={tasks}
                />
            </Card>
            <Modal
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <div style={{height: "30px"}}></div>
                <Form
                    name="createTask"
                    labelCol={{span: 8}}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{remember: true}}
                    onFinish={(values) => {
                        query(`mutation{
                          createTask(input: {task: {
                            name: "${values.name}"
                            description: "${values.description}"
                          }}) {
                            task{
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
                        label="Название"
                        name="name"
                        rules={[{required: true, message: 'Введите имя!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Описание"
                        name="description"
                    >
                        <Input/>
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
    );
}
