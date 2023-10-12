import SingleGameBox from "./singlegame";


class BigGame {
    bigbox: SingleGameBox[][] = [];


    constructor() {
        this.bigbox = Array.from(({ length: 3 }), () => Array.from(({ length: 3 }), () => new SingleGameBox()))
    }


    isNextBoxAvailable(r: number, c: number,): boolean {
        if (typeof (this.bigbox[r][c].box) == 'string') {
            return false
        }
        return this.bigbox[r][c].isSpaceAvailable()
    }


    checkBigBoxStatus(value: string) {
        if (this.checkBigDiagonal1(0, 0, value) || this.checkBigDiagonal2(this.bigbox.length - 1, 0, value)) {
            return true
        } else {
            for (let i = 0; i < this.bigbox.length; i++) {
                let row = this.checkBigRow(i, 0, value)
                let col = this.checkBigColumn(0, i, value)
                if (row || col) {
                    return true
                }
            }
        }
        return false;
    }

    checkBigDiagonal1(r: number, c: number, value: string): boolean {
        if (this.bigbox[r][c].box == value) {
            if (r < this.bigbox.length - 1)
                return this.checkBigDiagonal1(r + 1, c + 1, value)
            else
                return true
        }
        return false
    }

    checkBigDiagonal2(r: number, c: number, value: string): boolean {
        if (this.bigbox[r][c].box == value) {
            if (r > 0 && c < this.bigbox.length - 1)
                return this.checkBigDiagonal2(r - 1, c + 1, value)
            else
                return true
        }
        return false
    }

    checkBigRow(r: number, c: number, value: string): boolean {
        if (this.bigbox[r][c].box == value) {
            if (c < this.bigbox.length - 1)
                return this.checkBigRow(r, c + 1, value)
            else
                return true
        }
        return false
    }
    checkBigColumn(r: number, c: number, value: string): boolean {
        if (this.bigbox[r][c].box == value) {
            if (r < this.bigbox.length - 1)
                return this.checkBigColumn(r + 1, c, value)
            else
                return true
        }
        return false
    }
}


export default BigGame;

