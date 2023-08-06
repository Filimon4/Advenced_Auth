import React, {FC, useState, useContext} from "react";
import {Context} from "../index";
import { observer } from "mobx-react-lite";

const LoginForm: FC = () => {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {store} = useContext(Context);

    return (
        <div>
            <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Username"
            />
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />
            <button onClick={() => store.login(email, password)}>Login</button>
            <button onClick={() => store.registration(username, email, password)}>
                Registration
            </button>
        </div>
    );
};

export default observer(LoginForm);
