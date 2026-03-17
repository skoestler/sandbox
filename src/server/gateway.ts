import SocketServer from 'moleculer-io';
import HTTPServer from 'moleculer-web';

export const GatewayService = (port: number) => ({
    name: "gateway",
    mixins: [HTTPServer, SocketServer as any],
    settings: {
        port,
        assets: {
            folder: 'dist'
        },
        routes: [
            {
                aliases: {
                    "POST /greet": "greeter.sayHello"
                }
            }
        ]
    }
});