import {createRoot} from 'react-dom/client';
import {io} from 'socket.io-client';
import App from './App';

const socket = io("/");

createRoot(document.getElementById('root')!).render(<App socket={socket}/>);