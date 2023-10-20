let row_size = rank[0].value
let column_size = rank[1].value
let matrix = [];
let c = 0;
let row = [];
Array.from(document.getElementsByClassName('num')).forEach(function (item, index, array) {
    row.push(item);
    c++;
    if (c == column_size) {
        matrix.push(row);
        row = [];
        c = 0;
    }
})
