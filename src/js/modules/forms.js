import checkNumInputs from "./checkNumInputs";
import { closeModal } from "./modals";

const forms = (state) => {
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input');

	checkNumInputs('input[name="user_phone"]');

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
			if (item.getAttribute('data-calc') === 'end') {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			};

			postData('assets/server.php', formData)
				.then(res => {
					console.log(res);
					statusMesssage.textContent = message.success;
				}).catch(() => {
					statusMesssage.textContent = message.failure;
				}).finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMesssage.remove();
						closeModal();
					}, 4000);
				});
		});
	});
};

export default forms;