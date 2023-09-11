
class GameBox {
    GameBox(fillwith) {
        this.box = Array(3).fill(Array(3).fill(" "))
    }


    updateGameBox(r, c, value) {
        this.box[r, c] = value;
        if (this.checkBoxStatus(value)) {
            this.box = value
            return value
        }
    }

    checkBoxStatus(value) {
        if (this.checkDiagonal1(0, 0, value) || this.checkDiagonal2(box.length - 1, 0, value)) {
            return true
        } else {
            for (let i = 0; i < box.length; i++) {
                let row = this.checkRow(i, 0, value)
                let col = this.checkColumn(0, i, value)
                if (row || col) {
                    return true
                }
            }
        }
        return false;
    }

    checkDiagonal1(r, c, value) {
        if (box[r][c] == value) {
            if (r < box.length - 1)
                return this.checkDiagonal1(r + 1, c + 1, value)
            else
                return true
        }
        return false
    }

    checkDiagonal2(r, c, value) {
        if (box[r][c] == value) {
            if (r > 0 && c < box.length - 1)
                return this.checkDiagonal2(r - 1, c + 1, value)
            else
                return true
        }
        return false
    }

    checkRow(r, c, value) {
        if (box[r][c] == value) {
            if (c < box.length - 1)
                return this.checkRow(r, c + 1, value)
            else
                return true
        }
        return false
    }
    checkColumn(r, c, value) {
        if (box[r][c] == value) {
            if (r < box.length - 1)
                return this.checkColumn(r + 1, c, value)
            else
                return true
        }
        return false
    }



}