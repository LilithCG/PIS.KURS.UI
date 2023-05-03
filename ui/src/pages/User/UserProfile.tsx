import React from "react";
import {Card, Descriptions} from "antd";
import {getCurrentUser} from "../Login/TokenUtil";

export const UserProfile = () => {
    const currentUser = getCurrentUser();
    return (
        <div style={{padding: 20}}>
            <Card title={currentUser.name}>
                <Descriptions>
                    <Descriptions.Item label="Имя">{currentUser.name}</Descriptions.Item>
                    <Descriptions.Item label="Логин">{currentUser.login}</Descriptions.Item>
                    <Descriptions.Item label=""> </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    )
}