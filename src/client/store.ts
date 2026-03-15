import {create} from 'zustand'
import {ChangeEvent} from "react";
import {greeter} from "./socketHelper.ts";

interface Store {
    name: string,
    setName: (event: ChangeEvent<HTMLInputElement>) => void,
    sayHello: (event: unknown) => Promise<void>
}

export const useStore = create<Store>()((set, get) => ({
    name: '',
    setName: (event) => set({name: event.target.value}),
    sayHello: async (event) => {
        const message = await greeter.sayHello({name: get().name});
        console.log(message);
    }
}))