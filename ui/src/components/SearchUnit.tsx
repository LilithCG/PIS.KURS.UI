import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import React from "react";
import {ColumnType} from "antd/es/table";
import {PRIMARY_COLOR} from "../utils/consts";

export const SearchUnit = (field: String): ColumnType<any> => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => (
        <Input
            placeholder={"Поиск..."}
            value={selectedKeys[0]}
            onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : [])
            }}
            onPressEnter={() => {
                confirm()
            }}
            onBlur={() => {
                confirm()
            }}
        />
    ),
    filterIcon: () => (
        <SearchOutlined style={{ color: PRIMARY_COLOR}}/>
    ),
    onFilter: (value, record) =>
        Boolean(record[String(field)]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        )
});