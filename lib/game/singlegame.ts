
class SingleGameBox {
    box: Array<Array<string>> | string;

    constructor() {
        this.box = Array.from(({ length: 3 }), () => new Array<string>(3).fill(" "));
        // this.box = this.generateRandomArray(3, 3);

        // console.log(this.box)
    }


    updateGameBox(r: number, c: number, value: string): boolean {
        // this.box = value
        // return true
        if (typeof (this.box) != 'string') {
            this.box[r][c] = value
            if (this.checkBoxStatus(value) == value) {
                this.box = value
                return true
            }
        }
        // console.log(this.checkBoxStatus(value))
        return false
    }

    isSpaceAvailable(): boolean {
        if (typeof (this.box) != 'string') {
            for (let index = 0; index < this.box.length; index++) {
                if (this.box[index].includes(' '))
                    return true
            }
        }
        return false
    }


    private checkBoxStatus(value: string): string {
        if (this.checkWinner(value)) {
            return value;
        } else {
            if (this.checkFilled()) {
                return " ";
            }
        }
        return "";
    }
    private checkFilled() {
        for (let i = 0; i < this.box.length; i++) {
            if (this.box[i].includes(' '))

                return true
        }
        return true
    }

    private checkWinner(value: string) {
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

    private checkDiagonal1(r: number, c: number, value: string): boolean {
        if (this.box[r][c] == value) {
            if (r < this.box.length - 1)
                return this.checkDiagonal1(r + 1, c + 1, value)
            else
                return true
        }
        return false
    }

    private checkDiagonal2(r: number, c: number, value: string): boolean {
        if (this.box[r][c] == value) {
            if (r > 0 && c < this.box.length - 1)
                return this.checkDiagonal2(r - 1, c + 1, value)
            else
                return true
        }
        return false
    }

    private checkRow(r: number, c: number, value: string): boolean {
        if (this.box[r][c] == value) {
            if (c < this.box.length - 1)
                return this.checkRow(r, c + 1, value)
            else
                return true
        }
        return false
    }
    private checkColumn(r: number, c: number, value: string): boolean {
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