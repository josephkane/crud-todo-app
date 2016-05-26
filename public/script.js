$(() => {
	const API_URL = `https://crud-to-do-jk.firebaseio.com/task`;

	function addDataToDOM (item, id) {
		const row =
		`<tr data-id="${id}">
			<td>${item.task}</td>
			<td>
				<button class="btn btn-success complete">Complete</button>
				<button class="btn btn-danger delete">Delete</button>
			</td>
		</tr>`

		$('tbody').append(row);
	}

	$.get(`${API_URL}.json`)
		.done((data) => (
			Object.keys(data).forEach((id) => {
				addDataToDOM(data[id], id)
			})
		))

})