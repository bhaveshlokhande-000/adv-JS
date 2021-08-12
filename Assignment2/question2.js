
class Queen {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    static canQueenAttack(q1, q2) {
        // If queen and the opponent are in the same row
        if (q1.x == q2.x)
            return true;

        // If queen and the opponent are in the same column
        if (q1.x == q2.y)
            return true;

        // If queen can attack diagonally
        if (Math.abs(q1.x - q2.x) == Math.abs(q1.y - q2.y))
            return true;

        // Opponent is safe
        return false;
    }
}

let q1 = new Queen(4, 5)
let q2 = new Queen(6, 7)


if (Queen.canQueenAttack(q1, q2))
    console.log("Yes");
else
    console.log("No");

