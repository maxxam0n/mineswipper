const menuIcon = document.querySelector('.menu__icon');
const menu = document.querySelector('.menu__body');
const newSettings = document.querySelector('.new-settings');

function toggleMenu() {
	menuIcon.classList.toggle('active');
	menu.classList.toggle('active');
}

menuIcon.addEventListener('click', toggleMenu);

const userChoiseCols = document.querySelector('#cols');
const userChoiseRows = document.querySelector('#rows');
const userChoiseMine = document.querySelector('#mine');

const userOptions = [userChoiseCols, userChoiseRows, userChoiseMine];

const optionsButton = document.querySelector('#user-options-add');
const optionsButtonClear = document.querySelector('#user-options-clear');

const cleanInp = function () {
	this.value = this.value.replace(/[^0-9]/g, '');
}

userOptions.forEach(el => el.addEventListener('input', cleanInp));

let newOptions = [];

optionsButton.addEventListener('click', function () {
	let childrens = newSettings.querySelectorAll('.new-options');
	childrens.forEach(el => el.classList.remove('invalid'));

	let rows = Number(userChoiseRows.value);
	let cols = Number(userChoiseCols.value);
	let mines = Number(userChoiseMine.value);

	if (cols >= 10 && cols <= 55 && rows >= 10 && rows <= 35 && mines <= Math.floor(rows * cols * 0.8)) {

		if (!JSON.stringify(newOptions).includes(JSON.stringify([rows, cols, mines]))) {
			newOptions.push([rows, cols, mines]);
			console.log(JSON.stringify(newOptions));
			let newOption = document.createElement('button');

			newOption.classList.add('new-options');
			newOption.classList.add('button');

			newOption.textContent = `${cols} x ${rows} x ${mines}`;

			newSettings.appendChild(newOption);

			let createUserField = createField.bind(field, rows, cols, mines);
			newOption.addEventListener('click', createUserField);
		} else {
			childrens.forEach(el => {
				if (el.textContent == `${cols} x ${rows} x ${mines}`) {
					el.classList.add('invalid');
				}
			});
		}
	}

	if (cols < 10 || cols > 55) {
		userChoiseCols.value = '';
		userChoiseCols.classList.add('invalid');
	}
	else userChoiseCols.classList.remove('invalid');

	if (rows < 10 || rows > 35) {
		userChoiseRows.value = '';
		userChoiseRows.classList.add('invalid');
	}
	else userChoiseRows.classList.remove('invalid');

	if (mines > rows * cols * 0.8) {
		userChoiseMine.value = `не более ${Math.floor(rows * cols * 0.8)}`
		userChoiseMine.classList.add('invalid');
	}
	else userChoiseMine.classList.remove('invalid');

});

optionsButtonClear.addEventListener('click', function () {
	newSettings.textContent = '';
	newOptions = [];
});