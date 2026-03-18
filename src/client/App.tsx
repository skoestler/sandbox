import {useShallow} from "zustand/react/shallow";
import {useStore} from "./store.ts";

export default function App({}: {}) {
    const {initialized, lastMessage, message, setMessage, pushMessage} =
        useStore(useShallow(state => state));

    return initialized ? (
        <>
            <p>Last message: {lastMessage}</p>
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
        </>
    ) : (
        <div>Loading...</div>
    );
}