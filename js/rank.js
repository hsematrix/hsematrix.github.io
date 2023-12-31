function swap_rows(matrix, row1, row2, col) {
    for (let i = 0; i < col; i++) {
        let t = matrix[row1][i];
        matrix[row1][i] = matrix[row2][i];
        matrix[row2][i] = t;
    }
    return matrix;
}

function swap_columns(matrix, col1, col2, row) {
    for (let i = 0; i < row; i++)
        matrix[i][col1] = matrix[i][col2];
}

function makeSquare(matrix, R, C) {
    empty_row = new Array(C).fill(0);
    for (let i = 0; i < C - R; i++) matrix.push(empty_row);
}

function get_rank(matrix, R, C) {
    let rank = C;
    if (R < C) makeSquare(matrix, R, C);
    for (let row = 0; row < rank; row++) {
        // Элемент на главной диагонали != 0
        if (matrix[row][row]) {
            // Применяем тот самый алгоритм с лекции
            for (let col = 0; col < R; col++) {
                if (col != row) {
                    let ratio = matrix[col][row] / matrix[row][row];
                    for (let i = 0; i < rank; i++) matrix[col][i] -= ratio * matrix[row][i];
                }
            }
        }
        else {
            // Если столбец нулевой, то заменяем его последним
            let isEmpty = true;
            for (let i = row + 1; i < R; i++) {
                if (matrix[i][row]) {
                    swap_rows(matrix, row, i, rank);
                    isEmpty = false;
                    break;
                }
            }
            if (isEmpty) {
                rank--;
                swap_columns(matrix, row, rank, R);
            }
            row--;
        }
    }
    return rank;
}

// function display(matrix) {
//     matrix.forEach(element => {
//         console.log(element);
//     });
// }
