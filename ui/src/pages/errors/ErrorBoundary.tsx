import React from "react";
import {Button, Result, Space} from "antd";
import Icon from "@ant-design/icons";
import {Blocks, MutatingDots} from "react-loader-spinner";
import {router} from "../../utils/routes";
import {useRouteError} from "react-router-dom";

export function ErrorBoundary() {
    const error = useRouteError();
    console.error(error)

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            height: "100vh"
        }}>
            <Result
                icon={<Icon component={() => <Blocks
                    height="15vh"
                    width="15vh"
                    color="red"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                />}/>
                }
                title={<div style={{fontSize: "2vh"}}>Критическая ошибка</div>}
                subTitle={String(error)}
                extra={<Space>
                    <Button type="primary" onClick={() => router.navigate('/main')}>Вернуться на главную</Button>
                </Space>}
            />
        </div>
    );

}