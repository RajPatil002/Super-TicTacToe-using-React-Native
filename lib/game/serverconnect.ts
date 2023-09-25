// import WebSocket from 'ws';

class SocketServer {
    websocket: WebSocket;


    constructor(port: Number) {
        this.websocket = new WebSocket("ws://192.168.1.6:" + port)
        // this.websocket.onopen = () => console.log("Connected2")
    }
}


class Server {
    static async getPort(): Promise<Number> {
        return await fetch("localhost:9999/creategamesocket", {
            method: 'POST',
        })
            .then(response => response.text())
            .then(result => parseInt(result))
        // .catch(error => console.log('error', error));
    }
}


export default SocketServer