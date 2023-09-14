
class SingleGameBox {
    box: Array<Array<string>> | string;
    constructor() {
        this.box = new Array(3).fill(new Array<string>(3).fill("X"));

        console.log(this.box)
    }


    updateGameBox(r: number, c: number, value: string) {
        typeof (this.box) === 'object' ? this.box[r][c] = value : null;
        if (this.checkBoxStatus(value)) {
            this.box = value
            // return value
        }
    }


    checkBoxStatus(value: string): string {
        if (this.checkWinner(value)) {
            return value;
        } else {
            if (this.checkFilled()) {
                return " ";
            }
        }
        return "";
    }
    checkFilled() {
        for (let i = 0; i < this.box.length; i++) {
            if (this.box[i].includes(' '))

                return true
        }
        return true
    }

    checkWinner(value: string) {
        if (this.checkDiagonal1(0, 0, value) || this.checkDiagonal2(this.box.length - 1, 0, value)) {
            return true
        } else {
            for (let i = 0; i < this.box.length; i++) {
                let row = this.checkRow(i, 0, value)
                let col = this.checkColumn(0, i, value)
                if (row || col) {
                    return true
                }
            }
        }
        return false;
    }

    checkDiagonal1(r: number, c: number, value: string): boolean {
        if (this.box[r][c] == value) {
            if (r < this.box.length - 1)
                return this.checkDiagonal1(r + 1, c + 1, value)
            else
                return true
        }
        return false
    }

    checkDiagonal2(r: number, c: number, value: string): boolean {
        if (this.box[r][c] == value) {
            if (r > 0 && c < this.box.length - 1)
                return this.checkDiagonal2(r - 1, c + 1, value)
            else
                return true
        }
        return false
    }

    checkRow(r: number, c: number, value: string): boolean {
        if (this.box[r][c] == value) {
            if (c < this.box.length - 1)
                return this.checkRow(r, c + 1, value)
            else
                return true
        }
        return false
    }
    checkColumn(r: number, c: number, value: string): boolean {
        if (this.box[r][c] == value) {
            if (r < this.box.length - 1)
                return this.checkColumn(r + 1, c, value)
            else
                return true
        }
        return false
    }



}

export default SingleGameBox;