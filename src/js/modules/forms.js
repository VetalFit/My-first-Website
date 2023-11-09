const forms = () => {
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		phoneInputs = document.querySelectorAll('input[name="user_phone"]')

	phoneInputs.forEach(item => {
		item.addEventListener('input', () => {
			item.value = item.value.replace(/\D/, '');
		});
	});

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо скоро мы c вами свемсЯ',
		failure: 'Что-то пошло не так...'
	};

	const postData = async (url, data) => {
		document.querySelector('.status').textContent = message.loading;
		let res = await fetch(url, {
			method: 'POST',
			body: data
		});

		return await res.text();
	};

	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		});
	};

	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMesssage = document.createElement('div');
			statusMesssage.classList.add('status');
			item.appendChild(statusMesssage);

			const formData = new FormData(item);

			postData('assets/server.php', formData)
				.then(res => {
					console.log(res);
					statusMesssage.textContent = message.success;
				}).catch(() => {
					statusMesssage.textContent = message.failure;
				}).finally(() => {
					//form.reset();
					clearInputs();
					setTimeout(() => {
						statusMesssage.remove();
					}, 5000);
				});
		});
	});
};

export default forms;