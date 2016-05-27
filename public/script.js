$(() => {
	const API_URL = `https://crud-to-do-jk.firebaseio.com/task`;

	let newTask;

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
		));

	$('form').submit((e) => {
		newTask = $('.user-input').val();

		$.post(`${API_URL}.json`,
			JSON.stringify({ task: newTask })
		);
	});

	$('tbody').on('click', '.delete', (e) => {
		const row = $(e.target).closest('tr');
		const taskId = row.data('id');

		$.ajax({
			url: `${API_URL}/${taskId}.json`,
			method: 'DELETE'
		}).done(() => {
			row.remove();
			}
		)
	});


	// firebase.initializeApp({
	// 	apiKey: "AIzaSyD8SNCKdn8cYgzmCqDdzraIJTVsJIc6YgM",
	// 	authDomain: "crud-to-do-jk.firebaseapp.com",
	// 	databaseURL: "https://crud-to-do-jk.firebaseio.com",
	// 	storageBucket: "crud-to-do-jk.appspot.com",
	// });

})