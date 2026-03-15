import {useShallow} from "zustand/react/shallow";
import {useStore} from "./store.ts";

export default function App({}: {}) {
    const {name, setName, sayHello} = useStore(useShallow(state => ({
        name: state.name,
        setName: state.setName,
        sayHello: state.sayHello
    })));

    return <>
        <h1>Hello
            <button onClick={sayHello}>
                emit
            </button>
        </h1>
        <input
            type="text"
            onChange={setName}
            value={name}
        />
        <h2>Hello {name}!</h2>
    </>;
}