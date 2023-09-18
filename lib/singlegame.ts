
class SingleGameBox {
    box: Array<Array<string>> | string;

    // generateRandomArray(rows = 3, cols = 3): Array<Array<string>> {
    //     const randomArray = [];

    //     for (let i = 0; i < rows; i++) {
    //         const row = [];

    //         for (let j = 0; j < cols; j++) {
    //             // Generate a random number between 0 and 9 (inclusive)
    //             const randomNumber = Math.floor(Math.random() * 10).toString();
    //             console.log(randomNumber)
    //             row.push(randomNumber);
    //         }

    //         randomArray.push(row);
    //     }

    //     return randomArray;
    // }

    constructor() {
        this.box = Array.from(({ length: 3 }), () => new Array<string>(3).fill(" "));
        // this.box = this.generateRandomArray(3, 3);

        // console.log(this.box)
    }


    updateGameBox(r: number, c: number, value: string) {
        typeof (this.box) === 'object' ? this.box[r][c] = value : null;
        // console.log(this.checkBoxStatus(value))
        if (this.checkBoxStatus(value) == value) {
            this.box = value
        }
        return this.box
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