
type marker = 'x' | 'o' | undefined
type move = { br: number, bc: number, r: number, c: number, marker: marker }
type player = {
    marker: marker,
    name: string
}


type playerstatus = { status: { ready: boolean, connected: boolean }, marker: marker }
type players = {
    players: {
        you: playerstatus,
        opponent: playerstatus
    }
}


type start = {
    turn: boolean,
    start: boolean
}
type turn = { turn: boolean }

type portinfo = {
    port: string,
    connected: number,
    sockettime: number
} | undefined