$(() => {
	const API_URL = `https://crud-to-do-jk.firebaseio.com/`;

	$.get(`${API_URL}.json`)
		.done((data) => (
			Object.keys(data).forEach((id) => {
				console.log(data[id], id, data)
			})
		))

})