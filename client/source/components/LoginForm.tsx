import React, {FC, useState, useContext} from 'react'
import { Context } from '../index'

import { observer } from 'mobx-react-lite'

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder='Email'
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                >
                </input>
            </div>
            <br></br>
            <div>
                <input
                    type="password"
                    placeholder='Password'
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                >
                </input>
            </div>
            <br></br>
            <div><button onClick={() => store.login(email, password)}>Login</button></div>
            <br></br>
            <div><button onClick={() => store.registration(email, password)}>Registration</button></div>
        </div>
    )
}

export default observer(LoginForm)