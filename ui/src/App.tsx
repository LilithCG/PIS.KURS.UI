import React, {useEffect, useState} from "react";
import {Button, ConfigProvider, FloatButton, Layout, Menu, Space} from "antd";
import {
    CodeOutlined,
    LeftOutlined, LogoutOutlined, RightOutlined, UserOutlined
} from "@ant-design/icons";
import ru_RU from 'antd/locale/ru_RU';
import {routers} from "./utils/router.config";
import SubMenu from "antd/es/menu/SubMenu";
import {Link, Route, Routes} from "react-router-dom";
import MenuItem from "antd/es/menu/MenuItem";
import {router} from "./utils/routes";
import {PRIMARY_COLOR} from "./utils/consts";
import {deleteCookiesToken, getCurrentUser} from "./pages/Login/TokenUtil";
import Error403 from "./pages/errors/Error403";


const {Header, Content, Footer, Sider} = Layout;


const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    useEffect(
        () => {
            (location.pathname == '/') ? router.navigate('/main') : null;

        }, []
    )

    return (
        <ConfigProvider
            locale={ru_RU}
            theme={{
                token: {
                    colorPrimary: PRIMARY_COLOR,
                    borderRadius: 4
                },
            }}
        >
            <Layout style={{minHeight: '100vh'}}>
                <Sider trigger={null} style={{background: 'white'}} collapsible collapsed={collapsed}
                       onCollapse={(value) => setCollapsed(value)}>
                    {collapsed ? <div style={{height: 20, margin: 26, color: PRIMARY_COLOR, fontSize: 16}}>КМ</div>
                        : <div style={{height: 50, margin: 16, color: PRIMARY_COLOR, fontSize: 16}}>Корпоративный<br/>мессенджер
                        </div>}
                    <Menu theme="light" mode="inline"
                          defaultSelectedKeys={(location.pathname == '/') ? ["0"] : [String(routers.at(0)?.children?.filter(item => item.label != null).map((value, index) => {
                              if (value.path == location.pathname) return index
                          }).filter(item => item !== undefined))]}>
                        {
                            routers.at(0)?.children?.filter((route, _) => !!route.label && (!route.authority?.length || getCurrentUser().roles.filter(el => route.authority!!.includes(el)).length > 0)).map((route, index) => {
                                if (route.children) {
                                    return (
                                        <SubMenu key={index} title={<span>{route.icon || null}<span
                                            className="nav-text">{route.label}</span></span>}>
                                            {
                                                route.children.filter((subRoute, _) => !!subRoute.label).map((subRoute, subIndex) => (
                                                    <MenuItem key={index + '-' + subIndex}>
                                                        <Link
                                                            to={route.path + subRoute.path}>{subRoute.label}</Link>
                                                    </MenuItem>
                                                ))
                                            }
                                        </SubMenu>
                                    )
                                } else {
                                    return (
                                        <MenuItem key={index}>
                                            <Link to={route.path}>
                                                {route.icon || null}
                                                <span className="nav-text">{route.label}</span>
                                            </Link>
                                        </MenuItem>
                                    )
                                }
                            })
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{padding: 0, background: "white"}}>
                        {React.createElement(collapsed ? RightOutlined : LeftOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <Space style={{
                            float: "right",
                            margin: "0px 10px",
                        }}>
                            <Button style={{
                                color: "white",
                                backgroundColor: PRIMARY_COLOR
                            }}
                                    onClick={() => {
                                        deleteCookiesToken()
                                        router.navigate("/login")
                                    }}
                                    icon={<LogoutOutlined/>}
                            >Выход</Button>
                        </Space>
                    </Header>
                    <Content>
                        <Routes>
                            {
                                routers.at(0)?.children?.map((route, index) => {
                                    if (route.authority?.filter(it => getCurrentUser().roles.includes(it))?.length!! < 1) {
                                        return (
                                            <Route key={index} path={route.path} element={<Error403/>}/>
                                        )
                                    } else if (route.children) {
                                        return (
                                            <Routes key={index}>
                                                {
                                                    route.children.map((subRoute, subIndex) => (
                                                        <Route key={index + '-' + subIndex}
                                                               path={route.path + subRoute.path}
                                                               element={route.element}/>
                                                    ))
                                                }
                                            </Routes>
                                        )
                                    } else {
                                        return (
                                            <Route key={index} path={route.path} element={route.element}/>
                                        )
                                    }
                                })
                            }
                        </Routes>
                        <FloatButton.BackTop/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Владимир Митюшин, Сайтырлы Ярослав группа 3254</Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}

export default App;