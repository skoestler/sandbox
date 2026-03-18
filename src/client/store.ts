import {create} from 'zustand'
import {ChangeEvent, SubmitEvent} from "react";
import {socket, cluster} from "./socketHelper.ts";

interface Store {
    initialized: boolean,
    lastMessage: string,
    message: string,
    setMessage: (event: ChangeEvent<HTMLInputElement>) => void,
    pushMessage: (event: SubmitEvent<HTMLFormElement>) => Promise<void>
}

export const useStore = create<Store>()((set, get) => ({
    initialized: false,
    lastMessage: '',
    message: '',
    setMessage: (event) => set({message: event.target.value}),
    pushMessage: async (event) => {
        event.preventDefault();
        await cluster.set({key: 'message', value: get().message});
        set({message: ''})
    }
}));

const message = await cluster.get({key: 'message'});
useStore.setState({initialized: true, lastMessage: message});

socket.on('etcd.change', ({value}) => {
    useStore.setState({lastMessage: value});
});