const ip = "192.168.1.10:"


class SocketServer {
    websocket: WebSocket;


    constructor(port: Number) {
        this.websocket = new WebSocket("ws://" + ip + port)
    }

    sendReadyStatus(value: boolean) {
        this.websocket.send(JSON.stringify({
            "status": {
                "ready": value
            }
        }))
    }

    async sendMove(move: move) {
        await this.websocket.send(JSON.stringify({ move: move }))
    }
}


class Server {
    static url: string = 'http://' + ip
    static port: string = '9999';
    static async getPort(): Promise<{ port: string, createdbyid: string } | undefined> {
        // return { port: 1000 }
        console.log(this.url + this.port)
        const resp = await fetch(this.url + this.port + "/creategamesocket", {
            method: 'POST',
        })
            .then(response => response.json())
            .then(result => {
                return result
            })
            .catch(error => {
                // console.log('error', error)
                return undefined
            });
        return resp
    }

    static async getPortInformation(gameport: string): Promise<portinfo> {
        const resp = await fetch(this.url + this.port + "/portinfo", {
            method: 'POST',
            headers: {
                port: gameport
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log('result', result)
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