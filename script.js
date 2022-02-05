const main = document.querySelector("main");
const textArea = document.getElementById("textArea");
const button = document.getElementById("button");
const ignoreCase = document.getElementById("ignoreCase");
let counter = (str) => {
	return str.split("").reduce((total, sign) => {
		total[sign] ? total[sign]++ : (total[sign] = 1);
		return total;
	}, {});
};
function getKeyByValue(object, value) {
	return Object.keys(object).find((key) => object[key] === value);
}
let table;
function addRowToTheTable(key, value, index) {
	if (index === 0) {
		table = document.createElement("table");
		const titles = `<tr>
        <th>Znak</th>
        <th>Częstotliwość</th>
      </tr>`;
		table.insertAdjacentHTML("afterbegin", titles);
	}
	const row = document.createElement("tr");
	const keyColumn = document.createElement("td");
	const valueColumn = document.createElement("td");
	keyColumn.textContent = key;
	valueColumn.textContent = value;
	row.appendChild(keyColumn);
	row.appendChild(valueColumn);
	table.appendChild(row);
    table.setAttribute("id", "table");
    main.appendChild(table);
    table.classList.add("analysed");
    textArea.focus();
}
function makeIt() {
    if (table) {
        main.removeChild(table);
        table = undefined;
    }
    let text = textArea.value;
    if(ignoreCase.checked) {
        text = text.toLowerCase();
    }
	const freq = counter(text);
	let values = [];
	let keys = [];
	Object.values(freq).forEach((element) => {
		const key = getKeyByValue(freq, element);
		if (key.trim() !== "") {
			values.push(element);
			keys.push(key);
		}
	});
	values.sort((a, b) => {
		return b - a;
	});
	let array = Array.from(values.length);
	values.forEach((element, index) => {
		const key = getKeyByValue(freq, element);
		array[index] = key;
		delete freq[key];
	});
	values.forEach((v, index) => {
		addRowToTheTable(array[index], v, index);
	});
}

button.addEventListener("click", (e) => {
    e.preventDefault();
    makeIt();
});
