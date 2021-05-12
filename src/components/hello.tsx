import React, { FC, useState } from "react"
import { Button, Input, DatePicker } from "antd"

const Hello: FC = () => {
    const [state, setState] = useState(1)
    return (
        <div>
            <Button onClick={() => setState(state + 1)}>click</Button>
            {state}
            <Input />
            <DatePicker />
        </div>
    )
}

export default Hello
