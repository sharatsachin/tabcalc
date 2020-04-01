function addaRow(){
	let dtable = document.getElementById('data-table');
	let newrow = dtable.tBodies[0].insertRow();
	let nc = dtable.tHead.rows[0].cells.length;
	for (var ic = 0; ic < nc; ic++) {
		let newcell = newrow.insertCell();
		// newcell.innerText = 0;
		newcell.contentEditable = 'true';
		newcell.addEventListener('input', compute);
	}
}

function addaColumn(){
	let alphabet = 'abcdefghijklmnopqrstuvwxyz';
	let dtable = document.getElementById('data-table');
	let newcell = dtable.tHead.rows[0].appendChild(document.createElement('th'));

	let nc = dtable.tHead.rows[0].cells.length; // number of cells present in header
	newcell.innerText = alphabet[nc-1];
	newcell = dtable.tHead.rows[1].appendChild(document.createElement('th'));
	if (nc==1) newcell.innerHTML = `<input class="input" id="input0" type="text" placeholder="expression" disabled>`;
	else {
		newcell.innerHTML = `<input class="input" id="input${nc-1}" type="text" placeholder="f(${alphabet.substr(0,nc-1).split("").join(",")})">`;
		newcell.addEventListener('input', compute);
	}
}

document.getElementById('updtable').onclick = function changeContent() {
	let nc = document.getElementById('col-select').value;
	let nr = document.getElementById('row-select').value;
	document.getElementById('data-table').innerHTML = '<thead> <tr></tr> <tr></tr> </thead> <tbody> </tbody>'
	for (var ic = 0; ic < nc; ic++) addaColumn();
	for (var ir = 0; ir < nr; ir++) addaRow();
}

function isitvalid(num){
	if (isNaN(num)) {
    	return '-';
  	}
  	return num;
}

function compute(){
	let alphabet = 'abcdefghijklmnopqrstuvwxyz';
	let dtable = document.getElementById('data-table');

	for (let row of dtable.tBodies[0].rows) {
		let nc = row.cells.length;
		for (var ic = 1; ic < nc; ic++){
			let scope = new Object();
			for (var i = 0; i < ic; i++) scope[alphabet[i]] = Number(row.cells[i].innerText);
			row.cells[ic].innerText =  isitvalid(math.evaluate(document.getElementById(`input${ic}`).value, scope));
		}
	}
}