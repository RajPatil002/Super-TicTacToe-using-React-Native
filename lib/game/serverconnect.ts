// import WebSocket from 'ws';

class SocketServer {
    websocket: WebSocket;


    constructor(port: Number) {
        console.log(port)
        this.websocket = new WebSocket("ws://192.168.1.6:" + port)
        // console.log(this.websocket)
        // this.websocket.send(JSON.stringify({

        // }))
        // this.websocket.onopen = () => console.log("Connected2")
    }

    sendReadyStatus(value: boolean) {
        this.websocket.send(JSON.stringify({
            "status": {
                "ready": value
            }
        }))
    }

    async sendMove(move: { br: number, bc: number, r: number, c: number, marker: "x" | 'o' }) {
        await this.websocket.send(JSON.stringify({ move: move }))
    }
}


class Server {
    static url: string = 'http://192.168.1.6'
    static port: string = ':9999';
    static async getPort(): Promise<{ port: string, createdbyid: string } | undefined> {
        // return { port: 1000 }
        const resp = await fetch(this.url + this.port + "/creategamesocket", {
            method: 'POST',
        })
            .then(response => response.json())
            .then(result => {
                return result
            })
            .catch(error => {
                console.log('error', error)
                return undefined
            });
        return resp
    }

    static async getPortInformation(gameport: string): Promise<{ port: string } | undefined> {
        const resp = await fetch(this.url + this.port + "/portinfo", {
            method: 'POST',
            headers: {
                port: gameport
            }
        })
            .then(response => response.json())
            .then(result => {
                return result
            })
            .catch(error => {
                console.log('error', error)
                return undefined
            });
        return resp
    }
}


export default SocketServer

export { Server }