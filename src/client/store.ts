import {create} from 'zustand'
import {ChangeEvent, SubmitEvent} from "react";
import {cluster} from "./socketHelper.ts";

interface Store {
    current: string,
    message: string,
    setMessage: (event: ChangeEvent<HTMLInputElement>) => void,
    pushMessage: (event: SubmitEvent<HTMLFormElement>) => Promise<void>
}

export const useStore = create<Store>()((set, get) => ({
    current: '',
    message: '',
    setMessage: (event) => set({message: event.target.value}),
    pushMessage: async (event) => {
        event.preventDefault();
        await cluster.set({key: 'message', value: get().message});
    }
}))