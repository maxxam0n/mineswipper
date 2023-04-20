const field = document.querySelector('.field');
const page = document.querySelector('body');

field.addEventListener('contextmenu', function (e) {
	e.preventDefault();
});
field.addEventListener('mousedown', function (e) {
	e.preventDefault();
});

const options = document.querySelectorAll('.options__button');

const createEasyField = createField.bind(field, 10, 10, 15);
const createMiddleField = createField.bind(field, 13, 15, 35);
const createHardField = createField.bind(field, 15, 20, 60);

options.forEach(option => {
	if (option.dataset.level == 'easy') {
		option.addEventListener('click', createEasyField);
	}
	if (option.dataset.level == 'middle') {
		option.addEventListener('click', createMiddleField);
	}
	if (option.dataset.level == 'hard') {
		option.addEventListener('click', createHardField);
	}
});

function randomCoordinate(size) {
	return Math.floor(Math.random() * (size));
}

function createVoidField(rows, cols) {
	let arrMines = [];
	for (let i = 0; i < rows * cols; i++) {
		arrMines.push(0);
	}
	return arrMines;
}

function createMines(rows, cols, mines) {
	const arrMines = createVoidField(rows, cols);
	for (let i = 0; i < mines; i++) {
		let coordinate = randomCoordinate(rows * cols);
		while (arrMines[coordinate] == 'x') {
			coordinate = randomCoordinate(rows * cols);
		}
		arrMines[coordinate] = 'x';
	}
	const minesField = createCounterAroundMines(rows, cols, ...arrMines);
	return minesField;
}

function createCounterAroundMines(rows, cols, ...arrMines) {
	for (let i = 0; i < arrMines.length; i++) {
		if (i == 0 && arrMines[i] != 'x') {
			if (arrMines[i + 1] == 'x') arrMines[i]++;
			if (arrMines[i + cols] == 'x') arrMines[i]++;
			if (arrMines[i + cols + 1] == 'x') arrMines[i]++;
		}
		else if (i == cols - 1 && arrMines[i] != 'x') {
			if (arrMines[i - 1] == 'x') arrMines[i]++;
			if (arrMines[i + cols] == 'x') arrMines[i]++;
			if (arrMines[i + cols - 1] == 'x') arrMines[i]++;
		}
		else if (i == ((rows - 1) * cols) && arrMines[i] != 'x') {
			if (arrMines[i + 1] == 'x') arrMines[i]++;
			if (arrMines[i - cols] == 'x') arrMines[i]++;
			if (arrMines[i - cols + 1] == 'x') arrMines[i]++;
		}
		else if (i == (rows * cols - 1) && arrMines[i] != 'x') {
			if (arrMines[i - 1] == 'x') arrMines[i]++;
			if (arrMines[i - cols] == 'x') arrMines[i]++;
			if (arrMines[i - cols - 1] == 'x') arrMines[i]++;
		}
		else if (i > 0 && i < cols - 1 && arrMines[i] != 'x') {
			if (arrMines[i + 1] == 'x') arrMines[i]++;
			if (arrMines[i - 1] == 'x') arrMines[i]++;
			if (arrMines[i + cols] == 'x') arrMines[i]++;
			if (arrMines[i + cols + 1] == 'x') arrMines[i]++;
			if (arrMines[i + cols - 1] == 'x') arrMines[i]++;
		}
		else if (i > ((rows - 1) * cols) && i < (rows * cols - 1) && arrMines[i] != 'x') {
			if (arrMines[i + 1] == 'x') arrMines[i]++;
			if (arrMines[i - 1] == 'x') arrMines[i]++;
			if (arrMines[i - cols] == 'x') arrMines[i]++;
			if (arrMines[i - cols - 1] == 'x') arrMines[i]++;
			if (arrMines[i - cols + 1] == 'x') arrMines[i]++;
		}
		else if (i % cols == 0 && i != 0 && i != ((rows - 1) * cols) && arrMines[i] != 'x') {
			if (arrMines[i + 1] == 'x') arrMines[i]++;
			if (arrMines[i + cols] == 'x') arrMines[i]++;
			if (arrMines[i + cols + 1] == 'x') arrMines[i]++;
			if (arrMines[i - cols] == 'x') arrMines[i]++;
			if (arrMines[i - cols + 1] == 'x') arrMines[i]++;
		}
		else if ((i + 1) % cols == 0 && i != cols - 1 && i != (rows * cols - 1) && arrMines[i] != 'x') {
			if (arrMines[i - 1] == 'x') arrMines[i]++;
			if (arrMines[i + cols] == 'x') arrMines[i]++;
			if (arrMines[i - cols] == 'x') arrMines[i]++;
			if (arrMines[i - cols - 1] == 'x') arrMines[i]++;
			if (arrMines[i + cols - 1] == 'x') arrMines[i]++;
		}
		else if (arrMines[i] != 'x') {
			if (arrMines[i - 1] == 'x') arrMines[i]++;
			if (arrMines[i + 1] == 'x') arrMines[i]++;
			if (arrMines[i - cols] == 'x') arrMines[i]++;
			if (arrMines[i + cols] == 'x') arrMines[i]++;
			if (arrMines[i - cols - 1] == 'x') arrMines[i]++;
			if (arrMines[i + cols - 1] == 'x') arrMines[i]++;
			if (arrMines[i + cols + 1] == 'x') arrMines[i]++;
			if (arrMines[i - cols + 1] == 'x') arrMines[i]++;
		}
	}
	return arrMines;
}

function addMine(cells, ...options) {
	const minesField = createMines(...options);
	cells.forEach((cell, index) => {
		if (minesField[index] == 'x') cell.classList.add('mine');
		else if (minesField[index] == 0) cell.textContent = '';
		else if (minesField[index] == 1) {
			cell.textContent = minesField[index];
			cell.classList.add('blue');
		}
		else if (minesField[index] == 2) {
			cell.textContent = minesField[index];
			cell.classList.add('green');
		}
		else if (minesField[index] == 3) {
			cell.textContent = minesField[index];
			cell.classList.add('red');
		}
		else if (minesField[index] == 4) {
			cell.textContent = minesField[index];
			cell.classList.add('darkblue');
		}
		else if (minesField[index] == 5) {
			cell.textContent = minesField[index];
			cell.classList.add('brown');
		}
		else if (minesField[index] == 6) {
			cell.textContent = minesField[index];
			cell.classList.add('turquoise');
		}
		else if (minesField[index] == 7) {
			cell.textContent = minesField[index];
		}
		else if (minesField[index] == 8) {
			cell.textContent = minesField[index];
		}
	});
}

function clearMine(cells) {
	cells.forEach((el) => {
		el.textContent = '';
		const classNames = el.classList;
		for (let className of classNames) {
			if (className != 'hide') {
				el.classList.remove(className);
			}
		}
	});
}

function openCellAround(x, y, fieldBody) {
	const around = [
		fieldBody.rows[y].cells[x],
		fieldBody.rows[y].cells[x],
		fieldBody.rows[y].cells[x + 1],
		fieldBody.rows[y].cells[x + 1],
		fieldBody.rows[y].cells[x - 1],
		fieldBody.rows[y].cells[x - 1],
		fieldBody.rows[y + 1]?.cells[x],
		fieldBody.rows[y + 1]?.cells[x],
		fieldBody.rows[y - 1]?.cells[x],
		fieldBody.rows[y - 1]?.cells[x],
		fieldBody.rows[y + 1]?.cells[x + 1],
		fieldBody.rows[y + 1]?.cells[x + 1],
		fieldBody.rows[y + 1]?.cells[x - 1],
		fieldBody.rows[y + 1]?.cells[x - 1],
		fieldBody.rows[y - 1]?.cells[x + 1],
		fieldBody.rows[y - 1]?.cells[x + 1],
		fieldBody.rows[y - 1]?.cells[x - 1],
		fieldBody.rows[y - 1]?.cells[x - 1],
	];
	for (let el of around) {
		el?.classList.remove('hide');
		el?.classList.remove('cross');
	}
}

function openCells(x, y, fieldBody) {
	const voidCells = [];
	(function addVoidCell(x, y, fieldBody) {
		const nextX = x + 1;
		const previosX = x - 1;
		const nextY = y + 1;
		const previosY = y - 1;
		let i = [];
		if (fieldBody.rows[y].cells[x].textContent == '' && !fieldBody.rows[y].cells[x].classList.contains('mine')) {
			if (!JSON.stringify(voidCells).includes(JSON.stringify([x, y]))) {
				voidCells.push([x, y]);
				i.push([x, y]);
			}
			if (fieldBody.rows[y].cells[nextX]?.textContent == '' && !JSON.stringify(voidCells).includes(JSON.stringify([nextX, y]))) {
				voidCells.push([nextX, y]);
				i.push([nextX, y]);
			}
			if (fieldBody.rows[y].cells[previosX]?.textContent == '' && !JSON.stringify(voidCells).includes(JSON.stringify([previosX, y]))) {
				voidCells.push([previosX, y]);
				i.push([previosX, y]);
			}
			if (fieldBody.rows[nextY]?.cells[x].textContent == '' && !JSON.stringify(voidCells).includes(JSON.stringify([x, nextY]))) {
				voidCells.push([x, nextY]);
				i.push([x, nextY]);
			}
			if (fieldBody.rows[previosY]?.cells[x].textContent == '' && !JSON.stringify(voidCells).includes(JSON.stringify([x, previosY]))) {
				voidCells.push([x, previosY]);
				i.push([x, previosY]);
			}
			if (fieldBody.rows[nextY]?.cells[nextX]?.textContent == '' && !JSON.stringify(voidCells).includes(JSON.stringify([nextX, nextY]))) {
				voidCells.push([nextX, nextY]);
				i.push([nextX, nextY]);
			}
			if (fieldBody.rows[nextY]?.cells[previosX]?.textContent == '' && !JSON.stringify(voidCells).includes(JSON.stringify([previosX, nextY]))) {
				voidCells.push([previosX, nextY]);
				i.push([previosX, nextY]);
			}
			if (fieldBody.rows[previosY]?.cells[nextX]?.textContent == '' && !JSON.stringify(voidCells).includes(JSON.stringify([nextX, previosY]))) {
				voidCells.push([nextX, previosY]);
				i.push([nextX, previosY]);
			}
			if (fieldBody.rows[previosY]?.cells[previosX]?.textContent == '' && !JSON.stringify(voidCells).includes(JSON.stringify([previosX, previosY]))) {
				voidCells.push([previosX, previosY]);
				i.push([previosX, previosY]);
			}
			if (i.length) {
				for (let voidCell of i) {
					addVoidCell(...voidCell, fieldBody);
				}
			} else return;
		} else fieldBody.rows[y].cells[x].classList.remove('hide');
	})(x, y, fieldBody);
	for (let voidCell of voidCells) {
		openCellAround(...voidCell, fieldBody);
	}
}

function openCell() {
	let row = this.parentElement;
	openCells(this.cellIndex, row.rowIndex, this.closest('.field__body'));
	this.removeEventListener('click', openCell);
}

function addCross() {
	const crossCount = document.querySelector('.cross-count');
	let count = Number(crossCount.textContent);
	if (this.classList.contains('hide') && !this.classList.contains('cross') && count !== 0) {
		this.classList.add('cross');
		count > 0 && count--;
		this.removeEventListener('click', openCell);
	}
	else if (this.classList.contains('hide') && this.classList.contains('cross')) {
		this.classList.remove('cross');
		count++;
		this.addEventListener('click', openCell);
	}
	crossCount.textContent = count;
}

function createGameInfo(shell, mines) {
	const gameInfo = document.createElement('div');
	gameInfo.classList.add('game-info');

	const crossCount = document.createElement('div');
	crossCount.textContent = mines;
	crossCount.classList.add('cross-count');

	const time = document.createElement('div');
	time.classList.add('time');
	time.textContent = '00:00';

	gameInfo.append(crossCount, time);

	shell.appendChild(gameInfo);
}

function startGame(fieldBody, ...optionsField) {
	const cells = document.querySelectorAll('td');

	addMine(cells, ...optionsField);

	fieldBody.addEventListener('click', function restartField(e) {
		while (e.target.classList.contains('mine')) {
			clearMine(cells);
			addMine(cells, ...optionsField);
		}

		cells.forEach(el => {
			el.addEventListener('click', openCell);
			el.addEventListener('contextmenu', addCross);
		});

		const timer = document.querySelector('.time');
		let sec = 0;
		function getTime() {
			sec++;
			const min = String(Math.floor(sec / 60)).padStart(2, '0');
			const formattedSecond = String(sec % 60).padStart(2, '0')
			timer.textContent = `${min}:${formattedSecond}`;
		}
		getTime();
		let time = setInterval(getTime, 300);

		cells.forEach(el => {
			el.addEventListener('click', function () {
				let score = 0;
				if (!this.classList.contains('mine')) {
					cells.forEach(el => {
						if (!el.classList.contains('mine') && !el.classList.contains('hide')) {
							score++;
						}
					});
				}
				if (score == optionsField[0] * optionsField[1] - optionsField[2]) {
					cells.forEach(el => {
						el.removeEventListener('click', openCell);
						el.removeEventListener('contextmenu', addCross);
					});
					clearInterval(time);
					page.classList.add('win');
				}

				if (this.classList.contains('mine') && !this.classList.contains('cross') && !page.classList.contains('win')) {
					cells.forEach(el => {
						el.removeEventListener('click', openCell);
						el.removeEventListener('contextmenu', addCross);
						clearInterval(time);
						page.classList.add('loose');
						if (el.classList.contains('mine') && !el.classList.contains('cross')) {
							el.classList.remove('hide');
						}
						if (!el.classList.contains('mine') && el.classList.contains('cross')) {
							el.classList.add('miss');
						}
					});
				}
			});
		});

		let clickEvent = new Event('click');
		e.target.dispatchEvent(clickEvent);

		this.removeEventListener('click', restartField);
	});
}

function createField(rows, cols, mines) {
	this.textContent = '';

	page.classList.remove('loose');
	page.classList.remove('win');

	const fieldBody = document.createElement('table');

	if ((rows > 16 && rows < 24) || (cols > 30 && cols < 45)) {
		fieldBody.classList.add('little-cell');
	} else if (rows >= 24 || cols >= 45) {
		fieldBody.classList.add('very-little-cell');
	}

	fieldBody.classList.add('field__body');
	for (let i = 0; i < rows; i++) {
		let tr = document.createElement('tr');
		for (let k = 0; k < cols; k++) {
			let td = document.createElement('td');
			td.classList.add('hide');
			tr.appendChild(td);
		}
		fieldBody.appendChild(tr);
	}

	this.appendChild(fieldBody);

	createGameInfo(this, mines);
	startGame(fieldBody, rows, cols, mines);
	toggleMenu();
}



