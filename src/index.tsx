import React from "react"
import ReactDOM from "react-dom"
import zhCN from "antd/es/locale/zh_CN" // 配置全局中文
import { ConfigProvider } from "antd"
import App from "./App"
import "@/plugins"

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>,
    document.querySelector("#root"),
)
