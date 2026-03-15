import React, {useCallback} from "react";
import {Socket} from "socket.io-client";
import {greeter} from "./socketHelper.ts";

export default function App({socket}: { socket: Socket }) {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
        event => {
            greeter.sayHello(socket, {name: 'Shayne'}).then(console.log);
        },
        []
    );

    return <h1>Hello
        <button onClick={handleClick}>
            emit
        </button>
    </h1>;
}