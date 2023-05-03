import React from 'react';
import {Button, Result} from "antd";
import {Blocks, MutatingDots} from "react-loader-spinner";
import Icon from "@ant-design/icons";
import {router} from "../../utils/routes";


const Error404: React.FC = () => (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"white",
        height:"100vh"
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
            title={<div style={{fontSize: "7vh"}}>404</div>}
            subTitle="Такой страницы не существует"
            extra={<Button type="primary" onClick={() => router.navigate('/main')} >Вернуться на главную</Button>}
        />
    </div>
);

export default Error404