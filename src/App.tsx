import React, { FC } from "react"
import Hello from "com/hello"
import style from "css/index.module.less"

const App: FC = () => (
    <>
        <Hello />
        <div className={style.box}>222</div>
    </>
)

export default App
