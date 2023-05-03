import React from 'react';
import {Button, Card, Form, Input} from 'antd';
import {PRIMARY_COLOR, PRIMARY_SPECIAL_COLOR, tokenPass} from "../../utils/consts";
import {LockOutlined, LoginOutlined, UserOutlined} from "@ant-design/icons";
import {Blocks} from "react-loader-spinner";
import {useLocation} from "react-router-dom";
import {Container} from "typescript-ioc";
import {router} from "../../utils/routes";
import {setCookiesToken} from "./TokenUtil";


const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
    const location = useLocation();

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            height: "100vh"
        }}>
            <Card
                title="Вход в систему"
                headStyle={{borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_SPECIAL_COLOR, color: "white"}}
                style={{
                    backgroundColor: "white",
                    marginTop: "0vh",
                    borderColor: PRIMARY_COLOR
                }}
                extra={<Blocks
                    height="30"
                    width="30"
                    color="white"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                />}
            >
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{remember: true}}
                    onFinish={(values) => {
                                setCookiesToken(tokenPass)
                                if (location.pathname == "/login")
                                    router.navigate("/main")
                                else
                                    router.navigate(location.pathname)}
                    }
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="login"
                        rules={[{required: true, message: 'Введите логин!'}]}
                    >
                        <Input placeholder={"Логин"} prefix={<UserOutlined style={{color: PRIMARY_COLOR}}/>}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Введите пароль!'}]}
                    >
                        <Input.Password placeholder={"Пароль"} prefix={<LockOutlined style={{color: PRIMARY_COLOR}}/>}/>
                    </Form.Item>

                    <Form.Item>
                        <Button style={{backgroundColor: PRIMARY_COLOR, color: "white"}} htmlType="submit"
                                icon={<LoginOutlined/>}>
                            Войти в систему
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
};

export default Login;