let det = document.getElementsByClassName("det")[0]
let rank = document.getElementsByClassName("rank")
let determinant = document.getElementsByClassName("determinant")[0]
let rang = document.getElementsByClassName("rang")[0]

window.onload = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}


// - - - Функции определения свойств
// Квадратная
function isSquare(matrix) {
	if (matrix.length === matrix[0].length) {
		return "square";
	} return "";
}

//Нулевая
function isZero(matrix) {
	console.log("Rank: ", matrix)
	let flag = true;
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j] !== 0) {
				flag = false;
				break;
			}
		}
		if (!flag) {
			break;
		}
	}
	if (flag) return "zero";
	return "";
}

//Диагональная
function isDiagonal(matrix) {
	console.log("Rank: ", matrix)
	if (isSquare(matrix) === "") {
		return "";
	}
	let flag = true;
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j] !== 0 && i !== j) {
				return "";
			}
		}
	}
	return "diagonal";

}

//Единичная
function isUnit(matrix) {
	console.log("Rank: ", matrix)
	if (isSquare(matrix) === "") {
		return "";
	}
	if (isDiagonal(matrix) === "") {
		return "";
	}
	for (let i = 0; i < matrix.length; i++) {
		if (matrix[i][i] !== 1) {
			return "";
		}
	}
	return "identity";
}

//Треугольная
function isTriangle(matrix) {
	let flag = true;
	if (isSquare(matrix) === "") {
		return "";
	}
	for (let i = 1; i < matrix.length; i++) {
		for (let j = 0; j < i; j++) {
			if (matrix[i][j] !== 0) {
				flag = false;
				break;
			}
		}
		if (!flag) {
			break;
		}
	}
	let flag1 = true;
	for (let i = 1; i < matrix.length; i++) {
		for (let j = 0; j < i; j++) {
			if (matrix[j][i] !== 0) {
				flag1 = false;
				break;
			}
		}
		if (!flag1) {
			break;
		}
	}
	if (!flag && !flag1) {
		return "";
	}
	return "triangular"
}

//Ступенчатая
function isEchelon(matrix) {
	console.log("Rank: ", matrix)
	let lastNonZeroIndex = -1;
	for (let i = 0; i < matrix.length; i++) {
		let firstNonZeroIndex = -1;
		for (let j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j] !== 0) {
				firstNonZeroIndex = j;
				break;
			}
		}
		if (firstNonZeroIndex === -1) {
			return "echelon";
		}
		if (firstNonZeroIndex <= lastNonZeroIndex) {
			return "";
		}
		lastNonZeroIndex = firstNonZeroIndex;
	}
	return "echelon";
}
// - - -

// - - - Здесь функция по подсчету определителя
function detr(matrix) {
    if (isSquare(matrix) === "") {
        return "none";
    }
    if (matrix.length === 2 && matrix[0].length === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    let det = 0;
    for (let i = 0; i < matrix[0].length; i++) {
        const minor = matrix.slice(1).map(row => row.slice(0, i).concat(row.slice(i + 1)));
        det += matrix[0][i] * detr(minor) * (i % 2 === 0 ? 1 : -1);
    }
    return det;
}
// - - -

// - - - Здесь по рангам
// - - -

document.addEventListener('keydown', function (event) {
	if (event.keyCode == 13) {
		event.preventDefault()
		let activeElement = document.activeElement
		let formElements = Array.from(document.getElementsByClassName('num'))
		let currentIndex = formElements.indexOf(activeElement)
		let nextIndex = (currentIndex + 1) % formElements.length
		formElements[nextIndex].focus()
	}
});
rank[0].value = '3'
rank[1].value = '3'
detBool = true

function toTop() {
    document.body.style.overflow = 'hidden';
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

function toBot() {
    document.body.style.overflow = 'auto';
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    })
}

function deepCopy(arr) {
	const copy = [];
	for (let i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])) {
			// Если элемент - массив, рекурсивно вызываем deepCopy
			copy[i] = deepCopy(arr[i]);
		} else {
			// Иначе просто копируем элемент
			copy[i] = arr[i];
            }
    }
    return copy;
}

document.body.style.overflow = 'hidden'
det.addEventListener('click', () => {
	if (detBool == true) {
		let flag = true
		Array.from(document.getElementsByClassName('num')).forEach(function (item, index, array) {
			if (item.value === '' || !/^-?\d+(\.\d+)?$/.test(item.value)) {
				det.style.animation = 'shake 0.3s'
				setTimeout(function () { det.style.animation = 'none' }, 300)
				item.style.transitionDuration = '0s'
				item.style.outline = '2px solid rgba(227,109,109,0.7)'
				item.addEventListener('focus', function () { item.style = '' })
				flag = false
			}
		})
		if (flag == true) {
			let row_size = rank[0].value
			let column_size = rank[1].value
			let mat = [];
			let row = [];

			Array.from(document.getElementsByClassName('num')).forEach(function (item, index, array) {
				row.push(Number(item.value));
				if ((index + 1) % column_size == 0) {
					mat.push(row);
					row = [];
				}
			})
			console.log(mat)
			setTimeout(function () { toBot() }, 500)
			determinant.innerHTML = `determinant = <span style="color: rgba(28,225,213,0.6); font-weight: bold;">${detr(mat)}</span>`
			rang.innerHTML = `rank = <span style="color: rgba(28,225,213,0.6); font-weight: bold;">${get_rank(deepCopy(mat), row_size, column_size)}</span>`
			document.getElementsByClassName('t')[0].innerHTML = `<div class="property">${isSquare(mat)}</div>
						<div class="property">${isZero(mat)}</div>
						<div class="property">${isDiagonal(mat)}</div>
						<div class="property">${isUnit(mat)}</div>
						<div class="property">${isTriangle(mat)}</div>
						<div class="property">${isEchelon(mat)}</div>`
			detBool = false
			det.style.transform = 'rotateX(180deg)'
			det.style.backgroundColor = 'rgba(256,256,256,0.05)'
			setTimeout(function () { det.innerHTML = `<span style="transform:rotateX(180deg);color:rgba(144,235,230,0.7);">reset</span>` }, 100)
		}
	}
	else if (detBool == false) {
		setTimeout(function () { toTop() }, 500)
		detBool = true
		det.style.transform = 'rotateX(0deg)'
		det.style.backgroundColor = 'rgba(186,234,231,0.3)'
		numList = Array.from(document.getElementsByClassName('num'))
		numList.forEach(function (item, index, array) {
			item.style.transform = 'rotateX(-180deg)'
			setTimeout(function () {
				item.value = ''
			}, 100)
			setTimeout(function () {
				item.style.transitionDuration = '0s'
				item.style.transform = 'rotateX(0deg)'
				setTimeout(function () { item.style.transitionDuration = '0.5s' }, 50)
			}, 500)
		})
		setTimeout(function () { det.innerHTML = `det` }, 100)
	}
})
Array.from(document.getElementsByClassName('num')).forEach(function (item, index, array) {
	item.addEventListener('input', function () {
		setTimeout(function () {
			if (detBool == false) {
				toTop()
				setTimeout(function () { toTop() }, 500)
				detBool = true
				det.style.transform = 'rotateX(0deg)'
				det.style.backgroundColor = 'rgba(186,234,231,0.3)'
				setTimeout(function () { det.innerHTML = `det` }, 100)
			}
		}, 500)
		let inputValue = item.value
		let numericValue = inputValue.replace(/[^0-9.-]/g, '')
		item.value = numericValue
	})
})
rank[0].addEventListener('change', function () {
	setTimeout(function () {
		toTop()
		if (detBool == false) {
			setTimeout(function () { toTop() }, 500)
			detBool = true
			det.style.transform = 'rotateX(0deg)'
			det.style.backgroundColor = 'rgba(186,234,231,0.3)'
			numList = Array.from(document.getElementsByClassName('num'))
			numList.forEach(function (item, index, array) {
				item.style.transform = 'rotateX(-180deg)'
				setTimeout(function () {
					item.value = ''
				}, 100)
				setTimeout(function () {
					item.style.transitionDuration = '0s'
					item.style.transform = 'rotateX(0deg)'
					setTimeout(function () { item.style.transitionDuration = '0.5s' }, 50)
				}, 500)
			})
			setTimeout(function () { det.innerHTML = `det` }, 100)
		}
	}, 500)
	string = ``
	for (let i = 0; i < parseInt(rank[0].value); i++) {
		string += '<div class="line">'
		for (let j = 0; j < parseInt(rank[1].value); j++) {
			string += `<input type="text" class="num" inputmode="numeric">`
		}
		string += '</div>'
	}
	document.getElementsByClassName('matrix')[0].innerHTML = string
	Array.from(document.getElementsByClassName('num')).forEach(function (item, index, array) {
		item.addEventListener('input', function () {
			setTimeout(function () {
				if (detBool == false) {
					toTop()
					setTimeout(function () { toTop() }, 500)
					detBool = true
					det.style.transform = 'rotateX(0deg)'
					det.style.backgroundColor = 'rgba(186,234,231,0.3)'
					setTimeout(function () { det.innerHTML = `det` }, 100)
				}
			}, 500)
			let inputValue = item.value
			let numericValue = inputValue.replace(/[^0-9.-]/g, '')
			item.value = numericValue
		})
	})
})
rank[1].addEventListener('change', function () {
	setTimeout(function () {
		toTop()
		if (detBool == false) {
			setTimeout(function () { toTop() }, 500)
			detBool = true
			det.style.transform = 'rotateX(0deg)'
			det.style.backgroundColor = 'rgba(186,234,231,0.3)'
			numList = Array.from(document.getElementsByClassName('num'))
			numList.forEach(function (item, index, array) {
				item.style.transform = 'rotateX(-180deg)'
				setTimeout(function () {
					item.value = ''
				}, 100)
				setTimeout(function () {
					item.style.transitionDuration = '0s'
					item.style.transform = 'rotateX(0deg)'
					setTimeout(function () { item.style.transitionDuration = '0.5s' }, 50)
				}, 500)
			})
			setTimeout(function () { det.innerHTML = `det` }, 100)
		}
	}, 500)
	string = ``
	for (let i = 0; i < parseInt(rank[0].value); i++) {
		string += '<div class="line">'
		for (let j = 0; j < parseInt(rank[1].value); j++) {
			string += '<input type="text" class="num" inputmode="numeric">'
		}
		string += '</div>'
	}
	document.getElementsByClassName('matrix')[0].innerHTML = string
	Array.from(document.getElementsByClassName('num')).forEach(function (item, index, array) {
		item.addEventListener('input', function () {
			setTimeout(function () {
				if (detBool == false) {
					toTop()
					setTimeout(function () { toTop() }, 500)
					detBool = true
					det.style.transform = 'rotateX(0deg)'
					det.style.backgroundColor = 'rgba(186,234,231,0.3)'
					setTimeout(function () { det.innerHTML = `det` }, 100)
				}
			}, 500)
			let inputValue = item.value
			let numericValue = inputValue.replace(/[^0-9.-]/g, '')
			item.value = numericValue
		})
	})
})
