$(() => {
	const API_URL = `https://crud-to-do-jk.firebaseio.com/`;
	let token;
	let userId;

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

	const getTask = () => {
		$.get(`${API_URL}/${userId}/task.json?auth=${token}`)
			.done((data) =>	{
				if (data) {
					Object.keys(data).forEach((id) => {
						addDataToDOM(data[id], id)
					})
				}
			});
	}

	$('.task').submit((e) => {
		const newTask = $('.user-input').val();

		$.post(`${API_URL}/${userId}/task.json?auth=${token}`,
			JSON.stringify({ task: newTask })
			).then((object) => (
				addDataToDOM({task: newTask}, object.name)
				))
			.then(newTask = "");

		e.preventDefault();
	});

	$('tbody').on('click', '.delete', (e) => {
		const row = $(e.target).closest('tr');
		const taskId = row.data('id');

		$.ajax({
			url: `${API_URL}/${userId}/task/${taskId}.json?auth=${token}`,
			method: 'DELETE'
		}).done(() => {
			row.remove();
			}
		)
	});

	const login = (email, password) => (
		firebase.auth().signInWithEmailAndPassword(email, password)
	)

	const register = (user, password) => (
		firebase.auth().createUserWithEmailAndPassword(user, password)
	)

	$('.login form').submit((e) => {
		const email = $('.email').val();
		const password = $('.password').val();

		login(email, password)
			.then(console.log)
			.catch(console.error);

		e.preventDefault();
	});

	$('input[value="Register"]').click((e) => {
		const email = $('.email').val();
		const password = $('.password').val();

		register(email, password)
			.then(() => login(email, password))
			.then(console.log)
			.catch(console.error);

		e.preventDefault();
	})

	firebase.initializeApp({
		apiKey: "AIzaSyD8SNCKdn8cYgzmCqDdzraIJTVsJIc6YgM",
		authDomain: "crud-to-do-jk.firebaseapp.com",
		databaseURL: "https://crud-to-do-jk.firebaseio.com",
		storageBucket: "crud-to-do-jk.appspot.com",
	});

	firebase.auth().onAuthStateChanged((user) => {

		if (user) {
			$('.login').hide();
			$('.app').show();
			userId = user.uid;
			user.getToken()
				.then(t => token = t)
				.then(getTask);


		} else {
			$('.login').show();
		}

	});

})