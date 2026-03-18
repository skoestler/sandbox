import SocketServer from 'moleculer-io';
import HTTPServer from 'moleculer-web';
import type {Context, ServiceSchema, Service} from "moleculer";
import type {DefaultEventsMap, Socket} from "socket.io";

// NOTE: `function` syntax is required because arrow functions cannot use `this`.
// Moleculer assigns the `Service` instance to `this` when calling the event handler.
const onBeforeCall = function (
    this: Service,
    ctx: Context,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, { initialized: boolean }>,
    action: string,
    params: unknown,
    opts: unknown
): void {
    if (!socket.data.initialized) {
        socket.data.initialized = true;
        socket.on('disconnect', () => {
            this.broker.broadcast('socket.disconnected', {socketId: socket.id})
        });
    }
}

export const GatewayService = (port: number): ServiceSchema => ({
    name: "gateway",
    mixins: [HTTPServer, SocketServer as any],
    settings: {
        port,
        assets: {
            folder: 'dist'
        },
        routes: [{autoAliases: true}],
        io: {
            namespaces: {
                "/": {
                    events: {
                        call: {onBeforeCall}
                    }
                }
            }
        }
    }
});