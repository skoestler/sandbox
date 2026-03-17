import {useShallow} from "zustand/react/shallow";
import {useStore} from "./store.ts";

export default function App({}: {}) {
    const {message, setMessage, pushMessage} = useStore(useShallow(state => ({
        message: state.message,
        setMessage: state.setMessage,
        pushMessage: state.pushMessage
    })));

    return <>
        <form onSubmit={pushMessage}>
            <label htmlFor="message-input">New Cluster Message</label>
            <input
                name="message"
                id="message-input"
                type="text"
                onChange={setMessage}
                value={message}
            />
            <button type="submit">Submit</button>
        </form>
    </>;
}